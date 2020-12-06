// 云函数入口文件
const axios = require('axios')

// 云函数入口函数
exports.main = async (event, context) => {
  return await axios(event.config).then(res=>{
    console.log("请求后端成功：",res.data)
    return res.data
  }).catch(err=>{
    console.log(err)
  })

}