import { 
  Book, Calculator, Globe, FlaskConical, Languages, 
  Brain, Timer, User 
} from 'lucide-react';

/**
 * @description Lista de materias evaluadas en el ICFES.
 * Incluye estadísticas de progreso mock y colores representativos.
 */
export const SUBJECTS = [
  { id: 1, name: 'Lectura Crítica', completed: 4, total: 12, icon: Book, color: 'emerald', score: 380 },
  { id: 2, name: 'Matemáticas', completed: 7, total: 15, icon: Calculator, color: 'blue', score: 410 },
  { id: 3, name: 'Sociales y Ciudadanas', completed: 2, total: 10, icon: Globe, color: 'emerald', score: 350 },
  { id: 4, name: 'Ciencias Naturales', completed: 9, total: 18, icon: FlaskConical, color: 'teal', score: 320 },
  { id: 5, name: 'Inglés', completed: 5, total: 14, icon: Languages, color: 'indigo', score: 440 },
];

/**
 * @description Métodos de estudio ofrecidos por la plataforma.
 * Cada método tiene una descripción y un icono para la interfaz.
 */
export const STUDY_METHODS = [
  { id: 'active', title: 'Recuperación Activa', tag: 'RECOMENDADO #1', desc: 'El más efectivo. Responde preguntas y haz simulacros para entrenar tu memoria.', icon: Brain, color: 'emerald' },
  { id: 'spaced', title: 'Repetición Espaciada', tag: 'ALTAMENTE EFECTIVO', desc: 'Repasa en intervalos estratégicos para fortalecer la memoria a largo plazo.', icon: Timer, color: 'blue' },
  { id: 'feynman', title: 'Método Feynman', tag: 'COMPRENSIÓN PROFUNDA', desc: 'Explica temas con palabras simples para identificar vacíos en tu aprendizaje.', icon: User, color: 'indigo' },
];

/**
 * @description Lista de versículos motivacionales que se muestran aleatoriamente en la pantalla de inicio.
 */
export const VERSES = [
  { text: '"Todo lo puedo en Cristo que me fortalece"', ref: 'Filipenses 4:13' },
  { text: '"Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes..."', ref: 'Josué 1:9' },
  { text: '"Fíate de Jehová de todo tu corazón, Y no te apoyes en tu propia prudencia."', ref: 'Proverbios 3:5' },
  { text: '"No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo..."', ref: 'Isaías 41:10' },
  { text: '"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal..."', ref: 'Jeremías 29:11' },
];
