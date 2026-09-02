import React, { useContext, useEffect, useState } from 'react';
import { ChevronLeft, Check, X, Lightbulb, ArrowRight, AlertCircle, Eye, PenTool } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { MascotMotivationModal } from '../components/MascotMotivationModal';

/**
 * @description Pantalla interactiva del examen (diagnóstico o práctica).
 * Maneja temporizador, preguntas, comprobación y la mascota animada cada 3 respuestas.
 */
export const ExamScreen = () => {
  const { 
    examMode, 
    selectedSubject, 
    currentQuestions, 
    timeLeft, 
    setTimeLeft, 
    finishExam,
    currentQIndex,
    setCurrentQIndex,
    selectedOption,
    setSelectedOption,
    hasChecked,
    setHasChecked,
    score,
    setScore,
    setFailedCategories,
    setScreen,
    selectedMethod
  } = useContext(AppContext);

  const [optionsRevealed, setOptionsRevealed] = useState(false);
  const [feynmanReflection, setFeynmanReflection] = useState('');

  // Mascota Motivacional estilo Duolingo (Cada 3 preguntas)
  const [mascotModal, setMascotModal] = useState({ isOpen: false, type: 'every_3_questions', count: 3, questionNumber: 3 });

  const questions = currentQuestions;

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      finishExam();
    }
  }, [timeLeft, finishExam, setTimeLeft]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-slate-50">
        <AlertCircle size={48} className="text-orange-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-800 mb-2">Cargando preguntas...</h2>
        <p className="text-slate-500 mb-8">No se encontraron preguntas específicas, cargando módulo de respaldo.</p>
        <button onClick={() => setScreen('subject')} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">Volver a Materias</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQIndex] || questions[0];
  if (!currentQuestion) return null;

  const handleCheck = () => {
    if (selectedOption === null) return;
    setHasChecked(true);

    const isCorrect = selectedOption === currentQuestion.correct;
    if (isCorrect) {
      setScore(score + 1);
    } else {
      if (examMode === 'diagnostic' && currentQuestion.category) {
        setFailedCategories(prev => {
          const cat = currentQuestion.category;
          const currentSubjFails = prev[selectedSubject.id] || [];
          if (!currentSubjFails.includes(cat)) {
            return { ...prev, [selectedSubject.id]: [...currentSubjFails, cat] };
          }
          return prev;
        });
      }
    }

    const qNum = currentQIndex + 1;
    // Lanzar animación motivacional de la Mascota CADA 3 PREGUNTAS
    if (qNum % 3 === 0) {
      setMascotModal({
        isOpen: true,
        type: 'every_3_questions',
        count: qNum,
        questionNumber: qNum
      });
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
      setHasChecked(false);
      setOptionsRevealed(false);
      setFeynmanReflection('');
    } else {
      finishExam();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Mascot Motivation Modal (Duolingo Style cada 3 preguntas) */}
      <MascotMotivationModal
        isOpen={mascotModal.isOpen}
        onClose={() => setMascotModal({ ...mascotModal, isOpen: false })}
        type={mascotModal.type}
        streakCount={mascotModal.count}
        questionNumber={mascotModal.questionNumber}
      />

      <header className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => setScreen('subject')} className="text-slate-400 hover:text-slate-600"><ChevronLeft size={24} /></button>
          <h1 className="text-sm font-black text-slate-800 line-clamp-1">Quiz de {selectedSubject?.name}</h1>
        </div>
        <div className="relative w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-100 shrink-0">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle cx="28" cy="28" r="24" stroke="#f1f5f9" strokeWidth="4" fill="transparent" />
            <circle
              cx="28" cy="28" r="24"
              stroke={timeLeft < 180 ? "#ef4444" : "#10b981"}
              strokeWidth="4"
              fill="transparent"
              strokeDasharray="150.7"
              strokeDashoffset={150.7 - (150.7 * (timeLeft / (examMode === 'diagnostic' ? 900 : 600)))}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="flex flex-col items-center justify-center z-10">
            <span className={`text-[11px] font-black tracking-tighter ${timeLeft < 180 ? 'text-red-500' : 'text-slate-700'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </header>

      <div className="p-6 flex-1 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-xs font-bold text-slate-400">{currentQIndex + 1} / {questions.length}</span>
          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden max-w-[200px]">
            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}></div>
          </div>
        </div>

        <h2 className="text-lg font-bold text-slate-800 mb-6 leading-relaxed">
          {currentQuestion.q}
        </h2>

        {examMode === 'practice' && selectedMethod === 'active' && !optionsRevealed ? (
          <div className="bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300 mb-8">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye size={32} />
            </div>
            <h3 className="text-lg font-black text-indigo-900 mb-2">Recuperación Activa Activada</h3>
            <p className="text-indigo-700 font-medium mb-6">Fuerza a tu cerebro a recordar la respuesta antes de ver las opciones. ¡Esto mejora tu memoria a largo plazo!</p>
            <button 
              onClick={() => setOptionsRevealed(true)}
              className="px-8 py-3 bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 active:scale-95 transition-all"
            >
              Ya la tengo en mente, revelar opciones
            </button>
          </div>
        ) : (
          <div className="space-y-3 mb-8 animate-in slide-in-from-bottom-4 duration-300">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correct;

              let borderClass = "border-slate-200";
              let bgClass = "bg-white";
              let textClass = "text-slate-700";
              let icon = <div className="w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 mr-3">{String.fromCharCode(65 + idx)}</div>;

              if (hasChecked) {
                if (isCorrect) {
                  borderClass = "border-green-500";
                  bgClass = "bg-green-50";
                  textClass = "text-green-800 font-medium";
                  icon = <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white mr-3"><Check size={14} /></div>;
                } else if (isSelected && !isCorrect) {
                  borderClass = "border-red-500";
                  bgClass = "bg-red-50";
                  textClass = "text-red-800 font-medium";
                  icon = <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white mr-3"><X size={14} /></div>;
                } else {
                  borderClass = "border-slate-100 opacity-50";
                }
              } else if (isSelected) {
                borderClass = "border-blue-500 ring-2 ring-blue-100";
                bgClass = "bg-blue-50";
                textClass = "text-blue-800 font-medium";
                icon = <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3 text-[10px] font-bold">{String.fromCharCode(65 + idx)}</div>;
              }

              return (
                <button
                  key={idx}
                  disabled={hasChecked}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center ${borderClass} ${bgClass} ${textClass}`}
                >
                  {icon}
                  <span className="flex-1 text-sm">{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {hasChecked && (
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 mb-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-2 mb-2 text-orange-800 font-bold">
              <Lightbulb size={18} /> Explicación
            </div>
            <p className="text-sm text-orange-900 leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {hasChecked && examMode === 'practice' && selectedMethod === 'feynman' && selectedOption !== currentQuestion.correct && (
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-8 animate-in slide-in-from-bottom-4">
            <div className="flex items-center gap-2 mb-3 text-purple-900 font-black text-lg">
              <PenTool size={20} className="text-purple-600" /> Reto Feynman
            </div>
            <p className="text-sm text-purple-800 font-medium mb-4">
              Fallaste en este concepto. Para asimilarlo de verdad, usa tus propias palabras para explicar por qué la respuesta correcta es la correcta, como si le enseñaras a alguien menor que tú.
            </p>
            <textarea
              value={feynmanReflection}
              onChange={(e) => setFeynmanReflection(e.target.value)}
              placeholder="Escribe tu explicación simple aquí..."
              className="w-full p-4 bg-white border border-purple-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none font-medium text-slate-700"
              rows={3}
            />
          </div>
        )}
      </div>

      <div className="bg-white border-t border-slate-200 p-4 sticky bottom-0">
        <div className="max-w-3xl mx-auto flex justify-end">
          {!hasChecked ? (
            <button
              disabled={selectedOption === null}
              onClick={handleCheck}
              className={`px-8 py-3 rounded-xl font-black transition-all ${selectedOption !== null ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600' : 'bg-slate-100 text-slate-400'}`}
            >
              Comprobar
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-xl font-black bg-blue-500 text-white shadow-md hover:bg-blue-600 flex items-center gap-2"
            >
              {currentQIndex < questions.length - 1 ? 'Siguiente' : 'Ver Resultados'} <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
