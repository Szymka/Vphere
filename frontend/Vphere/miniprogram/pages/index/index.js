const app=getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },

  onLoad: function () {
    
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  wx.getUserInfo({
                    success: res => {
                      console.log(res.userInfo)
                    }
                  })
                  console.log(app.globalData.URL);
                  console.log("用户的code:" + res.code);
                  // 传给后台，再经过解析获取用户的 openid
                   wx.request({
                     url: app.globalData.URL + '/user/login',
                     data: {
                       code:res.code,
                       nick_name:res.nickname,
                       avatarUrl:res.avatarUrl
                       },
                     method:'POST',
                     header: {
                       'content-type':'application/json'
                     },
                     success: function(res) {
                       console.log(res.data)
                     },
                   })
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
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

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '温馨提示',
        content: '拒绝授权将无法进入小程序',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
})
