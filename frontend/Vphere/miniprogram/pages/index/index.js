const app = getApp();
const templateId = 'MQJIS_Fcpz7-nCyJ5QjRpoaP0F9cw5Yvq2rPCM4Ad9c';
Page({
  data: {

  },
test:function(e){
  wx.requestSubscribeMessage({
    tmplIds: [templateId],
    success(res) {
      if (res[templateId] == 'accept') {
        wx.showToast({
          title: '订阅成功'
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
