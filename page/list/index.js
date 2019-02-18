// page/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgSrc: '/image/one.jpg'
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ongetHome()
  },
  ongetHome: function() {
    var self = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/home',
      success: function(res) {
        console.log(res.data)
        self.setData({
          recommend: res.data.recommend,
          markType: res.data.markType,
          articleList: res.data.articleList
        })
      }
    })
  },
  chufa: function(e) {
    var font = e.currentTarget.dataset.articletype;
    wx.showActionSheet({
      itemList: ['内容过期了','内容和'+ font + '不相关','不再显示来自' + font + '阅读的内容'],
      success:function (res) {
        console.log(res.tapIndex);
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