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
    console.log(app.globalData.URL)
    var that = this
    wx.request({
      url: app.globalData.URL + '/sign/record',
      header: {
        'contenr-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function (res) {
        // var json = {
        //   "group1": {
        //     "group_id": 2,
        //     "group_name": "高数",
        //     "sign_in_id": 6,
        //     "locataion": "湘大逸夫楼"
        //   },
        //   "group2": {
        //     "group_id": 3,
        //     "group_name": "英语",
        //     "sign_in_id": 7,
        //     "locataion": "湘大逸夫楼"
        //   }
        // }
        // var items = [];
        // for (var i in json) {
        //   items.push(json[i]);
        // }
        // console.log(items)
        // that.setData({

        //   list: items,
        // })
        // console.log(that.data.list)  

        console.log(res.data);
        if (res.statusCode == 403) {
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