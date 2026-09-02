import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen, Calendar as CalendarIcon, BarChart2, User, ChevronLeft, ChevronRight,
  Flame, Lightbulb, Book, Calculator, Globe, FlaskConical, Languages, Clock,
  Settings, LogOut, CheckCircle2, Brain, Timer, Zap, Info, GraduationCap, ArrowRight,
  Check, X, AlertCircle, Lock, Moon, ListChecks, Sparkles, Crown, ShoppingBag, Loader2
} from 'lucide-react';
import { EXAM_QUESTIONS, PRACTICE_QUESTIONS } from './utils/questions';
import { supabase } from './lib/supabaseClient';
import { AiTutorWidget } from './components/AiTutorWidget';
import { SyllabusScreen } from './screens/SyllabusScreen';
import { CapybaraMascot } from './components/CapybaraMascot';
import { CapybaraShopModal } from './components/CapybaraShopModal';
import { MascotMotivationModal } from './components/MascotMotivationModal';

const SUBJECTS = [
  { id: 1, name: 'Lectura Crítica', completed: 0, total: 21, icon: Book, color: 'emerald', score: 380 },
  { id: 2, name: 'Matemáticas', completed: 0, total: 21, icon: Calculator, color: 'blue', score: 410 },
  { id: 3, name: 'Sociales y Ciudadanas', completed: 0, total: 21, icon: Globe, color: 'emerald', score: 350 },
  { id: 4, name: 'Ciencias Naturales', completed: 0, total: 21, icon: FlaskConical, color: 'teal', score: 320 },
  { id: 5, name: 'Inglés', completed: 0, total: 21, icon: Languages, color: 'indigo', score: 440 },
];

const STUDY_METHODS = [
  { id: 'active', title: 'Recuperación Activa', tag: 'RECOMENDADO #1', desc: 'El más efectivo. Responde preguntas y haz simulacros para entrenar tu memoria.', icon: Brain, color: 'emerald' },
  { id: 'spaced', title: 'Repetición Espaciada', tag: 'ALTAMENTE EFECTIVO', desc: 'Repasa en intervalos estratégicos para fortalecer la memoria a largo plazo.', icon: Timer, color: 'blue' },
  { id: 'feynman', title: 'Método Feynman', tag: 'COMPRENSIÓN PROFUNDA', desc: 'Explica temas con palabras simples para identificar vacíos en tu aprendizaje.', icon: User, color: 'indigo' },
];

const VERSES = [
  { text: '"Todo lo puedo en Cristo que me fortalece"', ref: 'Filipenses 4:13' },
  { text: '"Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes..."', ref: 'Josué 1:9' },
  { text: '"Fíate de Jehová de todo tu corazón, Y no te apoyes en tu propia prudencia."', ref: 'Proverbios 3:5' },
  { text: '"No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo..."', ref: 'Isaías 41:10' },
  { text: '"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal..."', ref: 'Jeremías 29:11' },
];

const getDailyVerseForToday = () => {
  const today = new Date();
  const dateNum = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = dateNum % VERSES.length;
  return VERSES[index];
};

const translateAuthError = (message) => {
  if (!message) return "Ha ocurrido un error. Por favor, inténtalo de nuevo.";
  const msg = message.toLowerCase();
  if (msg.includes("invalid login credentials") || msg.includes("invalid credentials")) {
    return "El correo electrónico o la contraseña son incorrectos.";
  }
  if (msg.includes("user already registered") || msg.includes("email already in use")) {
    return "Este correo electrónico ya está registrado. Intenta iniciar sesión con tu cuenta.";
  }
  if (msg.includes("email not confirmed")) {
    return "Tu correo electrónico no ha sido verificado. Por favor, revisa tu bandeja de entrada.";
  }
  if (msg.includes("password should be at least 6 characters")) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }
  if (msg.includes("invalid email")) {
    return "El formato del correo electrónico no es válido.";
  }
  if (msg.includes("rate limit")) {
    return "Has realizado demasiados intentos de inicio de sesión. Por favor, espera unos minutos y vuelve a intentarlo.";
  }
  return `Error: ${message}`;
};


function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      const parsed = JSON.parse(item);
      if (key === 'sinpanico_userProfile' && parsed && parsed.testDate) {
        parsed.testDate = new Date(parsed.testDate);
      }
      return parsed;
    } catch (error) {
      console.error("Error leyendo localStorage", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(prev => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (e) {
          console.error("Error guardando en localStorage", e);
        }
        return valueToStore;
      });
    } catch (error) {
      console.error("Error en setValue localStorage", error);
    }
  };

  return [storedValue, setValue];
}

