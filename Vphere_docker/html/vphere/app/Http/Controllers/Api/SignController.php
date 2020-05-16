<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\si_record;
use App\Models\sign_in;
use App\Models\U_SG_estb;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Facades\Validator;


class SignController extends Controller {
    //
    protected $data = null;
    protected $msg = null;
    protected $audio = null;
    protected $sign = null;
    protected $time = null;
    protected $uuid = null;
    protected $user_id = null;

    private function set_data ($mod, Request $request) {
        $mod += ['user_id' => [
            'required',
            'regex:/^\d+$/',
        ]];
        if (!$request->has(array_keys($mod))) {
            return $this->msg = error_msg(403, 0);
        }
        $data = $request->only(array_keys($mod));
        if (Validator::make($data, $mod)->fails()) {
            return $this->msg = error_msg(403, 2);
        }
        return $this->data = $data;
    }

    public function reg (Request $request) {

        $mod = array(
            'vphere' => ['required']
        );
        if (!$request->hasFile('vphere')) {
            return $this->msg = error_msg(403, 0);
        }
        $this->set_data($mod, $request);
        if ($this->data === null) {
            return $this->msg;
        }
        $this->audio = $request->file('vphere')->openFile();
        $this->audio = $this->audio->fread($this->audio->getSize());
        $user = User::query()->where('id', $this->data['user_id'])->first();
        $this->uuid = $user->open_id;
        if ($user->vpr_num === 0) {
            return error_msg(403, 8);
        }
        $vpr_mode = "enroll";
        $vpr_res = $this->vpr($vpr_mode);
        $vpr_res = json_decode($vpr_res, true);
        $vpr_res = $vpr_res['result'];
        if ($vpr_res['status'] === 0) {
            $vpr_text = $vpr_res['result'];
            $vpr_text = $vpr_text[0]['text'];
            if ($user->vpr_status === 2 && $vpr_text === 'enrlled') {
                $user->vpr_status = 1;
                $user->vpr_num = $user->vpr_num - 1;
            } else {
                $user->vpr_status = 2;
            }
            $user->save();
            if ($user->vpr_status === 2) {
                return msg(200, 10);
            } else if ($user->vpr_status === 1) {
                return msg(200, 1);
            } else if ($user->vpr_status === 0) {
                return msg(200, 12);
            }
        } else {
            return error_msg(403, $vpr_res['message'] . "请通知管理员维护");
        }
        return error_msg(403, 9);
    }

    public function in (Request $request) {
        $mod = array(
            'groupid' => [
                'required',
                'regex:/^\d+$/',
            ],
            'signid' => [
                'required',
                'regex:/^\d+$/',
            ],
            'vphere' => ['required']
        );
        if (!$request->hasFile('vphere')) {
            return $this->msg = error_msg(403, 0);
        }
        $this->set_data($mod, $request);
        if ($this->data === null) {
            return $this->msg;
        }
        $this->audio = $request->file('vphere')->openFile();
        $this->audio = $this->audio->fread($this->audio->getSize());
        $user = User::query()->where('id', $this->data['user_id'])->first();
        $this->uuid = $user->open_id;
        $vpr_mode = "test";
        $vpr_res = $this->vpr($vpr_mode);
        $vpr_res = json_decode($vpr_res, true);
        $vpr_res = $vpr_res['result'];
        if ($vpr_res['status'] === 0) {
            $vpr_text = $vpr_res['result'];
            $vpr_text = $vpr_text[0]['text'];
            if ($vpr_text === "accept") {
                $u_sg_estb = U_SG_estb::query()->where([['user_id', $this->data['user_id']], ['sg_id', $this->data['groupid']]])->first();
                if ($u_sg_estb === null) {
                    return error_msg(403, 13);
                }
                $sign = sign_in::query()->where('id', $this->data['signid'])->first();
                if ($sign === null) {
                    return error_msg(403, 14);
                }
                $u_si_record = si_record::query()->where([['user_id', $this->data['user_id']], ['sign_in_id', $this->data['signid']]])->first();
                if ($u_si_record=== null) {
                    return error_msg(403, 21);
                }
                if ($u_si_record->status !== 0) {
                    return error_msg(403, 15);
                }
                $sign_start = strtotime($sign->start_time);
                $sign_end = strtotime($sign->end_time);
                $sign_time = time();
                if ($sign_start <= $sign_time && $sign_time <= $sign_end) {
                    $u_si_record->status=1;
                    $u_si_record->save();
                    return msg(200, 1);
                } else if ($sign_time > $sign_end) {
                    $u_si_record->status=2;
                    $u_si_record->save();
                    return error_msg(403, 16);
                } else if ($sign_time < $sign_start) {
                    return error_msg(403, 17);
                }

            } else {
                return error_msg(403, $vpr_text);
            }
        } else {
            return error_msg(403, $vpr_res['message'] . "请通知管理员维护");
        }
        return error_msg(403, 9);
    }

