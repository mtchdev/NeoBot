<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cases;

class MuteController extends Controller
{
    function new(Request $request) {
        $mute = new Cases;

        $case = \DB::table('cases')->max('id')+1;

        $unique_id = $request->input('user').$request->input('actor').time();

        $mute->type = 'mute';
        $mute->unique_id = $unique_id;
        $mute->user = $request->input('user');
        $mute->reason = $request->input('reason');
        $mute->actor = $request->input('actor');
        $mute->guild_id = $request->input('guild_id');

        if($mute->save()){
            $mutee = Cases::where('unique_id', $unique_id)->first();
            return response()->json(['message'=>200,'case'=>$mutee->id]);
        }
    }
}
