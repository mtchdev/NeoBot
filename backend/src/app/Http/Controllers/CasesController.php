<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cases;
use DateTime;

class CasesController extends Controller
{
    function get(Request $request) {
        $case = Cases::where('user', $request->header('user'))->get()->toArray();
        return response()->json(['message'=>200,'data'=>$case]);
    }

    function getSpecific(Request $request) {
        $case = Cases::where('case', $request->header('case'))->first();
        $slug = new DateTime($case->created_at);
        $date = $slug->format('Y-m-d\TH:i:s.\0\0\0\Z');
        return response()->json(['message'=>200,'data'=>$case,'time'=>$date]);
    }
}
