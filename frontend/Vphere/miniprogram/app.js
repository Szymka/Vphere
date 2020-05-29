App({
  globalData: {
    URL: 'https://vphere.yanmy.top/api',
  },
  onShow: function (options) {
    wx.checkSession({
      success: function () {
        return;
      },
      fail: function () {
        wx.showModal({
          title: '温馨提示',
          content: '现未登录，是否通过微信账号登录',
          success: function (e) {
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
  onLaunch: function () {
    this.autoUpdate()
  },
  autoUpdate: function () {
    let _this = this
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          wx.showModal({
            title: '更新提示',
            content: '检测到新版本，是否下载新版本并重启小程序',
            success: function (res) {
              if (res.confirm) {
                _this.downLoadAndUpdate(updateManager)
              } else if (res.cancel) {}
            }
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试',
      })
    }
  },
  downLoadAndUpdate: function (updateManager) {
    wx.showLoading()
    updateManager.onUpdateReady(function () {
      wx.hideLoading()
      updateManager.applyUpdate()
    })
    updateManager.onUpdateFailed(function () {
      wx.showModal({
        title: '已有新版本',
        content: '新版本已上线，请删除当前小程序，重新搜索打开',
      })
    })
  }
})