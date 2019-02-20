var request = require('../../util/uitl.js')
// page/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoBloon: true
  },
  videoTap: function() {
    var videoPlay = wx.createVideoContext('myVideo');
    videoPlay.play()
    this.setData({
      videoBloon: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.getArticle(id)
  },
  getArticle: function (id) {
    var that = this;
    request({
      url: '/getArticleDetail/' + id,          
      success: function(res) {
        var res = res.data;
        console.log(res)
        that.setData({
          title: res.data.title,
          zuozhe: res.data.author, 
          time: res.data.publishTime,
          src:  res.data.banner,
          article: res.data.content,
          yuedu: res.data.readNum
        })
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})