import React from 'react';
import MotionSection from '../components/MotionSection';

export default function NotFoundPage(){
  return (
    <main className="page-wrap text-center py-16">
      <MotionSection>
        <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
        <p className="text-slate-600 mt-2">The page you’re looking for doesn’t exist.</p>
        <a href="/" className="inline-block mt-6 px-4 py-2 btn-primary text-white rounded-md font-semibold shadow">Go home</a>
      </MotionSection>
    </main>
  );
}
