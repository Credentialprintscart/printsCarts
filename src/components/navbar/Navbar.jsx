'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import axios from 'axios';
import './Navbar.css';

const logo = "/PrintsCartslogo.png";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [mounted, setMounted] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const cartCount = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);
    const isAdmin = userInfo && userInfo.isAdmin;

    const searchRef = useRef(null);
    const profileRef = useRef(null);

    // Mounted check to prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Scroll Listener for Frosted Glass Effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Click Outside Handlers
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) setIsSearchOpen(false);
            if (profileRef.current && !profileRef.current.contains(e.target)) setShowUserMenu(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileOpen(false);
        setShowUserMenu(false);
        setIsSearchOpen(false);
    }, [pathname]);

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length >= 2) {
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/products/search/suggestions`,
                    { params: { q: query } }
                );
                setSuggestions(data);
                setShowSuggestions(true);
            } catch (error) {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/printers?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setShowSuggestions(false);
        }
    };

    const handleSignOut = () => {
        dispatch(logout());
        router.push('/');
    };

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    <Link href="/" className="nav-logo">
                        <img src={logo} alt="PrintsCarts Official" width="220" height="180" decoding="async" />
                    </Link>

                    <ul className="nav-links">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/printers">Printers</Link></li>
                        <li><Link href="/ink-toner">Ink & Toner</Link></li>
                        <li><Link href="/blogs">Blog</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/faqs">FAQs</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>

                    <div className="nav-icons-group">
                        <div className="search-wrapper" ref={searchRef} style={{ position: 'relative' }}>
                            <button className="icon-button" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Open Search">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            
                            {isSearchOpen && (
                                <div className="search-modal">
                                    <form onSubmit={handleSearchSubmit}>
                                        <input 
                                            type="text" 
                                            className="search-input-field"
                                            placeholder="Find printers, ink or toner..." 
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            autoFocus
                                        />
                                    </form>
                                    {showSuggestions && suggestions.length > 0 && (
                                        <div className="search-results-overlay" style={{ marginTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                                            {suggestions.slice(0, 5).map(s => (
                                                <div 
                                                    key={s._id} 
                                                    className="profile-link-item"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        router.push(s.slug ? `/product/${s.slug}` : `/printers?search=${s.title}`);
                                                        setIsSearchOpen(false);
                                                    }}
                                                >
                                                    <span>{s.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <Link href="/cart" className="icon-button" aria-label="View Shopping Cart">
                            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {mounted && cartCount > 0 && <span className="cart-indicator">{cartCount}</span>}
                        </Link>

                        <div className="profile-wrapper" ref={profileRef} style={{ position: 'relative' }}>
                            <div className="user-profile-toggle" onClick={() => setShowUserMenu(!showUserMenu)}>
                                <div className="user-initials-avatar">
                                    {mounted && userInfo ? userInfo.name.charAt(0).toUpperCase() : (
                                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    )}
                                </div>
                                {mounted && userInfo && <span className="user-name-display">{userInfo.name.split(' ')[0]}</span>}
                            </div>

                            {showUserMenu && mounted && (
                                <div className="profile-dropdown">
                                    {userInfo ? (
                                        <>
                                            <div className="profile-header">
                                                <p>Signed in as</p>
                                                <p>{userInfo.email}</p>
                                            </div>
                                            <div className="profile-menu-links">
                                                {isAdmin && (
                                                    <Link href="/admin/dashboard" className="profile-link-item" style={{fontWeight: '700', color: '#0f3d91'}}>Admin Dashboard</Link>
                                                )}
                                                <Link href="/profile" className="profile-link-item">Account Status</Link>
                                                <Link href="/profile" className="profile-link-item">My Orders</Link>
                                                <button onClick={handleSignOut} className="profile-link-item logout" style={{width: '100%', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer'}}>Secure Logout</button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="profile-menu-links">
                                            <Link href="/signin" className="profile-link-item">Sign In to Account</Link>
                                            <Link href="/signup" className="profile-link-item">Create New Account</Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <button 
                            className={`hamburger-toggle ${isMobileOpen ? 'active' : ''}`}
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            aria-label="Toggle Navigation Menu"
                        >
                            <span className="hamburger-line line-1"></span>
                            <span className="hamburger-line line-2"></span>
                            <span className="hamburger-line line-3"></span>
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`mobile-navigation ${isMobileOpen ? 'visible' : ''}`}>
                <ul className="mobile-nav-list">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/printers">Printers</Link></li>
                    <li><Link href="/ink-toner">Ink & Toner</Link></li>
                    <li><Link href="/blogs">Blog</Link></li>
                    <li><Link href="/about">About Us</Link></li>
                    <li><Link href="/faqs">FAQs</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>

                <div className="mobile-footer-auth">
                    {mounted && userInfo ? (
                        <div className="mobile-profile-card">
                            <div className="user-initials-avatar">{userInfo.name.charAt(0)}</div>
                            <div className="mobile-user-info" style={{ marginLeft: '12px' }}>
                                <strong style={{ display: 'block' }}>{userInfo.name}</strong>
                                <p onClick={handleSignOut} style={{color: '#ef4444', fontSize: '13px', cursor: 'pointer', margin: 0}}>Logout</p>
                            </div>
                        </div>
                    ) : mounted ? (
                        <div className="mobile-auth-grid">
                            <Link href="/signin" className="mobile-btn secondary">Sign In</Link>
                            <Link href="/signup" className="mobile-btn primary">Join Now</Link>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="navbar-spacer"></div>
        </>
    );
};

export default Navbar;
