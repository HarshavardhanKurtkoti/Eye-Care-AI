import React from "react";

const FAQS = [
  {
    q: "What diseases can this platform detect?",
    a: "The platform can detect multiple eye diseases including Diabetic Retinopathy, Glaucoma, Macular Scar, Myopia, Pterygium, Retinal Detachment, Retinitis Pigmentosa, Disc Edema, Central Serous Chorioretinopathy, and also identify healthy eyes."
  },
  {
    q: "How accurate is the AI model?",
    a: "The EfficientNetV2-based model achieves an overall accuracy of 88% on the test set, with some diseases exceeding 90% precision. See the Model Info section for detailed metrics."
  },
  {
    q: "Is my data safe?",
    a: "Uploaded images are only used for prediction and are not stored or shared. Your privacy is respected."
  },
  {
    q: "Can I use this for clinical diagnosis?",
    a: "This tool is for educational and research purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider."
  },
  {
    q: "What technology powers this platform?",
    a: "The frontend is built with React and Tailwind CSS. The backend uses Flask and a Keras deep learning model (EfficientNetV2) trained on a curated dataset of eye images."
  },
  {
    q: "How do I get started?",
    a: "Go to the Predict section, upload a fundus image, and view the AI's prediction instantly."
  }
];

const FAQ = () => (
  <section id="faq" className="max-w-3xl mx-auto my-16 p-8 bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl border-2 border-blue-100 dark:border-blue-700 transition-colors duration-300">
    <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300 text-center">Frequently Asked Questions</h2>
    <div className="space-y-6">
      {FAQS.map((item, idx) => (
        <div key={idx} className="border-b border-blue-100 dark:border-blue-700 pb-4">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-1">Q: {item.q}</h3>
          <p className="text-gray-700 dark:text-gray-200 pl-2">{item.a}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FAQ;
