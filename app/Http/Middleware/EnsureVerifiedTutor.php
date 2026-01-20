<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureVerifiedTutor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        
        if ($user && $user->role === 'tutor' && $user->tutor) {
            if ($user->tutor->verification_status !== 'verified') {
                return redirect()->route('tutor.dashboard')
                    ->with('error', 'Your profile must be verified before accessing this feature.');
            }
        }
        
        return $next($request);
    }
}
