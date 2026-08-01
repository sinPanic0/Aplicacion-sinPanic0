import React, { useContext } from 'react';
import { Lightbulb, Brain, Timer, User } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { STUDY_METHODS } from '../utils/constants';
import { EXAM_QUESTIONS } from '../utils/questions';

/**
 * @description Pantalla de resultados del examen.
 * Muestra el porcentaje y sugiere un método de estudio con interacciones específicas.
 */
export const ExamResultsScreen = () => {
  const { 
    examMode, 
    selectedSubject, 
    practiceQuestions, 
    score, 
    selectedMethod, 
    failedCategories, 
    feynmanText, 
    setFeynmanText, 
    setScreen,
    currentQuestions
  } = useContext(AppContext);

  const questions = currentQuestions;
  const percentage = Math.round((score / questions.length) * 100);

  let recommendation = "";
  if (percentage >= 80) {
    recommendation = "¡Excelente trabajo! Tienes un dominio muy sólido. Te recomendamos la Repetición Espaciada para no olvidar estos temas.";
  } else if (percentage >= 50) {
    recommendation = "Buen intento, pero hay margen de mejora. Te sugerimos la Recuperación Activa para reforzar tus puntos débiles.";
  } else {
    recommendation = "Esta área requiere más atención. Te recomendamos el Método Feynman: explica los conceptos difíciles con palabras simples.";
  }

  const currentMethodInfo = STUDY_METHODS.find(m => m.id === selectedMethod);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 text-center pb-24 relative overflow-y-auto">
      <div className="w-32 h-32 rounded-full border-8 border-emerald-100 flex items-center justify-center mb-6 mt-8 relative bg-white shadow-sm">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle cx="60" cy="60" r="56" stroke="#10b981" strokeWidth="8" fill="transparent" strokeDasharray="351.8" strokeDashoffset={351.8 - (351.8 * percentage) / 100} strokeLinecap="round" />
        </svg>
        <span className="text-4xl font-black text-slate-800">{percentage}%</span>
      </div>

      <h2 className="text-3xl font-black text-slate-900 mb-2">¡Examen Finalizado!</h2>
      <p className="text-slate-500 mb-8 font-medium">Acertaste {score} de {questions.length} preguntas de {selectedSubject?.name}.</p>

      {examMode === 'diagnostic' && (
        <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 max-w-md w-full mb-6 text-left relative shadow-sm">
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg"><Lightbulb size={24} /></div>
          <h3 className="font-black text-blue-900 mb-2">Método Recomendado para ti</h3>
          <p className="text-sm text-blue-800 leading-relaxed mb-4">{recommendation}</p>
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-blue-100 font-bold text-blue-700">
            {currentMethodInfo && <currentMethodInfo.icon size={20} />} Hemos configurado tu plan a {currentMethodInfo?.title}.
          </div>
        </div>
      )}

      {examMode === 'diagnostic' && (failedCategories[selectedSubject?.id] || []).length > 0 && (
        <div className="max-w-md w-full mb-8">
          <div className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm text-left">
            <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-2">Temas a reforzar:</span>
            <div className="flex flex-wrap gap-2 mb-4">
              {(failedCategories[selectedSubject?.id] || []).map(cat => (
                <span key={cat} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-lg text-xs font-bold capitalize border border-orange-100">{cat}</span>
              ))}
            </div>

            {/* Contenido Dinámico del Método */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              {selectedMethod === 'active' && (
                <>
                  <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><Brain size={18} className="text-emerald-500" /> Recuperación Activa</h4>
                  <p className="text-sm text-slate-500 mb-4">Hemos generado preguntas desafiantes sobre los temas donde fallaste. Responde sin mirar tus apuntes.</p>
                  <button className="w-full py-3 bg-emerald-50 text-emerald-600 font-bold rounded-xl active:scale-95 transition-all">Generar Cuestionario</button>
                </>
              )}
              {selectedMethod === 'spaced' && (
                <>
                  <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><Timer size={18} className="text-blue-500" /> Repetición Espaciada</h4>
                  <p className="text-sm text-slate-500 mb-4">Hemos organizado un calendario de repasos para los próximos 15 días (1, 3, 7 y 14 días) priorizando tu puntaje más bajo.</p>
                  <button onClick={() => setScreen('calendar')} className="w-full py-3 bg-blue-50 text-blue-600 font-bold rounded-xl active:scale-95 transition-all">Ver mi Calendario</button>
                </>
              )}
              {selectedMethod === 'feynman' && (
                <>
                  <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><User size={18} className="text-indigo-500" /> Método Feynman</h4>
                  <p className="text-sm text-slate-500 mb-3">Explica el concepto más difícil en el que fallaste como si fueras un niño de 10 años.</p>
                  <textarea 
                    value={feynmanText}
                    onChange={(e) => setFeynmanText(e.target.value)}
                    placeholder="Escribe tu explicación aquí..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                  />
                  <button className="w-full py-3 bg-indigo-50 text-indigo-600 font-bold rounded-xl active:scale-95 transition-all">Analizar mi explicación</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setScreen('subject')} className="w-full max-w-md py-4 bg-emerald-500 text-white rounded-2xl font-black shadow-lg shadow-emerald-200 active:scale-95 transition-all fixed bottom-6 left-1/2 -translate-x-1/2 z-10">
        Continuar Estudiando
      </button>
    </div>
  );
};
