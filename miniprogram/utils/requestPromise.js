
const requestPromise = (config) => {
  let promise = new Promise((resolve,reject)=>{
    wx.request({
      ...config,
      success: (result) => {
        resolve(result.data)
      },
      fail: (res)=>{
        reject(res.errMsg)
      }
    })
  })
  return promise
}

export default requestPromise