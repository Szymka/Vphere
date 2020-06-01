const app = getApp();
const pages = getCurrentPages()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list01:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    wx.stopPullDownRefresh()
    var that=this
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
              list01: items,
            })
            console.log(that.data.list01)
            }
        })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  bdelete:function(res){
    console.log(res.target.id)
    wx.showModal({
      title: '温馨提示',
      content: '是否确定解散该集体',
      success: function (e) {
        if (e.cancel) {
          console.log("点击了取消")
        } else if (e.confirm) {
          console.log("确定")
          wx.request({
            url: app.globalData.URL + '/group/large/dissolve',
            data: {
              groupid: res.target.id
            },
            header: {
              'contenr-type': 'application/json',
              'cookie': wx.getStorageSync("sessionid")
            },
            success: function (res) {
              console.log(res)
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
                wx.showToast({
                  title: '已解散',
                  icon: 'success'
                })
                if (getCurrentPages().length != 0) {
                  getCurrentPages()[getCurrentPages().length - 1].onShow()
                }
              }else if(res.statusCode==403){
                wx.showModal({
                  title: '温馨提示',
                  content: res.data.error,
                })
              }else {
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
  sdelete:function(res){
    console.log(res.target.id)
    wx.showModal({
      title: '温馨提示',
      content: '是否确定解散该集体',
      success: function (e) {
        if (e.cancel) {
          console.log("点击了取消")
        } else if (e.confirm) {
          console.log("确定")
          wx.request({
            url: app.globalData.URL + '/group/small/dissolve',
            data:{
              groupid: res.target.id
            },
            header: {
              'contenr-type': 'application/json',
              'cookie': wx.getStorageSync("sessionid")
            },
            success: function (res) {
              console.log(res)
              if (res.statusCode == 200) {
                wx.showToast({
                  title: '已解散',
                  icon: 'success'
                })
                if (getCurrentPages().length != 0) {
                  getCurrentPages()[getCurrentPages().length - 1].onShow()
                }
              } else if (res.statusCode == 403) {
                wx.showModal({
                  title: '温馨提示',
                  content: res.data.error,
                })
              }else {
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onShow()
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