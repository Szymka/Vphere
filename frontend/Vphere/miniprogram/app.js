App({
  //设置全局请求URL
  globalData: {
    URL: 'https://vphere.yanmy.top/api',
  },  
  onShow:function(options){
    wx.checkSession({
      success: function () {
        return;
      },
      fail: function () {
        wx.navigateTo({
          url: "/pages/login/login"
        })
      }
    })
  }
})