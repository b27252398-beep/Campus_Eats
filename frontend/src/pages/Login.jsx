import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { supabase } from '../config/supabase-config'

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' })
    const [emailLink, setEmailLink] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [linkLoading, setLinkLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loginMode, setLoginMode] = useState('password') // 'password' or 'emailLink'

    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setMessage('')
        setLoading(true)
        try {
            await login(formData)
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleEmailLinkLogin = async (e) => {
        e.preventDefault()
        if (!emailLink) return setError('Please enter your email address.')
        setError('')
        setMessage('')
        setLinkLoading(true)
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: emailLink,
                options: {
                    emailRedirectTo: window.location.origin + '/verify-email',
                }
            })
            if (error) throw error;
            
            setMessage(`We've sent a login link to ${emailLink}. Check your inbox!`)
            setEmailLink('')
        } catch (err) {
            setError(err.message || 'Failed to send login link.')
        } finally {
            setLinkLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setError('')
        setMessage('')
        setGoogleLoading(true)
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin + '/verify-email'
                }
            })
            if (error) throw error;
            // The page will redirect to Google automatically
        } catch (err) {
            setError(err.message || 'Google login failed. Please try again.')
            setGoogleLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#080808] font-sans flex">

            {/* ── Left Panel — branding ── */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <img
                    src="/campus-hero.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-55"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#080808]/80 via-[#080808]/40 to-orange-900/20" />
                {/* Ambient orbs */}
                <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-orange-600/15 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-[80px]" />

                <div className="relative z-10 flex flex-col justify-between p-14 w-full">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <span className="text-white font-black text-xl tracking-tight">CampusEats<span className="text-orange-500">.</span></span>
                    </Link>

                    {/* Headline */}
                    <div>
                        <h1 className="text-5xl font-black text-white leading-tight tracking-tighter mb-6">
                            Good food,<br />
                            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                                zero wait.
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                            Order from your campus canteens, track in real-time, and pick up when it's ready.
                        </p>

                        {/* Social proof */}
                        <div className="flex items-center gap-4 mt-8">
                            <div className="flex -space-x-2">
                                {['RS', 'MK', 'AJ', 'LP'].map((i) => (
                                    <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-red-600 border-2 border-[#080808] flex items-center justify-center text-white text-xs font-bold">{i}</div>
                                ))}
                            </div>
                            <span className="text-gray-400 text-sm">Joined by <strong className="text-white">15,000+</strong> students</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Right Panel — form ── */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12">
                <div className="w-full max-w-md">

                    {/* Mobile logo */}
                    <Link to="/" className="flex items-center gap-2 mb-10 lg:hidden">
                        <span className="text-white font-black text-lg">CampusEats<span className="text-orange-500">.</span></span>
                    </Link>

                    <div className="mb-8">
                        <h2 className="text-3xl font-black text-white tracking-tight mb-2">Welcome back</h2>
                        <p className="text-gray-500">Sign in to your account to continue.</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/25 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Success Message */}
                    {message && (
                        <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/25 text-green-400 px-4 py-3 rounded-xl mb-6 text-sm">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>{message}</span>
                        </div>
                    )}

                    {/* Mode Toggle */}
                    <div className="flex bg-[#111] border border-white/[0.08] rounded-xl p-1 mb-8">
                        <button
                            type="button"
                            onClick={() => setLoginMode('password')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${loginMode === 'password' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                        >
                            Username
                        </button>
                        <button
                            type="button"
                            onClick={() => setLoginMode('emailLink')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${loginMode === 'emailLink' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                        >
                            Email Link
                        </button>
                    </div>

                    {loginMode === 'password' ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Username */}
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    type="text" name="username" value={formData.username} onChange={handleChange} required
                                    className="w-full pl-10 pr-4 py-3.5 bg-[#111] border border-white/[0.08] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition placeholder-gray-600 text-sm"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required
                                    className="w-full pl-10 pr-12 py-3.5 bg-[#111] border border-white/[0.08] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition placeholder-gray-600 text-sm"
                                    placeholder="••••••••"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600 hover:text-gray-400 transition">
                                    {showPassword
                                        ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                        : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    }
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black rounded-xl shadow-lg shadow-orange-900/30 hover:shadow-orange-900/50 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </span>
                            ) : 'Sign In'}
                        </button>
                        </form>
                    ) : (
                        <form onSubmit={handleEmailLinkLogin} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email" value={emailLink} onChange={(e) => setEmailLink(e.target.value)} required
                                        className="w-full pl-10 pr-4 py-3.5 bg-[#111] border border-white/[0.08] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition placeholder-gray-600 text-sm"
                                        placeholder="Enter your email address"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit" disabled={linkLoading}
                                className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black rounded-xl shadow-lg shadow-orange-900/30 hover:shadow-orange-900/50 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {linkLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending Link...
                                    </span>
                                ) : 'Send Magic Link'}
                            </button>
                        </form>
                    )}

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/[0.08]" />
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">or</span>
                        <div className="flex-1 h-px bg-white/[0.08]" />
                    </div>

                    {/* Google Sign-In */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={googleLoading}
                        className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#111] border border-white/[0.08] text-white font-bold rounded-xl hover:bg-[#1a1a1a] hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {googleLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Connecting...
                            </span>
                        ) : (
                            <>
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 001 12c0 1.94.46 3.77 1.18 5.07l3.66-2.84z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </>
                        )}
                    </button>

                    <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-3 text-center">
                        <p className="text-gray-500 text-sm">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-orange-400 font-bold hover:text-orange-300 transition">Sign up free</Link>
                        </p>
                        <Link to="/canteen/login" className="block text-xs text-gray-600 hover:text-gray-400 transition">
                            Are you a canteen owner? → Login here
                        </Link>
                        <Link to="/admin/login" className="block text-xs text-gray-600 hover:text-gray-400 transition mt-2">
                            Are you a system admin? → Login here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
