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

  // download:function(res){
  //   console.log(res)
    
  //   let kind=res.target.id
  //   let url = app.globalData.URL + '/group/large/situation?id=kind'
  //   if(kind==0){
  //     url = app.globalData.URL + '/group/small/situation?id=kind'
  //   }
  //   console.log(kind)
  //   wx.getSavedFileList({  // 获取文件列表
  //     success(res) {
  //       res.fileList.forEach((val, key) => { // 遍历文件列表里的数据
  //         // 删除存储的垃圾数据
  //         wx.removeSavedFile({
  //           filePath: val.filePath
  //         });
  //       })
  //     }
  //   })
  //   wx.downloadFile({
  //     url: url,
  //     success: function (res) {
  //       console.log(res)
  //       const tempFilePath = res.tempFilePath;
  //       console.log(tempFilePath)
  //       // 保存文件
  //       wx.saveFile({
  //         tempFilePath,
  //         success: function (res) {
  //           const savedFilePath = res.savedFilePath;
  //           // 打开文件
  //           wx.openDocument({
  //             filePath: savedFilePath,
  //             success: function (res) {
  //               console.log('打开文档成功')
  //             },
  //           });
  //         },
  //         fail: function (err) {
  //           console.log('保存失败：', err)
  //         }
  //       });
  //     },
  //     fail: function (err) {
  //       console.log('下载失败：', err);
  //     },
  //   });
  // },
  download: function (e) {
    var that=this
    console.log(e);
    let type = e.currentTarget.dataset.type;
    let url=e.target.dataset.url
    // switch (type) {
    //   case "pdf":
    //     url += 'pdf';
    //     break;
    //   case "word":
    //     url += 'docx';
    //     break;
    //   case "excel":
    //     url += 'xlsx';
    //     break;
    //   default:
    //     url += 'pptx';
    //     break;
    // }
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