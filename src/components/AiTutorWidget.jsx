import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, Key, Check, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * @description Widget Flotante de Tutor IA powered by Google Gemini Style
 * Respuestas fluidas, naturales, bien estructuradas y con ejercicios reales.
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
      text: '¡Hola! 👋 Soy tu Tutor IA alimentado con la tecnología de Google Gemini.\n\nPuedes pedirme explicaciones teóricas, ejercicios de práctica, trucos de estudio o recursos recomendados para el ICFES Saber 11. ¿En qué te ayudo hoy?'
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
    "📝 Dame ejercicios de práctica de Matemáticas",
    "🎥 Canales de YouTube para Matemáticas",
    "📐 Explicación del Teorema de Pitágoras",
    "📖 ¿Cómo abordar la Lectura Crítica?",
    "🏛️ ¿Cómo funciona la Acción de Tutela?",
    "🔬 Leyes de Newton y ejemplos",
    "🇬🇧 Consejos para la prueba de Inglés",
    "📊 ¿Cómo analizar tablas y gráficas?"
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

  // Motor Oficial Google Gemini + Fallback Gemini-Style Auténtico
  const generateAiResponse = async (userPrompt) => {
    const promptTrim = userPrompt.trim();
    const promptLower = promptTrim.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Obtener API Key activa (de localStorage o de entorno VITE)
    const activeApiKey = customApiKey || import.meta.env.VITE_GEMINI_API_KEY;

    // 1. Conexión en vivo a la API de Google Gemini (Gemini 1.5 Flash)
    if (activeApiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeApiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Eres Google Gemini, actuando como el Tutor IA Oficial de SinPanic0 (plataforma de preparación para el examen ICFES Saber 11 en Colombia).
Responde exactamente con el estilo natural, fluido, motivador y estructurado característico de Gemini:
- Inicia con una breve frase introductoria clara y empática.
- Usa títulos limpios en negrita o subtítulos numerados para estructurar la información.
- Si el usuario pide ejercicios o preguntas de práctica, dale ejercicios reales tipo ICFES con sus opciones y respuestas explicadas paso a paso.
- Si pide recomendaciones de videos o canales, dale la lista exacta de canales reales con su descripción.
- Mantén una excelente ortografía y explicaciones rigurosas pero fáciles de entender.
Pregunta del usuario: ${promptTrim}`
              }]
            }]
          })
        });

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } catch (err) {
        console.warn("Fallo temporal en la API de Gemini, cambiando a motor Gemini-Style local:", err);
      }
    }

    // 2. Motor Local Estilo Gemini (Responde igual que Gemini sin frases robóticas)
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));

    // A. Pedidos de Ejercicios Prácticos (Matemáticas, Física, etc.)
    if (promptLower.includes('ejercicio') || promptLower.includes('ejercicios') || promptLower.includes('practica') || promptLower.includes('problema') || promptLower.includes('pregunta')) {
      return `¡Por supuesto! Para subir considerablemente el puntaje en la prueba de Matemáticas del ICFES Saber 11 no necesitas memorizar cientos de fórmulas avanzadas; el examen mide tu capacidad para **razonar, analizar información y resolver problemas del contexto real**.

Aquí tienes 2 ejercicios prácticos tipo ICFES para poner a prueba tus habilidades:

---

### 📝 **Ejercicio 1: Razonamiento Cuantitativo (Porcentajes)**
Una tienda ofrece un descuento del **20%** sobre un artículo. Si compras hoy, recibes un descuento adicional del **10%** sobre el precio ya rebajado. ¿Cuál es el porcentaje total de descuento real aplicado?

A) 30%  
B) 28%  
C) 25%  
D) 20%  

💡 **Solución Explicada:**
1. Supón un valor inicial de **$100**.
2. Con el primer descuento (20%), el valor baja a **$80**.
3. El segundo descuento (10%) se calcula sobre los $80 ➔ $80 \\times 0.10 = $8.
4. Precio final = $80 - $8 = **$72**.
5. Descuento total = $100 - $72 = **28%**. *(Respuesta correcta: **B**)*

---

### 📝 **Ejercicio 2: Geometría (Teorema de Pitágoras)**
Un poste de luz de 12 metros de altura está sujeto por un cable de acero anclado al suelo a 5 metros de la base del poste. ¿Cuál es la longitud del cable?

