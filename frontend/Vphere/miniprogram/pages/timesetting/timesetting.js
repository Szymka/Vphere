const app = getApp();
var util=require('../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:"点击选择考勤起始时间",
    endTime:"点击选择考勤终止时间",
    array:['点击选择考勤集体',],
    index:0,
    mode:"dateTime"
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindStartTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindEndTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endTime: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time=util.formatTime(new Date())
    console.log(time)
    console.log(app.globalData.URL)
    var that = this
    wx.request({
      url: app.globalData.URL + '/group/manage',
      header: {
        'contenr-type': 'application/json',
        'cookie': wx.getStorageInfoSync("sessionid")
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          array: res.data,
        })
      }
    })
  },

  formSubmit:function(e){
    if (e.detail.value.name.length == 0) {
      wx.showToast({
        title: '考勤集体不能为空',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
      }else if(e.detail.value.starttime.length==0){
      wx.showToast({
        title: '起始时间不能为空',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.endtime.length == 0) {
      wx.showToast({
        title: '终止时间不能为空',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
      else{
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log("当前时间戳为：" + timestamp);
        wx.request({
        url: app.globalData.URL + '/sign/create',
        data: {
          start_time:e.detail.value.starttime,
          end_time:e.detail.value.endtime,
          
        },
        method: 'POST',
        header: {
          'contenr-type': 'application/x-www-form-urlencoded',
          'cookie': wx.getStorageInfoSync("sessionid")
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.status == 0) {
            wx.showToast({
              title: '提交失败',
              icon: 'loading',
              duration: 1500
            })
          } else {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1000
            })
          }
        }
      })
    }
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

  },
   //移动选点
 onChangeAddress: function () {
    var _page = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        _page.setData({
          chooseAddress: res.name
        });
        
      },
      fail: function (err) {
        console.log(err)
      }
    });
  }
})