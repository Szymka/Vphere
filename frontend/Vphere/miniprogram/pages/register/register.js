const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:"",
    times:"",
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.URL)
    var that = this
    wx.request({
      url: app.globalData.URL + '/sign/status',
      header: {
        'contenr-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function (res) {
        console.log(res.data);
        if (res.statusCode == 401) {
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
        
        that.setData({
          status: res.data.data.status,
          times:res.data.data.times,
        })
      }
    })  
  },
  gotoregister:function()
  {
    wx.navigateTo({
      url: '/pages/register01/register01',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})