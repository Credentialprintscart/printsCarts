'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { sendRegistrationOTP, verifyRegistrationOTP } from '../redux/actions/userActions';
import { FiUser, FiMail, FiLock, FiShield, FiAlertCircle, FiArrowRight } from 'react-icons/fi';

const logo = "/PrintsCartslogo.png";

const SignUp = () => {
  const [step, setStep] = useState(1); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  const dispatch = useDispatch();
  const router = useRouter();

  const userSendOTP = useSelector((state) => state.userSendOTP);
  const { loading: loadingSendOTP, error: errorSendOTP, success: successSendOTP } = userSendOTP;

  const userVerifyOTP = useSelector((state) => state.userVerifyOTP);
  const { loading: loadingVerifyOTP, error: errorVerifyOTP, success: successVerifyOTP } = userVerifyOTP;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userLoginInfo } = userLogin;

  useEffect(() => {
    if (userLoginInfo) {
      router.push('/');
    }
  }, [router, userLoginInfo]);

  useEffect(() => {
    if (successSendOTP) {
      setStep(2);
    }
  }, [successSendOTP]);

  useEffect(() => {
    if (successVerifyOTP) {
      router.push('/signin?message=Successfully Verified, Please Login');
    }
  }, [successVerifyOTP, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (password !== confirmPassword) {
        alert('Credentials mismatch identification.');
        return;
      }
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
      dispatch(sendRegistrationOTP(firstName, lastName, email, password));
    } else {
      dispatch(verifyRegistrationOTP(email, otp));
    }
  };

  const inputStyle = { width: '100%', padding: '16px 20px 16px 52px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '16px', fontSize: '15px', fontWeight: '600', outline: 'none', transition: 'all 0.3s ease' };
  const labelStyle = { fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      <main style={{ paddingTop: '120px', paddingBottom: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '520px', padding: '0 24px' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '32px', padding: '60px 48px', boxShadow: '0 20px 60px -10px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
            
            {/* LOGO MANIFEST */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <img src={logo} alt="PrintsCarts" style={{ height: '72px', width: 'auto', objectFit: 'contain', margin: '0 auto 32px' }} />
                <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                  {step === 1 ? 'Create Account' : 'Access Node Verification'}
                </h1>
                <p style={{ fontSize: '15px', color: '#64748b', fontWeight: '500', margin: 0, lineHeight: 1.5 }}>
                  {step === 1 
                    ? 'Register your company node for official procurement.' 
                    : `Encrypted verification code sent to ${email}`}
                </p>
            </div>

            {(errorSendOTP || errorVerifyOTP) && (
              <div style={{ background: '#fff1f2', border: '1px solid #fecaca', padding: '16px', borderRadius: '16px', color: '#be123c', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <FiAlertCircle /> {step === 1 ? errorSendOTP : errorVerifyOTP}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {step === 1 ? (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={labelStyle}>Full Manifest Name</label>
                    <div style={{ position: 'relative' }}>
                      <FiUser style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full technical name" required style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={labelStyle}>Email Secure Node</label>
                    <div style={{ position: 'relative' }}>
                      <FiMail style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" required style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                       <label style={labelStyle}>Access Key</label>
                       <div style={{ position: 'relative' }}>
                          <FiLock style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••" required style={{ ...inputStyle, paddingLeft: '50px' }} />
                       </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                       <label style={labelStyle}>Verify Key</label>
                       <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••" required style={{ ...inputStyle, paddingLeft: '24px' }} />
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={labelStyle}>Verification Code</label>
                  <div style={{ position: 'relative' }}>
                    <FiShield style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#0f3d91' }} />
                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit verification sequence" required style={inputStyle} />
                  </div>
                  <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#0f3d91', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', cursor: 'pointer', textAlign: 'left', letterSpacing: '0.05em' }}>
                    Revise email / Resend code
                  </button>
                </div>
              )}

              <button type="submit" disabled={loadingSendOTP || loadingVerifyOTP} style={{ width: '100%', padding: '20px', background: '#0f3d91', color: '#ffffff', border: 'none', borderRadius: '16px', fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.4s ease', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                {loadingSendOTP || loadingVerifyOTP ? 'Encrypting...' : (step === 1 ? <>Sign Up <FiArrowRight /></> : 'Verify & Open Terminal')}
              </button>
            </form>

            <div style={{ margin: '32px 0', borderBottom: '1px solid #f1f5f9' }}></div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>
                Already have an account? <Link href="/signin" style={{ color: '#0f3d91', fontWeight: '800', textDecoration: 'none' }}>Sign In</Link>
              </p>
            </div>

          </div>
        </div>
      </main>
      
    </div>
  );
};

export default SignUp;
