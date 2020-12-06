// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const {keyword, url, page} = event
  let containerId = encodeURIComponent(`231522type=1&q=${keyword}`);
  const hotCardsInfo = await cloud.callFunction({
    name: 'axiosHelper',
    data:{
      config: {
        url: url,
        method: 'get',
        params: {
          containerid: containerId,
          page_type: "searchall",
          page: page
        }
      }
    }
  }).then((res)=>{
    return res.result
  })
  return {
    hotCardsInfo
  }
}