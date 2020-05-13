<?php
use Illuminate\Http\Response;

function msg($code,$message){
    $status=Response::$statusTexts;
    if (is_int($message)){
        $message=message_arr($message);
    }
    $result = array(
        'code' => $code,
        'status' => $status[$code],
        'data' => $message
    );
    $re_arr=['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'];
    return \response()->json($result,$code,$re_arr,JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
}
//登录成功时返回的响应头部会携带cookies,拿出来存入storage,请求时将cookies设置在头部
function error_msg($code,$message){
    if (is_int($message)){
        $message=message_arr($message);
    }
    $result = array(
        'error' => $message
    );
    $re_arr=['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'];
    return \response()->json($result,$code,$re_arr,JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
}

function message_arr($msg_code){
    $message_arr=array(
        0=>"参数缺失",
        1=>"成功",
        2=>"数据格式错误",
        3=>"未登录",
        4=>"集体已存在,尝试更换集体名",
        5=>"所属集体不存在",
        9=>"未知错误",
        11=>"访问微信服务器故障"
    );
    return $message_arr[$msg_code];
}

