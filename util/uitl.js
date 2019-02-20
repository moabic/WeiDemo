
var baseUrl = 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine';
function request (params) {
    wx.request({
        url: baseUrl + params.url,
        success: function (res) {
            if(res.data.code === 0) {
                params.success(res)
            } else {
                errorShow()
            }
        },
        fail: function() {
            errorShow()
        }
    })
}

function errorShow() {
    wx.showToast({
        title: '获取信息失败',
        icon: 'none'
    })
}

module.exports = request;