<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cases;

class WarningController extends Controller
{
    function new(Request $request) {
        $slug = Cases::all();
        $count = count($slug);

        $count++;

        $warn = new Cases;

        $warn->type = 'warn';
        $warn->case = $count;
        $warn->user = $request->input('user');
        $warn->reason = $request->input('reason');
        $warn->actor = $request->input('actor');
        $warn->guild_id = $request->input('guild_id');

        if($warn->save()){
            return response()->json(['message'=>200,'case'=>$count]);
        }
    }
}