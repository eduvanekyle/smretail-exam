<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\ProfileResource;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Crypt;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            $data = $request->validated();

            $data['password'] = Crypt::encryptString($data['password']);

            $user = User::create($data);

            return response()->json([
                'message' => 'User registered successfully',
                'user' => $user->except('password'),
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            \Log::error('User registration failed: '.$e);

            return response()->json([
                'message' => 'User registration failed',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $credentials = $request->validated();

            $user = User::where('email', $credentials['email'])->first();

            if (! $user || Crypt::decryptString($user->password) !== $credentials['password']) {
                return response()->json([
                    'message' => 'Invalid email or password',
                ], Response::HTTP_UNAUTHORIZED);
            }

            // To avoid multiple sessions for the same user.
            $user->tokens()->delete();

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            \Log::error('Login failed: '.$e);

            return response()->json([
                'message' => 'Login failed',
                'error' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function profile()
    {
        $user = auth()->user();

        return response()->json([
            'message' => 'User profile retrieved successfully',
            'data' => new ProfileResource($user),
        ], Response::HTTP_OK);
    }
}
