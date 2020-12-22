// pages/zhihu/answer/answerDetail.js
import "../../../utils/requestPromise"
import {timeFormat} from "../../../utils/timeFormat"
import requestPromise from "../../../utils/requestPromise"
import {
  wxParse
} from "../../../wxParse/wxParse"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer: {},
    commentOffset: 0,
    featuredComments: [],
    comments: [],
    offset: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()

    eventChannel.on('answer', (data) => {
      let reg = /<figure.*?figure>/g
      let imgReg = /<img.*?\/>/g
      let srcReg = / src=".*?"/g
      let actualSrcReg = / data-actualsrc=".*?"/g
      data.content = data.content.replace(reg, (match) => {
        // let imgArr = match.match(imgReg)
        // if (imgArr instanceof Array) {
        //   imgArr = imgArr.map((img) => {
        //     img = img.replace(srcReg, " ")
        //     img = img.replace(actualSrcReg, (src) => {
        //       return src.replace("data-actualsrc", "src")
        //     })

        //     return img
        //   })
        //   return imgArr.join("")
        // }
        match = match.replace(imgReg, (img) => {
          img = img.replace(srcReg, " ")
          img = img.replace(actualSrcReg, (src) => {
            return src.replace("data-actualsrc", "src")
          })

          return img
        })
        match = match.replace(/<figure/g, '<div class=""image')
        match = match.replace(/figure>/g, "div>")
        return match
      })

      wxParse('article', 'html', data.content, this, 50)
      this.setData({
        answer: data,
      }, () => {
        this.getComments()
      })
    })

  },

  getComments: function () {
    let {featuredComments, comments, answer, offset} = this.data
    requestPromise({url: `https://www.zhihu.com/api/v4/answers/${answer.id}/root_comments?order=normal&limit=20&offset=${offset}&status=open`}).then(res=>{
      console.log("获取知乎评论成功",res)
      const {featured_counts, data} = res
      data.forEach(comment => {
        comment.created = timeFormat(comment.created_time * 1000)
        if(comment.child_comments){
          comment.child_comments.forEach(item => {
            item.created = timeFormat(item.created_time * 1000)
          })
        }
      });
      
      
      if(featured_counts > offset) {
        featuredComments = featuredComments.concat(data.splice(0, featured_counts - featuredComments.length))
      }

      comments = comments.concat(data)

      this.setData({
        featuredComments: featuredComments,
        comments: comments
      })
    }).catch(err=>{
      console.log("获取知乎评论失败",err)
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
    let offset = this.data.offset + 20
    this.setData({
      offset: offset
    }, ()=>{
      this.getComments()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})