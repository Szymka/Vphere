const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemdata: [],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.stopPullDownRefresh()
    console.log(app.globalData.URL)
    var that = this
    wx.request({
      url: app.globalData.URL + '/user/attendance',
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
        var items = [];
        for (var i in res.data.data) {
          items.push(res.data.data[i]);
        }

        that.setData({
          itemdata: items,
        })
        console.log(that.data.itemdata)
      }
    })
    
  },
  onPullDownRefresh:function(){
    this.onLoad()
  },
  onShow:function(){
    
  }

})