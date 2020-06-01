<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\si_record;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Mockery\Exception;
use App\Models\User;

class UserController extends Controller {
    //
    protected $data = null;
    protected $msg = null;
    protected $wechat_api_status = 1;
    protected $openid_session_key;

    private function set_data ($mod, Request $request) {
        if (!$request->has(array_keys($mod))) {
            return $this->msg = error_msg(403, 0);
        }
        $data = $request->only(array_keys($mod));
        if (Validator::make($data, $mod)->fails()) {
            return $this->msg = error_msg(403, 2);
        }
        return $this->data = $data;
    }

    public function login (Request $request) {
        $mod = array(
            'code' => [
                'required',
                'regex:/^[a-zA-Z\d]+$/'//小程序调用验证code
            ],
            'nick_name' => ['required'],//昵称
            'avatarUrl' => ['required'],//头像地址
        );
        $this->set_data($mod, $request);
        if ($this->data === null) {
            return $this->msg;
        }
        try {
            $this->wechat_api_status = $this->get_openid_sessionkey($this->data['code']);
        } catch (Exception $wechat_error) {
            return error_msg($wechat_error->getCode(), $wechat_error->getMessage());
        }
//        dump($this->data);
        $user = new User();
        //"oZ_AN5ISqFZoLFDVhP9DU4TqK-F0" $this->openid_session_key['openid']
        $user = $user->firstOrCreate(['open_id' => $this->openid_session_key['openid']], [
            'username' => $this->data['nick_name'],
            'open_id' => $this->openid_session_key['openid'],//"oZ_AN5ISqFZoLFDVhP9DU4TqK-F0",$this->openid_session_key['openid']
            'avatarUrl' => $this->data['avatarUrl'],
            'vpr_num'=>3,
            'vpr_status'=>0
        ]);
        session(['login' => true, 'uid' => $user->id]);
        return msg(200, 1);
    }

    public function schedule (Request $request) {
        $mod = [
            'user_id' => [
                'required',
                'regex:/^\d+$/',
            ]
        ];
        $this->set_data($mod, $request);
        if ($this->data === null) {
            return $this->msg;
        }
        $u_si_record = si_record::query()
            ->join('sign_in', 'si_record.sign_in_id', '=', 'sign_in.id')
            ->join('small_group', 'sign_in.group_id', '=', 'small_group.id')
            ->where('si_record.user_id', $this->data['user_id'])->orderBy("start_time", 'desc')->get();
        $schedule = array();
        if ($u_si_record->isEmpty()) {
            return msg(200, $schedule);
        }
        $u_si_record = $u_si_record->toArray();
        $num = 1;
        foreach ($u_si_record as $item) {
            $location = json_decode($item['location'], true);
            $location = $location['name'];
            $status=null;
            switch ($item['status']){
                case 0:
                    $status="未签到";
                    break;
                case 1:
                    $status="已签到";
                    break;
                case 2:
                    $status="已迟到";
                    break;
            }
            $schedule += [
                "group" . $num => [
                    "group_name" => $item['group_name'],
                    "start_time" => $item['start_time'],
                    "end_time" => $item['end_time'],
                    "status" => $status,
                    "location" => $location,
                ]
            ];
            $num++;
        }
        return msg(200, $schedule);
    }

    public function attendance (Request $request) {
        $mod = [
            'user_id' => [
                'required',
                'regex:/^\d+$/',
            ]
        ];
        $this->set_data($mod, $request);
        if ($this->data === null) {
            return $this->msg;
        }
        $u_si_record = si_record::query()
            ->join('sign_in', 'si_record.sign_in_id', '=', 'sign_in.id')
            ->join('small_group', 'sign_in.group_id', '=', 'small_group.id')
            ->where([['si_record.user_id', $this->data['user_id']], ['status', '<>', '1']])
            ->get();
        $attendance = array();
        if ($u_si_record->isEmpty()) {
            return msg(200, $attendance);
        }
        $u_si_record = $u_si_record->toArray();

        foreach ($u_si_record as $item) {
            if (array_key_exists($item['group_id'], $attendance)) {
                $times = $attendance[$item['group_id']]['times'] + 1;
            } else {
                $times = 1;
            }
            $attendance[$item['group_id']] = [
                "group_name" => $item["group_name"],
                "times" => $times,
            ];
        }
        $result = array();
        $num = 1;
        foreach ($attendance as $item) {
            $result["group" . $num++] = $item;
        }
        return msg(200, $result);
    }

    public function manage (Request $request) {
        $mod = [
            'user_id' => [
                'required',
                'regex:/^\d+$/',
            ]
        ];
        $this->set_data($mod, $request);
        if ($this->data === null) {
            return $this->msg;
        }
        $user = User::query()->where('id', $this->data['user_id'])->first();
        $manage_group = array();
        if ($user->join_group === null) {
            return msg(200, $manage_group);
        }
        $join_group = json_decode($user->join_group, true);
        $num = 1;
        foreach ($join_group as $group) {
            if ($group['status'] === 1 || $group['status'] === 2) {
                $manage_group += ['group' . $num => [
                    'id' => $group['group_id'],
                    'group_name' => $group['group_name'],
                ]
                ];
                $num++;
            }
        }
        return msg(200, $manage_group);
    }

    //访问微信服务器接口，根据小程序提供code获取open_id和session_key
    private function get_openid_sessionkey ($code) {
        //微信服务器api
        $openid_seeeion_key_api = "https://api.weixin.qq.com/sns/jscode2session?";
        $openid_seeeion_key_api = $openid_seeeion_key_api . "appid=" . config('vphere.appid') . "&secret=" . config('vphere.secret') . "&js_code={$code}&grant_type=authorization_code";
        //获取openid和session_key
        $openid_session_key = $this->httpWechatGet($openid_seeeion_key_api);
        if (empty($openid_session_key)) {
            //post 数据为空 抛出错误 0 参数缺失
            throw new Exception(11, 403);
        }
        //返回
        //访问微信服务器api并json格式化微信服务器返回
        $openid_sessionkey_json = json_decode($openid_session_key, true);
        //键名获取
        $openid_sessionkey_json_keys = array_keys($openid_sessionkey_json);
        switch ($openid_sessionkey_json_keys[0]) {
            case "session_key":
                return $this->openid_session_key = $openid_sessionkey_json;
            case "errcode":
                throw new Exception($openid_sessionkey_json['errmsg'], 403);
            default:
                throw new Exception(9, 403);
        }
    }


    private function httpWechatGet ($url) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_TIMEOUT, 500);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_URL, $url);
        $result = curl_exec($curl);
        if (curl_errno($curl)) {
            return msg(500, 8);
        }
        curl_close($curl);
        return $result;
    }
}
