import { Suspense } from 'react';
import Printers from '@/pages/Printers';

export const metadata = {
  title: 'Printers | PrintsCarts',
  description: 'Browse our wide range of high-quality printers for home and office.',
};

export default function Page() { 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Printers />
    </Suspense>
  );
}