    public function create (Request $request) {
        $mod = array(
            'groupid' => [
                'required',
                'regex:/^\d+$/',
            ],
            'start_time' => [
                'required',
                'regex:/^\d+$/',
            ],
            'end_time' => [
                'required',
                'regex:/^\d+$/',
            ],
            'location' => [
                'required',
                'string'
            ]
        );
        $this->set_data($mod, $request);
        if ($this->data === null) {
            return $this->msg;
        }
        $u_sg_estb = U_SG_estb::query()->where([['user_id', $this->data['user_id']], ['sg_id', $this->data['groupid']]])->first();
        if ($u_sg_estb === null) {
            return error_msg(403, 19);
        }
        if ($u_sg_estb->status === 1 || $u_sg_estb->status === 2) {
            $location = json_decode($this->data['location'], true);
            $location = json_encode($location, JSON_UNESCAPED_UNICODE);
            $u_sg_estb = U_SG_estb::query()->where([['sg_id', $this->data['groupid']], ['status', '<=', 1]])->pluck('user_id');
            if ($u_sg_estb->isEmpty()) {
                return msg(403, 20);
            }
            $sign = new sign_in([
                'creat_user' => $this->data['user_id'],
                'group_id' => $this->data['groupid'],
                'start_time' => date('Y-m-d H:i:s', $this->data['start_time']),
                'end_time' => date('Y-m-d H:i:s', $this->data['end_time']),
                'location' => $location,
            ]);
            $sign->save();
            $u_sg_estb = $u_sg_estb->toArray();
            foreach ($u_sg_estb as $user_id) {
                $si_record = new si_record([
                    "user_id" => $user_id,
                    "sign_in_id" => $sign->id,
                    "status"=>0,
                ]);
                $si_record->save();
            }
            return msg(200, 1);
        } else {
            return error_msg(403, 18);
        }
        return error_msg(403, 9);
    }

    public function status(Request $request){
        $mod=array();
        $this->set_data($mod, $request);
        if ($this->data === null) {
            return $this->msg;
        }
        $user=User::query()->where('id',$this->data['user_id'])->first();
        $status=$user->vpr_status;
        $result=array(
            "status"=>"未注册",
            "times"=>$user->vpr_num,
        );
        if ($status===1){
            $result['status']="已注册";
        }elseif ($status===2){
            $result['status']="注册中";
        }
        return msg(200,$result);
    }

    protected function vpr ($vpr_mode) {
        $this->sign_time_uuid();
        $url = 'https://aiapi.jd.com/jdai/vpr';
        $encode = [
            'channel' => 1,
            'format' => 'wav',//文件格式
            'sample_rate' => 16000,
        ];
        $Property = [
            'platform' => 'Linux&Centos&7.3',
            'version' => '0.0.0.1',
            'vpr_mode' => $vpr_mode,#enroll test
            'autoend' => 'false',
            'encode' => $encode,
        ];

        $headers = [
            'Content-Type' => 'application/octet-stream',
//            'Application-Id' => '123456789',//业务方应用名称，由业务方在客户端自行生成,非必填
            'Request-Id' => $this->uuid,//机器码,随机作用
            'User-Id' => $this->user_id, // your user-id必填,每个用户修改,可以使用open-id
            'Sequence-Id' => '-1',
            'Server-Protocol' => '1',
            'Net-State' => '2',
            'Applicator' => '1',
            'Property' => json_encode($Property),
        ];
        $query = [
            'appkey' => config("vphere.vpr_appkey"), #need change to your appkey
            'timestamp' => $this->time,
            'sign' => $this->sign,
        ];

        $client = new Client();
        $response = $client->request('POST', $url, ['verify' => false, 'headers' => $headers, 'query' => $query, 'body' => $this->audio]);
        return $response->getBody()->getContents();
    }

    protected function sign_time_uuid () {
        //需要添加异常处理
        $this->uuid = Uuid::uuid1()->toString();
        $this->time = (int)(microtime(true) * 1000);
        $this->sign = md5(config('vphere.vpr_secretkey') . $this->time);
    }
}
