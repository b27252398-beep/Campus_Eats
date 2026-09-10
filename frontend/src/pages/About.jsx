import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ─── Data ─────────────────────────────────────────────────────────────── */
const STATS = [
    { value: '50+', label: 'Campus Canteens', icon: '🏪', color: 'text-orange-400', border: 'border-orange-500/20', glow: 'from-orange-500/10' },
    { value: '15K', label: 'Active Students', icon: '🎓', color: 'text-blue-400', border: 'border-blue-500/20', glow: 'from-blue-500/10' },
    { value: '1M+', label: 'Orders Delivered', icon: '📦', color: 'text-green-400', border: 'border-green-500/20', glow: 'from-green-500/10' },
    { value: '4.9★', label: 'Average Rating', icon: '⭐', color: 'text-yellow-400', border: 'border-yellow-500/20', glow: 'from-yellow-500/10' },
]

const VALUES = [
    {
        title: 'Student First',
        desc: 'Every decision we make starts with one question: does this make campus life easier for students?',
        icon: '🎓',
        accent: 'from-blue-500 to-indigo-600',
        border: 'border-blue-500/20',
        bg: 'bg-blue-500/8',
    },
    {
        title: 'Zero Compromise on Quality',
        desc: 'We vet every canteen partner for hygiene, freshness, and consistency before they go live.',
        icon: '✅',
        accent: 'from-green-500 to-emerald-600',
        border: 'border-green-500/20',
        bg: 'bg-green-500/8',
    },
    {
        title: 'Built for Speed',
        desc: 'Skip the queue, not the meal. Real-time order tracking so you never miss a beat between classes.',
        icon: '⚡',
        accent: 'from-orange-500 to-red-600',
        border: 'border-orange-500/20',
        bg: 'bg-orange-500/8',
    },
    {
        title: 'Radical Transparency',
        desc: 'Live queue statuses, honest reviews, and accurate wait times. No surprises — ever.',
        icon: '🔍',
        accent: 'from-purple-500 to-violet-600',
        border: 'border-purple-500/20',
        bg: 'bg-purple-500/8',
    },
    {
        title: 'Community Driven',
        desc: 'Over 15,000 students have shaped CampusEats through reviews, feedback, and suggestions.',
        icon: '🤝',
        accent: 'from-pink-500 to-rose-600',
        border: 'border-pink-500/20',
        bg: 'bg-pink-500/8',
    },
    {
        title: 'Always Innovating',
        desc: 'From smart ordering to AI-powered meal suggestions — we\'re constantly reinventing campus dining.',
        icon: '🚀',
        accent: 'from-cyan-500 to-blue-600',
        border: 'border-cyan-500/20',
        bg: 'bg-cyan-500/8',
    },
]

