<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckProfileComplete
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        
        if ($user && $user->role === 'guardian' && $user->guardian) {
            if ($user->guardian->profile_completion_status !== 'completed') {
                return redirect()->route('guardian.profile.complete')
                    ->with('error', 'Please complete your profile before accessing this feature.');
            }
        }
        
        return $next($request);
    }
}
