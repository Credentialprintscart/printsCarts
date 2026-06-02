'use client';
import React from 'react';
import { 
    Save, Shield, Globe, Mail, MapPin, 
    Bell, Lock, Smartphone, Activity, ArrowUpRight 
} from 'lucide-react';

const AdminSettings = () => {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 max-w-5xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32 transition-colors group-hover:bg-blue-100/50 duration-500"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">System Configuration</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">System <span className="text-blue-600">Preferences</span></h1>
                    <p className="text-slate-500 font-medium mt-1">Configure global operational parameters for PrintsCarts.</p>
                </div>
                <div className="relative z-10">
                    <div className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 text-sm font-bold flex items-center gap-3 shadow-sm">
                        <Activity size={18} className="text-blue-600" />
                        v2.4.0 Stable
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column: General & Regional */}
                <div className="lg:col-span-7 space-y-10">
                    <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl shadow-inner">
                                    <Globe size={24} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h2 className="font-black text-xl text-slate-900 tracking-tight">General Logistics</h2>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Core entity identifiers</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Store Designation</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                            <Globe size={18} />
                                        </div>
                                        <input 
                                            type="text" 
                                            defaultValue="Prints Carts" 
                                            className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none font-bold text-slate-800 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Support Vector (Email)</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <input 
                                            type="email" 
                                            defaultValue="support@printscarts.com" 
                                            className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none font-bold text-slate-800 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Geospatial Coordinates (Address)</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-5 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <MapPin size={18} />
                                    </div>
                                    <textarea 
                                        rows="4"
                                        defaultValue="Prints Carts&#10;7181 Beacon Dr 15&#10;Reno, NV 89506&#10;United States" 
                                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none font-bold text-slate-800 transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 flex justify-end">
                                <button className="px-10 py-4 bg-[#0f172a] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-3 active:scale-95">
                                    <Save size={18} />
                                    Commit Parameters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Security & Notifications */}
                <div className="lg:col-span-5 space-y-10">
                    <div className="bg-[#0f172a] p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 bg-blue-600/10 text-blue-500 rounded-2xl border border-blue-500/20 shadow-inner">
                                    <Shield size={24} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h2 className="font-black text-xl text-white tracking-tight">Encryption & Auth</h2>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Secure access logic</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group/item">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg"><Smartphone size={18} /></div>
                                            <span className="text-xs font-black text-white uppercase tracking-widest">Multi-Factor Auth</span>
                                        </div>
                                        <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-pointer group-hover/item:bg-blue-600 transition-colors">
                                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Add an extra layer of biometric or token-based security to your administrative node.</p>
                                </div>

                                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group/item">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg"><Lock size={18} /></div>
                                            <span className="text-xs font-black text-white uppercase tracking-widest">Session Logic</span>
                                        </div>
                                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest px-3 py-1 bg-blue-500/10 rounded-lg">Adaptive</span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Automatically terminate inactive administrative sessions to prevent unauthorized override.</p>
                                </div>
                            </div>

                            <button className="w-full mt-10 py-5 bg-white text-[#0f172a] font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-50 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
                                Security Audit <ArrowUpRight size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden group">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                                <Bell size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 className="font-black text-xl text-slate-900 tracking-tight">Signal Feed</h2>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Operational notifications</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: 'Order Real-time Feed', enabled: true },
                                { label: 'Security Node Alerts', enabled: true },
                                { label: 'Revenue Thresholds', enabled: false }
                            ].map((notif, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">{notif.label}</span>
                                    <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${notif.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${notif.enabled ? 'left-6' : 'left-1'}`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
