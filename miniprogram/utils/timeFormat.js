export const timeFormat = (str) =>{
  let date = new Date(str)
  let today = new Date()
  let diff = today.getTime() - date.getTime()
  let dayDiff = Math.floor(diff / (24 * 60 * 60 * 1000))
  if(dayDiff > 1) {
    return `${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes() < 10?'0'+date.getMinutes():date.getMinutes()}`
  }
  let hourDiff = Math.floor(diff / (60 * 60 * 1000))
  if(hourDiff >= 1) {
    return `${hourDiff}小时前`
  }
  let minuteDiff = Math.floor(diff / (60 * 1000))
  if(minuteDiff >= 1) {
    return `${minuteDiff}分钟前`
  }

  return `${Math.floor(diff / 1000)}秒前`
}