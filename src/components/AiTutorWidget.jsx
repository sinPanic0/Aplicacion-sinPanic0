import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, RefreshCw, Lightbulb, Zap, BookOpen } from 'lucide-react';

/**
 * @description Widget Flotante de Tutor IA (Estilo Prolijo y Elegante SinPanic0)
 * Botón tipo píldora limpio con animación sutil, paleta Navy (#2F4156), Teal (#567C8D) y Sky-Blue (#C8D9E6).
 */
export const AiTutorWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: '¡Hola! 👋 Soy tu Tutor IA de SinPanic0. ¿En qué tema o materia tienes dudas hoy? ¡Pregúntame sobre cualquier pregunta o concepto del ICFES!'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

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
    "🇬🇧 Tips para el componente de Inglés"
  ];

  // Motor Inteligente de Inteligencia Artificial para el ICFES
  const generateAiResponse = async (userPrompt) => {
    const promptLower = userPrompt.toLowerCase();
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Eres el Tutor IA oficial de la aplicación SinPanic0, un experto pedagógico en las Pruebas ICFES de Colombia. Responde de forma clara, didáctica, motivadora y estructurada con viñetas cuando sea apropiado. Pregunta del estudiante: ${userPrompt}`
              }]
            }]
          })
        });
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } catch (err) {
        console.warn("Fallback a motor local de IA por error de red o API key:", err);
      }
    }

    await new Promise(resolve => setTimeout(resolve, 700 + Math.random() * 500));

    if (promptLower.includes('lectura') || promptLower.includes('crítica') || promptLower.includes('texto')) {
      return `📚 **Estrategia Clave para Lectura Crítica ICFES:**

1. **Identifica la Tesis:** Lee primero el primer y último párrafo. Por lo general, allí se concentra la postura central del autor.
2. **Diferencia Hecho vs Opinión:** 
   - *Hecho:* "El 25% de los encuestados reportó estrés." (Dato objetivo)
   - *Opinión:* "La tecnología destruirá la sociedad." (Postura del autor)
3. **Atento a los Conectores:** Palabras como *"sin embargo"*, *"no obstante"* o *"en cambio"* señalan giros clave en el argumento.
4. **Cuidado con las Falacias:** El ICFES evalúa constantemente falacias como el *hombre de paja* (deformar el argumento contrario) o *ad hominem*.`;
    }

    if (promptLower.includes('pitágoras') || promptLower.includes('matemática') || promptLower.includes('triángulo') || promptLower.includes('fórmula')) {
      return `📐 **Teorema de Pitágoras & Matemáticas ICFES:**

La ecuación central para triángulos rectángulos es:
$$\\mathbf{c^2 = a^2 + b^2}$$

donde **c** es la hipotenusa (el lado más largo) y **a, b** son los catetos.

**Triángulos Notables más Evaluados:**
- **3 - 4 - 5**: Si los catetos son 3 y 4, la hipotenusa es 5.
- **5 - 12 - 13**: Si los catetos son 5 y 12, la hipotenusa es 13.
- **Isósceles Rectángulo (45°)**: Hipotenusa = $a\\sqrt{2}$.

💡 *Tip SinPanic0:* Usar triángulos notables te ahorrará valiosos minutos de cálculo durante el examen.`;
    }

    if (promptLower.includes('biología') || promptLower.includes('selección') || promptLower.includes('ciencia') || promptLower.includes('célula')) {
      return `🔬 **Ciencias Naturales - Concepto Clave:**

La **Selección Natural** explica cómo cambian las poblaciones en el tiempo:

1. **Variabilidad Genética:** Los individuos nacen con diferencias heredables.
2. **Presión de Selección:** El ambiente (clima, depredadores, recursos) limita la supervivencia.
3. **Reproducción Diferencial:** Los mejor adaptados dejan más descendencia.

💡 *Ojo para el ICFES:* Los antibióticos NO provocan las mutaciones en las bacterias; las bacterias resistentes ya existían y el antibiótico elimina a las débiles, permitiendo que las resistentes dominen.`;
    }

    if (promptLower.includes('tutela') || promptLower.includes('sociales') || promptLower.includes('constitución') || promptLower.includes('derecho')) {
      return `🏛️ **Sociales y Ciudadanas - Acción de Tutela:**

La **Acción de Tutela** (Art. 86 de la Constitución de 1991) es un tema fijo en el ICFES:

- **Objetivo:** Proteger de manera rápida e inmediata tus **Derechos Fundamentales** (Salud, Vida, Debido Proceso, Educación).
- **Características:** No requiere abogado, es preferente y el juez debe responder en máximo **10 días hábiles**.

💡 *Diferencia clave:* La Tutela protege *derechos individuales*, mientras que la **Acción Popular** defiende *derechos colectivos* (como el medio ambiente o la moralidad administrativa).`;
    }

    if (promptLower.includes('inglés') || promptLower.includes('english') || promptLower.includes('tip') || promptLower.includes('vocabulario')) {
      return `🇬🇧 **Estrategias para la Prueba de Inglés:**

1. **Parte 1 (Carteles y Avisos):** Busca palabras clave. Si lees *"Unattended luggage"*, la respuesta es *Airport*. Si dice *"Silence in the reading room"*, es *Library*.
2. **Conditionals:**
   - **First Conditional:** *If I study, I will pass.*
   - **Second Conditional:** *If I studied, I would pass.*
3. **Comprensión:** Lee primero las preguntas y luego escanea el texto buscando los sustantivos y verbos clave.`;
    }

    if (promptLower.includes('hola') || promptLower.includes('buenos') || promptLower.includes('buenas')) {
      return `¡Hola! 👋 Qué gusto saludarte. Estoy listo para resolver cualquier duda que tengas sobre Lectura Crítica, Matemáticas, Sociales, Ciencias Naturales o Inglés. ¿Por dónde empezamos?`;
    }

    if (promptLower.includes('gracias') || promptLower.includes('excelente') || promptLower.includes('genial')) {
      return `¡Con todo el gusto! 🌟 La disciplina vence al talento. Sigue estudiando con SinPanic0 y lograrás el mejor puntaje. 💪`;
    }

    return `💡 **Explicación Pedagógica:**

Respecto a **"${userPrompt}"**:

1. **Enfoque ICFES:** Este tema requiere razonar la relación de causa y efecto más que memorizar datos aislados.
2. **Consejo de Estudio:**
   - Escribe un resumen de 3 líneas con tus propias palabras.
   - Aplica el **Método de Recuperación Activa**: pon a prueba tu memoria antes de revisar la teoría.
3. **Práctica recomendada:** Realiza los exámenes de práctica en la sección de materias para afianzar este concepto.

¿Deseas profundizar en algún punto en particular?`;
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
      {/* Botón Flotante Prolijo (Diseño Cápsula Elegante SinPanic0) */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#2F4156] text-white shadow-xl shadow-navy/20 hover:shadow-2xl hover:bg-[#3A5A78] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
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

      {/* Ventana Desplegable del Chat IA */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-sky-blue/30 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Header del Chat */}
          <div className="bg-gradient-to-r from-[#2F4156] via-[#3A5A78] to-[#567C8D] p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-inner">
                <Bot size={22} />
              </div>
              <div>
                <h3 className="font-black text-sm flex items-center gap-1.5 leading-tight">
                  Tutor IA SinPanic0 <Sparkles size={14} className="text-amber-300" />
                </h3>
                <span className="text-[10px] text-sky-blue/90 font-bold flex items-center gap-1 mt-0.5">
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

          {/* Área de Mensajes en fondo Beige cálido (#F5EFEB) */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F5EFEB]/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.sender === 'user' 
                      ? 'bg-[#2F4156] text-white shadow-sm' 
                      : 'bg-gradient-to-br from-[#2F4156] to-[#567C8D] text-white shadow-sm'
                  }`}
                >
                  {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#2F4156] text-white rounded-tr-none font-medium'
                      : 'bg-white border border-sky-blue/30 text-[#2F4156] rounded-tl-none font-normal'
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#2F4156] text-white flex items-center justify-center shrink-0 text-xs">
                  <Bot size={14} />
                </div>
                <div className="bg-white border border-sky-blue/30 p-3.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#567C8D] animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-[#567C8D] animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#567C8D] animate-bounce [animation-delay:0.4s]"></div>
                  <span className="text-[10px] text-[#567C8D] font-bold ml-1">Escribiendo...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Sugerencias Rápidas */}
          {messages.length < 5 && (
            <div className="p-2 bg-white border-t border-sky-blue/20 flex gap-1.5 overflow-x-auto scrollbar-none">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="px-3 py-1.5 bg-[#C8D9E6]/30 hover:bg-[#C8D9E6]/60 text-[#2F4156] rounded-full text-[11px] font-bold whitespace-nowrap border border-[#C8D9E6] transition-colors shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Caja de Entrada de Texto */}
          <div className="p-3 bg-white border-t border-sky-blue/20 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Haz tu pregunta a la IA..."
              className="flex-1 px-4 py-2.5 bg-[#F5EFEB] border border-sky-blue/30 rounded-2xl text-xs font-medium text-[#2F4156] focus:outline-none focus:ring-2 focus:ring-[#2F4156] focus:bg-white transition-all"
            />
            <button
              disabled={!inputText.trim() || isTyping}
              onClick={() => handleSendMessage()}
              className="w-10 h-10 rounded-2xl bg-[#2F4156] text-white flex items-center justify-center shrink-0 shadow-md hover:bg-[#2F4156]/90 disabled:opacity-40 active:scale-95 transition-all"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
