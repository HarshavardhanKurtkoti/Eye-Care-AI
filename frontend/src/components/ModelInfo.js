import React from "react";

const ModelArchitectureSVG = () => (
  <div className="w-full flex justify-center items-center mb-2">
    <svg width="320" height="630" viewBox="0 0 320 630" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.07" />
        </filter>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto" markerUnits="strokeWidth">
          <polygon points="0 0, 8 4, 0 8" fill="#2563EB" />
        </marker>
      </defs>
      {/* Input Layer */}
      <rect x="90" y="30" width="140" height="48" rx="12" fill="#181f2e" stroke="#2563EB" strokeWidth="2" filter="url(#shadow)"/>
      <text x="160" y="54" textAnchor="middle" fontSize="15" fill="#2563EB" fontWeight="bold">Input</text>
      <text x="160" y="70" textAnchor="middle" fontSize="10" fill="#2563EB" opacity="0.7">224×224×3</text>
      {/* Arrow */}
      <line x1="160" y1="78" x2="160" y2="128" stroke="#2563EB" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
      {/* EfficientNetV2 */}
      <rect x="70" y="128" width="180" height="48" rx="12" fill="#1a1200" stroke="#EA580C" strokeWidth="2" filter="url(#shadow)"/>
      <text x="160" y="152" textAnchor="middle" fontSize="14" fill="#EA580C" fontWeight="bold">EfficientNetV2</text>
      <text x="160" y="168" textAnchor="middle" fontSize="10" fill="#EA580C" opacity="0.7">Feature Extractor (KerasLayer)</text>
      {/* Arrow */}
      <line x1="160" y1="176" x2="160" y2="210" stroke="#65A30D" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
      {/* Flatten */}
      <rect x="110" y="210" width="100" height="24" rx="10" fill="#0d1a0d" stroke="#65A30D" strokeWidth="2" filter="url(#shadow)"/>
      <text x="160" y="226" textAnchor="middle" fontSize="13" fill="#65A30D" fontWeight="bold">Flatten</text>
      {/* Arrow */}
      <line x1="160" y1="234" x2="160" y2="264" stroke="#0891B2" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
      {/* Dense 512 */}
      <rect x="110" y="264" width="100" height="22" rx="9" fill="#001a1a" stroke="#22D3EE" strokeWidth="2" filter="url(#shadow)"/>
      <text x="160" y="279" textAnchor="middle" fontSize="12" fill="#22D3EE" fontWeight="bold">Dense 512</text>
      {/* BatchNorm */}
      <rect x="110" y="292" width="100" height="14" rx="6" fill="#181a2f" stroke="#6366F1" strokeWidth="1.2" filter="url(#shadow)"/>
      <text x="160" y="303" textAnchor="middle" fontSize="10" fill="#6366F1">BatchNorm</text>
      {/* Dropout */}
      <rect x="110" y="310" width="100" height="14" rx="6" fill="#2a0d1a" stroke="#DB2777" strokeWidth="1.2" filter="url(#shadow)"/>
      <text x="160" y="321" textAnchor="middle" fontSize="10" fill="#F472B6">Dropout</text>
      {/* Arrow */}
      <line x1="160" y1="326" x2="160" y2="356" stroke="#0891B2" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
      {/* Dense 256 */}
      <rect x="120" y="356" width="80" height="22" rx="9" fill="#001a1a" stroke="#22D3EE" strokeWidth="2" filter="url(#shadow)"/>
      <text x="160" y="371" textAnchor="middle" fontSize="12" fill="#22D3EE" fontWeight="bold">Dense 256</text>
      {/* BatchNorm */}
      <rect x="120" y="384" width="80" height="14" rx="6" fill="#181a2f" stroke="#6366F1" strokeWidth="1.2" filter="url(#shadow)"/>
      <text x="160" y="395" textAnchor="middle" fontSize="10" fill="#6366F1">BatchNorm</text>
      {/* Dropout */}
      <rect x="120" y="402" width="80" height="14" rx="6" fill="#2a0d1a" stroke="#DB2777" strokeWidth="1.2" filter="url(#shadow)"/>
      <text x="160" y="413" textAnchor="middle" fontSize="10" fill="#F472B6">Dropout</text>
      {/* Arrow */}
      <line x1="160" y1="418" x2="160" y2="448" stroke="#0891B2" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
      {/* Dense 128 */}
      <rect x="120" y="448" width="80" height="22" rx="9" fill="#001a1a" stroke="#22D3EE" strokeWidth="2" filter="url(#shadow)"/>
      <text x="160" y="463" textAnchor="middle" fontSize="12" fill="#22D3EE" fontWeight="bold">Dense 128</text>
      {/* BatchNorm */}
      <rect x="120" y="476" width="80" height="14" rx="6" fill="#181a2f" stroke="#6366F1" strokeWidth="1.2" filter="url(#shadow)"/>
      <text x="160" y="487" textAnchor="middle" fontSize="10" fill="#6366F1">BatchNorm</text>
      {/* Dropout */}
      <rect x="120" y="494" width="80" height="14" rx="6" fill="#2a0d1a" stroke="#DB2777" strokeWidth="1.2" filter="url(#shadow)"/>
      <text x="160" y="505" textAnchor="middle" fontSize="10" fill="#F472B6">Dropout</text>
      {/* Arrow */}
      <line x1="160" y1="510" x2="160" y2="570" stroke="#2563EB" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
      {/* Output Layer */}
      <rect x="90" y="570" width="140" height="48" rx="12" fill="#181f2e" stroke="#2563EB" strokeWidth="2" filter="url(#shadow)"/>
      <text x="160" y="594" textAnchor="middle" fontSize="15" fill="#2563EB" fontWeight="bold">Output</text>
      <text x="160" y="610" textAnchor="middle" fontSize="10" fill="#2563EB" opacity="0.7">10-class Softmax</text>
      {/* Extra space for padding */}
      <rect x="0" y="628" width="1" height="1" fill="none"/>
    </svg>
  </div>
);

