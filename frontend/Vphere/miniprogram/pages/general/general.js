const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],
    group_name:[],
    number:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        that.setData({
          items: res.data,
        })
      }
    })
    
  },


})