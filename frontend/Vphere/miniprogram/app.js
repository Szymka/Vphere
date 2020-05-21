
App({
  //设置全局请求URL
  globalData: {
    URL: 'https://vphere.yanmy.top/api',
    // URL: 'http://vphere.top/api',
  },
  
  wxRequest(method, url, data, callback, errFun) {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        'content-type': method == 'GET' ? 'application/json' : 'multipart/form-data',
        'Accept': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        callback(res.data);
      },
      fail: function (err) {
        errFun(res);
      }
    })
  },

})