// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      urlpath: "/pages/join/join",
      text_feature:"加入集体"
    },
    {
      urlpath: "/pages/create/create",
      text_feature: "创建集体"
    },
    {
      urlpath: "/pages/teams/teams",
      text_feature: "已创建及已加入集体"
    },
    {
      urlpath: "/pages/absence/absence",
      text_feature: "已创建集体缺勤情况"
    },
    {
      urlpath: "/pages/timesetting/timesetting",
      text_feature: "设置考勤时间"
    }
    ]
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