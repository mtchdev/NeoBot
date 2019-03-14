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

        $guild->save();
    }
}