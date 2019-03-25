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
        $case = Cases::where('id', $request->header('case'))->first();
        $slug = new DateTime($case->created_at);
        $date = $slug->format('Y-m-d\TH:i:s.\0\0\0\Z');
        return response()->json(['message'=>200,'data'=>$case,'time'=>$date]);
    }

    function delete(Request $request) {
        $case = Cases::where('id', $request->input('case'))->first();
        if($case->delete()){
            return response()->json(['message'=>200]);
        }
    }

    function edit(Request $request) {
        $case = Cases::where('id', $request->input('case_id'))->first();
        $case->reason = $request->input('reason');
        if($case->save()) {
            return response()->json(['message'=>200]);
        }
    }
}
