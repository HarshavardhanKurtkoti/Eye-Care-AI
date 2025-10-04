import React from 'react';
import Home from '../components/Home';
import MotionSection from '../components/MotionSection';

export default function HomePage(){
  return (
    <main>
      <MotionSection>
        <Home />
      </MotionSection>
    </main>
  );
}
