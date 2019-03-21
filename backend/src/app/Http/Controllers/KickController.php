<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cases;

class KickController extends Controller
{
    function new(Request $request) {
        $kick = new Cases;

        $case = \DB::table('cases')->max('id')+1;

        $unique_id = $request->input('user').$request->input('actor').time();

        $kick->type = 'kick';
        $kick->unique_id = $unique_id;
        $kick->user = $request->input('user');
        $kick->reason = $request->input('reason');
        $kick->actor = $request->input('actor');
        $kick->guild_id = $request->input('guild_id');

        if($kick->save()){
            $kickk = Cases::where('unique_id', $unique_id)->first();
            return response()->json(['message'=>200,'case'=>$kickk->id]);
        }
    }
}
