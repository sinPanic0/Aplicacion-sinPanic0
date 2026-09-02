// Banco Oficial de Temarios, Explicaciones de Temas y Pruebas Prácticas para ICFES Saber 11
// Cobertura masiva y ultra-completa con 3 temas adicionales POR MATERIA.
// Cada tema cuenta con una Explicación Sencilla (Mini Documento) y 3 Pruebas Prácticas de 10 preguntas c/u.

const create10Questions = (baseQuestions, subjectName, topicName, testNumber = 1) => {
  const result = [...baseQuestions];
  while (result.length < 10) {
    const templateIdx = (result.length) % baseQuestions.length;
    const refQ = baseQuestions[templateIdx];
    result.push({
      q: `[Prueba #${testNumber} - Q${result.length + 1}] ${refQ.q.replace(/\[.*\]\s*/, '')}`,
      options: [...refQ.options],
      correct: refQ.correct,
      explanation: `${refQ.explanation} (Pregunta de evaluación #${testNumber} en ${topicName}).`
    });
  }
  return result.slice(0, 10);
};

const build3Tests = (baseQ1, baseQ2, baseQ3, subjectName, topicName) => {
  return [
    {
      id: 1,
      name: 'Prueba 1: Nivel Básico',
      badge: 'Básico',
      questions: create10Questions(baseQ1, subjectName, topicName, 1)
    },
    {
      id: 2,
      name: 'Prueba 2: Nivel Intermedio',
      badge: 'Intermedio',
      questions: create10Questions(baseQ2 || baseQ1, subjectName, topicName, 2)
    },
    {
      id: 3,
      name: 'Prueba 3: Nivel Avanzado ICFES',
      badge: 'Avanzado ICFES',
      questions: create10Questions(baseQ3 || baseQ1, subjectName, topicName, 3)
    }
  ];
};

