import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, Key, Check, ChevronLeft, ChevronRight, HeartHandshake, BookOpen, Heart } from 'lucide-react';

/**
 * @description Widget Flotante de Tutor IA powered by Google Gemini Style
 * Soporta dos modos: "📚 Académico" y "💚 Apoyo Emocional (Psicólogo Escolar)".
 * Brinda contención asertiva, escucha activa y estrategias anti-estrés para el ICFES.
 */
export const AiTutorWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [chatMode, setChatMode] = useState('academic'); // 'academic' | 'emotional'
  const [customApiKey, setCustomApiKey] = useState(() => localStorage.getItem('sinpanic0_gemini_key') || '');
  const [tempApiKey, setTempApiKey] = useState('');
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: '¡Hola! 👋 Soy tu Tutor IA y Acompañante Emocional de SinPanic0.\n\nPuedes pedirme explicaciones teóricas de cualquier materia o cambiar al modo 💚 **Apoyo Emocional** para contarme cómo te sientes, recibir consejos de manejo de ansiedad y motivación para tus pruebas. ¿Cómo te sientes hoy?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chipsContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Preguntas sugeridas según el modo activo
  const academicQuestions = [
    "📝 Dame ejercicios de práctica de Matemáticas",
    "🎥 Canales de YouTube para Matemáticas",
    "📐 Explicación del Teorema de Pitágoras",
    "📖 ¿Cómo abordar la Lectura Crítica?",
    "🏛️ ¿Cómo funciona la Acción de Tutela?",
    "🔬 Leyes de Newton y ejemplos",
    "🇬🇧 Consejos para la prueba de Inglés",
    "📊 ¿Cómo analizar tablas y gráficas?"
  ];

  const emotionalQuestions = [
    "🧘‍♂️ Me siento muy estresado por el examen ICFES",
    "😟 Tengo miedo de no sacar el puntaje que necesito",
    "🧠 ¿Cómo puedo controlar la ansiedad antes de estudiar?",
    "💤 Me cuesta concentrarme y siento agobio",
    "❤️ ¿Cómo mantener la calma durante el día de la prueba?",
    "💬 Siento mucha presión familiar por los resultados",
    "🌱 ¿Qué ejercicio de respiración puedo hacer ahora?"
  ];

  const currentQuestions = chatMode === 'emotional' ? emotionalQuestions : academicQuestions;

  const scrollChips = (direction) => {
    if (chipsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -180 : 180;
      chipsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const saveCustomKey = () => {
    const trimmed = tempApiKey.trim();
    if (trimmed) {
      localStorage.setItem('sinpanic0_gemini_key', trimmed);
      setCustomApiKey(trimmed);
    } else {
      localStorage.removeItem('sinpanic0_gemini_key');
      setCustomApiKey('');
    }
    setShowKeyModal(false);
  };

  // Detectar intención emocional implícita en el prompt
  const isEmotionalPrompt = (promptLower) => {
    const emotionalKeywords = [
      'estres', 'estresado', 'estresada', 'ansiedad', 'ansioso', 'ansiosa',
      'miedo', 'temor', 'agobio', 'agobiado', 'agobiada', 'triste', 'deprimido',
      'frustrado', 'frustrada', 'presion', 'llorar', 'no puedo', 'siento mal',
      'psicologo', 'consejo emocional', 'como me siento', 'emocion', 'calma', 'respirar'
    ];
    return emotionalKeywords.some(k => promptLower.includes(k));
  };

  // Motor Oficial Google Gemini + Fallback Asertivo Estilo Psicólogo Escolar
  const generateAiResponse = async (userPrompt) => {
    const promptTrim = userPrompt.trim();
    const promptLower = promptTrim.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const activeApiKey = customApiKey || import.meta.env.VITE_GEMINI_API_KEY;

    const isEmotional = chatMode === 'emotional' || isEmotionalPrompt(promptLower);

    // 1. Llamada a la API Oficial de Google Gemini
    if (activeApiKey) {
      try {
        const systemInstruction = isEmotional 
          ? `Eres un Psicólogo Escolar y Coach Emocional cálido, empático, asertivo y humano en SinPanic0 (plataforma de preparación ICFES en Colombia).
Tu objetivo es escuchar activamente al estudiante, validar sus emociones con mucho afecto, preguntarle amablemente cómo se siente y brindarle herramientas concretas de regulación emocional (respiración 4-7-8, reestructuración de pensamientos catastrofistas, manejo del estrés y la presión). Usa un tono afectuoso, tranquilizador, con emojis amables y estructurado en párrafos cortos.`
          : `Eres Google Gemini, actuando como el Tutor IA Oficial de SinPanic0 (plataforma de preparación para el examen ICFES Saber 11 en Colombia).
Responde con un estilo claro, riguroso, motivador y estructurado con negritas y viñetas. Si piden ejercicios, da preguntas tipo ICFES reales con soluciones explicadas.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeApiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `${systemInstruction}\n\nMensaje del estudiante: ${promptTrim}` }]
            }]
          })
        });

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } catch (err) {
        console.warn("Fallo temporal en la API de Gemini, cambiando a motor local asertivo:", err);
      }
    }

    // 2. Motor Local Estilo Psicólogo / Tutor
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));

    // A. Apoyo Emocional / Estrés / Ansiedad
    if (isEmotional) {
      if (promptLower.includes('estres') || promptLower.includes('agobio') || promptLower.includes('ansiedad') || promptLower.includes('miedo')) {
        return `💚 **Te escucho y te abrazo a la distancia.** 

Es completamente normal y válido que sientas estrés o ansiedad frente al examen ICFES Saber 11. Recuerda que este examen mide conocimientos de una jornada, **pero NO define tu valor como persona ni tu inteligencia**.

Aquí tienes 3 pasos asertivos para calmar tu mente en este momento:

1. 🫁 **Técnica de Respiración 4-7-8:**
   - Inhala suavemente por la nariz contando **4 segundos**.
   - Mantén el aire en tus pulmones durante **7 segundos**.
   - Exhala despacio por la boca durante **8 segundos**. *(Repítelo 3 veces).*

2. 🧠 **Reencuadra tus pensamientos:**
   - En lugar de pensar: *"Si me va mal se acaba todo"*, recuerda: *"Estoy preparándome paso a paso, y tengo múltiples oportunidades y caminos hacia mis metas"*.

3. 🌿 **Da un paso a la vez:**
   - No intentes estudiar todo en un día. Divide tu estudio en bloques cortos de 25 minutos con 5 de descanso (Técnica Pomodoro).

¿Cómo te sientes en este momento? ¿Quieres hablar de algo más que te tenga preocupado/a? Estoy aquí para apoyarte.`;
      }

      if (promptLower.includes('concentrar') || promptLower.includes('cansado') || promptLower.includes('agobiado')) {
        return `💚 **Tómate una pausa sin culpa.**

Cuando el cerebro se siente saturado o cansado, seguir forzándolo genera frustración. 

💡 **Recomendación del Psicólogo Escolar:**
- **Cierra tus libros por 15 minutos.**
- Toma un vaso de agua fresca y estira tus brazos y espalda.
- Da una caminata corta o escucha una canción que te tranquilice.

Recuerda: **El descanso también es parte fundamental del aprendizaje.** Cuando regreses, verás las cosas con mayor claridad. 

¿Te gustaría que hagamos un ejercicio breve de relajación?`;
      }

      return `💚 **Gracias por compartir cómo te sientes conmigo.**

Como tu acompañante emocional, quiero recordarte que el proceso de preparación académica es un camino donde es natural tener días con mucha energía y otros días donde sentimos dudas o cansancio.

Lo importante es escuchar a tu cuerpo y a tu mente:
- No te compares con el ritmo de otros estudiantes.
- Celebra cada pequeño avance diario (cada test completado es una victoria).
- Mantén hábitos saludables de sueño (dormir 7-8 horas es clave para fijar la memoria).

¿Cómo te sientes hoy? Cuéntame qué está pasando por tu mente y con gusto te daré el mejor consejo para superarlo juntos.`;
    }

    // B. Respuestas Académicas (Fallback original)
    if (promptLower.includes('ejercicio') || promptLower.includes('practica')) {
      return `¡Por supuesto! Para subir considerablemente el puntaje en el ICFES Saber 11 no necesitas memorizar cientos de fórmulas avanzadas; el examen mide tu capacidad para **razonar y resolver problemas reales**.

### 📝 **Ejercicio Práctico: Razonamiento Cuantitativo**
Una tienda ofrece un descuento del **20%** sobre un artículo. Si compras hoy, recibes un descuento adicional del **10%** sobre el precio ya rebajado. ¿Cuál es el porcentaje total de descuento aplicado?

A) 30%  
B) 28%  
C) 25%  
D) 20%  

💡 **Solución Explicada:**
1. Supón un valor inicial de **$100**.
2. Con el 20%, el valor baja a **$80**.
3. El 10% adicional se calcula sobre $80 ➔ $80 × 0.10 = $8.
4. Precio final = $80 - $8 = **$72**.
5. Descuento total = $100 - $72 = **28%**. *(Respuesta correcta: **B**)*`;
    }

    return `¡Hola! Como tu Tutor IA de SinPanic0, puedo ayudarte tanto en lo **Académico** (resolviendo dudas, explicando temas del temario y dando ejercicios) como en lo **Emocional** (dándote apoyo con el estrés y la ansiedad del ICFES).

¿Te gustaría practicar algún tema en particular o hablar de cómo te estás sintiendo con tu preparación?`;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || isTyping) return;

    // Si el texto del usuario denota emoción, auto-cambiar a modo emocional
    if (isEmotionalPrompt(trimmed.toLowerCase())) {
      setChatMode('emotional');
    }

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: trimmed
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const responseText = await generateAiResponse(trimmed);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: responseText
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: 'Lo siento, tuve un pequeño problema de conexión. Por favor inténtalo de nuevo.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestionClick = (qText) => {
    setInputText(qText);
  };

  return (
    <>
      {/* Botón Flotante Principal */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-5 md:bottom-8 md:right-8 bg-[#D9531E] hover:bg-[#C84B1A] text-white p-4 rounded-full shadow-2xl z-50 flex items-center gap-2 group transition-all transform hover:scale-105 active:scale-95"
        >
          <div className="relative">
            <Sparkles size={24} className="animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white animate-ping"></span>
          </div>
          <span className="font-black text-sm pr-1 hidden group-hover:inline-block transition-all">
            Asistente & Tutor IA
          </span>
        </button>
      )}

      {/* Modal / Ventana del Chat IA */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-8 md:right-8 md:w-[420px] md:h-[620px] bg-white dark:bg-[#241A12] border border-[#EADBC8] dark:border-[#3A2A1E] rounded-none md:rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-scale-up">
          
          {/* Header del Chat */}
          <div className="bg-gradient-to-r from-[#D9531E] via-[#E67E22] to-[#C84B1A] p-4 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                {chatMode === 'emotional' ? <HeartHandshake size={22} /> : <Bot size={22} />}
              </div>
              <div>
                <h3 className="font-black text-base leading-none">
                  {chatMode === 'emotional' ? 'Psicólogo Escolar IA' : 'Tutor IA SinPanic0'}
                </h3>
                <span className="text-[10px] font-semibold text-white/80">
                  {chatMode === 'emotional' ? '💚 Apoyo Emocional & Motivación' : '📚 Asistente Académico ICFES'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowKeyModal(true)}
                title="Configurar Gemini API Key"
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <Key size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Selector de Modo: Académico vs Apoyo Emocional */}
          <div className="bg-[#FAF4EE] dark:bg-[#18110C] p-2 border-b border-[#EADBC8] dark:border-[#3A2A1E] flex gap-2 shrink-0">
            <button
              onClick={() => setChatMode('academic')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                chatMode === 'academic'
                  ? 'bg-[#D9531E] text-white shadow-sm'
                  : 'bg-white dark:bg-[#241A12] text-[#7C5E47] dark:text-[#D2B49A] hover:bg-white/80'
              }`}
            >
              <BookOpen size={14} /> 📚 Académico
            </button>

            <button
              onClick={() => setChatMode('emotional')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                chatMode === 'emotional'
                  ? 'bg-[#E67E22] text-white shadow-sm'
                  : 'bg-white dark:bg-[#241A12] text-[#7C5E47] dark:text-[#D2B49A] hover:bg-white/80'
              }`}
            >
              <Heart size={14} /> 💚 Apoyo Emocional
            </button>
          </div>

          {/* Mensajes del Chat */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAF4EE]/50 dark:bg-[#18110C]/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white shadow-sm ${
                    chatMode === 'emotional' ? 'bg-[#E67E22]' : 'bg-[#D9531E]'
                  }`}>
                    {chatMode === 'emotional' ? <Heart size={16} /> : <Bot size={16} />}
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed font-medium whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-[#D9531E] text-white rounded-tr-none shadow-md'
                      : 'bg-white dark:bg-[#241A12] text-[#3C2415] dark:text-[#F5EBE1] border border-[#EADBC8] dark:border-[#3A2A1E] rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#3C2415] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                    Tú
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-full bg-[#D9531E] text-white flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
                <div className="bg-white dark:bg-[#241A12] p-3 rounded-2xl border border-[#EADBC8] dark:border-[#3A2A1E] flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#D9531E] rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-[#D9531E] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-[#D9531E] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chips Preguntas Rápidas */}
          <div className="bg-white dark:bg-[#241A12] border-t border-[#EADBC8] dark:border-[#3A2A1E] p-2 relative shrink-0">
            <div className="flex items-center gap-1">
              <button
                onClick={() => scrollChips('left')}
                className="p-1 text-[#7C5E47] hover:text-[#3C2415] dark:text-[#D2B49A]"
              >
                <ChevronLeft size={16} />
              </button>

              <div
                ref={chipsContainerRef}
                className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 flex-1"
              >
                {currentQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestionClick(q)}
                    className="px-3 py-1.5 bg-[#FAF4EE] dark:bg-[#18110C] hover:bg-[#D9531E]/10 border border-[#EADBC8] dark:border-[#3A2A1E] rounded-full text-[11px] font-semibold text-[#3C2415] dark:text-[#F5EBE1] whitespace-nowrap transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollChips('right')}
                className="p-1 text-[#7C5E47] hover:text-[#3C2415] dark:text-[#D2B49A]"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-[#241A12] border-t border-[#EADBC8] dark:border-[#3A2A1E] flex gap-2 shrink-0">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={chatMode === 'emotional' ? "¿Cómo te sientes? Cuéntame..." : "Haz una pregunta sobre el ICFES..."}
              className="flex-1 bg-[#FAF4EE] dark:bg-[#18110C] border border-[#EADBC8] dark:border-[#3A2A1E] p-3 rounded-2xl text-xs font-medium text-[#3C2415] dark:text-[#F5EBE1] focus:outline-none focus:ring-2 focus:ring-[#D9531E]"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="w-11 h-11 bg-[#D9531E] hover:bg-[#C84B1A] text-white rounded-2xl flex items-center justify-center disabled:opacity-50 active:scale-95 transition-all shrink-0 shadow-sm"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Modal API Key Gemini */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#241A12] rounded-3xl p-6 w-full max-w-sm border border-[#EADBC8] dark:border-[#3A2A1E] shadow-2xl">
            <h3 className="text-lg font-black text-[#3C2415] dark:text-[#F5EBE1] mb-2">
              API Key de Google Gemini
            </h3>
            <p className="text-xs text-[#7C5E47] dark:text-[#D2B49A] mb-4 font-medium">
              Si posees una API Key personal de Google AI Studio, ingresala aquí para conectar directamente con Gemini 1.5 Flash.
            </p>

            <input
              type="password"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-[#FAF4EE] dark:bg-[#18110C] border border-[#EADBC8] dark:border-[#3A2A1E] p-3.5 rounded-2xl text-xs font-mono text-[#3C2415] dark:text-[#F5EBE1] mb-4 focus:outline-none focus:ring-2 focus:ring-[#D9531E]"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowKeyModal(false)}
                className="flex-1 py-3 border border-[#EADBC8] dark:border-[#3A2A1E] text-[#3C2415] dark:text-[#F5EBE1] font-bold rounded-xl text-xs"
              >
                Cancelar
              </button>
              <button
                onClick={saveCustomKey}
                className="flex-1 py-3 bg-[#D9531E] text-white font-black rounded-xl text-xs shadow-md"
              >
                Guardar Key
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
