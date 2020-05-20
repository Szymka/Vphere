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
        // var json={
        //   "group1": {
        //     "group_name": "高数",
        //     "times": 2
        //   },
        //   "group2": {
        //     "group_name": "英语",
        //     "times": 1
        //   }
        // }
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


})