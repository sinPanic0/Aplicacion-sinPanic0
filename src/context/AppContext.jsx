import React, { createContext, useState, useEffect } from 'react';
import { VERSES } from '../utils/constants';
import { EXAM_QUESTIONS, PRACTICE_QUESTIONS } from '../utils/questions';
import { supabase } from '../lib/supabaseClient';

export const AppContext = createContext({
  screen: 'home',
  setScreen: () => {},
  selectedMethod: 'active',
  setSelectedMethod: () => {},
  dailyVerse: { text: '"Todo lo puedo en Cristo que me fortalece"', ref: 'Filipenses 4:13' },
  selectedSubject: null,
  setSelectedSubject: () => {},
  userProfile: { fullName: '', grade: '11° Grado', streak: 0, knowledgePoints: 0, totalHoursStudied: 0 },
  setUserProfile: () => {},
  equippedItems: { hat: 'hat_grad' },
  setEquippedItems: () => {},
  purchasedItems: ['hat_grad'],
  setPurchasedItems: () => {},
  capybaraName: 'Chigüiro Sabio',
  setCapybaraName: () => {},
  diagnosticCompleted: {},
  setDiagnosticCompleted: () => {},
  practiceProgress: {},
  setPracticeProgress: () => {},
  diagnosticScores: {},
  failedCategories: {},
  currentQuestions: [],
  startExam: () => {},
  finishExam: () => {}
});

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
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('sinpanico_user_profile');
      return saved ? JSON.parse(saved) : {
        fullName: '',
        grade: '11° Grado',
        testDate: null,
        timeLeftMonths: 3,
        intensity: 3,
        totalHoursStudied: 12,
        streak: 1,
        knowledgePoints: 50
      };
    } catch (e) {
      return {
        fullName: '',
        grade: '11° Grado',
        testDate: null,
        timeLeftMonths: 3,
        intensity: 3,
        totalHoursStudied: 12,
        streak: 1,
        knowledgePoints: 50
      };
    }
  });

  // Save user profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sinpanico_user_profile', JSON.stringify(userProfile));
    } catch (e) { }
  }, [userProfile]);

  // --- ESTADO DE LA MASCOTA Y ACCESORIOS ---
  const [userId, setUserId] = useState(() => localStorage.getItem('sinpanico_user_id'));

  const [capybaraName, setCapybaraNameState] = useState(() => {
    try {
      const key = userId ? `capybara_name_${userId}` : 'capybara_name_global';
      return localStorage.getItem(key) || localStorage.getItem('capybara_name') || 'Chigüiro Sabio';
    } catch (e) {
      return 'Chigüiro Sabio';
    }
  });

  const [equippedItems, setEquippedItemsState] = useState(() => {
    try {
      const key = userId ? `capybara_equipped_${userId}` : 'capybara_equipped_global';
      const saved = localStorage.getItem(key) || localStorage.getItem('capybara_equipped');
      return saved ? JSON.parse(saved) : { hat: 'hat_grad' };
    } catch (e) {
      return { hat: 'hat_grad' };
    }
  });

  const [purchasedItems, setPurchasedItemsState] = useState(() => {
    try {
      const key = userId ? `capybara_purchased_${userId}` : 'capybara_purchased_global';
      const saved = localStorage.getItem(key) || localStorage.getItem('capybara_purchased');
      return saved ? JSON.parse(saved) : ['hat_grad'];
    } catch (e) {
      return ['hat_grad'];
    }
  });

  const setCapybaraName = (name) => {
    const val = typeof name === 'function' ? name(capybaraName) : name;
    setCapybaraNameState(val);
    try {
      const key = userId ? `capybara_name_${userId}` : 'capybara_name_global';
      localStorage.setItem(key, val);
      localStorage.setItem('capybara_name', val);
    } catch (e) { }
  };

  const setEquippedItems = (items) => {
    setEquippedItemsState(prev => {
      const val = typeof items === 'function' ? items(prev) : items;
      try {
        const key = userId ? `capybara_equipped_${userId}` : 'capybara_equipped_global';
        localStorage.setItem(key, JSON.stringify(val));
        localStorage.setItem('capybara_equipped', JSON.stringify(val));
      } catch (e) { }
      return val;
    });
  };

  const setPurchasedItems = (items) => {
    setPurchasedItemsState(prev => {
      const val = typeof items === 'function' ? items(prev) : items;
      try {
        const key = userId ? `capybara_purchased_${userId}` : 'capybara_purchased_global';
        localStorage.setItem(key, JSON.stringify(val));
        localStorage.setItem('capybara_purchased', JSON.stringify(val));
      } catch (e) { }
      return val;
    });
  };

  // --- ESTADO DE EXÁMENES Y PRÁCTICAS ---
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [examMode, setExamMode] = useState('diagnostic');
  const [failedCategories, setFailedCategories] = useState({});
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [examId, setExamId] = useState(null);
  const [practiceProgress, setPracticeProgress] = useState({});
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null);
  const [diagnosticCompleted, setDiagnosticCompleted] = useState({});
  const [diagnosticScores, setDiagnosticScores] = useState({});
  
  // --- MÉTODOS DE ESTUDIO INTERACTIVOS ---
  const [methodInteraction, setMethodInteraction] = useState(null);
  const [feynmanText, setFeynmanText] = useState('');

  const [isDbLoading, setIsDbLoading] = useState(true);

  // Inicializar usuario y cargar datos desde Supabase
  useEffect(() => {
    setDailyVerse(VERSES[Math.floor(Math.random() * VERSES.length)]);

    // Escuchar cambios de sesión
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUserId(session.user.id);
        localStorage.setItem('sinpanico_user_id', session.user.id);
        setScreen(prev => (prev === 'welcome' || prev === 'auth' || prev === 'auth_login' || prev === 'auth_signup') ? 'home' : prev);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUserId(session.user.id);
        localStorage.setItem('sinpanico_user_id', session.user.id);
        setScreen(prev => (prev === 'welcome' || prev === 'auth' || prev === 'auth_login' || prev === 'auth_signup') ? 'home' : prev);
      } else {
        const localId = localStorage.getItem('sinpanico_user_id');
        if (!localId) setUserId(null);
      }
    });

    const initDb = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        let currentUserId = session ? session.user.id : userId;
        if (!currentUserId) {
          const { data, error } = await supabase.from('user_profiles').insert([{}]).select('user_id').single();
          if (!error && data) {
            currentUserId = data.user_id;
            localStorage.setItem('sinpanico_user_id', currentUserId);
            setUserId(currentUserId);
          }
        }

        if (currentUserId) {
          const { data: profile } = await supabase.from('user_profiles').select('*').eq('user_id', currentUserId).single();
          if (profile) {
            setUserProfile(prev => ({
              ...prev,
              fullName: profile.full_name || prev.fullName,
              grade: profile.grade || prev.grade,
              testDate: profile.test_date ? new Date(profile.test_date) : prev.testDate,
              timeLeftMonths: profile.time_left_months || prev.timeLeftMonths,
              intensity: profile.intensity || prev.intensity,
              totalHoursStudied: profile.total_hours_studied ? Number(profile.total_hours_studied) : prev.totalHoursStudied,
              streak: profile.streak || prev.streak,
              knowledgePoints: profile.knowledge_points !== undefined ? profile.knowledge_points : (prev.knowledgePoints || 50)
            }));
            if (profile.selected_method) setSelectedMethod(profile.selected_method);
            if (profile.pet_name) setCapybaraNameState(profile.pet_name);
            if (profile.pet_equipped) setEquippedItemsState(profile.pet_equipped);
            if (profile.pet_purchased) setPurchasedItemsState(profile.pet_purchased);
          }

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

          const { data: practices } = await supabase.from('practice_logs').select('*').eq('user_id', currentUserId);
          if (practices) {
            const pracState = {};
            practices.forEach(p => {
              if (!pracState[p.practice_date]) pracState[p.practice_date] = {};
              pracState[p.practice_date][p.subject_id] = { practice_1: p.practice_1_completed, practice_2: p.practice_2_completed };
            });
            setPracticeProgress(pracState);
          }
        }
      } catch (err) {
        console.error("Error cargando base de datos:", err);
      } finally {
        setIsDbLoading(false);
      }
    };
    
    initDb();
  }, []);

  const updateUserProfile = async (updates) => {
    let newProfile = {};
    setUserProfile(prev => {
      const calculatedUpdates = typeof updates === 'function' ? updates(prev) : updates;
      newProfile = { ...prev, ...calculatedUpdates };
      return newProfile;
    });

    if (userId) {
      const resolvedUpdates = typeof updates === 'function' ? updates(userProfile) : updates;
      
      const dbUpdates = {};
      if (resolvedUpdates.fullName !== undefined) dbUpdates.full_name = resolvedUpdates.fullName;
      if (resolvedUpdates.grade !== undefined) dbUpdates.grade = resolvedUpdates.grade;
      if (resolvedUpdates.testDate !== undefined) dbUpdates.test_date = resolvedUpdates.testDate ? resolvedUpdates.testDate.toISOString().split('T')[0] : null;
      if (resolvedUpdates.timeLeftMonths !== undefined) dbUpdates.time_left_months = resolvedUpdates.timeLeftMonths;
      if (resolvedUpdates.intensity !== undefined) dbUpdates.intensity = resolvedUpdates.intensity;
      if (resolvedUpdates.totalHoursStudied !== undefined) dbUpdates.total_hours_studied = resolvedUpdates.totalHoursStudied;
      if (resolvedUpdates.streak !== undefined) dbUpdates.streak = resolvedUpdates.streak;
      if (resolvedUpdates.knowledgePoints !== undefined) dbUpdates.knowledge_points = resolvedUpdates.knowledgePoints;
      
      if (Object.keys(dbUpdates).length > 0) {
        await supabase.from('user_profiles').update(dbUpdates).eq('user_id', userId);
      }
    }
  };

  const updateSelectedMethod = async (method) => {
    setSelectedMethod(method);
    if (userId) {
      await supabase.from('user_profiles').update({ selected_method: method }).eq('user_id', userId);
    }
  };

  const getTodayString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };

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
      setTimeLeft(15 * 60);
      setFailedCategories(prev => ({ ...prev, [targetSubject.id]: [] }));
      const available = EXAM_QUESTIONS[targetSubject.id] || EXAM_QUESTIONS[1] || [];
      const shuffled = [...available].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(15, shuffled.length));
      setCurrentQuestions(selected.length > 0 ? selected : (EXAM_QUESTIONS[1] || []));
    } else {
      setTimeLeft(10 * 60);
      let available = [];
      const subjectFails = failedCategories[targetSubject.id] || [];
      
      if (subjectFails.length > 0 && PRACTICE_QUESTIONS[targetSubject.id]) {
        subjectFails.forEach(cat => {
          if (PRACTICE_QUESTIONS[targetSubject.id]?.[cat]) {
            available = [...available, ...PRACTICE_QUESTIONS[targetSubject.id][cat]];
          }
        });
      }
      
      if (available.length < 5 && PRACTICE_QUESTIONS[targetSubject.id]) {
        Object.values(PRACTICE_QUESTIONS[targetSubject.id]).forEach(catArray => {
          if (Array.isArray(catArray)) {
            available = [...available, ...catArray];
          }
        });
      }
      
      if (available.length < 5 && EXAM_QUESTIONS[targetSubject.id]) {
        available = [...available, ...EXAM_QUESTIONS[targetSubject.id]];
      }

      if (available.length === 0) {
        available = EXAM_QUESTIONS[1] || [];
      }

      const shuffled = [...available].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(10, shuffled.length));
      setCurrentQuestions(selected);
    }
    setScreen('exam');
  };

  const finishExam = async () => {
    const percentage = Math.round((score / currentQuestions.length) * 100);
    
    if (examMode === 'diagnostic') {
      setDiagnosticCompleted(prev => ({ ...prev, [selectedSubject.id]: true }));
      
      if (userId) {
        await supabase.from('user_diagnostics').upsert({
          user_id: userId,
          subject_id: selectedSubject.id,
          completed: true,
          score: score,
          failed_categories: failedCategories[selectedSubject.id] || []
        });
      }

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
        newStreak += 1;
      }

      updateUserProfile({ 
        totalHoursStudied: userProfile.totalHoursStudied + 0.2,
        streak: newStreak 
      });

      if (userId) {
        const updateData = {
          user_id: userId,
          practice_date: todayStr,
          subject_id: selectedSubject.id,
          score: score
        };
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
    equippedItems, setEquippedItems,
    purchasedItems, setPurchasedItems,
    capybaraName, setCapybaraName,
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
