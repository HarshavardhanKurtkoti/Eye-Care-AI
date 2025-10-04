import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUpload from '../components/ImageUpload';
import PredictionResult from '../components/PredictionResult';
import MotionSection from '../components/MotionSection';

export default function PredictPage(){
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const showResult = !!result;
  const active = showResult || loading;
  return (
    <main className="page-wrap">
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <MotionSection>
            <div className="flex flex-col-reverse md:flex-row items-start justify-center gap-12 md:gap-16">
              {/* Result (left) */}
              <AnimatePresence>
                {(showResult || loading) && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0, scale: showResult ? 1.03 : 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex justify-center w-full md:w-3/5 lg:w-2/3"
                    aria-live="polite"
                  >
                    <PredictionResult result={result} loading={loading} previewUrl={previewUrl} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Upload (right) */}
                  <motion.div
                    key="uploader"
                    layout
                    className={`flex-shrink-0 w-full md:w-80 lg:w-96 flex justify-center transition-all duration-300 ease-out`}
                    animate={{ scale: showResult ? 0.995 : 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className={`w-full ${showResult ? 'md:h-36 lg:h-40' : 'md:h-80 lg:h-96'} transition-all duration-300 ease-out flex items-center justify-center`}>
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageUpload onResult={setResult} onLoadingChange={setLoading} onPreviewChange={setPreviewUrl} />
                      </div>
                    </div>
                  </motion.div>
            </div>
          </MotionSection>
        </div>
      </div>
    </main>
  );
}
