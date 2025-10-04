import React from 'react';
import DiseaseDetails from '../components/DiseaseDetails';
import MotionSection from '../components/MotionSection';

export default function DiseasesPage(){
  return (
    <main className="page-wrap">
      <MotionSection>
        <DiseaseDetails />
      </MotionSection>
    </main>
  );
}
