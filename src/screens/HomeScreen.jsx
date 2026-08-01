import React, { useContext } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { STUDY_METHODS, SUBJECTS } from '../utils/constants';

/**
 * @description Pantalla principal. Muestra el versículo diario, el método de estudio y la lista de materias.
 */
export const HomeScreen = () => {
  const { dailyVerse, selectedMethod, setSelectedSubject, setScreen } = useContext(AppContext);

  return (
    <div className="p-5 pb-24 bg-[#f8fafc] min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-100"><BookOpen size={20} /></div>
          <h2 className="text-2xl font-black text-slate-800">SinPanic0</h2>
        </div>
      </header>

      <div className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-[2rem] p-8 text-white mb-8 shadow-2xl shadow-emerald-200 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Versículo del día</span>
          <h3 className="text-2xl font-bold mt-3 leading-tight">{dailyVerse.text}</h3>
          <p className="mt-3 text-sm font-medium opacity-90">{dailyVerse.ref}</p>
        </div>
        <div className="absolute -right-6 -bottom-6 opacity-10"><BookOpen size={140} strokeWidth={1} /></div>
      </div>

      {(() => {
        const currentMethod = STUDY_METHODS.find(m => m.id === selectedMethod);
        const MethodIcon = currentMethod?.icon;
        return (
          <div className="bg-white p-5 rounded-[1.5rem] border-2 border-emerald-500 shadow-md mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Tu Plan de Estudio</span>
              <button onClick={() => setScreen('methods')} className="text-xs text-white font-bold bg-emerald-500 px-3 py-1.5 rounded-xl hover:bg-emerald-600 transition-colors shadow-sm">Cambiar</button>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
                {MethodIcon && <MethodIcon size={24} />}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-black text-slate-800">{currentMethod?.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{currentMethod?.desc}</p>
              </div>
            </div>
          </div>
        );
      })()}

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black text-slate-800 text-xl">Tus Materias</h3>
      </div>
      <div className="space-y-4">
        {SUBJECTS.map((sub) => (
          <div key={sub.id} onClick={() => { setSelectedSubject(sub); setScreen('subject'); }} className="bg-white p-5 rounded-[1.5rem] border border-slate-50 shadow-sm flex items-center gap-4 active:scale-98 transition-all cursor-pointer hover:shadow-md group">
            <div className={`w-14 h-14 bg-${sub.color}-50 text-${sub.color}-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}><sub.icon size={28} /></div>
            <div className="flex-1">
              <h4 className="font-black text-slate-800 text-base">{sub.name}</h4>
              <p className="text-xs text-slate-400 font-medium mt-1">{sub.completed} de {sub.total} lecciones completadas</p>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </div>
        ))}
      </div>
    </div>
  );
};