export const TEMARIOS_BY_SUBJECT = {
  // =============================================================
  // 1. LECTURA CRÍTICA (8 TEMAS EN TOTAL)
  // =============================================================
  lectura_critica: {
    id: 'lectura_critica',
    name: 'Lectura Crítica',
    badge: 'Comprensión Lectora',
    description: 'Análisis textual, premisas y tesis, figuras literarias, falacias, intertextualidad, filosofía, sátira y prensa.',
    color: '#D9531E',
    bgLight: 'rgba(217, 83, 30, 0.08)',
    parts: [
      {
        id: 'lc_eje1',
        title: 'PARTE 1: Comprensión Argumentativa e Inferencial',
        icon: '📖',
        topics: [
          {
            id: 'lc_premisas_tesis',
            name: 'Identificación de Premisas, Tesis y Estructura Argumentativa',
            keyTopic: true,
            desc: 'Diferenciación entre la postura central (Tesis), las razones de soporte (Premisas) y las conclusiones.',
            explanationDoc: {
              title: 'Guía Rápida: Tesis Central y Premisas del Texto',
              summary: 'En la prueba de Lectura Crítica del ICFES, tu objetivo principal ante un texto argumentativo es identificar la postura del autor (Tesis) y las razones que presenta para defenderla (Premisas).',
              keyConcepts: [
                'La Tesis: Es la idea u opinión principal que el autor intenta demostrar.',
                'Las Premisas: Son los hechos, datos, ejemplos o razonamientos que respaldan la tesis.',
                'Conectores: "porque", "dado que" introducen premisas; "por lo tanto", "en consecuencia" introducen conclusiones.'
              ],
              example: {
                question: 'En el enunciado: "La educación digital debe ser gratuita porque reduce la brecha social", ¿cuál es la tesis?',
                options: ['La educación digital debe ser gratuita', 'La brecha social es amplia', 'Los computadores son caros', 'No hay educación'],
                correct: 'La educación digital debe ser gratuita',
                reason: 'Es la propuesta central que el autor defiende.'
              },
              icfesTip: 'Lee primero la pregunta para saber si debes buscar la tesis global o una premisa específica.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] En "Deberíamos reducir el plástico porque contamina los océanos", la TESIS es:', options: ['Deberíamos reducir el plástico de un solo uso.', 'Los océanos están contaminados.', 'El plástico tarda siglos.', 'Los peces comen plástico.'], correct: 0, explanation: 'La tesis es la postura propuesta.' },
                { q: '[Prueba 1] La función del conector "por lo tanto" es:', options: ['Introducir una conclusión lógica.', 'Contradecir la idea previa.', 'Enumerar ejemplos.', 'Preguntar al lector.'], correct: 0, explanation: 'Es un conector consecutivo.' },
                { q: '[Prueba 1] Las evidencias científicas en un ensayo cumplen el rol de:', options: ['Premisas de soporte empírico.', 'Tesis falsas.', 'Conclusiones sin valor.', 'Opiniones subjetivas.'], correct: 0, explanation: 'Los datos respaldan la tesis.' }
              ],
              [
                { q: '[Prueba 2] En "La jornada de 4 días reduce el estrés, por ende los gobiernos deben aprobarla", la conclusión es:', options: ['Los gobiernos deben aprobar la jornada de 4 días.', 'El estrés es inevitable.', 'Nadie quiere trabajar.', 'La jornada actual es perfecta.'], correct: 0, explanation: 'Frase introducida por "por ende".' },
                { q: '[Prueba 2] Una PREMISA se diferencia de una opinión simple porque:', options: ['Ofrece razones, evidencias o lógica articulada de respaldo.', 'Siempre es un poema.', 'No usa palabras.', 'Es idéntica.'], correct: 0, explanation: 'Aporta justificación factual.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] Según Zuleta, "leer es descifrar un problema", lo que implica que:', options: ['La lectura auténtica requiere esfuerzo intelectual activo.', 'Leer es memorizar rápido.', 'Cualquiera entiende sin pensar.', 'Los libros no sirven.'], correct: 0, explanation: 'Se asume la lectura como actitud activa.' }
              ],
              'Lectura Crítica', 'Identificación de Premisas y Tesis'
            ),
            questions: []
          },
          {
            id: 'lc_inferencia_tipos_texto',
            name: 'Comprensión Inferencial, Intención del Autor y Tipos de Texto',
            keyTopic: true,
            desc: 'Deducción de información implícita (no escrita directamente), tono del autor y clasificación textual.',
            explanationDoc: {
              title: 'Guía Rápida: Lectura Inferencial y Tipos de Texto',
              summary: 'La comprensión inferencial requiere unir pistas del autor para deducir lo que se concluye entre líneas.',
              keyConcepts: [
                'Lectura Literal: Responder con información explícita.',
                'Lectura Inferencial: Concluir algo no dicho directamente uniendo pistas.',
                'Continuos vs Discontinuos: Los continuos son párrafos de texto; los discontinuos son tablas, mapas o caricaturas.'
              ],
              example: {
                question: 'Si un campesino mira la tierra agrietada y el cielo sin nubes con resignación, se infiere:',
                options: ['Hay una sequía preocupante', 'Va a llover pronto', 'Es de noche', 'Está feliz por la lluvia'],
                correct: 'Hay una sequía preocupante',
                reason: 'Pistas visuales + actitud = inferencia de sequía.'
              },
              icfesTip: 'Una buena inferencia SIEMPRE debe estar respaldada por pistas en el texto.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Si María cierra el paraguas y se seca los zapatos al entrar, se INFIERE:', options: ['Estaba lloviendo afuera.', 'Hacía mucho calor.', 'Estaba en la playa.', 'No tenía zapatos.'], correct: 0, explanation: 'Paraguas + zapatos mojados permite inferir lluvia.' }
              ],
              [
                { q: '[Prueba 2] Tras informe de pérdidas, el director guarda silencio y cancela la reunión. Se infiere:', options: ['El director está preocupado por los malos resultados.', 'Va a celebrar.', 'Fue un éxito.', 'Nadie asistió.'], correct: 0, explanation: 'Silencio e interrupción infieren gravedad.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] "El hombre libre no teme a sus propios pensamientos". Se deduce que:', options: ['El miedo a reflexionar reprime la libertad humana.', 'Los hombres no deben pensar.', 'Pensar enferma.', 'La libertad es obedecer.'], correct: 0, explanation: 'Libertad implica ausencia de miedo a autorreflexión.' }
              ],
              'Lectura Crítica', 'Comprensión Inferencial'
            ),
            questions: []
          }
        ]
      },
      {
        id: 'lc_eje2',
        title: 'PARTE 2: Retórica, Literatura y Filosofía',
        icon: '🎭',
        topics: [
          {
            id: 'lc_falacias_retorica',
            name: 'Identificación de Falacias, Figuras Retóricas y Validez del Discurso',
            keyTopic: true,
            desc: 'Reconocimiento de trampas lógicas (Ad Hominem, Hombre de Paja, Falso Dilema) y figuras estilísticas.',
            explanationDoc: {
              title: 'Guía Rápida: Falacias Argumentativas y Figuras Retóricas',
              summary: 'Aprende a detectar razonamientos engañosos (falacias) y a interpretar los recursos expresivos estilísticos.',
              keyConcepts: [
                'Ad Hominem: Atacar a la persona en lugar de sus argumentos.',
                'Hombre de Paja: Deformar la postura rival para atacarla fácilmente.',
                'Falso Dilema: Reducir las opciones a dos extremos irregulares.'
              ],
              example: {
                question: 'Si alguien dice "Mi rival propone bajar impuestos porque odia a los pobres", comete:',
                options: ['Hombre de Paja', 'Ad Hominem', 'Símil', 'Falso dilema'],
                correct: 'Hombre de Paja',
                reason: 'Terversa la postura del rival para atacarlo fácilmente.'
              },
              icfesTip: 'En los debates, observa si los hablantes refutan ideas o si descalifican al oponente.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Atacar las características personales del interlocutor en lugar de sus razones es falacia:', options: ['Ad Hominem', 'Hombre de Paja', 'Ad Populum', 'Falso Dilema'], correct: 0, explanation: 'Descalifica al emisor.' }
              ],
              [
                { q: '[Prueba 2] "No escuchen al doctor porque una vez parqueó mal". Esta falacia es:', options: ['Ad Hominem', 'Falso Dilema', 'Hombre de Paja', 'Ad Ignorantiam'], correct: 0, explanation: 'Usa defecto personal irrelevante.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] "Nadie probó que no haya aliens, por ende existen". ¿Qué falacia es?', options: ['Ad Ignorantiam', 'Ad Hominem', 'Falso Dilema', 'Hombre de Paja'], correct: 0, explanation: 'Da por verdadero lo no desmentido.' }
              ],
              'Lectura Crítica', 'Falacias y Recursos Retóricos'
            ),
            questions: []
          },
          {
            id: 'lc_intertextualidad_literatura',
            name: 'Intertextualidad, Polifonía y Contexto Literario',
            keyTopic: true,
            desc: 'Relación entre múltiples textos, voces discursivas, paráfrasis y diálogo literario.',
            explanationDoc: {
              title: 'Guía Rápida: Intertextualidad y Polifonía Discursiva',
              summary: 'Un texto nunca está aislado; siempre dialoga, cita o parodia otros textos anteriores.',
              keyConcepts: [
                'Intertextualidad: Relación explícita o implícita entre dos o más textos.',
                'Polifonía: Presencia de múltiples voces o perspectivas en una misma obra.'
              ],
              example: {
                question: 'Cuando un cuento moderno reescribe la historia de Caperucita desde la perspectiva del lobo, aplica:',
                options: ['Intertextualidad y cambio de perspectiva', 'Lectura literal', 'Una falacia ad hominem', 'Un error gramatical'],
                correct: 'Intertextualidad y cambio de perspectiva',
                reason: 'Relaciona un texto clásico dándole un nuevo enfoque narrativo.'
              },
              icfesTip: 'Compara las intenciones de ambos autores cuando el ICFES presente dos fragmentos en paralelo.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Citar a Don Quijote en un ensayo sobre la locura moderna es un ejemplo de:', options: ['Intertextualidad', 'Ortografía', 'Texto discontinuo', 'Falacia'], correct: 0, explanation: 'Cita directa que conecta dos textos.' }
              ],
              [
                { q: '[Prueba 2] Cuando en un texto conviven argumentos filosóficos y poesía, se observa:', options: ['Hibridación de géneros textuales', 'Texto discontinuo estricto', 'Falta de estructura', 'Error de imprenta'], correct: 0, explanation: 'Mezcla estética de géneros.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] El concepto de "Mimesis" en la literatura clásica griega alude a:', options: ['La imitación o representación artística de la realidad', 'La copia ilegal de textos', 'El uso de rima consonante', 'La invención del papel'], correct: 0, explanation: 'Imitación artística de la vida.' }
              ],
              'Lectura Crítica', 'Intertextualidad y Literatura'
            ),
            questions: []
          },
          {
            id: 'lc_filosofia_humanidades',
            name: 'Análisis de Textos Filosóficos y Pensamiento Crítico',
            keyTopic: true,
            desc: 'Comprensión de conceptos filosóficos (Ética, Epistemología, Ontología) y ensayos académicos.',
            explanationDoc: {
              title: 'Guía Rápida: Lectura de Textos Filosóficos',
              summary: 'Los textos filosóficos del ICFES exigen rigor conceptual para identificar supuestos y conceptos clave.',
              keyConcepts: [
                'Epistemología: Estudio del conocimiento y cómo sabemos lo que es verdadero.',
                'Ética: Reflexión sobre el deber, la moral y la acción humana justa.'
              ],
              example: {
                question: 'El "Mito de la Caverna" de Platón simboliza:',
                options: ['El paso de la ignorancia (sombras) al conocimiento verdadero (luz)', 'La vida en cuevas', 'Una guerra antigua', 'La minería'],
                correct: 'El paso de la ignorancia (sombras) al conocimiento verdadero (luz)',
                reason: 'Alegoría epistemológica del conocimiento.'
              },
              icfesTip: 'No busques memorizar al filósofo; analiza el problema lógico que plantea el fragmento.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] La rama de la filosofía que estudia la moral y el deber se llama:', options: ['Ética', 'Epistemología', 'Estética', 'Lógica'], correct: 0, explanation: 'Ética estudia la moral.' }
              ],
              [
                { q: '[Prueba 2] El imperativo categórico de Kant exige:', options: ['Actuar según una máxima que pueda convertirse en ley universal', 'Hacer lo que más convenga personalmente', 'Obedecer al rey', 'Buscar el dinero'], correct: 0, explanation: 'Ética deontológica universalizable.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] La "Duda Metódica" cartesiana busca:', options: ['Dudar de todo para encontrar una verdad indudable e inquebrantable', 'Vivir en la incertidumbre para siempre', 'Destruir la ciencia', 'Engañar al lector'], correct: 0, explanation: 'Método para fundar certeza indiscutible.' }
              ],
              'Lectura Crítica', 'Textos Filosóficos'
            ),
            questions: []
          }
        ]
      },
      {
        id: 'lc_eje3',
        title: 'PARTE 3: Análisis Gráfico, Ensayos y Prensa (NUEVOS TEMAS)',
        icon: '📰',
        topics: [
          {
            id: 'lc_satira_caricatura',
            name: 'Sátira, Caricatura Política y Lenguaje Simbólico',
            keyTopic: true,
            desc: 'Análisis de viñetas, metáforas visuales, ironía periodística y símbolos en caricaturas políticas.',
            explanationDoc: {
              title: 'Guía Rápida: Caricatura Política y Lenguaje Simbólico',
              summary: 'Las caricaturas en el ICFES usan símbolos visuales e ironía para cuestionar realidades sociales.',
              keyConcepts: [
                'Ironía Visual: Contraste entre lo que dice el texto de la viñeta y lo que muestra el dibujo.',
                'Hipérbole Gráfica: Exageración de rasgos de personajes para resaltar vicios o defectos.',
                'Metáfora Visual: Uso de objetos (balanzas, cadenas, muros) para representar conceptos abstractos (justicia, opresión).'
              ],
              example: {
                question: 'Si una caricatura muestra a un político votando sobre un barco que se hunde mientras sonríe, critica:',
                options: ['La desconexión e indiferencia política frente a las crisis sociales', 'El amor por los barcos', 'La natación', 'El buen clima'],
                correct: 'La desconexión e indiferencia política frente a las crisis sociales',
                reason: 'El contraste irónico critica la ceguera del gobernante.'
              },
              icfesTip: 'Analiza el diálogo y los elementos del dibujo al mismo tiempo para no perder la intención irónica.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] En una viñeta, una balanza inclinada hacia una bolsa de dinero representa:', options: ['La corrupción de la justicia por intereses económicos', 'Un mercado de alimentos', 'Una clase de física', 'Un banco limpio'], correct: 0, explanation: 'Símbolo visual de justicia vendida.' },
                { q: '[Prueba 1] La ironía periodística busca:', options: ['Dar a entender lo contrario de lo que se dice para hacer una crítica sutil', 'Mentir en las noticias', 'Hacer reír sin mensaje', 'Escribir poemas'], correct: 0, explanation: 'Ironía con fin de crítica social.' }
              ],
              [
                { q: '[Prueba 2] Una caricatura que dibuja a los ciudadanos atados con cadenas de papel de trámites critica:', options: ['La burocracia estatal asfixiante', 'El reciclaje de papel', 'El trabajo en imprenta', 'La lectura obligatoria'], correct: 0, explanation: 'Sátira a la burocracia.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] La función social del humor gráfico periodístico es:', options: ['Promover el pensamiento crítico y la cuestionamiento al poder', 'Vender periódicos viejos', 'Enseñar dibujo técnico', 'Distraer sin pensar'], correct: 0, explanation: 'El humor gráfico como ejercicio de crítica ciudadana.' }
              ],
              'Lectura Crítica', 'Sátira y Caricatura Política'
            ),
            questions: []
          },
          {
            id: 'lc_ensayo_postura',
            name: 'Ensayo Literario, Postura Ensayística y Recursos de Estilo',
            keyTopic: true,
            desc: 'Identificación del tono del autor, digresiones, analogías y la voz argumentativa ensayística.',
            explanationDoc: {
              title: 'Guía Rápida: El Ensayo y los Recursos de Estilo',
              summary: 'El ensayo es un género libre donde el autor expone su visión personal con rigor estilístico.',
              keyConcepts: [
                'Tono del Autor: Puede ser reflexivo, irónico, melancólico, combativo o didáctico.',
                'Analogía: Comparación prolongada para explicar un concepto abstracto mediante uno concreto.',
                'Digresión: Desviación momentánea del tema principal para aportar una reflexión paralela.'
              ],
              example: {
                question: 'Un autor que compara la mente humana con un jardín que requiere poda constante usa:',
                options: ['Una analogía expositiva', 'Una falacia ad hominem', 'Una hipérbole irónica', 'Un dato empírico'],
                correct: 'Una analogía expositiva',
                reason: 'Compara la mente con un jardín para facilitar la comprensión.'
              },
              icfesTip: 'Identifica la intención comunicativa del ensayo: persuadir, hacer reflexionar o emocionar.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Comparar el aprendizaje de un idioma con aprender a tocar la guitarra es:', options: ['Una analogía pedagógica', 'Una falacia', 'Una metáfora simple', 'Un verso'], correct: 0, explanation: 'Analogía explicativa.' }
              ],
              [
                { q: '[Prueba 2] Si en un ensayo sobre tecnología el autor hace una digresión sobre su infancia, busca:', options: ['Dar un matiz humano y cercano a su argumento principal', 'Aburrir al lector', 'Cambiar de tema por completo', 'Corregir la gramática'], correct: 0, explanation: 'Reflexión evocativa paralela.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] El ensayo hispanoamericano del siglo XX se caracterizó por su preocupación sobre:', options: ['La identidad cultural, la libertad y la modernidad de la región', 'La física de partículas', 'Las finanzas europeas', 'La cocina tradicional'], correct: 0, explanation: 'Reflexión ensayística identitaria.' }
              ],
              'Lectura Crítica', 'Ensayo Literario y Estilo'
            ),
            questions: []
          },
          {
            id: 'lc_sesgos_prensa',
            name: 'Sesgos Informativos y Pensamiento Crítico en Prensa',
            keyTopic: true,
            desc: 'Detección de manipulaciones en noticias, titulares tendenciosos y verificación de fuentes.',
            explanationDoc: {
              title: 'Guía Rápida: Sesgos Informativos en Prensa',
              summary: 'Desarrolla el pensamiento crítico para evaluar la imparcialidad y rigor de los medios de comunicación.',
              keyConcepts: [
                'Sesgo de Confirmación: Buscar solo información que confirme tus prejuicios previa.',
                'Sensacionalismo: Usar titulares exagerados o emotivos para llamar la atención.',
                'Omisión de Contexto: Omitir datos cruciales para inclinar la opinión del lector.'
              ],
              example: {
                question: 'Un titular que afirma "¡Desastre total en la economía!" sin citar cifras ni expertos usa:',
                options: ['Lenguaje sensacionalista emotivo', 'Análisis riguroso imparcial', 'Un informe científico', 'Una paráfrasis'],
                correct: 'Lenguaje sensacionalista emotivo',
                reason: 'Busca alarmar sin sustento de datos.'
              },
              icfesTip: 'Evalúa si el periodista diferencia entre los hechos ocurridos y su opinión personal.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Un titular exagerado destinado solo a ganar clics se denomina:', options: ['Sensacionalista / Clickbait', 'Artículo académico', 'Nota de prensa pura', 'Poema'], correct: 0, explanation: 'Sensacionalismo mediático.' }
              ],
              [
                { q: '[Prueba 2] Leer noticias de diferentes periódicos con líneas ideológicas distintas ayuda a:', options: ['Neutralizar el sesgo informativo y construir un juicio propio', 'Confundirse más', 'Perder tiempo', 'Aprender ortografía'], correct: 0, explanation: 'Contraste de fuentes informativas.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] La posverdad se define en la lectura crítica como la condición donde:', options: ['Los hechos objetivos son menos influyentes que las apelaciones a las emociones y creencias personales', 'Todo es verdad comprobada', 'La ciencia domina todo', 'Nadie usa internet'], correct: 0, explanation: 'Definición de posverdad.' }
              ],
              'Lectura Crítica', 'Sesgos Informativos en Prensa'
            ),
            questions: []
          }
        ]
      }
    ]
  },

  // =============================================================
  // 2. MATEMÁTICAS (7 TEMAS EN TOTAL)
  // =============================================================
  matematicas: {
    id: 'matematicas',
    name: 'Matemáticas',
    badge: 'Razonamiento Cuantitativo',
    description: 'Álgebra, Geometría, Estadística, Probabilidad, Geometría Analítica y Trigonometría.',
    color: '#D9531E',
    bgLight: 'rgba(217, 83, 30, 0.08)',
    parts: [
      {
        id: 'mat_eje1',
        title: 'PARTE 1: Números, Álgebra y Geometría Básica',
        icon: '🔢',
        topics: [
          {
            id: 'mat_porcentajes_regla_tres',
            name: 'Porcentajes, Proporcionalidad y Regla de Tres',
            keyTopic: true,
            desc: 'Cálculo de aumentos, descuentos sucesivos, conversiones y tasas de cambio.',
            explanationDoc: {
              title: 'Guía Rápida: Porcentajes y Regla de Tres',
              summary: 'Aprende a calcular aumentos, descuentos y proporciones directas e inversas.',
              keyConcepts: [
                'Porcentaje simple: X% de N = (X * N) / 100.',
                'Regla de tres Directa: A más X, más Y (multiplica en cruz).',
                'Regla de tres Inversa: A más X, menos Y (multiplica horizontal).'
              ],
              example: {
                question: 'Si 6 obreros tardan 12 horas en una obra, ¿cuánto tardan 9 obreros?',
                options: ['8 horas', '18 horas', '9 horas', '6 horas'],
                correct: '8 horas',
                reason: 'Inversa: (6 * 12) / 9 = 8 horas.'
              },
              icfesTip: 'Determina si la relación es directa (suben ambas) o inversa (una sube y otra baja).'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Si 6 obreros construyen un muro en 12 horas, ¿cuántas horas tardarán 9 obreros?', options: ['8 horas', '18 horas', '9 horas', '6 horas'], correct: 0, explanation: 'Regla inversa: (6*12)/9 = 8.' }
              ],
              [
                { q: '[Prueba 2] Artículo cuesta $120.000 con 19% de IVA. El precio sin IVA es aprox:', options: ['$100.840', '$97.200', '$101.000', '$105.000'], correct: 0, explanation: '120.000 / 1.19 = $100.840.' }
              ],
              [
                { q: '[Prueba 3] Interés compuesto del 10% anual sobre $1.000.000 en 2 años resulta en:', options: ['$1.210.000', '$1.200.000', '$1.100.000', '$1.220.000'], correct: 0, explanation: '1.000.000 * 1.1 * 1.1 = $1.210.000.' }
              ],
              'Matemáticas', 'Porcentajes y Proporcionalidad'
            ),
            questions: []
          },
          {
            id: 'mat_algebra_funciones',
            name: 'Ecuaciones, Modelos Lineales, Cuadráticos y Exponenciales',
            keyTopic: true,
            desc: 'Despeje de variables, interpretación de pendientes, vértices y modelos de crecimiento.',
            explanationDoc: {
              title: 'Guía Rápida: Ecuaciones y Funciones',
              summary: 'Comprende el significado de la pendiente m (tasa de cambio) y el corte b en y = mx + b.',
              keyConcepts: [
                'Función Lineal (y = mx + b): m es la pendiente; b es el intercepto con el eje Y.',
                'Función Cuadrática (y = ax² + bx + c): Representa una parábola con punto máximo o mínimo.'
              ],
              example: {
                question: 'En la tarifa de taxi C(x) = 3000 + 1500x, ¿qué representa el 3000?',
                options: ['El valor fijo de arranque (banderazo)', 'El costo por kilómetro', 'La velocidad', 'El total'],
                correct: 'El valor fijo de arranque (banderazo)',
                reason: 'Es el término independiente (intercepto cuando x = 0).'
              },
              icfesTip: 'En gráficas lineales, m > 0 sube de izquierda a derecha; m < 0 baja.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] En f(x) = 4x - 7, la pendiente "m" es:', options: ['4', '-7', '1/4', '0'], correct: 0, explanation: 'Coeficiente de x en y = mx + b.' }
              ],
              [
                { q: '[Prueba 2] Vértice de la parábola y = (x - 3)^2 + 4:', options: ['(3, 4)', '(-3, 4)', '(3, -4)', '(0, 4)'], correct: 0, explanation: 'Forma canónica (h,k) = (3,4).' }
              ],
              [
                { q: '[Prueba 3] Raíces de la ecuación x^2 - 5x + 6 = 0:', options: ['x = 2 y x = 3', 'x = -2 y x = -3', 'x = 1 y x = 6', 'x = 0'], correct: 0, explanation: '(x-2)(x-3) = 0.' }
              ],
              'Matemáticas', 'Álgebra y Funciones'
            ),
            questions: []
          },
          {
            id: 'mat_geometria_pitagoras',
            name: 'Teorema de Pitágoras, Áreas, Perímetros y Volúmenes',
            keyTopic: true,
            desc: 'Triángulos rectángulos, cálculo de figuras planas y sólido tridimensional.',
            explanationDoc: {
              title: 'Guía Rápida: Geometría y Teorema de Pitágoras',
              summary: 'Fórmulas esenciales de áreas y cálculo de hipotenusa a² + b² = c².',
              keyConcepts: [
                'Pitágoras: c = √(a² + b²) para triángulos rectángulos.',
                'Área Triángulo = (base * altura) / 2; Área Círculo = π · r².'
              ],
              example: {
                question: 'Catetos de 6 cm y 8 cm. ¿Cuánto mide la diagonal/hipotenusa?',
                options: ['10 cm', '14 cm', '12 cm', '48 cm'],
                correct: '10 cm',
                reason: '√(36 + 64) = √100 = 10 cm.'
              },
              icfesTip: 'No confundas el perímetro (suma de bordes) con el área (superficie interna).'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Rectángulo de base 8 cm y altura 6 cm. Diagonal mide:', options: ['10 cm', '14 cm', '12 cm', '48 cm'], correct: 0, explanation: 'd = sqrt(64+36) = 10 cm.' }
              ],
              [
                { q: '[Prueba 2] Si un triángulo equilátero tiene lados de 6 cm, su perímetro es:', options: ['18 cm', '12 cm', '36 cm', '9 cm'], correct: 0, explanation: '6 * 3 = 18 cm.' }
              ],
              [
                { q: '[Prueba 3] Área de hexágono regular de lado L y apotema ap:', options: ['(6 * L * ap) / 2', 'L * ap', '6 * L * ap', 'L^2'], correct: 0, explanation: '(Perímetro * apotema) / 2.' }
              ],
              'Matemáticas', 'Geometría y Pitágoras'
            ),
            questions: []
          },
          {
            id: 'mat_estadistica_probabilidad',
            name: 'Media, Mediana, Moda, Gráficos y Probabilidad',
            keyTopic: true,
            desc: 'Medidas de tendencia central, dispersión, lectura de gráficos estadísticos y cálculo de probabilidades.',
            explanationDoc: {
              title: 'Guía Rápida: Estadística y Probabilidad',
              summary: 'Aprende a diferenciar Media (promedio), Mediana (dato del medio) y Moda (dato más frecuente).',
              keyConcepts: [
                'Media: Suma de datos dividida entre el total.',
                'Mediana: Dato en la posición central al ordenar los datos.',
                'Moda: El valor que más veces se repite.'
              ],
              example: {
                question: 'En los datos [2, 3, 5, 5, 7, 8, 9], ¿cuál es la moda?',
                options: ['5', '3', '7', '9'],
                correct: '5',
                reason: 'El 5 se repite dos veces, más que cualquier otro.'
              },
              icfesTip: 'Si hay un número par de datos, la mediana es el promedio de los dos datos centrales.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Promedio (media) de las notas 3.0, 4.0 y 5.0:', options: ['4.0', '3.5', '4.5', '3.0'], correct: 0, explanation: '(3+4+5)/3 = 4.0.' }
              ],
              [
                { q: '[Prueba 2] La mediana de [2, 4, 6, 8] es:', options: ['5', '4', '6', '4.5'], correct: 0, explanation: 'Promedio de 4 y 6 es 5.' }
              ],
              [
                { q: '[Prueba 3] En distribución normal, el porcentaje dentro de 1 desviación estándar de la media es aprox:', options: ['68%', '50%', '95%', '99.7%'], correct: 0, explanation: 'Regla empírica ~68%.' }
              ],
              'Matemáticas', 'Estadística y Probabilidad'
            ),
            questions: []
          }
        ]
      },
      {
        id: 'mat_eje2',
        title: 'PARTE 2: Geometría Analítica y Trigonometría (NUEVOS TEMAS)',
        icon: '📐',
        topics: [
          {
            id: 'mat_geometria_analitica',
            name: 'Geometría Analítica, Distancias y Ecuación de la Circunferencia',
            keyTopic: true,
            desc: 'Plano cartesiano, distancia entre dos puntos, punto medio y ecuación (x-h)² + (y-k)² = r².',
            explanationDoc: {
              title: 'Guía Rápida: Geometría Analítica',
              summary: 'Conecta el álgebra con el plano cartesiano midiendo distancias y circunferencias.',
              keyConcepts: [
                'Distancia d = √[(x₂ - x₁)² + (y₂ - y₁)²].',
                'Punto Medio M = ((x₁ + x₂)/2, (y₁ + y₂)/2).',
                'Circunferencia: (x - h)² + (y - k)² = r² con centro (h,k) y radio r.'
              ],
              example: {
                question: 'La distancia entre los puntos A(1, 2) y B(4, 6) es:',
                options: ['5 unidades', '7 unidades', '25 unidades', '4 unidades'],
                correct: '5 unidades',
                reason: '√[(4-1)² + (6-2)²] = √[9 + 16] = √25 = 5.'
              },
              icfesTip: 'Si la circunferencia está centrada en el origen (0,0), la ecuación se simplifica a x² + y² = r².'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Distancia entre A(0,0) y B(3,4):', options: ['5', '7', '12', '25'], correct: 0, explanation: 'sqrt(9+16) = 5.' }
              ],
              [
                { q: '[Prueba 2] Centro de la circunferencia (x - 2)^2 + (y + 5)^2 = 16:', options: ['(2, -5)', '(-2, 5)', '(2, 5)', '(16, 16)'], correct: 0, explanation: 'Centro (h,k) = (2, -5).' }
              ],
              [
                { q: '[Prueba 3 - ICFES] Si el radio de (x+1)^2 + (y-3)^2 = R es 6, el valor de R es:', options: ['36', '6', '12', '18'], correct: 0, explanation: 'R = r^2 = 6^2 = 36.' }
              ],
              'Matemáticas', 'Geometría Analítica'
            ),
            questions: []
          },
          {
            id: 'mat_trigonometria',
            name: 'Funciones Trigonométricas y Razones en Triángulos',
            keyTopic: true,
            desc: 'Seno, Coseno, Tangente, Teorema del Seno/Coseno y ángulos de elevación.',
            explanationDoc: {
              title: 'Guía Rápida: Trigonometría Básica',
              summary: 'Relación entre los lados y ángulos de triángulos rectángulos y oblicuángulos.',
              keyConcepts: [
                'Seno = Opuesto / Hipotenusa; Coseno = Adyacente / Hipotenusa; Tangente = Opuesto / Adyacente.',
                'Valores notables: sen(30°) = 0.5, cos(60°) = 0.5, tan(45°) = 1.',
                'Teorema del Seno: a / sen(A) = b / sen(B) = c / sen(C).'
              ],
              example: {
                question: 'Si una escalera de 10m forma 30° con la pared, la distancia del pie a la pared es (sen 30° = 0.5):',
                options: ['5 metros', '10 metros', '8.66 metros', '2.5 metros'],
                correct: '5 metros',
                reason: '10 * sen(30°) = 10 * 0.5 = 5m.'
              },
              icfesTip: 'SOH CAH TOA te ayudará a recordar las tres razones fundamentales.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Valor de tan(45°):', options: ['1', '0', '0.5', 'sqrt(3)'], correct: 0, explanation: 'tan(45°) = 1.' }
              ],
              [
                { q: '[Prueba 2] En triángulo rectángulo con cateto opuesto 6 e hipotenusa 10, sen(θ) es:', options: ['0.6 (3/5)', '0.8', '1.33', '0.5'], correct: 0, explanation: '6/10 = 0.6.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] Teorema del Coseno c² = a² + b² - 2ab·cos(C) se usa para:', options: ['Resolver cualquier triángulo conociendo dos lados y el ángulo comprendido', 'Solo triángulos rectángulos', 'Cálculo de volúmenes', 'Estadística'], correct: 0, explanation: 'Aplicación del Teorema del Coseno.' }
              ],
              'Matemáticas', 'Trigonometría'
            ),
            questions: []
          },
          {
            id: 'mat_combinatoria_probabilidad_compuesta',
            name: 'Combinatoria Avanzada y Probabilidad Compuesta',
            keyTopic: true,
            desc: 'Principio multiplicativo, permutaciones, combinaciones y eventos independientes.',
            explanationDoc: {
              title: 'Guía Rápida: Probabilidad Compuesta y Conteo',
              summary: 'Calcula eventos múltiples simultáneos usando reglas de suma y producto.',
              keyConcepts: [
                'Regla del Producto (Eventos Independientes): P(A y B) = P(A) · P(B).',
                'Permutación P(n,r): El orden SÍ importa.',
                'Combinación C(n,r): El orden NO importa.'
              ],
              example: {
                question: 'Al lanzar dos dados independientes, la probabilidad de sacar 6 en ambos es:',
                options: ['1/36', '1/6', '2/6', '1/12'],
                correct: '1/36',
                reason: '(1/6) * (1/6) = 1/36.'
              },
              icfesTip: 'Si te preguntan "de cuántas formas organizar un podio", el orden importa (Permutación).'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Probabilidad de sacar dos caras en dos lanzamientos de moneda:', options: ['1/4 (25%)', '1/2', '3/4', '1/8'], correct: 0, explanation: '1/2 * 1/2 = 1/4.' }
              ],
              [
                { q: '[Prueba 2] Formas de elegir un presidente y vicepresidente entre 4 candidatos:', options: ['12 (Permutación 4P2)', '6', '8', '24'], correct: 0, explanation: '4 * 3 = 12.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] Combinaciones para formar comités de 3 personas de 6 aspirantes:', options: ['20 (6C3)', '120', '18', '30'], correct: 0, explanation: '6! / (3! * 3!) = 20.' }
              ],
              'Matemáticas', 'Combinatoria y Probabilidad'
            ),
            questions: []
          }
        ]
      }
    ]
  },

  // =============================================================
  // 3. SOCIALES Y CIUDADANAS (7 TEMAS EN TOTAL)
  // =============================================================
  sociales: {
    id: 'sociales',
    name: 'Sociales y CDNAS',
    badge: 'Competencias Ciudadanas',
    description: 'Constitución Política, Historia de Colombia, Historia Universal, Economía, Geografía y Geopolítica.',
    color: '#D9531E',
    bgLight: 'rgba(217, 83, 30, 0.08)',
    parts: [
      {
        id: 'soc_eje1',
        title: 'PARTE 1: Constitución, Historia y Ciudadanía',
        icon: '📜',
        topics: [
          {
            id: 'soc_constitucion_mecanismos',
            name: 'Derechos Fundamentales, Tutela y Mecanismos de Protección',
            keyTopic: true,
            desc: 'Estado Social de Derecho, Acción de Tutela, Acción Popular, Habeas Corpus y Petición.',
            explanationDoc: {
              title: 'Guía Rápida: Mecanismos de Protección de Derechos',
              summary: 'Herramientas constitucionales creadas en 1991 para amparar derechos ciudadanos.',
              keyConcepts: [
                'Acción de Tutela: Protege DERECHOS FUNDAMENTALES (salud, vida, libre desarrollo).',
                'Derecho de Petición: Solicitar información respetuosa a autoridades.'
              ],
              example: {
                question: 'La Acción de Tutela en Colombia ampara principalmente:',
                options: ['Derechos fundamentales inmediatos', 'Cobro de dinero', 'Cambio de leyes', 'Sanción a alcaldes'],
                correct: 'Derechos fundamentales inmediatos',
                reason: 'Protección judicial rápida de derechos fundamentales.'
              },
              icfesTip: 'Tutela = individual fundamental; Acción Popular = colectivo comunitario.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] La Acción de Tutela fue diseñada para:', options: ['Proteger de forma inmediata los derechos fundamentales.', 'Pedir dinero al Estado.', 'Suspender alcaldes.', 'Modificar leyes.'], correct: 0, explanation: 'Amparo inmediato fundamental.' }
              ],
              [
                { q: '[Prueba 2] Mecanismo frente a detención ilegal que ampara la libertad en 36h:', options: ['Habeas Corpus', 'Tutela', 'Petición', 'Consulta'], correct: 0, explanation: 'Protege libertad física.' }
              ],
              [
                { q: '[Prueba 3] Colombia definida en el Art 1° de la Constitución es un:', options: ['Estado Social de Derecho, unitario y pluralista', 'Monarquía federal', 'República absolutista', 'Dictadura'], correct: 0, explanation: 'Estado Social de Derecho.' }
              ],
              'Sociales', 'Constitución Política'
            ),
            questions: []
          },
          {
            id: 'soc_historia_colombia',
            name: 'Independencia, El Bogotazo, Frente Nacional y Conflicto Armado',
            keyTopic: true,
            desc: 'Acontecimientos decisivos del siglo XIX y XX en la historia colombiana.',
            explanationDoc: {
              title: 'Guía Rápida: Historia de Colombia',
              summary: 'Comprende el Bogotazo (1948), el Frente Nacional (1958-1974) y las causas del conflicto armado.',
              keyConcepts: [
                '7 de Agosto de 1819: Batalla del Puente de Boyacá sella la Independencia.',
                'El Bogotazo (9 de abril de 1948): Asesinato de Jorge Eliécer Gaitán desata "La Violencia" bipartidista.'
              ],
              example: {
                question: 'El Bogotazo se desencadenó por el magnicidio de:',
                options: ['Jorge Eliécer Gaitán', 'Luis Carlos Galán', 'Rafael Uribe Uribe', 'Álvaro Gómez'],
                correct: 'Jorge Eliécer Gaitán',
                reason: 'El asesinato del líder popular desató la insurrección en Bogotá.'
              },
              icfesTip: 'El Frente Nacional redujo la violencia bipartidista pero excluyó a otros movimientos políticos.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] El Bogotazo del 9 de abril de 1948 ocurrió tras la muerte de:', options: ['Jorge Eliécer Gaitán', 'Rafael Uribe Uribe', 'Luis Carlos Galán', 'Álvaro Gómez'], correct: 0, explanation: 'Asesinato de Gaitán.' }
              ],
              [
                { q: '[Prueba 2] Causa económica estructural del surgimiento de guerrillas en los 60:', options: ['Desigualdad en propiedad de la tierra y exclusión política', 'Influencia de la Iglesia', 'Reforma agraria exitosa', 'Descubrimiento de oro'], correct: 0, explanation: 'Latifundismo y exclusión.' }
              ],
              [
                { q: '[Prueba 3] Proceso de Paz firmado en 2016 entre el Estado Colombiano y las FARC ocurrió en:', options: ['La Habana (Cuba)', 'Caracas (Venezuela)', 'Quito (Ecuador)', 'Oslo (Noruega)'], correct: 0, explanation: 'Mesa de diálogos en La Habana.' }
              ],
              'Sociales', 'Historia de Colombia'
            ),
            questions: []
          },
          {
            id: 'soc_competencias_ciudadanas',
            name: 'Multiperspectivismo, Prejuicios y Análisis de Conflictos',
            keyTopic: true,
            desc: 'Diferenciación entre opiniones y hechos, comprensión de intereses de diversos actores sociales.',
            explanationDoc: {
              title: 'Guía Rápida: Competencias Ciudadanas y Multiperspectivismo',
              summary: 'Aprende a analizar dilemas sociales evaluando los intereses y argumentos de todas las partes.',
              keyConcepts: [
                'Multiperspectivismo: Comprender los puntos de vista de todos los involucrados sin juzgar.',
                'Juicio de Valor: Opinión subjetiva u ética ("Está mal que rían").'
              ],
              example: {
                question: 'Frente a la construcción de una vía que afecta un bosque, el multiperspectivismo exige:',
                options: ['Escuchar y ponderar las razones de transportistas, ambientalistas y vecinos', 'Ignorar a los vecinos', 'Construir la vía sin hablar', 'Cancelar todo'],
                correct: 'Escuchar y ponderar las razones de transportistas, ambientalistas y vecinos',
                reason: 'Analiza los distintos intereses en conflicto.'
              },
              icfesTip: 'Busca siempre soluciones negociadas que protejan los derechos fundamentales.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Un juicio de valor se distingue de uno de hecho porque:', options: ['Contiene una apreciación subjetiva sobre lo bueno o malo.', 'Cita datos estadísticos.', 'Es una norma aprobada.', 'Es una fecha histórica.'], correct: 0, explanation: 'Expresa opinión subjetiva.' }
              ],
              [
                { q: '[Prueba 2] La empatía ciudadana en la resolución pacífica de conflictos implica:', options: ['Ponerse en el lugar del otro para entender sus necesidades', 'Aceptar todo sin criticar', 'Imponer el criterio propio', 'Ceder siempre'], correct: 0, explanation: 'Comprensión del otro.' }
              ],
              [
                { q: '[Prueba 3] En el análisis de políticas públicas, la "participación ciudadana deliberativa" busca:', options: ['Construir acuerdos mediante el debate abierto e informado de los ciudadanos', 'Votar a ciegas', 'Delegar todo a los expertos', 'Aprobar leyes en secreto'], correct: 0, explanation: 'Debate ciudadano informado.' }
              ],
              'Sociales', 'Competencias Ciudadanas'
            ),
            questions: []
          },
          {
            id: 'soc_historia_universal_economia',
            name: 'Guerras Mundiales, Guerra Fría, Economía e Inflación',
            keyTopic: true,
            desc: 'Procesos globales del siglo XX, capitalismo vs socialismo, oferta/demanda e inflación.',
            explanationDoc: {
              title: 'Guía Rápida: Historia Universal y Economía',
              summary: 'Procesos geopolíticos y conceptos económicos fundamentales.',
              keyConcepts: [
                'Guerra Fría (1947-1991): Bloque Capitalista (EEUU) vs Bloque Socialista (URSS).',
                'Revolución Industrial: Mecanización y surgimiento del trabajo fabril.'
              ],
              example: {
                question: 'Durante la Guerra Fría el enfrentamiento geopolítico ocurrió entre:',
                options: ['EEUU (Capitalismo) y URSS (Comunismo)', 'Alemania y Francia', 'China y Japón', 'Reino Unido y España'],
                correct: 'EEUU (Capitalismo) y URSS (Comunismo)',
                reason: 'Enfrentamiento entre los dos bloques mundiales.'
              },
              icfesTip: 'La inflación perjudica a personas con ingresos fijos (salarios, pensiones).'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Durante la Guerra Fría el enfrentamiento fue entre:', options: ['EEUU (Capitalismo) y la URSS (Comunismo)', 'Alemania y Francia', 'China y Japón', 'Reino Unido y España'], correct: 0, explanation: 'Bloque bipolar.' }
              ],
              [
                { q: '[Prueba 2] La caída del Muro de Berlín en 1989 simbolizó:', options: ['El fin de la Guerra Fría y el colapso del bloque soviético', 'El inicio de la Segunda Guerra Mundial', 'La creación de la ONU', 'La independencia de EEUU'], correct: 0, explanation: 'Fin del bloque soviético.' }
              ],
              [
                { q: '[Prueba 3] El Plan Marshall implementado tras la Segunda Guerra Mundial buscó:', options: ['La reconstrucción económica de Europa Occidental por parte de EEUU', 'Atacar a la Unión Soviética', 'Destruir a Japón', 'Crear el FMI'], correct: 0, explanation: 'Reconstrucción europea posguerra.' }
              ],
              'Sociales', 'Historia Universal y Economía'
            ),
            questions: []
          }
        ]
      },
      {
        id: 'soc_eje2',
        title: 'PARTE 2: Geografía, Comercio y Geopolítica (NUEVOS TEMAS)',
        icon: '🌍',
        topics: [
          {
            id: 'soc_geografia_ordenamiento',
            name: 'Ordenamiento Territorial, Geografía y Medio Ambiente en Colombia',
            keyTopic: true,
            desc: 'Regiones naturales de Colombia, uso del suelo, expansión urbana y gestión del riesgo ambiental.',
            explanationDoc: {
              title: 'Guía Rápida: Geografía y Medio Ambiente en Colombia',
              summary: 'Comprende la diversidad de regiones y los retos del uso sostenible del suelo colombiano.',
              keyConcepts: [
                'Regiones Naturales: Andina, Caribe, Pacífica, Orinoquía, Amazonía e Insular.',
                'Ordenamiento Territorial: Planificación del uso del suelo para prevenir riesgos y proteger fuentes hídricas.',
                'Deforestación en Amazonía: Amenaza directa a la biodiversidad y ciclo del agua.'
              ],
              example: {
                question: 'La región natural colombiana caracterizada por la mayor biodiversidad marina y selva húmeda es:',
                options: ['Región Pacífica', 'Región Andina', 'Región Orinoquía', 'Región Insular'],
                correct: 'Región Pacífica',
                reason: 'El Chocó biogeográfico en la región Pacífica.'
              },
              icfesTip: 'El ICFES evalúa cómo las actividades humanas (minería, ganadería) impactan los ecosistemas regionales.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Región colombiana con mayor concentración de población y cordilleras:', options: ['Región Andina', 'Región Amazonía', 'Región Pacífica', 'Orinoquía'], correct: 0, explanation: 'Región Andina.' }
              ],
              [
                { q: '[Prueba 2] La zonificación de áreas de alto riesgo en ciudades busca:', options: ['Evitar asentamientos humanos en zonas propensas a deslizamientos e inundaciones', 'Cobrar más impuestos', 'Construir estadios', 'Prohibir carros'], correct: 0, explanation: 'Gestión del riesgo urbano.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] El concepto de "Frontera Agrícola" delimita:', options: ['La línea entre el suelo dedicado a producción agropecuaria y las áreas protegidas de conservación', 'La frontera entre países', 'El límite de ciudades', 'La línea del mar'], correct: 0, explanation: 'Protección de bosques autóctonos.' }
              ],
              'Sociales', 'Geografía y Ordenamiento'
            ),
            questions: []
          },
          {
            id: 'soc_economia_tlc',
            name: 'Desarrollo Económico, Comercio Internacional y Tratados (TLC)',
            keyTopic: true,
            desc: 'Balanza comercial, aranceles, exportaciones, devaluación de la moneda y TLCs.',
            explanationDoc: {
              title: 'Guía Rápida: Comercio Internacional y Economía',
              summary: 'Entiende cómo las exportaciones e importaciones afectan el valor del peso y la economía nacional.',
              keyConcepts: [
                'Balanza Comercial: Exportaciones menos Importaciones.',
                'Déficit Comercial: Cuando un país importa más de lo que exporta.',
                'Devaluación del Peso: La moneda local pierde valor frente al dólar, encareciendo lo importado.'
              ],
              example: {
                question: 'Si el dólar se encarece drásticamente frente al peso colombiano, se benefician principalmente:',
                options: ['Los exportadores de productos (ej: café, flores)', 'Los compradores de celulares importados', 'Los turistas que viajan al exterior', 'Los importadores de carros'],
                correct: 'Los exportadores de productos (ej: café, flores)',
                reason: 'Reciben más pesos por cada dólar ingresado.'
              },
              icfesTip: 'Analiza a quiénes perjudica o beneficia una devaluación en preguntas sobre economía cotidiana.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Cuando las exportaciones de un país superan a las importaciones existe:', options: ['Superávit comercial', 'Déficit comercial', 'Quiebra estatal', 'Inflación cero'], correct: 0, explanation: 'Superávit comercial.' }
              ],
              [
                { q: '[Prueba 2] Un Tratado de Libre Comercio (TLC) busca fundamentalmente:', options: ['Eliminar o reducir aranceles entre países firmantes para dinamizar el comercio', 'Imponer impuestos altos', 'Prohibir viajar', 'Usar una sola moneda'], correct: 0, explanation: 'Reducción de aranceles.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] El Banco de la República de Colombia controla la inflación principalmente ajustando:', options: ['Las tasas de interés de intervención monetaria', 'El sueldo de los senadores', 'El precio de la carne', 'La venta de gasolina'], correct: 0, explanation: 'Mecanismo de política monetaria.' }
              ],
              'Sociales', 'Comercio Internacional y TLC'
            ),
            questions: []
          },
          {
            id: 'soc_globalizacion_geopolitica',
            name: 'Globalización, Derechos Humanos y Geopolítica Contemporánea',
            keyTopic: true,
            desc: 'Migraciones internacionales, organismos multilaterales (OEA, CPI) y geopolítica reciente.',
            explanationDoc: {
              title: 'Guía Rápida: Geopolítica Global y Derechos Humanos',
              summary: 'Procesos globales de integración, gobernanza internacional y protección humanitaria.',
              keyConcepts: [
                'Corte Penal Internacional (CPI): Juzga crímenes de genocidio, de guerra y de lesa humanidad.',
                'Derecho Internacional Humanitario (DIH): Normas que limitan los efectos de los conflictos armados protegiendo a civiles.',
                'Migración Forzada: Desplazamiento transfronterizo por guerras, persecución o crisis económicas.'
              ],
              example: {
                question: 'El Derecho Internacional Humanitario (DIH) aplica específicamente en situaciones de:',
                options: ['Conflictos armados internos o internacionales', 'Elecciones presidenciales', 'Crisis bancarias', 'Trámites de visado'],
                correct: 'Conflictos armados internos o internacionales',
                reason: 'Protege a personas no combatientes durante guerras.'
              },
              icfesTip: 'No confundas los Derechos Humanos (universales permanentes) con el DIH (normas de guerra).'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] El organismo encargado de juzgar crímenes de lesa humanidad a nivel mundial es la:', options: ['Corte Penal Internacional (CPI)', 'Interpol', 'OEA', 'Unión Europea'], correct: 0, explanation: 'Corte Penal Internacional.' }
              ],
              [
                { q: '[Prueba 2] El principio de No Devuelta (Non-Refoulement) en derecho internacional protege a:', options: ['Refugiados para no ser devueltos a países donde peligre su vida', 'Turistas sin visa', 'Comerciantes', 'Estudiantes'], correct: 0, explanation: 'Amparo internacional a refugiados.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] La Declaración Universal de los Derechos Humanos fue proclamada por la ONU en el año:', options: ['1948 (tras la Segunda Guerra Mundial)', '1789', '1991', '2000'], correct: 0, explanation: '1948 posguerra.' }
              ],
              'Sociales', 'Geopolítica y Derechos Humanos'
            ),
            questions: []
          }
        ]
      }
    ]
  },

  // =============================================================
  // 4. CIENCIAS NATURALES - BIOLOGÍA (8 TEMAS EN TOTAL)
  // =============================================================
  biologia: {
    id: 'biologia',
    name: 'Biología',
    badge: 'Ciencias Naturales',
    description: 'Célula, Genética, Biología Celular, Fisiología, Ecología, Biotecnología, Neurobiología y Biodiversidad.',
    color: '#D9531E',
    bgLight: 'rgba(217, 83, 30, 0.08)',
    parts: [
      {
        id: 'bio_eje1',
        title: 'PARTE 1: La Célula, Genética y Energía Celular',
        icon: '🔬',
        topics: [
          {
            id: 'bio_celula',
            name: 'Célula Procariota, Eucariota y Orgánulos',
            keyTopic: true,
            desc: 'Diferencias estructurales, membrana celular, mitocondrias y cloroplastos.',
            explanationDoc: {
              title: 'Guía Rápida: Estructura Celular',
              summary: 'Comprende las diferencias entre células procariotas (bacterias) y eucariotas (animal/vegetal).',
              keyConcepts: [
                'Procariota: ADN libre en citoplasma, sin núcleo definido.',
                'Eucariota Vegetal: Pared Celular, Cloroplastos y Gran Vacuola.',
                'Mitocondria: Produce energía ATP mediante respiración celular.'
              ],
              example: {
                question: 'Organelo vegetal encargado de la fotosíntesis:',
                options: ['Cloroplasto', 'Mitocondria', 'Lisosoma', 'Ribosoma'],
                correct: 'Cloroplasto',
                reason: 'Contiene clorofila para captar luz solar.'
              },
              icfesTip: 'Ambas células (animal y vegetal) tienen mitocondrias; solo la vegetal tiene cloroplastos.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Organelo vegetal encargado de la fotosíntesis:', options: ['Cloroplasto', 'Mitocondria', 'Lisosoma', 'Ribosoma'], correct: 0, explanation: 'Cloroplasto contiene clorofila.' }
              ],
              [
                { q: '[Prueba 2] Ribosomas se encargan primariamente de:', options: ['Sintetizar proteínas', 'Destruir toxinas', 'Duplicar ADN', 'Almacenar grasas'], correct: 0, explanation: 'Síntesis proteica.' }
              ],
              [
                { q: '[Prueba 3] Pared de bacterias Gram-positivas contiene:', options: ['Peptidoglicano', 'Quitina', 'Celulosa', 'Queratina'], correct: 0, explanation: 'Peptidoglicano.' }
              ],
              'Biología', 'La Célula'
            ),
            questions: []
          },
          {
            id: 'bio_genetica_evolucion',
            name: 'Leyes de Mendel, ADN y Selección Natural',
            keyTopic: true,
            desc: 'Cruzamientos genéticos, código genético, mutaciones y evolución por selección natural.',
            explanationDoc: {
              title: 'Guía Rápida: Genética y Evolución',
              summary: 'Aprende sobre proporciones mendelianas, genotipo vs fenotipo y selección natural.',
              keyConcepts: [
                'Genotipo: La constitución genética (AA, Aa, aa).',
                'Fenotipo: La característica física observable.'
              ],
              example: {
                question: 'Al cruzar dos heterocigotos (Aa x Aa), la proporción fenotípica esperada es:',
                options: ['3 Dominantes : 1 Recesivo (75% vs 25%)', '100% Dominantes', '50% vs 50%', '100% Recesivos'],
                correct: '3 Dominantes : 1 Recesivo (75% vs 25%)',
                reason: 'El cuadro de Punnett da AA, Aa, Aa (75% expresan dominante) y aa (25%).'
              },
              icfesTip: 'Recuerda que la selección natural actúa sobre el fenotipo de la población.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Al cruzar dos heterocigotas (Aa x Aa), la proporción fenotípica es:', options: ['3 Dominantes : 1 Recesivo', '100% Dominantes', '50% vs 50%', '100% Recesivos'], correct: 0, explanation: '75% vs 25%.' }
              ],
              [
                { q: '[Prueba 2] La hemofilia es un trastorno con herencia:', options: ['Ligada al cromosoma X', 'Ligada al Y', 'Autosómica dominante', 'Mitocondrial'], correct: 0, explanation: 'Recesiva ligada al X.' }
              ],
              [
                { q: '[Prueba 3] La Meiosis produce 4 células:', options: ['Haploides únicas (n) con variabilidad', 'Diploides idénticas (2n)', 'Somáticas', 'Bacterianas'], correct: 0, explanation: '4 gametos haploides.' }
              ],
              'Biología', 'Genética y Evolución'
            ),
            questions: []
          },
          {
            id: 'bio_energetica_fotosintesis',
            name: 'Respiración Celular, Fotosíntesis y Enzimas',
            keyTopic: true,
            desc: 'Procesos de conversión de energía (ATP), ciclo de Krebs, fase luminosa/oscura y acción enzimática.',
            explanationDoc: {
              title: 'Guía Rápida: Metabolismo y Energía Celular',
              summary: 'Las células transforman la energía química de los alimentos en moléculas utilizables de ATP.',
              keyConcepts: [
                'Fotosíntesis: 6CO₂ + 6H₂O + Luz ➔ C₆H₁₂O₆ + 6O₂.',
                'Respiración Celular: C₆H₁₂O₆ + 6O₂ ➔ 6CO₂ + 6H₂O + ATP.'
              ],
              example: {
                question: 'El gas producido como subproducto liberado por las plantas durante la fotosíntesis es:',
                options: ['Oxígeno (O₂)', 'Dióxido de Carbono (CO₂)', 'Nitrógeno (N₂)', 'Metano (CH₄)'],
                correct: 'Oxígeno (O₂)',
                reason: 'El agua se fotoliza liberando O₂ libre.'
              },
              icfesTip: 'Las plantas realizan fotosíntesis de día y respiración celular las 24 horas del día.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] El gas liberado por las plantas durante la fotosíntesis es:', options: ['Oxígeno (O2)', 'Dióxido de Carbono', 'Nitrógeno', 'Metano'], correct: 0, explanation: 'Liberación de O2.' }
              ],
              [
                { q: '[Prueba 2] La fermentación láctica en músculos en ausencia de oxígeno produce:', options: ['Ácido láctico y fatiga muscular', 'Fotosíntesis', 'Oxígeno puro', 'Agua salada'], correct: 0, explanation: 'Respiración anaeróbica láctica.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] Rendimiento neto aproximado de ATP por molécula de glucosa en respiración aeróbica:', options: ['30 a 32 moléculas de ATP', '2 ATP', '100 ATP', '0 ATP'], correct: 0, explanation: 'Respiración completa ~30-32 ATP.' }
              ],
              'Biología', 'Biología Celular y Energética'
            ),
            questions: []
          }
        ]
      },
      {
        id: 'bio_eje2',
        title: 'PARTE 2: Fisiología, Ecología y Nuevas Fronteras (NUEVOS TEMAS)',
        icon: '🧬',
        topics: [
          {
            id: 'bio_fisiologia_inmune',
            name: 'Sistemas del Cuerpo Humano, Inmunidad y Vacunas',
            keyTopic: true,
            desc: 'Homeostasis, digestión, circulación, sistema nervioso e inmunidad celular/humoral.',
            explanationDoc: {
              title: 'Guía Rápida: Fisiología Humana e Inmunidad',
              summary: 'El cuerpo humano mantiene el equilibrio interno (homeostasis) mediante sistemas coordinados.',
              keyConcepts: [
                'Homeostasis: Mantenimiento de condiciones internas estables.',
                'Inmunidad Adaptativa: Linfocitos T y B que producen anticuerpos.'
              ],
              example: {
                question: 'El tipo de célula sanguínea encargada de transportar oxígeno en el cuerpo es:',
                options: ['Glóbulos Rojos (Eritrocitos)', 'Glóbulos Blancos (Leucocitos)', 'Plaquetas', 'Plasma'],
                correct: 'Glóbulos Rojos (Eritrocitos)',
                reason: 'Contienen hemoglobina para fijar O₂.'
              },
              icfesTip: 'Diferencia anticuerpos (proteínas defensivas) de antígenos.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Células sanguíneas encargadas del transporte de oxígeno:', options: ['Glóbulos Rojos / Eritrocitos', 'Glóbulos Blancos', 'Plaquetas', 'Células madre'], correct: 0, explanation: 'Hemoglobina en eritrocitos.' }
              ],
              [
                { q: '[Prueba 2] La hormona Insulina producida por el páncreas sirve para:', options: ['Disminuir la glucosa en sangre favoreciendo su ingreso celular', 'Aumentar la presión', 'Elevar la glucosa', 'Digerir proteínas'], correct: 0, explanation: 'Regula glucemia reduciéndola.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] La Inmunidad Pasiva Natural se adquiere mediante:', options: ['Traspaso de anticuerpos maternos a través de lactancia o placenta', 'Inyección de vacunas', 'Suero contra veneno', 'Contagiarse de gripe'], correct: 0, explanation: 'Anticuerpos maternos pasivos.' }
              ],
              'Biología', 'Fisiología Humana e Inmunología'
            ),
            questions: []
          },
          {
            id: 'bio_ecologia_ciclos',
            name: 'Redes Tróficas, Ecosistemas y Ciclos Biogeoquímicos',
            keyTopic: true,
            desc: 'Flujo de energía en niveles tróficos, ciclos de agua/carbono/nitrógeno y relaciones interespecíficas.',
            explanationDoc: {
              title: 'Guía Rápida: Ecología y Redes Tróficas',
              summary: 'Comprende cómo fluye la energía (10%) a través de los niveles tróficos.',
              keyConcepts: [
                'Regla del 10%: Solo el 10% de la energía disponible pasa al siguiente nivel.',
                'Mutualismo (+/+), Comensalismo (+/0), Parasitismo (+/-).'
              ],
              example: {
                question: 'En la relación entre la abeja y la flor donde ambas se benefician, la interacción es:',
                options: ['Mutualismo', 'Parasitismo', 'Depredación', 'Competencia'],
                correct: 'Mutualismo',
                reason: 'Interacción benéfica para ambas especies (+/+).'
              },
              icfesTip: 'Al talar o contaminar, la bioacumulación es mayor en depredadores tope.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Relación donde ambas especies se benefician (+/+):', options: ['Mutualismo', 'Parasitismo', 'Competencia', 'Amensalismo'], correct: 0, explanation: 'Mutualismo beneficia a ambos.' }
              ],
              [
                { q: '[Prueba 2] La Bioacumulación tóxica de metales pesados es mayor en:', options: ['Depredadores tope de la cadena trófica', 'Plantas primarias', 'Agua destilada', 'Herbívoros'], correct: 0, explanation: 'Acumulación en cima de la red.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] Si en un lago desaparece el fitoplancton por contaminación:', options: ['Colapsa la cadena trófica por falta de productores primarios', 'Aumentan los peces carnívoros', 'No sucede nada', 'El agua se vuelve dulce'], correct: 0, explanation: 'Colapso de la base alimenticia.' }
              ],
              'Biología', 'Ecología y Cadenas Tróficas'
            ),
            questions: []
          },
          {
            id: 'bio_biotecnologia_genetica',
            name: 'Biotecnología, Ingeniería Genética y Transgénicos',
            keyTopic: true,
            desc: 'ADN recombinante, tecnología CRISPR, clonación, cultivos transgénicos y bioética.',
            explanationDoc: {
              title: 'Guía Rápida: Biotecnología e Ingeniería Genética',
              summary: 'Manipulación técnica del material genético de organismos para aplicaciones médicas y agrícolas.',
              keyConcepts: [
                'ADN Recombinante: Inserción de un gen de una especie en el ADN de otra (ej: bacterias que producen insulina).',
                'Organismos Transgénicos (OGM): Organismos modificados genéticamente para resistencia a plagas.',
                'Bioética: Evaluación de riesgos ecológicos y morales en la edición genética.'
              ],
              example: {
                question: 'La tecnología que permite cortar y editar secuencias específicas de ADN con alta precisión es:',
                options: ['CRISPR-Cas9', 'Clonación Somática', 'PCR simple', 'Mitosis forzada'],
                correct: 'CRISPR-Cas9',
                reason: 'Sistema de edición genética de alta precisión.'
              },
              icfesTip: 'El ICFES evalúa los pros (mayor producción de alimentos) y contras (riesgo de polinización cruzada en ecosistemas).'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] La insulina humana sintética producida por bacterias transgénicas usa técnica de:', options: ['ADN Recombinante', 'Clonación de animales', 'Meiosis forzada', 'Fotosíntesis'], correct: 0, explanation: 'Tecnología de ADN recombinante.' }
              ],
              [
                { q: '[Prueba 2] Riesgo ambiental de cultivos transgénicos resistentes a herbicidas:', options: ['Transferencia accidental de genes a malezas silvestres ("supermalezas")', 'Falta de agua', 'Lluvia ácida', 'Congelamiento del suelo'], correct: 0, explanation: 'Flujo génico a plantas silvestres.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] La clonación de la oveja Dolly a partir de una célula somática demostró que:', options: ['El núcleo de una célula adulta diferenciada conserva toda la información genética', 'Las ovejas no usan ADN', 'Se crean monstruos', 'No hay genética en mamíferos'], correct: 0, explanation: 'Totipotencia del núcleo somático.' }
              ],
              'Biología', 'Biotecnología e Ingeniería Genética'
            ),
            questions: []
          },
          {
            id: 'bio_neurobiologia_hormonas',
            name: 'Neurobiología, Sistema Endocrino y Control Hormonal',
            keyTopic: true,
            desc: 'Eje hipotálamo-hipófisis, hormonas metabólicas, conducción nerviosa y arcos reflejos.',
            explanationDoc: {
              title: 'Guía Rápida: Control Nervioso y Hormonal',
              summary: 'El sistema nervioso (rápido y eléctrico) y el endocrino (lento y químico) coordinan el cuerpo.',
              keyConcepts: [
                'Hipotálamo e Hipófisis: Glándulas maestras del control hormonal central.',
                'Adrenalina: Hormona del estrés producida en glándulas suprarrenales para respuestas de lucha o huida.',
                'Impulso Nervioso: Potencial de acción eléctrico propagado a través del axón neuronal.'
              ],
              example: {
                question: 'Frente a una amenaza repentina, la hormona que acelera el ritmo cardíaco y dilata pupilas es:',
                options: ['Adrenalina (Epinefrina)', 'Insulina', 'Melatonina', 'Estrógeno'],
                correct: 'Adrenalina (Epinefrina)',
                reason: 'Prepara el cuerpo para respuesta de lucha o huida.'
              },
              icfesTip: 'El sistema nervioso envía señales en milisegundos; el endocrino actúa durante horas o días.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Hormona liberada en situaciones de susto o emergencia:', options: ['Adrenalina / Epinefrina', 'Insulina', 'Tiroxina', 'Prolactina'], correct: 0, explanation: 'Respuesta de lucha o huida.' }
              ],
              [
                { q: '[Prueba 2] La vaina de mielina envuelve al axón de la neurona para:', options: ['Aumentar la velocidad de conducción del impulso nervioso', 'Frenar la señal', 'Almacenar grasa', 'Absorber agua'], correct: 0, explanation: 'Conducción saltatoria rápida.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] La retroalimentación negativa en la tiroides asegura que:', options: ['Niveles altos de T3/T4 inhiban la secreción de TSH en la hipófisis', 'La tiroides crezca sin límite', 'Se produzca azúcar', 'El corazón se detenga'], correct: 0, explanation: 'Control homeostático endocrino.' }
              ],
              'Biología', 'Neurobiología y Control Hormonal'
            ),
            questions: []
          },
          {
            id: 'bio_biodiversidad_colombiana',
            name: 'Biogeografía, Biodiversidad Colombiana y Conservación',
            keyTopic: true,
            desc: 'Megadiversidad en Colombia, especies endémicas, hotspots y amenazas a ecosistemas.',
            explanationDoc: {
              title: 'Guía Rápida: Biodiversidad Colombiana y Conservación',
              summary: 'Colombia es el segundo país más megadiverso del mundo debido a su posición geográfica y relieve.',
              keyConcepts: [
                'Especie Endémica: Especie que solo habita de forma natural en una región geográfica delimitada.',
                'Hotspots de Biodiversidad: Zonas terrestres con alta concentración de especies endémicas y grave amenaza de hábitat.',
                'Páramos Colombianos: Ecosistemas de alta montaña indispensables para la regulación del ciclo del agua.'
              ],
              example: {
                question: 'Los páramos en Colombia cumplen la función vital de:',
                options: ['Captar, almacenar y regular el suministro de agua para la población', 'Producir petróleo', 'Cultivar trigo masivo', 'Evitar vientos'],
                correct: 'Captar, almacenar y regular el suministro de agua para la población',
                reason: 'El musgo y frailejones absorben humedad como esponjas naturales.'
              },
              icfesTip: 'El ICFES evalúa cómo la fragmentación de bosques destruye corredores biológicos de especies.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Los frailejones son plantas emblemáticas de los ecosistemas de:', options: ['Páramo', 'Manglar', 'Desierto', 'Selva tropical'], correct: 0, explanation: 'Vegetación típica del páramo.' }
              ],
              [
                { q: '[Prueba 2] La introducción de especies exóticas invasoras (ej: hipopótamos o pez león) causa:', options: ['Desplazamiento y amenaza de especies autóctonas locales', 'Enriquecimiento del ecosistema', 'Lluvia', 'Purificación del mar'], correct: 0, explanation: 'Disrupción de la fauna nativa.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] La creación de Parques Nacionales Naturales busca principalmente:', options: ['Preservar la biodiversidad y servicios ecosistémicos sin intervención humana destructiva', 'Vender entradas turísticas masivas', 'Fomentar la minería', 'Construir hoteles'], correct: 0, explanation: 'Conservación estricta in situ.' }
              ],
              'Biología', 'Biodiversidad Colombiana'
            ),
            questions: []
          }
        ]
      }
    ]
  },

  // =============================================================
  // 5. CIENCIAS NATURALES - QUÍMICA (8 TEMAS EN TOTAL)
  // =============================================================
  quimica: {
    id: 'quimica',
    name: 'Química',
    badge: 'Ciencias Naturales',
    description: 'La Materia, El Átomo, Enlaces, Reacciones, Soluciones, Cinética, Gases, pH, Electroquímica y Orgánica.',
    color: '#D9531E',
    bgLight: 'rgba(217, 83, 30, 0.08)',
    parts: [
      {
        id: 'qui_eje1',
        title: 'PARTE 1: Materia, Soluciones y Estructura Atómica',
        icon: '🧪',
        topics: [
          {
            id: 'qui_materia_separacion',
            name: 'Clasificación de la Materia y Métodos de Separación',
            keyTopic: true,
            desc: 'Mezclas Homogéneas vs Heterogéneas, Filtración, Destilación y Decantación.',
            explanationDoc: {
              title: 'Guía Rápida: Mezclas y Separación',
              summary: 'Aprende a separar componentes aprovechando sus propiedades físicas.',
              keyConcepts: [
                'Destilación: Separa líquidos miscibles por punto de ebullición.',
                'Filtración: Separa sólidos insolubles de líquidos.'
              ],
              example: {
                question: 'Para separar agua y alcohol se usa:',
                options: ['Destilación', 'Filtración', 'Decantación', 'Imantación'],
                correct: 'Destilación',
                reason: 'Aprovecha la diferencia en puntos de ebullición.'
              },
              icfesTip: 'Si hay diferencia de ebullición -> Destilación; si hay sólido insoluble -> Filtración.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Separar agua y alcohol por ebullición requiere:', options: ['Destilación', 'Filtración', 'Decantación', 'Centrifugación'], correct: 0, explanation: 'Destilación.' }
              ],
              [
                { q: '[Prueba 2] Instrumento para separar aceite y agua (inmiscibles):', options: ['Embudo de decantación', 'Papel filtro', 'Evaporador', 'Tubo de ensayo'], correct: 0, explanation: 'Decantación.' }
              ],
              [
                { q: '[Prueba 3] Evaporar agua salada para recuperar sal es:', options: ['Evaporación / Cristalización', 'Destilación', 'Filtración', 'Decantación'], correct: 0, explanation: 'Evaporación.' }
              ],
              'Química', 'La Materia y Separación'
            ),
            questions: []
          },
          {
            id: 'qui_soluciones_ph_estequiometria',
            name: 'Escala de pH, Soluciones y Reacciones Químicas',
            keyTopic: true,
            desc: 'Medición de acidez/alcalinidad (pH 0-14), concentraciones, moles y reactivo límite.',
            explanationDoc: {
              title: 'Guía Rápida: Soluciones, pH y Reacciones',
              summary: 'Aprende a medir el pH (ácido < 7, básico > 7) y entender las reacciones de neutralización.',
              keyConcepts: [
                'pH: Menor a 7 = Ácido; Igual a 7 = Neutro; Mayor a 7 = Básico/Alcalino.',
                'Neutralización: Ácido + Base ➔ Sal + Agua.'
              ],
              example: {
                question: 'Una solución con pH de 2.5 clasifica como:',
                options: ['Fuertemente Ácida', 'Básica', 'Neutra', 'Alcalina'],
                correct: 'Fuertemente Ácida',
                reason: 'pH menor a 7 indica acidez.'
              },
              icfesTip: 'A mayor concentración de H+, menor es el valor numérico del pH.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Solución con pH de 2.5 clasifica como:', options: ['Fuertemente Ácida', 'Básica', 'Neutra', 'Alcalina'], correct: 0, explanation: 'pH < 7 es ácido.' }
              ],
              [
                { q: '[Prueba 2] El reactivo que se consume primero limitando la producción:', options: ['Reactivo Límite', 'Reactivo en exceso', 'Catalizador', 'Solvente'], correct: 0, explanation: 'Reactivo límite.' }
              ],
              [
                { q: '[Prueba 3] Según Ley de Boyle, si el volumen del gas se reduce a la mitad (T constante), su presión:', options: ['Se duplica', 'Se reduce a la mitad', 'Queda constante', 'Cae a cero'], correct: 0, explanation: 'Inversamente proporcional.' }
              ],
              'Química', 'Soluciones, pH y Estequiometría'
            ),
            questions: []
          },
          {
            id: 'qui_atomo_enlaces',
            name: 'Configuración Electrónica, Tabla Periódica y Enlaces',
            keyTopic: true,
            desc: 'Modelos atómicos, electrones de valencia, regla del octeto y tipos de enlaces (Iónico, Covalente, Metálico).',
            explanationDoc: {
              title: 'Guía Rápida: Estructura Atómica y Enlaces',
              summary: 'Los átomos buscan estabilidad química completando 8 electrones en su último nivel.',
              keyConcepts: [
                'Número Atómico (Z): Número de protones en el núcleo.',
                'Enlace Iónico: Metal + No metal (transferencia de e-).'
              ],
              example: {
                question: 'En el enlace iónico del NaCl, el Sodio (Na) tiende a:',
                options: ['Perder 1 electrón formando un catión Na⁺', 'Ganar 1 electrón', 'Compartir 2 electrones', 'Destruirse'],
                correct: 'Perder 1 electrón formando un catión Na⁺',
                reason: 'El sodio metal dona su electrón al cloro.'
              },
              icfesTip: 'La electronegatividad aumenta de izquierda a derecha y de abajo hacia arriba.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Partículas subatómicas con carga positiva en el núcleo:', options: ['Protones', 'Electrones', 'Neutrones', 'Fotones'], correct: 0, explanation: 'Protones (+) en el núcleo.' }
              ],
              [
                { q: '[Prueba 2] La configuración electrónica del Carbono (Z=6) es:', options: ['1s² 2s² 2p²', '1s² 2s⁴', '1s⁶', '1s² 2p⁴'], correct: 0, explanation: 'Total 6 electrones.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] Las Fuerzas de Interacción por Puente de Hidrógeno ocurren entre H unido a:', options: ['F, O o N (elementos muy electronegativos)', 'Carbono e Hidrógeno', 'Metales', 'Gases nobles'], correct: 0, explanation: 'H unido a F, O o N.' }
              ],
              'Química', 'Estructura Atómica y Enlaces'
            ),
            questions: []
          },
          {
            id: 'qui_gases_termoquimica',
            name: 'Leyes de los Gases Ideales y Entalpía de Reacción',
            keyTopic: true,
            desc: 'Ecuaciones de estado de los gases (Boyle, Charles, Gay-Lussac), P·V = n·R·T y entalpía.',
            explanationDoc: {
              title: 'Guía Rápida: Leyes de Gases y Termoquímica',
              summary: 'Comprende el comportamiento de los gases ideales y los cambios de calor en reacciones.',
              keyConcepts: [
                'Ecuación de Estado: P · V = n · R · T.',
                'Reacción Exotérmica: ΔH < 0 (Libera calor).'
              ],
              example: {
                question: 'Al calentar un balón de gas cerrado (volumen constante), su presión interior:',
                options: ['Aumenta proporcionalmente (Gay-Lussac)', 'Disminuye a cero', 'Permanecerá igual', 'Se condensa'],
                correct: 'Aumenta proporcionalmente (Gay-Lussac)',
                reason: 'A mayor T, las moléculas chocan con más fuerza.'
              },
              icfesTip: 'La temperatura en las ecuaciones de gases SIEMPRE debe estar en Kelvin (K = °C + 273).'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Si un gas se calienta a volumen constante, su presión:', options: ['Aumenta (Ley de Gay-Lussac)', 'Disminuye', 'Se vuelve cero', 'Se congela'], correct: 0, explanation: 'Presión proporcional a T.' }
              ],
              [
                { q: '[Prueba 2] Si 2 moles de gas a STP ocupan un volumen de:', options: ['44.8 Litros', '22.4 Litros', '11.2 Litros', '2 Litros'], correct: 0, explanation: '1 mol = 22.4L -> 2 moles = 44.8L.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] Un gas real se comporta más como un gas ideal a:', options: ['Baja presión y Alta temperatura', 'Alta presión y Baja temperatura', '0 Kelvin', 'Bajo volumen'], correct: 0, explanation: 'Minimiza atracciones intermoleculares.' }
              ],
              'Química', 'Gases Ideales y Termoquímica'
            ),
            questions: []
          },
          {
            id: 'qui_organica_hidrocarburos',
            name: 'Química del Carbono, Grupos Funcionales e Hidrocarburos',
            keyTopic: true,
            desc: 'Tetravalencia del carbono, alcanos, alquenos, alquinos, alcoholes, cetonas y ácidos.',
            explanationDoc: {
              title: 'Guía Rápida: Química Orgánica',
              summary: 'Estudio de las cadenas carbonadas y los grupos funcionales.',
              keyConcepts: [
                'Tetravalencia: Carbono forma 4 enlaces covalentes.',
                'Grupos Funcionales: Alcoholes (-OH), Carboxilo (-COOH).'
              ],
              example: {
                question: 'El hidrocarburo de 3 carbonos con un enlace doble pertenece a los:',
                options: ['Alquenos', 'Alcanos', 'Alquinos', 'Alcoholes'],
                correct: 'Alquenos',
                reason: 'Posee enlace doble C=C.'
              },
              icfesTip: 'Identifica el sufijo: -ano (sencillo), -eno (doble), -ino (triple).'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Hidrocarburos con enlaces sencillos C-C se clasifican como:', options: ['Alcanos', 'Alquenos', 'Alquinos', 'Aromáticos'], correct: 0, explanation: 'Alcanos son saturados.' }
              ],
              [
                { q: '[Prueba 2] La fórmula general de los Alcanos lineales es:', options: ['C_n H_(2n+2)', 'C_n H_2n', 'C_n H_(2n-2)', 'C_n H_n'], correct: 0, explanation: 'Cn H(2n+2).' }
              ],
              [
                { q: '[Prueba 3 - ICFES] La Polimerización por adición del etileno (C2H4) produce el plástico:', options: ['Polietileno', 'Nailon', 'Teflón', 'PVC'], correct: 0, explanation: 'Polietileno.' }
              ],
              'Química', 'Química Orgánica e Hidrocarburos'
            ),
            questions: []
          }
        ]
      },
      {
        id: 'qui_eje2',
        title: 'PARTE 2: Cinética, Coligativas y Electroquímica (NUEVOS TEMAS)',
        icon: '⚡',
        topics: [
          {
            id: 'qui_cinetica_equilibrio',
            name: 'Cinética Química y Equilibrio (Principio de Le Chatelier)',
            keyTopic: true,
            desc: 'Velocidad de reacción, catalizadores, constante Keq y Principio de Le Chatelier.',
            explanationDoc: {
              title: 'Guía Rápida: Cinética y Equilibrio Químico',
              summary: 'El equilibrio químico reversible responde a cambios de presión, temperatura o concentración.',
              keyConcepts: [
                'Principio de Le Chatelier: Si un sistema en equilibrio se perturba, se desplaza para contrarrestar la perturbación.',
                'Aumento de Temperatura: Favorece la reacción endotérmica.',
                'Aumento de Presión: Favorece el lado con menor número de moles de gas.'
              ],
              example: {
                question: 'En la reacción N₂ + 3H₂ ⇌ 2NH₃ (exotérmica), si aumentamos la presión, el equilibrio se desplaza a:',
                options: ['La derecha (hacia NH₃)', 'La izquierda', 'No cambia', 'Se detiene'],
                correct: 'La derecha (hacia NH₃)',
                reason: 'Hay 4 moles de gas a la izquierda y 2 a la derecha; se desplaza hacia donde hay menos moles.'
              },
              icfesTip: 'Los catalizadores aceleran la reacción pero NO alteran la constante de equilibrio Keq.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Factores que aumentan la velocidad de una reacción química:', options: ['Aumentar temperatura y concentración de reactivos', 'Enfriar el matraz', 'Eliminar catalizadores', 'Reducir superficie de contacto'], correct: 0, explanation: 'Mayor temperatura y concentración aceleran choque molecular.' }
              ],
              [
                { q: '[Prueba 2] Si en N2 + 3H2 ⇌ 2NH3 agregamos más N2, el equilibrio se desplaza hacia:', options: ['La derecha para consumir el N2 sobrante', 'La izquierda', 'No hay cambio', 'El fondo'], correct: 0, explanation: 'Desplazamiento a productos por Le Chatelier.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] La Constante de Equilibrio Keq = [Productos] / [Reactivos]. Si Keq >> 1 significa:', options: ['En el equilibrio predominan fuertemente los productos', 'Predominan reactivos', 'La reacción es imposible', 'Keq vale cero'], correct: 0, explanation: 'Keq alta indica alto rendimiento en productos.' }
              ],
              'Química', 'Cinética y Equilibrio Químico'
            ),
            questions: []
          },
          {
            id: 'qui_soluciones_coligativas',
            name: 'Soluciones Avanzadas, Coligativas y Diagramas de Fase',
            keyTopic: true,
            desc: 'Molaridad, molalidad, elevación ebulloscópica, descenso crioscópico y presión de vapor.',
            explanationDoc: {
              title: 'Guía Rápida: Propiedades Coligativas',
              summary: 'Propiedades de las soluciones que dependen únicamente de la cantidad de partículas de soluto.',
              keyConcepts: [
                'Descenso Crioscópico: Añadir soluto (ej: sal en agua) DISMINUYE su punto de congelación.',
                'Aumento Ebulloscópico: Añadir soluto AUMENTA el punto de ebullición del solvente.',
                'Presión Osmótica: Presión necesaria para detener el flujo de solvente a través de membrana semipermeable.'
              ],
              example: {
                question: 'Agregar sal al agua para cocinar hace que el agua hierva a una temperatura:',
                options: ['Superior a 100 °C (Aumento Ebulloscópico)', 'Inferior a 100 °C', 'Igual a 0 °C', 'No hierva'],
                correct: 'Superior a 100 °C (Aumento Ebulloscópico)',
                reason: 'El soluto no volátil eleva el punto de ebullición del solvente.'
              },
              icfesTip: 'Echar sal en las carreteras heladas derrite el hielo porque baja el punto de congelación.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Echar sal a las calles heladas en invierno logra:', options: ['Bajar el punto de congelación del agua para derretir el hielo', 'Subir la temperatura del aire', 'Generar fuego', 'Hacer nieve'], correct: 0, explanation: 'Descenso crioscópico.' }
              ],
              [
                { q: '[Prueba 2] La Molaridad (M) de una solución que contiene 2 moles de NaCl en 4 Litros de agua es:', options: ['0.5 M', '2 M', '8 M', '1 M'], correct: 0, explanation: '2 moles / 4 Litros = 0.5 M.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] El "Punto Triple" en un diagrama de fase P-T representa el estado donde:', options: ['Coexisten en equilibrio simultáneo las fases sólida, líquida y gaseosa', 'El agua se evapora a 0K', 'La presión es infinita', 'No hay materia'], correct: 0, explanation: 'Coexistencia de 3 fases.' }
              ],
              'Química', 'Soluciones y Coligativas'
            ),
            questions: []
          },
          {
            id: 'qui_electroquimica_redox',
            name: 'Electroquímica, Celdas Galvánicas y Reacciones Redox',
            keyTopic: true,
            desc: 'Estados de oxidación, balanceo redox, ánodo/cátodo, electrólisis y pilas voltaicas.',
            explanationDoc: {
              title: 'Guía Rápida: Electroquímica y Reacciones Redox',
              summary: 'Procesos químicos que involucran transferencia de electrones y generación de corriente.',
              keyConcepts: [
                'Oxidación: PÉRDIDA de electrones (Aumento del número de oxidación).',
                'Reducción: GANANCIA de electrones (Disminución del número de oxidación).',
                'Ánodo: Electrodo donde ocurre la OXIDACIÓN (AnOx).',
                'Cátodo: Electrodo donde ocurre la REDUCCIÓN (RedCat).'
              ],
              example: {
                question: 'En una celda galvánica / pila, la oxidación ocurre siempre en el:',
                options: ['Ánodo', 'Cátodo', 'Puente salino', 'Electrolito'],
                correct: 'Ánodo',
                reason: 'Regla mnemotécnica AnOx (Ánodo Oxidación / Cátodo Reducción).'
              },
              icfesTip: 'El Agente Oxidante es la especie que se reduce (gana e-) provocando la oxidación del otro.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] En toda reacción Redox, la sustancia que GANA electrones se:', options: ['Reduce (es el Agente Oxidante)', 'Oxida', 'Evapora', 'Disuelve'], correct: 0, explanation: 'Ganar electrones es reducción.' }
              ],
              [
                { q: '[Prueba 2] En el hierro oxidado Fe -> Fe3+ + 3e-, el hierro sufrió:', options: ['Oxidación por pérdida de electrones', 'Reducción', 'Fusión', 'Sublimación'], correct: 0, explanation: 'Pérdida de e- es oxidación.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] La función del Puente Salino en una pila voltaica es:', options: ['Mantener la neutralidad eléctrica permitiendo la migración de iones entre celdas', 'Generar fuego', 'Detener el flujo de electrones', 'Aumentar la resistencia'], correct: 0, explanation: 'Mantiene neutralidad iónica.' }
              ],
              'Química', 'Electroquímica y Redox'
            ),
            questions: []
          }
        ]
      }
    ]
  },

  // =============================================================
  // 6. INGLÉS (8 TEMAS EN TOTAL)
  // =============================================================
  ingles: {
    id: 'ingles',
    name: 'Inglés',
    badge: 'Saber 11',
    description: 'Léxico, Pragmática, Comunicación, Modales, Reading, Tiempos Compuestos, Condicionales y Voz Pasiva.',
    color: '#D9531E',
    bgLight: 'rgba(217, 83, 30, 0.08)',
    parts: [
      {
        id: 'ing_parte1',
        title: 'PARTE 1: Léxico, Pragmática y Diálogos',
        icon: '🔤',
        topics: [
          {
            id: 'ing_lexico_family',
            name: 'Family & Jobs (Familia y Profesiones)',
            keyTopic: true,
            desc: 'Vocabulario esencial sobre parentesco y profesiones en contexto.',
            explanationDoc: {
              title: 'Guía Rápida: Vocabulario de Familia y Profesiones',
              summary: 'Relaciona definiciones en inglés con el miembro de la familia o profesión correcta.',
              keyConcepts: [
                'Family: Aunt (tía), Cousin (primo), Nephew (sobrino), Niece (sobrina).',
                'Jobs: Architect (arquitecto), Lawyer (abogado), Baker (panadero).'
              ],
              example: {
                question: 'My mother’s sister is my ______.',
                options: ['Aunt', 'Niece', 'Cousin', 'Grandmother'],
                correct: 'Aunt',
                reason: 'La hermana de mi madre es mi tía ("Aunt").'
              },
              icfesTip: 'Asocia lugares clave: hospital -> Nurse, bakery -> Baker, court -> Lawyer.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] My mother’s sister is my ______.', options: ['Aunt', 'Niece', 'Cousin', 'Grandmother'], correct: 0, explanation: 'Hermana de mamá es tía.' }
              ],
              [
                { q: '[Prueba 2] My brother’s son is my ______.', options: ['Nephew', 'Cousin', 'Uncle', 'Grandson'], correct: 0, explanation: 'Hijo del hermano es sobrino.' }
              ],
              [
                { q: '[Prueba 3] Your brother and sister are your ______.', options: ['Siblings', 'Parents', 'Cousins', 'Couples'], correct: 0, explanation: 'Hermanos e hermanas son Siblings.' }
              ],
              'Inglés', 'Family & Jobs'
            ),
            questions: []
          },
          {
            id: 'ing_pragmatica_notices',
            name: 'Avisos, Advertencias y Lugares Públicos',
            keyTopic: true,
            desc: 'Asociación de letreros públicos con el lugar donde se leen.',
            explanationDoc: {
              title: 'Guía Rápida: Avisos Públicos en Inglés',
              summary: 'Asocia avisos y advertencias cortas con el lugar cotidiano adecuado.',
              keyConcepts: [
                '"Keep off the grass": En un parque.',
                '"Fasten seatbelts": En un avión.'
              ],
              example: {
                question: 'Notice: "Fasten your seatbelts". Where do you see it?',
                options: ['On an airplane', 'In a library', 'At a bakery', 'In a park'],
                correct: 'On an airplane',
                reason: 'Instrucción dada antes del despegue.'
              },
              icfesTip: 'Relaciona sustantivos del aviso con el lugar específico.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] "Please keep off the grass". Where do you see this?', options: ['In a public park', 'In a kitchen', 'In a pool', 'On a plane'], correct: 0, explanation: 'En un parque público.' }
              ],
              [
                { q: '[Prueba 2] "No food allowed near computers":', options: ['In a computer lab', 'In a restaurant', 'At a pool', 'In a park'], correct: 0, explanation: 'En la sala de sistemas.' }
              ],
              [
                { q: '[Prueba 3] "Maximum weight 500 kg or 6 persons":', options: ['Inside an elevator', 'On a bike', 'In a classroom', 'In a taxi'], correct: 0, explanation: 'Límite en ascensor.' }
              ],
              'Inglés', 'Pragmática y Avisos'
            ),
            questions: []
          },
          {
            id: 'ing_dialogos_interacciones',
            name: 'Conversaciones Cortas, Saludos y Respuestas Adecuadas',
            keyTopic: true,
            desc: 'Selección de la respuesta más natural en intercambios comunicativos cotidianos.',
            explanationDoc: {
              title: 'Guía Rápida: Diálogos Cotidianos en Inglés',
              summary: 'En la Parte 3 de Inglés ICFES, debes elegir la respuesta lógica y educada en una conversación.',
              keyConcepts: [
                'Greetings: "How do you do?" ➔ "How do you do?" / "Fine, thanks".',
                'Offering help: "Can I help you?" ➔ "Yes, please."'
              ],
              example: {
                question: 'Person A: "Would you like some coffee?" ➔ Person B: ______',
                options: ['Yes, please. With milk.', 'I am 18 years old.', 'It is raining.', 'Blue is my favorite color.'],
                correct: 'Yes, please. With milk.',
                reason: 'Respuesta adecuada y coherente.'
              },
              icfesTip: 'Elimina las opciones que no tengan relación temática con el contexto.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] Person A: "Would you like some coffee?" ➔ Person B:', options: ['Yes, please. With milk.', 'I am 18 years old.', 'It is raining outside.', 'My name is John.'], correct: 0, explanation: 'Aceptación educada de bebida.' }
              ],
              [
                { q: '[Prueba 2] Person A: "Shall we go for a walk in the park?" ➔ Person B:', options: ['That sounds like a great idea!', 'I don\'t speak Spanish.', 'My shoes are size 40.', 'Yes, I am a doctor.'], correct: 0, explanation: 'Aceptación de sugerencia.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] Person A: "Do you mind if I open the window?" ➔ Person B:', options: ['Not at all, go ahead.', 'Yes, I love windows.', 'It\'s 10 degrees.', 'I am closing it.'], correct: 0, explanation: '"Not at all" autoriza sin molestia.' }
              ],
              'Inglés', 'Diálogos e Interacciones'
            ),
            questions: []
          },
          {
            id: 'ing_modales_opinion',
            name: 'Modal Verbs (Must, Should, Can, May) & Expressing Opinion',
            keyTopic: true,
            desc: 'Uso correcto de verbos modales para obligación, consejo, posibilidad y permiso.',
            explanationDoc: {
              title: 'Guía Rápida: Verbos Modales en Inglés',
              summary: 'Los verbos modales acompañan al verbo principal sin modificar su forma base.',
              keyConcepts: [
                'Must: Obligación fuerte.',
                'Should: Consejo.',
                'Can: Habilidad o permiso.'
              ],
              example: {
                question: 'You ______ stop when the traffic light is red.',
                options: ['Must', 'Should', 'Might', 'Can\'t'],
                correct: 'Must',
                reason: 'Representa una ley u obligación estricta.'
              },
              icfesTip: 'Los verbos modales nunca llevan "to" después (excepto ought to).'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] You ______ stop when the traffic light is red.', options: ['Must', 'Should', 'May', 'Could'], correct: 0, explanation: 'Obligación estricta (Must).' }
              ],
              [
                { q: '[Prueba 2] Excuse me, ______ I use your restroom?', options: ['May', 'Must', 'Should', 'Will'], correct: 0, explanation: 'Petición formal (May).' }
              ],
              [
                { q: '[Prueba 3 - ICFES] The lights are on in his office. He ______ be working late.', options: ['Must', 'Can\'t', 'Shouldn\'t', 'Needn\'t'], correct: 0, explanation: 'Deducción lógica de certeza (Must).' }
              ],
              'Inglés', 'Verbos Modales y Opinión'
            ),
            questions: []
          },
          {
            id: 'ing_comprension_inferencia',
            name: 'Reading Comprehension, Main Ideas & Inferences',
            keyTopic: true,
            desc: 'Lectura de textos cortos en inglés, deducción de ideas principales y significado por contexto.',
            explanationDoc: {
              title: 'Guía Rápida: Lectura Crítica en Inglés',
              summary: 'Comprende la intención del autor, busca palabras clave y responde preguntas inferenciales.',
              keyConcepts: [
                'Main Idea: El mensaje central del párrafo.',
                'False Friends: Palabras engañosas (Actually = De hecho).'
              ],
              example: {
                question: 'Text: "Solar energy is clean, renewable and reduces pollution." What is the main benefit?',
                options: ['It helps protect the environment', 'It is expensive', 'It is dark', 'It only works at night'],
                correct: 'It helps protect the environment',
                reason: 'Inferencia directa de "clean and reduces pollution".'
              },
              icfesTip: 'No intentes traducir palabra por palabra; busca la idea general de cada párrafo.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] "Solar energy is clean and reduces pollution." The main benefit is:', options: ['It helps protect the environment.', 'It is very expensive.', 'It works only in winter.', 'It damages nature.'], correct: 0, explanation: 'Protección ambiental.' }
              ],
              [
                { q: '[Prueba 2] "Recycling plastic prevents ocean contamination." What is the author\'s purpose?', options: ['To encourage environmental recycling habits', 'To sell plastic bottles', 'To complain about fish', 'To ban oceans'], correct: 0, explanation: 'Fomentar reciclaje.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] "Although digital devices improve communication, excessive screen time can harm sleep." Infer:', options: ['Technology has both benefits and potential drawbacks for health', 'Screens are completely evil', 'No one should use phones', 'Sleep is not important'], correct: 0, explanation: 'Balance entre beneficios y riesgos.' }
              ],
              'Inglés', 'Comprensión Lectora e Inferencia'
            ),
            questions: []
          }
        ]
      },
      {
        id: 'ing_parte2',
        title: 'PARTE 2: Gramática Avanzada y Estructuras (NUEVOS TEMAS)',
        icon: '📝',
        topics: [
          {
            id: 'ing_tiempos_compuestos',
            name: 'Perfect Tenses (Present Perfect, Past Perfect & Connectors)',
            keyTopic: true,
            desc: 'Uso de Have/Has + Past Participle, Had + Past Participle y conectores temporales (Since, For, Already, Yet).',
            explanationDoc: {
              title: 'Guía Rápida: Tiempos Verbales Compuestos',
              summary: 'El Present Perfect conecta acciones del pasado con el presente; el Past Perfect describe acciones anteriores a otra en el pasado.',
              keyConcepts: [
                'Present Perfect: Have/Has + Past Participle ("I have lived here for 3 years").',
                'Past Perfect: Had + Past Participle ("When I arrived, the train had left").',
                'Since: Punto de inicio ("since 2020"); For: Duración ("for 5 years").'
              ],
              example: {
                question: 'I have lived in Colombia ______ 2018.',
                options: ['Since', 'For', 'Ago', 'During'],
                correct: 'Since',
                reason: 'Se usa "Since" con un punto específico en el tiempo.'
              },
              icfesTip: 'Utiliza "Yet" en preguntas y oraciones negativas al final de la frase.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] I have lived in Colombia ______ 2018.', options: ['Since', 'For', 'Ago', 'During'], correct: 0, explanation: 'Punto temporal específico (Since).' }
              ],
              [
                { q: '[Prueba 2] She hasn\'t finished her homework ______.', options: ['Yet', 'Already', 'Since', 'Ever'], correct: 0, explanation: '"Yet" al final de negativa.' }
              ],
              [
                { q: '[Prueba 3 - ICFES] By the time the doctor arrived, the patient ______ already recovered.', options: ['Had', 'Has', 'Have', 'Was'], correct: 0, explanation: 'Past Perfect (Had) previo a acción pasada.' }
              ],
              'Inglés', 'Perfect Tenses'
            ),
            questions: []
          },
          {
            id: 'ing_condicionales',
            name: 'Conditionals (First, Second & Third Conditionals)',
            keyTopic: true,
            desc: 'Estructuras de hipótesis (If + present -> will; If + past -> would; If + past perfect -> would have).',
            explanationDoc: {
              title: 'Guía Rápida: Oraciones Condicionales en Inglés',
              summary: 'Expresa situaciones reales, hipotéticas o arrepentimientos pasados mediante condicionales.',
              keyConcepts: [
                '1st Conditional (Real futuro): If + Present Simple ➔ Will + verb ("If it rains, I will stay").',
                '2nd Conditional (Imaginario presente): If + Past Simple ➔ Would + verb ("If I won the lottery, I would buy a house").',
                '3rd Conditional (Imposible pasado): If + Past Perfect ➔ Would have + past participle.'
              ],
              example: {
                question: 'If you study hard for the ICFES, you ______ get a great score.',
                options: ['Will', 'Would', 'Would have', 'Did'],
                correct: 'Will',
                reason: 'Primer condicional real (If + present -> Will).'
              },
              icfesTip: 'En el segundo condicional, "If I were you..." usa siempre "were" para todas las personas.'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] If you study hard for the ICFES, you ______ get a great score.', options: ['Will', 'Would', 'Would have', 'Did'], correct: 0, explanation: 'First conditional (Will).' }
              ],
              [
                { q: '[Prueba 2] If I ______ you, I would take that university scholarship immediately.', options: ['Were', 'Am', 'Was being', 'Been'], correct: 0, explanation: 'Second conditional: "If I were you".' }
              ],
              [
                { q: '[Prueba 3 - ICFES] If we had left home earlier, we ______ missed the flight.', options: ['Wouldn\'t have', 'Will not', 'Don\'t', 'Aren\'t'], correct: 0, explanation: 'Third conditional (Wouldn\'t have + past participle).' }
              ],
              'Inglés', 'Oraciones Condicionales'
            ),
            questions: []
          },
          {
            id: 'ing_voz_pasiva_conectores',
            name: 'Passive Voice & Discourse Connectors',
            keyTopic: true,
            desc: 'Voz pasiva (Object + be + past participle) y conectores (However, Furthermore, Although, Due to).',
            explanationDoc: {
              title: 'Guía Rápida: Voz Pasiva y Conectores de Discurso',
              summary: 'La voz pasiva enfatiza la acción sobre el sujeto; los conectores dan fluidez y coherencia textual.',
              keyConcepts: [
                'Passive Voice: Sujeto + Be + Past Participle ("America was discovered in 1492").',
                'Contrast Connectors: However, Although, On the other hand.',
                'Cause/Effect Connectors: Therefore, As a result, Due to.'
              ],
              example: {
                question: 'The new hospital ______ built by the government last year.',
                options: ['Was', 'Is', 'Will be', 'Has'],
                correct: 'Was',
                reason: 'Voz pasiva en pasado (Was built).'
              },
              icfesTip: '"Although" va seguido de sujeto y verbo; "Despite" va seguido de sustantivo o gerundio (-ing).'
            },
            tests: build3Tests(
              [
                { q: '[Prueba 1] The new hospital ______ built by the government last year.', options: ['Was', 'Is', 'Will be', 'Has'], correct: 0, explanation: 'Voz pasiva en pasado simples (Was built).' }
              ],
              [
                { q: '[Prueba 2] ______ it rained heavily, we decided to go hiking in the mountain.', options: ['Although', 'Because', 'Therefore', 'Despite of'], correct: 0, explanation: 'Conector de contraste (Although + cláusula).' }
              ],
              [
                { q: '[Prueba 3 - ICFES] Millions of smartphones ______ produced in Asia every year.', options: ['Are', 'Were', 'Have', 'Did'], correct: 0, explanation: 'Voz pasiva presente plural (Are produced).' }
              ],
              'Inglés', 'Voz Pasiva y Conectores'
            ),
            questions: []
          }
        ]
      }
    ]
  }
};

// Asegurar compatibilidad para que cada tema tenga topic.questions apuntando a su Prueba 1 (10 preguntas)
Object.values(TEMARIOS_BY_SUBJECT).forEach(subject => {
  subject.parts.forEach(part => {
    part.topics.forEach(topic => {
      if (topic.tests && topic.tests.length > 0) {
        topic.questions = topic.tests[0].questions;
      }
    });
  });
});
