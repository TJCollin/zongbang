// pages/zhihu/question/questionDetail.js
const WxParse = require('../../../wxParse/wxParse.js')
import {
  timeFormat
} from '../../../utils/timeFormat'
import requestPromise from '../../../utils/requestPromise'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answers: [],
    title: '',
    id: '',
    page: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id.trim()
    this.setData({
      title: options.title,
      id: id
    })
    this.getQuestionAnswers(id)
  },
  cardTap: function(e){
    let index = e.currentTarget.dataset.cardindex
    let card = this.data.answers[index]
    wx.navigateTo({
      url: `../answer/answerDetail`,
      success: (res) => {
        res.eventChannel.emit('answer', card)
      }
    })

  },

  getQuestionAnswers: function (id) {
    console.log(this.data.page)
    requestPromise({
      url: `https://www.zhihu.com/api/v4/questions/${id}/answers?include=data%5B*%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Creview_info%2Crelevant_info%2Cquestion%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%2Cis_labeled%2Cis_recognized%2Cpaid_info%2Cpaid_info_content%3Bdata%5B*%5D.mark_infos%5B*%5D.url%3Bdata%5B*%5D.author.follower_count%2Cbadge%5B*%5D.topics&offset=${this.data.page}&limit=5&sort_by=default&platform=desktop`
    }).then(res => {
      console.log("获取问题回答成功：", res)
      res = res.data.map(item => {
        item.created_time = timeFormat(item.created_time * 1000)
        let reg = /<img.*?>/g
        let noScriptReg = /<noscript>.*?<\/noscript>/g
        item.content = item.content.replace(noScriptReg, '')
        let matchArr = item.content.match(reg)
        if (matchArr && matchArr.length > 0) {
          matchArr = matchArr.slice(0, 3)
          let srcReg = /(?<=(data-actualsrc=)").*?(?=")/g
          matchArr = matchArr.map(item => {
            let matchStr = item.match(srcReg)[0]
            return matchStr || ''
          })
        }
        item.pics = matchArr
        return item
      })
      let originArr = this.data.answers
      res = originArr.concat(res)
      this.setData({
        answers: res,
      })
    }).catch(err => {
      console.log("获取问题回答失败：", err)

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('reach')
    let page = this.data.page
    this.setData({
      page: page + 5
    }, () => {
      this.getQuestionAnswers(this.data.id)
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})