import EasyPostClient from '@easypost/api';
import { protect } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

let client;
if (process.env.EASYPOST_API_KEY) {
  client = new EasyPostClient(process.env.EASYPOST_API_KEY);
}

export async function POST(req) {
  try {
    await protect(req);

    if (!client) {
      return errorResponse('Shipping service not configured', 503);
    }

    const { shippingAddress, cartItems } = await req.json();

    if (!shippingAddress || !cartItems || cartItems.length === 0) {
      return errorResponse('Missing shipping address or cart items', 400);
    }

    const fromAddress = await client.Address.create({
      company: process.env.COMPANY_NAME || 'PrintsCarts',
      street1: process.env.COMPANY_ADDRESS || '123 Business Rd',
      city: process.env.COMPANY_CITY || 'New York',
      state: process.env.COMPANY_STATE || 'NY',
      zip: process.env.COMPANY_ZIP || '10001',
      country: process.env.COMPANY_COUNTRY || 'US',
      phone: process.env.COMPANY_PHONE || '123-456-7890'
    });

    const toAddress = await client.Address.create({
      street1: shippingAddress.address,
      city: shippingAddress.city,
      state: shippingAddress.state || '',
      zip: shippingAddress.postalCode,
      country: shippingAddress.country || 'US',
      phone: shippingAddress.phone
    });

    const totalWeightOz = cartItems.reduce((acc, item) => {
      const itemWeight = item.weight ? parseFloat(item.weight) : 20;
      return acc + (itemWeight * item.qty);
    }, 0);

    const parcel = await client.Parcel.create({
      weight: totalWeightOz
    });

    const shipment = await client.Shipment.create({
      to_address: toAddress,
      from_address: fromAddress,
      parcel: parcel
    });

    const allowedAccounts = [
      'ca_e3cbd16a6eb84914985d90875a6ec074',
      'ca_76d0939dc1ce4c99870bbc2844d8d02b',
      'ca_c5f03a14c10d4fbab837e8a35b01c7df',
      'ca_b82a2962176446d09a48bc649977f467'
    ];

    const filteredRates = shipment.rates.filter(rate => {
      return (
        allowedAccounts.includes(rate.carrier_account_id) ||
        (rate.carrier === 'UPSDAP' || rate.carrier_account_id === '1399VH')
      );
    });

    return successResponse(filteredRates);
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
