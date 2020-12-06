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
    topicList: []
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

    this.getHotListData().then(res=>{
      
      this.setData({
        searchList: res
      })
    }).catch((err)=>{
      console.log("获取热搜列表失败：",err)
    })
    this.getTopicListData().then(res=>{
      this.setData({
        topicList: res
      })
    }).catch((err)=>{
      console.log("获取热搜要闻列表失败：",err)
    })
  },

  /**
   * 触发热搜下拉刷新
   */
  onScrollRefresh: function () {
    this.setData({
      refreshTriggered: true
    })
    this.getHotListData().then(
      (res)=>{
        this.setData({
          refreshTriggered: false
        })
      }
    )
 
  },

  getTopicListData: function () {
    return requestPromise({url: WEIBO.topicList})
  },
  onTopicRefresh: function (params) {
    this.getTopicListData().then(
      (res)=>{
        this.setData({
          refreshTriggered: false
        })
      }
    )
 
  },
  /**
   * 获取热搜数据
   */
  getHotListData: function () {
    return requestPromise({
      url: WEIBO.hotList
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