'use client';
import { Suspense } from 'react';
import TrackOrder from '@/pages/TrackOrder';

export default function Page() { 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackOrder />
    </Suspense>
  );
}
