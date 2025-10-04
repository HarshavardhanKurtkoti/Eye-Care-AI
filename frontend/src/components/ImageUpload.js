import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageUpload = ({ onResult, onLoadingChange, onPreviewChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // revoke previous preview if present
      if (preview) {
        try { URL.revokeObjectURL(preview); } catch {}
      }
      const url = URL.createObjectURL(file);
      setPreview(url);
      onPreviewChange && onPreviewChange(url);
      setError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      if (preview) {
        try { URL.revokeObjectURL(preview); } catch {}
      }
      const url = URL.createObjectURL(file);
      setPreview(url);
      onPreviewChange && onPreviewChange(url);
      setError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select an image.');
      return;
    }
  setLoading(true);
  onLoadingChange && onLoadingChange(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Prediction failed.');
      const data = await response.json();
  onResult(data);
    } catch (err) {
      setError('Prediction failed. Please try again.');
    } finally {
      setLoading(false);
      onLoadingChange && onLoadingChange(false);
    }
  };

  const fileInputRef = useRef(null);

  const handleRemove = (e) => {
    e && e.preventDefault();
    const ok = window.confirm('Remove the selected image?');
    if (!ok) return;
    setSelectedFile(null);
    if (preview) {
      try { URL.revokeObjectURL(preview); } catch {}
    }
    setPreview(null);
    onPreviewChange && onPreviewChange(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    // Inform parent to reset UI (return uploader to original size)
    onLoadingChange && onLoadingChange(false);
    onResult && onResult(null);
  };

  return (
  <form id="predict" onSubmit={handleSubmit} className="w-full mx-auto mt-0 mb-8 p-5 site-card rounded-2xl flex flex-col items-center">
      <div className="w-full mb-4 text-center">
        <h3 className="text-2xl md:text-3xl font-extrabold home-title">Upload an eye image</h3>
        <p className="mt-2 text-sm md:text-base text-slate-500 dark:text-slate-300">Upload a retinal image for instant AI prediction.</p>
      </div>
      <label
        htmlFor="file-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full flex flex-col items-center justify-center site-dropzone rounded-xl p-3 cursor-pointer transition mb-3"
      >
        <AnimatePresence>
          {preview ? (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.45 }} className="flex flex-col items-center">
              <img src={preview} alt="Preview" className="preview-img-uploader mb-4" />
              <div className="flex flex-col items-center">
                <div className="text-base md:text-lg text-slate-600 dark:text-slate-300">{selectedFile && selectedFile.name}</div>
                <button type="button" onClick={handleRemove} className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/10 dark:text-red-300">Remove</button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
        { !preview && (
          <div className="flex flex-col items-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-400 dark:text-slate-400">
              <path d="M12 3v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 11l-9-8-9 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="mt-3 text-base md:text-lg text-slate-700 dark:text-slate-300 font-medium">Drag & drop or click to select an eye image</span>
            <small className="text-sm text-slate-400 dark:text-slate-400 mt-3">JPEG/PNG, recommended 224x224 – 4096x4096, max 10MB</small>
          </div>
        )}
        <input
          id="file-upload"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>


      <div className="w-full flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full px-6 py-2 btn-primary text-white rounded-md font-bold shadow disabled:opacity-60 text-base md:text-lg"
        >
          {loading ? 'Predicting...' : 'Predict Disease'}
        </button>
      </div>

      {error && <div className="mt-3 text-red-600 font-medium">{error}</div>}
    </form>
  );
};

export default ImageUpload;
