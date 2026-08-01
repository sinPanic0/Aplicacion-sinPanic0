import React, { useContext } from 'react';
import { ChevronLeft } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { SUBJECTS } from '../utils/constants';

/**
 * @description Pantalla de progreso general.
 * Calcula el porcentaje de horas estudiadas basado en la intensidad y los meses faltantes.
 */
export const ProgressScreen = () => {
  const { userProfile, setScreen, diagnosticScores } = useContext(AppContext);

  const hoursPerDayMap = { 1: 0.5, 2: 1.5, 3: 2.5, 4: 3.5 };
  const totalDays = userProfile.timeLeftMonths * 30;
  const totalHoursRequired = Math.round(totalDays * hoursPerDayMap[userProfile.intensity]);
  const percentage = Math.min(100, Math.round((userProfile.totalHoursStudied / totalHoursRequired) * 100));

  return (
    <div className="p-6 pb-24 bg-slate-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <button onClick={() => setScreen('home')} className="w-11 h-11 rounded-full bg-white shadow-sm text-emerald-600 flex items-center justify-center border border-slate-100">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-black text-slate-800">Tu Progreso</h2>
        <div className="w-11 h-11" />
      </header>
      
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 mb-6 flex flex-col items-center">
        <h3 className="font-bold text-slate-800 mb-6">Meta de Estudio</h3>
        
        <div className="w-40 h-40 relative mb-4">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="68" stroke="#a9adb0ff" strokeWidth="12" fill="transparent" />
            <circle 
              cx="80" cy="80" r="68" 
              stroke="#10b981" strokeWidth="12" fill="transparent" 
              strokeDasharray="427.2" 
              strokeDashoffset={427.2 - (427.2 * percentage) / 100} 
              strokeLinecap="round" 
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-black text-slate-800">{percentage}%</span>
            <span className="block text-xs font-medium text-slate-400 mt-1">Completado</span>
          </div>
        </div>

        <div className="flex w-full justify-between mt-4">
          <div className="text-center">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Estudiado</p>
            <p className="text-xl font-black text-emerald-600">{userProfile.totalHoursStudied}h</p>
          </div>
          <div className="w-px bg-slate-100"></div>
          <div className="text-center">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Meta</p>
            <p className="text-xl font-black text-slate-800">{totalHoursRequired}h</p>
          </div>
        </div>
      </div>

      <h3 className="font-black text-slate-800 text-xl mb-4">Puntajes Proyectados (ICFES)</h3>
      <div className="space-y-4">
        {SUBJECTS.map((sub) => {
          // Si no ha hecho el diagnóstico, 0. Si lo hizo, convertir sobre 100. (Asumiendo 15 preguntas máx)
          const rawScore = diagnosticScores[sub.id] || 0;
          // Como ahora las preguntas de diag son 15, calculamos el porcentaje y lo igualamos al ICFES (0-100)
          const icfesScore = Math.round((rawScore / 15) * 100);
          
          return (
            <div key={sub.id} className="bg-white p-5 rounded-[1.5rem] border border-slate-50 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <sub.icon size={18} className={`text-${sub.color}-500`} />
                  <span className="font-bold text-slate-800 text-sm">{sub.name}</span>
                </div>
                <span className="text-xs font-black text-slate-500">{icfesScore} pts</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
                <div className={`bg-${sub.color}-500 h-full rounded-full transition-all duration-1000`} style={{ width: `${icfesScore}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
