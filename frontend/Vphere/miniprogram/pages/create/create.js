const app = getApp();
const pages = getCurrentPages()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    groupid:[],
    largegroupid:"",
    index:'',
    groupindex:''
  },
  bindPickerChange: function (e) {
    
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      largegroupid: this.data.groupid[e.detail.value]
    })
    console.log(this.data.largegroupid)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(app.globalData.URL)
    var that = this
    wx.request({
      url: app.globalData.URL + '/group/large_group',
      header: {
        'contenr-type': 'application/json',
      },
      success: function (res) {
        console.log(res.data);
        var items=[0,]
        var items01=["无",]
        for (var i in res.data.data) {
          items.push(res.data.data[i].group_id);
          items01.push(res.data.data[i].group_name)
        }
        console.log(items)
        console.log(items01)
        that.setData({
          array: items01,
          groupid:items
        })
        
        console.log(that.data.array)
        console.log(that.data.groupid)
      }
    })
  },



  test:function(e){
    var that=this
    console.log(e)
    
      wx.request({
        url: app.globalData.URL + '/group/create',
        data: {
          name: e.detail.value.name,
          belong: that.data.largegroupid,
        },
        method:'POST',
        header: {
          'contenr-type': 'application/x-www-form-urlencoded',
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
          }else if(res.statusCode==403){
            wx.showModal({
              title: '温馨提示',
              content: res.data.error,
            })
          }else{
            wx.showToast({
              title: '提交成功',
              icon:'success',
              duration:2000
            })
            if (getCurrentPages().length != 0) {
              getCurrentPages()[getCurrentPages().length - 1].onLoad()
            }
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