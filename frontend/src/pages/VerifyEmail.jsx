import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase-config';
import { AuthContext } from '../context/AuthContext';

function VerifyEmail() {
    const [status, setStatus] = useState('Verifying your login...');
    const navigate = useNavigate();
    const { googleLogin } = useContext(AuthContext); // We reuse the googleLogin backend endpoint for any external login

    useEffect(() => {
        let mounted = true;

        const handleSession = async (session) => {
            try {
                const user = session.user;
                
                // Send the session data to our Spring Boot backend to issue the real JWT
                await googleLogin({
                    email: user.email,
                    displayName: user.user_metadata?.full_name || user.email.split('@')[0],
                    photoURL: user.user_metadata?.avatar_url || null,
                    uid: user.id,
                });
                
                if (mounted) {
                    setStatus('Successfully logged in! Redirecting...');
                    // Sign out of Supabase locally so we rely entirely on our backend's JWT
                    await supabase.auth.signOut();
                    setTimeout(() => navigate('/'), 1500);
                }
            } catch (err) {
                if (mounted) setStatus('Error connecting to backend: ' + (err.message || 'Unknown error'));
            }
        };

        const checkSession = async () => {
            // First, check if Supabase returned an error in the URL (like Google OAuth failure)
            const urlParams = new URLSearchParams(window.location.search);
            const urlError = urlParams.get('error_description') || urlParams.get('error');
            if (urlError) {
                if (mounted) setStatus('Authentication Error: ' + decodeURIComponent(urlError).replace(/\+/g, ' '));
                return;
            }

            const { data: { session }, error } = await supabase.auth.getSession();
            
            if (error) {
                if (mounted) setStatus('Error: ' + error.message);
                return;
            }

            if (session) {
                handleSession(session);
            } else {
                // If there's no session immediately, we wait for the auth state change
                // because the redirect might still be processing the URL hash.
                const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
                    if (event === 'SIGNED_IN' && newSession) {
                        handleSession(newSession);
                        subscription.unsubscribe();
                    } else if (event === 'SIGNED_OUT') {
                        if (mounted) setStatus('Authentication failed or expired.');
                    }
                });
                
                // Add a timeout fallback so it doesn't stay stuck forever
                setTimeout(() => {
                    if (mounted) {
                        setStatus((prev) => prev === 'Verifying your login...' ? 'Session not found. Please try logging in again.' : prev);
                    }
                }, 5000);
            }
        };

        checkSession();

        return () => { mounted = false; };
    }, [navigate, googleLogin]);

    return (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6 text-center">
            <div className="bg-[#111] p-10 rounded-2xl border border-white/10 max-w-md w-full shadow-2xl">
                <div className="w-16 h-16 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-black text-white mb-4">Magic Link Verification</h2>
                <p className="text-gray-400">{status}</p>
            </div>
        </div>
    );
}

export default VerifyEmail;
