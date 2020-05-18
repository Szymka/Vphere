const app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    userInfo: {},
    hasUserInfo: false,
  },

  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.log(app.globalData.userInfo);
  },
  bindGetUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);

      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        userInfo: e.detail.userInfo,
        isHide: false
      });
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
            success: function(res) {
              console.log(res.data)
            },
          })
        }
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '温馨提示',
        content: '拒绝授权将无法进入小程序',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }

})

//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse) {
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,

//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//       console.log(this.data.userInfo);
//     }
//     console.log(this.data.userInfo);


//   // onLoad: function () {

//   //   var that = this;
//   //   var nickname=null;
//   //   var avaurl=null;
//   //   // 查看是否授权
//   //   wx.getSetting({
//   //     success: function (res) {
//   //       if (res.authSetting['scope.userInfo']) {
//   //         wx.getUserInfo({
//   //           success: res => {
//   //             app.globalData.userInfo = res.userInfo
//   //             that.setData({
//   //               userInfo: res.userInfo,
//   //             })
//   //           }
//   //         })
//   //         console.log(userInfo);

//   //         // wx.getUserInfo({
//   //         //   success: function (res) {
//   //         //     this.setData({
//   //         //       userInfo: res.userInfo,
//   //         //     })
//   //         //     console.log(res.userInfo);
//   //         //     // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
//   //         //     // 根据自己的需求有其他操作再补充
//   //         //     // 在用户授权成功后，调用微信的 wx.login 接口，从而获取code
//   //         //     wx.login({
//   //         //       success: res => {
//   //         //         // 获取到用户的 code 之后：res.code

//   //         //         console.log(app.globalData.URL);
//   //         //         console.log("用户的code:" + res.code);
//   //         //         // 传给后台，再经过解析获取用户的 openid
//   //         //          wx.request({
//   //         //            url: app.globalData.URL + '/user/login',
//   //         //            data: {
//   //         //              code:res.code,
//   //         //              nick_name: nickname,
//   //         //              avatarUrl: avaurl,
//   //         //              },
//   //         //            method:'POST',
//   //         //            header: {
//   //         //              'content-type':'application/json'
//   //         //            },
//   //         //            success: function(res) {
//   //         //              console.log(res.data)
//   //         //            },
//   //         //          })
//   //         //       }
//   //         //     });
//   //         //   }
//   //         // });
//   //       } else {
//   //         // 用户没有授权
//   //         // 改变 isHide 的值，显示授权页面
//   //         that.setData({
//   //           isHide: true
//   //         });
//   //       }
//   //     }
//   //   });
//   //   var that = this
//   //   wx.getUserInfo({
//   //     success: res => {
//   //       console.log(res.userInfo)
//   //       that.setData({
//   //         userinfo: res.userInfo
//   //       })
//   //     }
//   //   })
//   // },

//   bindGetUserInfo: function (e) {
//     if (e.detail.userInfo) {
//       //用户按了允许授权按钮
//       var that = this;
//       // 获取到用户的信息了，打印到控制台上看下
//       console.log("用户的信息如下：");
//       console.log(e.detail.userInfo);
//       //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
//       that.setData({
//         isHide: false
//       });

//     } else {
//       //用户按了拒绝按钮
//       wx.showModal({
//         title: '温馨提示',
//         content: '拒绝授权将无法进入小程序',
//         showCancel: false,
//         confirmText: '返回授权',
//         success: function (res) {
//           // 用户没有授权成功，不需要改变 isHide 的值
//           if (res.confirm) {
//             console.log('用户点击了“返回授权”');
//           }
//         }
//       });
//     }
//   }
// })