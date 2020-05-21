<?php

use Illuminate\Http\Response;

function msg ($code, $message) {
    $status = Response::$statusTexts;
    if (is_int($message)) {
        $message = message_arr($message);
    }
    $result = array(
        'code' => $code,
        'status' => $status[$code],
        'data' => $message
    );
    $re_arr = ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'];
    return \response()->json($result, $code, $re_arr, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}

//登录成功时返回的响应头部会携带cookies,拿出来存入storage,请求时将cookies设置在头部
function error_msg ($code, $message) {
    if (is_int($message)) {
        $message = message_arr($message);
    }
    $result = array(
        'error' => $message
    );
    $re_arr = ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'];
    return \response()->json($result, $code, $re_arr, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}

function message_arr ($msg_code) {
    $message_arr = array(
        0 => "参数缺失",
        1 => "成功",
        2 => "数据格式错误",
        3 => "未登录",
        4 => "集体已存在,尝试更换集体名",
        5 => "所属集体不存在",
        6 => "集体不存在",
        7 => "已经加入集体,不要重复加入",
        8 => "用户声纹注册次数已用完",
        9 => "未知错误",
        10 => "声纹注册中,请再试一次",
        11 => "访问微信服务器故障",
        12 => "用户声纹未注册",
        13 => "未加入集体",
        14 => "签到记录不存在",
        15 => "签到已完成,请勿重复签到",
        16 => "签到成功但是已迟到",
        17 => "签到未开始",
        18 => "没有权限",
        19 => "集体或用户不存在",
        20 => "集体内没有成员",
        21 => "未加入小组签到已发布,或签到未发布",
        22 => "系统中还没有集体",
        23 => "无权限",
        24 => "声纹信息注册成功",
        25 => "声纹信息修改成功",
        26 => "不在签到范围内",
        27 => "没有未签到记录",
    );
    return $message_arr[$msg_code];
}

