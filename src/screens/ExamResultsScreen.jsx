import React, { useContext } from 'react';
import { Lightbulb, Brain, Timer, User, Sparkles } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { STUDY_METHODS } from '../utils/constants';
import { CapybaraMascot } from '../components/CapybaraMascot';

/**
 * @description Pantalla de resultados del examen con presencia motivacional de la mascota Capybara.
 * Muestra el porcentaje, retroalimentación al estilo Duolingo y sugiere un método de estudio.
 */
export const ExamResultsScreen = () => {
  const { 
    examMode, 
    selectedSubject, 
    score, 
    selectedMethod, 
    failedCategories, 
    feynmanText, 
    setFeynmanText, 
    setScreen,
    currentQuestions,
    equippedItems,
    capybaraName
  } = useContext(AppContext);

  const questions = currentQuestions || [];
  const totalQ = questions.length || 10;
  const percentage = Math.round((score / totalQ) * 100);

  let recommendation = "";
  let mascotFeedback = "";

  if (percentage >= 80) {
    recommendation = "¡Excelente trabajo! Tienes un dominio muy sólido. Te recomendamos la Repetición Espaciada para no olvidar estos temas.";
    mascotFeedback = `¡IMPRESIONANTE RENDIMIENTO DEL ${percentage}%! 🎉 Has superado esta prueba como todo un maestro del ICFES. ¡Sigue con esta disciplina!`;
  } else if (percentage >= 50) {
    recommendation = "Buen intento, pero hay margen de mejora. Te sugerimos la Recuperación Activa para reforzar tus puntos débiles.";
    mascotFeedback = `¡BUEN TRABAJO DEL ${percentage}%! 🍊 Tienes bases sólidas, pero puedes dar más. Revisa la explicación del tema y repite el examen para alcanzar el 100%.`;
  } else {
    recommendation = "Esta área requiere más atención. Te recomendamos el Método Feynman: explica los conceptos difíciles con palabras simples.";
    mascotFeedback = `¡NUNCA TE RINDAS! (${percentage}%) 💪 No te desanimes. Los mejores puntajes se construyen aprendiendo de cada tropiezo. ¡Lee la explicación sencilla y vuelve a intentarlo!`;
  }

  const currentMethodInfo = STUDY_METHODS.find(m => m.id === selectedMethod);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 text-center pb-28 relative overflow-y-auto font-sans">
      
      {/* Círculo de Porcentaje */}
      <div className="w-32 h-32 rounded-full border-8 border-emerald-100 flex items-center justify-center mb-4 mt-6 relative bg-white shadow-md">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle cx="60" cy="60" r="56" stroke="#10b981" strokeWidth="8" fill="transparent" strokeDasharray="351.8" strokeDashoffset={351.8 - (351.8 * percentage) / 100} strokeLinecap="round" />
        </svg>
        <span className="text-4xl font-black text-slate-800">{percentage}%</span>
      </div>

      <h2 className="text-3xl font-black text-slate-900 mb-1">¡Examen Finalizado!</h2>
      <p className="text-slate-500 mb-6 font-medium text-sm">
        Acertaste {score} de {totalQ} preguntas en {selectedSubject?.name || 'la materia'}.
      </p>

      {/* Card Motivacional de la Mascota estilo Duolingo */}
      <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-orange-200 p-6 rounded-[2rem] max-w-md w-full mb-6 text-center shadow-md relative overflow-hidden">
        <div className="flex justify-center mb-3 transform hover:scale-105 transition-transform">
          <CapybaraMascot 
            size="lg" 
            interactive={false} 
            customName={capybaraName || 'Capybara Motivador'} 
            equippedItems={equippedItems}
          />
        </div>

        <h3 className="font-black text-slate-900 text-lg mb-2 flex items-center justify-center gap-1.5">
          <Sparkles className="text-[#C85A28]" size={18} /> Mensaje de {capybaraName || 'tu Mascota'}
        </h3>
        
        <p className="text-xs md:text-sm font-bold text-orange-950 leading-relaxed bg-white/80 p-3.5 rounded-2xl border border-orange-200/60 shadow-sm">
          {mascotFeedback}
        </p>
      </div>

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
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    rows={3}
                  />
                  <button className="w-full py-3 bg-indigo-50 text-indigo-600 font-bold rounded-xl active:scale-95 transition-all">Analizar mi explicación</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setScreen('subject')} className="w-full max-w-md py-4 bg-[#C85A28] hover:bg-[#C84B1A] text-white rounded-2xl font-black shadow-lg shadow-orange-200 active:scale-95 transition-all fixed bottom-6 left-1/2 -translate-x-1/2 z-10">
        Continuar Estudiando
      </button>
    </div>
  );
};
