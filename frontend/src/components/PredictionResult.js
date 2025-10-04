import React from 'react';

function Skeleton() {
  return (
    <section className="max-w-3xl mx-auto mt-0 mb-8 p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
      <div className="animate-pulse">
        <div className="h-8 w-64 bg-slate-200 rounded mb-3" />
        <div className="h-5 w-96 bg-slate-200 rounded mb-6" />
        <div className="h-6 w-72 bg-slate-200 rounded mb-3" />
        <div className="h-6 w-48 bg-slate-200 rounded" />
      </div>
    </section>
  );
}

const PredictionResult = ({ result, loading, previewUrl }) => {
  if (loading) return <Skeleton />;
  if (!result) return null;

  return (
    <div className="result-card mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md p-3 flex items-center">
      <div className="flex items-center space-x-4 w-full">
        {previewUrl && (
          <img src={previewUrl} alt="preview" className="preview-img-result rounded-md flex-shrink-0" />
        )}
        <div>
          <h3 className="text-2xl font-semibold mb-0">Prediction</h3>
          <p className="text-lg text-slate-800 dark:text-slate-200 mb-0">{result?.label || result?.diagnosis || '—'}</p>
          {result?.confidence != null && (
            <p className="text-xs text-gray-500">Confidence: {(result.confidence || 0).toFixed(4)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
