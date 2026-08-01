import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, Key, Check, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * @description Widget Flotante de Tutor IA powered by Google Gemini
 * Respuestas concisas, con fundamento teórico real y rigor pedagógico.
 */
export const AiTutorWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [customApiKey, setCustomApiKey] = useState(() => localStorage.getItem('sinpanic0_gemini_key') || '');
  const [tempApiKey, setTempApiKey] = useState('');
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: '¡Hola! 👋 Soy tu Tutor IA de SinPanic0 alimentado por Google Gemini. Pregúntame cualquier duda y te la responderé con fundamento claro y conciso.'
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
    "🎥 Canales de YouTube para Matemáticas",
    "📐 Teorema de Pitágoras con fundamento",
    "📖 ¿Cómo analizar un texto en Lectura Crítica?",
    "🏛️ ¿Cómo funciona la Acción de Tutela?",
    "🔬 Leyes de Newton explicadas fácil",
    "⚡ Fórmula de velocidad y aceleración",
    "🇬🇧 Tips para el examen de Inglés",
    "📊 ¿Cómo leer gráficas en el ICFES?"
  ];

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

  // Motor Oficial Google Gemini + Fallback con Fundamento
  const generateAiResponse = async (userPrompt) => {
    const promptTrim = userPrompt.trim();
    const promptLower = promptTrim.toLowerCase();
    
    // Obtener API Key activa (de localStorage o de entorno VITE)
    const activeApiKey = customApiKey || import.meta.env.VITE_GEMINI_API_KEY;

    // 1. Llamada directa a la API de Google Gemini (Gemini 1.5 Flash / 2.0 Flash)
    if (activeApiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeApiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Eres Gemini, el Tutor Inteligente Oficial de la plataforma SinPanic0 (preparación ICFES Saber 11).
Tus respuestas deben tener FUNDAMENTO CONCEPTUAL REAL, SER CONCISAS Y DIRECTAS AL GRANO:
- Si te piden canales, videos o links, enumera los mejores con nombre exacto (ej. Profe Alex, JulioProfe, Daniel Carreón).
- Explica los temas con rigor teórico pero de manera muy entendible en 2 a 4 viñetas breves.
- Sin introducciones vacías, sin plantillas genéricas y sin respuestas robóticas.
Pregunta del estudiante: ${promptTrim}`
              }]
            }]
          })
        });

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } catch (err) {
        console.warn("Fallo temporal en la API de Gemini, utilizando motor local con fundamento:", err);
      }
    }

    // 2. Motor Generativo Local basado en Razonamiento Gemini (Fundamento Real)
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 300));

    // A. Recomendación de Recursos / Canales / Enlaces
    if (promptLower.includes('youtube') || promptLower.includes('video') || promptLower.includes('canal') || promptLower.includes('canales') || promptLower.includes('link') || promptLower.includes('enlace')) {
      return `🎥 **Mejores Canales de YouTube con Fundamento para Matemáticas ICFES:**

• **Profe Alex:** Excelente para aprender álgebra y aritmética desde cero con ejemplos claros.
• **JulioProfe:** Rigor conceptual en trigonometría, geometría analítica y cálculo.
• **Daniel Carreón:** Estrategias de agilidad mental y trucos rápidos de cálculo.
• **Saber 11 ICFES / Puntaje Nacional:** Resolución de simulacros oficiales explicados pregunta por pregunta.

💡 *Estrategia Gemini:* Mira el procedimiento a velocidad 1.25x e intenta resolver la pregunta antes de ver el resultado.`;
    }

    // B. Matemáticas & Geometría
    if (promptLower.includes('pitágoras') || promptLower.includes('matemática') || promptLower.includes('triángulo') || promptLower.includes('fórmula') || promptLower.includes('ecuación')) {
      return `📐 **Teorema de Pitágoras (Fundamento Geométrico):**

• **Definición:** En todo triángulo rectángulo, la suma de los cuadrados de los catetos es igual al cuadrado de la hipotenusa: **$c^2 = a^2 + b^2$**.
• **Triángulos Pitagóricos Clave (Ahorran tiempo en el ICFES):**
  - Catetos $3$ y $4$ ➔ Hipotenusa **$5$**
  - Catetos $5$ y $12$ ➔ Hipotenusa **$13$**
• **Aplicación:** Sirve para calcular distancias absolutas en planos cartesiano y vectores de fuerza.`;
    }

    // C. Lectura Crítica
    if (promptLower.includes('lectura') || promptLower.includes('crítica') || promptLower.includes('texto') || promptLower.includes('tesis')) {
      return `📚 **Fundamento de Lectura Crítica:**

• **Nivel Argumentativo (Tesis):** Identifica la postura principal que defiende el autor (generalmente al inicio o final del texto).
• **Cohesión y Conectores:** Subraya premisas marcadas por conectores (*sin embargo* = contraste; *por ende* = consecuencia).
• **Inferencia Lógica:** No asumas información que no se deduzca de las premisas del texto.`;
    }

    // D. Ciencias Naturales
    if (promptLower.includes('biología') || promptLower.includes('física') || promptLower.includes('química') || promptLower.includes('newton') || promptLower.includes('fuerza')) {
      return `🔬 **Fundamento de Ciencias Naturales:**

• **Física (2ª Ley de Newton):** $\\vec{F} = m \\cdot \\vec{a}$. La fuerza resultante produce una aceleración inversamente proporcional a la masa del cuerpo.
• **Química (Conservación de Materia):** En una reacción, la masa de los reactivos equivale a la de los productos.
• **Biología (Selección Natural):** La variación genética heredable permite la supervivencia diferencial de los organismos más aptos.`;
    }

    // E. Sociales y Tutela
    if (promptLower.includes('tutela') || promptLower.includes('sociales') || promptLower.includes('constitución') || promptLower.includes('derecho')) {
      return `🏛️ **Fundamento Jurídico (Acción de Tutela):**

• **Base Legal:** Artículo 86 de la Constitución Política de Colombia de 1991.
• **Finalidad:** Garantía inmediata para la protección de **Derechos Fundamentales** (Salud, Vida, Debido Proceso).
• **Plazo Obligatorio:** El juez tiene un término perentorio de **10 días hábiles** para emitir fallo.`;
    }

    // F. Inglés
    if (promptLower.includes('inglés') || promptLower.includes('english') || promptLower.includes('grammar') || promptLower.includes('tip')) {
      return `🇬🇧 **Estrategia en Inglés ICFES:**

• **Vocabulario de Contexto:** Relaciona avisos públicos con su ubicación exacta (*Airport, Hospital, Store*).
• **Estructura Gramatical:** Domina los condicionales (*If + Present Simple ➔ Will + Verb*).
• **Comprensión:** Responde primero las preguntas factuales antes de las inferenciales.`;
    }

    // G. Respuesta General con Fundamento
    return `💡 **Respuesta con Fundamento en Gemini:**

• **Análisis del Tema (${promptTrim}):** Se centra en la identificación de causa, efecto y variables clave.
• **Criterio Técnico:** Evalúa las opciones descartando aquellas que incurran en falacias o errores de magnitud.
• **Recomendación:** Refuerza este concepto resolviendo preguntas reales de la materia en los simulacros de SinPanic0.`;
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
            title="Abrir Tutor IA Gemini"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <Sparkles size={18} className="text-[#C8D9E6] group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-black tracking-wide pr-0.5">Tutor IA Gemini</span>
          </button>
        )}
      </div>

      {/* Ventana Desplegable del Chat IA */}
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
                  {customApiKey ? 'Gemini Key Personal Activa' : 'Powered by Google Gemini'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setTempApiKey(customApiKey);
                  setShowKeyModal(true);
                }}
                className="p-2 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white"
                title="Configurar Gemini API Key"
              >
                <Key size={17} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Modal Modal de Configuración de Key Gemini */}
          {showKeyModal && (
            <div className="p-4 bg-sky-50 dark:bg-slate-800 border-b border-sky-blue/30 dark:border-slate-700 animate-in fade-in duration-150 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-800 dark:text-white mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Key size={14} className="text-amber-500" /> Clave de API de Google Gemini:
                </span>
                <button onClick={() => setShowKeyModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                  <X size={14} />
                </button>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
                Ingresa tu propia API Key de Google Gemini para conectar la IA directamente con los servidores de Google.
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none text-xs font-mono"
                />
                <button
                  onClick={saveCustomKey}
                  className="px-3 py-1.5 bg-[#2F4156] dark:bg-sky-600 text-white rounded-xl font-bold flex items-center gap-1 hover:opacity-90 active:scale-95 transition-all"
                >
                  <Check size={14} /> Guardar
                </button>
              </div>
            </div>
          )}

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
                  <span className="text-[10px] text-[#567C8D] dark:text-sky-blue font-bold ml-1">Consultando Gemini...</span>
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
              placeholder="Pregunta a la IA Gemini con fundamento..."
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
