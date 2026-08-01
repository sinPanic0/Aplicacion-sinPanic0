import React, { useContext } from 'react';
import { ChevronLeft, Clock, Lock } from 'lucide-react';
import { AppContext } from '../context/AppContext';

/**
 * @description Pantalla de detalle de una materia. 
 * Muestra el progreso actual, los exámenes principales (Diagnóstico y Prácticas 1 y 2) 
 * y los 3 Exámenes Extra de Refuerzo de Errores (desbloqueables tras Prácticas 1 y 2).
 */
export const SubjectScreen = () => {
  const { 
    selectedSubject, 
    setScreen, 
    diagnosticCompleted, 
    startExam, 
    getTodayString, 
    practiceProgress
  } = useContext(AppContext);

  const todayStr = getTodayString();
  const todayProgress = practiceProgress[todayStr]?.[selectedSubject?.id] || { 
    practice_1: false, practice_2: false, practice_3: false, practice_4: false, practice_5: false 
  };
  const isUnlocked = todayProgress.practice_1 && todayProgress.practice_2;

  const extraExams = [
    { id: 'practice_3', num: 1, title: 'Refuerzo de Errores #1 - Puntos Débiles', desc: '10 preguntas enfocadas exclusivamente en los errores cometidos en tus prácticas previas.' },
    { id: 'practice_4', num: 2, title: 'Refuerzo de Errores #2 - Corrección de Fallos', desc: 'Segundo set de 10 preguntas para corregir vacíos conceptuales y afirmaciones dudosas.' },
    { id: 'practice_5', num: 3, title: 'Refuerzo de Errores #3 - Maestría Final', desc: 'Evaluación de control final para garantizar el 100% de dominio en esta materia.' }
  ];

  return (
    <div className="p-6 pb-24 bg-[#fcfdfc] min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <button onClick={() => setScreen('home')} className="p-2 text-emerald-600 bg-emerald-50 rounded-full"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-black text-slate-800">{selectedSubject?.name}</h2>
        <div className="w-10"></div>
      </header>
      
      <div className={`bg-${selectedSubject?.color || 'emerald'}-50 p-6 rounded-[2rem] border border-${selectedSubject?.color || 'emerald'}-100 flex items-center gap-4 mb-8`}>
        <div className={`w-16 h-16 bg-white text-${selectedSubject?.color || 'emerald'}-500 rounded-2xl flex items-center justify-center shadow-sm`}>
          {selectedSubject?.icon && <selectedSubject.icon size={32} />}
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Tu progreso</p>
          <h3 className="text-2xl font-black text-slate-800">{selectedSubject?.completed} / {selectedSubject?.total}</h3>
          <p className="text-xs font-medium text-slate-500 mt-1">Lecciones completadas</p>
        </div>
      </div>
      
      <h3 className="font-black text-slate-800 text-xl mb-4">Exámenes Principales</h3>
      <div className="space-y-4 mb-8">
        {!diagnosticCompleted[selectedSubject?.id] && (
          <div className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Diagnóstico</span>
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1"><Clock size={12} /> 15 min</span>
            </div>
            <h4 className="text-lg font-black text-slate-800 mb-1">Examen Diagnóstico</h4>
            <p className="text-sm text-slate-500 mb-4">Prueba completa tipo ICFES para identificar tus fortalezas y debilidades.</p>
            <button onClick={() => startExam(selectedSubject, 'diagnostic')} className="w-full py-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl font-bold active:scale-95 transition-all hover:bg-emerald-100">
              Comenzar Diagnóstico
            </button>
          </div>
        )}

        {diagnosticCompleted[selectedSubject?.id] && (
          <>
            {!todayProgress.practice_1 && (
              <div className="bg-white p-5 rounded-[1.5rem] border border-blue-100 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Práctica 1</span>
                  <span className="text-xs text-blue-600 font-bold flex items-center gap-1"><Clock size={12} /> 10 min</span>
                </div>
                <h4 className="text-lg font-black text-slate-800 mb-1">Examen de Práctica 1</h4>
                <p className="text-sm text-slate-500 mb-4">10 preguntas enfocadas en tus áreas débiles detectadas.</p>
                <button onClick={() => startExam(selectedSubject, 'practice', 'practice_1')} className="w-full py-3 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl font-bold active:scale-95 transition-all hover:bg-blue-100">
                  Iniciar Práctica 1
                </button>
              </div>
            )}

            {!todayProgress.practice_2 && (
              <div className="bg-white p-5 rounded-[1.5rem] border border-indigo-100 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Práctica 2</span>
                  <span className="text-xs text-indigo-600 font-bold flex items-center gap-1"><Clock size={12} /> 10 min</span>
                </div>
                <h4 className="text-lg font-black text-slate-800 mb-1">Examen de Práctica 2</h4>
                <p className="text-sm text-slate-500 mb-4">Refuerza tus conocimientos con un segundo set de preguntas.</p>
                <button onClick={() => startExam(selectedSubject, 'practice', 'practice_2')} className="w-full py-3 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl font-bold active:scale-95 transition-all hover:bg-indigo-100">
                  Iniciar Práctica 2
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* SECCIÓN EXTRAS DE REFUERZO DE ERRORES */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-black text-slate-800 text-xl flex items-center gap-2">
          🎯 Refuerzo de Errores Extra
        </h3>
        <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">3 Exámenes Exclusivos</span>
      </div>

      <div className="space-y-4">
        {extraExams.map((exam) => {
          const isCompleted = todayProgress[exam.id];
          return (
            <div key={exam.id} className={`bg-white p-5 rounded-[1.5rem] border ${isUnlocked ? 'border-purple-200 shadow-sm' : 'border-slate-100 opacity-60'} transition-all`}>
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-black uppercase tracking-widest ${isUnlocked ? 'text-purple-600' : 'text-slate-400'}`}>Refuerzo de Errores</span>
                <span className="text-xs text-slate-400 font-bold flex items-center gap-1"><Clock size={12} /> 10 min</span>
              </div>
              <h4 className="text-base font-black text-slate-800 mb-1 flex items-center gap-2">
                {exam.title} {!isUnlocked && <Lock size={16} className="text-slate-400" />}
              </h4>
              <p className="text-sm text-slate-500 mb-4">{exam.desc}</p>
              {isCompleted ? (
                <div className="w-full py-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl font-bold text-center text-sm">
                  ✓ Completado
                </div>
              ) : (
                <button
                  disabled={!isUnlocked}
                  onClick={() => startExam(selectedSubject, 'practice', exam.id)}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${isUnlocked ? 'bg-purple-600 text-white shadow-md active:scale-95 hover:bg-purple-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'}`}
                >
                  {isUnlocked ? `Iniciar Refuerzo #${exam.num}` : '🔒 Bloqueado (Completa Prácticas 1 y 2)'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
