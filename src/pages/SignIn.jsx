'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/userActions';
import { FiMail, FiLock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const logo = "/PrintsCartslogo.png";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const [successMessage, setSuccessMessage] = useState('');

  const redirect = searchParams.get('redirect');
  const messageParam = searchParams.get('message');

  useEffect(() => {
      if (messageParam) {
          setSuccessMessage(messageParam);
      }
  }, [messageParam]);

  useEffect(() => {
    if (userInfo) {
        if (redirect) {
            router.push(`/${redirect}`);
        } else if (userInfo.isAdmin) {
            router.push('/admin/dashboard');
        } else {
            router.push('/');
        }
    }
  }, [userInfo, router, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(login(email, password, isAdminLogin));
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      <main style={{ paddingTop: '120px', paddingBottom: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '480px', padding: '0 24px' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '32px', padding: '60px 48px', boxShadow: '0 20px 60px -10px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
            
            {/* LOGO MANIFEST */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <img src={logo} alt="PrintsCarts" style={{ height: '72px', width: 'auto', objectFit: 'contain', margin: '0 auto 32px' }} />
                <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.02em' }}>{isAdminLogin ? 'Admin Access' : 'Sign In'}</h1>
                <p style={{ fontSize: '15px', color: '#64748b', fontWeight: '500', margin: 0 }}>Authenticated access to procurement terminal.</p>
            </div>

            {successMessage && (
               <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px', borderRadius: '16px', color: '#16a34a', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                 <FiCheckCircle /> {successMessage}
               </div>
            )}

            {error && (
              <div style={{ background: '#fff1f2', border: '1px solid #fecaca', padding: '16px', borderRadius: '16px', color: '#be123c', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <FiAlertCircle /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email Secure</label>
                <div style={{ position: 'relative' }}>
                  <FiMail style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    style={{ width: '100%', padding: '18px 24px 18px 52px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '16px', fontSize: '15px', fontWeight: '600', outline: 'none', transition: 'all 0.3s' }}
                    onFocus={(e) => e.target.style.borderColor = '#0f3d91'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <FiLock style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    style={{ width: '100%', padding: '18px 24px 18px 52px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '16px', fontSize: '15px', fontWeight: '600', outline: 'none', transition: 'all 0.3s' }}
                    onFocus={(e) => e.target.style.borderColor = '#0f3d91'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: '600', color: '#64748b', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    onChange={(e) => setIsAdminLogin(e.target.checked)}
                    checked={isAdminLogin}
                    style={{ width: '18px', height: '18px' }}
                  />
                  Admin
                </label>
                <Link href="/forgot-password" style={{ fontSize: '13px', fontWeight: '700', color: '#0f3d91', textDecoration: 'none' }}>Forgot Password?</Link>
              </div>

              <button type="submit" disabled={loading} style={{ width: '100%', padding: '18px', background: '#0f3d91', color: '#ffffff', border: 'none', borderRadius: '16px', fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.3s ease', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Decrypting...' : 'Sign In'}
              </button>
            </form>

            <div style={{ margin: '32px 0', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }}></div>
              <span style={{ fontSize: '11px', fontWeight: '900', color: '#cbd5e1' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }}></div>
            </div>

            <div style={{ textAlign: 'center' }}>
              {!isAdminLogin ? (
                <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>New user? <Link href="/signup" style={{ color: '#0f3d91', fontWeight: '800', textDecoration: 'none' }}>Sign Up</Link></p>
              ) : (
                <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Standard user? <span style={{ color: '#0f3d91', fontWeight: '800', cursor: 'pointer' }} onClick={() => setIsAdminLogin(false)}>User Terminal</span></p>
              )}
            </div>

          </div>
        </div>
      </main>
      
    </div>
  );
};

export default SignIn;
