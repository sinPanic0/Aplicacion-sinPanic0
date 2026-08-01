import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parsear el .env manualmente para no depender de dependencias externas
const envPath = path.resolve('.env');
const envLocalPath = path.resolve('.env.local');

let envFile = '';
if (fs.existsSync(envLocalPath)) {
  envFile = fs.readFileSync(envLocalPath, 'utf-8');
} else if (fs.existsSync(envPath)) {
  envFile = fs.readFileSync(envPath, 'utf-8');
}

const envVars = {};
envFile.split('\n').forEach(line => {
  const [key, ...values] = line.split('=');
  if (key && values.length > 0) {
    envVars[key.trim()] = values.join('=').trim().replace(/['"]/g, '');
  }
});

const supabaseUrl = envVars['VITE_SUPABASE_URL'];
const supabaseKey = envVars['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: No se encontraron VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el archivo .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Nuevas preguntas estilo ICFES 2024-2025 para agregar a la base de datos
const NEW_QUESTIONS = [
  // LECTURA CRITICA (subject_id = 1)
  { subject_id: 1, category: 'interpretacion', difficulty: 'high', q: 'Lee el siguiente microcuento: "Cuando despertó, el dinosaurio todavía estaba allí." (Monterroso). La interpretación más profunda sugiere que:', options: ['El narrador estaba soñando con el pasado.', 'El cuento habla sobre la prehistoria.', 'El "dinosaurio" representa un problema, un temor o un estado opresivo ineludible que sobrevive al paso del tiempo.', 'Es una descripción biológica.'], correct_index: 2, explanation: 'La brevedad permite múltiples interpretaciones, siendo la más aceptada que el dinosaurio simboliza algo persistente e inamovible.' },
  { subject_id: 1, category: 'literal', difficulty: 'medium', q: 'Según el texto: "La Revolución Industrial trajo consigo la urbanización masiva y la creación de la clase obrera". ¿Cuál fue una consecuencia directa mencionada?', options: ['La creación de la agricultura.', 'La urbanización masiva.', 'La caída del imperio romano.', 'El descubrimiento de América.'], correct_index: 1, explanation: 'Es una pregunta de nivel literal. Se extrae textualmente la información de la premisa.' },
  { subject_id: 1, category: 'general', difficulty: 'high', q: 'Un artículo científico concluye que "el calentamiento global es una realidad innegable; no obstante, algunos sectores empresariales financian estudios para minimizar su impacto mediático". La intención del autor es:', options: ['Apoyar a los sectores empresariales.', 'Informar neutralmente sobre el clima.', 'Denunciar la manipulación de la información por intereses económicos.', 'Negar el calentamiento global.'], correct_index: 2, explanation: 'El uso del conector "no obstante" y el verbo "minimizar" evidencian una postura crítica hacia la financiación de desinformación.' },
  { subject_id: 1, category: 'interpretacion', difficulty: 'high', q: 'El refrán "En casa de herrero, azadón de palo" da a entender que:', options: ['Los herreros son pobres.', 'Falta algo en un lugar donde debería sobrar o ser habitual.', 'La madera es mejor que el hierro.', 'Los herreros usan herramientas de madera.'], correct_index: 1, explanation: 'Es una paradoja donde la profesión no se aplica en el hogar.' },
  { subject_id: 1, category: 'general', difficulty: 'medium', q: 'En la oración: "A pesar de la fuerte lluvia, el evento se realizó con normalidad", ¿qué función cumple la frase inicial?', options: ['Conector de adición.', 'Conector de causalidad.', 'Conector concesivo, indica un obstáculo que no impide la acción.', 'Conector temporal.'], correct_index: 2, explanation: '"A pesar de" indica concesión: una dificultad que no evita el resultado final.' },
  
  // MATEMATICAS (subject_id = 2)
  { subject_id: 2, category: 'general', difficulty: 'high', q: 'Un cultivo de bacterias se duplica cada 4 horas. Si inicialmente hay 100 bacterias, ¿cuántas habrá después de 12 horas?', options: ['400', '800', '1200', '600'], correct_index: 1, explanation: 'A las 4h: 200. A las 8h: 400. A las 12h: 800. O mediante fórmula: 100 * 2^(12/4) = 100 * 2^3 = 800.' },
  { subject_id: 2, category: 'interpretacion', difficulty: 'medium', q: 'En una gráfica de pastel, si una porción representa el 25% del total, ¿cuál es el ángulo de dicho sector circular?', options: ['45°', '90°', '120°', '180°'], correct_index: 1, explanation: 'El círculo completo tiene 360°. El 25% de 360 es 90°.' },
  { subject_id: 2, category: 'literal', difficulty: 'low', q: '¿Cuál es el valor de x en la ecuación 3x - 5 = 16?', options: ['4', '5', '7', '21'], correct_index: 2, explanation: '3x = 16 + 5 -> 3x = 21 -> x = 7.' },
  { subject_id: 2, category: 'general', difficulty: 'high', q: 'Si la probabilidad de que llueva el sábado es 0.4 y la probabilidad de que llueva el domingo es 0.3, y ambos eventos son independientes, ¿cuál es la probabilidad de que llueva AMBOS días?', options: ['0.12', '0.7', '0.1', '0.012'], correct_index: 0, explanation: 'Eventos independientes se multiplican: 0.4 * 0.3 = 0.12.' },
  { subject_id: 2, category: 'interpretacion', difficulty: 'high', q: 'El área de un círculo A se cuadruplica. ¿Qué ocurrió con su radio?', options: ['Se duplicó.', 'Se cuadruplicó.', 'Se redujo a la mitad.', 'Aumentó en 4 unidades.'], correct_index: 0, explanation: 'El área es π*r^2. Para que el área se multiplique por 4, el radio debe multiplicarse por 2, ya que 2^2 = 4.' },

  // SOCIALES Y CIUDADANAS (subject_id = 3)
  { subject_id: 3, category: 'general', difficulty: 'medium', q: 'El mecanismo de participación ciudadana mediante el cual se le pregunta al pueblo sobre una decisión de trascendencia nacional, departamental o local es:', options: ['Acción de Tutela.', 'Plebiscito.', 'Consulta Popular.', 'Cabildo Abierto.'], correct_index: 2, explanation: 'La Consulta Popular es la pregunta formal al pueblo sobre un asunto de trascendencia para que se pronuncie.' },
  { subject_id: 3, category: 'interpretacion', difficulty: 'high', q: 'Una de las consecuencias de la Guerra Fría en América Latina fue:', options: ['El apoyo a dictaduras militares bajo la Doctrina de Seguridad Nacional para frenar el comunismo.', 'La completa desmilitarización del continente.', 'El cierre de fronteras con Europa.', 'El fin de la pobreza extrema.'], correct_index: 0, explanation: 'EE.UU. apoyó dictaduras de derecha en la región para evitar la expansión de la influencia soviética y cubana.' },
  { subject_id: 3, category: 'literal', difficulty: 'medium', q: '¿Cuál de los siguientes es considerado un mecanismo de protección de derechos humanos fundamentales en Colombia?', options: ['Habeas Corpus.', 'Acción de Tutela.', 'Ambas opciones A y B.', 'La demanda civil.'], correct_index: 2, explanation: 'Tanto el Habeas Corpus (libertad física) como la Acción de Tutela protegen derechos fundamentales.' },
  { subject_id: 3, category: 'general', difficulty: 'high', q: 'El fenómeno de la globalización económica se caracteriza principalmente por:', options: ['El cierre de las economías nacionales para proteger la industria local.', 'La libre circulación de mercancías, capitales e información a nivel mundial.', 'El control estatal absoluto de los medios de producción.', 'La prohibición de tratados de libre comercio.'], correct_index: 1, explanation: 'La globalización busca la interdependencia económica mundial reduciendo barreras comerciales.' },
  { subject_id: 3, category: 'interpretacion', difficulty: 'high', q: 'La segregación socioespacial en ciudades latinoamericanas ocurre cuando:', options: ['Diferentes clases sociales conviven en el mismo barrio.', 'La población es distribuida geográficamente según su nivel de ingresos, concentrando la riqueza y marginando la pobreza.', 'Las ciudades construyen más parques.', 'Todos usan transporte público.'], correct_index: 1, explanation: 'Es la separación física en el espacio urbano basada en desigualdades socioeconómicas.' },

  // CIENCIAS NATURALES (subject_id = 4)
  { subject_id: 4, category: 'literal', difficulty: 'medium', q: '¿Qué organelo celular es el responsable de la respiración celular y la producción de ATP?', options: ['El núcleo.', 'Los lisosomas.', 'La mitocondria.', 'El aparato de Golgi.'], correct_index: 2, explanation: 'La mitocondria es la "planta de energía" de la célula.' },
  { subject_id: 4, category: 'general', difficulty: 'high', q: 'Según la teoría evolutiva de Darwin, la selección natural opera principalmente sobre:', options: ['Las características adquiridas durante la vida.', 'Las variaciones genéticas heredables que otorgan ventaja reproductiva.', 'El deseo consciente de los animales por mejorar.', 'Las mutaciones inducidas por el clima frío.'], correct_index: 1, explanation: 'La selección natural actúa sobre la variación genética existente en una población que se hereda a la descendencia.' },
  { subject_id: 4, category: 'interpretacion', difficulty: 'high', q: 'Si la velocidad de una reacción química se duplica por cada 10°C de aumento, ¿por qué es peligroso para los humanos tener una fiebre superior a 41°C?', options: ['Porque el sudor se evapora demasiado rápido.', 'Porque las enzimas se desnaturalizan y pierden su función, colapsando el metabolismo.', 'Porque los glóbulos rojos se congelan.', 'Porque se produce demasiada energía.'], correct_index: 1, explanation: 'Las proteínas y enzimas humanas pierden su estructura tridimensional (desnaturalización) a altas temperaturas.' },
  { subject_id: 4, category: 'general', difficulty: 'medium', q: 'Un objeto se lanza hacia arriba. En su punto de altura máxima, su velocidad y aceleración son:', options: ['Velocidad cero, aceleración cero.', 'Velocidad cero, aceleración igual a la gravedad (9.8 m/s² hacia abajo).', 'Velocidad máxima, aceleración cero.', 'Ambas son máximas.'], correct_index: 1, explanation: 'El objeto se detiene un instante (V=0), pero la gravedad sigue actuando sobre él todo el tiempo.' },
  { subject_id: 4, category: 'interpretacion', difficulty: 'high', q: 'En una red trófica, si se elimina al depredador ápice (cima de la cadena), generalmente:', options: ['El ecosistema mejora inmediatamente.', 'Las poblaciones de herbívoros se disparan, lo que puede llevar al agotamiento de la vegetación.', 'Los descomponedores mueren.', 'No ocurre nada importante.'], correct_index: 1, explanation: 'Sin control, las presas se multiplican exponencialmente causando sobrepastoreo.' },

  // INGLÉS (subject_id = 5)
  { subject_id: 5, category: 'literal', difficulty: 'low', q: 'Which is the correct negative form of the present simple sentence "She likes coffee"?', options: ['She do not likes coffee.', 'She not likes coffee.', 'She doesn\'t like coffee.', 'She isn\'t like coffee.'], correct_index: 2, explanation: 'Third person singular negative requires "doesn\'t" and the verb in base form.' },
  { subject_id: 5, category: 'general', difficulty: 'medium', q: 'Choose the correct preposition: "I was born ___ the 15th of March."', options: ['in', 'at', 'on', 'by'], correct_index: 2, explanation: '"On" is used for specific days and dates.' },
  { subject_id: 5, category: 'interpretacion', difficulty: 'high', q: 'Reading context: "The movie was so predictable; I figured out the ending in the first ten minutes." The word "predictable" means:', options: ['Very scary.', 'Easy to foresee or guess what will happen.', 'Expensive to produce.', 'Too long.'], correct_index: 1, explanation: 'Predictable means capable of being predicted or anticipated.' },
  { subject_id: 5, category: 'general', difficulty: 'high', q: 'Complete the second conditional sentence: "If I ___ a million dollars, I ___ travel the world."', options: ['have / will', 'had / would', 'had / will', 'have / would'], correct_index: 1, explanation: 'Second conditional uses past tense in the if-clause and would + base verb in the result clause.' },
  { subject_id: 5, category: 'interpretacion', difficulty: 'high', q: 'Phrasal verb: "The manager decided to call off the meeting because of the storm." What does "call off" mean?', options: ['To postpone.', 'To cancel.', 'To start early.', 'To announce loudly.'], correct_index: 1, explanation: 'The phrasal verb "call off" means to cancel an event.' }
];

async function seed() {
  console.log('Iniciando la inserción de preguntas...');
  let count = 0;

  for (const q of NEW_QUESTIONS) {
    // Insertar si no existe ya una con la misma pregunta para no duplicar
    const { data: existing, error: errCheck } = await supabase
      .from('questions_bank')
      .select('id')
      .eq('question_text', q.q)
      .maybeSingle();

    if (!existing) {
      const { error } = await supabase.from('questions_bank').insert([
        {
          subject_id: q.subject_id,
          category: q.category,
          difficulty: q.difficulty,
          question_text: q.q,
          options: q.options,
          correct_index: q.correct_index,
          explanation: q.explanation
        }
      ]);
      if (error) {
        console.error(`Error insertando la pregunta: "${q.q}":`, error.message);
      } else {
        count++;
        console.log(`+ Insertada: ${q.q.substring(0, 30)}...`);
      }
    } else {
      console.log(`- Saltada (Ya existe): ${q.q.substring(0, 30)}...`);
    }
  }

  console.log(`\n¡Proceso completado! Se han insertado ${count} nuevas preguntas.`);
}

seed();