A) 17 metros  
B) 15 metros  
C) 13 metros  
D) 10 metros  

💡 **Solución Explicada:**
1. Los catetos del triángulo rectángulo son $a = 12$ y $b = 5$.
2. Aplicando la fórmula $c^2 = a^2 + b^2$:
   $c^2 = 12^2 + 5^2 = 144 + 25 = 169$.
3. La raíz cuadrada de 169 es **13 metros**. *(Respuesta correcta: **C**)*

¡Dime si deseas resolver más ejercicios o si tienes dudas en algún paso!`;
    }

    // B. Recomendación de Videos / YouTube / Canales
    if (promptLower.includes('youtube') || promptLower.includes('video') || promptLower.includes('canal') || promptLower.includes('canales') || promptLower.includes('link') || promptLower.includes('enlace')) {
      return `Para preparar la prueba de Matemáticas del ICFES con recursos audiovisuales de calidad, existen canales altamente especializados que explican desde la lógica básica hasta simulacros completos.

Aquí tienes los 4 mejores canales recomendados:

1. **Profe Alex:**  
   Es ideal para reforzar bases de álgebra, aritmética y geometría desde cero. Sus videos son breves, conceptuales y muy ilustrativos.

2. **JulioProfe:**  
   Es la referencia principal para comprender procedimientos paso a paso en trigonometría, ecuaciones y cálculo.

3. **Daniel Carreón:**  
   Ofrece explicaciones muy dinámicas con trucos de agilidad mental y cálculo rápido, perfectos para ahorrar tiempo durante el examen.

4. **Saber 11 ICFES / Puntaje Nacional Colombia:**  
   Publican transmisiones en vivo resolviendo simulacros oficiales con análisis de opciones distractores.

💡 **Consejo de Estudio:** Intenta pausar el video en el enunciado de la pregunta, resuelve el problema en papel y luego comprueba el procedimiento presentado.`;
    }

    // C. Explicación Teórica de Matemáticas / Pitágoras
    if (promptLower.includes('pitagoras') || promptLower.includes('matematica') || promptLower.includes('triangulo') || promptLower.includes('formula')) {
      return `El **Teorema de Pitágoras** es uno de los pilares más evaluados en el componente de Geometría y Razonamiento Cuantitativo del ICFES.

### 📐 **Fundamento del Teorema**
Establece que en todo **triángulo rectángulo** (aquel que posee un ángulo de 90°), el área del cuadrado construido sobre la hipotenusa es igual a la suma de las áreas de los cuadrados de los catetos:

$$\\mathbf{c^2 = a^2 + b^2}$$

Donde:
- **$c$** es la hipotenusa (el lado más largo, opuesto al ángulo recto).
- **$a$** y **$b$** son los catetos.

### ⚡ **Triángulos Notables Frecuentes en el ICFES**
Conocer las ternas pitagóricas te ahorrará realizar cálculos largos durante el examen:
- **3 - 4 - 5:** Si los catetos son 3 y 4, la hipotenusa siempre vale **5**.
- **5 - 12 - 13:** Si los catetos son 5 y 12, la hipotenusa siempre vale **13**.

¿Te gustaría practicar un problema real aplicado a este tema?`;
    }

    // D. Lectura Crítica
    if (promptLower.includes('lectura') || promptLower.includes('critica') || promptLower.includes('texto') || promptLower.includes('tesis')) {
      return `La prueba de **Lectura Crítica** no mide qué tan rápido lees, sino tu capacidad para **comprender, interpretar y evaluar la validez de un texto**.

Aquí tienes una estrategia concreta estructurada en 3 niveles de análisis:

1. **Nivel Literal (Lo que el texto dice explícitamente):**
   Identifica datos concretos, nombres, fechas o afirmaciones directas del autor.

2. **Nivel Inferencial (Lo que se deduce entre líneas):**
   Comprende la intención del autor, la relación entre párrafos y el significado de conectores lógicos como *sin embargo*, *por consiguiente* o *no obstante*.

