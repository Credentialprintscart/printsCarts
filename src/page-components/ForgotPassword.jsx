'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../redux/actions/userActions';
import { FiMail, FiAlertCircle, FiArrowRight } from 'react-icons/fi';

const logo = "/PrintsCartslogo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  
  const dispatch = useDispatch();
  const router = useRouter();

  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { loading, error, success } = userForgotPassword;

  useEffect(() => {
    if (success) {
      router.push(`/reset-password?email=${email}`);
    }
  }, [success, router, email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(forgotPassword(email));
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      
      <main style={{ paddingTop: '120px', paddingBottom: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '480px', padding: '0 24px' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '32px', padding: '60px 48px', boxShadow: '0 20px 60px -10px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
            
            {/* LOGO & HEADER */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <img src={logo} alt="PrintsCarts" style={{ height: '72px', width: 'auto', objectFit: 'contain', margin: '0 auto 32px' }} />
                <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Forgot Password</h1>
                <p style={{ fontSize: '15px', color: '#64748b', fontWeight: '500', margin: 0, lineHeight: 1.5 }}>
                  Enter your encrypted node email to receive a secure verification sequence.
                </p>
            </div>

            {error && (
              <div style={{ background: '#fff1f2', border: '1px solid #fecaca', padding: '16px', borderRadius: '16px', color: '#be123c', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <FiAlertCircle /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email Secure Node</label>
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

              <button type="submit" disabled={loading} style={{ width: '100%', padding: '18px', background: '#0f3d91', color: '#ffffff', border: 'none', borderRadius: '16px', fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Encrypting...' : <>Send Secure OTP <FiArrowRight /></>}
              </button>
            </form>

            <div style={{ margin: '32px 0', borderBottom: '1px solid #f1f5f9' }}></div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>
                Remembered your credentials? <Link href="/signin" style={{ color: '#0f3d91', fontWeight: '800', textDecoration: 'none' }}>Back to Sign In</Link>
              </p>
            </div>

          </div>
        </div>
      </main>
      
      
    </div>
  );
};

export default ForgotPassword;


