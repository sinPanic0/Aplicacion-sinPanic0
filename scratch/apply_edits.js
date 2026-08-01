const fs = require('fs');
const path = require('path');

const appJsxPath = 'c:\\Users\\sicsa\\OneDrive\\Documentos\\Sin Panic0\\src\\App.jsx';
let content = fs.readFileSync(appJsxPath, 'utf8');

// 1. Locate the inline components to delete
const startMarker = '  const ProgressScreen = () => {';
const endMarker = '  const ProfileScreen = () => {';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1) {
  console.error("Could not find start marker for ProgressScreen");
  process.exit(1);
}
if (endIndex === -1) {
  console.error("Could not find end marker for ProfileScreen");
  process.exit(1);
}

console.log(`Deleting inline screens between indices ${startIndex} and ${endIndex}`);

// Delete the inline components
const before = content.substring(0, startIndex);
const after = content.substring(endIndex);

// Reconstruct the content without the inline components
content = before + after;

// 2. Define the new standalone components to append
const standaloneComponents = `
// ==========================================
// STANDALONE SCREEN COMPONENTS (OUTSIDE APP)
// ==========================================

const ExamScreen = ({
  selectedSubject,
  examMode,
  examId,
  activeQuestions,
  isFetchingExam,
  score,
  setScore,
  userId,
  failedCategories,
  setFailedCategories,
  diagnosticCompleted,
  setDiagnosticCompleted,
  practiceProgress,
  setPracticeProgress,
  selectedMethod,
  setSelectedMethod,
  setScreen,
  userProfile,
  setUserProfile,
  setGlobalError,
  currentQIndex,
  setCurrentQIndex,
  hasChecked,
  setHasChecked,
  selectedOption,
  setSelectedOption,
  dailyPointsMap,
  setDailyPointsMap,
  STUDY_METHODS
}) => {
  const [timeLeft, setTimeLeft] = useState(examMode === 'diagnostic' ? 15 * 60 : 10 * 60);
  const [optionsRevealed, setOptionsRevealed] = useState(false);
  const [feynmanReflection, setFeynmanReflection] = useState('');
  const [isFailed, setIsFailed] = useState(false);

  const questions = activeQuestions;

  useEffect(() => {
    if (isFailed) return;
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsFailed(true);
    }
  }, [timeLeft, isFailed]);

  const handleRestart = () => {
    setTimeLeft(examMode === 'diagnostic' ? 15 * 60 : 10 * 60);
    setScore(0);
    setCurrentQIndex(0);
    setHasChecked(false);
    setSelectedOption(null);
    setFeynmanReflection('');
    setOptionsRevealed(false);
    setIsFailed(false);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return \`\${m}:\${s < 10 ? '0' : ''}\${s}\`;
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setHasChecked(true);
    if (selectedOption === questions[currentQIndex].correct) {
      setScore(score + 1);
    } else {
      if (examMode === 'diagnostic' && questions[currentQIndex].category) {
        const cat = questions[currentQIndex].category;
        setFailedCategories(prev => {
          const currentSubjFails = prev[selectedSubject.id] || [];
          if (!currentSubjFails.includes(cat)) {
            return { ...prev, [selectedSubject.id]: [...currentSubjFails, cat] };
          }
          return prev;
        });
      }
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

  const finishExam = async () => {
    if (examMode === 'diagnostic') {
      const payload = { completedToday: true, score: score, completed: true };
      setDiagnosticCompleted(prev => ({ ...prev, [selectedSubject.id]: payload }));

      const todayStr = getTodayString();
      setPracticeProgress(prev => {
        const newState = { ...prev };
        if (!newState[todayStr]) newState[todayStr] = {};
        if (!newState[todayStr][selectedSubject.id]) {
          newState[todayStr][selectedSubject.id] = { practice_1: false, practice_2: false, diagnostic: false };
        }
        newState[todayStr][selectedSubject.id].diagnostic = true;
        return newState;
      });

      if (userId) {
        try {
          const { error: dbError } = await supabase.from('user_diagnostics').upsert({
            user_id: userId,
            subject_id: selectedSubject.id,
            completed: true,
            score: score,
            failed_categories: failedCategories[selectedSubject.id] || [],
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id,subject_id' });

          if (dbError) throw dbError;
        } catch (e) {
          console.error(e);
          setGlobalError('No se pudo guardar el progreso del diagnóstico. Por favor, verifica tu conexión a internet.');
        }
      }

      const percentage = Math.round((score / Math.max(questions.length, 1)) * 100);
      if (percentage >= 80) setSelectedMethod('spaced');
      else if (percentage >= 50) setSelectedMethod('active');
      else setSelectedMethod('feynman');

      setScreen('exam_results');
    } else {
      const todayStr = getTodayString();
      let isFirstPractice = true;
      let isSecondPractice = false;

      const currentDayProgress = practiceProgress[todayStr]?.[selectedSubject.id];
      if (currentDayProgress?.practice_1) {
        isFirstPractice = false;
        isSecondPractice = true;
      }

      setPracticeProgress(prev => {
        const newState = { ...prev };
        if (!newState[todayStr]) newState[todayStr] = {};
        if (!newState[todayStr][selectedSubject.id]) {
          newState[todayStr][selectedSubject.id] = { practice_1: false, practice_2: false, diagnostic: false };
        }
        if (isSecondPractice) {
          newState[todayStr][selectedSubject.id].practice_2 = true;
        } else {
          newState[todayStr][selectedSubject.id].practice_1 = true;
        }
        return newState;
      });

      const pointsEarned = 50;
      const todayPoints = (dailyPointsMap[todayStr] || 0) + pointsEarned;
      
      setDailyPointsMap(prev => ({
        ...prev,
        [todayStr]: todayPoints
      }));

      if (userId) {
        window.localStorage.setItem(\`sinpanico_daily_points_\${userId}\`, JSON.stringify({
          ...dailyPointsMap,
          [todayStr]: todayPoints
        }));
      }

      const updatedProfile = {
        ...userProfile,
        totalHoursStudied: userProfile.totalHoursStudied + 0.5,
        knowledgePoints: userProfile.knowledgePoints + pointsEarned
      };
      setUserProfile(updatedProfile);

      if (userId) {
        try {
          const { error: practiceError } = await supabase.from('user_practices').insert({
            user_id: userId,
            subject_id: selectedSubject.id,
            score: score,
            points_earned: pointsEarned,
            completed_at: new Date().toISOString()
          });
          if (practiceError) throw practiceError;

          const { error: profileError } = await supabase.from('user_profiles').update({
            knowledge_points: updatedProfile.knowledgePoints,
            total_hours_studied: updatedProfile.totalHoursStudied
          }).eq('user_id', userId);
          if (profileError) throw profileError;

        } catch (e) {
          console.error(e);
          setGlobalError('No se pudo guardar el progreso de práctica. Por favor, verifica tu conexión a internet.');
        }
      }

      setScreen('exam_results');
    }
  };

  if (isFetchingExam) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-beige">
        <div className="relative w-16 h-16 mb-4">
          <div className="w-16 h-16 rounded-full border-4 border-sky-blue/30 border-t-navy animate-spin"></div>
        </div>
        <p className="text-navy text-sm font-black tracking-widest uppercase animate-pulse">Cargando preguntas...</p>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-beige">
        <AlertCircle size={48} className="text-teal mb-4" />
        <h2 className="text-xl font-bold text-navy mb-2">Examen en construcción</h2>
        <p className="text-teal text-sm font-semibold mb-8">Aún no hay preguntas cargadas para esta materia.</p>
        <button onClick={() => setScreen('subject')} className="px-6 py-3 bg-white border border-sky-blue/20 rounded-xl font-black text-navy active:scale-95 transition-all shadow-sm">Volver</button>
      </div>
    );
  }

  if (isFailed) {
    return (
      <div className="min-h-screen bg-beige flex flex-col items-center justify-center p-6 animate-scale-up">
        <div className="bg-white rounded-3xl p-8 w-full max-w-md flex flex-col items-center shadow-xl border border-sky-blue/20 text-center relative overflow-hidden ios-shadow">
          <div className="absolute top-0 left-0 right-0 h-2 bg-rose-500"></div>
          
          <div className="w-20 h-20 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <Clock size={40} className="stroke-[2.5]" />
          </div>
          
          <h2 className="text-2xl font-black text-navy mb-2">¡Tiempo Agotado!</h2>
          <p className="text-sm text-teal font-semibold mb-6 max-w-xs">
            No lograste completar el examen dentro del límite de tiempo establecido.
          </p>
          
          <div className="w-full space-y-3">
            <button
              onClick={handleRestart}
              className="w-full py-4 bg-navy text-white font-black rounded-2xl shadow-lg shadow-navy/20 active:scale-95 transition-all text-sm"
            >
              Reiniciar desde 0
            </button>
            
            <button
              onClick={() => setScreen('subject')}
              className="w-full py-4 border border-sky-blue/30 text-navy font-bold rounded-2xl active:scale-95 transition-all text-sm bg-white hover:bg-beige/20"
            >
              Volver a Materias
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQIndex];

  return (
    <div className="min-h-screen bg-beige flex flex-col font-sans animate-fade-in">
      <header className="bg-white border-b border-sky-blue/20 p-4 sticky top-0 z-10 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => setScreen('subject')} className="text-teal hover:text-navy transition-colors"><ChevronLeft size={24} /></button>
          <h1 className="text-sm font-black text-navy line-clamp-1">Quiz de {selectedSubject?.name}</h1>
        </div>
        <div className="relative w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-sm border border-sky-blue/25 shrink-0">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle cx="28" cy="28" r="24" stroke="#F5EFEB" strokeWidth="4" fill="transparent" />
            <circle
              cx="28" cy="28" r="24"
              stroke={timeLeft < 180 ? "#ef4444" : "#2F4156"}
              strokeWidth="4"
              fill="transparent"
              strokeDasharray="150.7"
              strokeDashoffset={150.7 - (150.7 * (timeLeft / (examMode === 'diagnostic' ? 15 * 60 : 10 * 60)))}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="flex flex-col items-center justify-center z-10">
            <span className={\`text-[11px] font-black tracking-tighter \${timeLeft < 180 ? 'text-red-500 font-extrabold' : 'text-navy'}\`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </header>

      <div className="p-6 flex-1 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-xs font-bold text-teal">{currentQIndex + 1} / {questions.length}</span>
          <div className="flex-1 h-1.5 bg-sky-blue/20 rounded-full overflow-hidden max-w-[200px]">
            <div className="h-full bg-teal rounded-full transition-all" style={{ width: \`\${((currentQIndex + 1) / questions.length) * 100}%\` }}></div>
          </div>
        </div>

        <h2 className="text-lg font-black text-navy mb-6 leading-relaxed">
          {currentQuestion.q}
        </h2>

        {examMode === 'practice' && selectedMethod === 'active' && !optionsRevealed ? (
          <div className="bg-sky-blue/10 border-2 border-dashed border-sky-blue/35 rounded-2xl p-8 text-center animate-scale-up mb-8">
            <div className="w-16 h-16 bg-sky-blue/20 text-navy rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain size={32} />
            </div>
            <h3 className="text-lg font-black text-navy mb-2">Recuperación Activa Activada</h3>
            <p className="text-teal font-semibold text-sm mb-6">Fuerza a tu cerebro a recordar la respuesta antes de ver las opciones. ¡Esto mejora tu memoria a largo plazo!</p>
            <button 
              onClick={() => setOptionsRevealed(true)}
              className="px-8 py-3 bg-navy text-white rounded-xl font-black shadow-lg shadow-navy/20 active:scale-95 transition-all"
            >
              Ya la tengo en mente, revelar opciones
            </button>
          </div>
        ) : (
          <div className="space-y-3 mb-8 animate-fade-in">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correct;

              let borderClass = "border-sky-blue/20";
              let bgClass = "bg-white";
              let textClass = "text-navy";
              let icon = <div className="w-6 h-6 rounded-full border border-sky-blue/50 flex items-center justify-center text-[10px] font-black text-teal mr-3">{String.fromCharCode(65 + idx)}</div>;

              if (hasChecked) {
                if (isCorrect) {
                  borderClass = "border-emerald-500";
                  bgClass = "bg-emerald-500/10";
                  textClass = "text-emerald-800 dark:text-emerald-400 font-bold";
                  icon = <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white mr-3"><Check size={14} /></div>;
                } else if (isSelected && !isCorrect) {
                  borderClass = "border-rose-500";
                  bgClass = "bg-rose-500/10";
                  textClass = "text-rose-800 dark:text-rose-400 font-bold";
                  icon = <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center text-white mr-3"><X size={14} /></div>;
                } else {
                  borderClass = "border-sky-blue/10 opacity-50";
                }
              } else if (isSelected) {
                borderClass = "border-navy ring-2 ring-sky-blue/40";
                bgClass = "bg-sky-blue/10";
                textClass = "text-navy font-bold";
                icon = <div className="w-6 h-6 rounded-full bg-navy flex items-center justify-center text-white mr-3 text-[10px] font-bold">{String.fromCharCode(65 + idx)}</div>;
              }

              return (
                <button
                  key={idx}
                  disabled={hasChecked}
                  onClick={() => setSelectedOption(idx)}
                  className={\`w-full text-left p-4 rounded-xl border transition-all flex items-center \${borderClass} \${bgClass} \${textClass} hover:bg-beige/10 active:scale-[0.99]\`}
                >
                  {icon}
                  <span className="flex-1 text-sm font-semibold">{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {hasChecked && (
          <div className="bg-sky-blue/10 border border-sky-blue/20 rounded-2xl p-5 mb-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-2 text-teal font-black text-sm uppercase tracking-wider">
              <Lightbulb size={18} /> Explicación
            </div>
            <p className="text-sm text-navy/90 leading-relaxed font-semibold">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {hasChecked && examMode === 'practice' && selectedMethod === 'feynman' && selectedOption !== currentQuestion.correct && (
          <div className="bg-sky-blue/5 border border-sky-blue/15 rounded-2xl p-6 mb-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-3 text-navy font-black text-base uppercase tracking-wider">
              <Brain size={20} className="text-teal" /> Reto Feynman
            </div>
            <p className="text-xs text-teal font-bold mb-4 leading-relaxed">
              Fallaste en este concept. Para asimilarlo de verdad, usa tus propias palabras para explicar por qué la respuesta correcta es la correcta, como si le enseñaras a un niño.
            </p>
            <textarea
              value={feynmanReflection}
              onChange={(e) => setFeynmanReflection(e.target.value)}
              placeholder="Escribe tu explicación simple aquí..."
              className="w-full p-4 bg-white border border-sky-blue/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy resize-none font-semibold text-navy"
              rows={3}
            />
          </div>
        )}
      </div>

      <div className="bg-white border-t border-sky-blue/20 p-4 sticky bottom-0">
        <div className="max-w-3xl mx-auto flex justify-end">
          {!hasChecked ? (
            <button
              disabled={selectedOption === null}
              onClick={handleCheck}
              className={\`px-8 py-3 rounded-xl font-black transition-all \${selectedOption !== null ? 'bg-navy text-white shadow-md hover:bg-navy/95 active:scale-95' : 'bg-sky-blue/20 text-teal/40'}\`}
            >
              Comprobar
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-xl font-black bg-navy text-white shadow-md hover:bg-navy/95 active:scale-95 flex items-center gap-2"
            >
              {currentQIndex < questions.length - 1 ? 'Siguiente' : 'Ver Resultados'} <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ProgressScreen = ({
  userProfile,
  diagnosticCompleted,
  SUBJECTS,
  getSubjectCompletedCount,
  setScreen,
  dailyPointsMap
}) => {
  const hoursPerDayMap = { 1: 0.5, 2: 1.5, 3: 2.5, 4: 3.5 };
  const totalDays = userProfile.timeLeftMonths * 30;
  const totalHoursRequired = Math.round(totalDays * hoursPerDayMap[userProfile.intensity]);
  const percentage = Math.min(100, Math.round((userProfile.totalHoursStudied / totalHoursRequired) * 100));

  return (
    <div className="p-6 pb-24 bg-beige min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <button onClick={() => setScreen('home')} className="w-11 h-11 rounded-full bg-white shadow-sm text-navy flex items-center justify-center border border-sky-blue/20">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-black text-navy">Tu Progreso</h2>
        <div className="w-11 h-11" />
      </header>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-sky-blue/15 mb-6 flex flex-col items-center ios-shadow">
        <h3 className="font-black text-navy mb-6 text-sm tracking-widest uppercase">Meta de Estudio</h3>

        <div className="w-40 h-40 relative mb-4">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80" cy="80" r="68"
              stroke="#F5EFEB" strokeWidth="12" fill="transparent"
            />
            <circle
              cx="80" cy="80" r="68"
              stroke="#2F4156" strokeWidth="12" fill="transparent"
              strokeDasharray="427.2"
              strokeDashoffset={427.2 - (427.2 * percentage) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-black text-navy">{percentage}%</span>
            <span className="block text-[10px] font-black text-teal uppercase tracking-widest mt-1">Completado</span>
          </div>
        </div>

        <div className="flex w-full justify-between mt-4 px-4">
          <div className="text-center flex-1">
            <p className="text-[10px] text-teal font-black uppercase tracking-widest">Estudiado</p>
            <p className="text-xl font-black text-teal mt-1">{userProfile.totalHoursStudied}h</p>
          </div>
          <div className="w-px bg-sky-blue/30 my-2"></div>
          <div className="text-center flex-1">
            <p className="text-[10px] text-teal font-black uppercase tracking-widest">Meta</p>
            <p className="text-xl font-black text-navy mt-1">{totalHoursRequired}h</p>
          </div>
        </div>
      </div>

      {/* Gráfica de Progreso por Materias (Estilo Barras) */}
      <div className="bg-white p-6 rounded-2xl mb-6 relative shadow-sm border border-sky-blue/15 ios-shadow">
        <h3 className="font-black text-navy text-[11px] tracking-widest uppercase mb-4 opacity-90">Resumen Semanal</h3>

        <div className="relative w-full" style={{ height: \`\${SUBJECTS.length * 40 + 20}px\` }}>
          <svg viewBox={\`0 0 300 \${SUBJECTS.length * 40 + 20}\`} className="w-full h-full overflow-visible">
            {(() => {
              const calculatedPoints = SUBJECTS.map((sub) => {
                return getSubjectCompletedCount(sub.id);
              });

              const topValue = 21;
              const steps = [0, 7, 14, 21];

              return (
                <>
                  {steps.map((val) => {
                    const x = 70 + (val / topValue) * 220;
                    return (
                      <g key={\`x-\${val}\`}>
                        <line x1={x} y1="0" x2={x} y2={SUBJECTS.length * 40} stroke="#C8D9E6" strokeWidth="1" strokeOpacity="0.4" />
                        <text x={x} y={SUBJECTS.length * 40 + 15} fill="#567C8D" fontSize="8" fontWeight="black" textAnchor="middle">{Math.round(val)}</text>
                      </g>
                    );
                  })}

                  {/* Barras y Labels Y */}
                  {SUBJECTS.map((sub, i) => {
                    const progressPoints = calculatedPoints[i];
                    const y = i * 40 + 10;

                    return (
                      <g key={\`bar-\${sub.id}\`}>
                        <text x="65" y={y + 13} fill="#2F4156" fontSize="9" fontWeight="black" textAnchor="end">{sub.name.length > 12 ? sub.name.substring(0, 10) + '...' : sub.name}</text>
                        <rect x="70" y={y} width={(progressPoints / topValue) * 220} height="16" fill="#567C8D" rx="4" />
                      </g>
                    );
                  })}
                </>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* Historial de Puntos Diarios */}
      <div className="bg-white p-6 rounded-2xl border border-sky-blue/15 shadow-sm mb-6 ios-shadow">
        <h3 className="font-black text-navy text-[11px] tracking-widest uppercase mb-4 opacity-90">Puntos Acumulados por Día</h3>
        
        {dailyPointsMap && Object.keys(dailyPointsMap).length > 0 ? (
          <div className="space-y-3">
            {Object.keys(dailyPointsMap)
              .sort((a, b) => b.localeCompare(a))
              .slice(0, 7) // Show up to last 7 days
              .map(dateStr => {
                const pts = dailyPointsMap[dateStr];
                const [year, month, day] = dateStr.split('-');
                const dateObj = new Date(year, parseInt(month) - 1, parseInt(day));
                const formattedDate = dateObj.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' });
                
                return (
                  <div key={dateStr} className="flex justify-between items-center p-3.5 bg-beige/30 rounded-xl border border-sky-blue/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center font-black">
                        <Flame size={16} />
                      </div>
                      <span className="font-bold text-navy text-xs capitalize">{formattedDate}</span>
                    </div>
                    <span className="text-xs font-black text-teal">+\${pts} pts</span>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="text-center p-6 bg-beige/20 rounded-xl border border-sky-blue/10">
            <p className="text-xs font-semibold text-teal">No hay puntos acumulados todavía. ¡Comienza a practicar para sumar puntos!</p>
          </div>
        )}
      </div>

      <h3 className="font-black text-navy text-lg mb-4">Materias Evaluadas</h3>
      <div className="space-y-4">
        {SUBJECTS.map((sub) => {
          const currentScore = diagnosticCompleted[sub.id]?.score || 0;
          const maxScore = 15;
          return (
            <div key={sub.id} className="bg-white p-5 rounded-2xl border border-sky-blue/10 shadow-sm ios-shadow">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-blue/20 text-navy flex items-center justify-center">
                    <sub.icon size={18} className="text-navy" />
                  </div>
                  <span className="font-bold text-navy text-sm">{sub.name}</span>
                </div>
                <span className="text-xs font-black text-teal">{currentScore} pts</span>
              </div>
              <div className="w-full bg-sky-blue/10 h-2.5 rounded-full overflow-hidden">
                <div className="bg-teal h-full rounded-full" style={{ width: \`\${Math.min(100, (currentScore / maxScore) * 100)}%\` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PersonalInfoScreen = ({
  userProfile,
  setUserProfile,
  session,
  userId,
  profileUnlocked,
  setProfileUnlocked,
  setScreen
}) => {
  const [authPassword, setAuthPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const [newName, setNewName] = useState(userProfile.full_name || '');
  const [newPassword, setNewPassword] = useState('');
  const [loadingName, setLoadingName] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);
  const [msg, setMsg] = useState('');

  const handleUnlock = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const { error }= await supabase.auth.signInWithPassword({ email: session?.user?.email, password: authPassword });
      if (error) throw error;
      setProfileUnlocked(true);
    }catch (err) {
      setAuthError('Contraseña incorrecta. Acceso denegado.');
    }finally {
      setAuthLoading(false);
    }
  };

  const handleUpdateName = async () => {
    if (!userId || !newName.trim()) return;
    setLoadingName(true);
    try {
      const { error }= await supabase.from('user_profiles').update({ full_name: newName }).eq('user_id', userId);
      if (error) throw error;
      setUserProfile(prev => ({ ...prev, full_name: newName }));
      setMsg('Nombre de usuario actualizado con éxito.');
    }catch (err) {
      setMsg('No se pudo actualizar el nombre. Por favor, verifica tu conexión a internet.');
    }finally {
      setLoadingName(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      setMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setLoadingPass(true);
    try {
      const { error }= await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setMsg('Contraseña actualizada con éxito.');
      setNewPassword('');
    }catch (err) {
      setMsg('No se pudo actualizar la contraseña. Por favor, verifica tu conexión a internet.');
    }finally {
      setLoadingPass(false);
    }
  };

  if (!profileUnlocked) {
    return (
      <div className="p-6 bg-beige min-h-screen flex flex-col items-center justify-center relative animate-fade-in">
        <button onClick={() => { setProfileUnlocked(false); setScreen('profile'); }} className="absolute top-6 left-6 w-11 h-11 rounded-full bg-white shadow-sm text-navy flex items-center justify-center border border-sky-blue/20">
          <ChevronLeft size={24} />
        </button>

        <div className="w-20 h-20 bg-red-50 dark:bg-red-950/20 rounded-full flex items-center justify-center text-red-500 mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        </div>
        <h2 className="text-2xl font-black text-navy mb-2">Seguridad Requerida</h2>
        <p className="text-teal text-sm mb-8 max-w-xs text-center font-semibold">
          Para proteger tus datos personales, confirma que eres tú ingresando tu contraseña actual.
        </p>

        {authError && (
          <div className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm font-bold mb-6 border border-red-100 dark:border-red-950/30 w-full max-w-sm text-center">
            {authError}
          </div>
        )}

        <form onSubmit={handleUnlock} className="w-full max-w-sm">
          <input
            type="password"
            required
            placeholder="Contraseña"
            value={authPassword}
            onChange={(e) => setAuthPassword(e.target.value)}
            className="w-full bg-white border border-sky-blue/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy transition-all font-medium text-navy text-sm shadow-sm mb-4"
          />
          <button
            type="submit"
            disabled={authLoading}
            className="w-full py-4 bg-navy text-white rounded-2xl font-black shadow-lg shadow-navy/20 active:scale-95 transition-all"
          >
            {authLoading ? 'Verificando...' : 'Desbloquear'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 pb-24 bg-beige min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <button onClick={() => { setProfileUnlocked(false); setScreen('profile'); }} className="w-11 h-11 rounded-full bg-white shadow-sm text-navy flex items-center justify-center border border-sky-blue/20">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-black text-navy">Información Personal</h2>
        <div className="w-11 h-11" />
      </header>

      {msg && (
        <div className="bg-sky-blue/20 text-navy p-4 rounded-xl text-sm font-bold mb-6 border border-sky-blue/30 text-center">
          {msg}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-sky-blue/15 shadow-sm p-6 mb-6 ios-shadow">
        <h3 className="text-sm font-black text-navy mb-4">Datos de la Cuenta</h3>

        <div className="mb-4">
          <label className="block text-xs font-black text-teal uppercase tracking-widest mb-2">Correo Electrónico</label>
          <input
            type="email"
            disabled
            value={session?.user?.email || 'No disponible'}
            className="w-full bg-beige/30 border border-sky-blue/20 p-3.5 rounded-xl text-teal/85 font-semibold text-sm"
          />
          <p className="text-[10px] text-teal mt-1 font-semibold">El correo no se puede cambiar.</p>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-black text-teal uppercase tracking-widest mb-2">Nombre de Usuario</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 bg-white border border-sky-blue/50 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy transition-all font-semibold text-sm text-navy"
            />
            <button
              onClick={handleUpdateName}
              disabled={loadingName || newName === userProfile.full_name}
              className="px-5 bg-navy text-white font-black text-sm rounded-xl disabled:opacity-50 hover:bg-navy/90 active:scale-95 transition-all shadow-sm"
            >
              {loadingName ? '...' : 'Guardar'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-sky-blue/15 shadow-sm p-6 ios-shadow">
        <h3 className="text-sm font-black text-navy mb-4">Seguridad</h3>

        <div className="mb-4">
          <label className="block text-xs font-black text-teal uppercase tracking-widest mb-2">Nueva Contraseña</label>
          <div className="flex gap-2">
            <input
              type="password"
              value={newPassword}
              placeholder="Mínimo 6 caracteres"
              onChange={(e) => setNewPassword(e.target.value)}
              className="flex-1 bg-white border border-sky-blue/50 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy transition-all font-semibold text-sm text-navy"
            />
            <button
              onClick={handleUpdatePassword}
              disabled={loadingPass || !newPassword}
              className="px-5 bg-teal text-white font-black text-sm rounded-xl disabled:opacity-50 hover:bg-teal/90 active:scale-95 transition-all shadow-sm"
            >
              {loadingPass ? '...' : 'Actualizar'}
            </button>
          </div>
          <p className="text-[10px] text-teal mt-2 font-semibold">Por seguridad, Supabase encriptará tu nueva contraseña inmediatamente.</p>
        </div>
      </div>
    </div>
  );
};

const IntensityScreen = ({
  userId,
  userProfile,
  setUserProfile,
  setScreen
}) => {
  const [loadingIntensity, setLoadingIntensity] = useState(false);
  const [msg, setMsg] = useState('');

  const handleUpdateIntensity = async (level) => {
    if (!userId) return;
    setLoadingIntensity(true);
    try {
      const { error }= await supabase.from('user_profiles').update({ intensity: level }).eq('user_id', userId);
      if (error) throw error;
      setUserProfile(prev => ({ ...prev, intensity: level }));
      setMsg('Intensidad de estudio actualizada con éxito.');
    }catch (err) {
      setMsg('No se pudo actualizar la intensidad de estudio. Por favor, verifica tu conexión a internet.');
    }finally {
      setLoadingIntensity(false);
    }
  };

  const intensityLabels = {
    1: { title: 'Relajado', desc: '30 min a 1 hora diaria, ritmo suave' },
    2: { title: 'Medio', desc: '1 a 2 horas diarias, ritmo constante' },
    3: { title: 'Intensivo', desc: '2 a 3 horas diarias, enfoque profundo' },
    4: { title: 'Muy Intensivo', desc: '3+ horas diarias, máxima dedicación' }
  };

  return (
    <div className="p-6 pb-24 bg-beige min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <button onClick={() => setScreen('profile')} className="w-11 h-11 rounded-full bg-white shadow-sm text-navy flex items-center justify-center border border-sky-blue/20">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-black text-navy">Ajustar Intensidad</h2>
        <div className="w-11 h-11" />
      </header>

      {msg && (
        <div className="bg-sky-blue/20 text-navy p-4 rounded-xl text-sm font-bold mb-6 border border-sky-blue/30 text-center">
          {msg}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-sky-blue/15 shadow-sm p-6 mb-6 ios-shadow">
        <h3 className="text-sm font-black text-navy mb-4">Intensidad de Estudio</h3>

        <div className="flex justify-between text-[10px] font-black text-teal uppercase tracking-widest mb-4">
          <span>Relajado</span>
          <span>Muy Intensivo</span>
        </div>

        <div className="relative mb-6">
          <div className="h-2 bg-sky-blue/20 rounded-full absolute top-1/2 -translate-y-1/2 left-0 right-0"></div>
          <div
            className="h-2 bg-teal rounded-full absolute top-1/2 -translate-y-1/2 left-0 transition-all duration-300"
            style={{ width: \`\${((userProfile.intensity - 1) / 3) * 100}%\` }}
          ></div>

          <div className="flex justify-between relative z-10">
            {[1, 2, 3, 4].map(level => (
              <button
                key={level}
                onClick={() => handleUpdateIntensity(level)}
                disabled={loadingIntensity}
                className={\`w-5 h-5 rounded-full border-2 transition-all duration-300 disabled:opacity-50 \${userProfile.intensity >= level ? 'bg-teal border-white shadow-md' : 'bg-white border-sky-blue/30'}\`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <h4 className="font-black text-navy text-lg">{intensityLabels[userProfile.intensity].title}</h4>
          <p className="text-xs text-teal font-semibold mt-1.5 italic">"\${intensityLabels[userProfile.intensity].desc}"</p>
        </div>
      </div>
    </div>
  );
};

export default App;
`;

// Replace `export default App;` at the bottom with our standalone components + `export default App;`
content = content.replace('export default App;', standaloneComponents);

fs.writeFileSync(appJsxPath, content, 'utf8');
console.log("Successfully updated App.jsx!");
