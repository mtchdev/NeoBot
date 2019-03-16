<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Guild;

class RolesController extends Controller
{
    public function getMuted(Request $request) {
        $muted = Guild::where('guild_id', $request->header('guild_id'))->first();
        return response()->json(['message'=>200,'role'=>$muted->muted_role]);
    }
    
    public function setMuted(Request $request) {

    }
}
