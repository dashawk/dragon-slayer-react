<?php

namespace App\Http\Controllers\Game;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function attack(Request $request)
    {
        $params = $request->only('attacker', 'skill', 'target');

        
    }
}
