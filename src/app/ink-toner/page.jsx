import { Suspense } from 'react';
import InkToner from '@/pages/InkToner';

export const metadata = {
  title: 'Ink & Toner | PrintsCarts',
  description: 'Genuine-quality ink and toner cartridges for all major printer brands.',
};

export default function Page() { 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InkToner />
    </Suspense>
  );
}
