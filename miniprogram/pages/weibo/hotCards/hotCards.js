// pages/hotCards/hotCards.js
import {
  WEIBO
} from "../../../config/urlConfig"
import {
  numberFormat
} from '../../../utils/numberFormat'
import requestPromise from '../../../utils/requestPromise'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardlistInfo: {},
    cards: [],
    title: '',
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title
    })
    this.getHotCards(options.title, 1)
  },


  getHotCards: function (title, page) {

    if (!(title.startsWith("#") && title.endsWith("#"))) {
      title = `#${title}#`
    }
    console.log('title', title, page)
    let promise = new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getItemCards',
        data: {
          url: WEIBO.itemCards,
          keyword: title,
          page: page
        }
      }).then(res => {
        console.log('获取热搜详情成功', res.result)
        let cards = []
        let cardListInfo = {}
        let data = res.result.hotCardsInfo.data
        cards = this.handleCards(data.cards)
        if (page > 1) {
          const originCards = this.data.cards
          cards = originCards.concat(cards)
          this.setData({
            cards,
          })
        } else {
          cardListInfo = {
            picUrl: data.cardlistInfo.cardlist_head_cards[0].head_data.portrait_url,
            title: data.cardlistInfo.cardlist_head_cards[0].head_data.title,
            midText: data.cardlistInfo.cardlist_head_cards[0].head_data.midtext,
            downText: data.cardlistInfo.cardlist_head_cards[0].head_data.downtext,
            desc: data.cardlistInfo.cardlist_head_cards[0].head_data.desc,
          }
          this.setData({
            cardlistInfo: cardListInfo,
            cards: cards,
          })
        }
        resolve('获取热搜详情成功')
      }).catch(err => {
        console.log("获取热搜详情失败：", err)
        reject('获取热搜详情失败')
      })

    })
    return promise

  },

  /**
   * 处理获取的微博数组
   * @param {待处理的微博数组} cards 
   */
  handleCards: function (cards) {
    return cards.map((card) => {
      if (card.card_type === 9 && card.mblog) {
        // 处理微博文字
        let text = card.mblog.text
        let reg = /<a /g
        text = text.replace(reg, '<a class= "blue-text" ')

        // 处理微博图片
        let pics = []
        if (card.mblog.pics) {
          pics = card.mblog.pics.map(item => item.url)
        }

        // 处理微博视频
        let mediaUrl = ''
        let mediaPicUrl = ''
        if (card.mblog.page_info && card.mblog.page_info.media_info && card.mblog.page_info.media_info.mp4_sd_url) {
          mediaPicUrl = card.mblog.page_info.page_pic.url
          mediaUrl = card.mblog.page_info.media_info.mp4_sd_url
        }

        // 处理转发信息
        let retweetCard = null
        if (card.mblog.retweeted_status) {
          retweetCard = this.handleCards([{
            mblog: card.mblog.retweeted_status,
            card_type: 9
          }])
          if (retweetCard instanceof Array && retweetCard.length > 0) {
            retweetCard = retweetCard[0]
            retweetCard.text = `<span class="blue-text">@${retweetCard.name}：</span>${retweetCard.text}`
          }
        }


        return {
          text: text,
          id: card.mblog.id,
          mid: card.mblog.mid,
          label: card.mblog.label,
          avatarPic: card.mblog.user.avatar_hd,
          name: card.mblog.user.screen_name,
          createTime: card.mblog.created_at,
          source: card.mblog.source,
          pics,
          mediaPicUrl,
          mediaUrl,
          played: false,
          repostsCount: numberFormat(card.mblog.reposts_count),
          commentsCount: numberFormat(card.mblog.comments_count),
          attitudesCount: numberFormat(card.mblog.attitudes_count),
          picClass: pics.length > 4 ? 'over-four' : '',
          retweetCard
        }
      } else {
        return null
      }
    }).filter(card => card !== null)

  },

  /**
   * 点击微博
   * @param {触发事件} e 
   */
  cardTap: function (e) {
    const cardIndex = e.currentTarget.dataset.cardindex
    const retweet = e.currentTarget.dataset.retweet
    let card = this.data.cards[cardIndex]
    if (retweet) {
      card = card.retweetCard
    }
    requestPromise({
      url: `${WEIBO.cardExtend}/${card.id}`
    }).then(res => {
      console.log('获取长文成功', res)
      let reg = /<a /g
      card.text = res.data.longTextContent.replace(reg, '<a class= "blue-text" ')
      wx.navigateTo({
        url: `../cardDetail/cardDetail`,
        success: (res) => {
          res.eventChannel.emit('openedCard', card)
        }
      })

    }).catch(err => {
      console.log("获取长文失败：", res)
    })
  },
  // 视频播放
  playVideo: function (e) {
    console.log('played')
    const cardIndex = e.currentTarget.dataset.cardindex
    const retweet = e.currentTarget.dataset.retweet
    console.log('re',retweet)
    let playedCard = `cards[${cardIndex}].played`
    let videoContext = wx.createVideoContext(`video${cardIndex}`, this)
    if (retweet) {
      playedCard = `cards[${cardIndex}].retweetCard.played`
      videoContext = wx.createVideoContext(`rvideo${cardIndex}`, this)

    }
    this.setData({
      [playedCard]: true
    })
    videoContext.play()

  },
  // 图片预览
  previewImage: function (e) {
    const cardIndex = e.currentTarget.dataset.cardindex
    const picUrls = this.data.cards[cardIndex].pics
    const src = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: picUrls,
      current: src
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('pullDown')
    this.setData({
      page: 1
    })
    this.getHotCards(this.data.title, 1).then(
      (res) => {
        wx.stopPullDownRefresh({
          success: (res) => {
            console.log("刷新成功")
          },
        })
      }
    ).catch((err) => {
      console.log("刷新失败")
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('reachBottom')
    let page = this.data.page
    this.setData({
      page: page + 1
    })
    this.getHotCards(this.data.title, page + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})