// 云函数入口文件

const cloud = require('wx-server-sdk')
cloud.init({
  "env": "miqiuren"
})

// 云函数入口函数
exports.main = async (event) => {

  const hotList = await cloud.callFunction({
    name: 'axiosHelper',
    
    data:{
      config: {
        url: event.url,
        method: "get"
      }
    }
  }).then(res=>{
    console.log("获取热搜信息成功", res)
    return res.result
  }).catch((err=>{
    console.log('获取热搜数据失败：',err)
  }))
  return {
    hotList
  }
}