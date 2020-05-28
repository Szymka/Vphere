const app = getApp();
const templateId = 'MQJIS_Fcpz7-nCyJ5QjRpoaP0F9cw5Yvq2rPCM4Ad9c';
Page({
  data: {
    nickName: '点击进行登录',
    language: '',
    avatarUrl: "/images/avatar.png"
  },
  test: function(e) {
    wx.requestSubscribeMessage({
      tmplIds: [templateId],
      success(res) {
        if (res[templateId] == 'accept') {
          wx.showModal({
            title: '提示信息',
            content: "订阅成功,由于开发限制每次订阅只接收一条提醒",
          })
        } else {
          wx.showToast({
            title: '订阅失败'
          })
        }
      },
      fail(res) {
        console.log(res)
      },
      complete(res) {
        console.log(res)
      }
    })
  },
  onLoad: function() {
  },
  gotologin: function(e) {
    
    wx.checkSession({
      success: function() {
        return
      },
      fail: function() {
        wx.showModal({
          title: '温馨提示',
          content: '现未登录，是否通过微信账号登录',
          success: function(e) {
            if (e.cancel) {
              console.log("点击了取消")
            } else if (e.confirm) {
              console.log("确定")
              wx.navigateTo({
                url: "/pages/login/login"
              })
            }
          }
        })
      }
    })
  },
  onShow: function() {
    
    var that = this
    wx.checkSession({
      success: function() {       
        wx.getUserInfo({
          success: res => {
            console.log(res.userInfo)
            that.setData({
              nickName: res.userInfo.nickName,
              language: res.userInfo.language,
              avatarUrl: res.userInfo.avatarUrl
            })
          }
        })
      },
      fail: function() {
      }
    })
  }
})