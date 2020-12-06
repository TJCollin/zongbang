// pages/cardDetail/cardDetail.js
import {
  timeFormat
} from '../../../utils/timeFormat'

import {WEIBO} from "../../../config/urlConfig"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    card: {},
    hotFlow: [],
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('openedCard', (data) => {
      this.setData({
        card: data,
      }, () => {
        this.getHotComments()
      })
    })

  },

  getHotComments: function () {
    wx.request({
      url: `${WEIBO.hotComments}/${this.data.card.id}/${this.data.card.mid}`,
      success: (result) => {
        console.log('获取评论成功：', result)
        let resData = result.data.data.data
        resData.forEach(flow => {
          flow.created_at = timeFormat(flow.created_at)
        })
        this.setData({
          hotFlow: resData
        })
      },
      fail: (res) => {
        console.log("获取评论失败：", res)
      }
    })

  },

  /**
   * 预览图片
   * @param {点击事件} e 
   */
  previewImage: function (e) {
    const picUrls = this.data.card.pics
    const src = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: picUrls,
      current: src
    })
  },
  // 视频播放
  playVideo: function (e) {
    let videoContext = wx.createVideoContext('video', this)
    this.setData({
      'card.played': true
    })
    videoContext.play()

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})