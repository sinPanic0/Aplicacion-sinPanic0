import React, { useContext } from 'react';
import { ChevronLeft } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { STUDY_METHODS } from '../utils/constants';

/**
 * @description Pantalla para elegir el método de estudio preferido.
 */
export const MethodsScreen = () => {
  const { selectedMethod, setSelectedMethod, setScreen } = useContext(AppContext);

  return (
    <div className="p-6 pb-32 bg-slate-50 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setScreen('home')} className="p-2 text-emerald-600"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-bold text-slate-800">SinPanic0</h2>
      </div>
      <h1 className="text-3xl font-black text-emerald-500 text-center mb-2">Planes de Estudio</h1>
      <p className="text-slate-500 text-center text-sm mb-8 px-4">Selecciona el método que mejor se adapte a ti.</p>
      <div className="space-y-4">
        {STUDY_METHODS.map((m) => (
          <div key={m.id} className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${selectedMethod === m.id ? 'bg-white border-emerald-500 shadow-xl' : 'bg-white border-transparent shadow-sm'}`} onClick={() => setSelectedMethod(m.id)}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{m.tag}</span>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedMethod === m.id ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                <m.icon size={24} />
              </div>
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-1">{m.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">{m.desc}</p>
            <button className={`w-full py-2 rounded-xl text-xs font-black transition-all ${selectedMethod === m.id ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
              {selectedMethod === m.id ? 'Seleccionado' : 'Seleccionar'}
            </button>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t z-50">
        <button onClick={() => setScreen('home')} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black shadow-lg shadow-emerald-100">
          Guardar y Volver
        </button>
      </div>
    </div>
  );
};