const TRANSLATIONS = {
  es: {
    inicio: 'Inicio',
    calendario: 'Calendario',
    progreso: 'Progreso',
    perfil: 'Perfil',
    personal_info: 'Información Personal',
    methods: 'Método de Estudio',
    intensity_config: 'Intensidad de Estudio',
    calendar_prefs: 'Preferencias de Calendario',
    darkmode_act: 'Activar Modo Oscuro',
    darkmode_des: 'Desactivar Modo Oscuro',
    logout: 'Cerrar Sesión',
    ayuda: 'Ayuda / Reseñas',
    idioma: 'Idioma',
    streak: 'Racha',
    total: 'Total',
    days: 'Días',
    hours: 'h',
    welcome_title: 'SinPanic0',
    welcome_subtitle: 'Estudia con confianza, presenta con seguridad',
    register_btn: 'Inscríbete',
    login_btn: 'Iniciar sesión',
    email: 'Correo Electrónico',
    confirm_email: 'Confirmar Correo',
    username: 'Usuario',
    password: 'Contraseña',
    confirm_password: 'Confirmar Contraseña',
    email_placeholder: 'tu@correo.com',
    username_placeholder: 'Tu nombre de usuario',
    password_placeholder: 'Mínimo 6 caracteres',
    login_welcome: '¡Bienvenido!',
    register_account: 'Crea tu cuenta',
    login_desc: 'Ingresa tus datos para continuar estudiando.',
    register_desc: 'Guarda tu progreso de por vida.',
    login_submit: 'Ingresar',
    register_submit: 'Registrarse',
    no_account: '¿No tienes cuenta? Regístrate aquí',
    has_account: '¿Ya tienes cuenta? Inicia sesión',
    change_avatar: 'Cambiar',
    meta_score: 'Meta: 450+ puntos',
    user_level: 'Nivel: Avanzado',
    select_language_title: 'Seleccionar Idioma',
    cancel: 'Cancelar',
    apply: 'Aplicar',
    save: 'Guardar',
    update: 'Actualizar',
    study_intensity: 'Intensidad de Estudio',
    personal_data: 'Datos de la Cuenta',
    security: 'Seguridad',
    new_password: 'Nueva Contraseña',
    account_config: 'Configuración de cuenta',
    hola: 'Hola',
    ready_today: '¡Listo para tu sesión de hoy?',
    recommended_subject: 'Materia recomendada:',
    diagnostic_test: 'Simulacro Diagnóstico',
    answered_questions: 'Preguntas respondidas',
    studied_today: 'Estudiado hoy',
    knowledge_points: 'Puntos de Conocimiento'
  },
  en: {
    inicio: 'Home',
    calendario: 'Calendar',
    progreso: 'Progress',
    perfil: 'Profile',
    personal_info: 'Personal Info',
    methods: 'Study Method',
    intensity_config: 'Study Intensity',
    calendar_prefs: 'Calendar Preferences',
    darkmode_act: 'Activate Dark Mode',
    darkmode_des: 'Disable Dark Mode',
    logout: 'Log Out',
    ayuda: 'Help / Reviews',
    idioma: 'Language',
    streak: 'Streak',
    total: 'Total',
    days: 'Days',
    hours: 'h',
    welcome_title: 'SinPanic0',
    welcome_subtitle: 'Study with confidence, perform with security',
    register_btn: 'Sign Up',
    login_btn: 'Log In',
    email: 'Email Address',
    confirm_email: 'Confirm Email',
    username: 'Username',
    password: 'Password',
    confirm_password: 'Confirm Password',
    email_placeholder: 'you@email.com',
    username_placeholder: 'Your username',
    password_placeholder: 'Minimum 6 characters',
    login_welcome: 'Welcome!',
    register_account: 'Create your account',
    login_desc: 'Enter your credentials to continue studying.',
    register_desc: 'Save your progress forever.',
    login_submit: 'Log In',
    register_submit: 'Register',
    no_account: "Don't have an account? Sign up here",
    has_account: 'Already have an account? Log in',
    change_avatar: 'Change',
    meta_score: 'Goal: 450+ points',
    user_level: 'Level: Advanced',
    select_language_title: 'Select Language',
    cancel: 'Cancel',
    apply: 'Apply',
    save: 'Save',
    update: 'Update',
    study_intensity: 'Study Intensity',
    personal_data: 'Account Information',
    security: 'Security',
    new_password: 'New Password',
    account_config: 'Account settings',
    hola: 'Hello',
    ready_today: 'Ready for your session today?',
    recommended_subject: 'Recommended Subject:',
    diagnostic_test: 'Diagnostic Test',
    answered_questions: 'Questions answered',
    studied_today: 'Studied today',
    knowledge_points: 'Knowledge Points'
  },
  pt: {
    inicio: 'Início',
    calendario: 'Calendário',
    progreso: 'Progresso',
    perfil: 'Perfil',
    personal_info: 'Informação Pessoal',
    methods: 'Método de Estudo',
    intensity_config: 'Intensidade de Estudo',
    calendar_prefs: 'Preferências do Calendário',
    darkmode_act: 'Ativar Modo Escuro',
    darkmode_des: 'Desativar Modo Escuro',
    logout: 'Sair',
    ayuda: 'Ajuda / Avaliações',
    idioma: 'Idioma',
    streak: 'Sequência',
    total: 'Total',
    days: 'Dias',
    hours: 'h',
    welcome_title: 'SinPanic0',
    welcome_subtitle: 'Estude com confiança, apresente com segurança',
    register_btn: 'Inscrever-se',
    login_btn: 'Iniciar sessão',
    email: 'E-mail',
    confirm_email: 'Confirmar E-mail',
    username: 'Nome de usuário',
    password: 'Senha',
    confirm_password: 'Confirmar Senha',
    email_placeholder: 'voce@email.com',
    username_placeholder: 'Seu nome de usuário',
    password_placeholder: 'Mínimo 6 caracteres',
    login_welcome: 'Bem-vindo!',
    register_account: 'Crie sua conta',
    login_desc: 'Insira seus dados para continuar estudando.',
    register_desc: 'Salve seu progresso para sempre.',
    login_submit: 'Entrar',
    register_submit: 'Cadastrar',
    no_account: 'Não tem uma conta? Cadastre-se aqui',
    has_account: 'Já tem uma conta? Inicie sessão',
    change_avatar: 'Alterar',
    meta_score: 'Meta: 450+ pontos',
    user_level: 'Nível: Avançado',
    select_language_title: 'Selecionar Idioma',
    cancel: 'Cancelar',
    apply: 'Aplicar',
    save: 'Salvar',
    update: 'Atualizar',
    study_intensity: 'Intensidade de Estudo',
    personal_data: 'Dados da Conta',
    security: 'Segurança',
    new_password: 'Nova Senha',
    account_config: 'Configuração da conta',
    hola: 'Olá',
    ready_today: 'Pronto para sua sessão de hoje?',
    recommended_subject: 'Matéria recomendada:',
    diagnostic_test: 'Simulado Diagnóstico',
    answered_questions: 'Perguntas respondidas',
    studied_today: 'Estudado hoje',
    knowledge_points: 'Pontos de Conhecimento'
  },
  fr: {
    inicio: 'Accueil',
    calendario: 'Calendrier',
    progreso: 'Progrès',
    perfil: 'Profil',
    personal_info: 'Infos Personnelles',
    methods: 'Méthode d\'Étude',
    intensity_config: 'Intensité d\'Étude',
    calendar_prefs: 'Préférences du Calendrier',
    darkmode_act: 'Activer Mode Sombre',
    darkmode_des: 'Désactiver Mode Sombre',
    logout: 'Se Déconnecter',
    ayuda: 'Aide / Avis',
    idioma: 'Langue',
    streak: 'Série',
    total: 'Total',
    days: 'Jours',
    hours: 'h',
    welcome_title: 'SinPanic0',
    welcome_subtitle: 'Étudiez avec confiance, présentez avec assurance',
    register_btn: 'S\'inscrire',
    login_btn: 'Se connecter',
    email: 'Adresse E-mail',
    confirm_email: 'Confirmer l\'E-mail',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    confirm_password: 'Confirmer le Mot de Passe',
    email_placeholder: 'vous@email.com',
    username_placeholder: 'Votre nom d\'utilisateur',
    password_placeholder: 'Minimum 6 caractères',
    login_welcome: 'Bienvenue !',
    register_account: 'Créez votre compte',
    login_desc: 'Entrez vos coordonnées pour continuer à étudier.',
    register_desc: 'Sauvegardez vos progrès à vie.',
    login_submit: 'Se connecter',
    register_submit: 'S\'enregistrer',
    no_account: 'Pas de compte ? Inscrivez-vous ici',
    has_account: 'Déjà un compte ? Connectez-vous',
    change_avatar: 'Changer',
    meta_score: 'Objectif : 450+ points',
    user_level: 'Niveau : Avancé',
    select_language_title: 'Choisir la Langue',
    cancel: 'Annuler',
    apply: 'Appliquer',
    save: 'Enregistrer',
    update: 'Mettre à jour',
    study_intensity: 'Intensité d\'Étude',
    personal_data: 'Données du Compte',
    security: 'Sécurité',
    new_password: 'Nouveau Mot de Passe',
    account_config: 'Paramètres du compte',
    hola: 'Bonjour',
    ready_today: 'Prêt pour votre session aujourd\'hui ?',
    recommended_subject: 'Matière recommandée :',
    diagnostic_test: 'Test Diagnostique',
    answered_questions: 'Questions répondues',
    studied_today: 'Étudié aujourd\'hui',
    knowledge_points: 'Points de Connaissance'
  },
  it: {
    inicio: 'Inizio',
    calendario: 'Calendario',
    progreso: 'Progresso',
    perfil: 'Profilo',
    personal_info: 'Info Personali',
    methods: 'Metodo di Studio',
    intensity_config: 'Intensità di Studio',
    calendar_prefs: 'Preferenze del Calendario',
    darkmode_act: 'Attiva Modalità Scura',
    darkmode_des: 'Disattiva Modalità Scura',
    logout: 'Disconnettersi',
    ayuda: 'Aiuto / Recensioni',
    idioma: 'Lingua',
    streak: 'Serie',
    total: 'Totale',
    days: 'Giorni',
    hours: 'ore',
    welcome_title: 'SinPanic0',
    welcome_subtitle: 'Studia con fiducia, presenta con sicurezza',
    register_btn: 'Iscriviti',
    login_btn: 'Accedi',
    email: 'Indirizzo E-mail',
    confirm_email: 'Conferma E-mail',
    username: 'Nome utente',
    password: 'Password',
    confirm_password: 'Conferma Password',
    email_placeholder: 'tuo@email.com',
    username_placeholder: 'Tuo nome utente',
    password_placeholder: 'Minimo 6 caratteri',
    login_welcome: 'Benvenuto!',
    register_account: 'Crea il tuo account',
    login_desc: 'Inserisci i tuoi dati per continuer a studiare.',
    register_desc: 'Salva i tuoi progressi per sempre.',
    login_submit: 'Accedi',
    register_submit: 'Registrati',
    no_account: 'Non hai un account? Registrati qui',
    has_account: 'Hai già un account? Accedi',
    change_avatar: 'Cambia',
    meta_score: 'Traguardo: 450+ punti',
    user_level: 'Livello: Avanzato',
    select_language_title: 'Seleziona la Lingua',
    cancel: 'Annulla',
    apply: 'Applica',
    save: 'Salva',
    update: 'Aggiorna',
    study_intensity: 'Intensità di Studio',
    personal_data: 'Dati dell\'Account',
    security: 'Sicurezza',
    new_password: 'Nuova Password',
    account_config: 'Impostazioni account',
    hola: 'Ciao',
    ready_today: 'Pronto per la tua sessione oggi?',
    recommended_subject: 'Materia consigliata:',
    diagnostic_test: 'Test Diagnostico',
    answered_questions: 'Domande risposte',
    studied_today: 'Studiato oggi',
    knowledge_points: 'Punti di Conoscenza'
  },
  de: {
    inicio: 'Startseite',
    calendario: 'Kalender',
    progreso: 'Fortschritt',
    perfil: 'Profil',
    personal_info: 'Persönliche Info',
    methods: 'Lernmethode',
    intensity_config: 'Lernintensität',
    calendar_prefs: 'Kalendereinstellungen',
    darkmode_act: 'Dunkelmodus Aktivieren',
    darkmode_des: 'Dunkelmodus Deaktivieren',
    logout: 'Abmelden',
    ayuda: 'Hilfe / Bewertungen',
    idioma: 'Sprache',
    streak: 'Serie',
    total: 'Gesamt',
    days: 'Tage',
    hours: 'Std.',
    welcome_title: 'SinPanic0',
    welcome_subtitle: 'Lerne mit Vertrauen, präsentiere mit Sicherheit',
    register_btn: 'Registrieren',
    login_btn: 'Anmelden',
    email: 'E-Mail-Adresse',
    confirm_email: 'E-Mail bestätigen',
    username: 'Benutzername',
    password: 'Passwort',
    confirm_password: 'Passwort bestätigen',
    email_placeholder: 'deine@email.com',
    username_placeholder: 'Dein Benutzername',
    password_placeholder: 'Mindestens 6 Zeichen',
    login_welcome: 'Willkommen!',
    register_account: 'Erstelle dein Konto',
    login_desc: 'Gib deine Daten ein, um weiterzulernen.',
    register_desc: 'Sichere deinen Fortschritt fürs Leben.',
    login_submit: 'Anmelden',
    register_submit: 'Registrieren',
    no_account: 'Noch kein Konto? Hier registrieren',
    has_account: 'Bereits ein Konto? Anmelden',
    change_avatar: 'Ändern',
    meta_score: 'Ziel: 450+ Punkte',
    user_level: 'Niveau: Fortgeschritten',
    select_language_title: 'Sprache auswählen',
    cancel: 'Abbrechen',
    apply: 'Übernehmen',
    save: 'Speichern',
    update: 'Aktualisieren',
    study_intensity: 'Lernintensität',
    personal_data: 'Kontodaten',
    security: 'Sicherheit',
    new_password: 'Neues Passwort',
    account_config: 'Kontoeinstellungen',
    hola: 'Hallo',
    ready_today: 'Bereit für deine Lerneinheit heute?',
    recommended_subject: 'Empfohlenes Fach:',
    diagnostic_test: 'Diagnosetest',
    answered_questions: 'Beantwortete Fragen',
    studied_today: 'Heute gelernt',
    knowledge_points: 'Wissenspunkte'
  }
};

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const App = () => {
  const [session, setSession] = useState(null);
  const [userId, setUserId] = useState(null);
  const [screen, setScreen] = useLocalStorage('sinpanico_screen', 'welcome');
  const [selectedMethod, setSelectedMethod] = useLocalStorage('sinpanico_method', 'active');
  const [dailyVerse, setDailyVerse] = useState(getDailyVerseForToday);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Responsividad y Foto de perfil
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : true);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (userId) {
      const savedPic = window.localStorage.getItem(`sinpanico_avatar_${userId}`);
      setProfilePic(savedPic);
    } else {
      setProfilePic(null);
    }
  }, [userId]);

  // Estado para el Exam
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [examMode, setExamMode] = useState('diagnostic'); // 'diagnostic' | 'practice'
  const [failedCategories, setFailedCategories] = useLocalStorage('sinpanico_failed', []);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [isFetchingExam, setIsFetchingExam] = useState(false);
  const [examId, setExamId] = useState(null);
  const [practiceProgress, setPracticeProgress] = useLocalStorage('sinpanico_practice', {});
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null);

  const [dailyPointsMap, setDailyPointsMap] = useState({});

  useEffect(() => {
    if (userId) {
      try {
        const localKey = `sinpanico_daily_points_${userId}`;
        const val = window.localStorage.getItem(localKey) || '{}';
        setDailyPointsMap(JSON.parse(val));
      } catch (e) {
        console.error("Error loading daily points:", e);
      }
    }
  }, [userId]);

  // Nuevos estados para Onboarding y Progreso
  const [userProfile, setUserProfile] = useLocalStorage('sinpanico_userProfile', {
    grade: '11° Grado',
    testDate: null,
    timeLeftMonths: 3,
    intensity: 3, // 1: Relajado, 2: Medio, 3: Intensivo, 4: Muy Intensivo
    totalHoursStudied: 124, // Mock para el perfil
    streak: 12, // Mock para la racha
    knowledgePoints: 0
  });
  const [diagnosticCompleted, setDiagnosticCompleted] = useLocalStorage('sinpanico_diagnostic', {});

  // Estados de la Mascota Chigüiro y la Tienda de Accesorios (Aislados individualmente por userId)
  const [equippedItems, setEquippedItems] = useState(() => {
    try {
      const key = userId ? `capybara_equipped_${userId}` : 'capybara_equipped_global';
      const saved = localStorage.getItem(key) || localStorage.getItem('capybara_equipped');
      return saved ? JSON.parse(saved) : { hat: 'hat_grad' };
    } catch (e) {
      return { hat: 'hat_grad' };
    }
  });

  const [purchasedItems, setPurchasedItems] = useState(() => {
    try {
      const key = userId ? `capybara_purchased_${userId}` : 'capybara_purchased_global';
      const saved = localStorage.getItem(key) || localStorage.getItem('capybara_purchased');
      return saved ? JSON.parse(saved) : ['hat_grad'];
    } catch (e) {
      return ['hat_grad'];
    }
  });

  const [isCapybaraShopOpen, setIsCapybaraShopOpen] = useState(false);

  // Nombre de la Mascota personalizable por usuario (almacenado localmente por perfil)
  const [capybaraName, setCapybaraName] = useState(() => {
    try {
      const key = userId ? `capybara_name_${userId}` : 'capybara_name_global';
      return localStorage.getItem(key) || 'Chigüiro Sabio';
    } catch (e) {
      return 'Chigüiro Sabio';
    }
  });

  const [editingCapyName, setEditingCapyName] = useState(capybaraName);

  // Limpieza al cerrar sesión: previene mezclar datos entre distintas cuentas
  useEffect(() => {
    if (!userId) {
      // Usuario cerró sesión: restablecer estados a valores por defecto para no mostrar datos de la sesión anterior
      setCapybaraName('Chigüiro Sabio');
      setEditingCapyName('Chigüiro Sabio');
      setEquippedItems({ hat: 'hat_grad' });
      setPurchasedItems(['hat_grad']);
      setProfilePic(null);
      setUserProfile({
        grade: '11° Grado',
        testDate: null,
        timeLeftMonths: 3,
        intensity: 3,
        totalHoursStudied: 0,
        streak: 0,
        knowledgePoints: 0,
        full_name: ''
      });
      setDiagnosticCompleted({});
      setPracticeProgress({});
      setDailyPointsMap({});
    }
  }, [userId]);

  // Sincronizador resiliente de Mascota en Supabase (Intenta guardar en pet_* y usa selected_method como respaldo garantizado si faltan columnas)
  const savePetStateToSupabase = async (overrideName, overrideEquipped, overridePurchased, overrideMethod) => {
    if (!userId) return;

    const nameToSave = overrideName !== undefined ? overrideName : capybaraName;
    const equippedToSave = overrideEquipped !== undefined ? overrideEquipped : equippedItems;
    const purchasedToSave = overridePurchased !== undefined ? overridePurchased : purchasedItems;
    const methodToSave = overrideMethod !== undefined ? overrideMethod : selectedMethod;

    const metaPayload = JSON.stringify({
      method: methodToSave || 'active',
      petName: nameToSave,
      equipped: equippedToSave,
      purchased: purchasedToSave
    });

    try {
      const { error } = await supabase.from('user_profiles').update({
        selected_method: metaPayload,
        pet_name: nameToSave,
        pet_equipped: equippedToSave,
        pet_purchased: purchasedToSave
      }).eq('user_id', userId);

      if (error) {
        await supabase.from('user_profiles').update({
          selected_method: metaPayload
        }).eq('user_id', userId);
      }
    } catch (err) {
      console.error("Error guardando estado de la mascota en Supabase:", err);
    }
  };

  const handleUpdateCapybaraName = (newName) => {
    const trimmed = newName.trim() || 'Chigüiro Sabio';
    setCapybaraName(trimmed);
    setEditingCapyName(trimmed);
    try {
      const key = userId ? `capybara_name_${userId}` : 'capybara_name_global';
      localStorage.setItem(key, trimmed);
      if (userId) {
        savePetStateToSupabase(trimmed);
      }
    } catch (e) { }
  };

  // Función para descontar o actualizar Puntos KP en tiempo real (Persistente en DB y LocalStorage)
  const handleUpdateKnowledgePoints = (fnOrValue) => {
    setUserProfile(prev => {
      const currentKP = prev.knowledgePoints || 0;
      const nextKP = Math.max(0, typeof fnOrValue === 'function' ? fnOrValue(currentKP) : fnOrValue);

      if (userId) {
        window.localStorage.setItem(`sinpanico_points_${userId}`, nextKP);
        supabase.from('user_profiles').update({
          knowledge_points: nextKP
        }).eq('user_id', userId).then(({ error }) => {
          if (error) console.error("Error actualizando KP en DB:", error);
        }).catch(e => console.error("Error actualizando KP en DB:", e));
      }

      return {
        ...prev,
        knowledgePoints: nextKP
      };
    });
  };

  useEffect(() => {
    try {
      const key = userId ? `capybara_equipped_${userId}` : 'capybara_equipped_global';
      localStorage.setItem(key, JSON.stringify(equippedItems));
      if (userId) {
        savePetStateToSupabase(undefined, equippedItems);
      }
    } catch (e) { }
  }, [equippedItems, userId]);

  useEffect(() => {
    try {
      const key = userId ? `capybara_purchased_${userId}` : 'capybara_purchased_global';
      localStorage.setItem(key, JSON.stringify(purchasedItems));
      if (userId) {
        savePetStateToSupabase(undefined, undefined, purchasedItems);
      }
    } catch (e) { }
  }, [purchasedItems, userId]);

  const [methodInteraction, setMethodInteraction] = useState(null); // 'active', 'spaced', 'feynman'
  const [globalError, setGlobalError] = useState(null);

  const [profileUnlocked, setProfileUnlocked] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return window.localStorage.getItem('sinpanico_darkmode_global') === 'true';
  });
  const [language, setLanguage] = useState(() => {
    return window.localStorage.getItem('sinpanico_language_global') || 'es';
  });

  const t = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['es']?.[key] || key;
  };

  // Track active time per day & sync with Supabase per user
  const [activeTimeMinutes, setActiveTimeMinutes] = useLocalStorage(`sinpanico_activeTime_${getTodayString()}`, 0);
  const lastTickRef = useRef(Date.now());

  useEffect(() => {
    if (screen === 'welcome' || screen === 'auth_login' || screen === 'auth_signup') return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedMs = now - lastTickRef.current;

      if (elapsedMs >= 60000) {
        const minsToAdd = Math.floor(elapsedMs / 60000);
        lastTickRef.current += minsToAdd * 60000;

        setActiveTimeMinutes(prev => {
          const currentMins = Number(prev) || 0;
          const nextVal = currentMins + minsToAdd;
          const todayStr = getTodayString();

          if (userId) {
            supabase.from('user_profiles').update({
              daily_active_minutes: nextVal,
              last_active_date: todayStr
            }).eq('user_id', userId).then(() => { }).catch(e => console.error("Error updating active time in Supabase:", e));
          }
          return nextVal;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [screen, userId]);

  useEffect(() => {
    if (userId) {
      const val = window.localStorage.getItem(`sinpanico_darkmode_${userId}`);
      if (val !== null) {
        const isDark = val === 'true';
        setDarkMode(isDark);
        window.localStorage.setItem('sinpanico_darkmode_global', isDark);
      }
      const langVal = window.localStorage.getItem(`sinpanico_language_${userId}`);
      if (langVal !== null) {
        setLanguage(langVal);
        window.localStorage.setItem('sinpanico_language_global', langVal);
      }
    }
  }, [userId]);

  const toggleDarkMode = async () => {
    const newVal = !darkMode;
    setDarkMode(newVal);
    window.localStorage.setItem('sinpanico_darkmode_global', newVal);
    if (userId) {
      window.localStorage.setItem(`sinpanico_darkmode_${userId}`, newVal);
      try {
        await supabase.from('user_profiles').update({ dark_mode: newVal }).eq('user_id', userId);
      } catch (err) {
        console.error("Error saving dark_mode to Supabase:", err);
      }
    }
  };

  const changeLanguage = async (newLang) => {
    setLanguage(newLang);
    window.localStorage.setItem('sinpanico_language_global', newLang);
    if (userId) {
      window.localStorage.setItem(`sinpanico_language_${userId}`, newLang);
      try {
        await supabase.from('user_profiles').update({ language: newLang }).eq('user_id', userId);
      } catch (err) {
        console.error("Error saving language to Supabase:", err);
      }
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);




  const getSubjectCompletedCount = (subId) => {
    let count = 0;

    const now = new Date();
    const dayOfWeek = now.getDay();
    const diffToMonday = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const startOfWeekDate = new Date(now.getFullYear(), now.getMonth(), diffToMonday);
    startOfWeekDate.setHours(0, 0, 0, 0);

    const endOfWeekDate = new Date(startOfWeekDate);
    endOfWeekDate.setDate(startOfWeekDate.getDate() + 6);
    endOfWeekDate.setHours(23, 59, 59, 999);

    Object.entries(practiceProgress || {}).forEach(([dateStr, dayData]) => {
      // Usar T12:00:00 evita problemas de zona horaria al parsear fechas locales
      const practiceDate = new Date(`${dateStr}T12:00:00`);
      if (practiceDate >= startOfWeekDate && practiceDate <= endOfWeekDate) {
        if (dayData[subId]) {
          if (dayData[subId].diagnostic) count += 1;
          if (dayData[subId].practice_1) count += 1;
          if (dayData[subId].practice_2) count += 1;
        }
      }
    });

    return count;
  };

  useEffect(() => {
    setDailyVerse(getDailyVerseForToday());

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session) {
        setUserId(session.user.id);
        localStorage.setItem('sinpanico_user_id', session.user.id);
        setScreen(prev => (prev === 'welcome' || prev === 'auth_login' || prev === 'auth_signup') ? 'home' : prev);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session) {
        setUserId(session.user.id);
        localStorage.setItem('sinpanico_user_id', session.user.id);
        
        if (event === 'PASSWORD_RECOVERY') {
          setScreen('reset_password');
        } else {
          setScreen(prev => (prev === 'welcome' || prev === 'auth_login' || prev === 'auth_signup') ? 'home' : prev);
        }

        // Crear perfil si es primer inicio de sesión con Google (Fire and forget para evitar deadlocks de Supabase)
        const checkAndCreateProfile = async () => {
          const googleName = session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Estudiante';
          try {
            const { data: existingProfile } = await supabase.from('user_profiles').select('user_id').eq('user_id', session.user.id).maybeSingle();
            if (!existingProfile) {
              await supabase.from('user_profiles').upsert({
                user_id: session.user.id,
                full_name: googleName,
                grade: '11° Grado',
                time_left_months: 3,
                intensity: 3,
                total_hours_studied: 0,
                streak: 1,
                knowledge_points: 50
              });
            }
          } catch (e) {
            console.error("Error al crear perfil inicial de Google:", e);
          }
        };
        
        checkAndCreateProfile();
      } else if (event === 'SIGNED_OUT' || !session) {
        localStorage.removeItem('sinpanico_user_id');
        localStorage.removeItem('sinpanico_screen');
        setUserId(null);
        setSession(null);
        setScreen('welcome');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) return;

      const todayStr = getTodayString();

      try {
        // Cargar Perfil de forma segura con maybeSingle para evitar excepciones PGRST116
        let { data: profile } = await supabase.from('user_profiles').select('*').eq('user_id', userId).maybeSingle();

        // Si el perfil no existe en Supabase, crearlo con valores por defecto
        if (!profile && userId) {
          const newProfile = {
            user_id: userId,
            full_name: 'Estudiante',
            grade: '11° Grado',
            time_left_months: 3,
            intensity: 3,
            total_hours_studied: 0,
            streak: 0,
            knowledge_points: 0,
            pet_name: 'Chigüiro Sabio',
            pet_equipped: { hat: 'hat_grad' },
            pet_purchased: ['hat_grad']
          };
          await supabase.from('user_profiles').upsert(newProfile);
          profile = newProfile;
        }

        if (profile) {
          if (profile.language) {
            setLanguage(profile.language);
            window.localStorage.setItem('sinpanico_language_global', profile.language);
            window.localStorage.setItem(`sinpanico_language_${userId}`, profile.language);
          }
          if (profile.dark_mode !== undefined && profile.dark_mode !== null) {
            setDarkMode(profile.dark_mode);
            window.localStorage.setItem('sinpanico_darkmode_global', profile.dark_mode);
            window.localStorage.setItem(`sinpanico_darkmode_${userId}`, profile.dark_mode);
          }

          // Synchronize Daily Active Study Time across devices (Cloud is Truth)
          const syncedMins = (profile.last_active_date === todayStr) ? (Number(profile.daily_active_minutes) || 0) : 0;
          setActiveTimeMinutes(syncedMins);
          window.localStorage.setItem(`sinpanico_activeTime_${todayStr}`, syncedMins);

          if (profile.last_active_date !== todayStr && userId) {
            supabase.from('user_profiles').update({
              daily_active_minutes: syncedMins,
              last_active_date: todayStr
            }).eq('user_id', userId).then(() => { }).catch(e => console.error("Error updating daily active minutes:", e));
          }

          // Synchronize Knowledge Points (KP) & Daily Points across devices (Cloud is Truth)
          const syncedTotalKP = Number(profile.knowledge_points) || 0;
          const localKey = `sinpanico_points_${userId}`;

          let syncedDailyPoints = 0;
          if (profile.last_points_date === todayStr) {
            syncedDailyPoints = Number(profile.daily_points) || 0;
          } else {
            // New calendar day! Reset daily points accumulated today to 0 while keeping total KP balance
            syncedDailyPoints = 0;
            supabase.from('user_profiles').update({
              daily_points: 0,
              last_points_date: todayStr
            }).eq('user_id', userId).then(() => { }).catch(e => console.error("Error resetting daily points:", e));
          }

          setDailyPointsMap(prev => ({
            ...prev,
            [todayStr]: syncedDailyPoints
          }));

          window.localStorage.setItem(`sinpanico_daily_points_${userId}`, JSON.stringify({
            [todayStr]: syncedDailyPoints
          }));
          window.localStorage.setItem(localKey, syncedTotalKP);

          setUserProfile(prev => ({
            ...prev,
            grade: profile.grade || '11° Grado',
            testDate: profile.test_date ? new Date(profile.test_date) : prev.testDate,
            timeLeftMonths: profile.time_left_months || 3,
            intensity: profile.intensity || 3,
            totalHoursStudied: Number(profile.total_hours_studied) || 0,
            streak: profile.streak || 0,
            knowledgePoints: syncedTotalKP,
            full_name: profile.full_name || ''
          }));
          // Sincronizar Mascota (Nombre, Accesorios Equipados y Comprados) de manera exhaustiva y resiliente
          let cloudName = profile.pet_name;
          let cloudEquipped = profile.pet_equipped && typeof profile.pet_equipped === 'object' ? profile.pet_equipped : null;
          let cloudPurchased = Array.isArray(profile.pet_purchased) ? profile.pet_purchased : null;
          let activeMethod = profile.selected_method || 'active';

          // Decodificación de respaldo: si selected_method es un JSON codificado, extraer petName, equipped y purchased
          if (profile.selected_method && profile.selected_method.startsWith('{')) {
            try {
              const meta = JSON.parse(profile.selected_method);
              if (meta.method) activeMethod = meta.method;
              if (!cloudName && meta.petName) cloudName = meta.petName;
              if (!cloudEquipped && meta.equipped) cloudEquipped = meta.equipped;
              if (!cloudPurchased && meta.purchased) cloudPurchased = meta.purchased;
            } catch (e) { }
          }
          setSelectedMethod(activeMethod);

          const finalCloudPurchased = Array.isArray(cloudPurchased) ? cloudPurchased : [];
          const allPurchased = Array.from(new Set(['hat_grad', ...finalCloudPurchased]));

          const finalCloudEquipped = cloudEquipped || {};
          const allEquipped = { hat: 'hat_grad', ...finalCloudEquipped };

          let legacyName = localStorage.getItem(`capybara_name_${userId}`);
          const finalPetName = cloudName || legacyName || 'Chigüiro Sabio';

          setCapybaraName(finalPetName);
          setEditingCapyName(finalPetName);
          setEquippedItems(allEquipped);
          setPurchasedItems(allPurchased);

          window.localStorage.setItem(`capybara_name_${userId}`, finalPetName);
          window.localStorage.setItem(`capybara_equipped_${userId}`, JSON.stringify(allEquipped));
          window.localStorage.setItem(`capybara_purchased_${userId}`, JSON.stringify(allPurchased));

          // Guardar consolidadamente en Supabase (con respaldo automático si la tabla carece de columnas pet_*)
          if (userId) {
            savePetStateToSupabase(finalPetName, allEquipped, allPurchased, activeMethod);
          }

          if (profile.profile_pic) {
            setProfilePic(profile.profile_pic);
            window.localStorage.setItem(`sinpanico_avatar_${userId}`, profile.profile_pic);
          }
        }

        // Cargar diagnósticos
        const { data: diagnostics } = await supabase.from('user_diagnostics').select('*').eq('user_id', userId);
        if (diagnostics) {
          const diagState = {};
          diagnostics.forEach(d => {
            const updatedDate = new Date(d.updated_at);
            const updatedAtDateStr = `${updatedDate.getFullYear()}-${String(updatedDate.getMonth() + 1).padStart(2, '0')}-${String(updatedDate.getDate()).padStart(2, '0')}`;
            if (d.completed) {
              diagState[d.subject_id] = {
                completed: true,
                completedToday: updatedAtDateStr === todayStr,
                score: d.score || 0
              };
            }
          });
          setDiagnosticCompleted(diagState);
        }

        // Cargar prácticas (Calendario) y calcular progreso
        const { data: practices } = await supabase.from('practice_logs').select('*').eq('user_id', userId);
        let calculatedHours = 0;
        let streakCount = 0;

        if (practices && practices.length > 0) {
          const pracState = {};

          // Ordenar por fecha para calcular racha
          const sortedPractices = [...practices].sort((a, b) => new Date(b.practice_date) - new Date(a.practice_date));

          let lastDate = new Date();
          lastDate.setHours(0, 0, 0, 0);

          practices.forEach(p => {
            if (!pracState[p.practice_date]) pracState[p.practice_date] = {};
            pracState[p.practice_date][p.subject_id] = { practice_1: p.practice_1_completed, practice_2: p.practice_2_completed };

            // Cada práctica suma 10 minutos (0.16h)
            if (p.practice_1_completed) calculatedHours += 0.16;
            if (p.practice_2_completed) calculatedHours += 0.16;
          });

          // Racha básica (días únicos con alguna práctica)
          const uniqueDates = [...new Set(sortedPractices.map(p => p.practice_date))];
          streakCount = uniqueDates.length;

          // Mantener los diagnósticos guardados localmente para no perder el tracking
          setPracticeProgress(prev => {
            const newState = { ...prev };
            Object.keys(pracState).forEach(date => {
              if (!newState[date]) newState[date] = {};
              Object.keys(pracState[date]).forEach(sub => {
                if (!newState[date][sub]) newState[date][sub] = {};
                newState[date][sub].practice_1 = pracState[date][sub].practice_1;
                newState[date][sub].practice_2 = pracState[date][sub].practice_2;
              });
            });
            return newState;
          });
        }

        if (diagnostics) {
          // Cada diagnóstico suma 15 minutos (0.25h)
          calculatedHours += diagnostics.filter(d => d.completed).length * 0.25;
        }

        setUserProfile(prev => ({
          ...prev,
          totalHoursStudied: Math.round(calculatedHours * 10) / 10,
          streak: streakCount
        }));

      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };

    loadUserData();
  }, [userId]);

  const startExam = async (subject, mode = 'diagnostic', practiceId = null) => {
    setSelectedSubject(subject);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setHasChecked(false);
    setScore(0);
    setExamMode(mode);
    setExamId(practiceId || mode);
    setIsFetchingExam(true);
    setScreen('exam');

    try {
      // 1. Obtener IDs de preguntas que el usuario ya respondió
      let historyIds = [];
      if (userId) {
        const { data: history } = await supabase.from('user_question_history').select('question_id').eq('user_id', userId);
        if (history) historyIds = history.map(h => h.question_id);
      }

      // 2. Construir la consulta a Supabase
      let query = supabase.from('questions_bank').select('*').eq('subject_id', subject.id);

      // En modo diagnóstico, ignoramos las categorías y sacamos cualquier pregunta difícil.
      // En modo práctica, filtramos por las fallas del usuario, si existen.
      if (mode === 'practice' && failedCategories.length > 0) {
        // failedCategories es un array. Supabase admite .in()
        query = query.in('category', failedCategories);
      }

      const { data: allQuestions, error } = await query;
      if (error) throw error;

      let available = allQuestions || [];

      // Filtrar preguntas ya vistas (a menos que no haya más opciones)
      let unseen = available.filter(q => !historyIds.includes(q.id));

      const limit = mode === 'diagnostic' ? 15 : 10;
      let finalQuestions = unseen.sort(() => 0.5 - Math.random()).slice(0, limit);

      // Si no hay suficientes preguntas no repetidas, mezclamos con preguntas ya vistas aleatoriamente
      if (finalQuestions.length < limit) {
        const seen = available.filter(q => historyIds.includes(q.id));
        const needed = limit - finalQuestions.length;

        // Tomar aleatoriamente de las vistas
        finalQuestions = [...finalQuestions, ...seen.sort(() => 0.5 - Math.random()).slice(0, needed)];

        if (finalQuestions.length === 0) {
          console.warn(`No hay preguntas disponibles de ${subject.name}en la base de datos.`);
        }
      }

      // Mapear campos de la DB a los campos esperados por la UI
      finalQuestions = finalQuestions.map(q => ({
        ...q,
        q: q.question_text || q.q,
        correct: q.correct_index !== undefined ? q.correct_index : q.correct
      }));

      setActiveQuestions(finalQuestions);

      if (mode === 'diagnostic') {
        setFailedCategories([]);
      }

    } catch (err) {
      console.error("Error fetching exam:", err);
      setActiveQuestions([]);
    } finally {
      setIsFetchingExam(false);
    }
  };

  const SideNav = () => (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-white dark:bg-[#241A12] border-r border-[#EADBC8] dark:border-[#3A2A1E] flex flex-col justify-between p-6 z-40 ios-shadow">
      <div className="space-y-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-[#C85A28] text-white rounded-xl flex items-center justify-center shadow-lg shadow-[#C85A28]/20 animate-pulse">
            <BookOpen size={22} />
          </div>
          <div>
            <h2 className="text-lg font-black text-navy leading-none">SinPanic0</h2>
            <span className="text-[10px] font-bold text-teal tracking-wide">PREPARACIÓN ICFES</span>
          </div>
        </div>

        <nav className="space-y-1">
          {[
            { id: 'home', icon: BookOpen, label: t('inicio') },
            { id: 'temarios', icon: ListChecks, label: 'Temarios' },
            { id: 'calendar', icon: CalendarIcon, label: t('calendario') },
            { id: 'progress', icon: BarChart2, label: t('progreso') },
            { id: 'profile', icon: User, label: t('perfil') },
          ].map((item) => {
            const isActive = screen === item.id || (item.id === 'home' && screen === 'subject') || (item.id === 'profile' && ['personal_info', 'intensity_config'].includes(screen));
            return (
              <button
                key={item.id}
                onClick={() => setScreen(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${isActive ? 'bg-[#C85A28] text-white shadow-md' : 'text-teal hover:bg-[#FAF4EE]/60 dark:hover:bg-[#18110C]/60 hover:text-navy'}`}
              >
                <item.icon size={20} className={isActive ? 'text-white' : 'text-teal'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-[#EADBC8] dark:border-[#3A2A1E] pt-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#FAF4EE] dark:bg-[#18110C] border border-[#EADBC8] dark:border-[#3A2A1E] flex items-center justify-center overflow-hidden relative shrink-0">
          {profilePic ? (
            <img src={profilePic} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <User size={20} className="text-teal" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-black text-navy truncate">{userProfile.full_name || 'Estudiante'}</p>
          <p className="text-[10px] font-medium text-teal truncate">{session?.user?.email || 'Sesión Activa'}</p>
        </div>
      </div>
    </aside>
  );

  const BottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 dark:bg-[#241A12]/90 backdrop-blur-lg border-t border-[#EADBC8] dark:border-[#3A2A1E] flex justify-around py-3 pb-safe z-40 ios-shadow">
      {[
        { id: 'home', icon: BookOpen, label: t('inicio') },
        { id: 'temarios', icon: ListChecks, label: 'Temarios' },
        { id: 'calendar', icon: CalendarIcon, label: t('calendario') },
        { id: 'progress', icon: BarChart2, label: t('progreso') },
        { id: 'profile', icon: User, label: t('perfil') },
      ].map((item) => {
        const isActive = screen === item.id || (item.id === 'home' && screen === 'subject') || (item.id === 'profile' && ['personal_info', 'intensity_config'].includes(screen));
        return (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-[#C85A28] scale-105 font-bold' : 'text-teal/80'}`}
          >
            <item.icon size={22} className={isActive ? 'stroke-[2.5px] text-[#C85A28]' : 'text-teal'} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );

  const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-beige">
      <div className="w-40 h-40 bg-white rounded-full ios-shadow-lg flex items-center justify-center mb-10 border border-sky-blue/20 animate-scale-up">
        <div className="text-navy">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            <path d="M12 11v6"></path>
            <path d="M9 14h6"></path>
          </svg>
        </div>
      </div>
      <h1 className="text-4xl font-black text-navy mb-2 tracking-tight">{t('welcome_title')}</h1>
      <p className="text-teal mb-16 font-semibold">{t('welcome_subtitle')}</p>
      <div className="w-full space-y-4 max-w-[80%]">
        <button onClick={() => setScreen('auth_signup')} className="w-full py-4 bg-navy text-white rounded-2xl font-black shadow-lg shadow-navy/20 active:scale-95 transition-all">{t('register_btn')}</button>
        <button onClick={() => setScreen('auth_login')} className="w-full py-4 bg-white text-navy border border-sky-blue/30 rounded-2xl font-black shadow-sm active:scale-95 transition-all hover:bg-white/90">{t('login_btn')}</button>
      </div>
    </div>
  );

  const AuthScreen = ({ initialMode }) => {
    const [isLogin, setIsLogin] = useState(initialMode === 'login');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loginRecoverySent, setLoginRecoverySent] = useState(false);

    const handleLoginRecoverPassword = async () => {
      if (!email) {
        setErrorMsg('Por favor ingresa tu correo electrónico primero para enviar el enlace de recuperación.');
        return;
      }
      setLoading(true);
      setErrorMsg('');
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        setLoginRecoverySent(true);
      } catch (err) {
        setErrorMsg('Error al enviar el correo. Verifica que tu dirección sea correcta.');
      } finally {
        setLoading(false);
      }
    };

    const handleGoogleAuth = async () => {
      setGoogleLoading(true);
      setErrorMsg('');
      try {
        const currentBaseUrl = window.location.href.split('#')[0].split('?')[0];
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: currentBaseUrl
          }
        });
        if (error) throw error;
      } catch (err) {
        console.error("Error en autenticación con Google:", err);
        setErrorMsg(err.message || 'Error al conectar con Google. Revisa la configuración en Supabase.');
      } finally {
        setGoogleLoading(false);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setErrorMsg('');

      try {
        if (isLogin) {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;

          setScreen('home');
        } else {
          if (email !== confirmEmail) {
            setErrorMsg('Los correos electrónicos no coinciden.');
            setLoading(false);
            return;
          }
          if (password !== confirmPassword) {
            setErrorMsg('Las contraseñas no coinciden.');
            setLoading(false);
            return;
          }

          // Verificar si el username ya existe
          const { data: existingUser, error: checkError } = await supabase
            .from('user_profiles')
            .select('full_name')
            .eq('full_name', username)
            .maybeSingle();

          if (existingUser) {
            setErrorMsg('Ese nombre de usuario ya está en uso. Por favor elige otro.');
            setLoading(false);
            return;
          }

          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                username: username
              }
            }
          });
          if (error) throw error;

          if (data?.user) {
            try {
              await supabase.from('user_profiles').upsert({
                user_id: data.user.id,
                full_name: username,
                grade: '11° Grado',
                time_left_months: 3,
                intensity: 3,
                total_hours_studied: 0,
                streak: 0
              });
            } catch (e) {
              console.error("No se pudo hacer upsert en user_profiles", e);
            }
            setScreen('onboarding');
          } else {
            setErrorMsg('Por favor revisa tu correo para confirmar la cuenta.');
          }
        }
      } catch (err) {
        setErrorMsg(translateAuthError(err.message));
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="flex flex-col min-h-screen bg-beige p-6 relative animate-fade-in font-sans">
        <button onClick={() => setScreen('welcome')} className="absolute top-6 left-6 p-2 text-navy hover:bg-sky-blue/30 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>

        <div className="flex-1 flex flex-col justify-center max-w-sm w-full mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-navy mb-2">
              {isLogin ? t('login_welcome') : t('register_account')}
            </h2>
            <p className="text-teal font-semibold text-sm">
              {isLogin ? t('login_desc') : t('register_desc')}
            </p>
          </div>

          {errorMsg && (
            <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-sm font-bold mb-6 border border-rose-200 text-center">
              {errorMsg}
            </div>
          )}

          {loginRecoverySent && (
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl text-sm font-bold mb-6 border border-emerald-200 text-center">
              ¡Correo enviado! Revisa tu bandeja de entrada o spam para restablecer tu contraseña.
            </div>
          )}

          {/* Botón oficial para iniciar sesión / registrarse con Google */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={googleLoading || loading}
            className="w-full py-4 px-4 bg-white border-2 border-sky-blue/30 hover:border-navy text-navy rounded-2xl font-black shadow-sm active:scale-95 transition-all flex items-center justify-center gap-3 mb-6 disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader2 className="animate-spin text-teal" size={20} />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>{isLogin ? 'Iniciar sesión con Google' : 'Registrarse con Google'}</span>
          </button>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-sky-blue/20"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-teal uppercase tracking-widest">O con tu correo</span>
            <div className="flex-grow border-t border-sky-blue/20"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-teal uppercase tracking-widest mb-2">{t('email')}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-sky-blue/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy transition-all font-medium text-sm text-navy shadow-sm"
                placeholder={t('email_placeholder')}
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-black text-teal uppercase tracking-widest mb-2">{t('confirm_email')}</label>
                <input
                  type="email"
                  required
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  className="w-full bg-white border border-sky-blue/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy transition-all font-medium text-sm text-navy shadow-sm"
                  placeholder={t('confirm_email')}
                />
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-xs font-black text-teal uppercase tracking-widest mb-2">{t('username')}</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white border border-sky-blue/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy transition-all font-medium text-sm text-navy shadow-sm"
                  placeholder={t('username_placeholder')}
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-black text-teal uppercase tracking-widest mb-2">{t('password')}</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-sky-blue/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy transition-all font-medium text-sm text-navy shadow-sm"
                placeholder={t('password_placeholder')}
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-black text-teal uppercase tracking-widest mb-2">{t('confirm_password')}</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white border border-sky-blue/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy transition-all font-medium text-sm text-navy shadow-sm"
                  placeholder={t('confirm_password')}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-6 bg-navy text-white rounded-2xl font-black text-lg shadow-lg shadow-navy/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-navy/95"
            >
              {loading ? '...' : (isLogin ? t('login_submit') : t('register_submit'))}
            </button>
          </form>

          {isLogin && (
            <button 
              type="button"
              onClick={handleLoginRecoverPassword}
              disabled={loading || loginRecoverySent}
              className="mt-6 text-sm font-bold text-slate-500 hover:text-navy transition-colors disabled:opacity-50"
            >
              ¿Olvidaste tu contraseña? Recupérala aquí
            </button>
          )}

          <button
            type="button"
            onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }}
            className="mt-8 text-sm font-bold text-teal hover:text-navy transition-colors"
          >
            {isLogin ? t('no_account') : t('has_account')}
          </button>
        </div>
      </div>
    );
  };

  const OnboardingScreen = () => {
    const [calendarDate, setCalendarDate] = useState(() => {
      const d = new Date();
      if (d.getMonth() < 6) d.setMonth(6);
      if (d.getMonth() > 7) d.setMonth(7);
      return d;
    });

    const handleCalMonthChange = (delta) => {
      const newDate = new Date(calendarDate);
      if (delta > 0) {
        if (newDate.getMonth() === 6) {
          newDate.setMonth(7);
        } else {
          newDate.setFullYear(newDate.getFullYear() + 1);
          newDate.setMonth(6);
        }
      } else {
        if (newDate.getMonth() === 7) {
          newDate.setMonth(6);
        } else {
          newDate.setFullYear(newDate.getFullYear() - 1);
          newDate.setMonth(7);
        }
      }
      setCalendarDate(newDate);
    };

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const handleDateSelect = (day) => {
      const selectedDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
      const now = new Date();
      let diffTime = selectedDate.getTime() - now.getTime();
      if (diffTime < 0) diffTime = 0;

      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const newMonths = Math.floor(diffDays / 30);
      const remainingDays = diffDays % 30;

      let recommendedIntensity = userProfile.intensity;
      if (newMonths > 6) recommendedIntensity = 1;
      else if (newMonths > 3) recommendedIntensity = 2;
      else if (newMonths > 1) recommendedIntensity = 3;
      else recommendedIntensity = 4;

      setUserProfile({
        ...userProfile,
        testDate: selectedDate,
        timeLeftMonths: newMonths,
        timeLeftDays: remainingDays,
        intensity: recommendedIntensity
      });
    };

    const intensityLabels = {
      1: { title: 'Relajado', desc: '30 min a 1 hora diaria, ritmo suave' },
      2: { title: 'Medio', desc: '1 a 2 horas diarias, ritmo constante' },
      3: { title: 'Intensivo', desc: '2 a 3 horas diarias, enfoque profundo' },
      4: { title: 'Muy Intensivo', desc: '3+ horas diarias, máxima dedicación' }
    };

    return (
      <div className="p-6 pb-24 bg-beige min-h-screen animate-fade-in">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setScreen('welcome')} className="p-2 text-navy hover:bg-sky-blue/30 rounded-full transition-colors bg-white shadow-sm border border-sky-blue/20"><ChevronLeft size={24} /></button>
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-navy" />
            <h2 className="text-base font-bold text-navy">SinPanic0</h2>
          </div>
        </div>

        <h2 className="text-3xl font-black text-navy mb-2">Personaliza tu estudio</h2>
        <p className="text-teal mb-8 text-sm">Ayúdanos a preparar el mejor camino para tu éxito académico.</p>

        {/* Fecha del examen */}
        <div className="mb-8 animate-scale-up">
          <h3 className="font-bold text-navy mb-3 flex items-center gap-2">
            <CalendarIcon size={20} className="text-teal" /> ¿Cuándo presentarás tus pruebas?
          </h3>
          <div className="bg-white p-5 rounded-2xl border border-sky-blue/20 shadow-sm flex flex-col items-center w-full">
            <div className="flex justify-between items-center w-full mb-4 px-2">
              <button onClick={() => handleCalMonthChange(-1)} className="text-navy p-2 hover:bg-sky-blue/10 rounded-full transition-colors"><ChevronLeft size={20} /></button>
              <span className="font-bold text-navy">{monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}</span>
              <button onClick={() => handleCalMonthChange(1)} className="text-navy p-2 hover:bg-sky-blue/10 rounded-full transition-colors"><ChevronRight size={20} /></button>
            </div>

            <div className="grid grid-cols-7 gap-1 w-full text-center mb-2">
              {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => (
                <span key={d} className="text-[10px] font-black text-teal/80 uppercase">{d}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-2 gap-x-1 w-full">
              {Array.from({ length: new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getDay() }).map((_, i) => (
                <div key={`b - ${i}`} className="h-8"></div>
              ))}
              {Array.from({ length: new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate() }).map((_, i) => {
                const day = i + 1;
                const isSelected = userProfile.testDate &&
                  userProfile.testDate.getDate() === day &&
                  userProfile.testDate.getMonth() === calendarDate.getMonth() &&
                  userProfile.testDate.getFullYear() === calendarDate.getFullYear();

                return (
                  <button
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    className={`h-8 w-8 mx-auto rounded-xl flex items-center justify-center text-sm font-bold transition-all ${isSelected ? 'bg-navy text-white shadow-md shadow-navy/20' : 'text-navy hover:bg-sky-blue/10'}`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Curso */}
        <div className="mb-8">
          <h3 className="font-bold text-navy mb-3 flex items-center gap-2">
            <GraduationCap size={20} className="text-teal" /> ¿En qué curso estás actualmente?
          </h3>
          <select
            value={userProfile.grade}
            onChange={(e) => setUserProfile({ ...userProfile, grade: e.target.value })}
            className="w-full p-4 bg-white border border-sky-blue/20 rounded-2xl shadow-sm text-navy font-bold focus:outline-none focus:ring-2 focus:ring-navy appearance-none"
          >
            <option value="10° Grado">10° Grado</option>
            <option value="11° Grado">11° Grado</option>
          </select>
        </div>

        {/* Tiempo faltante */}
        <div className="mb-8">
          <h3 className="font-bold text-navy mb-3 flex items-center gap-2">
            <Timer size={20} className="text-teal" /> Tiempo restante para tu examen
          </h3>
          <div className="flex gap-4">
            <div className="flex-1 bg-white border-2 border-navy rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
              <span className="text-3xl font-black text-navy">{userProfile.testDate ? userProfile.timeLeftMonths : '-'}</span>
              <span className="text-xs text-teal font-medium mt-1">Meses</span>
            </div>
            <div className="flex-1 bg-white border border-sky-blue/20 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm">
              <span className="text-2xl font-bold text-navy">{userProfile.testDate ? (userProfile.timeLeftDays || 0) : '-'}</span>
              <span className="text-xs text-teal font-medium mt-1">Días</span>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-white p-6 rounded-2xl border border-sky-blue/20 shadow-sm">
          <h3 className="font-bold text-navy mb-3 flex items-center gap-2">
            <Zap size={20} className="text-teal" /> Intensidad Recomendada
          </h3>
          <p className="text-xs text-teal/80 mb-4">Calculada según el tiempo restante. Podrás ajustarla luego en tu perfil.</p>
          <div className="relative mb-6">
            <div className="h-2 bg-sky-blue/20 rounded-full absolute top-1/2 -translate-y-1/2 left-0 right-0"></div>
            <div
              className="h-2 bg-navy rounded-full absolute top-1/2 -translate-y-1/2 left-0 transition-all duration-300"
              style={{ width: `${((userProfile.intensity - 1) / 3) * 100}%` }}
            ></div>
            <div className="flex justify-between relative z-10">
              {[1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${userProfile.intensity >= level ? 'bg-navy border-white shadow-md' : 'bg-white border-sky-blue/20'}`}
                />
              ))}
            </div>
          </div>
          <div className="text-center">
            <h4 className="font-bold text-navy">{intensityLabels[userProfile.intensity].title}</h4>
            <p className="text-xs text-teal mt-1 italic">"{intensityLabels[userProfile.intensity].desc}"</p>
          </div>
        </div>

        <button onClick={() => setScreen('methods')} className="w-full py-4 bg-navy text-white rounded-2xl font-black shadow-lg shadow-navy/20 active:scale-95 transition-all flex items-center justify-center gap-2">
          Continuar <ArrowRight size={20} />
        </button>
      </div>
    );
  };

  const MethodsScreen = () => (
    <div className="p-6 pb-32 bg-beige min-h-screen animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setScreen('home')} className="p-2 text-navy bg-white border border-sky-blue/20 rounded-full"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-bold text-navy">SinPanic0</h2>
      </div>
      <h1 className="text-3xl font-black text-navy text-center mb-2">Planes de Estudio</h1>
      <p className="text-teal text-center text-sm mb-8 px-4">Selecciona el método que mejor se adapte a ti.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STUDY_METHODS.map((m) => (
          <div key={m.id} className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${selectedMethod === m.id ? 'bg-white border-navy shadow-lg scale-102' : 'bg-white border-sky-blue/20 shadow-sm hover:border-teal'}`} onClick={() => setSelectedMethod(m.id)}>
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black text-navy uppercase tracking-widest bg-sky-blue/20 px-2 py-0.5 rounded">{m.tag}</span>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${selectedMethod === m.id ? 'bg-sky-blue/20 text-navy' : 'bg-sky-blue/10 text-teal'}`}>
                  <m.icon size={24} />
                </div>
              </div>
              <h3 className="text-lg font-black text-navy mb-1">{m.title}</h3>
              <p className="text-xs text-teal/85 leading-relaxed mb-4">{m.desc}</p>
            </div>
            <button className={`w-full py-2 rounded-xl text-xs font-black transition-all ${selectedMethod === m.id ? 'bg-navy text-white shadow-md' : 'bg-sky-blue/10 text-teal/50 border border-sky-blue/10'}`}>
              {selectedMethod === m.id ? 'Seleccionado' : 'Seleccionar'}
            </button>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white/90 backdrop-blur-md border-t border-sky-blue/20 z-50">
        <button onClick={() => setScreen('home')} className="w-full py-4 bg-navy text-white rounded-2xl font-black shadow-lg shadow-navy/20 active:scale-95 transition-all">
          Guardar y Volver
        </button>
      </div>
    </div>
  );

  const HomeScreen = () => (
    <div className="p-5 pb-24 bg-beige min-h-screen animate-fade-in">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-navy text-white rounded-xl flex items-center justify-center shadow-lg shadow-navy/10 animate-scale-up">
            <BookOpen size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-navy leading-none">SinPanic0</h2>
            <span className="text-[10px] font-bold text-teal tracking-wide">PANEL DE ESTUDIANTE</span>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-beige border border-sky-blue/30 px-3 py-2 rounded-xl shadow-sm">
          <div className="flex items-center gap-1 text-orange-500 font-bold text-sm">
            <Flame size={18} className="fill-orange-500 text-orange-500" />
            <span>{userProfile.streak || 0}</span>
          </div>
          <div className="w-px h-4 bg-sky-blue/40"></div>
          <div className="flex items-center gap-1 text-teal font-bold text-sm">
            <Zap size={18} className="fill-teal/10 text-teal" />
            <span>{userProfile.knowledgePoints || 0} KP</span>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-br from-[#C85A28] via-[#E67E22] to-[#C84B1A] rounded-3xl p-7 text-white mb-8 shadow-lg relative overflow-hidden animate-fade-in">
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Versículo del día</span>
          <h3 className="text-xl font-bold mt-3 leading-snug opacity-95">{dailyVerse.text}</h3>
          <p className="mt-3 text-sm font-semibold opacity-80">{dailyVerse.ref}</p>
        </div>
        <div className="absolute -right-6 -bottom-6 opacity-[0.07]"><BookOpen size={130} strokeWidth={1} /></div>
      </div>

      {/* TARJETA INTERACTIVA DE LA MASCOTA CHIGÜIRO */}
      <div className="bg-white dark:bg-[#241A12] p-5 rounded-3xl border border-[#EADBC8] dark:border-[#3A2A1E] shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 ios-shadow">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <CapybaraMascot equippedItems={equippedItems} customName={capybaraName} size="md" />
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C85A28]/10 text-[#C85A28] dark:text-[#F4A261] rounded-full text-[10px] font-black uppercase mb-1">
              <Sparkles size={12} /> Mascota de Estudio
            </div>
            <h3 className="text-lg font-black text-navy leading-snug">{capybaraName}</h3>
            <p className="text-xs text-teal mt-1 max-w-xs font-medium leading-relaxed">
              Toca a tu mascota para escuchar sus consejos. ¡Usa tus puntos KP para comprarle ropa y accesorios!
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCapybaraShopOpen(true)}
          className="px-5 py-3.5 bg-[#C85A28] hover:bg-[#B04A1F] text-white font-black rounded-2xl shadow-md active:scale-95 transition-all text-xs flex items-center justify-center gap-2 shrink-0 w-full sm:w-auto"
        >
          <Crown size={16} /> Tienda & Armario ({userProfile.knowledgePoints || 0} KP)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {(() => {
          const currentMethod = STUDY_METHODS.find(m => m.id === selectedMethod);
          const MethodIcon = currentMethod?.icon;
          return (
            <div className="bg-[#F5EFEB] p-5 rounded-2xl border border-sky-blue/20 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black text-teal uppercase tracking-widest">Tu Plan de Estudio</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white text-navy rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-sky-blue/20">
                  {MethodIcon && <MethodIcon size={24} />}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-black text-navy">{currentMethod?.title}</h3>
                  <p className="text-xs text-teal mt-1 line-clamp-2">{currentMethod?.desc}</p>
                </div>
              </div>
            </div>
          );
        })()}

        {(() => {
          const goalMinutes = [30, 60, 120, 180][userProfile.intensity - 1] || 60;
          const progressPercentage = Math.min(100, (activeTimeMinutes / goalMinutes) * 100);
          return (
            <div className="bg-white p-5 rounded-2xl border border-sky-blue/20 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black text-teal uppercase tracking-widest flex items-center gap-1"><Timer size={14} /> Meta Diaria de Estudio</span>
                <span className="text-xs font-black text-navy">{activeTimeMinutes} / {goalMinutes} min</span>
              </div>
              <div className="w-full bg-sky-blue/20 h-2.5 rounded-full overflow-hidden mb-3">
                <div className="bg-teal h-full rounded-full transition-all duration-1000" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              {progressPercentage >= 100 ? (
                <p className="text-xs font-bold text-navy flex items-center gap-1"><CheckCircle2 size={14} className="text-teal" /> ¡Felicidades! Meta completada.</p>
              ) : (
                <p className="text-xs font-medium text-teal/70">Sigue usando la app para registrar tu estudio.</p>
              )}
            </div>
          );
        })()}
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black text-navy text-xl">Tus Materias</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUBJECTS.map((sub, idx) => {
          const completedCount = getSubjectCompletedCount(sub.id);
          const cardBg = idx % 2 === 0 ? 'bg-white' : 'bg-[#F5EFEB]';
          return (
            <div key={sub.id} onClick={() => { setSelectedSubject(sub); setScreen('subject'); }} className={`${cardBg} p-5 rounded-2xl border border-sky-blue/20 shadow-sm flex items-center gap-4 active:scale-98 transition-all cursor-pointer hover:shadow-md group ios-card`}>
              <div className="w-14 h-14 bg-sky-blue/20 text-navy rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shrink-0"><sub.icon size={28} /></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-navy text-base truncate">{sub.name}</h4>
                <p className="text-xs text-teal font-semibold mt-1">{completedCount} de {sub.total} completados</p>
              </div>
              <ChevronRight size={20} className="text-teal/60" />
            </div>
          );
        })}
      </div>
    </div>
  );

  const SubjectScreen = () => (
    <div className="p-6 pb-24 bg-beige min-h-screen animate-fade-in">
      <header className="flex justify-between items-center mb-8">
        <button onClick={() => setScreen('home')} className="p-2 text-navy bg-white border border-sky-blue/20 shadow-sm rounded-full"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-black text-navy">{selectedSubject?.name}</h2>
        <div className="w-10"></div>
      </header>
      <div className="bg-white p-6 rounded-2xl border border-sky-blue/20 flex items-center gap-4 mb-8 shadow-sm">
        <div className="w-16 h-16 bg-sky-blue/20 text-navy rounded-2xl flex items-center justify-center shadow-sm">
          {selectedSubject?.icon && <selectedSubject.icon size={32} />}
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-teal font-black uppercase tracking-widest mb-1">Progreso Semanal</p>
          <h3 className="text-2xl font-black text-navy">{getSubjectCompletedCount(selectedSubject?.id)} / {selectedSubject?.total}</h3>
          <p className="text-xs font-semibold text-teal/80 mt-1">Pruebas realizadas</p>
        </div>
      </div>

      <h3 className="font-black text-navy text-xl mb-4">Exámenes Principales</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {!diagnosticCompleted[selectedSubject?.id]?.completedToday && (
          <div className="bg-white p-5 rounded-2xl border border-sky-blue/20 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black text-teal uppercase tracking-widest">Diagnóstico Diario</span>
                <span className="text-xs text-navy font-bold flex items-center gap-1"><Clock size={12} /> 15 min</span>
              </div>
              <h4 className="text-lg font-black text-navy mb-1">Examen Diagnóstico</h4>
              <p className="text-sm text-teal mb-4">Identifica tus falencias de hoy para generar tus prácticas personalizadas.</p>
            </div>
            <button onClick={() => startExam(selectedSubject, 'diagnostic')} className="w-full py-3 bg-navy text-white rounded-xl font-bold active:scale-95 transition-all hover:bg-navy/90 shadow-md">
              Comenzar Diagnóstico
            </button>
          </div>
        )}

        {(() => {
          const todayStr = getTodayString();
          const todayProgress = practiceProgress[todayStr]?.[selectedSubject?.id] || { practice_1: false, practice_2: false, practice_3: false, practice_4: false, practice_5: false };
          const isDiagDoneToday = diagnosticCompleted[selectedSubject?.id]?.completedToday;

          return (
            <>
              {!todayProgress.practice_1 && (
                <div className={`bg-white p-5 rounded-2xl border flex flex-col justify-between ${isDiagDoneToday ? 'border-sky-blue/40 shadow-sm' : 'border-sky-blue/20 opacity-60'} transition-all`}>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isDiagDoneToday ? 'text-teal' : 'text-teal/40'}`}>Práctica</span>
                      <span className={`text-xs font-bold flex items-center gap-1 ${isDiagDoneToday ? 'text-navy' : 'text-teal/40'}`}>
                        <Clock size={12} /> 10 min
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-navy mb-1 flex items-center gap-2">
                      Examen de Práctica 1 {!isDiagDoneToday && <Lock size={16} className="text-teal/50" />}
                    </h4>
                    <p className="text-sm text-teal/80 mb-4">10 preguntas enfocadas en tus áreas débiles detectadas.</p>
                  </div>
                  <button
                    disabled={!isDiagDoneToday}
                    onClick={() => startExam(selectedSubject, 'practice', 'practice_1')}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${isDiagDoneToday ? 'bg-navy text-white shadow-md active:scale-95 hover:bg-navy/90' : 'bg-sky-blue/10 text-teal/50 cursor-not-allowed border border-sky-blue/10'}`}>
                    {isDiagDoneToday ? 'Iniciar Práctica 1' : 'Bloqueado (Haz el diagnóstico)'}
                  </button>
                </div>
              )}

              {!todayProgress.practice_2 && (
                <div className={`bg-white p-5 rounded-2xl border flex flex-col justify-between ${isDiagDoneToday ? 'border-sky-blue/40 shadow-sm' : 'border-sky-blue/20 opacity-60'} transition-all`}>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isDiagDoneToday ? 'text-teal' : 'text-teal/40'}`}>Práctica</span>
                      <span className={`text-xs font-bold flex items-center gap-1 ${isDiagDoneToday ? 'text-navy' : 'text-teal/40'}`}>
                        <Clock size={12} /> 10 min
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-navy mb-1 flex items-center gap-2">
                      Examen de Práctica 2 {!isDiagDoneToday && <Lock size={16} className="text-teal/50" />}
                    </h4>
                    <p className="text-sm text-teal/80 mb-4">Refuerza tus conocimientos con un segundo set de preguntas.</p>
                  </div>
                  <button
                    disabled={!isDiagDoneToday}
                    onClick={() => startExam(selectedSubject, 'practice', 'practice_2')}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${isDiagDoneToday ? 'bg-navy text-white shadow-md active:scale-95 hover:bg-navy/90' : 'bg-sky-blue/10 text-teal/50 cursor-not-allowed border border-sky-blue/10'}`}>
                    {isDiagDoneToday ? 'Iniciar Práctica 2' : 'Bloqueado (Haz el diagnóstico)'}
                  </button>
                </div>
              )}
            </>
          );
        })()}
      </div>

      {/* SECCIÓN EXTRAS DE REFUERZO DE ERRORES */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-black text-navy text-xl flex items-center gap-2">
          🎯 Refuerzo de Errores Extra
        </h3>
        <span className="text-xs font-bold text-teal bg-sky-blue/20 px-3 py-1 rounded-full">3 Exámenes Exclusivos</span>
      </div>

      {(() => {
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {extraExams.map((exam) => {
              const isCompleted = todayProgress[exam.id];
              return (
                <div key={exam.id} className={`bg-white p-5 rounded-2xl border flex flex-col justify-between ${isUnlocked ? 'border-purple-300 shadow-md' : 'border-sky-blue/20 opacity-60'} transition-all`}>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isUnlocked ? 'text-purple-600' : 'text-teal/40'}`}>Refuerzo de Errores</span>
                      <span className="text-xs font-bold text-navy flex items-center gap-1"><Clock size={12} /> 10 min</span>
                    </div>
                    <h4 className="text-base font-black text-navy mb-1 flex items-center gap-2">
                      {exam.title} {!isUnlocked && <Lock size={16} className="text-teal/50" />}
                    </h4>
                    <p className="text-xs text-teal/80 leading-relaxed mb-4">{exam.desc}</p>
                  </div>
                  {isCompleted ? (
                    <div className="w-full py-3 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl font-bold text-center text-sm">
                      ✓ Completado
                    </div>
                  ) : (
                    <button
                      disabled={!isUnlocked}
                      onClick={() => startExam(selectedSubject, 'practice', exam.id)}
                      className={`w-full py-3 rounded-xl font-bold transition-all ${isUnlocked ? 'bg-purple-600 text-white shadow-md active:scale-95 hover:bg-purple-700' : 'bg-sky-blue/10 text-teal/50 cursor-not-allowed border border-sky-blue/10'}`}
                    >
                      {isUnlocked ? `Iniciar Refuerzo #${exam.num}` : '🔒 Bloqueado (Completa Prácticas 1 y 2)'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        );
      })()}
    </div>
  );



  const ExamResultsScreen = () => {
    const questions = activeQuestions || [];
    const totalQ = questions.length || 10;
    const percentage = Math.round((score / Math.max(totalQ, 1)) * 100);

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
      <div className="min-h-screen bg-beige flex flex-col items-center p-6 text-center pb-28 relative overflow-y-auto animate-fade-in font-sans">
        <div className="w-32 h-32 relative flex items-center justify-center mb-4 mt-6 animate-scale-up">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" stroke="#C8D9E6" strokeWidth="8" fill="transparent" strokeOpacity="0.3" />
            <circle cx="60" cy="60" r="50" stroke="#2F4156" strokeWidth="8" fill="transparent" strokeDasharray="314.16" strokeDashoffset={314.16 - (314.16 * percentage) / 100} strokeLinecap="round" />
          </svg>
          <span className="text-3xl font-black text-navy z-10">{percentage}%</span>
        </div>

        <h2 className="text-3xl font-black text-navy mb-1">¡Examen Finalizado!</h2>
        <p className="text-teal mb-6 font-semibold text-sm">Acertaste {score} de {totalQ} preguntas de {selectedSubject?.name || 'la materia'}.</p>

        {/* Tarjeta de la Mascota Animada en Resultados estilo Duolingo */}
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
          <div className="bg-white p-6 rounded-2xl border border-sky-blue/20 max-w-md w-full mb-6 text-left relative shadow-sm">
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center shadow-lg"><Lightbulb size={24} /></div>
            <h3 className="font-black text-navy mb-2 text-base">Método Recomendado para ti</h3>
            <p className="text-xs text-teal leading-relaxed mb-4">{recommendation}</p>
            <div className="flex items-center gap-2 bg-sky-blue/15 p-3 rounded-xl border border-sky-blue/20 font-bold text-sm text-navy">
              {currentMethodInfo && <currentMethodInfo.icon size={20} className="text-teal" />} Hemos configurado tu plan a {currentMethodInfo?.title}.
            </div>
          </div>
        )}

        <button onClick={() => setScreen('subject')} className="w-full max-w-md py-4 bg-[#C85A28] hover:bg-[#C84B1A] text-white rounded-2xl font-black shadow-lg shadow-orange-200 active:scale-95 transition-all fixed bottom-6 left-1/2 -translate-x-1/2 z-10">
          Continuar Estudiando
        </button>
      </div>
    );
  };

  const CalendarScreen = () => {
    const today = new Date();
    const [displayDate, setDisplayDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const currentMonth = displayDate.getMonth();
    const currentYear = displayDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday

    // Días del mes anterior para rellenar
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => prevMonthDays - firstDayOfMonth + i + 1);

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Días del próximo mes para rellenar (completar la cuadrícula a 42 celdas)
    const totalCells = blanks.length + days.length;
    const nextBlanks = Array.from({ length: 42 - totalCells }, (_, i) => i + 1);

    const getDayColorClass = (day, dateStr) => {
      const dayData = practiceProgress[dateStr];
      const isPastOrToday = new Date(currentYear, currentMonth, day) <= today;

      if (!isPastOrToday) return "bg-sky-blue/10 text-teal/40 border-transparent";

      if (!dayData) {
        if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
          return "bg-white text-navy border-2 border-red-400 font-extrabold";
        }
        return "bg-red-500 text-white font-bold shadow-sm border-transparent";
      }

      let totalCompleted = 0;
      SUBJECTS.forEach(sub => {
        if (dayData[sub.id]?.practice_1) totalCompleted++;
        if (dayData[sub.id]?.practice_2) totalCompleted++;
      });

      if (totalCompleted === 10) return "bg-navy text-white font-bold shadow-sm border-transparent";
      if (totalCompleted >= 5) return "bg-teal text-white font-bold shadow-sm border-transparent";
      return "bg-red-500 text-white font-bold shadow-sm border-transparent";
    };

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    const handlePrevMonth = () => {
      setDisplayDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
      setDisplayDate(new Date(currentYear, currentMonth + 1, 1));
    };

    return (
      <div className="p-6 pb-24 bg-beige min-h-screen animate-fade-in">
        <header className="flex justify-between items-center mb-8">
          <button onClick={() => setScreen('home')} className="w-11 h-11 rounded-full bg-white shadow-sm text-navy flex items-center justify-center border border-sky-blue/20">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-black text-navy">Tu Calendario</h2>
          <div className="w-11 h-11" />
        </header>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-sky-blue/15 animate-scale-up">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-black text-navy capitalize">{monthNames[currentMonth]} {currentYear}</h3>
            <div className="flex gap-2">
              <button onClick={handlePrevMonth} className="p-2 bg-beige text-teal rounded-xl hover:bg-sky-blue/10 transition-colors"><ChevronLeft size={20} /></button>
              <button onClick={handleNextMonth} className="p-2 bg-beige text-teal rounded-xl hover:bg-sky-blue/10 transition-colors"><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map(day => (
              <div key={day} className="text-center text-[10px] font-black text-teal uppercase tracking-widest">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {blanks.map((day, idx) => (
              <div key={`prev - ${idx}`} className="h-10 rounded-xl flex items-center justify-center text-sm text-teal/30 bg-transparent">
                {day}
              </div>
            ))}
            {days.map(day => {
              const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const bgClass = getDayColorClass(day, dateStr);

              return (
                <button
                  key={day}
                  onClick={() => setSelectedCalendarDay(dateStr)}
                  className={`h-10 rounded-xl flex items-center justify-center text-sm border cursor-pointer transition-all ${bgClass} ios-card`}
                >
                  {day}
                </button>
              );
            })}
            {nextBlanks.map((day, idx) => (
              <div key={`next - ${idx}`} className="h-10 rounded-xl flex items-center justify-center text-sm text-teal/30 bg-transparent">
                {day}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-sky-blue/10 pt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-navy"></div>
              <span className="text-xs font-semibold text-teal">10 Pruebas Completadas (Excelente)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal"></div>
              <span className="text-xs font-semibold text-teal">Mitad o más Completadas (Regular)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs font-semibold text-teal">Pocas o Ninguna Completada (Crítico)</span>
            </div>
          </div>
        </div>

        {selectedCalendarDay && (
          <div className="fixed inset-0 bg-navy/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 relative shadow-xl border border-sky-blue/20">
              <button onClick={() => setSelectedCalendarDay(null)} className="absolute top-4 right-4 p-2 text-teal hover:text-navy bg-beige rounded-full">
                <X size={20} />
              </button>
              <h3 className="text-xl font-black text-navy mb-6">Desempeño del Día</h3>
              <div className="space-y-3">
                {SUBJECTS.filter(sub => {
                  const dayData = practiceProgress[selectedCalendarDay]?.[sub.id] || {};
                  return dayData.practice_1 || dayData.practice_2;
                }).length > 0 ? (
                  SUBJECTS.filter(sub => {
                    const dayData = practiceProgress[selectedCalendarDay]?.[sub.id] || {};
                    return dayData.practice_1 || dayData.practice_2;
                  }).map(sub => {
                    const dayData = practiceProgress[selectedCalendarDay]?.[sub.id];
                    return (
                      <div key={sub.id} className="flex items-center justify-between p-3 bg-beige/40 rounded-xl border border-sky-blue/10">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-sky-blue/20 text-navy flex items-center justify-center">
                            <sub.icon size={16} />
                          </div>
                          <span className="font-bold text-sm text-navy">{sub.name}</span>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-[10px] font-black uppercase ${dayData.practice_1 ? 'text-teal' : 'text-teal/40'}`}>P1: {dayData.practice_1 ? 'Terminada' : 'Pendiente'}</span>
                          <span className={`text-[10px] font-black uppercase ${dayData.practice_2 ? 'text-teal' : 'text-teal/40'}`}>P2: {dayData.practice_2 ? 'Terminada' : 'Pendiente'}</span>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center p-6 bg-beige/20 rounded-xl border border-sky-blue/10">
                    <p className="text-sm font-bold text-teal">Ninguna materia terminada este día.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ProfileScreen = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [localPetName, setLocalPetName] = useState(capybaraName);

    useEffect(() => {
      setLocalPetName(capybaraName);
    }, [capybaraName]);

    // Cropper States
    const [cropImageSrc, setCropImageSrc] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleAvatarChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 2.5 * 1024 * 1024) {
          alert("La imagen es muy grande. Elige una menor a 2.5MB.");
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setCropImageSrc(reader.result);
          setZoom(1);
          setOffset({ x: 0, y: 0 });
        };
        reader.readAsDataURL(file);
      }
    };

    const handleStart = (e) => {
      setIsDragging(true);
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setDragStart({ x: clientX - offset.x, y: clientY - offset.y });
    };

    const handleMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setOffset({
        x: clientX - dragStart.x,
        y: clientY - dragStart.y
      });
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    const handleSaveCrop = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 300, 300);

        ctx.translate(150, 150);
        ctx.scale(zoom, zoom);
        const scaleRatio = 300 / 224; // Canvas (300) / Circle preview (224)
        ctx.translate((offset.x * scaleRatio) / zoom, (offset.y * scaleRatio) / zoom);

        const imgRatio = img.width / img.height;
        let drawWidth = 300;
        let drawHeight = 300;
        if (imgRatio > 1) {
          drawHeight = 300 / imgRatio;
        } else {
          drawWidth = 300 * imgRatio;
        }

        ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);

        const croppedBase64 = canvas.toDataURL('image/jpeg', 0.95);
        setProfilePic(croppedBase64);
        window.localStorage.setItem(`sinpanico_avatar_${userId}`, croppedBase64);
        if (userId) {
          supabase.from('user_profiles').update({
            profile_pic: croppedBase64
          }).eq('user_id', userId).then(() => { }).catch(e => console.error("Error guardando avatar en DB:", e));
        }
        setCropImageSrc(null);
      };
      img.src = cropImageSrc;
    };

    return (
      <div className="p-6 pb-32 bg-beige min-h-screen relative animate-fade-in">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-navy">Perfil</h2>
          <button onClick={() => setShowSettings(!showSettings)} className="p-2 text-teal hover:text-navy transition-colors bg-white rounded-full shadow-sm border border-sky-blue/20">
            <Settings size={22} />
          </button>
        </header>

        {showSettings && (
          <div className="settings-dropdown absolute top-20 right-6 bg-white border border-sky-blue/30 shadow-xl rounded-2xl p-2 z-50 w-48 animate-in fade-in slide-in-from-top-2">
            <button
              onClick={() => {
                setShowSettings(false);
                setShowLanguageModal(true);
              }}
              className="w-full text-left px-4 py-3 text-sm font-bold text-teal hover:bg-beige/50 rounded-xl flex items-center gap-3"
            >
              <Globe size={16} className="text-navy" /> {t('idioma')}
            </button>
            <button className="w-full text-left px-4 py-3 text-sm font-bold text-teal hover:bg-beige/50 rounded-xl flex items-center gap-3 mt-1">
              <Info size={16} className="text-navy" /> {t('ayuda')}
            </button>
            <button
              onClick={async () => {
                try {
                  await supabase.auth.signOut();
                } catch (err) {
                  console.error("Signout error:", err);
                }
                window.localStorage.removeItem('sinpanico_user_id');
                window.localStorage.removeItem('sinpanico_screen');
                setEquippedItems({ hat: 'hat_grad' });
                setPurchasedItems(['hat_grad']);
                setCapybaraName('Chigüiro Sabio');
                setUserId(null);
                setSession(null);
                setScreen('welcome');
              }}
              className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-3 mt-1"
            >
              <LogOut size={16} /> {t('logout')}
            </button>
          </div>
        )}

        <div className="flex flex-col items-center mb-10">
          <div
            onClick={() => document.getElementById('avatar-upload').click()}
            className="w-24 h-24 rounded-full bg-sky-blue/30 border-4 border-white shadow-lg flex items-center justify-center mb-4 relative cursor-pointer hover:scale-105 transition-all group overflow-hidden"
          >
            {profilePic ? (
              <img src={profilePic} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={40} className="text-teal" />
            )}
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-navy text-white rounded-full border-2 border-white flex items-center justify-center shadow-md z-10">
              <span className="text-xs font-black">11°</span>
            </div>
            <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-black uppercase">
              Cambiar
            </div>
          </div>
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <h2 className="text-2xl font-black text-navy">{userProfile.full_name || 'Estudiante'}</h2>
          <p className="text-teal font-bold text-sm">{t('meta_score')}</p>
          <p className="text-teal/75 text-xs mt-1">{t('user_level')}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-sky-blue/20 shadow-sm flex flex-col items-center text-center">
            <Flame size={28} className="text-orange-500 mb-2 fill-orange-500/20" />
            <span className="text-[10px] font-black text-teal uppercase tracking-widest mb-1">{t('streak')}</span>
            <span className="text-2xl font-black text-navy">{userProfile.streak} {t('days')}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-sky-blue/20 shadow-sm flex flex-col items-center text-center">
            <Clock size={28} className="text-teal mb-2" />
            <span className="text-[10px] font-black text-teal uppercase tracking-widest mb-1">{t('total')}</span>
            <span className="text-2xl font-black text-navy">{userProfile.totalHoursStudied}{t('hours')}</span>
          </div>
        </div>

        {/* MASCOTA CHIGÜIRO Y ARMADURA DE PUNTOS EN PERFIL */}
        <div className="bg-white dark:bg-[#241A12] p-5 rounded-3xl border border-[#EADBC8] dark:border-[#3A2A1E] shadow-sm mb-10 flex flex-col sm:flex-row items-center justify-between gap-5 ios-shadow">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <CapybaraMascot equippedItems={equippedItems} customName={capybaraName} size="md" />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C85A28]/10 text-[#C85A28] dark:text-[#F4A261] rounded-full text-[10px] font-black uppercase mb-1">
                <Sparkles size={12} /> Tu Mascota
              </div>
              <h3 className="text-lg font-black text-navy leading-snug">{capybaraName}</h3>
              <p className="text-xs text-teal font-semibold mt-1">
                {userProfile.knowledgePoints || 0} Puntos KP acumulados
              </p>

              {/* Formulario para modificar el nombre exclusivo de tu mascota */}
              <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start">
                <input
                  type="text"
                  value={localPetName}
                  onChange={(e) => setLocalPetName(e.target.value)}
                  placeholder="Nombre de tu mascota"
                  className="px-3 py-1.5 bg-[#FAF4EE] dark:bg-[#18110C] border border-[#EADBC8] dark:border-[#3A2A1E] rounded-xl text-xs font-bold text-navy focus:outline-none focus:ring-2 focus:ring-[#C85A28] w-36"
                />
                <button
                  onClick={() => handleUpdateCapybaraName(localPetName)}
                  className="px-3 py-1.5 bg-[#C85A28] text-white text-[11px] font-black rounded-xl hover:bg-[#B04A1F] transition-all shadow-sm active:scale-95 shrink-0"
                >
                  Guardar Nombre
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsCapybaraShopOpen(true)}
            className="px-5 py-3.5 bg-[#C85A28] hover:bg-[#B04A1F] text-white font-black rounded-2xl shadow-md active:scale-95 transition-all text-xs flex items-center justify-center gap-2 shrink-0 w-full sm:w-auto"
          >
            <ShoppingBag size={16} /> Abrir Tienda del Chigüiro
          </button>
        </div>

        <h3 className="text-xs font-black text-teal uppercase tracking-widest mb-4">{t('account_config')}</h3>
        <div className="bg-white rounded-2xl border border-sky-blue/20 shadow-sm overflow-hidden">
          <button onClick={() => setScreen('personal_info')} className="w-full p-5 flex items-center justify-between border-b border-sky-blue/10 hover:bg-beige/40 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-sky-blue/20 text-navy rounded-xl flex items-center justify-center"><User size={20} /></div>
              <span className="font-bold text-navy text-sm">{(t('personal_info'))}</span>
            </div>
            <ChevronRight size={20} className="text-teal/600" />
          </button>
          <button onClick={() => setScreen('methods')} className="w-full p-5 flex items-center justify-between border-b border-sky-blue/10 hover:bg-beige/40 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-sky-blue/20 text-navy rounded-xl flex items-center justify-center"><Brain size={20} /></div>
              <div className="text-left">
                <span className="font-bold text-navy text-sm block">{t('methods')}</span>
                <span className="text-xs text-teal">{STUDY_METHODS.find(m => m.id === selectedMethod)?.title}</span>
              </div>
            </div>
            <ChevronRight size={20} className="text-teal/600" />
          </button>
          <button onClick={() => setScreen('intensity_config')} className="w-full p-5 flex items-center justify-between border-b border-sky-blue/10 hover:bg-beige/40 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-sky-blue/20 text-navy rounded-xl flex items-center justify-center"><Zap size={20} /></div>
              <span className="font-bold text-navy text-sm">{t('intensity_config')}</span>
            </div>
            <ChevronRight size={20} className="text-teal/600" />
          </button>
          <button onClick={() => setScreen('calendar')} className="w-full p-5 flex items-center justify-between hover:bg-beige/40 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-sky-blue/20 text-navy rounded-xl flex items-center justify-center"><CalendarIcon size={20} /></div>
              <span className="font-bold text-navy text-sm">{t('calendar_prefs')}</span>
            </div>
            <ChevronRight size={20} className="text-teal/600" />
          </button>
          <button onClick={toggleDarkMode} className="w-full p-5 flex items-center justify-between hover:bg-beige/40 transition-colors border-t border-sky-blue/10">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 ${darkMode ? 'bg-navy text-sky-blue' : 'bg-sky-blue/20 text-teal'} rounded-xl flex items-center justify-center transition-colors`}>
                <Moon size={20} />
              </div>
              <span className="font-bold text-navy text-sm">{darkMode ? t('darkmode_des') : t('darkmode_act')}</span>
            </div>
            <div className={`w-10 h-6 rounded-full relative transition-colors ${darkMode ? 'bg-navy' : 'bg-sky-blue/40'}`}>
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-1'}`} />
            </div>
          </button>
        </div>

        {/* Cropper Modal estilo Instagram */}
        {cropImageSrc && (
          <div className="fixed inset-0 bg-navy/85 z-[100] flex flex-col items-center justify-center p-6 backdrop-blur-md animate-fade-in">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm flex flex-col items-center shadow-2xl border border-sky-blue/20">
              <h3 className="text-lg font-black text-navy mb-2">Editar Foto de Perfil</h3>
              <p className="text-xs text-teal/80 mb-6 text-center font-medium">Arrastra para mover y usa el control para ampliar</p>

              <div
                className="w-56 h-56 rounded-full overflow-hidden relative border-4 border-sky-blue/30 bg-slate-50 shadow-inner cursor-move select-none flex items-center justify-center mb-6"
                onMouseDown={handleStart}
                onMouseMove={handleMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
              >
                <img
                  src={cropImageSrc}
                  alt="Ajustar"
                  className="pointer-events-none max-w-none origin-center"
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>

              <div className="w-full mb-6">
                <div className="flex justify-between text-[10px] font-black text-teal uppercase tracking-widest mb-2">
                  <span>Zoom</span>
                  <span>{Math.round(zoom * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full accent-navy cursor-pointer"
                />
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setCropImageSrc(null)}
                  className="flex-1 py-3 border border-sky-blue/30 text-navy font-bold rounded-xl active:scale-95 transition-all text-sm bg-white hover:bg-beige/20"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveCrop}
                  className="flex-1 py-3 bg-navy text-white font-black rounded-xl active:scale-95 transition-all text-sm shadow-md"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Selección de Idioma */}
        {showLanguageModal && (
          <div className="fixed inset-0 bg-navy/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 relative shadow-xl border border-sky-blue/20">
              <button
                onClick={() => setShowLanguageModal(false)}
                className="absolute top-4 right-4 p-2 text-teal hover:text-navy bg-beige rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-black text-navy mb-6">{t('select_language_title')}</h3>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { code: 'es', name: 'Español', flag: '🇪🇸' },
                  { code: 'en', name: 'English', flag: '🇺🇸' },
                  { code: 'pt', name: 'Português', flag: '🇧🇷' },
                  { code: 'fr', name: 'Français', flag: '🇫🇷' },
                  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
                  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
                ].map((lang) => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setShowLanguageModal(false);
                      }}
                      className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all hover:scale-[1.02] ${isSelected
                        ? 'border-teal bg-sky-blue/20 font-black text-navy shadow-sm'
                        : 'border-sky-blue/20 bg-white hover:bg-beige/40 text-teal font-semibold'
                        }`}
                    >
                      <span className="flex items-center gap-3 text-sm">
                        <span className="text-xl">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-teal text-white flex items-center justify-center">
                          <Check size={12} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const showNav = !['welcome', 'auth_login', 'auth_signup', 'onboarding', 'methods', 'exam', 'exam_results'].includes(screen);

  return (
    <div className="min-h-screen bg-beige text-navy font-sans antialiased selection:bg-sky-blue/50">
      {globalError && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-red-600 text-white p-4 text-xs font-mono break-words whitespace-pre-wrap flex justify-between items-center shadow-lg">
          <span>{globalError}</span>
          <button onClick={() => setGlobalError(null)} className="ml-4 underline font-bold bg-white/20 px-2 py-1 rounded">Cerrar</button>
        </div>
      )}

      <div className={`flex ${!isMobile && showNav ? 'flex-row' : 'flex-col'} min-h-screen`}>
        {/* Sidebar Navigation for Desktop */}
        {!isMobile && showNav && <SideNav />}

        {/* Content Container */}
        <div className={`flex-1 flex flex-col ${!isMobile && showNav ? 'md:pl-64' : ''}`}>
          <div className={`flex-grow w-full ${isMobile ? 'max-w-md mx-auto bg-beige min-h-screen shadow-xl relative pb-20' : 'max-w-6xl mx-auto p-8'}`}>
            <main className="h-full w-full animate-fade-in" key={screen}>
              {screen === 'welcome' && <WelcomeScreen />}
              {screen === 'auth_login' && <AuthScreen initialMode="login" />}
              {screen === 'auth_signup' && <AuthScreen initialMode="signup" />}
              {screen === 'onboarding' && <OnboardingScreen />}
              {screen === 'methods' && <MethodsScreen />}
              {screen === 'home' && <HomeScreen />}
              {screen === 'temarios' && (
                <SyllabusScreen
                  setScreen={setScreen}
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                />
              )}
              {screen === 'subject' && <SubjectScreen />}
              {screen === 'exam' && (
                <ExamScreen
                  selectedSubject={selectedSubject}
                  examMode={examMode}
                  examId={examId}
                  activeQuestions={activeQuestions}
                  isFetchingExam={isFetchingExam}
                  score={score}
                  setScore={setScore}
                  userId={userId}
                  failedCategories={failedCategories}
                  setFailedCategories={setFailedCategories}
                  diagnosticCompleted={diagnosticCompleted}
                  setDiagnosticCompleted={setDiagnosticCompleted}
                  practiceProgress={practiceProgress}
                  setPracticeProgress={setPracticeProgress}
                  selectedMethod={selectedMethod}
                  setSelectedMethod={setSelectedMethod}
                  setScreen={setScreen}
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                  setGlobalError={setGlobalError}
                  currentQIndex={currentQIndex}
                  setCurrentQIndex={setCurrentQIndex}
                  hasChecked={hasChecked}
                  setHasChecked={setHasChecked}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  dailyPointsMap={dailyPointsMap}
                  setDailyPointsMap={setDailyPointsMap}
                  STUDY_METHODS={STUDY_METHODS}
                  equippedItems={equippedItems}
                  capybaraName={capybaraName}
                />
              )}
              {screen === 'exam_results' && <ExamResultsScreen />}
              {screen === 'calendar' && <CalendarScreen />}
              {screen === 'progress' && (
                <ProgressScreen
                  userProfile={userProfile}
                  diagnosticCompleted={diagnosticCompleted}
                  SUBJECTS={SUBJECTS}
                  getSubjectCompletedCount={getSubjectCompletedCount}
                  setScreen={setScreen}
                  dailyPointsMap={dailyPointsMap}
                />
              )}
              {screen === 'profile' && <ProfileScreen />}
              {screen === 'personal_info' && (
                <PersonalInfoScreen
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                  session={session}
                  userId={userId}
                  profileUnlocked={profileUnlocked}
                  setProfileUnlocked={setProfileUnlocked}
                  setScreen={setScreen}
                />
              )}
              {screen === 'intensity_config' && (
                <IntensityScreen
                  userId={userId}
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                  setScreen={setScreen}
                />
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      {isMobile && showNav && <BottomNav />}

      {/* Tutor IA Flotante (Solo visible para usuarios registrados / que iniciaron sesión) */}
      {!['welcome', 'auth_login', 'auth_signup', 'onboarding'].includes(screen) && <AiTutorWidget />}

      {/* Modal de la Tienda y Armario del Chigüiro */}
      <CapybaraShopModal
        isOpen={isCapybaraShopOpen}
        onClose={() => setIsCapybaraShopOpen(false)}
        knowledgePoints={userProfile.knowledgePoints || 0}
        setKnowledgePoints={handleUpdateKnowledgePoints}
        equippedItems={equippedItems}
        setEquippedItems={setEquippedItems}
        purchasedItems={purchasedItems}
        setPurchasedItems={setPurchasedItems}
        customName={capybaraName}
      />
    </div>
  );
};


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
  STUDY_METHODS,
  equippedItems,
  capybaraName
}) => {
  const [timeLeft, setTimeLeft] = useState(examMode === 'diagnostic' ? 15 * 60 : 10 * 60);
  const [optionsRevealed, setOptionsRevealed] = useState(false);
  const [feynmanReflection, setFeynmanReflection] = useState('');
  const [isFailed, setIsFailed] = useState(false);
  const [mascotModal, setMascotModal] = useState({ isOpen: false, type: 'every_3_questions', count: 3, questionNumber: 3 });

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
    return `sm:${s < 10 ? '0' : ''}${s}`.replace('s', m);
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

      const diagPoints = 50;
      const diagTodayPoints = (dailyPointsMap[todayStr] || 0) + diagPoints;
      const diagTotalKP = (userProfile.knowledgePoints || 0) + diagPoints;

      setDailyPointsMap(prev => ({ ...prev, [todayStr]: diagTodayPoints }));
      setUserProfile(prev => ({ ...prev, knowledgePoints: diagTotalKP }));

      if (userId) {
        window.localStorage.setItem(`sinpanico_daily_points_${userId}`, JSON.stringify({ ...dailyPointsMap, [todayStr]: diagTodayPoints }));
        window.localStorage.setItem(`sinpanico_points_${userId}`, diagTotalKP);
        try {
          const { error: dbError } = await supabase.from('user_diagnostics').upsert({
            user_id: userId,
            subject_id: selectedSubject.id,
            completed: true,
            score: score,
            failed_categories: failedCategories[selectedSubject.id] || [],
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id,subject_id' });

          if (dbError) console.error("Error upserting diagnostics:", dbError);

          const { error: profileError } = await supabase.from('user_profiles').update({
            knowledge_points: diagTotalKP,
            daily_points: diagTodayPoints,
            last_points_date: todayStr
          }).eq('user_id', userId);

          if (profileError) {
            console.warn("Advertencia al actualizar puntos en user_profiles (diagnóstico):", profileError);
          }
        } catch (e) {
          console.error("Error guardando diagnóstico en Supabase:", e);
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
        window.localStorage.setItem(`sinpanico_daily_points_${userId}`, JSON.stringify({
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

      // Guardar localmente inmediatamente para asegurar persistencia
      if (userId) {
        window.localStorage.setItem(`sinpanico_points_${userId}`, updatedProfile.knowledgePoints);
      }

      if (userId) {
        try {
          const todayStr2 = getTodayString();
          const { error: practiceError } = await supabase.from('practice_logs').upsert({
            user_id: userId,
            practice_date: todayStr2,
            subject_id: selectedSubject.id,
            practice_1_completed: isFirstPractice ? true : (currentDayProgress?.practice_1 ?? false),
            practice_2_completed: isSecondPractice ? true : false,
            score: score
          }, { onConflict: 'user_id,practice_date,subject_id' });
          if (practiceError) {
            console.error('Error guardando registro de práctica en Supabase:', practiceError);
          }

          const { error: profileError } = await supabase.from('user_profiles').update({
            total_hours_studied: updatedProfile.totalHoursStudied,
            knowledge_points: updatedProfile.knowledgePoints,
            daily_points: todayPoints,
            last_points_date: todayStr2
          }).eq('user_id', userId);

          if (profileError) {
            console.warn('Advertencia al actualizar puntos en user_profiles:', profileError);
            // Fallback: actualizar solo horas estudiadas si faltan columnas en Supabase
            await supabase.from('user_profiles').update({
              total_hours_studied: updatedProfile.totalHoursStudied
            }).eq('user_id', userId).catch(() => { });
          }

        } catch (e) {
          console.error('Error guardando práctica en Supabase:', e);
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
    <div className="min-h-screen bg-beige flex flex-col font-sans animate-fade-in relative">
      {/* Mascot Motivation Modal (Duolingo Style cada 3 preguntas) */}
      <MascotMotivationModal
        isOpen={mascotModal.isOpen}
        onClose={() => setMascotModal({ ...mascotModal, isOpen: false })}
        type={mascotModal.type}
        streakCount={mascotModal.count}
        questionNumber={mascotModal.questionNumber}
        equippedItems={equippedItems}
        customName={capybaraName}
      />
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
            <span className={`text-[11px] font-black tracking-tighter ${timeLeft < 180 ? 'text-red-500 font-extrabold' : 'text-navy'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </header>

      <div className="p-6 flex-1 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-xs font-bold text-teal">{currentQIndex + 1} / {questions.length}</span>
          <div className="flex-1 h-1.5 bg-sky-blue/20 rounded-full overflow-hidden max-w-[200px]">
            <div className="h-full bg-teal rounded-full transition-all" style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}></div>
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
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center ${borderClass} ${bgClass} ${textClass} hover:bg-beige/10 active:scale-[0.99]`}
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
              Fallaste en este concepto. Para asimilarlo de verdad, usa tus propias palabras para explicar por qué la respuesta correcta es la correcta, como si le enseñaras a un niño.
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
              className={`px-8 py-3 rounded-xl font-black transition-all ${selectedOption !== null ? 'bg-navy text-white shadow-md hover:bg-navy/95 active:scale-95' : 'bg-sky-blue/20 text-teal/40'}`}
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
    </div >
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

        <div className="relative w-full" style={{ height: `${SUBJECTS.length * 40 + 20}px` }}>
          <svg viewBox={`0 0 300 ${SUBJECTS.length * 40 + 20}`} className="w-full h-full overflow-visible">
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
                      <g key={`x-${val}`}>
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
                      <g key={`bar-${sub.id}`}>
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
                    <span className="text-xs font-black text-teal">+${pts} pts</span>
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
                <div className="bg-teal h-full rounded-full" style={{ width: `${Math.min(100, (currentScore / maxScore) * 100)}%` }}></div>
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
  const [isCreatingPassword, setIsCreatingPassword] = useState(false);

  const [newName, setNewName] = useState(userProfile.full_name || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loadingName, setLoadingName] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);
  const [msg, setMsg] = useState('');

  const isGoogleUser = session?.user?.app_metadata?.provider === 'google' ||
                       session?.user?.identities?.some(id => id.provider === 'google');

  const [recoverySent, setRecoverySent] = useState(false);

  const handleRecoverPassword = async () => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(session?.user?.email);
      if (error) throw error;
      setRecoverySent(true);
      setAuthError('');
    } catch (err) {
      setAuthError('Error al enviar el correo de recuperación. Intenta más tarde.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      if (isCreatingPassword) {
        if (authPassword.length < 6) throw new Error("La contraseña debe tener al menos 6 caracteres.");
        
        // Timeout para evitar que la promesa se quede colgada
        const updatePromise = supabase.auth.updateUser({ 
          password: authPassword,
          data: { has_local_password: true }
        });
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Tiempo de espera agotado. Intenta de nuevo más tarde.")), 8000));
        
        const { data, error } = await Promise.race([updatePromise, timeoutPromise]);
        
        if (error) throw error;
        setProfileUnlocked(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: session?.user?.email, password: authPassword });
        if (error) throw error;
        setProfileUnlocked(true);
      }
    } catch (err) {
      if (isCreatingPassword) {
        setAuthError(err.message || 'Error al crear la contraseña.');
      } else {
        if (isGoogleUser && err.message?.includes('Invalid login credentials')) {
          setAuthError('Contraseña incorrecta. Si eres usuario de Google y aún no has creado una contraseña local, haz clic en el botón de abajo para crear una.');
        } else {
          setAuthError('Contraseña incorrecta. Acceso denegado.');
        }
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleUpdateName = async () => {
    if (!userId || !newName.trim()) return;
    setLoadingName(true);
    try {
      const { error } = await supabase.from('user_profiles').update({ full_name: newName }).eq('user_id', userId);
      if (error) throw error;
      setUserProfile(prev => ({ ...prev, full_name: newName }));
      setMsg('Nombre de usuario actualizado con éxito.');
    } catch (err) {
      setMsg('No se pudo actualizar el nombre. Por favor, verifica tu conexión a internet.');
    } finally {
      setLoadingName(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!oldPassword) {
      setMsg('Debes ingresar tu contraseña actual.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setMsg('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setLoadingPass(true);
    setMsg('');
    try {
      // 1. Verificar la contraseña antigua antes de permitir el cambio
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: session?.user?.email,
        password: oldPassword
      });
      
      if (verifyError) {
        throw new Error('La contraseña actual es incorrecta.');
      }

      // 2. Si es correcta, procedemos a actualizar
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      
      setMsg('Contraseña actualizada con éxito.');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      setMsg(err.message || 'No se pudo actualizar la contraseña.');
    } finally {
      setLoadingPass(false);
    }
  };

  if (!profileUnlocked) {
    return (
      <div className="p-6 bg-beige min-h-screen flex flex-col items-center justify-center relative animate-fade-in font-sans">
        <button onClick={() => { setProfileUnlocked(false); setScreen('profile'); }} className="absolute top-6 left-6 w-11 h-11 rounded-full bg-white shadow-sm text-navy flex items-center justify-center border border-sky-blue/20">
          <ChevronLeft size={24} />
        </button>

        <div className="w-20 h-20 bg-rose-50 dark:bg-rose-950/20 rounded-full flex items-center justify-center text-rose-500 mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        </div>
        <h2 className="text-2xl font-black text-navy mb-2 text-center">
          {isCreatingPassword ? 'Crear Contraseña Local' : 'Seguridad Requerida'}
        </h2>
        <p className="text-teal text-sm mb-8 max-w-xs text-center font-semibold">
          {isCreatingPassword 
            ? 'Ingresa una nueva contraseña segura para proteger tus datos personales y poder desbloquear esta sección.' 
            : 'Para proteger tus datos personales, confirma tu identidad ingresando tu contraseña actual.'}
        </p>

        {authError && (
          <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-sm font-bold mb-6 border border-rose-200 w-full max-w-sm text-center">
            {authError}
          </div>
        )}

        {recoverySent && (
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl text-sm font-bold mb-6 border border-emerald-200 w-full max-w-sm text-center">
            ¡Correo enviado! Revisa tu bandeja de entrada o spam para restablecer tu contraseña.
          </div>
        )}

        <form onSubmit={handleUnlock} className="w-full max-w-sm flex flex-col gap-4">
          <input
            type="password"
            required
            placeholder={isCreatingPassword ? "Nueva contraseña (mínimo 6 caracteres)" : "Contraseña actual"}
            value={authPassword}
            onChange={(e) => setAuthPassword(e.target.value)}
            className="w-full bg-white border border-sky-blue/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-navy transition-all font-medium text-navy text-sm shadow-sm"
          />
          <button
            type="submit"
            disabled={authLoading}
            className="w-full py-4 bg-navy text-white rounded-2xl font-black shadow-lg shadow-navy/20 active:scale-95 transition-all"
          >
            {authLoading ? 'Procesando...' : (isCreatingPassword ? 'Guardar y Desbloquear' : 'Desbloquear')}
          </button>
        </form>

        {!isCreatingPassword && (
          <button 
            onClick={handleRecoverPassword} 
            disabled={authLoading || recoverySent}
            className="mt-6 text-sm font-bold text-slate-500 hover:text-navy transition-colors disabled:opacity-50"
          >
            ¿Olvidaste tu contraseña? Recupérala aquí
          </button>
        )}

        {!isCreatingPassword && isGoogleUser && !session?.user?.user_metadata?.has_local_password && !session?.user?.app_metadata?.providers?.includes('email') && (
          <button 
            onClick={() => { setIsCreatingPassword(true); setAuthError(''); setAuthPassword(''); setRecoverySent(false); }} 
            className="mt-3 text-sm font-bold text-teal hover:text-navy transition-colors border-b border-teal/30 pb-0.5"
          >
            ¿Usuario de Google sin contraseña local? Créala aquí
          </button>
        )}
        
        {isCreatingPassword && (
          <button 
            onClick={() => { setIsCreatingPassword(false); setAuthError(''); setAuthPassword(''); }} 
            className="mt-6 text-sm font-bold text-slate-500 hover:text-navy transition-colors"
          >
            Volver a inicio de sesión
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 pb-24 bg-beige min-h-screen font-sans">
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

        {isGoogleUser && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-xl mb-5 flex items-center gap-3">
            <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <div>
              <p className="text-xs font-black text-slate-900">Cuenta Autenticada con Google</p>
              <p className="text-[11px] font-semibold text-slate-600">Tu seguridad y contraseña se gestionan directamente a través de tu cuenta de Google.</p>
            </div>
          </div>
        )}

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

        {isGoogleUser ? (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-700 leading-relaxed mb-2">
              🔒 Tu contraseña está enlazada a tu cuenta de Google.
            </p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Google protege tu acceso. Para cambiar tu contraseña general, debes hacerlo directamente desde los ajustes de tu cuenta de Google. Si creaste una contraseña local para desbloquear este panel, esta permanecerá fija.
            </p>
          </div>
        ) : (
          <div className="mb-4 flex flex-col gap-3">
            <div>
              <label className="block text-xs font-black text-teal uppercase tracking-widest mb-2">Contraseña Actual</label>
              <input
                type="password"
                value={oldPassword}
                placeholder="Ingresa tu contraseña actual"
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full bg-white border border-sky-blue/50 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy transition-all font-semibold text-sm text-navy"
              />
            </div>
            <div>
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
                  disabled={loadingPass || !newPassword || !oldPassword}
                  className="px-5 bg-teal text-white font-black text-sm rounded-xl disabled:opacity-50 hover:bg-teal/90 active:scale-95 transition-all shadow-sm"
                >
                  {loadingPass ? '...' : 'Actualizar'}
                </button>
              </div>
              <p className="text-[10px] text-teal mt-2 font-semibold">Por seguridad, Supabase encriptará tu nueva contraseña inmediatamente.</p>
            </div>
          </div>
        )}
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
      const { error } = await supabase.from('user_profiles').update({ intensity: level }).eq('user_id', userId);
      if (error) throw error;
      setUserProfile(prev => ({ ...prev, intensity: level }));
      setMsg('Intensidad de estudio actualizada con éxito.');
    } catch (err) {
      setMsg('No se pudo actualizar la intensidad de estudio. Por favor, verifica tu conexión a internet.');
    } finally {
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
            style={{ width: `${((userProfile.intensity - 1) / 3) * 100}%` }}
          ></div>

          <div className="flex justify-between relative z-10">
            {[1, 2, 3, 4].map(level => (
              <button
                key={level}
                onClick={() => handleUpdateIntensity(level)}
                disabled={loadingIntensity}
                className={`w-5 h-5 rounded-full border-2 transition-all duration-300 disabled:opacity-50 ${userProfile.intensity >= level ? 'bg-teal border-white shadow-md' : 'bg-white border-sky-blue/30'}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <h4 className="font-black text-navy text-lg">{intensityLabels[userProfile.intensity].title}</h4>
          <p className="text-xs text-teal font-semibold mt-1.5 italic">"${intensityLabels[userProfile.intensity].desc}"</p>
        </div>
      </div>
    </div>
  );
};

export default App;
