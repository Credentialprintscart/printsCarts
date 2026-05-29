'use client';
import { Suspense } from 'react';
import SignIn from '@/pages/SignIn';

export default function Page() { 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn />
    </Suspense>
  );
}
