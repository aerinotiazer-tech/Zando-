'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error('💥 Application Runtime Error:', error);
  }, [error]);

  const handleReset = () => {
    try {
      if (typeof window !== 'undefined') {
        // Clear any local caches that could contain corrupted state
        Object.keys(window.localStorage).forEach((key) => {
          if (key.startsWith('zando_')) {
            window.localStorage.removeItem(key);
          }
        });
      }
      // Attempt Next.js segment re-rendering
      reset();
    } catch (e) {
      console.error('Failed to reset segment:', e);
    }
    // Hard reload the window to clear all runtime in-memory errors and parameters
    window.location.replace('/');
  };

  const handleGoHome = () => {
    try {
      if (typeof window !== 'undefined') {
        Object.keys(window.localStorage).forEach((key) => {
          if (key.startsWith('zando_')) {
            window.localStorage.removeItem(key);
          }
        });
      }
    } catch (e) {
      console.error('Failed to clear state on home navigation:', e);
    }
    // Redirect to root route cleanly
    window.location.href = '/';
  };

  return (
    <div id="error-container" className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div id="error-card" className="max-w-md w-full space-y-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div id="error-symbol" className="text-red-500 font-display text-7xl font-bold tracking-tight">
          !
        </div>
        <div id="error-text-content" className="space-y-2">
          <h2 id="error-title" className="text-xl font-display font-semibold text-slate-950">
            Une erreur est survenue
          </h2>
          <p id="error-description" className="text-xs text-slate-500 leading-relaxed">
            Un problème technique temporaire empêche l'affichage de cette page. Notre équipe technique permanente de Zando est déjà sur le coup pour résoudre cela.
          </p>
        </div>
        <div id="error-actions" className="pt-2 space-y-3">
          <button
            id="error-reset-button"
            onClick={handleReset}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
          >
            Réessayer
          </button>
          <button
            id="error-home-button"
            onClick={handleGoHome}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
          >
            Retourner à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}

