import requestPromise from '../../utils/requestPromise'
import {WEIBO} from "../../config/urlConfig"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    searchList: [],
    refreshTriggered: false,
    topicList: [],
    showRefreshText: false
  },



  changeIndex: function (e) {

    this.setData({
      tabIndex: e.target.dataset.index
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '微博热榜',
    })

    this.getHotListData()
    this.getTopicListData()
 

  },

  /**
   * 触发热搜下拉刷新
   */
  onScrollRefresh: function () {
    this.setData({
      refreshTriggered: true
    })
    this.getHotListData().then(()=>{
      this.setData({
        refreshTriggered: false,
      })
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 500
      })
    })
 
  },

  getTopicListData: function () {
    return requestPromise({url: `${WEIBO.topicList}`}).then(
      (res)=>{
        if(res.data.cards.length > 0 && res.data.cards[0].card_group.length > 0){
          this.setData({
            topicList: res.data.cards[0].card_group
          })
        }
      }
    ).catch((err)=>{
      console.log("获取热搜要闻列表失败：",err)
    })
  },
  onTopicRefresh: function (params) {
    this.setData({
      refreshTriggered: true
    })
    this.getTopicListData().then(()=>{
      this.setData({
        refreshTriggered: false
      })
    })
    wx.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 500
    })
 
  },
  /**
   * 获取热搜数据
   */
  getHotListData: function () {
    return requestPromise({
      url: `${WEIBO.hotList}`
    }).then(res=>{
      if(res.data.cards.length > 0 && res.data.cards[0].card_group.length > 0){
        this.setData({
          searchList: res.data.cards[0].card_group
        })
      }
    }).catch((err)=>{
      console.log("获取热搜列表失败：",err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /*


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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})