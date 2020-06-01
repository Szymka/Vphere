const app = getApp();
var util=require('../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:"",
    endTime:"",
    array: [],
    array01:[],
    group_id:[],
    index:'',
    mode:"dateTime",
    location:{},
    group_id01:'',
    groupindex:'',
    
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    var that=this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(that.data.array01[e.detail.value])
    this.setData({
      index: e.detail.value,
      group_id01: that.data.array01[e.detail.value]
    })
    console.log(that.data.group_id01)
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
    console.log(app.globalData.URL)
    var that = this
    wx.request({
      url: app.globalData.URL + '/user/manage',
      header: {
        'contenr-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function (res) {
        console.log(res.data.data);
        var items=[];
        for(var i in res.data.data){
          items.push(res.data.data[i].group_name)
        }
        var items01=[];
        for(var i in res.data.data){
          items01.push(res.data.data[i].id)
        }
        console.log(items01)
        console.log(items)
        that.setData({
          array: items,
          array01:items01
        })
        console.log(that.data.array)
        console.log(that.data.array01)
      }
    })
  },

  formSubmit:function(e){
    var that=this
    console.log(that.data.time)
    console.log(that.data.endTime)
    console.log(JSON.stringify(that.data.location))
        wx.request({
        url: app.globalData.URL + '/sign/create',
        data: {
          start_time: Date.parse(that.data.time)/1000,
          end_time: Date.parse(that.data.endTime)/1000,
          location: JSON.stringify(that.data.location),
          groupid:that.data.group_id01
        },
        method: 'POST',
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
          }else if (res.statusCode == 403) {
            if (that.data.time==''){
              wx.showModal({
                title: '温馨提示',
                content: '起始时间未设置',
              })
            } else if (that.data.endTime==''){
              wx.showModal({
                title: '温馨提示',
                content: '终止时间未设置',
              })
            } else if (JSON.stringify(that.data.location).length==2){
              wx.showModal({
                title: '温馨提示',
                content: '考勤地点未设置',
              })
            } else if (that.data.group_id01==''){
              wx.showModal({
                title: '温馨提示',
                content: '未选择考勤集体',
              })
            }else{
            wx.showModal({
              title: '温馨提示',
              content: res.data.data,
            })
            }
          } else if(res.statusCode==200){
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1000
            })
          }
        }
      })
  // }
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
    var that=this
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        _page.setData({
          chooseAddress: res.name,
          location:res
        });
        console.log(that.data.location)
      },
      fail: function (err) {
        console.log(err)
      }
    });
  }
})