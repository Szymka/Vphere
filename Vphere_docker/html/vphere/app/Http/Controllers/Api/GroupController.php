<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\large_group;
use App\Models\SG_LG_estb;
use App\Models\small_group;
use App\Models\U_SG_estb;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class GroupController extends Controller {
    //
    protected $data = null;
    protected $msg = null;

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

    public function create (Request $request) {
        $mod = array(
            'name' => ['required'],
            'belong' => [
                'required',
                'regex:/^\d+$/',
            ],
        );
        $this->set_data($mod, $request);
        if ($this->data === null) {
            return $this->msg;
        }

        if (intval($this->data['belong']) === 0) {
            $lg_group = large_group::query()->where([["group_name", $this->data['name']], ["create_user", $this->data['user_id']]])->first();
            if ($lg_group !== null) {
                return error_msg(403, 4);
            }
            $lg_group = new large_group();
            $lg_group->firstOrCreate([
                "group_name" => $this->data['name'],
                "create_user" => $this->data['user_id'],
            ], [
                "group_name" => $this->data['name'],
                "create_user" => $this->data['user_id'],
            ]);
            $lg_group = large_group::query()->where([["group_name", $this->data['name']], ["create_user", $this->data['user_id']]])->first();
            $user = User::query()->where('id', $this->data['user_id'])->first();
            if ($user->join_group === null) {
                $user_group = array();
                $numgroup = 1;
            } else {
                $user_group = json_decode($user->join_group, true);
                $numgroup = count($user_group) + 1;
            }
            $user_group += array("lgroup" . $numgroup => array("status" => 2, "group_id" => $lg_group->id, "group_name" => $lg_group->group_name));
            $user->join_group = json_encode($user_group);
            $user->save();
        } else {
            $lg_group = large_group::query()->where("id", $this->data['belong'])->first();
            if ($lg_group === null) {
                return error_msg(403, 5);
            }
            $sm_group = small_group::query()->where([["group_name", $this->data['name']], ["create_user", $this->data['user_id']]])->first();
            if ($sm_group !== null) {
                return error_msg(403, 4);
            }
            $sm_group = new small_group();
            $sm_group->firstOrCreate([
                "group_name" => $this->data['name'],
                "create_user" => $this->data['user_id'],
            ], [
                "group_name" => $this->data['name'],
                "create_user" => $this->data['user_id'],
            ]);
            $sm_group = small_group::query()->where([["group_name", $this->data['name']], ["create_user", $this->data['user_id']]])->first();
            $user = User::query()->where('id', $this->data['user_id'])->first();
            if ($user->join_group === null) {
                $user_group = array();
                $numgroup = 1;
            } else {
                $user_group = json_decode($user->join_group, true);
                $numgroup = count($user_group) + 1;
            }
            $user_group += array("sgroup" . $numgroup => array("status" => 2, "group_id" => $sm_group->id, "group_name" => $sm_group->group_name));
            $user->join_group = json_encode($user_group, JSON_UNESCAPED_UNICODE);
            $user->save();
            $u_sg_estb = new U_SG_estb([
                "user_id" => $user->id,
                "sg_id" => $sm_group->id,
                "remark" => $user->username,
                "status" => 2,
            ]);
            $u_sg_estb->save();
            $sg_lg_estb = new SG_LG_estb([
                "sg_id" => $sm_group->id,
                "lg_id" => $lg_group->id,
            ]);
            $sg_lg_estb->save();
            return msg(200, 1);
        }

    }

    public function join (Request $request) {
        $mod = array(
            'id' => [
                'required',
                'regex:/^\d+$/',
            ],
        );
        $this->set_data($mod, $request);
        if ($this->data === null) {
            return $this->msg;
        }
        $sm_group = small_group::query()->where('id', $this->data['id'])->first();
        if ($sm_group === null) {
            return error_msg(403, 6);
        }
        $user = User::query()->where('id', $this->data['user_id'])->first();
        $u_sg_estb = U_SG_estb::query()->where([["user_id", $this->data['user_id']], ["sg_id", $this->data['id']]])->first();
        if ($u_sg_estb !== null) {
            return error_msg(403, 7);
        }
        if ($user->join_group === null) {
            $user_group = array();
            $numgroup = 1;
        } else {
            $user_group = json_decode($user->join_group, true);
            $numgroup = count($user_group) + 1;
        }
        $user_group += array("sgroup" . $numgroup => array("status" => 0, "group_id" => $sm_group->id, "group_name" => $sm_group->group_name));
        $user->join_group = json_encode($user_group, JSON_UNESCAPED_UNICODE);
        $user->save();
        $u_sg_estb = new U_SG_estb([
            "user_id" => $user->id,
            "sg_id" => $sm_group->id,
            "remark" => $user->username,
            "status" => 0,
        ]);
        $u_sg_estb->save();
        return msg(200, 1);
    }

    public function joined (Request $request) {
        $mod = array();
        $this->set_data($mod, $request);
        $user = User::query()->where('id',$this->data['user_id'])->first();
        if ($user->join_group === null) {
            $user_group = array();
        } else {
            $user_group = json_decode($user->join_group, true);
        }
        return msg(200, $user_group);
    }

    public function small_group(){
        $small_group=small_group::query()->get();
        $result=array();
        if ($small_group->isEmpty()){
            return msg(200,$result);
        }
        $small_group=$small_group->toArray();

        $num=1;
        foreach ($small_group as $group){
            $result+=[
              "group".$num++=>[
                  "group_id"=>$group['id'],
                  "group_name"=>$group['group_name'],
              ]
            ];
        }
        return msg(200,$result);
    }
    public function large_group(){
        $large_group=large_group::query()->get();
        $result=array();
        if ($large_group->isEmpty()){
            return msg(200,$result);
        }
        $large_group=$large_group->toArray();
        $num=1;
        foreach ($large_group as $group){
            $result+=[
                "group".$num++=>[
                    "group_id"=>$group['id'],
                    "group_name"=>$group['group_name'],
                ]
            ];
        }
        return msg(200,$result);
    }
}
