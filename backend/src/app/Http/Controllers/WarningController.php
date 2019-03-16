<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cases;

class WarningController extends Controller
{
    function new(Request $request) {
        $warn = new Cases;

        $case = \DB::table('cases')->max('id')+1;

        $unique_id = $request->input('user').$request->input('actor').time();

        $warn->type = 'warn';
        $warn->unique_id = $unique_id;
        $warn->user = $request->input('user');
        $warn->reason = $request->input('reason');
        $warn->actor = $request->input('actor');
        $warn->guild_id = $request->input('guild_id');

        if($warn->save()){
            $warnn = Cases::where('unique_id', $unique_id)->first();
            return response()->json(['message'=>200,'case'=>$warnn->id]);
        }
    }
}