import React from 'react';

const Home = () => (
  <section id="home" className="page-wrap text-center my-14">
    <h1 className="home-title text-[2.2rem] md:text-[2.6rem] font-extrabold tracking-tight mb-2">Eye Disease Detection</h1>
    <p className="home-subtitle max-w-[720px] mx-auto">
      Upload an eye image to get an instant AI‑assisted prediction powered by <span className="font-semibold text-blue-500">EfficientNet‑V2</span> and a curated, expert‑labeled dataset.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-6 max-w-5xl mx-auto">
      {[{t:'9+ conditions',d:'Common and rare eye diseases'}, {t:'5,335 images',d:'Diverse, curated dataset'}, {t:'Expert‑labeled',d:'Quality‑controlled data'}, {t:'Clinic‑ready',d:'Fast results, simple UX'}].map((f) => (
        <div key={f.t} className="feature-card rounded-xl bg-white border border-slate-200 shadow-sm p-4">
          <div className="font-semibold text-slate-900">{f.t}</div>
          <div className="text-slate-600 text-sm">{f.d}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Home;
