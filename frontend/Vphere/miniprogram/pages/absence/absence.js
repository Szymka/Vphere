const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData01: [],
    tempFilePath:'',
    filePath:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.URL)
    var that = this
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

          listData01: items,
        })
        console.log(that.data.listData01)
      }
    })
  },
  download: function (e) {
    var that=this
    console.log(e);
    let type = e.currentTarget.dataset.type;
    let url=e.target.dataset.url
    
    var groupid = e.target.id
    console.log(groupid)
    console.log(url)
      var filePath
      wx.downloadFile({
        url: url,
        header: {
          'content-type':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'cookie': wx.getStorageSync("sessionid")
        },
        success: function (res) {
          console.log(res)
          console.log(res.tempFilePath)
          if(res.statusCode==200){
            that.setData({
              filePath:res.tempFilePath
            })
            console.log(that.data.filePath);
            wx.openDocument({
              filePath: that.data.filePath,
              success: function (res) {
                console.log('打开文档成功')
              },
              fail: function (res) {
                console.log(res);
                wx.showToast({
                  title: '文件打开失败',
                  image:"/images/fail.png",
                  duration:2500
                })
              },
              complete: function (res) {
                console.log(res);
              }
            })
          }
        },
        fail: function (res) {
          console.log('文件下载失败');
          wx.showToast({
            title: '文件下载失败',
            image:"/images/fail.png",
            duration:2500
          })
        },
        complete: function (res) { },
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