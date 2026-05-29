'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { saveShippingAddress } from '../redux/actions/cartActions';
import axios from 'axios';
import { Loader2, Truck, CreditCard, Lock, ChevronLeft } from 'lucide-react';

const Checkout = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const cart = useSelector((state) => state.cart);
    const { cartItems, shippingAddress } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [province, setProvince] = useState(shippingAddress.state || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const [phone, setPhone] = useState(shippingAddress.phone || '');

    const [shippingRates, setShippingRates] = useState([]);
    const [selectedRate, setSelectedRate] = useState(null);
    const [loadingShipping, setLoadingShipping] = useState(false);
    const [shippingError, setShippingError] = useState(null);

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [clover, setClover] = useState(null);

    const inputStyle = { width: '100%', padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none', fontSize: '15px', fontWeight: '500', color: '#1e293b' };
    const labelStyle = { display: 'block', textTransform: 'uppercase', fontSize: '10px', fontWeight: '900', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '8px' };

    useEffect(() => {
        const loadCloverScript = () => {
            if (window.Clover) return;
            const script = document.createElement('script');
            script.src = "https://checkout.clover.com/sdk.js";
            script.async = true;
            document.body.appendChild(script);
        };
        loadCloverScript();
    }, []);

    useEffect(() => {
        if (cartItems.length === 0) {
            router.push('/cart');
        } else if (!userInfo) {
            router.push('/signin?redirect=checkout');
        } else if (step === 2) {
            const initCloverInterval = setInterval(() => {
                if (window.Clover) {
                    clearInterval(initCloverInterval);
                    const numberEl = document.querySelector('#card-number');
                    if (numberEl && !numberEl.hasChildNodes()) {
                        try {
                            const cloverInstance = new window.Clover(process.env.NEXT_PUBLIC_CLOVER_PUBLIC_KEY);
                            const elements = cloverInstance.elements();
                            const styles = { body: { fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#1e293b' } };
                            elements.create('CARD_NUMBER', { styles }).mount('#card-number');
                            elements.create('CARD_DATE', { styles }).mount('#card-date');
                            elements.create('CARD_CVV', { styles }).mount('#card-cvv');
                            elements.create('CARD_POSTAL_CODE', { styles, defaultValue: postalCode }).mount('#card-postal-code');
                            setClover(cloverInstance);
                        } catch (err) { console.error(err); }
                    }
                }
            }, 300);
            return () => clearInterval(initCloverInterval);
        }
    }, [userInfo, cartItems, router, step, postalCode]);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const taxPrice = Number((0.15 * subtotal).toFixed(2));
    const shippingPrice = selectedRate ? Number(selectedRate.rate) : 0;
    const totalPrice = subtotal + taxPrice + shippingPrice;

    const calculateShipping = async (e) => {
        e.preventDefault();
        setLoadingShipping(true);
        setShippingError(null);
        setShippingRates([]);
        setSelectedRate(null);
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/shipping/rates`, { shippingAddress: { address, city, state: province, postalCode, country, phone }, cartItems }, { headers: { Authorization: `Bearer ${userInfo.token}` } });
            const allowedAccounts = ['ca_e3cbd16a6eb84914985d90875a6ec074', 'ca_76d0939dc1ce4c99870bbc2844d8d02b', 'ca_c5f03a14c10d4fbab837e8a35b01c7df', 'ca_b82a2962176446d09a48bc649977f467', 'ca_fb3ad562209b4e7d930bd0f31f44f2fe'];
            const filteredRates = Array.isArray(data) ? data.filter(rate => allowedAccounts.includes(rate.carrier_account_id)) : [];
            setShippingRates(filteredRates);
            if (filteredRates.length > 0) {
                const sortedRates = [...filteredRates].sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
                setSelectedRate(sortedRates[0]);
            } else { setShippingError("No logistics matches found."); }
        } catch (error) { setShippingError("Failed to calculate secure shipping."); }
        finally { setLoadingShipping(false); }
    };

    const submitShippingHandler = () => {
        if (!selectedRate) { alert("Select fulfillment method."); return; }
        dispatch(saveShippingAddress({ address, city, state: province, postalCode, country, phone }));
        setStep(2);
        window.scrollTo(0, 0);
    };

    const initPayment = async () => {
        try {
            setLoading(true);
            if (!clover) { alert('Gateway authenticating...'); setLoading(false); return; }
            const result = await clover.createToken();
            if (result.errors) { alert('Fiscal Error: ' + Object.values(result.errors).join(', ')); setLoading(false); return; }
            const orderData = { orderItems: cartItems, shippingAddress: { address, city, state: province, postalCode, country, phone }, paymentMethod: 'Clover', itemsPrice: subtotal, taxPrice, shippingPrice, totalPrice };
            const { data: createdOrder } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderData, { headers: { Authorization: `Bearer ${userInfo.token}` } });
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/clover/pay`, { amount: totalPrice, orderId: createdOrder._id, source: result.token }, { headers: { Authorization: `Bearer ${userInfo.token}` } });
            router.push('/orders');
        } catch (error) { alert('Transaction failed.'); }
        finally { setLoading(false); }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#ffffff' }}>
            <main style={{ flexGrow: 1, paddingTop: '80px', paddingBottom: '120px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
                    
                    {/* Centered Executive Header */}
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#0f3d91', marginBottom: '16px', textTransform: 'uppercase' }}>Checkout</h1>
                        <div style={{ width: '80px', height: '4px', background: '#0a3382', margin: '0 auto 24px', borderRadius: '2px' }}></div>
                        
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '32px', height: '32px', background: step >= 1 ? '#0f3d91' : '#f1f5f9', color: step >= 1 ? '#fff' : '#94a3b8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '900' }}>1</div>
                                <span style={{ fontSize: '11px', fontWeight: '900', color: step >= 1 ? '#1e293b' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Logistics</span>
                            </div>
                            <div style={{ width: '40px', height: '2px', background: '#f1f5f9' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '32px', height: '32px', background: step >= 2 ? '#0f3d91' : '#f1f5f9', color: step >= 2 ? '#fff' : '#94a3b8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '900' }}>2</div>
                                <span style={{ fontSize: '11px', fontWeight: '900', color: step >= 2 ? '#1e293b' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Payment</span>
                            </div>
                        </div>
                    </div>

                    {/* Step 1: Logistics */}
                    {step === 1 && (
                        <div style={{ background: '#ffffff', borderRadius: '40px', border: '1px solid #f1f5f9', padding: '60px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.03)' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b', marginBottom: '40px', textTransform: 'uppercase', textAlign: 'center' }}>Shipment Identification</h2>
                            <form onSubmit={calculateShipping} style={{ display: 'grid', gap: '32px' }}>
                                <div>
                                    <label style={labelStyle}>Primary Facility Address</label>
                                    <input value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="Street address or PO Box" style={inputStyle} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                    <div>
                                        <label style={labelStyle}>City / Municipality</label>
                                        <input value={city} onChange={(e) => setCity(e.target.value)} required style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>State / Province</label>
                                        <input value={province} onChange={(e) => setProvince(e.target.value)} required style={inputStyle} />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                    <div>
                                        <label style={labelStyle}>Postal Code</label>
                                        <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Country Code</label>
                                        <input value={country} onChange={(e) => setCountry(e.target.value)} required style={inputStyle} />
                                    </div>
                                </div>
                                <div>
                                    <label style={labelStyle}>Logistics Contact Number</label>
                                    <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+1 (555) 000-0000" style={inputStyle} />
                                </div>

                                {shippingRates.length === 0 ? (
                                    <button type="submit" disabled={loadingShipping} style={{ width: '100%', padding: '24px', background: '#0f3d91', color: '#ffffff', border: 'none', borderRadius: '20px', fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(15,61,145,0.2)' }}>
                                        {loadingShipping ? "Querying Fleet..." : "Verify Fulfillment Options"}
                                    </button>
                                ) : (
                                    <div style={{ marginTop: '20px', display: 'grid', gap: '20px' }}>
                                        <p style={labelStyle}>Fulfillment Tiers</p>
                                        {shippingRates.map((rate) => (
                                            <div key={rate.id} onClick={() => setSelectedRate(rate)} style={{ padding: '24px', border: `2px solid ${selectedRate?.id === rate.id ? '#0f3d91' : '#f1f5f9'}`, borderRadius: '20px', cursor: 'pointer', background: selectedRate?.id === rate.id ? '#f8fafc' : '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `6px solid ${selectedRate?.id === rate.id ? '#0f3d91' : '#e2e8f0'}`, background: '#fff' }}></div>
                                                    <div>
                                                        <p style={{ fontWeight: '900', fontSize: '16px', color: '#1e293b', margin: '0 0 4px' }}>{rate.service}</p>
                                                        <p style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', margin: 0 }}>{rate.carrier} fulfillment</p>
                                                    </div>
                                                </div>
                                                <span style={{ fontWeight: '900', color: '#0f3d91' }}>${parseFloat(rate.rate).toFixed(2)}</span>
                                            </div>
                                        ))}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginTop: '32px' }}>
                                            <button type="button" onClick={() => setShippingRates([])} style={{ padding: '20px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', fontWeight: '900', color: '#64748b' }}>Change Address</button>
                                            <button type="button" onClick={submitShippingHandler} style={{ padding: '20px', background: '#0f3d91', border: 'none', borderRadius: '20px', fontWeight: '900', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Next</button>
                                        </div>
                                    </div>
                                )}
                                {shippingError && <p style={{ textAlign: 'center', color: '#ef4444', fontWeight: '800', fontSize: '13px' }}>{shippingError}</p>}
                            </form>
                        </div>
                    )}

                    {/* Step 2: Settlement */}
                    {step === 2 && (
                        <div style={{ background: '#ffffff', borderRadius: '40px', border: '1px solid #f1f5f9', padding: '60px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.03)' }}>
                            <button onClick={() => setStep(1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', fontSize: '11px', marginBottom: '40px', cursor: 'pointer' }}>
                                <ChevronLeft size={16} /> Return to Logistics
                            </button>
                            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b', marginBottom: '40px', textTransform: 'uppercase', textAlign: 'center' }}>Confirm Order</h2>
                            
                            <div style={{ display: 'grid', gap: '32px' }}>
                                <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <span style={labelStyle}>Total Invoice</span>
                                        <span style={{ fontSize: '36px', fontWeight: '900', color: '#0f3d91' }}>${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <p style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', margin: 0 }}>Includes basic taxation and {selectedRate?.carrier} {selectedRate?.service} enrollment.</p>
                                </div>

                                <div style={{ display: 'grid', gap: '24px' }}>
                                    <div>
                                        <label style={labelStyle}>Corporate Card Number</label>
                                        <div style={{ padding: '16px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px' }}><div id="card-number" style={{ height: '24px' }}></div></div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                        <div>
                                            <label style={labelStyle}>Card Expiry Date</label>
                                            <div style={{ padding: '16px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px' }}><div id="card-date" style={{ height: '24px' }}></div></div>
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Card CVV</label>
                                            <div style={{ padding: '16px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px' }}><div id="card-cvv" style={{ height: '24px' }}></div></div>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Billing Zip / Postal Code</label>
                                        <div style={{ padding: '16px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px' }}><div id="card-postal-code" style={{ height: '24px' }}></div></div>
                                    </div>
                                    <button onClick={initPayment} disabled={loading} style={{ width: '100%', padding: '28px', background: '#0f3d91', color: '#ffffff', border: 'none', borderRadius: '24px', fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(15,61,145,0.2)', marginTop: '20px' }}>
                                        {loading ? "Authenticating Flow..." : "Confirm Order"}
                                    </button>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                                        <Lock size={12} />
                                        <span style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}>End-to-End Encrypted Secure Gateway</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default Checkout;
