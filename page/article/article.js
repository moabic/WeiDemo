var request = require('../../util/uitl.js')
// page/article/article.js
var audio = wx.getBackgroundAudioManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoBloon: true,
    playandPause: true,
    res: '',
    audioCurrentTime: 0,
    percent: 0,
    progressWidth: 450,
    audioDuration: 401,
    touchesValue:0,
    getFlog: false
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
    this.getArticle(id);

  },
  getArticle: function (id) {
    var that = this;
    request({
      url: '/getArticleDetail/' + 11,          
      success: function(res) {
        var res = res.data;
        console.log(res)
        that.setData({
          title: res.data.title,
          zuozhe: res.data.author, 
          time: res.data.publishTime,
          src:  res.data.banner,
          article: res.data.content,
          yuedu: res.data.readNum,
          res: res,
          author: res.data.author  
        })
      }
    })
  },
  clickAudio:function () {
    var playing = this.data.playandPause;
    if(playing) {
      this.radiojihe()
      // audio.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    } else {
      audio.pause()
    };
    this.setData({
      playandPause: !playing
    });
    this.audioManager();
    this.onTimeUpdate();
  },
  onTimeUpdate: function() {
    var that = this;
    //  音频总时长
    var audioDuration = this.data.res.data.audio.duration;
    audio.onTimeUpdate(() => {
    // 进度条目前的进度
      var audioCurrentTime = audio.currentTime.toFixed();
      // 音频正在进行时长
      var audiocurr = audioCurrentTime / audioDuration;
      var percent = audiocurr * 100;
      //  等待加载时间
      var progerssLeft = audiocurr * this.data.progressWidth;
      that.setData({
        audioDuration:audioDuration,
        audioCurrentTime: audioCurrentTime,
        percent: percent,
        progerssLeft: progerssLeft
      })
      console.log()
    })
  },
  //  音乐播放的按钮
  audioManager: function() {
    var that = this;
    audio.onPause(function() {
      that.setData({
        playandPause: true
      })
    })
    audio.onPlay(function() {
      that.setData({
        playandPause: false
      })
    })
    audio.onStop(function() {
      that.setData({
        playandPause: true
      })
    })
    audio.onEnded(function() {
      that.setData({
        playandPause: true
      })
    })
  },
  // 音乐播放滚动位置
  touchstart: function (e) {
    var touchesValue = e.touches[0].pageX * this.getPhoneVideo()
    if(!this.data.getFlog) {
      this.setData({
        getFlog: true,
        touchesValue: touchesValue
      })
    }
  },
  radiojihe: function(audioCurrentTime) {
    audio.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    audio.title = "此时此刻";
    audio.seek(+audioCurrentTime)
    this.audioManager()
    this.onTimeUpdate()
  },
  touchmove: function (e) {
    var newTouchesValue = e.touches[0].pageX * this.getPhoneVideo() - this.data.touchesValue
    if( newTouchesValue < 0 ) {
      newTouchesValue = 0;
    } else if ( newTouchesValue >= this.data.progressWidth ) {
      newTouchesValue = this.data.progressWidth;
    }
    var percent = newTouchesValue / this.data.progressWidth * 100;
    var audioCurrentTime = (newTouchesValue / this.data.progressWidth * this.data.audioDuration).toFixed();
    this.radiojihe(audioCurrentTime)
    this.setData({
      progerssLeft: newTouchesValue,
      percent: percent,
      audioCurrentTime: audioCurrentTime
    })
  },
  getPhoneVideo: function () {
    var radio = 0;
    wx.getSystemInfo({
      success(res){
        var width = res.screenWidth;
        radio = 750 / width;
      }
    })
    return radio
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