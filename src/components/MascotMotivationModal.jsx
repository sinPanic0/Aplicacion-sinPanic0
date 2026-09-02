import React from 'react';
import { Sparkles, Flame, Heart, ArrowRight, Zap, Trophy } from 'lucide-react';
import { CapybaraMascot } from './CapybaraMascot';

/**
 * @description Modal motivacional estilo Duolingo con la Mascota Capybara.
 * Se activa tras cada 3 preguntas respondidas, rachas de errores/aciertos, o al finalizar el examen con resultados.
 */
export const MascotMotivationModal = ({
  isOpen,
  onClose,
  type = 'every_3_questions', // 'every_3_questions' | 'error_streak' | 'success_streak' | 'exam_results'
  streakCount = 3,
  questionNumber = 3,
  percentage = 80,
  equippedItems = {},
  customName = 'Chigüiro Sabio'
}) => {
  if (!isOpen) return null;

  const periodicMessages = [
    {
      title: `¡Llevas ${questionNumber} preguntas completadas! 🍊`,
      desc: `${customName} se asomó para decirte: ¡Tú puedes lograrlo! Mantén esa excelente concentración.`,
      quote: '"Paso a paso se construye el mejor puntaje. ¡Sigue con ese gran ritmo!"'
    },
    {
      title: `¡Pregunta ${questionNumber} superada! 🚀`,
      desc: '¡Excelente avance! Respira profundo, confía en lo que has estudiado y vamos por la siguiente.',
      quote: '"La constancia en cada pregunta es el secreto del éxito en el ICFES."'
    },
    {
      title: '¡Tu Mascota te da ánimos! 🐾✨',
      desc: `¡Llegaste a la pregunta ${questionNumber}! Estás demostrando compromiso y enfoque total.`,
      quote: '"¡Sin Pánico! Cada pregunta respondida te acerca más a la universidad."'
    }
  ];

  const errorMessages = [
    {
      title: '¡Sin Pánico, tú puedes! 🍊',
      desc: `No te preocupes por equivocarte. ¡Cada error es solo aprendizaje para el examen real!`,
      quote: '"No te rindas. Las preguntas complejas son la mejor oportunidad de fortalecer tus conocimientos."'
    },
    {
      title: '¡Respira profundo y sigue! 💪',
      desc: 'El examen mide tu perseverancia. Capybara está aquí para recordar tus capacidades.',
      quote: '"Equivocarse en la práctica significa acertar en el examen real."'
    }
  ];

  const successMessages = [
    {
      title: '¡Racha imparable! 🔥',
      desc: `¡Excelente racha! Estás respondiendo como un verdadero experto estilo ICFES.`,
      quote: '"¡Gran concentración! Estás asegurando puntos clave para tu examen."'
    },
    {
      title: '¡Nivel Leyenda ICFES! 🚀',
      desc: '¡Capybara está celebrando tu ritmo! Mantén esa energía.',
      quote: '"¡La constancia de hoy es tu éxito universitario de mañana!"'
    }
  ];

  let currentMsg;
  if (type === 'exam_results') {
    if (percentage >= 80) {
      currentMsg = {
        title: `¡IMPRESIONANTE RENDIMIENTO DEL ${percentage}%! 🎉`,
        desc: `¡Felicidades! ${customName} está orgulloso de ti. Has superado esta prueba como todo un maestro del ICFES.`,
        quote: '"¡Sigue así para asegurar tu cupo en la universidad de tus sueños!"'
      };
    } else if (percentage >= 50) {
      currentMsg = {
        title: `¡BUEN TRABAJO DEL ${percentage}%! 🍊`,
        desc: `Tienes bases sólidas, pero hay margen de mejora. Te recomendamos leer la explicación del tema y repetir el examen.`,
        quote: '"¡La práctica constante transforma los intentos en puntajes perfectos!"'
      };
    } else {
      currentMsg = {
        title: `¡NUNCA TE RINDAS! (${percentage}%) 💪`,
        desc: `No te desanimes. Los mejores puntajes se construyen aprendiendo de cada error. ¡Lee el mini documento explicativo y vuelve a intentarlo!`,
        quote: '"Caerse está permitido, levantarse y repasar es obligatorio."'
      };
    }
  } else if (type === 'error_streak') {
    currentMsg = errorMessages[Math.floor(Math.random() * errorMessages.length)];
  } else if (type === 'success_streak') {
    currentMsg = successMessages[Math.floor(Math.random() * successMessages.length)];
  } else {
    currentMsg = periodicMessages[Math.floor(Math.random() * periodicMessages.length)];
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative max-w-md w-full rounded-3xl p-6 shadow-2xl text-center border-2 border-orange-300 bg-gradient-to-b from-amber-50 via-white to-orange-50 text-slate-800 overflow-hidden transform transition-all scale-100">
        
        {/* Insignia Header */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 shadow-md text-white bg-[#C85A28]">
          {type === 'exam_results' ? (
            <>
              <Trophy size={14} className="fill-white" />
              <span>Resultados del Examen</span>
            </>
          ) : type === 'error_streak' ? (
            <>
              <Heart size={14} className="fill-white" />
              <span>Apoyo Motivacional</span>
            </>
          ) : type === 'success_streak' ? (
            <>
              <Flame size={14} className="fill-white" />
              <span>¡Racha en Fuego!</span>
            </>
          ) : (
            <>
              <Zap size={14} className="fill-white" />
              <span>¡Ánimo de Capybara!</span>
            </>
          )}
        </div>

        {/* Mascota Capybara Render con equipamiento del usuario */}
        <div className="my-2 flex justify-center transform animate-bounce">
          <CapybaraMascot 
            size="lg" 
            interactive={false} 
            customName={customName} 
            equippedItems={equippedItems}
          />
        </div>

        {/* Contenido del Mensaje */}
        <h3 className="text-xl font-black mb-2 text-slate-900 leading-tight">
          {currentMsg.title}
        </h3>
        
        <p className="text-xs text-slate-600 font-medium mb-4 leading-relaxed px-2">
          {currentMsg.desc}
        </p>

        <div className="p-3.5 rounded-2xl text-xs font-semibold italic mb-6 border bg-amber-100/60 border-amber-200 text-amber-900">
          {currentMsg.quote}
        </div>

        {/* Botón de Acción */}
        <button
          onClick={onClose}
          className="w-full py-4 rounded-2xl font-black text-sm text-white bg-[#C85A28] hover:bg-[#C84B1A] shadow-lg shadow-orange-200 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>{type === 'exam_results' ? 'Continuar' : '¡Entendido, a seguir adelante!'}</span>
          <ArrowRight size={18} />
        </button>

      </div>
    </div>
  );
};
