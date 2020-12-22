<!--
 * @Author: Collin
 * @Date: 2020-11-03 20:58:31
 * @LastEditTime: 2020-12-22 20:51:15
 * @LastEditors: collin
 * @Description: https://gitee.com/CollinZhang
 * @FilePath: \zongbang\README.md
-->
# 热榜资讯小程序

> 综合微博、知乎和雪球等热榜，在一个小程序中浏览所有热搜信息，不需要切换多个APP。
>
> 由于网络安全规定个人不允许上线文娱广场小程序，因此暂无法提供扫码体验。

## 内容截图

> 以下为gif录屏，更多截图可参考images文件夹中图片

![录屏gif](images/recorder.gif "热榜资讯")


## 技术要点

- 采用原生小程序框架
- 微博图片自动 9 宫格，4 图时自动转为 2 * 2 排列
- 可展示引用微博
- 知乎答案列表显示缩略图
- 支持下拉刷新
- 知乎答案通过 wxParse 进行排版
- 雪球数据自动更新 cookie 爬取
- ... ...