const ModelInfo = () => (
  <section id="model-info" className="max-w-3xl mx-auto my-16 p-8 bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl border-2 border-blue-100 dark:border-blue-700 transition-colors duration-300">
    <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300 text-center">Model Info / Performance</h2>
    <div className="mb-6 text-gray-800 dark:text-gray-100 text-base">
      <p>
        <span className="font-semibold">Architecture:</span> EfficientNetV2 (TensorFlow Hub) as a feature extractor, followed by dense, batch normalization, and dropout layers for robust classification.
      </p>
      <ul className="list-disc list-inside my-3">
        <li><span className="font-semibold">Input:</span> 224x224 RGB fundus images</li>
        <li><span className="font-semibold">Feature Extractor:</span> EfficientNetV2 (KerasLayer from TensorFlow Hub)</li>
        <li><span className="font-semibold">Dense Layers:</span> 512 → 256 → 128 (with BatchNorm & Dropout)</li>
        <li><span className="font-semibold">Output:</span> 10-class softmax (multi-class classification)</li>
        <li><span className="font-semibold">Regularization:</span> BatchNormalization and Dropout after each dense layer</li>
      </ul>
      <p>
        <span className="font-semibold">Training Dataset:</span> 5335 pre-augmented fundus images, 10 classes, expert-labeled.
      </p>
      <p>
        <span className="font-semibold">Test Accuracy:</span> <span className="text-green-700 dark:text-green-300 font-bold">88%</span><br/>
        <span className="font-semibold">Best Precision (&gt;90%):</span> Diabetic Retinopathy, Disc Edema, Myopia, Pterygium, Retinal Detachment, Retinitis Pigmentosa
      </p>
      <p>
        <span className="font-semibold">Limitations:</span> Some classes have fewer samples; not a substitute for clinical diagnosis. See the README for more details.
      </p>
    </div>
    <ModelArchitectureSVG />
    <span className="text-xs text-blue-700 dark:text-blue-300 block text-center">Model architecture diagram (SVG, recreated)</span>
  </section>
);

export default ModelInfo;
