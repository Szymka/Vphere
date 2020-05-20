const app = getApp()
Page({
  data: {

  },

  onLoad: function () {
    var that = this
    wx.getUserInfo({
      success: res => {
        console.log(res.userInfo)
        that.setData({
          userinfo: res.userInfo
        })
      }
    })
  },
})
