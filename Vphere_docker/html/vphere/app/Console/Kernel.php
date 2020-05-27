<?php

namespace App\Console;

use App\Models\access;
use App\Models\sign_in;
use App\Models\U_SG_estb;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use GuzzleHttp\Client;

class Kernel extends ConsoleKernel {
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule (Schedule $schedule) {
        // $schedule->command('inspire')->hourly();
        $send_start_time = time();
        $send_start_time = $send_start_time + 600;
        $send_end_time = $send_start_time + 60000000;
        $send_start_time = date("Y-m-d H:i:s", $send_start_time);
        $send_end_time = date("Y-m-d H:i:s", $send_end_time);
        $signs = sign_in::query()->select(['sign_in.*','small_group.group_name'])
            ->join('small_group', 'small_group.id', '=', 'sign_in.group_id')
            ->where([['start_time', '>', $send_start_time], ['start_time', '<', $send_end_time], ['send', 0]])
            ->get();
        if (!$signs->isEmpty()) {
            $signs = $signs->toArray();
            foreach ($signs as $sign) {
                $location = json_decode($sign['location'], true);
                $address = $location['address'];
                $groupname = $sign['group_name'];
                $start_time = $sign['start_time'];
                $end_time = $sign['end_time'];
                $sign=sign_in::query()->where('id',$sign['id'])->first();
                $sign->send=1;
                $sign->save();
                $openids = U_SG_estb::query()
                    ->join('users', 'users.id', '=', 'u_sg_estb.user_id')
                    ->pluck('users.open_id');
                foreach ($openids as $openid) {
                    $res=$this->sendMsg($openid, $groupname, $start_time, $end_time, $address);
                    dump($res);
                }
            }
        }
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands () {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }

    protected function sendMsg ($openid, $groupname, $start_time, $end_time, $address) {
        //access_token
        $access_token = $this->getAccessToken();

        //请求url
        $url = 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' . $access_token;

        //发送内容
        $data = [];

        //接收者（用户）的 openid
        $data['touser'] = $openid;
        //$openid;

        //所需下发的订阅模板id
        $data['template_id'] = config('vphere.template_id');

        //点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
        $data['page'] = 'index';

        //模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }
        $data['data'] = [
            "thing1" => [
                'value' => $groupname,
            ],
            "date4" => [
                'value' => date('Y-m-d H:i:s', time())
            ],
            "time5" => [
                'value' => $start_time
            ],
            'time13' => [
                'value' => $end_time
            ],
            'thing14' => [
                'value' => $address
            ]
        ];

        //跳转小程序类型：developer为开发版；trial为体验版；formal为正式版；默认为正式版
        $data['miniprogram_state'] = 'formal';
        $client = $client = new Client();
        $response = $client->request('POST', $url, ['verify' => false, 'body' => json_encode($data)]);
        $res = $response->getBody()->getContents();

        return $res;
    }

    protected function getAccessToken () {
        //当前时间戳
        $now_time = strtotime(date('Y-m-d H:i:s', time()));

        //失效时间
        $timeout = 7200;

        //判断access_token是否过期
        $before_time = $now_time - $timeout;
        $before_time = date("Y-m-d H:i:s",$before_time);
        //未查找到就为过期
        $access_token = access::query()->where([['id', 1], ['updated_at', '>', $before_time]])->first();
        //如果过期
        if (!$access_token) {
            //获取新的access_token
            $appid = config('vphere.appid');
            $secret = config('vphere.secret');
            $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" . $appid . "&secret=" . $secret;
            $client = $client = new Client();
            $response = $client->request('GET', $url, ['verify' => false,]);
            $res = $response->getBody()->getContents();
            $res = json_decode($res, true);
            $access_token=access::query()->updateOrCreate(['id'=>1],['access_token'=>$res['access_token']]);
            //更新数据库
        }
        return $access_token->access_token;
    }

}
