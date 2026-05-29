'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/actions/userActions';
import { FiLock, FiShield, FiAlertCircle, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

const logo = "/PrintsCartslogo.png";

const ResetPassword = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email] = useState(searchParams.get('email') || '');

  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { loading, error, success } = userResetPassword;

  useEffect(() => {
    if (success) {
      setTimeout(() => router.replace('/signin'), 2000);
    }
  }, [success, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Verification mismatch identification.');
      return;
    }
    dispatch(resetPassword(email, otp, password));
  };

  const inputStyle = { width: '100%', padding: '18px 24px 18px 52px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '16px', fontSize: '15px', fontWeight: '600', outline: 'none', transition: 'all 0.3s' };
  const labelStyle = { fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      
      <main style={{ paddingTop: '120px', paddingBottom: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '480px', padding: '0 24px' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '32px', padding: '60px 48px', boxShadow: '0 20px 60px -10px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
            
            {/* LOGO & HEADER */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <img src={logo} alt="PrintsCarts" style={{ height: '72px', width: 'auto', objectFit: 'contain', margin: '0 auto 32px' }} />
                <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Reset Password</h1>
                <p style={{ fontSize: '15px', color: '#64748b', fontWeight: '500', margin: 0, lineHeight: 1.5 }}>
                  Define your new security manifest for <strong>{email}</strong>
                </p>
            </div>

            {error && (
              <div style={{ background: '#fff1f2', border: '1px solid #fecaca', padding: '16px', borderRadius: '16px', color: '#be123c', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <FiAlertCircle /> {error}
              </div>
            )}

            {success && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px', borderRadius: '16px', color: '#16a34a', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <FiCheckCircle /> Credentials verified. Redirecting...
              </div>
            )}

            {!email ? (
               <div style={{ textAlign: 'center', padding: '20px 0' }}>
                   <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', marginBottom: '24px' }}>Invalid access. Please re-initiate procurement code.</p>
                   <Link href="/forgot-password" style={{ display: 'inline-block', padding: '14px 28px', background: '#0f3d91', color: '#ffffff', borderRadius: '12px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', textDecoration: 'none' }}>Re-initiate Request</Link>
               </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={labelStyle}>Encryption Code (OTP)</label>
                    <div style={{ position: 'relative' }}>
                      <FiShield style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit verification code" required style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={labelStyle}>New Access Key</label>
                    <div style={{ position: 'relative' }}>
                      <FiLock style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New secure password" required style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={labelStyle}>Re-verify Key</label>
                    <div style={{ position: 'relative' }}>
                      <FiLock style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat new password" required style={inputStyle} />
                    </div>
                  </div>

                  <button type="submit" disabled={loading} style={{ width: '100%', padding: '18px', background: '#0f3d91', color: '#ffffff', border: 'none', borderRadius: '16px', fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '20px', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Re-encrypting...' : <>Update Registry Key <FiArrowRight /></>}
                  </button>
                </form>
            )}

          </div>
        </div>
      </main>
      
      
    </div>
  );
};

export default ResetPassword;


