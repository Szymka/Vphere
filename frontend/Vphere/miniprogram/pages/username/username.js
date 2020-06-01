const app = getApp();
const pages = getCurrentPages()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupid:'',
    username:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    console.log(options.groupid)
    that.setData({
      groupid: options.groupid,
    })
    console.log(that.data.groupid)
  },
  add:function(e){
    console.log(e)
    var that =this
    wx.showModal({
      title: '提示',
      content: '是否确定加入此集体',
      success(res) {
        console.log(that.data.groupid)
        wx.request({
          method: 'POST',
          url: app.globalData.URL + '/group/join',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': wx.getStorageSync("sessionid")
          },
          data: {
            groupid: that.data.groupid,
            name:e.detail.value.name
          },
          success: function (res) {
            console.log(res.statusCode)
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
            }else if (res.statusCode == 200) {
              console.log(res.data)
              wx.showToast({
                title: '已加入',
                icon: 'success',
              })
            } else {
              console.log(res.data)
              wx.showModal({
                title: '错误信息',
                content: res.data.error,
              })
            }
            // wx.navigateBack({
            //     delta:1
            //   })
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