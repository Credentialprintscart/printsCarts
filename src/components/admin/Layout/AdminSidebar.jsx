import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { 
    LayoutDashboard, 
    Package, 
    ShoppingCart, 
    Users, 
    MessageSquare, 
    BarChart3, 
    Settings, 
    LogOut, 
    X,
    FolderTree
} from 'lucide-react';
import { logout } from '@/redux/actions/userActions';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Categories', path: '/admin/categories', icon: <FolderTree size={20} /> },
        { name: 'Products', path: '/admin/products', icon: <Package size={20} /> },
        { name: 'Customers', path: '/admin/customers', icon: <Users size={20} /> },
        { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
        { name: 'Customer Chat', path: '/admin/chat', icon: <MessageSquare size={20} /> },
        { name: 'Analytics', path: '/admin/analytics', icon: <BarChart3 size={20} /> },
        { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
    ];

    const handleLogout = () => {
        dispatch(logout());
        router.push('/admin/login');
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col h-full shadow-2xl lg:shadow-none transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Header/Logo */}
                <div className="h-20 flex items-center gap-3 px-8 border-b border-slate-50 shrink-0">
                    <div className="flex-1 flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-900/20">
                            <Package size={22} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-slate-900 tracking-tight leading-none">Admin Portal</span>
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Management</span>
                        </div>
                    </div>
                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-8 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                    <p className="px-4 mb-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Main Menu</p>
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive
                                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                <div className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'} transition-colors`}>
                                    {item.icon}
                                </div>
                                <span className={`font-semibold text-sm ${isActive ? 'translate-x-1' : ''} transition-transform duration-300`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer / User Profile Summary */}
                <div className="p-6 border-t border-slate-50">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3.5 px-4 py-4 w-full text-left rounded-2xl text-red-500 hover:bg-red-50 transition-all duration-300 group"
                    >
                        <div className="p-2 bg-red-50 text-red-500 rounded-xl group-hover:bg-red-500 group-hover:text-white transition-colors">
                            <LogOut size={20} />
                        </div>
                        <span className="font-bold text-sm">Logout Session</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminSidebar;
