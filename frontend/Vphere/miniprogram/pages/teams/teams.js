const app = getApp();
const pages = getCurrentPages()
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
    wx.stopPullDownRefresh()
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
      }
    })
  },
  quit:function(res){
    console.log(res.target.id)
    wx.showModal({
      title: '温馨提示',
      content: '是否确定退出该集体',
      success: function (e) {
        if (e.cancel) {
          console.log("点击了取消")
        } else if (e.confirm) {
          console.log("确定")
          wx.request({
            url: app.globalData.URL + '/group/quit',
            header: {
              'contenr-type': 'application/json',
              'cookie': wx.getStorageSync("sessionid")
            },
            data:{
              groupid: res.target.id
            },
            success: function (res) {
              console.log(res)
              if (res.statusCode == 200) {
                wx.showToast({
                  title: '已退出',
                  icon: 'success'
                })
                if (getCurrentPages().length != 0) {
                  getCurrentPages()[getCurrentPages().length - 1].onLoad()
                }
              } else {
                wx.showToast({
                  title: '操作失败',
                  image: '/images/fail.png'
                })
              }
            },
            fail: function (res) {
              console.log(res)
              wx.showToast({
                title: '操作失败',
                icon: 'success'
              })
            }
          })
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
    this.onLoad()
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