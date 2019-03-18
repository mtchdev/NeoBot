<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cases;
use App\Mute;

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
            unset($mute);
            $mute = new Mute;
            $mute->user = $request->input('user');
            $mute->save();
            $mutee = Cases::where('unique_id', $unique_id)->first();
            return response()->json(['message'=>200,'case'=>$mutee->id]);
        }
    }

    function unmute(Request $request){
        $unmute = new Cases;

        $case = \DB::table('cases')->max('id')+1;

        $unique_id = $request->input('user').$request->input('actor').time();

        $unmute->type = 'unmute';
        $unmute->unique_id = $unique_id;
        $unmute->user = $request->input('user');
        $unmute->reason = 'N/A';
        $unmute->actor = $request->input('actor');
        $unmute->guild_id = $request->input('guild_id');

        if($unmute->save()){
            unset($unmute);
            $unmute = Mute::where('user', $request->input('user'))->first();
            $unmute->delete();
            $unmutee = Cases::where('unique_id', $unique_id)->first();
            return response()->json(['message'=>200,'case'=>$unmutee->id]);
        }
    }
}
