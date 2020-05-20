const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],
    group_name:[],
    start_time:{},
    end_time:[],
    location:[],
    status:[],
    hasuserinfo:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.URL)
    var that=this
    wx.request({
      url: app.globalData.URL + '/user/schedule',
       header:{
         'contenr-type':'application/json',
         'cookie':wx.getStorageSync("sessionid")
       },
       success:function(res){
         
       console.log(res.data);
         that.setData({
           items: res.data,
           hasuserinfo:true,
          //  group_name:res.data.data.group_name,
          //  start_time:res.data.data.start_time,
          //  end_time:res.data.data.end_time,
          //  staus:res.data.data.status
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