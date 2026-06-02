'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Lock, Mail, AlertCircle, Loader2, ShieldCheck, Activity, Globe } from 'lucide-react';
import { login } from '@/redux/actions/userActions';

const logo = "/PrintsCartslogo.png";

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            router.push('/admin/dashboard');
        }
    }, [userInfo, router]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(email, password, true));
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans relative overflow-hidden">
            {/* Background Aesthetic */}
            <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-blue-600/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-slate-900/5 rounded-full blur-[100px] -ml-48 -mb-48"></div>

            <div className="w-full max-w-[30rem] bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-700 relative z-10">
                {/* Header Branding */}
                <div className="bg-slate-900 p-12 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-900 opacity-90"></div>
                    <div className="relative z-10 space-y-6">
                        <div className="w-24 h-24 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center mx-auto p-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                            <img src={logo} alt="PrintsCarts Logo" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight uppercase">Admin <span className="text-blue-500">Portal</span></h2>
                            <p className="text-slate-400 mt-2 text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Security Management Protocol</p>
                        </div>
                    </div>
                </div>

                {/* Authentication Interface */}
                <div className="p-12">
                    {(error || (userInfo && !userInfo.isAdmin)) && (
                        <div className="mb-8 p-5 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top-4 duration-300">
                            <div className="p-2 bg-white rounded-xl shadow-sm"><AlertCircle size={20} /></div>
                            <span className="text-xs font-black uppercase tracking-widest">{error || 'Unauthorized: Admin privileges required'}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Identity Identifier</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white focus:outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300 shadow-sm"
                                    placeholder="admin@printscarts.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Access Passkey</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white focus:outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300 shadow-sm"
                                    placeholder="••••••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-slate-900 hover:bg-blue-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-4 group"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={24} />
                            ) : (
                                <>
                                    <ShieldCheck size={20} className="group-hover:scale-125 transition-transform" />
                                    <span className="text-xs uppercase tracking-[0.2em]">Initialize Session</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-slate-50 flex flex-col items-center gap-6">
                        <div className="flex items-center gap-8">
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                    <Globe size={18} />
                                </div>
                                <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">v2.4.0</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                    <Activity size={18} />
                                </div>
                                <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Encrypted</span>
                            </div>
                        </div>
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50 rounded-full border border-emerald-100 shadow-sm">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">System Node: Operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
