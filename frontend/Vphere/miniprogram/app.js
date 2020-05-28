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
        wx.showModal({
          title: '温馨提示',
          content: '现未登录，是否通过微信账号登录',
          success:function(e){
            if(e.cancel){
              console.log("点击了取消")
            }else if(e.confirm){
              console.log("确定")
              wx.navigateTo({
                url: "/pages/login/login"
              })
            }
          }
        })
      }
    })
  }
})