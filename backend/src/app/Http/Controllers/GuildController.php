<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Guild;

class GuildController extends Controller
{
    function add(Request $request) {
        $guild = new Guild;

        $guild->guild_id = $request->input('guild_id');
        $guild->owner_id = $request->input('owner_id');
        $guild->command_prefix = '!';

        $guild->save();
    }

    function remove(Request $request) {
        $guild = Guild::where('guild_id', $request->input('guild_id'))->first();

        $guild->delete();
    }

    function getInfo(Request $request) {
        $guild = Guild::where('guild_id', $request->header('guild_id'))->first();

        return response()->json(['prefix' => $guild->command_prefix]);
    }
}