3. **Nivel Crítico (Evaluación del contenido):**
   Diferencia una **tesis** (postura del autor) de las **premisas** (evidencias). Evalúa si los argumentos son sólidos o presentan falacias.`;
    }

    // E. Ciencias Naturales (Física, Química, Biología)
    if (promptLower.includes('biologia') || promptLower.includes('fisica') || promptLower.includes('quimica') || promptLower.includes('newton') || promptLower.includes('fuerza')) {
      return `En **Ciencias Naturales**, el ICFES evalúa el uso comprensivo del conocimiento científico y la capacidad para indagar fenómenos.

### 🔬 **Conceptos Clave:**
- **Física (Leyes de Newton):** La segunda ley establece que $\\vec{F} = m \\cdot \\vec{a}$. A mayor masa, menor será la aceleración para una misma fuerza aplicada.
- **Química (Ley de Conservación):** La masa total de los reactivos debe ser idéntica a la masa de los productos en cualquier reacción química equilibrada.
- **Biología (Evolución y Genética):** La selección natural actúa sobre la variabilidad genética existente, favoreciendo a los organismos mejor adaptados al entorno.`;
    }

    // F. Sociales y Tutela
    if (promptLower.includes('tutela') || promptLower.includes('sociales') || promptLower.includes('constitucion') || promptLower.includes('derecho')) {
      return `En **Sociales y Competencias Ciudadanas**, la **Acción de Tutela** es una de las herramientas constitucionales más examinadas.

### 🏛️ **Aspectos Fundamentales:**
- **Origen:** Creada en la Constitución Política de Colombia de 1991 (Artículo 86).
- **Propósito:** Proteger de forma rápida y preferente los **Derechos Fundamentales** (Salud, Vida, Educación, Debido Proceso).
- **Plazo de Respuesta:** El juez debe emitir fallo en un plazo máximo de **10 días hábiles**.
- **Diferencia Clave:** Es un mecanismo individual; la *Acción Popular* protege derechos colectivos como el medio ambiente sano.`;
    }

    // G. Inglés
    if (promptLower.includes('ingles') || promptLower.includes('english') || promptLower.includes('grammar')) {
      return `La prueba de **Inglés** evalúa tu competencia lectora y gramatical dividida en 7 partes.

### 🇬🇧 **Estrategias Efectivas:**
- **Avisos Públicos (Partes 1 y 2):** Asocia palabras clave del anuncio con lugares comunes (*Airport, Library, Supermarket*).
- **Conversaciones Cortas (Parte 3):** Identifica el registro adecuado (formal vs informal).
- **Lectura Comprensiva (Partes 4 a 7):** Lee primero las preguntas para saber exactamente qué información buscar en el texto.`;
    }

    // H. Saludos
    if (promptLower.includes('hola') || promptLower.includes('buenas') || promptLower.includes('buenos')) {
      return `¡Hola! 👋 Qué gusto saludarte. Soy tu Tutor IA alimentado por Google Gemini. 

¿En qué materia o tema te gustaría profundizar hoy? Puedo explicarte conceptos, darte ejercicios de práctica o darte consejos de estudio.`;
    }

    // I. Respuesta Generativa Abierta Gemini-Style (Para cualquier otro tema)
    return `Entiendo tu consulta sobre **"${promptTrim}"**.

Para abordar este tema con la profundidad adecuada en tu preparación académica:

1. **Análisis Principal:** Examina las variables fundamentales involucradas y cómo interactúan entre sí dentro de la situación o problema.
2. **Enfoque ICFES:** Recuerda que la prueba Saber 11 premia la capacidad de analizar situaciones y deducir conclusiones sobre la memorización.
3. **Estrategia Recomendada:** Revisa las opciones de respuesta eliminando primero aquellas que contradigan las condiciones dadas en el enunciado.

¡Pídeme un ejemplo práctico o ejercicios sobre este tema si deseas profundizar más!`;
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
                  {customApiKey ? 'Gemini Key Personal Activa' : 'Google Gemini Engine'}
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

          {/* Modal de Configuración de Key Gemini */}
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
                Ingresa tu API Key de Google Gemini para vincular la IA directamente con los servidores de Google AI Studio.
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
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm transition-colors duration-250 ${
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
                  <span className="text-[10px] text-[#567C8D] dark:text-sky-blue font-bold ml-1">Gemini está pensando...</span>
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
              placeholder="Pregunta a la IA Gemini..."
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
