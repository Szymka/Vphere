const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemdata:[]
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
        //  var json = {
        //    "group1": {
        //      "group_name": "test4",
        //      "start_time": "2020-05-15 16:33:29",
        //      "end_time": "2020-05-15 22:33:28",
        //      "status": "未签到",
        //      "locataion": "湖南省娄底市涟源市人民路49号"
        //    },
        //    "group2": {
        //      "group_name": "test4",
        //      "start_time": "2020-05-15 10:50:10",
        //      "end_time": "2020-05-15 22:00:00",
        //      "status": "已迟到",
        //      "locataion": "湖南省娄底市涟源市人民路49号"
        //    }
        //  };
        //  for (var i in json) {
        //    nArr.push(json[i]);
        //  }
        //  console.log(nArr)
        
        var items=[];
         for (var i in res.data.data){
           items.push(res.data.data[i]);
        }
        console.log(items)
         that.setData({
           itemdata:items,
         })
         console.log(that.data.itemdata)
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