import React, { createContext, useState, useEffect, useCallback } from 'react';
import { VERSES } from '../utils/constants';
import { EXAM_QUESTIONS, PRACTICE_QUESTIONS } from '../utils/questions';
import { supabase } from '../lib/supabaseClient';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- NAVEGACIÓN Y CONFIGURACIÓN ---
  const [screen, setScreen] = useState(() => localStorage.getItem('sinpanico_current_screen') || 'welcome');
  
  useEffect(() => {
    localStorage.setItem('sinpanico_current_screen', screen);
  }, [screen]);

  const [selectedMethod, setSelectedMethod] = useState('active');
  const [dailyVerse, setDailyVerse] = useState(VERSES[0]);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // --- PERFIL DE USUARIO ---
  const [userProfile, setUserProfile] = useState({
    fullName: '',
    grade: '11° Grado',
    testDate: null,
    timeLeftMonths: 3,
    intensity: 3, // 1: Relajado, 2: Medio, 3: Intensivo, 4: Muy Intensivo
    totalHoursStudied: 124, // Mock para el perfil
    streak: 12 // Mock para la racha
  });

  // --- ESTADO DE EXÁMENES Y PRÁCTICAS ---
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [examMode, setExamMode] = useState('diagnostic'); // 'diagnostic' | 'practice'
  const [failedCategories, setFailedCategories] = useState({}); // Ahora es un objeto por materia
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [examId, setExamId] = useState(null);
  const [practiceProgress, setPracticeProgress] = useState({});
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null);
  const [diagnosticCompleted, setDiagnosticCompleted] = useState({});
  
  // --- MÉTODOS DE ESTUDIO INTERACTIVOS ---
  const [methodInteraction, setMethodInteraction] = useState(null);
  const [feynmanText, setFeynmanText] = useState('');

  // --- EFECTOS GLOBALES Y SINCRONIZACIÓN SUPABASE ---
  const [userId, setUserId] = useState(() => localStorage.getItem('sinpanico_user_id'));
  const [isDbLoading, setIsDbLoading] = useState(true);

  // Inicializar usuario y cargar datos
  useEffect(() => {
    setDailyVerse(VERSES[Math.floor(Math.random() * VERSES.length)]);

    // Escuchar cambios de sesión
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUserId(session.user.id);
        localStorage.setItem('sinpanico_user_id', session.user.id);
        if (screen === 'welcome' || screen === 'auth') setScreen('home');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUserId(session.user.id);
        localStorage.setItem('sinpanico_user_id', session.user.id);
      } else {
        setUserId(null);
        localStorage.removeItem('sinpanico_user_id');
      }
    });

    const initDb = async () => {
      try {
        let currentUserId = userId;
        if (!currentUserId) {
          // Crear nuevo usuario si no existe
          const { data, error } = await supabase.from('user_profiles').insert([{}]).select('user_id').single();
          if (error) throw error;
          currentUserId = data.user_id;
          localStorage.setItem('sinpanico_user_id', currentUserId);
          setUserId(currentUserId);
        }

        // Cargar perfil
        const { data: profile } = await supabase.from('user_profiles').select('*').eq('user_id', currentUserId).single();
        if (profile) {
          setUserProfile({
            fullName: profile.full_name || '',
            grade: profile.grade,
            testDate: profile.test_date ? new Date(profile.test_date) : null,
            timeLeftMonths: profile.time_left_months,
            intensity: profile.intensity,
            totalHoursStudied: Number(profile.total_hours_studied),
            streak: profile.streak
          });
          if (profile.selected_method) setSelectedMethod(profile.selected_method);
        }

        // Cargar diagnósticos
        const { data: diagnostics } = await supabase.from('user_diagnostics').select('*').eq('user_id', currentUserId);
        if (diagnostics) {
          const diagState = {};
          const failsState = {};
          const scoresState = {};
          diagnostics.forEach(d => { 
            if (d.completed) diagState[d.subject_id] = true; 
            if (d.failed_categories) failsState[d.subject_id] = d.failed_categories;
            if (d.score !== null) scoresState[d.subject_id] = d.score;
          });
          setDiagnosticCompleted(diagState);
          setFailedCategories(failsState);
          setDiagnosticScores(scoresState);
        }

        // Cargar prácticas
        const { data: practices } = await supabase.from('practice_logs').select('*').eq('user_id', currentUserId);
        if (practices) {
          const pracState = {};
          practices.forEach(p => {
            if (!pracState[p.practice_date]) pracState[p.practice_date] = {};
            pracState[p.practice_date][p.subject_id] = { practice_1: p.practice_1_completed, practice_2: p.practice_2_completed };
          });
          setPracticeProgress(pracState);
        }
      } catch (err) {
        console.error("Error cargando base de datos:", err);
      } finally {
        setIsDbLoading(false);
      }
    };
    
    initDb();
  }, []);

  // Función envoltorio para actualizar perfil en DB y UI
  const updateUserProfile = async (updates) => {
    let newProfile = {};
    setUserProfile(prev => {
      const calculatedUpdates = typeof updates === 'function' ? updates(prev) : updates;
      newProfile = { ...prev, ...calculatedUpdates };
      return newProfile;
    });

    if (userId) {
      // Necesitamos esperar al render o usar los calculados directamente
      const resolvedUpdates = typeof updates === 'function' ? updates(userProfile) : updates;
      
      const dbUpdates = {};
      if (resolvedUpdates.fullName !== undefined) dbUpdates.full_name = resolvedUpdates.fullName;
      if (resolvedUpdates.grade !== undefined) dbUpdates.grade = resolvedUpdates.grade;
      if (resolvedUpdates.testDate !== undefined) dbUpdates.test_date = resolvedUpdates.testDate ? resolvedUpdates.testDate.toISOString().split('T')[0] : null;
      if (resolvedUpdates.timeLeftMonths !== undefined) dbUpdates.time_left_months = resolvedUpdates.timeLeftMonths;
      if (resolvedUpdates.intensity !== undefined) dbUpdates.intensity = resolvedUpdates.intensity;
      if (resolvedUpdates.totalHoursStudied !== undefined) dbUpdates.total_hours_studied = resolvedUpdates.totalHoursStudied;
      if (resolvedUpdates.streak !== undefined) dbUpdates.streak = resolvedUpdates.streak;
      
      if (Object.keys(dbUpdates).length > 0) {
        await supabase.from('user_profiles').update(dbUpdates).eq('user_id', userId);
      }
    }
  };

  // Función envoltorio para actualizar método en DB
  const updateSelectedMethod = async (method) => {
    setSelectedMethod(method);
    if (userId) {
      await supabase.from('user_profiles').update({ selected_method: method }).eq('user_id', userId);
    }
  };

  // --- FUNCIONES UTILITARIAS COMPARTIDAS ---
  const getTodayString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };

  /**
   * @description Inicia un examen diagnóstico o de práctica, reseteando el estado necesario y barajando preguntas.
   */
  const startExam = (subject, mode = 'diagnostic', practiceId = null) => {
    const targetSubject = subject || { id: 1, name: 'Lectura Crítica' };
    setSelectedSubject(targetSubject);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setHasChecked(false);
    setScore(0);
    setExamMode(mode);
    setExamId(practiceId || mode);
    
    if (mode === 'diagnostic') {
      setTimeLeft(15 * 60); // 15 minutos
      setFailedCategories(prev => ({ ...prev, [targetSubject.id]: [] }));
      const available = EXAM_QUESTIONS[targetSubject.id] || EXAM_QUESTIONS[1] || [];
      const shuffled = [...available].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(15, shuffled.length));
      setCurrentQuestions(selected.length > 0 ? selected : (EXAM_QUESTIONS[1] || []));
    } else {
      setTimeLeft(10 * 60); // 10 minutos
      let available = [];
      const subjectFails = failedCategories[targetSubject.id] || [];
      
      // 1. Intentar cargar preguntas de categorías falladas
      if (subjectFails.length > 0 && PRACTICE_QUESTIONS[targetSubject.id]) {
        subjectFails.forEach(cat => {
          if (PRACTICE_QUESTIONS[targetSubject.id]?.[cat]) {
            available = [...available, ...PRACTICE_QUESTIONS[targetSubject.id][cat]];
          }
        });
      }
      
      // 2. Si no hay suficientes, cargar de todas las categorías de práctica de la materia
      if (available.length < 5 && PRACTICE_QUESTIONS[targetSubject.id]) {
        Object.values(PRACTICE_QUESTIONS[targetSubject.id]).forEach(catArray => {
          if (Array.isArray(catArray)) {
            available = [...available, ...catArray];
          }
        });
      }
      
      // 3. Si aún no hay suficientes, combinar con el banco de examen diagnóstico
      if (available.length < 5 && EXAM_QUESTIONS[targetSubject.id]) {
        available = [...available, ...EXAM_QUESTIONS[targetSubject.id]];
      }

      // 4. Garantía absoluta: fallback a materia 1 si estuviese vacío
      if (available.length === 0) {
        available = EXAM_QUESTIONS[1] || [];
      }

      const shuffled = [...available].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(10, shuffled.length));
      setCurrentQuestions(selected);
    }
    setScreen('exam');
  };

  /**
   * @description Finaliza el examen, calcula resultados, recomienda un método y guarda el progreso en Supabase.
   */
  const finishExam = async () => {
    const percentage = Math.round((score / currentQuestions.length) * 100);
    
    if (examMode === 'diagnostic') {
      setDiagnosticCompleted(prev => ({ ...prev, [selectedSubject.id]: true }));
      
      // Guardar en Supabase
      if (userId) {
        await supabase.from('user_diagnostics').upsert({
          user_id: userId,
          subject_id: selectedSubject.id,
          completed: true,
          score: score,
          failed_categories: failedCategories[selectedSubject.id] || []
        });
      }

      // Recomendar método
      if (percentage >= 80) updateSelectedMethod('spaced');
      else if (percentage >= 50) updateSelectedMethod('active');
      else updateSelectedMethod('feynman');
    }
    
    if (examMode === 'practice' && examId) {
      const todayStr = getTodayString();
      const isPractice1 = examId === 'practice_1';
      
      setPracticeProgress(prev => {
        const newState = { ...prev };
        if (!newState[todayStr]) newState[todayStr] = {};
        if (!newState[todayStr][selectedSubject.id]) newState[todayStr][selectedSubject.id] = { practice_1: false, practice_2: false };
        newState[todayStr][selectedSubject.id][examId] = true;
        return newState;
      });

      const isFirstPracticeToday = !practiceProgress[todayStr] || Object.keys(practiceProgress[todayStr]).length === 0;
      let newStreak = userProfile.streak;
      if (isFirstPracticeToday) {
        newStreak += 1; // Incrementamos la racha al iniciar el primer estudio del día
      }

      // Actualizar horas estudiadas (+ 0.2 horas por práctica aprox)
      updateUserProfile({ 
        totalHoursStudied: userProfile.totalHoursStudied + 0.2,
        streak: newStreak 
      });

      // Guardar práctica en Supabase
      if (userId) {
        const updateData = {
          user_id: userId,
          practice_date: todayStr,
          subject_id: selectedSubject.id,
          score: score
        };
        if (isPractice1) updateData.practice_1_completed = true;
        else updateData.practice_2_completed = true;

        // Upsert no tiene un merge fácil para booleanos separados en Supabase, 
        // pero podemos intentarlo o ignorar el overwrite del otro valor si solo hacemos upsert parcial
        // Para simplificar, obtenemos el estado actual del UI (que acaba de actualizarse localmente)
        const currentData = practiceProgress[todayStr]?.[selectedSubject.id] || {};
        updateData.practice_1_completed = isPractice1 ? true : !!currentData.practice_1;
        updateData.practice_2_completed = !isPractice1 ? true : !!currentData.practice_2;

        await supabase.from('practice_logs').upsert(updateData);
      }
    }
    setScreen('exam_results');
  };

  const contextValue = {
    screen, setScreen,
    selectedMethod, setSelectedMethod: updateSelectedMethod,
    dailyVerse, setDailyVerse,
    selectedSubject, setSelectedSubject,
    userProfile, setUserProfile: updateUserProfile,
    currentQIndex, setCurrentQIndex,
    selectedOption, setSelectedOption,
    hasChecked, setHasChecked,
    score, setScore,
    timeLeft, setTimeLeft,
    examMode, setExamMode,
    failedCategories, setFailedCategories,
    currentQuestions, setCurrentQuestions,
    examId, setExamId,
    practiceProgress, setPracticeProgress,
    selectedCalendarDay, setSelectedCalendarDay,
    diagnosticCompleted, setDiagnosticCompleted,
    methodInteraction, setMethodInteraction,
    feynmanText, setFeynmanText,
    getTodayString, startExam, finishExam, isDbLoading, userId
  };

  if (isDbLoading) {
    return <div className="min-h-screen bg-beige text-navy flex items-center justify-center font-bold text-sm">Cargando SinPanic0...</div>;
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
