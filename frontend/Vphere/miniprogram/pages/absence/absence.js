const app = getApp();
Page({
  data: {
    listData: [],
    listData01: [],
  },
  onLoad: function (options) {
    console.log(app.globalData.URL)
    var that = this
    wx.request({
      url: app.globalData.URL + '/group/joined',
      header: {
        'contenr-type': 'application/json',
        'cookie': wx.getStorageInfoSync("sessionid")
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          list: res.data,
        })
        wx.request({
          url: app.globalData.URL + '/group/manage',
          header: {
            'contenr-type': 'application/json',
            'cookie': wx.getStorageInfoSync("sessionid")
          },
          success: function (res) {
            console.log(res.data);
            that.setData({
              list01: res.data,
            })
          }
        })
      }
    })
  },

  download: function (e) {
    console.log(e);
    let type = e.currentTarget.dataset.type;
    let url = e.currentTarget.dataset.url;
    switch (type) {
      case "pdf":
        url += 'pdf';
        break;
      case "word":
        url += 'docx';
        break;
      case "excel":
        url += 'xlsx';
        break;
      default:
        url += 'pptx';
        break;
    }
    wx.downloadFile({
      url: url,
      header: {},
      success: function (res) {
        var filePath = res.tempFilePath;
        console.log(filePath);
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        })
      },
      fail: function (res) {
        console.log('文件下载失败');
      },
      complete: function (res) { },
    })

  },
})