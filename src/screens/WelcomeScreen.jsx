import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { supabase } from '../lib/supabaseClient';

/**
 * @description Pantalla inicial de bienvenida a la app.
 * Permite inscribirse (iniciar onboarding) o iniciar sesión (ir al inicio).
 */
export const WelcomeScreen = () => {
  const { setScreen } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-[#fcfdfc]">
      <div className="w-40 h-40 bg-white rounded-full shadow-xl flex items-center justify-center mb-10 border border-emerald-50">
        <div className="text-emerald-700">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <path d="M12 6v6m0 0l-2-2m2 2l2-2" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <h1 className="text-4xl font-extrabold text-emerald-800 mb-2 tracking-tight">SinPanic0</h1>
      <p className="text-slate-500 mb-16 font-medium">Estudia con confianza, presenta con seguridad</p>
      <div className="w-full space-y-4">
        <button onClick={() => setScreen('auth')} className="w-full py-4 bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 active:scale-95 transition-all">Inscríbete o Inicia Sesión</button>
      </div>
    </div>
  );
};
