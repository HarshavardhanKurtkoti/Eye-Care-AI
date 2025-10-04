import React from 'react';
import FAQ from '../components/FAQ';
import MotionSection from '../components/MotionSection';

export default function FaqPage(){
  return (
    <main className="page-wrap">
      <MotionSection>
        <FAQ />
      </MotionSection>
    </main>
  );
}
