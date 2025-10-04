import React, { useState } from 'react';

const DISEASES = [
  {
    name: 'Central Serous Chorioretinopathy',
    key: 'Central Serous Chorioretinopathy-Color Fundus',
    description: 'A condition where fluid builds up under the retina, causing visual distortion or blurriness. Early detection can prevent permanent vision loss.',
    wiki: 'https://en.wikipedia.org/wiki/Central_serous_chorioretinopathy',
    details: 'More info coming soon.'
  },
  {
    name: 'Diabetic Retinopathy',
    key: 'Diabetic Retinopathy',
    description: 'A diabetes complication that affects the eyes, caused by damage to the blood vessels of the retina. Early diagnosis is crucial for preventing blindness.',
    wiki: 'https://en.wikipedia.org/wiki/Diabetic_retinopathy',
    details: 'More info coming soon.'
  },
  {
    name: 'Disc Edema',
    key: 'Disc Edema',
    description: 'Swelling of the optic disc, often a sign of increased intracranial pressure or other serious conditions. Requires prompt medical attention.',
    wiki: 'https://en.wikipedia.org/wiki/Papilledema',
    details: 'More info coming soon.'
  },
  {
    name: 'Glaucoma',
    key: 'Glaucoma',
    description: 'A group of eye conditions that damage the optic nerve, often due to high eye pressure. It is a leading cause of blindness if untreated.',
    wiki: 'https://en.wikipedia.org/wiki/Glaucoma',
    details: 'More info coming soon.'
  },
  {
    name: 'Healthy',
    key: 'Healthy',
    description: 'No signs of disease. Used as a control group for comparison and to ensure accurate model predictions.',
    wiki: 'https://en.wikipedia.org/wiki/Eye',
    details: 'More info coming soon.'
  },
  {
    name: 'Macular Scar',
    key: 'Macular Scar',
    description: 'Scarring of the macula, the central part of the retina, which can lead to central vision loss. Early detection can help manage symptoms.',
    wiki: 'https://en.wikipedia.org/wiki/Macular_scar',
    details: 'More info coming soon.'
  },
  {
    name: 'Myopia',
    key: 'Myopia',
    description: 'Also known as nearsightedness, myopia is a common refractive error where distant objects appear blurry.',
    wiki: 'https://en.wikipedia.org/wiki/Myopia',
    details: 'More info coming soon.'
  },
  {
    name: 'Pterygium',
    key: 'Pterygium',
    description: 'A benign growth on the conjunctiva that can affect vision if it extends onto the cornea. Often related to UV exposure.',
    wiki: 'https://en.wikipedia.org/wiki/Pterygium_(eye)',
    details: 'More info coming soon.'
  },
  {
    name: 'Retinal Detachment',
    key: 'Retinal Detachment',
    description: 'A medical emergency where the retina pulls away from its normal position, leading to vision loss if not treated promptly.',
    wiki: 'https://en.wikipedia.org/wiki/Retinal_detachment',
    details: 'More info coming soon.'
  },
  {
    name: 'Retinitis Pigmentosa',
    key: 'Retinitis Pigmentosa',
    description: 'A group of rare genetic disorders that involve a breakdown and loss of cells in the retina, causing progressive vision loss.',
    wiki: 'https://en.wikipedia.org/wiki/Retinitis_pigmentosa',
    details: 'More info coming soon.'
  },
];

const DiseaseDetails = () => {
  const [open, setOpen] = useState(null);

  return (
    <section id="diseases" className="max-w-5xl mx-auto my-12 p-8 bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl border-2 border-blue-100 dark:border-blue-700 transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-8 text-blue-700 dark:text-blue-300 text-center">Diseases We Can Predict</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {DISEASES.map(disease => (
          <button
            key={disease.key}
            className="text-left p-6 bg-blue-50/70 dark:bg-gray-800/70 rounded-xl border border-blue-100 dark:border-blue-700 shadow flex flex-col gap-2 focus:outline-none hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-600 transition"
            onClick={() => setOpen(disease.key)}
            type="button"
          >
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-1">{disease.name}</h3>
            <p className="text-gray-700 dark:text-gray-200 text-base">{disease.description}</p>
          </button>
        ))}
      </div>
      {/* Popup Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/70">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-blue-200 dark:border-blue-700 max-w-lg w-full p-8 relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 text-2xl font-bold focus:outline-none"
              onClick={() => setOpen(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-2 text-blue-800 dark:text-blue-200">{DISEASES.find(d => d.key === open).name}</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-200 text-base">{DISEASES.find(d => d.key === open).details}</p>
            <a
              href={DISEASES.find(d => d.key === open).wiki}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors duration-200"
            >
              Read More on Wikipedia
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default DiseaseDetails;
