'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllChats, fetchChatById, sendChatMessage, markChatAsRead } from '@/redux/actions/chatActions';
import { 
    Search, Send, User, MessageSquare, 
    ChevronLeft, Activity, Globe, Clock,
    CheckCircle2, Shield
} from 'lucide-react';
import io from 'socket.io-client';

const AdminChat = () => {
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const [showMobileList, setShowMobileList] = useState(true);
    const [activeChat, setActiveChat] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const chatList = useSelector((state) => state.chatList);
    const { loading, chats, error } = chatList;

    const chatDetails = useSelector((state) => state.chatDetails);
    const { chat: currentChat } = chatDetails;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(fetchAllChats());

            const socketUrl = process.env.NEXT_PUBLIC_API_URL?.startsWith('http') 
                ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') 
                : window.location.origin;

            const newSocket = io(socketUrl, {
                auth: { token: userInfo.token },
                path: '/socket.io',
                transports: ['websocket', 'polling']
            });

            newSocket.on('connect', () => {
                console.log('Admin Secure Link Established');
            });

            newSocket.on('new-message', (data) => {
                dispatch(fetchAllChats());
                if (activeChat && data.chatId === activeChat._id) {
                    dispatch(fetchChatById(data.chatId));
                }
            });

            setSocket(newSocket);
            return () => newSocket.close();
        }
    }, [dispatch, userInfo, activeChat?._id]);

    useEffect(() => {
        scrollToBottom();
    }, [currentChat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleChatSelect = (chat) => {
        setActiveChat(chat);
        setShowMobileList(false);
        dispatch(fetchChatById(chat._id));

        if (chat.unreadCount > 0) {
            dispatch(markChatAsRead(chat._id));
        }

        if (socket) {
            socket.emit('join-chat', chat._id);
        }
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeChat) return;

        dispatch(sendChatMessage(activeChat._id, newMessage));

        if (socket) {
            socket.emit('send-message', {
                chatId: activeChat._id,
                message: newMessage,
                sender: {
                    _id: userInfo._id,
                    name: userInfo.name,
                    isAdmin: true
                }
            });
        }

        setNewMessage('');
    };

    const filteredChats = chats?.filter(chat =>
        chat.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="flex h-[calc(100vh-160px)] bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden relative animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Sidebar List */}
            <div className={`
                w-full lg:w-96 border-r border-slate-100 flex flex-col bg-white z-10
                ${showMobileList ? 'flex' : 'hidden lg:flex'}
            `}>
                <div className="p-8 border-b border-slate-50 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                <MessageSquare size={20} strokeWidth={2.5} />
                            </div>
                            <h2 className="font-black text-xl text-slate-900 tracking-tight">Signal Feed</h2>
                        </div>
                        <div className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">
                            {chats?.length || 0} Entities
                        </div>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search vector, identity..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-sm"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {loading ? (
                        <div className="p-20 text-center space-y-4">
                            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Syncing Signal...</p>
                        </div>
                    ) : filteredChats.length === 0 ? (
                        <div className="p-20 text-center opacity-40">
                            <Globe size={48} className="mx-auto mb-4" />
                            <p className="font-black uppercase tracking-widest text-xs">No Active Vectors</p>
                        </div>
                    ) : (
                        filteredChats.map(chat => (
                            <div
                                key={chat._id}
                                onClick={() => handleChatSelect(chat)}
                                className={`px-8 py-6 flex gap-4 hover:bg-blue-50/30 cursor-pointer transition-all border-b border-slate-50 relative group ${activeChat?._id === chat._id ? 'bg-blue-50/50' : ''}`}
                            >
                                {activeChat?._id === chat._id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full"></div>
                                )}
                                <div className="relative shrink-0">
                                    <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center text-slate-600 font-black text-sm shadow-inner group-hover:scale-105 transition-transform">
                                        {(chat.user?.name || 'U').charAt(0).toUpperCase()}
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-4 border-white rounded-full ${chat.status === 'active' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-black text-sm text-slate-900 truncate tracking-tight">{chat.user?.name || 'Anonymous Entity'}</h4>
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mt-1 whitespace-nowrap ml-2">
                                            {new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate font-medium">{chat.lastMessage || 'Signal initialized...'}</p>
                                </div>
                                {chat.unreadCount > 0 && (
                                    <div className="shrink-0 flex items-center">
                                        <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg shadow-blue-600/20 animate-pulse">
                                            {chat.unreadCount}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`
                flex-1 flex flex-col bg-slate-50/30
                ${!showMobileList ? 'flex' : 'hidden lg:flex'}
            `}>
                {activeChat && currentChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-24 bg-white border-b border-slate-100 px-10 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setShowMobileList(true)}
                                    className="lg:hidden p-3 -ml-4 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-900 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-900/20">
                                        {(activeChat.user?.name || 'U').charAt(0).toUpperCase()}
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-4 border-white rounded-full ${activeChat.status === 'active' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900 tracking-tight leading-none mb-1.5">{activeChat.user?.name || 'External Entity'}</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{activeChat.user?.email || 'Secure Channel'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:flex items-center gap-3">
                                <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    <Shield size={14} className="text-emerald-500" /> Encrypted Link
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                            {currentChat.messages && currentChat.messages.length > 0 ? (
                                currentChat.messages.map((msg, index) => {
                                    const isAdmin = msg.sender.toString() === userInfo._id;
                                    return (
                                        <div key={index} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                            <div className={`max-w-[80%] lg:max-w-[60%] space-y-2`}>
                                                <div className={`rounded-[2rem] px-6 py-4 shadow-sm relative group ${isAdmin
                                                    ? 'bg-[#0f172a] text-white rounded-tr-none border border-slate-800'
                                                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                                                    }`}>
                                                    <p className="text-sm font-medium leading-relaxed">{msg.message}</p>
                                                    <div className={`absolute top-0 ${isAdmin ? '-left-12' : '-right-12'} opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-400`}>
                                                        <Clock size={14} />
                                                    </div>
                                                </div>
                                                <div className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${isAdmin ? 'justify-end text-slate-400' : 'justify-start text-slate-400'}`}>
                                                    {isAdmin ? <CheckCircle2 size={10} className="text-blue-500" /> : <User size={10} />}
                                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4 opacity-40">
                                    <Activity size={48} className="animate-pulse" />
                                    <p className="font-black text-[10px] uppercase tracking-[0.2em]">Initiate Signal Exchange</p>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-8 bg-white border-t border-slate-100">
                            <form onSubmit={handleSend} className="flex gap-4">
                                <div className="flex-1 relative group">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] pl-6 pr-12 py-5 text-sm font-bold text-slate-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white outline-none transition-all"
                                        placeholder="Transmit signal..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 flex gap-2">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="px-8 bg-[#0f172a] text-white rounded-[1.5rem] hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 disabled:opacity-30 flex items-center justify-center gap-3 group/send"
                                >
                                    <span className="font-black text-xs uppercase tracking-[0.2em] hidden sm:block">Transmit</span>
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-300 gap-6 opacity-40 p-20 text-center">
                        <div className="p-8 bg-slate-100 rounded-[3rem] border border-slate-200">
                            <MessageSquare size={80} strokeWidth={1} />
                        </div>
                        <div>
                            <h3 className="font-black text-2xl text-slate-900 tracking-tight mb-2">Operational Relay</h3>
                            <p className="font-medium text-slate-500 text-sm max-w-xs mx-auto uppercase tracking-widest">Select a target vector to establish a secure communication link.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminChat;
