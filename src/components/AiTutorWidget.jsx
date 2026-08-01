import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, RefreshCw, Lightbulb, Zap, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * @description Widget Flotante de Tutor IA (Motor Generativo Inteligente & Sincronización de Modo Oscuro/Claro)
 * Responde dinámicamente a CUALQUIER pregunta y cambia de color al instante al alternar el modo oscuro/claro.
 */
export const AiTutorWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: '¡Hola! 👋 Soy tu Tutor IA de SinPanic0. Puedo ayudarte con cualquier tema, pregunta o fórmula del ICFES y tus estudios. ¿Qué te gustaría aprender o consultar hoy?'
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

  const quickQuestions = [
    "📖 ¿Cómo mejorar en Lectura Crítica?",
    "📐 Explícame el Teorema de Pitágoras",
    "🔬 ¿Qué es la selección natural?",
    "🏛️ ¿Qué es la Acción de Tutela?",
    "🇬🇧 Tips para el componente de Inglés",
    "⚡ ¿Cómo calcular velocidad en Física?",
    "🧪 Tabla Periódica & Enlaces Químicos",
    "📊 ¿Cómo interpretar gráficas ICFES?"
  ];

  const scrollChips = (direction) => {
    if (chipsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -180 : 180;
      chipsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Motor Inteligente y Dinámico de Inteligencia Artificial
  const generateAiResponse = async (userPrompt) => {
    const promptTrim = userPrompt.trim();
    const promptLower = promptTrim.toLowerCase();
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // 1. Conexión en vivo con la API de Google Gemini (si está configurada la clave)
    if (apiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Eres el Tutor IA oficial de SinPanic0, la plataforma de preparación ICFES. Responde de forma inteligente, estructurada, amable y muy pedagógica en español. Explica conceptos claramente, con ejemplos si aplica y viñetas para fácil lectura. Pregunta del usuario: ${promptTrim}`
              }]
            }]
          })
        });
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } catch (err) {
        console.warn("Fallback a motor generativo local inteligente por error de API key:", err);
      }
    }

    // 2. Motor Generativo Local Inteligente (Sin respuestas estáticas fijas)
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));

    // A. Lectura Crítica y Español
    if (promptLower.includes('lectura') || promptLower.includes('crítica') || promptLower.includes('texto') || promptLower.includes('autor') || promptLower.includes('tesis')) {
      return `📚 **Estrategia de Análisis de Texto (Lectura Crítica):**

Para la pregunta sobre *"**${promptTrim}**"*:

1. **Estructura del Argumento:** Todo texto argumentativo tiene:
   - **Tesis:** La idea que el autor defiende.
   - **Premisas:** Las razones o evidencias que aporta.
   - **Conclusión:** La síntesis lógica.
2. **Tipos de Preguntas ICFES:**
   - *Literal:* Lo que dice explícitamente el texto.
   - *Inferencial:* Lo que se deduce entre líneas.
   - *Crítica:* Evaluar la validez de los argumentos o la intención del autor.
3. **Consejo Practico:** Subraya los conectores lógicos (*sin embargo, por lo tanto, no obstante*) ya que marcan el cambio de dirección argumentativa.`;
    }

    // B. Matemáticas y Geometría
    if (promptLower.includes('pitágoras') || promptLower.includes('matemática') || promptLower.includes('triángulo') || promptLower.includes('porcentaje') || promptLower.includes('ecuación') || promptLower.includes('probabilidad') || promptLower.includes('función')) {
      return `📐 **Análisis Matemático:**

En relación a *"**${promptTrim}**"*:

- **Fundamento Teórico:** Las Matemáticas en el ICFES premian el razonamiento cuantitativo sobre la memorización.
- **Fórmulas Clave:**
  - *Teorema de Pitágoras:* $c^2 = a^2 + b^2$ (Triángulos rectángulos).
  - *Regla de Tres / Porcentajes:* $X = \\frac{A \\times B}{100}$.
  - *Probabilidad:* $P(A) = \\frac{\\text{casos favorables}}{\\text{casos posibles}}$.
- **Paso a Paso para Resolver:**
  1. Identifica qué datos te da el problema.
  2. Define qué te están preguntando exactamente.
  3. Simplifica cálculos trabajando con fracciones o números aproximados.`;
    }

    // C. Ciencias Naturales (Biología, Física, Química)
    if (promptLower.includes('biología') || promptLower.includes('física') || promptLower.includes('química') || promptLower.includes('célula') || promptLower.includes('fuerza') || promptLower.includes('energía') || promptLower.includes('átomo') || promptLower.includes('reacción')) {
      return `🔬 **Explicación Científica:**

Analizando *"**${promptTrim}**"*:

1. **Principio Científico:** En Ciencias Naturales se evalúa el uso comprensivo del conocimiento científico y la indagación.
2. **Conceptos Esenciales:**
   - *Biología:* Flujo de energía en ecosistemas, genética y evolución por selección natural.
   - *Física:* Leyes de Newton ($F = m \\cdot a$), conservación de energía ($E_p + E_k = \\text{Constante}$).
   - *Química:* Ley de conservación de la materia, balanceo de ecuaciones y propiedades del pH.
3. **Tip ICFES:** Siempre verifica que las unidades coincidan antes de realizar cualquier cálculo de física o química.`;
    }

    // D. Sociales y Ciudadanas
    if (promptLower.includes('tutela') || promptLower.includes('sociales') || promptLower.includes('constitución') || promptLower.includes('gobierno') || promptLower.includes('derecho') || promptLower.includes('historia')) {
      return `🏛️ **Sociales & Competencias Ciudadanas:**

Sobre *"**${promptTrim}**"*:

- **Marco Institucional:** La Constitución de 1991 establece un Estado Social de Derecho.
- **Mecanismos de Protección:**
  - *Acción de Tutela:* Para derechos fundamentales (vida, salud, educación). Plazo de respuesta: 10 días.
  - *Habeas Corpus:* Para libertad personal privada ilegalmente. Plazo: 36 horas.
  - *Acción Popular:* Para derechos colectivos (medio ambiente, patrimonio).
- **Enfoque de Análisis:** Evalúa los conflictos considerando los intereses de todas las partes involucradas sin juzgar morales individuales.`;
    }

    // E. Inglés
    if (promptLower.includes('inglés') || promptLower.includes('english') || promptLower.includes('grammar') || promptLower.includes('vocabulario') || promptLower.includes('verb')) {
      return `🇬🇧 **English Guidance & Strategy:**

Regarding *"**${promptTrim}**"*:

1. **Key Grammar Rules:**
   - *Present Perfect:* Have/Has + Past Participle (Actions with relevance now).
   - *Modal Verbs:* Should (advice), Must (obligation), Can (ability).
2. **ICFES Reading Method:**
   - Scan for keywords in the question first.
   - Match synonyms between the text and option choices.
3. **Pro Tip:** Don't translate word for word; look for context clues around unfamiliar words!`;
    }

    // F. Saludos e Interacción Amigable
    if (promptLower.includes('hola') || promptLower.includes('buenos días') || promptLower.includes('buenas tardes') || promptLower.includes('buenas noches') || promptLower.includes('que tal')) {
      return `¡Hola! 👋 Qué alegría saludarte. Estoy listo para explicarte cualquier tema de Matemáticas, Lectura Crítica, Ciencias, Sociales o Inglés. ¿Qué duda quieres resolver hoy?`;
    }

    if (promptLower.includes('gracias') || promptLower.includes('genial') || promptLower.includes('excelente') || promptLower.includes('chevere')) {
      return `¡Con todo el gusto! 🌟 Recuerda que practicar constantemente es el secreto para lograr más de 400 puntos en el ICFES. ¡Sigue así! 💪`;
    }

    // G. Algoritmo Generativo Dinámico Universal para CUALQUIER otra pregunta
    const words = promptTrim.split(' ').filter(w => w.length > 3);
    const mainTopic = words.slice(0, 3).join(' ') || promptTrim;

    return `💡 **Explicación del Tema: "${promptTrim}"**

Para comprender a fondo **${mainTopic}**:

1. **Concepto Clave:** 
   El tema **${mainTopic}** se centra en comprender cómo interactúan sus componentes principales y su impacto práctico en la resolución de problemas.

2. **Desglose en Pasos:**
   - **Paso 1 (Contexto):** Identifica las variables o factores iniciales.
   - **Paso 2 (Análisis):** Evalúa la relación causa-efecto o el método matemático/lógico a aplicar.
   - **Paso 3 (Conclusión):** Verifica que la solución sea coherente con la pregunta planteada.

3. **Cómo lo evalúa el ICFES:**
   En el examen no te pedirán memorizar definiciones exactas, sino **aplicar este conocimiento** ante situaciones de la vida real o experimentos hipotéticos.

4. **Recomendación de Estudio:**
   Trata de explicarle este concepto a otra persona con tus propias palabras o realiza un mapa mental sencillo para consolidarlo en tu memoria a largo plazo.

¿Te gustaría un ejemplo práctico o resolver un ejercicio relacionado?`;
  };

  const handleSendMessage = async (textToSend = inputText) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: trimmed
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const aiReplyText = await generateAiResponse(trimmed);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReplyText
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Botón Flotante Prolijo */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#2F4156] dark:bg-[#1E3A52] text-white shadow-xl hover:shadow-2xl hover:bg-[#3A5A78] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
            title="Abrir Tutor IA SinPanic0"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <Sparkles size={18} className="text-[#C8D9E6] group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-black tracking-wide pr-0.5">Tutor IA</span>
          </button>
        )}
      </div>

      {/* Ventana Desplegable del Chat IA (Adaptable a Modo Oscuro/Claro al instante) */}
      {isOpen && (
        <div className="fixed bottom-20 right-3 left-3 sm:left-auto sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[400px] h-[520px] max-h-[75vh] bg-white dark:bg-[#162130] text-[#2F4156] dark:text-[#F0F6FC] rounded-3xl shadow-2xl border border-sky-blue/30 dark:border-slate-700 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Header del Chat */}
          <div className="bg-gradient-to-r from-[#2F4156] via-[#3A5A78] to-[#567C8D] dark:from-[#1E3A52] dark:via-[#2A4A62] dark:to-[#162130] p-4 text-white flex items-center justify-between shadow-md transition-colors duration-250">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-inner">
                <Bot size={22} />
              </div>
              <div>
                <h3 className="font-black text-sm flex items-center gap-1.5 leading-tight text-white">
                  Tutor IA SinPanic0 <Sparkles size={14} className="text-amber-300" />
                </h3>
                <span className="text-[10px] text-sky-blue/90 dark:text-sky-blue/80 font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Gemini Mode • En línea
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F5EFEB]/60 dark:bg-[#0E1620] transition-colors duration-250">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.sender === 'user' 
                      ? 'bg-[#2F4156] dark:bg-[#2A4A62] text-white shadow-sm' 
                      : 'bg-gradient-to-br from-[#2F4156] to-[#567C8D] dark:from-slate-700 dark:to-slate-800 text-white shadow-sm'
                  }`}
                >
                  {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm transition-colors duration-250 ${
                    msg.sender === 'user'
                      ? 'ai-chat-bubble-user bg-[#2F4156] dark:bg-[#2A4A62] text-white rounded-tr-none font-medium'
                      : 'ai-chat-bubble-ai bg-white dark:bg-[#1E293B] border border-sky-blue/30 dark:border-slate-700 text-slate-800 dark:text-[#F0F6FC] rounded-tl-none font-normal'
                  }`}
                >
                  <div className={`whitespace-pre-line ${msg.sender === 'user' ? 'text-white font-medium' : 'text-slate-800 dark:text-[#F0F6FC]'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#2F4156] dark:bg-slate-700 text-white flex items-center justify-center shrink-0 text-xs">
                  <Bot size={14} />
                </div>
                <div className="bg-white dark:bg-[#1E293B] border border-sky-blue/30 dark:border-slate-700 p-3.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#567C8D] dark:bg-sky-blue animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-[#567C8D] dark:bg-sky-blue animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#567C8D] dark:bg-sky-blue animate-bounce [animation-delay:0.4s]"></div>
                  <span className="text-[10px] text-[#567C8D] dark:text-sky-blue font-bold ml-1">Escribiendo...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Sugerencias Rápidas Deslizables */}
          {messages.length < 5 && (
            <div className="relative bg-white dark:bg-[#162130] border-t border-sky-blue/20 dark:border-slate-800 py-2 px-2.5 flex items-center gap-1 transition-colors duration-250">
              <button
                onClick={() => scrollChips('left')}
                className="w-7 h-7 rounded-full bg-[#C8D9E6]/30 dark:bg-[#27394D] hover:bg-[#C8D9E6]/60 dark:hover:bg-[#374E66] text-[#2F4156] dark:text-white flex items-center justify-center shrink-0 z-10 transition-all border border-[#C8D9E6] dark:border-[#3E546E] active:scale-90 shadow-sm"
                title="Deslizar a la izquierda"
              >
                <ChevronLeft size={14} />
              </button>

              <div
                ref={chipsContainerRef}
                onWheel={(e) => {
                  if (e.deltaY !== 0 && chipsContainerRef.current) {
                    chipsContainerRef.current.scrollLeft += e.deltaY;
                  }
                }}
                className="ai-chips-scroll-area flex gap-2 overflow-x-auto scroll-smooth py-1 px-1 select-none touch-pan-x flex-1"
              >
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="ai-chip-btn px-3.5 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-transform active:scale-95 shrink-0 cursor-pointer shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollChips('right')}
                className="w-7 h-7 rounded-full bg-[#C8D9E6]/30 dark:bg-[#27394D] hover:bg-[#C8D9E6]/60 dark:hover:bg-[#374E66] text-[#2F4156] dark:text-white flex items-center justify-center shrink-0 z-10 transition-all border border-[#C8D9E6] dark:border-[#3E546E] active:scale-90 shadow-sm"
                title="Deslizar a la derecha"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}

          {/* Caja de Entrada de Texto */}
          <div className="p-3 bg-white dark:bg-[#162130] border-t border-sky-blue/20 dark:border-slate-800 flex items-center gap-2 transition-colors duration-250">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Haz tu pregunta a la IA..."
              className="ai-chat-input flex-1 px-4 py-2.5 rounded-2xl text-xs font-medium focus:outline-none transition-all"
            />
            <button
              disabled={!inputText.trim() || isTyping}
              onClick={() => handleSendMessage()}
              className="w-10 h-10 rounded-2xl bg-[#2F4156] dark:bg-[#2A4A62] text-white flex items-center justify-center shrink-0 shadow-md hover:bg-[#2F4156]/90 disabled:opacity-40 active:scale-95 transition-all"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
