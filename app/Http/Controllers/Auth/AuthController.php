<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Concerns\ApiResponder;
use Illuminate\Support\Facades\Hash;
//use App\Notifications\UserRegistrationNotice;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Notifications\UserPasswordResetNotice;
use App\Models\PasswordReset;


use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    use ApiResponder;
    public function forgotPassword(Request $request)
    {
        try {
             $request->validate([
                'email' => 'required|email|exists:users,email'
            ]);

            $user = User::whereEmail($request->email)->first();

            $reset = PasswordReset::where('email', $request->email)->first();

            if ($reset)
                $reset->forceDelete();

            $reset = new PasswordReset();
            $reset->email = $request->email;
            $reset->token = Str::random(50) . Carbon::now()->timestamp;
            $reset->save();
            $user->notify(new UserPasswordResetNotice($reset));
            return $this->success(['message' => 'Password reset link has been sent to your email.']);
        } catch (\Exception $exception) {
            \Log::error('Error on password reset', ['error' => $exception->getMessage()]);
            return $this->error('Password reset failed', 500);
        }
    }

    public function setNewPassword(Request $request)
    {
        try {
            $request->validate ([
                'token' => 'required|string|exists:password_resets,token',
                'password' => 'required|string|min:8|confirmed',
            ]);

            $reset = PasswordReset::where('token', $request->token)->first();

            if (!$reset) {
                return $this->error('Invalid password reset token', 404);
            }

            $user = User::where('email', $reset->email)->first();

            if (!$user) {
                return $this->error('User not found', 404);
            }

            $user->password = Hash::make($request->password);
            $user->save();
            $reset->delete();
            $token = $user->createToken("icpak_tapef")->plainTextToken;

            return $this->success([
                'message' => 'Password has been reset successfully.',
                'user' => $user->refresh(),
                'token' => $token,
            ]);
        } catch (\Exception $exception) {
            \Log::error('Error on setting new password', ['error' => $exception->getMessage()]);
            return $this->error('Setting new password failed', 500);
        }
    }

    public function register(Request $request)
    {
       try {

         $request->validate([
            'email'=>'required|email|string|unique:users',
            'firstName'=>'required|string',
            'lastName'=> 'required|string',
            'category'=>'required|string',
            'password'=>'required|min:8',

        ]);

        $user = User::where('email', $request['email'])->first();

        //check if profile exists
        if($user) return $this->error('User Already Exists, Please Login to continue');

        $user = new User();
        $user->first_name = $request->firstName;
        $user->last_name = $request->lastName;
        $user->email= $request->email;
        $user->category = $request->category;
        $user->password= Hash::make($request->password);
        $user->otp = generate_user_otp();
        $user->save();
        //$user->notify(new UserRegistrationNotice());
        $user->sendOtp($user->otp);
       return $this->success($user->refresh());
        
       } catch (\Exception $exception) {
        Log::error('Error on Registration', ['error'=>$exception->getMessage()]);
        return $this->error('Registration failed', 500);
       }

    }

    public function verifyOtp(Request $request)
    {
        try {

            $request->validate([
                "email" => 'required|email',
                "otp" => "required",
            ]);
            
            $user = User::where('otp', $request->otp)->first();

            if(!$user) return $this->error('Invalid Otp code', 404);
            $user->otp = null;
            $user->save();

            return $this->success([
                'message' => 'Verification Successful',
                'user' => $user->refresh(),
                'token' => $user->createToken("icpak_tapef")->plainTextToken
            ]);

    
        } catch (\Exception $exception) {
            Log::error('Error while verifying otp', ['error'=>$exception->getMessage()]);
            return $this->error('verificaton failed', 500);
    }
}

    public function login(Request $request)
       {
        try {
            $request->validate([
                'email'=>'required|email',
                'password'=>'required',
            ]);
            $user = User::where('email', $request['email'])->first();
            if($user===null) return $this->error('The email provided does not exist');
        
            if (! $user || ! Hash::check($request->password, $user->password)){
                return $this->error('The provided credentials are not correct');
           }
           $token= $user->createToken("icpak_tapef")->plainTextToken;
           return $this->success([
            'user' => $user->refresh(),
           'token' =>$token
        ]);
        } catch (\Exception $exception) {
            Log::error('Error ocurred while trying to login', ['error'=>$exception->getMessage()]);
        }
        
}

public function logout(Request $request)
{
    try {
        if(!empty($request->all())){
            $token = PersonalAccessToken::where('tokenable_id', $request->id)->first();
        }else {
            $token = $request->user()->currentAccessToken();
        }
        $token->delete();

        /* clear application cache */
        return response()->json([
            'message' => 'logout success',
        ], 200);
    }catch (\Exception $exception){
        return $this->exception($exception);
    }
}

public function activateAccount(Request $request)
{
    try {
             $request->validate([
                'email' => 'required|email|exists:users,email'
            ]);

            $user = User::whereEmail($request->email)->first();

            $reset = PasswordReset::where('email', $request->email)->first();

            if ($reset)
                $reset->forceDelete();

            $reset = new PasswordReset();
            $reset->email = $request->email;
            $reset->token = Str::random(50) . Carbon::now()->timestamp;
            $reset->save();
            $user->notify(new UserPasswordResetNotice($reset));
            return $this->success(['message' => 'Activation link has been sent to your email.']);
        } catch (\Exception $exception) {
            \Log::error('Error on account activation', ['error' => $exception->getMessage()]);
            return $this->error('Account activation failed', 500);
        }
}




}