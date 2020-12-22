// pages/xueqiu/xueqiu.js
import requestPromise from '../../utils/requestPromise'
import {
  timeTohour
} from '../../utils/timeFormat'
const MonthDic = {
  1: '一月',
  2: '二月',
  3: '三月',
  4: '四月',
  5: '五月',
  6: '六月',
  7: '七月',
  8: '八月',
  9: '九月',
  10: '十月',
  11: '十一月',
  12: '十二月',
}
const indexDic = {
  "SZ399001": "深证成指",
  "SH000001": "上证指数",
  "SZ399006": "创业板指",
  "SH000688": "科创50"
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: new Date().getDate(),
    month: MonthDic[new Date().getMonth() + 1],
    indexes: [],
    list: [],
    nextMaxId: -1,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '雪球热闻',
    })
    this.getIndexes()
    this.getHotList()
  },

  getIndexes: function () {
    requestPromise({
      url: 'https://zongbang.api.collinjs.site/xueqiu/index'
    }).then(
      res => {
        console.log('获取雪球指数成功：', res)
        let data = res.data.map(item => {
          item.title = indexDic[item.symbol]
          return item
        }).filter(item => {
          return item.symbol !== 'SH000688'
        })
        console.log('data', data)
        this.setData({
          indexes: data
        })
      }
    ).catch(err => {
      console.log('获取雪球指数失败：', err)
    })
  },

  getHotList: function () {
    let maxId = this.data.nextMaxId

    this.setData({
      loading: true
    })
    requestPromise({
      url: `https://zongbang.api.collinjs.site/xueqiu/hotList/${maxId}`
    }).then(res => {
      console.log('获取雪球实时数据成功：', res)
      let list = res.items.map(item => {
        item.time = timeTohour(item.created_at)
        return item
      })
      if (maxId !== -1) {
        list = this.data.list.concat(list)
      }
      this.setData({
        list: list,
        nextMaxId: res.next_max_id,
        loading: false

      }, () => {
        wx.stopPullDownRefresh()
      })
    }).catch(err => {
      this.setData({
        loading: false
      })
      console.log('获取雪球实时数据失败：', err)
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
    this.setData({
      maxId: -1
    }, () => {
      this.getIndexes()
      this.getHotList()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getHotList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})