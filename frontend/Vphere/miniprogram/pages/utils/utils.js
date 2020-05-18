function formatTime(date, type) {
 
let reg = /^\d+$/g;
 
var date = reg.test(date) ? new Date(Number(date)) : new Date(date)
 
var year = date.getFullYear()
 
var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
 
var day = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
 
var time = date.toTimeString()
 
 
switch (type) {
 
case 1: // 转换日期为21:37
 
return time.substr(0, 5);
 
case 2: // 转换日期为2019-03-08 15:50
 
return year + '-' + month + '-' + day + '' + ' ' + time.substr(0, 5);
 
case 3: // 转换日期为昨天21:37
 
return '昨天' + time.substr(0, 5);
 
case 4: // 转换日期为周日
 
return '周日' + time.substr(0, 5);
 
 
case 6: // 获取某一天
 
return date.getDay();
 
 
case 7: // 转换为2019.1.9
 
return year + '.' + month + '.' + day;
 
case 8: // 转换为时间戳
 
return Number(date)
 
 
case 9: // 03.10
 
return month + '.' + day
 
 
default:
 
break;
 
}
 
}
 
//输出函数
 
module.exports = {
 
formatTime,
 
 
 
}