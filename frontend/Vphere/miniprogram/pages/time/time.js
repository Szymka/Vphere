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
    group:[],
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
         var json = {
           "group1": {
             "group_name": "test4",
             "start_time": "2020-05-15 16:33:29",
             "end_time": "2020-05-15 22:33:28",
             "status": "未签到",
             "location": "湖南省娄底市涟源市人民路49号"
           },
           "group2": {
             "group_name": "test4",
             "start_time": "2020-05-15 10:50:10",
             "end_time": "2020-05-15 22:00:00",
             "status": "已迟到",
             "location": "湖南省娄底市涟源市人民路49号"
           }
         };
         var nArr = [];
         for (var i in json) {
           nArr.push(json[i]);
         }
         console.log(json);
         console.log(nArr);  
       console.log(res.data);
         that.setData({
           items: res.data,
           hasuserinfo:true,
          //  group_name:res.data.data.group_name,
          //  start_time:res.data.data.start_time,
          //  end_time:res.data.data.end_time,
          //  staus:res.data.data.status
           group: nArr,
         })
         console.log(that.data.group);
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