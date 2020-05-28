const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    list01:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.URL)
    var that = this
    wx.request({
      url: app.globalData.URL + '/group/joined',
      header: {
        'contenr-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function (res) {
        console.log(res.data.data);
        var items = [];
        for (var i in res.data.data) {
          items.push(res.data.data[i]);
        }
        console.log(items)
        that.setData({

          list: items,
        })
        console.log(that.data.list)
        wx.request({
          url: app.globalData.URL + '/group/manage',
          header: {
            'contenr-type': 'application/json',
            'cookie': wx.getStorageSync("sessionid")
          },
          success: function (res) {
            console.log(res.data.data);
            var items = [];
            for (var i in res.data.data) {
              items.push(res.data.data[i]);
            }
            console.log(items)
            that.setData({

              list01: items,
            })
            console.log(that.data.list01)
            }
        })
      }
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