<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cases;

class CasesController extends Controller
{
    function get(Request $request) {
        $case = Cases::where('user', $request->header('user'))->get()->toArray();
        return response()->json(['message'=>200,'data'=>$case]);
    }

    function getSpecific(Request $request) {
        $case = Cases::where('case', $request->header('case'))->get();
        return response()->json(['message'=>200,'data'=>$case]);
    }
}
