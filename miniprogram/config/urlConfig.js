const BaseUrl = "https://zongbang.api.collinjs.site/"
export const WEIBO = {
  hotList: `https://m.weibo.cn/api/container/getIndex?containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot&title=%E5%BE%AE%E5%8D%9A%E7%83%AD%E6%90%9C&extparam=seat%3D1%26pos%3D0_0%26mi_cid%3D100103%26cate%3D10103%26filter_type%3Drealtimehot%26c_type%3D30%26display_time%3D1607948428&luicode=10000011&lfid=231583`,
  topicList: `https://m.weibo.cn/api/container/getIndex?containerid=231648_-_3&title=%E5%BE%AE%E5%8D%9A%E7%83%AD%E6%90%9C&extparam=seat%3D1%26pos%3D0_0%26mi_cid%3D100103%26cate%3D10103%26filter_type%3Drealtimehot%26c_type%3D30%26display_time%3D1607948428&luicode=10000011&lfid=231583&page_type=08`,
  cardExtend: `https://m.weibo.cn/statuses/extend?`,
  itemCards: `https://m.weibo.cn/api/container/getIndex?`,
  hotComments: `https://m.weibo.cn/comments/hotflow?`
}

export const ZHIHU = {
  hotList: `${BaseUrl}zhihu/hotList`,
  question: `${BaseUrl}zhihu/question`,
  comments: `${BaseUrl}zhihu/comments`
}