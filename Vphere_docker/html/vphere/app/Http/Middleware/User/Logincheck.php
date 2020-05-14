<?php

namespace App\Http\Middleware\User;

use Closure;

class Logincheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(session()->has('login') && session('login') === true) {
            $uid=session('uid');
            $request->request->set("user_id",$uid);
            return $next($request);
        } else {
            // 未登录返回 未登录
            // 正常情况不会出现未登录
            return  error_msg(401,3);
        }
    }
}
