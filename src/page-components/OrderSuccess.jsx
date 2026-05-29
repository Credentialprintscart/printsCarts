import Link from 'next/link';
import '../styles/pages.css';

const OrderSuccess = () => {
  return (
    <>
      
      <div className="order-success-page">
        <div className="order-success-container">
          <div className="success-content">
            <div className="success-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="36" fill="#10b981"/>
                <path d="M25 40L35 50L55 30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1>Order Placed Successfully!</h1>
            <p className="success-message">
              Thank you for your order. We've received your order and will begin processing it right away.
            </p>
            <p className="order-info">
              You will receive an email confirmation shortly with your order details and tracking information.
            </p>
            <div className="success-actions">
              <Link href="/printers" className="btn-primary">Continue Shopping</Link>
              <Link href="/orders" className="btn-outline">View My Orders</Link>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default OrderSuccess;



