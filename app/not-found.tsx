'use client';

export default function NotFound() {
  return (
    <div id="not-found-container" className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div id="not-found-card" className="max-w-md w-full space-y-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div id="not-found-status-code" className="text-amber-500 font-display text-7xl font-bold tracking-tight">
          404
        </div>
        <div id="not-found-text-content" className="space-y-2">
          <h2 id="not-found-title" className="text-xl font-display font-semibold text-slate-950">
            Page non trouvée
          </h2>
          <p id="not-found-description" className="text-xs text-slate-500 leading-relaxed">
            La page que vous cherchez n'existe pas ou a été déplacée. Notre équipe technique permanente de Zando s'efforce de maintenir l'expérience la plus fluide possible.
          </p>
        </div>
        <div id="not-found-actions" className="pt-2">
          <button 
            id="not-found-home-button"
            onClick={() => {
              window.location.href = '/';
            }}
            className="w-full text-center py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
          >
            Retourner à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}

