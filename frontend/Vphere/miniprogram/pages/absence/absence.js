Page({
  data: {
    listData: [
      { "code": "01", "text": "高等数学" },
      { "code": "02", "text": "C语言程序设计"},
      { "code": "03", "text": "线性代数" },
      { "code": "04", "text": "离散数学"},
      { "code": "05", "text": "大学英语"},
      { "code": "06", "text": "大学体育"},
      { "code": "07", "text": "大学物理"}
    ]
  },
  onLoad: function () {
    console.log('onLoad')
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