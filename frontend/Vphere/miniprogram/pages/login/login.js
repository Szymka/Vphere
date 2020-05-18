const app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {              
              //用户已经授权过
              wx.switchTab({
                url: "/pages/index/index"
              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo=e.detail.userInfo
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      console.log("用户信息如下");
      console.log(e.detail.userInfo)
      that.setData({
        userInfo:e.detail.userInfo
      })
      wx.login({
        success: res => {
          // 获取到用户的 code 之后：res.code
          console.log(app.globalData.URL);
          console.log("用户的code:" + res.code);
          // 传给后台，再经过解析获取用户的 openid
          wx.request({
            url: app.globalData.URL + '/user/login',
            data: {
              code: res.code,
              nick_name: this.data.userInfo.nickName,
              avatarUrl: this.data.userInfo.avatarUrl,
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data)
              if(res&&res.header&&res.header['Set-Cookie']){
                wx.setStorageSync('cookieKey', res.header['Set-Cookie']);
              }
            },
          })
          let cookie=wx.getStorageInfoSync('cookieKey');
          let header={'content-type':'application/x-www-form-urlencoded'};
          if(cookie){
            header.cookie=cookie
          }
          console.log(cookie)
        }
      });
      
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: "/pages/index/index"
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
})