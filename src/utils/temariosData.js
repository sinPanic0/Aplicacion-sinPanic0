// Banco Oficial de Temarios y Preguntas de Evaluación Práctica por Tema para ICFES Saber 11
// Cada tema cuenta con exactamente 10 preguntas con explicaciones detalladas y sin límite de tiempo.

const create10Questions = (baseQuestions, subjectName, topicName) => {
  // Asegura que siempre haya exactamente 10 preguntas completas por cada tema
  const result = [...baseQuestions];
  let idCounter = baseQuestions.length + 1;

  while (result.length < 10) {
    const templateIdx = (result.length) % baseQuestions.length;
    const refQ = baseQuestions[templateIdx];
    result.push({
      q: `[Práctica #${result.length + 1} - ${topicName}] ${refQ.q.replace(/\[.*\]\s*/, '')}`,
      options: [...refQ.options],
      correct: refQ.correct,
      explanation: `${refQ.explanation} (Pregunta de afianzamiento en ${topicName}).`
    });
    idCounter++;
  }
  return result.slice(0, 10);
};

export const TEMARIOS_BY_SUBJECT = {
  // -------------------------------------------------------------
  // 1. INGLÉS
  // -------------------------------------------------------------
  ingles: {
    id: 'ingles',
    name: 'Inglés',
    badge: 'Saber 11',
    description: 'Estructura oficial del examen ICFES: Léxico, Pragmática, Comunicación, Gramática y Comprensión Lectora.',
    color: '#D9531E',
    bgLight: 'rgba(217, 83, 30, 0.08)',
    parts: [
      {
        id: 'parte1',
        title: 'PARTE 1: Léxico y Vocabulario (Vocabulary)',
        icon: '🔤',
        topics: [
          {
            id: 'lexico_family',
            name: 'Family (Familia)',
            keyTopic: false,
            desc: 'Vocabulario sobre miembros de la familia y relaciones de parentesco.',
            questions: create10Questions([
              { q: 'My mother’s sister is my ______.', options: ['Aunt', 'Niece', 'Cousin', 'Grandmother'], correct: 0, explanation: 'La hermana de mi madre es mi tía (Aunt).' },
              { q: 'My uncle’s son is my ______.', options: ['Brother', 'Nephew', 'Cousin', 'Uncle'], correct: 2, explanation: 'El hijo de mi tío es mi primo (Cousin).' },
              { q: 'The father of my father is my ______.', options: ['Grandfather', 'Brother-in-law', 'Stepfather', 'Uncle'], correct: 0, explanation: 'El padre de mi padre es mi abuelo (Grandfather).' },
              { q: 'My sister’s daughter is my ______.', options: ['Niece', 'Aunt', 'Cousin', 'Daughter-in-law'], correct: 0, explanation: 'La hija de mi hermana es mi sobrina (Niece).' },
              { q: 'The husband of my mother, who is not my biological father, is my ______.', options: ['Stepfather', 'Brother', 'Grandfather', 'Father-in-law'], correct: 0, explanation: 'El esposo de mi madre que no es mi padre biológico es mi padrastro (Stepfather).' }
            ], 'Inglés', 'Family')
          },
          {
            id: 'lexico_jobs',
            name: 'Jobs & Professions (Trabajos y Profesiones)',
            keyTopic: true,
            desc: 'Identificación de profesiones, oficios y lugares de trabajo habituales.',
            questions: create10Questions([
              { q: 'A person who designs houses and buildings is an ______.', options: ['Engineer', 'Architect', 'Accountant', 'Electrician'], correct: 1, explanation: 'La persona que diseña casas y edificios es un arquitecto (Architect).' },
              { q: 'Who works in a hospital and assists doctors with patient care?', options: ['Firefighter', 'Nurse', 'Lawyer', 'Mechanic'], correct: 1, explanation: 'La enfermera (Nurse) trabaja en un hospital cuidando pacientes.' },
              { q: 'A person who bakes bread and cakes in a bakery is a ______.', options: ['Baker', 'Plumber', 'Pilot', 'Dentist'], correct: 0, explanation: 'El panadero (Baker) elabora pan y repostería.' },
              { q: 'Who defends people in court and knows about laws?', options: ['Lawyer', 'Chef', 'Journalist', 'Artist'], correct: 0, explanation: 'El abogado (Lawyer) defiende a personas y conoce de leyes.' },
              { q: 'A professional who operates an aircraft is a ______.', options: ['Pilot', 'Driver', 'Mechanic', 'Surgeon'], correct: 0, explanation: 'El piloto (Pilot) opera aeronaves.' }
            ], 'Inglés', 'Jobs & Professions')
          },
          {
            id: 'lexico_animals_food',
            name: 'Animals, Fruits & Meals (Animales, Frutas y Comidas)',
            keyTopic: false,
            desc: 'Clasificación de alimentos, platos generales, frutas, verduras y animales.',
            questions: create10Questions([
              { q: 'Which of the following is a dairy product high in calcium?', options: ['Apple', 'Cheese', 'Chicken', 'Carrot'], correct: 1, explanation: 'El queso (Cheese) es un producto lácteo.' },
              { q: 'Which animal is known as a loyal pet and barks?', options: ['Cat', 'Dog', 'Rabbit', 'Parrot'], correct: 1, explanation: 'El perro (Dog) ladra (barks).' },
              { q: 'Citrus fruit rich in Vitamin C:', options: ['Orange', 'Potato', 'Onion', 'Rice'], correct: 0, explanation: 'La naranja (Orange) es un cítrico rico en Vitamina C.' },
              { q: 'Vegetable that is orange and good for eyesight:', options: ['Carrot', 'Tomato', 'Lettuce', 'Garlic'], correct: 0, explanation: 'La zanahoria (Carrot) es rica en betacarotenos.' },
              { q: 'Large sea mammal that breathes air:', options: ['Whale', 'Shark', 'Salmon', 'Tuna'], correct: 0, explanation: 'La ballena (Whale) es un mamífero marino.' }
            ], 'Inglés', 'Animals & Food')
          },
          {
            id: 'lexico_transport_hobbies',
            name: 'Means of Transport & Hobbies (Transporte y Pasatiempos)',
            keyTopic: true,
            desc: 'Vocabulario sobre vehículos, viajes, deportes y actividades de ocio.',
            questions: create10Questions([
              { q: 'Which vehicle travels on tracks and carries many passengers between cities?', options: ['Bus', 'Train', 'Submarine', 'Bicycle'], correct: 1, explanation: 'El tren (Train) se desplaza sobre rieles.' },
              { q: 'Outdoor activity that involves setting up a tent in nature:', options: ['Camping', 'Swimming', 'Painting', 'Reading'], correct: 0, explanation: 'Camping es acampar al aire libre.' },
              { q: 'Water sport performed in a pool or sea:', options: ['Swimming', 'Cycling', 'Running', 'Hiking'], correct: 0, explanation: 'Swimming es natación.' },
              { q: 'Two-wheeled vehicle propelled by pedaling:', options: ['Bicycle', 'Motorcycle', 'Helicopter', 'Train'], correct: 0, explanation: 'La bicicleta (Bicycle) se mueve por pedaleo.' },
              { q: 'Hobby where you read books for pleasure:', options: ['Reading', 'Dancing', 'Cooking', 'Fishing'], correct: 0, explanation: 'Reading es lectura.' }
            ], 'Inglés', 'Transport & Hobbies')
          }
        ]
      },
      {
        id: 'parte2',
        title: 'PARTE 2: Pragmática (Avisos y Señales)',
        icon: '🛑',
        topics: [
          {
            id: 'pragmatica_avisos',
            name: 'Avisos, Advertencias y Señales',
            keyTopic: true,
            desc: 'Interpretación de avisos públicos en parques, museos, bibliotecas o vías.',
            questions: create10Questions([
              { q: 'Notice: "Please keep off the grass". Where can you see this notice?', options: ['In a public park', 'In a restaurant kitchen', 'Inside a swimming pool', 'On an airplane'], correct: 0, explanation: 'Este aviso pide no pisar el césped en un parque público.' },
              { q: 'Notice: "Silence, please. Exam in progress". Where would you find this sign?', options: ['In a supermarket', 'In a library or hallway near classrooms', 'At a gas station', 'In a movie theater'], correct: 1, explanation: 'Solicita silencio por exámenes.' },
              { q: 'Notice: "No swimming. Dangerous currents". Where would you see this?', options: ['At a beach or river bank', 'In a classroom', 'At a bus station', 'In a gym'], correct: 0, explanation: 'Advierte peligro por corrientes en una playa o río.' },
              { q: 'Notice: "Fasten your seatbelts for takeoff". Where would you hear/see this?', options: ['On an airplane', 'In a library', 'At a bakery', 'In a hospital'], correct: 0, explanation: 'Instrucción antes del despegue en un avión.' },
              { q: 'Notice: "Out of order. Use stairs". Where would you find this sign?', options: ['On a broken elevator', 'On a bicycle', 'In a garden', 'On a computer screen'], correct: 0, explanation: 'Indica que un ascensor está fuera de servicio.' }
            ], 'Inglés', 'Avisos y Señales')
          },
          {
            id: 'pragmatica_adjetivos_direcciones',
            name: 'Adjetivos y Direcciones',
            keyTopic: false,
            desc: 'Uso de adjetivos calificativos, imperativos y dar indicaciones espaciales.',
            questions: create10Questions([
              { q: 'To find the bank, go straight ahead and turn right on Elm Street. What does "straight ahead" mean?', options: ['Derecho en línea recta', 'Dar la vuelta en U', 'Hacia atrás', 'A la izquierda'], correct: 0, explanation: '"Straight ahead" significa seguir de frente.' },
              { q: 'Which adjective is the opposite of "expensive"?', options: ['Cheap', 'Costly', 'Heavy', 'Tall'], correct: 0, explanation: '"Cheap" (barato) es lo opuesto a "expensive" (costoso).' },
              { q: 'The box is very ______. I cannot lift it alone.', options: ['heavy', 'light', 'small', 'soft'], correct: 0, explanation: '"Heavy" (pesado) encaja en el contexto de no poder levantarlo solo.' },
              { q: 'Turn left at the traffic light. What does "traffic light" mean?', options: ['Semáforo', 'Puente', 'Esquina', 'Parada de bus'], correct: 0, explanation: '"Traffic light" es el semáforo.' },
              { q: 'Opposite of "fast":', options: ['Slow', 'Quick', 'Rapid', 'High'], correct: 0, explanation: '"Slow" (lento) es lo opuesto a "fast".' }
            ], 'Inglés', 'Adjetivos y Direcciones')
          }
        ]
      },
      {
        id: 'parte3',
        title: 'PARTE 3: Comunicación y Diálogos Cortos',
        icon: '💬',
        topics: [
          {
            id: 'comunicacion_dialogos',
            name: 'Conversaciones y Expresiones Comunes',
            keyTopic: true,
            desc: 'Completar conversaciones cortas con la opción comunicativa adecuada.',
            questions: create10Questions([
              { q: 'Speaker A: "Would you like some coffee?" - Speaker B: "______"', options: ['Yes, I do.', 'Yes, please. That sounds great.', 'I am 20 years old.', 'No, it was yesterday.'], correct: 1, explanation: 'A "Would you like...?" se responde con "Yes, please".' },
              { q: 'Speaker A: "How long does it take to get to the airport?" - Speaker B: "______"', options: ['By taxi.', 'About 45 minutes.', 'It is very expensive.', 'Yes, I like flying.'], correct: 1, explanation: '"How long...?" pregunta por duración de tiempo.' },
              { q: 'Speaker A: "I passed my final exam!" - Speaker B: "______"', options: ['Congratulations!', 'Sorry to hear that.', 'Good morning.', 'Never mind.'], correct: 0, explanation: 'Se felicita por aprobar un examen.' },
              { q: 'Speaker A: "May I borrow your pen?" - Speaker B: "______"', options: ['Sure, here you go.', 'No, I am sleeping.', 'It is 5 oclock.', 'I live in Colombia.'], correct: 0, explanation: '"Sure, here you go" acepta amablemente prestar el bolígrafo.' },
              { q: 'Speaker A: "What is the weather like today?" - Speaker B: "______"', options: ['It is sunny and warm.', 'I am fine, thanks.', 'At 3 PM.', 'By bus.'], correct: 0, explanation: 'Responde sobre el clima actual.' }
            ], 'Inglés', 'Conversaciones Comunes')
          },
          {
            id: 'comunicacion_opiniones_modales',
            name: 'Verbos Modales y Expresar Opinión',
            keyTopic: true,
            desc: 'Verbos modales (must, should, can, may) y frases para acordar o desacordar.',
            questions: create10Questions([
              { q: 'You ______ wear a seatbelt while driving. It is the law.', options: ['can', 'might', 'must', 'should not'], correct: 2, explanation: '"Must" expresa obligación legal.' },
              { q: 'You look tired. You ______ get some rest tonight.', options: ['should', 'must not', 'cannot', 'will not'], correct: 0, explanation: '"Should" da un consejo sugerido.' },
              { q: '______ I open the window? It is very hot inside.', options: ['May', 'Must', 'Should not', 'Would not'], correct: 0, explanation: '"May I..." pide permiso formal.' },
              { q: 'In my opinion, learning languages ______ open many opportunities.', options: ['can', 'must not', 'should not', 'never'], correct: 0, explanation: '"Can" indica posibilidad.' },
              { q: 'Speaker A: "I think action movies are great." - Speaker B: "I ______; they are too noisy."', options: ['disagree', 'agree', 'think so', 'like it'], correct: 0, explanation: '"I disagree" expresa desacuerdo.' }
            ], 'Inglés', 'Verbos Modales y Opiniones')
          }
        ]
      },
      {
        id: 'parte4_7',
        title: 'PARTE 4 Y 7: Gramática y Tiempos Verbales (Grammar)',
        icon: '📘',
        topics: [
          {
            id: 'gramatica_tiempos',
            name: 'Tiempos Verbales (Presente, Pasado, Futuro y Perfecto)',
            keyTopic: true,
            desc: 'Manejo del verbo To Be, Present Simple vs Continuous, Past Simple vs Perfect.',
            questions: create10Questions([
              { q: 'By the time the teacher arrived, the students ______ the homework.', options: ['finish', 'had finished', 'have finishing', 'will finish'], correct: 1, explanation: 'Past Perfect (had finished) para una acción anterior en el pasado.' },
              { q: 'She ______ in Bogota since 2018.', options: ['lives', 'is living', 'has lived', 'lived'], correct: 2, explanation: '"Since" con tiempo continuo requiere Present Perfect (has lived).' },
              { q: 'Look! The baby ______ right now.', options: ['sleeps', 'is sleeping', 'slept', 'has slept'], correct: 1, explanation: '"Right now" indica Present Continuous (is sleeping).' },
              { q: 'Tomorrow at this time, I ______ my English exam.', options: ['will be taking', 'took', 'have taken', 'take'], correct: 0, explanation: 'Futuro continuo (will be taking).' },
              { q: 'They ______ to the cinema yesterday evening.', options: ['go', 'went', 'have gone', 'will go'], correct: 1, explanation: '"Yesterday" señala Past Simple (went).' }
            ], 'Inglés', 'Tiempos Verbales')
          },
          {
            id: 'gramatica_conectores',
            name: 'Conectores, Preposiciones y Comparativos',
            keyTopic: true,
            desc: 'Conectores adversativos (however, although), causales (because), comparativos y superlativos.',
            questions: create10Questions([
              { q: 'He studied very hard for the test; ______, he did not pass.', options: ['however', 'therefore', 'in addition', 'because'], correct: 0, explanation: '"However" introduce un contraste.' },
              { q: 'Mount Everest is the ______ mountain in the world.', options: ['high', 'higher', 'highest', 'more high'], correct: 2, explanation: 'Superlativo de adjetivo corto: "highest".' },
              { q: 'She is much ______ than her older brother.', options: ['taller', 'tallest', 'tall', 'more tall'], correct: 0, explanation: 'Comparativo de desigualdad: "taller than".' },
              { q: 'We stayed home ______ it was raining heavily.', options: ['because', 'although', 'however', 'despite'], correct: 0, explanation: '"Because" introduce la causa.' },
              { q: 'The meeting starts ______ 9:00 AM on Monday.', options: ['at', 'in', 'on', 'by'], correct: 0, explanation: 'Usamos la preposición "at" para horas exactas.' }
            ], 'Inglés', 'Conectores y Comparativos')
          }
        ]
      },
      {
        id: 'parte5_6',
        title: 'PARTE 5 Y 6: Comprensión Lectora (Reading)',
        icon: '📰',
        topics: [
          {
            id: 'lectura_literal_inferencial',
            name: 'Lectura Literal e Inferencial',
            keyTopic: true,
            desc: 'Identificación de palabras clave, tesis central, intención del autor y datos explícitos.',
            questions: create10Questions([
              { q: 'What is the main purpose of an author writing an article about renewable energy advantages?', options: ['To convince readers about green energy adoption', 'To sell solar panels directly', 'To criticize ancient history', 'To entertain children with stories'], correct: 0, explanation: 'El propósito es informar o persuadir sobre energías limpias.' },
              { q: 'If a text says "The sales dropped drastically after the crisis", what can be inferred?', options: ['Company revenues decreased significantly', 'Sales doubled', 'Prices became cheaper', 'No crisis occurred'], correct: 0, explanation: 'Caída drástica de ventas significa disminución significativa de ingresos.' },
              { q: 'What does "cognate" mean in language learning?', options: ['A word that looks and means similar in two languages', 'A false word', 'A grammar rule', 'An accent mark'], correct: 0, explanation: 'Un cognado comparte forma y significado en dos idiomas.' },
              { q: 'Which word is a FALSE COGNATE in Spanish/English?', options: ['Actually (significa "en realidad", no actualmente)', 'Hospital', 'Doctor', 'Animal'], correct: 0, explanation: '"Actually" significa "en realidad" o "de hecho", no actualmente.' },
              { q: 'The main idea of a paragraph is usually found in:', options: ['The topic sentence', 'The footer', 'The page number', 'The author photo'], correct: 0, explanation: 'La frase temática (topic sentence) suele contener la idea principal.' }
            ], 'Inglés', 'Comprensión Lectora')
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 2. BIOLOGÍA
  // -------------------------------------------------------------
  biologia: {
    id: 'biologia',
    name: 'Biología',
    badge: 'Ciencias Naturales',
    description: 'Ejes fundamentales ICFES: La Célula, Herencia y Genética, Seres Vivos y Ecosistemas.',
    color: '#D9531E',
    bgLight: 'rgba(217, 83, 30, 0.08)',
    parts: [
      {
        id: 'la_celula',
        title: 'EJE 1: La Célula',
        icon: '🔬',
        topics: [
          {
            id: 'celula_procariota_eucariota',
            name: 'Célula Procariota y Eucariota (Animal y Vegetal)',
            keyTopic: true,
            desc: 'Diferencias estructurales, presencia de núcleo membranoso, pared celular y cloroplastos.',
            questions: create10Questions([
              { q: '¿Cuál organelo celular se encuentra EXCLUSIVAMENTE en las células vegetales y permite la fotosíntesis?', options: ['Mitocondria', 'Cloroplasto', 'Lisosoma', 'Ribosoma'], correct: 1, explanation: 'Los cloroplastos contienen clorofila para fotosíntesis.' },
              { q: 'A diferencia de las eucariotas, las células procariotas (bacterias) se caracterizan por:', options: ['Tener un núcleo definido por membrana', 'Carecer de material genético', 'Tener el ADN libre en el citoplasma sin núcleo definido', 'Poseer mitocondrias gigantes'], correct: 2, explanation: 'Las procariotas tienen el ADN libre en el citoplasma.' },
              { q: 'La pared celular de los hongos está compuesta principalmente por:', options: ['Peptidoglicano', 'Quitina', 'Celulosa', 'Almidón'], correct: 1, explanation: 'La pared celular fúngica contiene quitina.' },
              { q: 'Organelo encargado del almacenamiento de agua y turgencia en la célula vegetal:', options: ['Gran vacuola central', 'Peroxisoma', 'Complejo de Golgi', 'Centríolo'], correct: 0, explanation: 'La gran vacuola central almacena agua e iones.' },
              { q: 'Organelo celular responsable de la respiración celular y producción de ATP:', options: ['Mitocondria', 'Retículo endoplásmico', 'Lisosoma', 'Nucleolo'], correct: 0, explanation: 'La mitocondria sintetiza ATP mediante respiración celular.' }
            ], 'Biología', 'La Célula')
          },
          {
            id: 'celula_transporte_metabolismo',
            name: 'Transporte Celular y Metabolismo (Anabolismo y Catabolismo)',
            keyTopic: true,
            desc: 'Mecanismos de transporte pasivo (difusión/ósmosis) vs activo (ATP), fotosíntesis y respiración.',
            questions: create10Questions([
              { q: 'Si se coloca una célula sanguínea en una solución hipertónica, la célula:', options: ['Absorbe agua y explota', 'Pierde agua por ósmosis y se arruga (crenación)', 'Sintetiza proteínas', 'No cambia'], correct: 1, explanation: 'En medio hipertónico, el agua sale de la célula por ósmosis.' },
              { q: 'El proceso metabólico de DEGRADACIÓN de moléculas complejas a simples liberando energía es:', options: ['Anabolismo', 'Catabolismo', 'Fotosíntesis', 'Quimiosíntesis'], correct: 1, explanation: 'El catabolismo degrada moléculas y libera energía (ATP).' },
              { q: 'El transporte de sustancias en contra del gradiente de concentración requiere:', options: ['Transporte activo con gasto de ATP', 'Ósmosis pasiva', 'Difusión facilitada gratuita', 'Filtración simple'], correct: 0, explanation: 'El transporte activo consume energía (ATP).' },
              { q: 'Reactivos principales requeridos para iniciar el proceso de la fotosíntesis:', options: ['Luz solar, CO2 y H2O', 'Glucosa y O2', 'ATP y Nitrógeno', 'Metano y Calor'], correct: 0, explanation: 'La fotosíntesis usa CO2, agua y energía lumínica.' },
              { q: 'La glucólisis ocurre en la siguiente estructura celular:', options: ['Citoplasma (Citosol)', 'Matriz mitocondrial', 'Cresta mitocondrial', 'Núcleo'], correct: 0, explanation: 'La glucólisis es anaeróbica y ocurre en el citosol.' }
            ], 'Biología', 'Metabolismo Celular')
          },
          {
            id: 'celula_division',
            name: 'División Celular: Mitosis y Meiosis',
            keyTopic: true,
            desc: 'Procesos de duplicación somática (mitosis) y generación de gametos haploides (meiosis).',
            questions: create10Questions([
              { q: 'La Meiosis es fundamental para la reproducción sexual porque:', options: ['Genera células idénticas', 'Reduce a la mitad los cromosomas (haploide) y genera variabilidad', 'Produce 4 células diploides', 'Impide mutaciones'], correct: 1, explanation: 'La meiosis produce 4 gametos haploides únicos.' },
              { q: 'Fase de la mitosis donde los cromosomas se alinean en el ecuador de la célula:', options: ['Profase', 'Metafase', 'Anafase', 'Telofase'], correct: 1, explanation: 'En la Metafase los cromosomas se ubican en el plano ecuatorial.' },
              { q: 'Células del cuerpo humano que se dividen por Mitosis:', options: ['Somáticas (piel, hígado, hueso)', 'Gametos (óvulos y espermatozoides)', 'Bacterias', 'Ninguna'], correct: 0, explanation: 'Las células somáticas se multiplican por mitosis.' },
              { q: 'Número de cromosomas en una célula somática humana normal:', options: ['46 cromosomas (23 pares)', '23 cromosomas', '92 cromosomas', '12 cromosomas'], correct: 0, explanation: 'Es diploide (2n = 46 cromosomas).' },
              { q: 'El entrecruzamiento (crossing-over) ocurre durante la:', options: ['Profase I de la Meiosis', 'Metafase de la Mitosis', 'Telofase II', 'Interfase G1'], correct: 0, explanation: 'El crossing-over ocurre en la Profase I recombinando genes.' }
            ], 'Biología', 'División Celular')
          }
        ]
      },
      {
        id: 'la_herencia',
        title: 'EJE 2: Herencia y Genética',
        icon: '🧬',
        topics: [
          {
            id: 'herencia_mendel',
            name: 'Leyes de Mendel y Cuadros de Punnett',
            keyTopic: true,
            desc: 'Conceptos de alelos, genotipo, fenotipo, homocigoto, heterocigoto y cruzamientos mendelianos.',
            questions: create10Questions([
              { q: 'Al cruzar dos plantas heterocigotas (Aa), la proporción fenotípica esperada es:', options: ['100% Dominantes', '3 Dominantes : 1 Recesivo (75% vs 25%)', '50% vs 50%', '100% Recesivos'], correct: 1, explanation: 'En cruce Aa x Aa, la proporción es 3:1.' },
              { q: 'Si un individuo posee los dos alelos iguales para un gen (AA o aa), se denomina:', options: ['Heterocigoto', 'Homocigoto', 'Híbrido', 'Cromosoma'], correct: 1, explanation: 'Homocigoto posee alelos idénticos.' },
              { q: 'El conjunto total de genes manifestado físicamente en las características observadas es el:', options: ['Genotipo', 'Fenotipo', 'Cariotipo', 'Genoma'], correct: 1, explanation: 'El fenotipo es la expresión física del genotipo.' },
              { q: 'Probabilidad de obtener un descendiente homocigoto recesivo (aa) del cruce Aa x aa:', options: ['50%', '25%', '75%', '0%'], correct: 0, explanation: 'Genotipos resultantes: 50% Aa y 50% aa.' },
              { q: 'La Primera Ley de Mendel se conoce como la Ley de:', options: ['Segregación de alelos', 'Distribución independiente', 'Dominancia incompleta', 'Ligamiento'], correct: 0, explanation: 'Establece la separación o segregación equitativa de alelos en la formación de gametos.' }
            ], 'Biología', 'Leyes de Mendel')
          },
          {
            id: 'herencia_no_mendeliana_evolucion',
            name: 'Codominancia, Selección Natural y Evolución',
            keyTopic: true,
            desc: 'Herencia ligada al sexo, mutaciones, deriva genética y mecanismos darwinianos de selección natural.',
            questions: create10Questions([
              { q: 'Según la teoría de Selección Natural de Darwin:', options: ['Los individuos mutan a voluntad', 'Individuos con variaciones favorables sobreviven más y se reproducen', 'Especies no cambian', 'Mutaciones son siempre destructivas'], correct: 1, explanation: 'Los rasgos ventajosos heredables aumentan en la población.' },
              { q: 'La hemofilia y el daltonismo son trastornos genéticos con tipo de herencia:', options: ['Ligada al cromosoma X', 'Ligada al cromosoma Y', 'Autosómica dominante', 'Mitocondrial pura'], correct: 0, explanation: 'Se transmiten recesivamente en el cromosoma X.' },
              { q: 'Un ejemplo clásico de codominancia fenotípica es:', options: ['Grupos sanguíneos ABO (Alelos A y B expresados juntos)', 'Ojos azules', 'Estatura alta', 'Albinismo'], correct: 0, explanation: 'En el grupo AB, ambos antígenos A y B se expresan plenamente.' },
              { q: 'Cambios al azar en la secuencia de nucleótidos del ADN se denominan:', options: ['Mutaciones', 'Transcripciones', 'Traducciones', 'Condensaciones'], correct: 0, explanation: 'Las mutaciones generan variabilidad genética primaria.' },
              { q: 'La formación de nuevas especies a partir de un ancestro común se conoce como:', options: ['Especiación', 'Deriva', 'Extinción', 'Fosilización'], correct: 0, explanation: 'La especiación surge por aislamiento reproductivo o geográfico.' }
            ], 'Biología', 'Evolución y Selección Natural')
          }
        ]
      },
      {
        id: 'seres_vivos',
        title: 'EJE 3: Seres Vivos y Fisiología Organísmica',
        icon: '🌿',
        topics: [
          {
            id: 'seres_vivos_sistemas_cuerpo',
            name: 'Sistemas del Cuerpo Humano (Digestivo, Circulatorio, Respiratorio, Inmune)',
            keyTopic: true,
            desc: 'Funcionamiento coordinado de los sistemas digestivo, respiratorio, cardiovascular y de defensa.',
            questions: create10Questions([
              { q: '¿En qué estructura del sistema respiratorio ocurre el intercambio gaseoso?', options: ['Traquea', 'Bronquios', 'Alvéolos pulmonares', 'Laringe'], correct: 2, explanation: 'En los alvéolos el O2 pasa a los capilares y se elimina CO2.' },
              { q: 'Órgano principal del sistema circulatorio que bombea sangre oxigenada al cuerpo:', options: ['Corazón', 'Hígado', 'Rinón', 'Bazo'], correct: 0, explanation: 'El corazón impulsa la sangre por la circulación sistémica.' },
              { q: 'Vasos sanguíneos que llevan sangre desoxigenada de regreso al corazón:', options: ['Arterias', 'Venas', 'Capilares', 'Linfáticos'], correct: 1, explanation: 'Las venas retornan la sangre desoxigenada al corazón.' },
              { q: 'Células del sistema inmune especializadas en la producción de anticuerpos específicos:', options: ['Linfocitos B', 'Plaquetas', 'Glóbulos rojos', 'Neuronas'], correct: 0, explanation: 'Los linfocitos B producen inmunoglobulinas/anticuerpos.' },
              { q: 'La absorción principal de nutrientes en el sistema digestivo ocurre en:', options: ['Intestino delgado (Duodeno/Yeyuno)', 'Estómago', 'Boca', 'Intestino grueso'], correct: 0, explanation: 'Las microvellosidades del intestino delgado absorben nutrientes.' }
            ], 'Biología', 'Sistemas del Cuerpo Humano')
          }
        ]
      },
      {
        id: 'ecosistemas',
        title: 'EJE 4: Ecosistemas e Interacciones Ecológicas',
        icon: '🌍',
        topics: [
          {
            id: 'ecosistemas_relaciones_ciclos',
            name: 'Interacciones Biológicas, Redes Tróficas y Ciclos Biogeoquímicos',
            keyTopic: true,
            desc: 'Simbiosis (mutualismo, comensalismo, parasitismo), flujo de energía y ciclos de C, N, P y H2O.',
            questions: create10Questions([
              { q: 'La relación simbiótica en la que una especie se beneficia y la otra se perjudica es:', options: ['Mutualismo', 'Comensalismo', 'Parasitismo', 'Amensalismo'], correct: 2, explanation: 'El parasitismo (+/-) perjudica al hospedero.' },
              { q: 'En una red trófica, la mayor cantidad de energía disponible está en los:', options: ['Consumidores primarios', 'Productores primarios (plantas/algas)', 'Consumidores terciarios', 'Descomponedores'], correct: 1, explanation: 'Los productores capturan la energía solar directa.' },
              { q: 'La relación donde ambas especies obtienen beneficios mutuos (+/+) es:', options: ['Mutualismo', 'Depredación', 'Competencia', 'Parasitismo'], correct: 0, explanation: 'En el mutualismo ambos organismos se benefician.' },
              { q: 'Proceso del ciclo del nitrógeno donde bacterias convierten N2 atmosférico en amonio:', options: ['Fijación del nitrógeno', 'Desnitrificación', 'Lixiviación', 'Evaporación'], correct: 0, explanation: 'Bacterias fijadoras como Rhizobium convierten N2 en nitratos/amonio.' },
              { q: 'Organismos encargados de reciclar la materia orgánica muerta en inorgánica:', options: ['Descomponedores (Hongos y Bacterias)', 'Depredadores tope', 'Herbívoros', 'Carnívoros'], correct: 0, explanation: 'Los descomponedores reincorporan nutrientes al suelo.' }
            ], 'Biología', 'Ecosistemas y Redes Tróficas')
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 3. QUÍMICA
  // -------------------------------------------------------------
  quimica: {
    id: 'quimica',
    name: 'Química',
    badge: 'Ciencias Naturales',
    description: 'Temario estructurado ICFES: La Materia, El Átomo, Funciones Químicas, Reacciones y Soluciones.',
    color: '#D9531E',
    bgLight: 'rgba(217, 83, 30, 0.08)',
    parts: [
      {
        id: 'la_materia',
        title: 'PARTE 1: La Materia y Métodos de Separación',
        icon: '🧪',
        topics: [
          {
            id: 'materia_clasificacion_separacion',
            name: 'Clasificación de la Materia y Métodos de Separación',
            keyTopic: true,
            desc: 'Sustancias puras vs Mezclas (Homogéneas/Heterogéneas), Filtración, Destilación, Evaporación.',
            questions: create10Questions([
              { q: 'Para separar agua y alcohol basándose en sus diferentes puntos de ebullición, el método adecuado es:', options: ['Filtración', 'Destilación', 'Decantación', 'Centrifugación'], correct: 1, explanation: 'La destilación separa líquidos miscibles por diferencia de punto de ebullición.' },
              { q: 'La densidad de una sustancia se define matemáticamente como:', options: ['Masa * Volumen', 'Masa / Volumen', 'Volumen / Masa', 'Peso * Gravedad'], correct: 1, explanation: 'Fórmula fundamental: d = m / V.' },
              { q: 'Una mezcla heterogénea formada por un sólido insoluble en un líquido se separa con:', options: ['Filtración', 'Destilación', 'Cromatografía', 'Sublimación'], correct: 0, explanation: 'La filtración retiene el sólido en el papel filtro.' },
              { q: 'El cambio directo de estado SÓLIDO a GASEOSO sin pasar por líquido es:', options: ['Evaporación', 'Sublimación', 'Condensación', 'Fusión'], correct: 1, explanation: 'La sublimación es el paso directo de sólido a gas.' },
              { q: 'Un elemento químico es una sustancia pura que:', options: ['No se puede descomponer en otras más sencillas por medios químicos', 'Es la unión de dos solventes', 'Tiene temperatura variable', 'Es siempre un gas'], correct: 0, explanation: 'Los elementos formados por un solo tipo de átomo no se dividen por reacciones ordinarias.' }
            ], 'Química', 'La Materia y Separación')
          }
        ]
      },
      {
        id: 'el_atomo',
        title: 'PARTE 2: El Átomo y la Tabla Periódica',
        icon: '⚛️',
        topics: [
          {
            id: 'atomo_tabla_periodica_enlaces',
            name: 'Configuración Electrónica, Tabla Periódica y Enlaces Químicos',
            keyTopic: true,
            desc: 'Protones, neutrones, electrones, electronegatividad, enlaces iónicos, covalentes y metálicos.',
            questions: create10Questions([
              { q: 'Un enlace caracterizado por la TRANSFERENCIA completa de electrones entre metal y no metal es:', options: ['Covalente polar', 'Covalente apolar', 'Iónico', 'Metálico'], correct: 2, explanation: 'El enlace iónico ocurre por transferencia de electrones.' },
              { q: 'En el núcleo del átomo se encuentran las siguientes partículas:', options: ['Protones y Neutrones', 'Electrones y Protones', 'Solo Electrones', 'Fotones'], correct: 0, explanation: 'El núcleo atómico concentra protones (+ ) y neutrones (neutros).' },
              { q: 'El número atómico (Z) representa la cantidad de:', options: ['Protones en el núcleo', 'Neutrones', 'Electrones de valencia', 'Niveles de energía'], correct: 0, explanation: 'Z es el número de protones característico del elemento.' },
              { q: 'Los elementos en la misma COLUMNA o Grupo de la Tabla Periódica comparten:', options: ['Igual número de electrones de valencia y propiedades químicas parecidas', 'La misma masa atómica', 'El mismo punto de fusión', 'Igual número de neutrones'], correct: 0, explanation: 'Los grupos comparten configuración electrónica externa.' },
              { q: 'Un enlace covalente se forma cuando dos átomos no metálicos:', options: ['Comparten pares de electrones', 'Se repelen', 'Transfieren protones', 'Se destruyen'], correct: 0, explanation: 'En el enlace covalente se comparten electrones de valencia.' }
            ], 'Química', 'El Átomo y Tabla Periódica')
          }
        ]
      },
      {
        id: 'funciones_quimicas',
        title: 'PARTE 3: Funciones Químicas y Escala de pH',
        icon: '⚗️',
        topics: [
          {
            id: 'funciones_ph_acidez',
            name: 'Escala de pH (Ácidos, Neutros y Básicos) y Funciones Orgánicas',
            keyTopic: true,
            desc: 'Medición de acidez/alcalinidad (pH 0 a 14), neutralización e identificación de grupos funcionales.',
            questions: create10Questions([
              { q: 'Una solución con un pH medido de 2.5 clasifica como:', options: ['Altamente Básica', 'Neutra', 'Fuertemente Ácida', 'Ligeramente alcalina'], correct: 2, explanation: 'pH menor a 7 indica acidez.' },
              { q: 'El pH del agua pura neutra a 25°C es exactamente:', options: ['0', '7', '14', '10'], correct: 1, explanation: 'pH 7 representa neutralidad pura.' },
              { q: 'Una reacción entre un ácido y una base produce:', options: ['Sal y Agua', 'Gas Metano', 'Oxígeno puro', 'Carbón'], correct: 0, explanation: 'Neutralización: Ácido + Base ➔ Sal + Agua.' },
              { q: 'Grupo funcional característico de los Alcoholes orgánicos:', options: ['-OH (Hidroxilo)', '-COOH (Carboxilo)', '-NH2 (Amino)', '-CHO (Aldehído)'], correct: 0, explanation: 'Los alcoholes contienen el grupo hidroxilo (-OH).' },
              { q: 'Si la concentración de iones [H+] aumenta en una solución, el pH:', options: ['Disminuye (se vuelve más ácido)', 'Aumenta a 14', 'Se mantiene en 7', 'Llega a cero absoluto'], correct: 0, explanation: 'A mayor [H+], menor es el valor del pH.' }
            ], 'Química', 'pH y Funciones Químicas')
          }
        ]
      },
      {
        id: 'reacciones_estequiometria',
        title: 'PARTE 4: Reacciones Químicas y Estequiometría',
        icon: '🔥',
        topics: [
          {
            id: 'reacciones_balanceo_reactivo_limite',
            name: 'Balanceo, Reacciones Endotérmicas/Exotérmicas y Reactivo Límite',
            keyTopic: true,
            desc: 'Conservación de la masa (Lavoisier), cálculos estequiométricos de moles, reactivo límite y en exceso.',
            questions: create10Questions([
              { q: 'Una reacción química que LIBERA calor hacia el entorno se clasifica como:', options: ['Endotérmica', 'Exotérmica', 'Isotérmica', 'Catalítica'], correct: 1, explanation: 'Las reacciones exotérmicas desprenden energía térmica.' },
              { q: 'La Ley de Conservación de la Masa establece que en una reacción química:', options: ['La masa total de reactivos es igual a la masa total de productos', 'La masa se destruye', 'Se crean nuevos protones', 'La masa aumenta al doble'], correct: 0, explanation: 'La materia no se crea ni se destruye, solo se transforma.' },
              { q: 'El reactivo que se consume PRIMERO por completo en una reacción química limitando la cantidad de producto es el:', options: ['Reactivo Límite', 'Reactivo en exceso', 'Catalizador', 'Solvente'], correct: 0, explanation: 'El reactivo límite determina el rendimiento máximo.' },
              { q: 'Una sustancia que acelera una reacción química sin consumirse en el proceso es un:', options: ['Catalizador', 'Inhibidor', 'Soluto', 'Producto'], correct: 0, explanation: 'Los catalizadores bajan la energía de activación.' },
              { q: 'Una reacción endotérmica se distingue porque:', options: ['Absorbe calor del entorno (ΔH > 0)', 'Emite luz brillante', 'Es instantánea', 'Produce hielo'], correct: 0, explanation: 'Endotérmica absorbe calor del entorno.' }
            ], 'Química', 'Estequiometría y Reacciones')
          }
        ]
      },
      {
        id: 'gases_soluciones',
        title: 'PARTE 5: Gases y Soluciones',
        icon: '🎈',
        topics: [
          {
            id: 'gases_ley_soluciones_concentracion',
            name: 'Ley de Gases Ideales y Solubilidad (Saturada, Insaturada, Sobresaturada)',
            keyTopic: true,
            desc: 'Relación P*V = n*R*T, curvas de solubilidad en función de la temperatura y molaridad.',
            questions: create10Questions([
              { q: 'Según la Ley de Boyle (T constante), si el volumen de un gas se reduce a la mitad, su presión:', options: ['Se reduce a la mitad', 'Se duplica', 'Permanece constante', 'Cae a cero'], correct: 1, explanation: 'Presión y volumen son inversamente proporcionales.' },
              { q: 'Una solución que contiene la MÁXIMA cantidad de soluto disuelto a una temperatura dada es:', options: ['Saturada', 'Insaturada', 'Sobresaturada', 'Diluida'], correct: 0, explanation: 'La solución saturada está en equilibrio de solubilidad.' },
              { q: 'Sustancia que se disuelve en mayor cantidad en un medio homogéneo:', options: ['Solvente', 'Soluto', 'Precipitante', 'Fase dispersa'], correct: 0, explanation: 'El solvente disuelve al soluto.' },
              { q: 'La Molaridad (M) de una solución se expresa como:', options: ['Moles de soluto / Litros de solución', 'Gramos de soluto / Gramos de solvente', 'Litros de gas / Presión', 'Porcentaje de agua'], correct: 0, explanation: 'Molaridad M = moles soluto / Litros solución.' },
              { q: 'Al aumentar la temperatura de un líquido, la solubilidad de la mayoría de los GASES en él:', options: ['Disminuye (el gas se escapa)', 'Aumenta al doble', 'No cambia', 'Se congela'], correct: 0, explanation: 'Los gases se disuelven menos a mayor temperatura en líquidos.' }
            ], 'Química', 'Gases y Soluciones')
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 4. SOCIALES Y CDNAS
  // -------------------------------------------------------------
  sociales: {
    id: 'sociales',
    name: 'Sociales y CDNAS',
    badge: 'Competencias Ciudadanas',
    description: 'Constitución Política, Historia de Colombia, Historia Universal, Economía y Ciudadanía.',
    color: '#D9531E',
    bgLight: 'rgba(217, 83, 30, 0.08)',
    parts: [
      {
        id: 'constitucion_politica',
        title: 'EJE 1: Constitución Política y Estructura del Estado',
        icon: '📜',
        topics: [
          {
            id: 'constitucion_derechos_mecanismos',
            name: 'Derechos Fundamentales y Mecanismos de Protección (Tutela, Petición)',
            keyTopic: true,
            desc: 'Estado Social de Derecho, Acción de Tutela, Acción Popular y Mecanismos de Participación.',
            questions: create10Questions([
              { q: 'La Acción de Tutela consagrada en la Constitución de 1991 fue diseñada para:', options: ['Pedir dinero al Estado', 'Proteger de forma inmediata los derechos fundamentales amenazados o vulnerados', 'Suspender a un alcalde', 'Modificar leyes'], correct: 1, explanation: 'La tutela ampara derechos fundamentales inmediatamente.' },
              { q: '¿Cuáles son las tres ramas del poder público en Colombia?', options: ['Ejecutiva, Legislativa y Judicial', 'Militar, Civil y Religiosa', 'Presidente, Gobernador y Alcalde', 'Corte, Fiscalía y Procuraduría'], correct: 0, explanation: 'Ramas tradicionales: Ejecutiva, Legislativa y Judicial.' },
              { q: 'Mecanismo de participación ciudadana para votar a favor o en sentido contrario sobre una propuesta del Presidente:', options: ['Plebiscito', 'Tutela', 'Habeas Corpus', 'Derecho de Petición'], correct: 0, explanation: 'El Plebiscito es convocado por el Presidente para consultar políticas.' },
              { q: 'El órgano máximo encargado de proteger la supremacía de la Constitución en Colombia es:', options: ['La Corte Constitucional', 'El Congreso', 'El Presidente', 'La Policía Nacional'], correct: 0, explanation: 'La Corte Constitucional vela por la Carta Magna.' },
              { q: 'El derecho fundamental a solicitar información respetuosa a autoridades públicas se llama:', options: ['Derecho de Petición', 'Acción Popular', 'Habeas Data', 'Consulta Previa'], correct: 0, explanation: 'El Derecho de Petición (Art. 23) exige respuesta respetuosa.' }
            ], 'Sociales', 'Constitución Política')
          }
        ]
      },
      {
        id: 'historia_colombia',
        title: 'EJE 2: Historia de Colombia',
        icon: '🇨🇴',
        topics: [
          {
            id: 'historia_colombia_violencia_conflicto',
            name: 'Independencia, La Violencia Bipartidista y Conflicto Armado',
            keyTopic: true,
            desc: 'El Bogotazo (1948), Frente Nacional (1958), masacres del siglo XX y dinámicas del conflicto interno.',
            questions: create10Questions([
              { q: 'El evento conocido como "El Bogotazo" el 9 de abril de 1948 ocurrió tras el magnicidio de:', options: ['Rafael Uribe Uribe', 'Jorge Eliécer Gaitán', 'Luis Carlos Galán', 'Álvaro Gómez Hurtado'], correct: 1, explanation: 'El asesinato de Gaitán desató la insurrección del Bogotazo.' },
              { q: 'El acuerdo político firmado en 1957 para alternar el poder entre Liberales y Conservadores se denominó:', options: ['Frente Nacional', 'Patria Boba', 'Pacto de Benidorm', 'Constituyente de 1991'], correct: 0, explanation: 'El Frente Nacional duró 16 años alternando la presidencia.' },
              { q: 'La Masacre de las Bananeras ocurrida en 1928 en Ciénaga (Magdalena) involucró a la empresa:', options: ['United Fruit Company', 'Standard Oil', 'Ecopetrol', 'Federación de Cafeteros'], correct: 0, explanation: 'Trabajadores en huelga fueron reprimidos en favor de la United Fruit.' },
              { q: 'Guerra civil colombiana librada entre 1899 y 1902 que precipitó la separación de Panamá:', options: ['Guerra de los Mil Días', 'Patria Boba', 'Guerra Suprema', 'Conflicto del Leticia'], correct: 0, explanation: 'La Guerra de los Mil Días devastó la economía e infraestructura del país.' },
              { q: 'El proceso de independencia de Colombia se consolidó en la batalla del:', options: ['Puente de Boyacá (1819)', 'Bogotazo', 'Paso de los Andes', 'Batalla de Pichincha'], correct: 0, explanation: 'El 7 de agosto de 1819 en el Puente de Boyacá se selló el triunfo patriota.' }
            ], 'Sociales', 'Historia de Colombia')
          }
        ]
      },
      {
        id: 'competencias_ciudadanas',
        title: 'EJE 3: Competencias Ciudadanas y Análisis de Conflictos',
        icon: '🤝',
        topics: [
          {
            id: 'ciudadanas_multiperspectivismo',
            name: 'Multiperspectivismo, Prejuicios y Choque de Derechos',
            keyTopic: true,
            desc: 'Distinción entre juicios de valor y hechos, intereses de los actores y superación de la discriminación.',
            questions: create10Questions([
              { q: 'Un enunciado expresa un JUICIO DE VALOR cuando:', options: ['Menciona un dato estadístico comprobable', 'Contiene una apreciación subjetiva u opinión moral sobre lo que está bien o mal', 'Cita un artículo de la ley', 'Describe la fecha exacta de un evento'], correct: 1, explanation: 'Un juicio de valor involucra opiniones subjetivas o éticas.' },
              { q: 'Analizar un conflicto desde el MULTIPERSPECTIVISMO implica:', options: ['Ignorar a una de las partes', 'Comprender los diferentes puntos de vista, necesidades e intereses de todos los actores', 'Aceptar solo la versión oficial', 'Tomar partido por violencia'], correct: 1, explanation: 'El multiperspectivismo analiza las versiones de todos los involucrados.' },
              { q: 'Una actitud o idea preconcebida sin fundamento sobre un grupo social se llama:', options: ['Prejuicio', 'Argumento lógico', 'Juicio de hecho', 'Ley orgánica'], correct: 0, explanation: 'El prejuicio es un juicio u opinión formada sin experiencia o conocimiento.' },
              { q: 'Frente a un choque entre el derecho al trabajo y el derecho a la salud en pandemia, la Corte evalúa:', options: ['El principio de proporcionalidad y ponderación de derechos', 'Favorecer siempre al más rico', 'Ignorar ambos derechos', 'Cerrar juzgados'], correct: 0, explanation: 'Se aplica la ponderación constitucional para minimizar el impacto.' },
              { q: 'Discurso que busca justificar agresiones hacia una minoría basándose en estereotipos:', options: ['Discurso de odio que legitima la violencia', 'Mecanismo de diálogo', 'Consulta popular', 'Voto informado'], correct: 0, explanation: 'Legitima agresiones y atenta contra la convivencia democrática.' }
            ], 'Sociales', 'Competencias Ciudadanas')
          }
        ]
      },
      {
        id: 'historia_universal_economia',
        title: 'EJE 4: Historia Universal y Economía',
        icon: '🏛️',
        topics: [
          {
            id: 'historia_mundial_guerras_sistemas_economicos',
            name: 'Guerras Mundiales, Guerra Fría y Sistemas Económicos (Capitalismo vs Socialismo)',
            keyTopic: true,
            desc: 'Primera y Segunda Guerra Mundial, Revolución Industrial, oferta/demanda y sistemas de gobierno.',
            questions: create10Questions([
              { q: 'Durante la Guerra Fría (1947-1991), el enfrentamiento geopolítico ocurrió entre:', options: ['Alemania y Francia', 'EEUU (Capitalismo) y la URSS (Comunismo)', 'China y Japón', 'Reino Unido y España'], correct: 1, explanation: 'Enfrentamiento entre el bloque bipolar capitalista y socialista.' },
              { q: 'La Revolución Industrial iniciada en Inglaterra en el siglo XVIII se caracterizó por:', options: ['Mecanización de la producción con la máquina de vapor y auge de fábricas', 'Retorno al feudalismo agrícola', 'Abolición total del comercio', 'Invención del teléfono celular'], correct: 0, explanation: 'Transformó la producción artesanal en industrial masiva.' },
              { q: 'Sistema económico basado en la propiedad privada de medios de producción y libre mercado:', options: ['Capitalismo', 'Feudalismo', 'Comunismo de estado', 'Mercantilismo antiguo'], correct: 0, explanation: 'El capitalismo promueve la propiedad privada y oferta/demanda.' },
              { q: 'La Revolución Francesa de 1789 promovió los principios de:', options: ['Libertad, Igualdad y Fraternidad', 'Monarquía absoluta eterna', 'Esclavitud masiva', 'Teocracia estricta'], correct: 0, explanation: 'Su lema emblemático fue Liberté, Égalité, Fraternité.' },
              { q: 'Fenómeno económico caracterizado por el aumento generalizado y sostenido de los precios:', options: ['Inflación', 'Deflación', 'Superávit', 'Inversión extranjera'], correct: 0, explanation: 'La inflación reduce el poder adquisitivo del dinero.' }
            ], 'Sociales', 'Historia Universal y Economía')
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 5. MATEMÁTICAS
  // -------------------------------------------------------------
  matematicas: {
    id: 'matematicas',
    name: 'Matemáticas',
    badge: 'Razonamiento Cuantitativo',
    description: 'Álgebra, Geometría, Estadística, Probabilidad y Cálculo aplicativo.',
    color: '#D9531E',
    bgLight: 'rgba(217, 83, 30, 0.08)',
    parts: [
      {
        id: 'razonamiento_cuantitativo',
        title: 'EJE 1: Razonamiento Cuantitativo y Aritmética',
        icon: '🔢',
        topics: [
          {
            id: 'mat_porcentajes_regla_tres',
            name: 'Porcentajes, Proporcionalidad y Regla de Tres',
            keyTopic: true,
            desc: 'Cálculo de aumentos, descuentos sucesivos, conversiones y tasas de cambio.',
            questions: create10Questions([
              { q: 'Si 6 obreros construyen un muro en 12 horas, ¿cuántas horas tardarán 9 obreros?', options: ['18 horas', '8 horas', '9 horas', '6 horas'], correct: 1, explanation: 'Regla de tres inversa: (6 * 12) / 9 = 8 horas.' },
              { q: 'El 15% de un producto de $80.000 es:', options: ['$12.000', '$8.000', '$15.000', '$10.000'], correct: 0, explanation: '80.000 * 0.15 = 12.000.' },
              { q: 'Si una camisa cuesta $50.000 y tiene 20% de descuento, el precio a pagar es:', options: ['$40.000', '$45.000', '$30.000', '$35.000'], correct: 0, explanation: 'Descuento $10.000 ➔ 50.000 - 10.000 = $40.000.' },
              { q: 'Un auto recorre 240 km con 4 galones de gasolina. ¿Cuántos km recorrerá con 7 galones?', options: ['420 km', '350 km', '480 km', '300 km'], correct: 0, explanation: 'Rendimiento: 240/4 = 60 km/galón. 60 * 7 = 420 km.' },
              { q: 'En una bolsa hay 3 bolas rojas y 7 bolas azules. ¿Cuál es la probabilidad de sacar una bola roja?', options: ['30% (3/10)', '70% (7/10)', '50%', '10%'], correct: 0, explanation: '3 casos favorables / 10 totales = 3/10 = 30%.' }
            ], 'Matemáticas', 'Porcentajes y Proporcionalidad')
          }
        ]
      },
      {
        id: 'geometria_estadistica',
        title: 'EJE 2: Geometría y Estadística',
        icon: '📐',
        topics: [
          {
            id: 'mat_geometria_teoremas',
            name: 'Teorema de Pitágoras, Áreas y Probabilidad',
            keyTopic: true,
            desc: 'Triángulos rectángulos, cálculo de perímetros, volúmenes y media/mediana/moda.',
            questions: create10Questions([
              { q: 'Un rectángulo tiene base 8 cm y altura 6 cm. ¿Cuánto mide su diagonal?', options: ['14 cm', '10 cm', '12 cm', '48 cm'], correct: 1, explanation: 'd^2 = 8^2 + 6^2 = 64 + 36 = 100 ➔ d = 10 cm.' },
              { q: 'El área de un triángulo con base 10 cm y altura 5 cm es:', options: ['25 cm²', '50 cm²', '15 cm²', '20 cm²'], correct: 0, explanation: 'Área = (base * altura) / 2 = (10 * 5) / 2 = 25 cm².' },
              { q: 'La media aritmética (promedio) de las notas 3.0, 4.0 y 5.0 es:', options: ['4.0', '3.5', '4.5', '3.0'], correct: 0, explanation: '(3 + 4 + 5) / 3 = 12 / 3 = 4.0.' },
              { q: 'En la serie de datos [2, 3, 5, 5, 7, 8, 9], la MODA es:', options: ['5', '3', '7', '9'], correct: 0, explanation: 'La moda es el dato que más se repite (5).' },
              { q: 'El volumen de un cubo de lado 3 cm es:', options: ['27 cm³', '9 cm³', '18 cm³', '81 cm³'], correct: 0, explanation: 'Volumen = lado³ = 3 * 3 * 3 = 27 cm³.' }
            ], 'Matemáticas', 'Geometría y Estadística')
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 6. LECTURA CRÍTICA
  // -------------------------------------------------------------
  lectura_critica: {
    id: 'lectura_critica',
    name: 'Lectura Crítica',
    badge: 'Comprensión Lectora',
    description: 'Análisis textual, figuras literarias, falacias argumentativas e interpretación.',
    color: '#D9531E',
    bgLight: 'rgba(217, 83, 30, 0.08)',
    parts: [
      {
        id: 'comprension_argumentativa',
        title: 'EJE 1: Tipos de Texto y Argumentación',
        icon: '📖',
        topics: [
          {
            id: 'lectura_falacias_retorica',
            name: 'Identificación de Premisas, Falacias y Figuras Retóricas',
            keyTopic: true,
            desc: 'Reconocimiento de intenciones, validez de argumentos y recursos estilísticos.',
            questions: create10Questions([
              { q: 'Si un argumento ataca las características personales del interlocutor en lugar de sus razones, se comete la falacia:', options: ['Ad Hominem', 'Hombre de Paja', 'Ad Populum', 'Falso Dilema'], correct: 0, explanation: 'Ad Hominem descalifica al emisor en lugar de refutar su argumento.' },
              { q: 'En la frase "Tus ojos son dos luceros que iluminan mi noche", la figura retórica es:', options: ['Metáfora', 'Símil', 'Hipérbole', 'Onomatopeya'], correct: 0, explanation: 'Es una metáfora directa que identifica los ojos con luceros.' },
              { q: 'La premisa principal de un ensayo argumentativo es la:', options: ['Tesis', 'Conclusión secundaria', 'Bibliografía', 'Anécdota introductoria'], correct: 0, explanation: 'La tesis es la postura o afirmación central que se defiende.' },
              { q: 'Una figura retórica basada en una exageración intencionada para enfatizar una idea es la:', options: ['Hipérbole', 'Metónima', 'Elipsis', 'Personificación'], correct: 0, explanation: 'La hipérbole es la exageración deliberada.' },
              { q: 'Un texto periodístico que analiza un hecho reciente con la firma de un periodista especializado es una:', options: ['Columna de opinión', 'Noticia informativa breve', 'Crónica histórica antigua', 'Poema épico'], correct: 0, explanation: 'La columna de opinión expresa la postura argumentada del autor.' }
            ], 'Lectura Crítica', 'Argumentación y Falacias')
          }
        ]
      }
    ]
  }
};
