<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Warning;

class WarningController extends Controller
{
    function new(Request $request) {
        $slug = Warning::all();
        $count = count($slug);

        $count++;

        $case = 'W'.$count;

        $warn = new Warning;

        $warn->case = $case;
        $warn->user = $request->input('user');
        $warn->reason = $request->input('reason');
        $warn->actor = $request->input('actor');
        $warn->guild_id = $request->input('guild_id');

        if($warn->save()){
            return response()->json(['message'=>200,'case'=>$case]);
        }
    }
}