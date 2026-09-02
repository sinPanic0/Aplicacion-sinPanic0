import React, { useState, useContext } from 'react';
import { 
  BookOpen, ChevronLeft, Award, RotateCcw, 
  Star, ListChecks, HelpCircle, ArrowRight, Play, FileText
} from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { TEMARIOS_BY_SUBJECT } from '../utils/temariosData';
import { MascotMotivationModal } from '../components/MascotMotivationModal';
import { TopicExplanationModal } from '../components/TopicExplanationModal';

export const SyllabusScreen = ({ setScreen }) => {
  const { 
    userProfile, 
    setUserProfile, 
    equippedItems, 
    capybaraName 
  } = useContext(AppContext);

  const [selectedSubjectKey, setSelectedSubjectKey] = useState('lectura_critica');
  const [activeTopicQuiz, setActiveTopicQuiz] = useState(null); // { topic, questions, testName }
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Mascota Motivacional estilo Duolingo
  const [mascotModal, setMascotModal] = useState({ 
    isOpen: false, 
    type: 'every_3_questions', 
    count: 3, 
    questionNumber: 3,
    percentage: 0 
  });

  // Modal Explicación del Tema
  const [explanationTopic, setExplanationTopic] = useState(null);

  const currentSubjectData = TEMARIOS_BY_SUBJECT[selectedSubjectKey] || TEMARIOS_BY_SUBJECT['lectura_critica'];

  // Iniciar evaluación práctica (Prueba 1, 2 o 3) de 10 preguntas (tiempo infinito)
  const startTopicQuiz = (topic, testNumber = 1) => {
    let testObj = topic.tests ? topic.tests.find(t => t.id === testNumber) : null;
    let questionsToUse = testObj ? testObj.questions : (topic.questions || []);

    if (!questionsToUse || questionsToUse.length === 0) return;

    setActiveTopicQuiz({
      topic,
      questions: questionsToUse,
      testName: testObj ? testObj.name : `Prueba #${testNumber}`,
      testNumber
    });
    setCurrentQIndex(0);
    setSelectedOption(null);
    setHasChecked(false);
    setQuizScore(0);
    setIsQuizCompleted(false);
    setMascotModal({ isOpen: false, type: 'every_3_questions', count: 3, questionNumber: 3, percentage: 0 });
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setHasChecked(true);
    const isCorrect = selectedOption === activeTopicQuiz.questions[currentQIndex].correct;

    let updatedScore = quizScore;
    if (isCorrect) {
      updatedScore = quizScore + 1;
      setQuizScore(updatedScore);
    }

    const qNum = currentQIndex + 1;
    // Lanzar animación motivacional de la Mascota CADA 3 PREGUNTAS
    if (qNum % 3 === 0) {
      setMascotModal({
        isOpen: true,
        type: 'every_3_questions',
        count: qNum,
        questionNumber: qNum,
        percentage: 0
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < activeTopicQuiz.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setHasChecked(false);
    } else {
      setIsQuizCompleted(true);
      const finalPct = Math.round((quizScore / activeTopicQuiz.questions.length) * 100);
      
      if (setUserProfile) {
        setUserProfile(prev => ({
          ...prev,
          knowledgePoints: (prev?.knowledgePoints || 0) + 15
        }));
      }

      // Lanzar modal de resultados estilo Duolingo al terminar
      setMascotModal({
        isOpen: true,
        type: 'exam_results',
        count: 10,
        questionNumber: 10,
        percentage: finalPct
      });
    }
  };

  // RENDER EVALUACIÓN PRÁCTICA DE 10 PREGUNTAS (TIEMPO INFINITO)
  if (activeTopicQuiz) {
    const questions = activeTopicQuiz.questions;
    const currentQ = questions[currentQIndex];

    if (isQuizCompleted) {
      const percentage = Math.round((quizScore / questions.length) * 100);
      return (
        <div className="min-h-screen bg-beige p-6 flex flex-col items-center justify-center text-center animate-fade-in font-sans relative">
          
          {/* Mascot Result Modal */}
          <MascotMotivationModal
            isOpen={mascotModal.isOpen}
            onClose={() => setMascotModal({ ...mascotModal, isOpen: false })}
            type={mascotModal.type}
            streakCount={mascotModal.count}
            questionNumber={mascotModal.questionNumber}
            percentage={mascotModal.percentage || percentage}
            equippedItems={equippedItems}
            customName={capybaraName}
          />

          <div className="bg-white border border-sky-blue/30 rounded-3xl p-8 max-w-md w-full shadow-xl ios-shadow">
            <div className="w-20 h-20 mx-auto bg-[#C85A28]/10 text-[#C85A28] rounded-full flex items-center justify-center mb-6">
              <Award size={44} />
            </div>

            <span className="text-xs font-black text-[#C85A28] uppercase tracking-widest block mb-1">
              {activeTopicQuiz.testName} (10 Preguntas)
            </span>
            <h2 className="text-2xl font-black text-navy mb-2">
              {activeTopicQuiz.topic.name}
            </h2>

            <div className="my-6 p-4 bg-beige rounded-2xl border border-sky-blue/20">
              <p className="text-4xl font-black text-[#C85A28] mb-1">{percentage}%</p>
              <p className="text-xs font-bold text-teal">
                Acertaste {quizScore} de 10 preguntas (+15 KP ganados)
              </p>
            </div>

            <p className="text-xs text-teal mb-6 font-medium leading-relaxed">
              {percentage >= 80 
                ? '¡Excelente dominio! Has demostrado comprensión sólida sobre este tema del temario.' 
                : 'Buen intento de práctica sin presión. Puedes repetir esta prueba las veces que quieras para alcanzar el 100%.'}
            </p>

            <div className="space-y-3">
              <button
                onClick={() => startTopicQuiz(activeTopicQuiz.topic, activeTopicQuiz.testNumber)}
                className="w-full py-3.5 bg-[#C85A28] hover:bg-[#C84B1A] text-white font-black rounded-2xl shadow-md active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} /> Repetir Examen (10 Qs)
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
      <div className="min-h-screen bg-beige flex flex-col p-6 font-sans animate-fade-in pb-24 relative">
        
        {/* Mascot Motivation Modal (Duolingo Style cada 3 preguntas) */}
        <MascotMotivationModal
          isOpen={mascotModal.isOpen}
          onClose={() => setMascotModal({ ...mascotModal, isOpen: false })}
          type={mascotModal.type}
          streakCount={mascotModal.count}
          questionNumber={mascotModal.questionNumber}
          percentage={mascotModal.percentage}
          equippedItems={equippedItems}
          customName={capybaraName}
        />

        {/* Header Quiz */}
        <header className="flex justify-between items-center mb-6 max-w-2xl mx-auto w-full">
          <button 
            onClick={() => setActiveTopicQuiz(null)} 
            className="p-2.5 text-navy bg-white border border-sky-blue/30 rounded-full shadow-sm"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="text-center">
            <span className="text-[10px] font-black text-[#C85A28] uppercase tracking-widest">
              {activeTopicQuiz.testName} • TIEMPO INFINITO
            </span>
            <h1 className="text-sm font-black text-navy line-clamp-1">{activeTopicQuiz.topic.name}</h1>
          </div>
          <div className="px-3.5 py-1.5 bg-[#C85A28] text-white rounded-full text-xs font-black shadow-sm">
            {currentQIndex + 1} / 10
          </div>
        </header>

        {/* Card de Pregunta */}
        <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-between">
          <div className="bg-white p-6 rounded-3xl border border-sky-blue/30 shadow-sm mb-6 ios-shadow">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-black text-[#C85A28] uppercase tracking-widest">
                Pregunta {currentQIndex + 1} de 10
              </span>
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
      
      {/* Modal Explicación del Tema (Mini Documento) */}
      <TopicExplanationModal
        isOpen={!!explanationTopic}
        onClose={() => setExplanationTopic(null)}
        topic={explanationTopic}
        onStartQuiz={(t, testNo) => startTopicQuiz(t, testNo)}
      />

      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#C85A28] text-white rounded-xl flex items-center justify-center shadow-md">
            <ListChecks size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-navy leading-none">Temarios ICFES</h2>
            <span className="text-[10px] font-bold text-teal tracking-wide">EXPLICACIONES Y 3 EXÁMENES POR TEMA</span>
          </div>
        </div>
      </header>

      {/* Intro Banner Warm */}
      <div className="bg-gradient-to-r from-[#C85A28] via-[#E67E22] to-[#C84B1A] rounded-3xl p-6 text-white mb-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/20 px-3 py-1 rounded-full">
            Explicaciones Sencillas • 3 Pruebas Por Tema
          </span>
          <h3 className="text-xl font-black mt-2 leading-snug">
            Lee la explicación de cada tema y evalúate con sus 3 exámenes prácticos
          </h3>
          <p className="mt-2 text-xs font-semibold opacity-90 leading-relaxed">
            Aprende con mini documentos sencillos y pon a prueba tus conocimientos. ¡Cada 3 respuestas la mascota saldrá a darte ánimos!
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
            {currentSubjectData.parts.reduce((acc, p) => acc + (p.topics.length * 3), 0)} Exámenes en Total (3 por Tema)
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

            <div className="grid grid-cols-1 gap-4">
              {part.topics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white p-5 rounded-3xl border border-sky-blue/30 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                >
                  {/* Encabezado del Tema */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-black text-navy text-base">
                        {topic.name}
                      </h5>
                      {topic.keyTopic && (
                        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-md text-[9px] font-black uppercase flex items-center gap-1 shrink-0">
                          <Star size={10} className="fill-amber-500" /> Tema Clave
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-teal font-medium leading-relaxed">
                      {topic.desc}
                    </p>
                  </div>

                  {/* Acciones: Explicación + 3 Pruebas Prácticas */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2 border-t border-slate-100">
                    {/* Botón Ver Explicación Sencilla */}
                    <button
                      onClick={() => setExplanationTopic(topic)}
                      className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shrink-0"
                    >
                      <FileText size={15} className="text-amber-700" />
                      <span>📖 Explicación del Tema</span>
                    </button>

                    {/* Selector / Botones de las 3 Pruebas */}
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      <button
                        onClick={() => startTopicQuiz(topic, 1)}
                        className="py-2.5 px-2 bg-[#C85A28] hover:bg-[#C84B1A] text-white font-black rounded-xl text-[11px] flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all text-center"
                      >
                        <Play size={11} className="fill-white shrink-0" />
                        <span>Prueba 1</span>
                      </button>

                      <button
                        onClick={() => startTopicQuiz(topic, 2)}
                        className="py-2.5 px-2 bg-[#C85A28]/90 hover:bg-[#C84B1A] text-white font-black rounded-xl text-[11px] flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all text-center"
                      >
                        <Play size={11} className="fill-white shrink-0" />
                        <span>Prueba 2</span>
                      </button>

                      <button
                        onClick={() => startTopicQuiz(topic, 3)}
                        className="py-2.5 px-2 bg-[#C85A28]/80 hover:bg-[#C84B1A] text-white font-black rounded-xl text-[11px] flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all text-center"
                      >
                        <Play size={11} className="fill-white shrink-0" />
                        <span>Prueba 3</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
