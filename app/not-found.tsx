import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div className="text-amber-500 font-display text-7xl font-bold tracking-tight">
          404
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-display font-semibold text-slate-950">
            Page non trouvée
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            La page que vous cherchez n'existe pas ou a été déplacée. Notre équipe technique permanente de Zando s'efforce de maintenir l'expérience la plus fluide possible.
          </p>
        </div>
        <div className="pt-2">
          <Link 
            href="/" 
            className="inline-block w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Retourner à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
