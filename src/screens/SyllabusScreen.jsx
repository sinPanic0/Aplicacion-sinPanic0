import React, { useState } from 'react';
import { 
  BookOpen, ChevronLeft, Award, RotateCcw, 
  Star, ListChecks, HelpCircle, ArrowRight, Play
} from 'lucide-react';
import { TEMARIOS_BY_SUBJECT } from '../utils/temariosData';

export const SyllabusScreen = ({ setScreen, userProfile, setUserProfile }) => {
  const [selectedSubjectKey, setSelectedSubjectKey] = useState('ingles');
  const [activeTopicQuiz, setActiveTopicQuiz] = useState(null); // { topic, questions }
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentSubjectData = TEMARIOS_BY_SUBJECT[selectedSubjectKey] || TEMARIOS_BY_SUBJECT['ingles'];

  // Iniciar la evaluación práctica de 10 preguntas (tiempo infinito)
  const startTopicQuiz = (topic) => {
    if (!topic.questions || topic.questions.length === 0) return;
    setActiveTopicQuiz(topic);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setHasChecked(false);
    setQuizScore(0);
    setIsQuizCompleted(false);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setHasChecked(true);
    if (selectedOption === activeTopicQuiz.questions[currentQIndex].correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < activeTopicQuiz.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setHasChecked(false);
    } else {
      setIsQuizCompleted(true);
      if (setUserProfile) {
        setUserProfile(prev => ({
          ...prev,
          knowledgePoints: (prev.knowledgePoints || 0) + 15
        }));
      }
    }
  };

  // RENDER EVALUACIÓN PRÁCTICA DE 10 PREGUNTAS (TIEMPO INFINITO)
  if (activeTopicQuiz) {
    const questions = activeTopicQuiz.questions;
    const currentQ = questions[currentQIndex];

    if (isQuizCompleted) {
      const percentage = Math.round((quizScore / questions.length) * 100);
      return (
        <div className="min-h-screen bg-beige p-6 flex flex-col items-center justify-center text-center animate-fade-in font-sans">
          <div className="bg-white border border-sky-blue/30 rounded-3xl p-8 max-w-md w-full shadow-xl ios-shadow">
            <div className="w-20 h-20 mx-auto bg-[#C85A28]/10 text-[#C85A28] rounded-full flex items-center justify-center mb-6">
              <Award size={44} />
            </div>

            <span className="text-xs font-black text-[#C85A28] uppercase tracking-widest block mb-1">
              Evaluación Práctica (10 Preguntas)
            </span>
            <h2 className="text-2xl font-black text-navy mb-2">
              {activeTopicQuiz.name}
            </h2>

            <div className="my-6 p-4 bg-beige rounded-2xl border border-sky-blue/20">
              <p className="text-4xl font-black text-[#C85A28] mb-1">{percentage}%</p>
              <p className="text-xs font-bold text-teal">
                Acertaste {quizScore} de 10 preguntas (+15 KP ganados)
              </p>
            </div>

            <p className="text-xs text-teal mb-6 font-medium leading-relaxed">
              {percentage >= 80 
                ? '¡Excelente dominio! Has demostrado compresión sólida sobre este tema del temario.' 
                : 'Buen intento de práctica sin presión. Puedes repetir esta prueba las veces que quieras para alcanzar el 100%.'}
            </p>

            <div className="space-y-3">
              <button
                onClick={() => startTopicQuiz(activeTopicQuiz)}
                className="w-full py-3.5 bg-[#C85A28] hover:bg-[#C84B1A] text-white font-black rounded-2xl shadow-md active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} /> Repetir Examen (10 Preguntas)
              </button>
              <button
                onClick={() => setActiveTopicQuiz(null)}
                className="w-full py-3.5 border border-sky-blue/30 text-navy font-bold rounded-2xl active:scale-95 transition-all text-sm bg-white"
              >
                Volver al Temario
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-beige flex flex-col p-6 font-sans animate-fade-in pb-24">
        {/* Header Quiz */}
        <header className="flex justify-between items-center mb-6 max-w-2xl mx-auto w-full">
          <button 
            onClick={() => setActiveTopicQuiz(null)} 
            className="p-2.5 text-navy bg-white border border-sky-blue/30 rounded-full shadow-sm"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="text-center">
            <span className="text-[10px] font-black text-[#C85A28] uppercase tracking-widest">TIEMPO INFINITO • SIN LIMITES</span>
            <h1 className="text-sm font-black text-navy line-clamp-1">{activeTopicQuiz.name}</h1>
          </div>
          <div className="px-3.5 py-1.5 bg-[#C85A28] text-white rounded-full text-xs font-black shadow-sm">
            Pregunta {currentQIndex + 1} de 10
          </div>
        </header>

        {/* Card de Pregunta */}
        <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-between">
          <div className="bg-white p-6 rounded-3xl border border-sky-blue/30 shadow-sm mb-6 ios-shadow">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-black text-[#C85A28] uppercase tracking-widest">Pregunta {currentQIndex + 1} de 10</span>
              <span className="text-[10px] font-bold text-teal">Sin límite de tiempo</span>
            </div>
            
            <h3 className="text-base md:text-lg font-bold text-navy leading-snug mb-6">
              {currentQ.q}
            </h3>

            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = 'border-sky-blue/40 bg-white text-navy hover:border-[#C85A28]';

                if (hasChecked) {
                  if (idx === currentQ.correct) {
                    btnStyle = 'border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold';
                  } else if (isSelected && idx !== currentQ.correct) {
                    btnStyle = 'border-rose-400 bg-rose-500/15 text-rose-800 dark:text-rose-300';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-[#C85A28] bg-[#C85A28]/15 text-[#C85A28] dark:text-[#F4A261] font-bold ring-2 ring-[#C85A28]/30';
                }

                return (
                  <button
                    key={idx}
                    disabled={hasChecked}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs shrink-0 ml-2 font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </button>
                );
              })}
            </div>

            {hasChecked && (
              <div className="mt-6 p-4 rounded-2xl bg-beige border border-sky-blue/20">
                <p className="text-xs font-black text-[#C85A28] uppercase tracking-widest mb-1 flex items-center gap-1">
                  <HelpCircle size={14} /> Explicación:
                </p>
                <p className="text-xs text-teal font-semibold leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="pt-2">
            {!hasChecked ? (
              <button
                disabled={selectedOption === null}
                onClick={handleCheckAnswer}
                className="w-full py-4 bg-[#C85A28] hover:bg-[#C84B1A] text-white rounded-2xl font-black shadow-lg disabled:opacity-50 active:scale-95 transition-all text-base"
              >
                Comprobar Respuesta
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="w-full py-4 bg-[#3C2415] text-white dark:bg-[#E07A5F] rounded-2xl font-black shadow-lg active:scale-95 transition-all text-base flex items-center justify-center gap-2"
              >
                {currentQIndex < questions.length - 1 ? 'Siguiente Pregunta (10 en total)' : 'Ver Resultados del Examen'} <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // MAIN SYLLABUS SCREEN (Vista General de Temarios)
  return (
    <div className="p-5 pb-28 bg-beige min-h-screen animate-fade-in font-sans">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#C85A28] text-white rounded-xl flex items-center justify-center shadow-md">
            <ListChecks size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-navy leading-none">Temarios ICFES</h2>
            <span className="text-[10px] font-bold text-teal tracking-wide">EVALUACIONES DE 10 PREGUNTAS SIN TIEMPO</span>
          </div>
        </div>
      </header>

      {/* Intro Banner Warm */}
      <div className="bg-gradient-to-r from-[#C85A28] via-[#E67E22] to-[#C84B1A] rounded-3xl p-6 text-white mb-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/20 px-3 py-1 rounded-full">
            10 Preguntas Por Tema • Tiempo Infinito
          </span>
          <h3 className="text-xl font-black mt-2 leading-snug">
            Practica cada tema del temario oficial cuantas veces quieras sin prisa
          </h3>
          <p className="mt-2 text-xs font-semibold opacity-90 leading-relaxed">
            Cada examen contiene exactamente 10 preguntas prácticas con sus explicaciones para afianzar tus conocimientos.
          </p>
        </div>
        <div className="absolute -right-6 -bottom-6 opacity-10">
          <BookOpen size={130} strokeWidth={1} />
        </div>
      </div>

      {/* Tabs Selector de Materias */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {Object.values(TEMARIOS_BY_SUBJECT).map((subj) => {
          const isSelected = selectedSubjectKey === subj.id;
          return (
            <button
              key={subj.id}
              onClick={() => setSelectedSubjectKey(subj.id)}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs whitespace-nowrap transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-[#C85A28] text-white border-[#C85A28] shadow-md scale-102'
                  : 'bg-white text-navy border-sky-blue/30 hover:border-[#C85A28]'
              }`}
            >
              <span>{subj.name}</span>
            </button>
          );
        })}
      </div>

      {/* Detalle de la Materia Seleccionada */}
      <div className="bg-white p-5 rounded-3xl border border-sky-blue/30 shadow-sm mb-6 ios-shadow">
        <div className="flex justify-between items-center mb-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white bg-[#C85A28]">
            {currentSubjectData.badge}
          </span>
          <span className="text-xs font-bold text-teal">
            {currentSubjectData.parts.reduce((acc, p) => acc + p.topics.length, 0)} Temas con 10 Preguntas c/u
          </span>
        </div>
        <h3 className="text-xl font-black text-navy mb-1">
          Temario de {currentSubjectData.name}
        </h3>
        <p className="text-xs text-teal font-semibold leading-relaxed">
          {currentSubjectData.description}
        </p>
      </div>

      {/* Lista de Partes y Temas */}
      <div className="space-y-6">
        {currentSubjectData.parts.map((part) => (
          <div key={part.id} className="space-y-3">
            <h4 className="text-sm font-black text-navy uppercase tracking-wider flex items-center gap-2 px-1">
              <span className="text-lg">{part.icon}</span> {part.title}
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {part.topics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white p-4 rounded-2xl border border-sky-blue/30 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-black text-navy text-sm">
                        {topic.name}
                      </h5>
                      {topic.keyTopic && (
                        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-md text-[9px] font-black uppercase flex items-center gap-1">
                          <Star size={10} className="fill-amber-500" /> Tema Clave
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-teal font-medium leading-relaxed line-clamp-2">
                      {topic.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => startTopicQuiz(topic)}
                    className="px-4 py-2.5 bg-[#C85A28] hover:bg-[#C84B1A] text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all shrink-0"
                  >
                    <Play size={14} className="fill-white" /> Evaluación Práctica (10 Qs)
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
