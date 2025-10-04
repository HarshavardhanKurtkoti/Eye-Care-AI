import React from 'react';
import ContactFeedback from '../components/ContactFeedback';
import MotionSection from '../components/MotionSection';

export default function ContactPage(){
  return (
    <main className="page-wrap">
      <MotionSection>
        <ContactFeedback />
      </MotionSection>
    </main>
  );
}