/* ─── Component ─────────────────────────────────────────────────────────── */
function About() {
    return (
        <div className="min-h-screen bg-[#080808] font-sans text-white">
            <Navbar />

            {/* ════════════════════════════════════════ HERO ══ */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background image */}
                <div className="absolute inset-0">
                    <img
                        src="/campus-hero.jpg"
                        alt=""
                        className="w-full h-full object-cover opacity-20 scale-105"
                        style={{ filter: 'blur(1px)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/50 via-[#080808]/70 to-[#080808]" />
                </div>

                {/* Ambient orbs */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-red-600/8 rounded-full blur-[100px] pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-orange-300 text-xs font-bold tracking-[0.25em] uppercase">Our Story</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                        <span className="block text-white">We Feed</span>
                        <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 bg-clip-text text-transparent">
                            the Future.
                        </span>
                    </h1>

                    <p className="text-gray-400 text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed font-light mb-12">
                        CampusEats isn't just an ordering app. It's a movement to make
                        campus life <em className="text-white not-italic font-semibold">tastier, faster, and smarter</em>.
                    </p>

                    {/* CTA row */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/menu"
                            className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-black rounded-2xl shadow-xl shadow-orange-600/25 hover:shadow-orange-600/40 hover:-translate-y-1 transition-all duration-300"
                        >
                            Order Now
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            Work with Us
                        </Link>
                    </div>

                    {/* Scroll cue */}
                    <div className="mt-20 flex flex-col items-center gap-2 text-gray-600">
                        <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
                        <div className="w-px h-12 bg-gradient-to-b from-gray-600 to-transparent animate-pulse" />
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════ STATS TICKER ══ */}
            <section className="relative py-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 via-transparent to-red-600/5" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {STATS.map((s) => (
                            <div
                                key={s.label}
                                className={`relative group bg-gradient-to-b ${s.glow} to-transparent bg-[#111] border ${s.border} rounded-2xl p-6 text-center overflow-hidden hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300`}
                            >
                                <div className="text-3xl mb-3">{s.icon}</div>
                                <div className={`text-4xl font-black mb-1 ${s.color}`}>{s.value}</div>
                                <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════ MISSION ══ */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* Text */}
                        <div>
                            <span className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 text-orange-400 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-8">
                                ⚡ Our Mission
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1] mb-8">
                                Revolutionizing <br />
                                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Campus Dining</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                Students deserve more than a 40-minute lunch queue. We built CampusEats to give back what matters most — your <strong className="text-white">time</strong>. Order ahead, track live, and pick up fresh. That's it.
                            </p>

                            {/* Feature pills */}
                            <div className="flex flex-wrap gap-3 mb-10">
                                {['Real-time Tracking', 'Cashless Payment', 'Live Queue Status', 'Zero App Fees'].map((f) => (
                                    <span key={f} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-gray-300">
                                        {f}
                                    </span>
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="relative pl-6 border-l-4 border-orange-500">
                                <p className="text-xl text-white font-medium italic leading-relaxed">
                                    "Accessible, affordable, and convenient food for every student, every single day."
                                </p>
                                <cite className="block mt-3 text-orange-400 text-sm font-bold not-italic tracking-wider">
                                    — CampusEats Founding Team
                                </cite>
                            </blockquote>
                        </div>

                        {/* Stacked image cards */}
                        <div className="relative h-[520px]">
                            {/* Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-600/15 rounded-full blur-3xl" />

                            {/* Card 1 — back */}
                            <div className="absolute top-8 right-0 w-4/5 h-80 rounded-3xl overflow-hidden border border-white/[0.07] shadow-2xl rotate-3 opacity-60">
                                <img
                                    src="/pizza.jpg"
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Card 2 — front */}
                            <div className="absolute bottom-0 left-0 w-4/5 h-80 rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500 z-10">
                                <img
                                    src="/burger.jpg"
                                    alt="Students ordering food"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                                    <p className="text-white font-bold text-sm">Connecting students to great food 🍜</p>
                                </div>
                            </div>

                            {/* Floating badge */}
                            <div className="absolute top-4 left-4 z-20 bg-[#111] border border-white/10 rounded-2xl px-4 py-3 shadow-xl">
                                <p className="text-2xl font-black text-orange-400">1M+</p>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Happy Orders</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>



            {/* ════════════════════════════════════════ VALUES ══ */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 text-orange-400 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                            💡 What We Stand For
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                            Six Principles That <br />
                            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Define Everything We Do</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {VALUES.map((v, i) => (
                            <div
                                key={v.title}
                                className="group relative bg-[#0a0a0a] border border-white/[0.05] rounded-3xl p-10 hover:bg-[#111] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-300 overflow-hidden"
                            >
                                {/* Top colored accent line */}
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${v.accent} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                                
                                {/* Inner glow center line */}
                                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                                {/* Giant Number Background */}
                                <span className="absolute top-6 right-8 text-[5rem] font-black leading-none text-white/[0.03] select-none group-hover:text-white/[0.08] group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-500">
                                    {String(i + 1).padStart(2, '0')}
                                </span>

                                <div className="text-4xl mb-8 relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 inline-block drop-shadow-2xl">
                                    {v.icon}
                                </div>
                                <h3 className="text-2xl font-black text-white mb-4 relative z-10 group-hover:text-white transition-colors duration-300">
                                    {v.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors duration-300">
                                    {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ════════════════════════════════════════ CTA ══ */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden">
                        {/* Background layers */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-rose-700" />
                        <div className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                backgroundSize: '32px 32px',
                            }}
                        />
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-2xl -translate-x-1/4 translate-y-1/4" />

                        {/* Content */}
                        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center p-10 md:p-16">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-4">
                                    Ready to Experience <br />Better Dining?
                                </h2>
                                <p className="text-orange-100 text-lg font-light leading-relaxed">
                                    Skip the lines and enjoy your favorite campus meals exactly when you want them.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 md:justify-end">
                                <Link
                                    to="/menu"
                                    className="px-8 py-4 bg-white text-orange-600 rounded-2xl font-black shadow-xl hover:bg-gray-50 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 text-center"
                                >
                                    Order Now →
                                </Link>
                                <Link
                                    to="/contact"
                                    className="px-8 py-4 bg-white/15 border border-white/25 text-white rounded-2xl font-bold hover:bg-white/25 transition-all duration-300 text-center"
                                >
                                    Get in Touch
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default About
