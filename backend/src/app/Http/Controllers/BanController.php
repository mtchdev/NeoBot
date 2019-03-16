<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cases;

class BanController extends Controller
{
    function new(Request $request) {
        $ban = new Cases;

        $case = \DB::table('cases')->max('id')+1;

        $unique_id = $request->input('user').$request->input('actor').time();

        $ban->type = 'ban';
        $ban->unique_id = $unique_id;
        $ban->user = $request->input('user');
        $ban->reason = $request->input('reason');
        $ban->actor = $request->input('actor');
        $ban->guild_id = $request->input('guild_id');

        if($ban->save()){
            $bann = Cases::where('unique_id', $unique_id)->first();
            return response()->json(['message'=>200,'case'=>$bann->id]);
        }
    }
}
