<?php

namespace App\Http\Controllers\Auth;

use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        return response()->json($credentials);
        try {

        } catch (JWTException $e) {
            
        }
    }

    public function create()
    {
        $user = \App\User::create(['firstName' => 'a', 'lastName' => 'AA', 'email' => 'test@email.com', 'password' => bcrypt('password')]);
    }
}
