const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      name:"18网一"
    },
    {
      name:"18网二"
    },
    {
        name: "18软二"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.URL)
    var that = this
    wx.request({
      url: app.globalData.URL + '/group/small_group',
      method:"GET",
      header: {
        'contenr-type': 'application/json',
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          list: res.data,
        })
      }
    })
  },
  choose:function(){
    wx.showModal({
      title: '提示',
      content: '是否加入此集体',
      success(res){
        wx.request({
          method:'POST',
          url: app.globalData.url + '/group/join',
          header:{
            'content-type':'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data)
          },
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