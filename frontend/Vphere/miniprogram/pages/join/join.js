const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
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
  choose:function(e){
    var that=this
    var group_id=e.target.id
    console.log(group_id)
    wx.showModal({
      title: '提示',
      content: '是否加入此集体',
      success(res){
        console.log(group_id)
        wx.request({          
          method:'POST',
          url: app.globalData.URL + '/group/join',
          header:{
            'content-type':'application/x-www-form-urlencoded',
            'cookie': wx.getStorageSync("sessionid")
          },
          data:{
            groupid: group_id,
          },
          success: function (res) {
            console.log(res.statusCode)
            if (res.statusCode == 200)
            {
              console.log(res.data)
              wx.showToast({
                title: '成功加入',
                icon:'success',
                duration:2000,
              })
            }else{
              console.log(res.data)
              wx.showModal({
                title: '错误信息',
                content: res.data.error,
              })
            }
            
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