const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    groupid:0,
    signinid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  onPullDownRefresh:function(){
    this.onShow();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.stopPullDownRefresh()
    var that = this
    wx.checkSession({
      success: function () {
        console.log(app.globalData.URL)        
        wx.request({
          url: app.globalData.URL + '/sign/record',
          header: {
            'contenr-type': 'application/json',
            'cookie': wx.getStorageSync("sessionid")
          },
          success: function (res) {
            console.log(res.data);
            if(res.statusCode==401){
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
            }else if (res.statusCode == 403) {
              wx.showModal({
                title: '温馨提示',
                content: '没有事项需要打卡噢',
              })
            } else {
              var items = [];
              for (var i in res.data.data) {
                items.push(res.data.data[i]);
              }
              console.log(items)
              that.setData({
                list: items,
              })
              console.log(that.data.list)
            }
          }
        })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.onShow()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})