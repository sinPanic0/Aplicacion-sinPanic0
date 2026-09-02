import React from 'react';
import { BookOpen, X, Sparkles, CheckCircle2, HelpCircle, Lightbulb, Play } from 'lucide-react';

/**
 * @description Modal de Explicación del Tema (Mini Documento de Estudio Sencillo).
 * Presenta conceptos clave, resúmenes accesibles, ejemplos tipo ICFES y tips de examen.
 */
export const TopicExplanationModal = ({
  isOpen,
  onClose,
  topic,
  onStartQuiz
}) => {
  if (!isOpen || !topic) return null;

  const doc = topic.explanationDoc || {
    title: topic.name,
    summary: topic.desc || 'Explicación resumida de los temas esenciales para la presentación del examen ICFES.',
    keyConcepts: [
      'Identifica las palabras clave del enunciado.',
      'Analiza las opciones de respuesta descartando los distractores implausibles.',
      'Aplica el razonamiento lógico antes de marcar la respuesta.'
    ],
    example: {
      question: 'Ejemplo de pregunta de práctica en ' + topic.name,
      options: ['Opción A', 'Opción B (Correcta)', 'Opción C', 'Opción D'],
      correct: 'Opción B (Correcta)',
      reason: 'Explicación detallada para afianzar el aprendizaje.'
    },
    icfesTip: 'Lee con atención y no te apresures. Elimina primero las respuestas evidentemente falsas.'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#1E140C] max-w-2xl w-full rounded-3xl shadow-2xl border border-sky-blue/30 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Modal */}
        <div className="p-6 bg-gradient-to-r from-[#C85A28] to-[#E67E22] text-white flex justify-between items-start shrink-0 relative">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-black uppercase tracking-wider mb-2">
              <BookOpen size={12} />
              <span>Mini Documento de Estudio Sencillo</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black leading-tight">
              {doc.title || topic.name}
            </h2>
            <p className="text-xs font-semibold opacity-90 mt-1">
              Guía clara para la presentación del Examen ICFES
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cuerpos de Explicación (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 text-sm">
          
          {/* 1. Resumen Sencillo */}
          <div className="bg-orange-50/70 dark:bg-orange-950/30 p-4 rounded-2xl border border-orange-200/60">
            <h3 className="text-xs font-black text-[#C85A28] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles size={16} /> Resumen del Tema en Palabras Simples:
            </h3>
            <p className="text-xs md:text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300">
              {doc.summary}
            </p>
          </div>

          {/* 2. Conceptos Clave */}
          {doc.keyConcepts && doc.keyConcepts.length > 0 && (
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                Conceptos Clave que debes saber:
              </h3>
              <div className="space-y-2.5">
                {doc.keyConcepts.map((concept, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-[#2A1D13] rounded-xl border border-slate-200/60 dark:border-slate-800">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm font-semibold leading-normal">{concept}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Ejemplo Práctico Estilo ICFES */}
          {doc.example && (
            <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm border border-slate-800">
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block mb-1 flex items-center gap-1">
                <HelpCircle size={14} /> Caso de Ejemplo Tipo ICFES:
              </span>
              <h4 className="font-bold text-sm mb-3 text-slate-100 leading-snug">
                {doc.example.question}
              </h4>
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl mb-3">
                <span className="text-xs font-black text-emerald-300 block mb-0.5">Respuesta Correcta:</span>
                <span className="text-xs font-bold text-emerald-100">{doc.example.correct}</span>
              </div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed italic">
                💡 {doc.example.reason}
              </p>
            </div>
          )}

          {/* 4. Tip de Oro ICFES */}
          {doc.icfesTip && (
            <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-300/60 flex items-start gap-3">
              <div className="p-2 bg-amber-500 text-white rounded-xl shrink-0">
                <Lightbulb size={20} />
              </div>
              <div>
                <h4 className="text-xs font-black text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-1">
                  Tip de Oro para el Examen ICFES:
                </h4>
                <p className="text-xs text-amber-800 dark:text-amber-200 font-medium leading-relaxed">
                  {doc.icfesTip}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-[#180F08] border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={onClose}
            className="py-3 px-5 border border-slate-300 text-slate-700 dark:text-slate-300 rounded-2xl font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-center"
          >
            Cerrar Explicación
          </button>
          
          <button
            onClick={() => {
              onClose();
              if (onStartQuiz) onStartQuiz(topic, 1);
            }}
            className="flex-1 py-3.5 px-6 bg-[#C85A28] hover:bg-[#C84B1A] text-white rounded-2xl font-black text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Play size={16} className="fill-white" />
            <span>Poner a Prueba (Realizar Examen Práctico)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
