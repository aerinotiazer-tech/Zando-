'use client';

import { useEffect } from 'react';
import Link from 'next/link';

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div className="text-red-500 font-display text-7xl font-bold tracking-tight">
          !
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-display font-semibold text-slate-950">
            Une erreur est survenue
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Un problème technique temporaire empêche l'affichage de cette page. Notre équipe technique permanente de Zando est déjà sur le coup pour résoudre cela.
          </p>
        </div>
        <div className="pt-2 space-y-3">
          <button
            onClick={() => reset()}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="block w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Retourner à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
