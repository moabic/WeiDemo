var request = require('../../util/uitl.js');

Page({



  // page/list/index.js


  /**
   * 页面的初始数据
   */
  data: {
      imgSrc: '/image/one.jpg'
  },
  jumppages:function(e) {
    var index = e.currentTarget.dataset.typeid;
    wx.navigateTo({
      url: '/page/type/type?typeId=' + index
    })
  },
  onLinstTop: function(e) {
    var list = e.currentTarget.dataset.articlelist;
    var listLike = this.data.listLike;
    var islist = listLike[list]
    listLike[list] = !islist
    this.setData({
      listLike: listLike
    })
 
    wx.setStorageSync('listLike',listLike)
  },
  jumpArticle: function (e) {
    var id = e.currentTarget.dataset.id;
    var than = this;
    wx.navigateTo({
      url: '/page/article/article?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = options.typeId;
    var that = this;

    request({
      url: '/getArticleTypeTitleInfo/' + index,
      success: function(res) {
        var imgsrc = res.data.data.imgSrc;
        var font = 1;
        var title = res.data.data.title;
        that.setData({
          limitRemaining: font + '天前',
          newImgSrc: imgsrc,
          title: title
        })
      }
    })

    this.ongetHome();
    var listLike = wx.getStorageSync('listLike');
    if(!listLike) {
      listLike = {}
    }
    this.setData({
      listLike: listLike
    })
    
  },
  
  ongetHome: function() {
    var self = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/home',
      success: function(res) {
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