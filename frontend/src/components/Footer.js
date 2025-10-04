import React from 'react';

export default function Footer(){
  return (
    <footer className="site-footer w-full border-t mt-auto py-6">
      <div className="page-wrap text-sm flex items-center justify-center gap-3 flex-wrap site-footer-content">
        <span>© {new Date().getFullYear()} Vision AI</span>
        <span className="opacity-50">•</span>
        <a className="underline hover:text-slate-900" href="https://portflio-website-azure.vercel.app/" target="_blank" rel="noreferrer noopener">Portfolio</a>
      </div>
    </footer>
  );
}
