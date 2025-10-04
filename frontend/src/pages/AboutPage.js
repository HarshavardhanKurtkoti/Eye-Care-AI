import React from 'react';
import AboutTeam from '../components/AboutTeam';
import ModelInfo from '../components/ModelInfo';
import MotionSection from '../components/MotionSection';

export default function AboutPage(){
  return (
    <main className="page-wrap">
      <MotionSection>
        <AboutTeam />
        <div className="my-8" />
        <ModelInfo />
      </MotionSection>
    </main>
  );
}
