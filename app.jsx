import React, { useState, useEffect } from 'react';
import {
  BookOpen, Calendar as CalendarIcon, BarChart2, User, ChevronLeft, ChevronRight,
  Flame, Lightbulb, Book, Calculator, Globe, FlaskConical, Languages, Clock,
  Settings, LogOut, CheckCircle2, Brain, Timer, Zap, Info, GraduationCap, ArrowRight,
  Check, X, AlertCircle
} from 'lucide-react';

const SUBJECTS = [
  { id: 1, name: 'Lectura Crítica', completed: 4, total: 12, icon: Book, color: 'emerald', score: 380 },
  { id: 2, name: 'Matemáticas', completed: 7, total: 15, icon: Calculator, color: 'blue', score: 410 },
  { id: 3, name: 'Sociales y Ciudadanas', completed: 2, total: 10, icon: Globe, color: 'emerald', score: 350 },
  { id: 4, name: 'Ciencias Naturales', completed: 9, total: 18, icon: FlaskConical, color: 'teal', score: 320 },
  { id: 5, name: 'Inglés', completed: 5, total: 14, icon: Languages, color: 'indigo', score: 440 },
];

const STUDY_METHODS = [
  { id: 'active', title: 'Recuperación Activa', tag: 'RECOMENDADO #1', desc: 'El más efectivo. Responde preguntas y haz simulacros para entrenar tu memoria.', icon: Brain, color: 'emerald' },
  { id: 'spaced', title: 'Repetición Espaciada', tag: 'ALTAMENTE EFECTIVO', desc: 'Repasa en intervalos estratégicos para fortalecer la memoria a largo plazo.', icon: Timer, color: 'blue' },
  { id: 'feynman', title: 'Método Feynman', tag: 'COMPRENSIÓN PROFUNDA', desc: 'Explica temas con palabras simples para identificar vacíos en tu aprendizaje.', icon: User, color: 'indigo' },
];

const VERSES = [
  { text: '"Todo lo puedo en Cristo que me fortalece"', ref: 'Filipenses 4:13' },
  { text: '"Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes..."', ref: 'Josué 1:9' },
  { text: '"Fíate de Jehová de todo tu corazón, Y no te apoyes en tu propia prudencia."', ref: 'Proverbios 3:5' },
  { text: '"No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo..."', ref: 'Isaías 41:10' },
  { text: '"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal..."', ref: 'Jeremías 29:11' },
];

const EXAM_QUESTIONS = {
  1: [ // Lectura Crítica
    { q: 'Según un texto sobre "El ciclo del agua", ¿qué proceso convierte el agua líquida en vapor?', options: ['Condensación', 'Precipitación', 'Evaporación', 'Filtración'], correct: 2, explanation: 'En lo literal, el texto indicaría que el calor evapora el agua líquida.' },
    { q: 'Cuando el poeta dice "la luna de plata", ¿a qué figura literaria recurre?', options: ['Símil', 'Metáfora', 'Hipérbole', 'Anáfora'], correct: 1, explanation: 'Es una metáfora, ya que identifica el color y brillo de la luna con la plata sin usar conectores comparativos.' },
    { q: 'Si el autor afirma que "el silencio inundó la sala tras la noticia", se infiere implícitamente que:', options: ['El salón se llenó de agua.', 'Todos hablaron a la vez.', 'La noticia fue impactante y nadie supo qué decir.', 'La noticia era muy aburrida.'], correct: 2, explanation: 'La interpretación del texto sugiere que la sorpresa o el impacto enmudeció a los presentes.' },
    { q: '¿Cuál es el género literario que se caracteriza por relatar una historia mediante un narrador y personajes?', options: ['Lírico', 'Dramático', 'Narrativo', 'Ensayístico'], correct: 2, explanation: 'El género narrativo (cuentos, novelas) relata sucesos.' },
    { q: 'Gabriel García Márquez, premio Nobel colombiano, es el principal exponente de la corriente literaria conocida como:', options: ['Romanticismo', 'Realismo Mágico', 'Vanguardismo', 'Costumbrismo'], correct: 1, explanation: 'Conocimiento general: Su obra "Cien años de soledad" es la cumbre del realismo mágico.' },
    { q: 'En una fábula, la característica principal de sus personajes es que suelen ser:', options: ['Dioses mitológicos.', 'Personajes históricos reales.', 'Animales o cosas con características humanas (personificación).', 'Seres de otros planetas.'], correct: 2, explanation: 'Las fábulas usan la personificación para dejar una moraleja.' },
    { q: 'La interpretación del refrán popular "A caballo regalado no se le mira el colmillo" sugiere:', options: ['Aceptar los regalos con agradecimiento sin buscarles defectos.', 'Que los caballos regalados suelen estar enfermos.', 'Que siempre hay que revisar bien lo que uno compra.', 'Que no se deben aceptar regalos de extraños.'], correct: 0, explanation: 'El sentido implícito es la gratitud ante un obsequio, sin criticarlo.' },
    { q: 'La parte de un ensayo donde se presenta la postura o idea principal que el autor va a defender se llama:', options: ['Conclusión', 'Tesis', 'Argumento', 'Bibliografía'], correct: 1, explanation: 'Conocimiento general de estructura de textos: La tesis es el núcleo del ensayo.' },
    { q: 'Si un artículo de opinión sobre política utiliza el sarcasmo y la ironía constantemente, su propósito principal es:', options: ['Informar objetivamente.', 'Criticar y cuestionar mediante la burla.', 'Exaltar las virtudes del gobierno.', 'Hacer reír a los niños.'], correct: 1, explanation: 'La ironía en textos argumentativos se usa como herramienta de crítica social o política.' },
    { q: '¿Qué signo de puntuación se usa obligatoriamente para delimitar citas textuales dentro de un párrafo?', options: ['Paréntesis', 'Comillas', 'Corchetes', 'Guiones largos'], correct: 1, explanation: 'Las comillas indican que las palabras pertenecen exactamente a otro autor.' },
    { q: 'En la expresión "lloró un río de lágrimas por su partida", se utiliza predominantemente una:', options: ['Hipérbole', 'Comparación', 'Paradoja', 'Ironía'], correct: 0, explanation: 'Es una exageración evidente (hipérbole) para denotar mucho dolor.' },
    { q: 'En la oración literal "El gato negro saltó la cerca de madera", el núcleo del sujeto es:', options: ['Negro', 'Cerca', 'Saltó', 'Gato'], correct: 3, explanation: 'El sustantivo principal del que se habla es el gato.' },
    { q: '¿Cuál de los siguientes conectores sirve para indicar contraste u oposición (adversativo)?', options: ['Además', 'Por lo tanto', 'Sin embargo', 'Finalmente'], correct: 2, explanation: '"Sin embargo" contrapone una idea a otra.' },
    { q: 'Al leer el inicio de un cuento: "El cielo se oscureció de repente, el viento aulló y los pájaros huyeron a sus nidos", el lector puede inferir que:', options: ['Se acerca una fuerte tormenta.', 'Está amaneciendo.', 'Llegó la primavera.', 'Hay un incendio.'], correct: 0, explanation: 'El contexto descriptivo sugiere fuertemente un cambio climático drástico.' },
    { q: 'La estructura narrativa clásica enseñada en el colegio se divide en:', options: ['Tesis, argumentos y conclusión.', 'Introducción, nudo y desenlace.', 'Estrofa, verso y rima.', 'Prólogo, epílogo y glosario.'], correct: 1, explanation: 'Conocimiento general: es la estructura de Aristóteles para la narrativa.' }
  ],
  2: [ // Matemáticas
    { q: 'De acuerdo a la jerarquía de las operaciones, el resultado de 5 + 3 x 2 es:', options: ['16', '11', '10', '15'], correct: 1, explanation: 'Primero se multiplica (3x2=6) y luego se suma (5+6=11).' },
    { q: 'Si un pastel entero se divide en 8 porciones iguales y te comes 2, ¿qué fracción irreducible del pastel te comiste?', options: ['2/8', '1/4', '1/8', '4/1'], correct: 1, explanation: 'Te comes 2/8, que simplificado (dividiendo por 2 arriba y abajo) es 1/4.' },
    { q: 'El perímetro de una cancha rectangular que mide 5 metros de ancho y 10 metros de largo es:', options: ['50 m', '15 m', '30 m', '20 m'], correct: 2, explanation: 'Perímetro = suma de los lados = 5 + 10 + 5 + 10 = 30 metros.' },
    { q: 'Si en un almacén hay un descuento del 25% en una camisa que cuesta $200,000, ¿de cuánto es el descuento en dinero?', options: ['50,000', '25,000', '150,000', '100,000'], correct: 0, explanation: 'El 25% es la cuarta parte. 200,000 / 4 = 50,000.' },
    { q: 'Si un vehículo viaja a una velocidad constante de 60 km/h, ¿cuánto tiempo tardará en recorrer 150 km?', options: ['2 horas', '3 horas', '2.5 horas', '1.5 horas'], correct: 2, explanation: 'Tiempo = Distancia / Velocidad. 150 / 60 = 2.5 horas (2 horas y media).' },
    { q: 'Un concepto fundamental de geometría afirma que la suma de los ángulos internos de cualquier triángulo siempre es igual a:', options: ['90 grados', '180 grados', '360 grados', '270 grados'], correct: 1, explanation: 'Por teorema, los ángulos internos de un triángulo suman 180°.' },
    { q: 'Al interpretar una gráfica de barras escolares, si la barra de "Aprobados" es tres veces más alta que la de "Reprobados", significa que:', options: ['Todos aprobaron.', 'Hay el triple de estudiantes aprobados que reprobados.', 'Faltaron estudiantes por evaluar.', 'El examen fue muy difícil.'], correct: 1, explanation: 'La altura en gráfica de barras representa la frecuencia o cantidad proporcional.' },
    { q: 'El área de una baldosa cuadrada de lado 40 cm es:', options: ['160 cm²', '80 cm²', '1600 cm²', '400 cm²'], correct: 2, explanation: 'Área = lado x lado = 40 x 40 = 1600 cm².' },
    { q: '¿Qué número debe continuar en esta secuencia lógica: 2, 4, 8, 16, ...?', options: ['20', '24', '32', '64'], correct: 2, explanation: 'La secuencia se forma multiplicando el número anterior por 2. 16 x 2 = 32.' },
    { q: 'En la ecuación algebraica sencilla x + 7 = 12, el valor de la incógnita "x" representa:', options: ['5', '19', '6', '7'], correct: 0, explanation: 'Si le restamos 7 a ambos lados, obtenemos x = 12 - 7 = 5.' },
    { q: 'El resultado de elevar 3 al cubo (3³) equivale a:', options: ['9', '27', '6', '81'], correct: 1, explanation: 'Es multiplicar la base por sí misma 3 veces: 3 x 3 x 3 = 27.' },
    { q: 'La probabilidad estadística de obtener un número par al lanzar un dado normal de 6 caras es:', options: ['1/6', '2/6', '3/6 (o 1/2)', '6/6'], correct: 2, explanation: 'Los pares son 2, 4 y 6 (3 opciones). Total de opciones = 6. Probabilidad = 3/6 = 1/2.' },
    { q: 'En el sistema métrico decimal que rige en Colombia, ¿cuántos milímetros hay en un metro?', options: ['10', '100', '1000', '10000'], correct: 2, explanation: 'El prefijo "mili" indica la milésima parte. Hay 1000 milímetros en un metro.' },
    { q: 'Un estudiante compra 3 cuadernos a $5,000 cada uno. Si paga con un billete de $20,000, su cambio implícito será de:', options: ['15,000', '10,000', '5,000', 'No hay cambio'], correct: 2, explanation: 'Gasto total = 3 x 5,000 = 15,000. Cambio = 20,000 - 15,000 = 5,000.' },
    { q: 'El valor de la constante matemática Pi (π ≈ 3.1416) se utiliza en geometría principalmente para calcular:', options: ['El volumen de un cubo.', 'La hipotenusa de un triángulo.', 'El perímetro y área de circunferencias.', 'El área de un rectángulo.'], correct: 2, explanation: 'Pi es la relación entre el perímetro de una circunferencia y su diámetro.' }
  ],
  3: [ // Sociales
    { q: 'La actual Carta Magna que rige los derechos y deberes en Colombia es la:', options: ['Constitución de 1886', 'Constitución de 1991', 'Tratado de Paz de 2016', 'Declaración de Derechos de 1789'], correct: 1, explanation: 'En 1991 se promulgó la Constitución vigente, impulsada por la Séptima Papeleta.' },
    { q: 'Según la historia patria, el personaje clave que lideró la campaña libertadora de la Nueva Granada (hoy Colombia) fue:', options: ['Francisco de Paula Santander', 'Antonio Nariño', 'Simón Bolívar', 'Camilo Torres'], correct: 2, explanation: 'Bolívar lideró las batallas definitivas, como la de Boyacá en 1819.' },
    { q: 'El mecanismo de participación ciudadana establecido para destituir a un alcalde o gobernador por insatisfacción popular es:', options: ['La Tutela', 'El Referendo', 'La Revocatoria del Mandato', 'El Plebiscito'], correct: 2, explanation: 'Es un derecho político que permite dar por terminado el mandato de un gobernante.' },
    { q: 'En la organización del Estado Colombiano, la rama encargada explícitamente de redactar y aprobar las leyes es:', options: ['Rama Ejecutiva', 'Rama Judicial', 'Rama Legislativa (Congreso)', 'Fuerzas Militares'], correct: 2, explanation: 'El Congreso de la República conforma la rama legislativa.' },
    { q: 'Geografía de Colombia: ¿Cuál es la ciudad capital del departamento de Antioquia?', options: ['Cali', 'Medellín', 'Barranquilla', 'Bucaramanga'], correct: 1, explanation: 'Medellín es la capital antioqueña.' },
    { q: 'Colombia tiene el privilegio de tener costas en dos océanos. Uno es el Atlántico (Mar Caribe) y el occidente del país es bañado por el océano:', options: ['Índico', 'Ártico', 'Pacífico', 'Antártico'], correct: 2, explanation: 'La región Pacífica limita al occidente con el Océano Pacífico.' },
    { q: 'Históricamente, la Revolución Industrial transformó a la humanidad implicando principalmente:', options: ['El descubrimiento de la agricultura.', 'El paso de la producción manual artesanal a la producción mecanizada en fábricas.', 'La creación de las primeras universidades.', 'La expansión del Imperio Romano.'], correct: 1, explanation: 'Surgió la máquina de vapor y el trabajo en masa.' },
    { q: 'Si a un estudiante se le niega injustificadamente la entrada a su colegio público, el mecanismo legal inmediato para proteger su derecho fundamental a la educación es:', options: ['Una huelga', 'Una Acción de Tutela', 'Una demanda de inconstitucionalidad', 'Un paro nacional'], correct: 1, explanation: 'La Tutela es un mecanismo rápido y efectivo para proteger derechos fundamentales vulnerados.' },
    { q: 'El periodo de la historia de Colombia conocido irónicamente como "La Patria Boba" (1810-1816) se caracterizó por:', options: ['Un crecimiento económico sin precedentes.', 'Conflictos internos y guerras entre centralistas y federalistas tras el primer grito de independencia.', 'La llegada pacífica de los españoles.', 'La construcción del Canal de Panamá.'], correct: 1, explanation: 'La desunión interna facilitó la posterior reconquista española.' },
    { q: 'Cultura General Mundial: El desierto del Sahara, el más cálido y extenso del mundo, se encuentra en el continente de:', options: ['Asia', 'América del Sur', 'África', 'Oceanía'], correct: 2, explanation: 'Ocupa gran parte de África del Norte.' },
    { q: 'El concepto político de "Democracia", nacido en la antigua Grecia, se interpreta etimológica y socialmente como:', options: ['Gobierno de un rey o monarca.', 'Gobierno de los ricos.', 'El gobierno del pueblo.', 'Gobierno de las Fuerzas Armadas.'], correct: 2, explanation: 'Demos = Pueblo, Kratos = Poder/Gobierno.' },
    { q: 'El devastador conflicto bélico mundial que tuvo lugar entre los años 1939 y 1945 se conoce como:', options: ['Primera Guerra Mundial', 'Guerra Fría', 'Segunda Guerra Mundial', 'Guerra de los Cien Años'], correct: 2, explanation: 'Terminó en 1945 con la rendición de Alemania y Japón.' },
    { q: 'Una implicación directa de la deforestación masiva en selvas como la Amazonía a nivel global es:', options: ['El aumento de la capa de ozono.', 'La aceleración del calentamiento global por menor captura de dióxido de carbono.', 'El enfriamiento repentino del planeta.', 'El aumento de especies animales endémicas.'], correct: 1, explanation: 'Los árboles absorben CO2. Sin ellos, el efecto invernadero aumenta.' },
    { q: 'Durante el siglo XX, el principal producto agrícola de exportación que representó a Colombia ante el mundo fue:', options: ['El trigo', 'El algodón', 'El café', 'La soya'], correct: 2, explanation: 'El café colombiano históricamente sostuvo la economía de exportación del país.' },
    { q: 'En el nivel local, la máxima autoridad administrativa elegida popularmente para gobernar un municipio es el:', options: ['Gobernador', 'Presidente', 'Alcalde', 'Concejal'], correct: 2, explanation: 'El alcalde es el jefe del gobierno municipal.' }
  ],
  4: [ // Ciencias Naturales
    { q: 'El proceso biológico mediante el cual las plantas capturan la luz solar para fabricar su propio alimento (glucosa) se denomina:', options: ['Respiración celular', 'Fotosíntesis', 'Digestión', 'Fermentación'], correct: 1, explanation: 'Convierten energía luminosa en energía química.' },
    { q: 'Literalmente, el gas que compone la mayor parte de la atmósfera terrestre (aproximadamente un 78%) es el:', options: ['Oxígeno', 'Dióxido de Carbono', 'Nitrógeno', 'Helio'], correct: 2, explanation: 'Aunque el oxígeno es vital, el nitrógeno es el más abundante.' },
    { q: 'Si dejas un cubo de hielo bajo el sol ardiente y se vuelve agua, ha ocurrido una transformación de la materia llamada:', options: ['Evaporación', 'Fusión (derretimiento)', 'Solidificación', 'Sublimación'], correct: 1, explanation: 'Paso de estado sólido a líquido se llama fusión.' },
    { q: 'El órgano central e impulsor del sistema circulatorio humano, responsable de bombear la sangre, es:', options: ['El cerebro', 'El pulmón', 'El estómago', 'El corazón'], correct: 3, explanation: 'El corazón funciona como una bomba muscular.' },
    { q: 'Implicación ecológica: Si en una red trófica se extinguen por completo las plantas de una región, ¿qué sucede?', options: ['Los herbívoros aprenden a hacer fotosíntesis.', 'No pasa nada, los carnívoros comen tierra.', 'Toda la red alimenticia colapsa porque falta la base productora de energía.', 'Los animales se vuelven más fuertes.'], correct: 2, explanation: 'Las plantas (productores) son la base energética de los ecosistemas terrestres.' },
    { q: 'Según la biología, la unidad estructural, funcional y de origen básica de todo ser vivo es:', options: ['El átomo', 'La célula', 'El órgano', 'El virus'], correct: 1, explanation: 'La teoría celular establece que la célula es la unidad de la vida.' },
    { q: 'La interpretación del fenómeno de la manzana que cae del árbol se atribuye a Isaac Newton mediante su formulación de la:', options: ['Ley de la Relatividad', 'Ley de la Gravedad Universal', 'Ley de la Conservación de la Materia', 'Ley de Ohm'], correct: 1, explanation: 'La gravedad atrae los cuerpos masivos entre sí.' },
    { q: 'En química, la fórmula H₂O representa universalmente a la molécula de:', options: ['Agua oxigenada', 'Sal de mesa', 'Agua pura', 'Amoníaco'], correct: 2, explanation: 'Compuesta por dos átomos de hidrógeno y uno de oxígeno.' },
    { q: 'Una de las consecuencias ambientales implícitas del uso desmedido de plásticos de un solo uso es:', options: ['La nutrición de las plantas terrestres.', 'La contaminación persistente y grave de ríos, océanos y suelos.', 'La disminución de los gases de efecto invernadero.', 'La purificación del agua de lluvia.'], correct: 1, explanation: 'El plástico tarda siglos en degradarse, acumulándose en los ecosistemas.' },
    { q: 'Por sus características biológicas (piel húmeda, reproducción en el agua, doble vida), la rana clasifica dentro del grupo de los:', options: ['Mamíferos', 'Reptiles', 'Peces', 'Anfibios'], correct: 3, explanation: 'Viven parte en agua y parte en tierra.' },
    { q: 'El movimiento que realiza el planeta Tierra al girar alrededor del Sol y que dura un año se llama:', options: ['Rotación', 'Traslación', 'Nutación', 'Precesión'], correct: 1, explanation: 'La traslación determina las estaciones y la duración del año.' },
    { q: 'Si frotas tus manos rápidamente en invierno y sientes calor, la física interpreta esto como la transformación de energía cinética en energía:', options: ['Eléctrica', 'Lumínica', 'Térmica (Calor)', 'Sonora'], correct: 2, explanation: 'La fricción del movimiento (cinética) genera calor (térmica).' },
    { q: 'Los animales, como las vacas o los caballos, que en su estado natural se alimentan exclusivamente de vegetales son catalogados como:', options: ['Carnívoros', 'Omnívoros', 'Herbívoros', 'Carroñeros'], correct: 2, explanation: 'Herbívoro significa "que come hierbas/plantas".' },
    { q: 'Desde el punto de vista de la salud, una alimentación deficiente en hierro suele tener como implicación médica el desarrollo de:', options: ['Diabetes', 'Anemia', 'Hipertensión', 'Asma'], correct: 1, explanation: 'El hierro es necesario para producir la hemoglobina de la sangre.' },
    { q: 'Conocimiento astronómico básico: La estrella gigante de gas e incandescente que es el centro de nuestro sistema planetario es:', options: ['Júpiter', 'Sirio', 'El Sol', 'La Luna'], correct: 2, explanation: 'El Sol proporciona la gravedad y la energía a nuestro sistema.' }
  ],
  5: [ // Inglés
    { q: 'Literal translation: What does the English word "Apple" mean in Spanish?', options: ['Naranja', 'Pera', 'Manzana', 'Banano'], correct: 2, explanation: 'Apple es la traducción directa de Manzana.' },
    { q: 'General grammar: Choose the correct verb to complete "I ___ a student from Colombia."', options: ['are', 'is', 'am', 'be'], correct: 2, explanation: 'Con el pronombre "I" se usa la forma "am" del verbo to be.' },
    { q: 'Reading interpretation: In the sentence "John loves playing soccer with his friends on weekends", what does John like to do?', options: ['Jugar baloncesto en la noche', 'Estudiar los fines de semana', 'Jugar fútbol los fines de semana', 'Dormir con sus amigos'], correct: 2, explanation: 'Playing = Jugar, Soccer = Fútbol, Weekends = Fines de semana.' },
    { q: 'Idiom implication: When a native speaker says "It\'s raining cats and dogs", they implicitly mean:', options: ['Que están cayendo animales del cielo.', 'Que está lloviendo muy fuerte (aguacero).', 'Que deben bañar a sus mascotas.', 'Que hay perros y gatos peleando.'], correct: 1, explanation: 'Es una expresión idiomática clásica en inglés para referirse a lluvia torrencial.' },
    { q: 'General tense: What is the correct past tense of the irregular verb "Go" (ir)?', options: ['Goes', 'Going', 'Goed', 'Went'], correct: 3, explanation: '"Went" es el pasado simple del verbo irregular go.' },
    { q: 'Vocabulary: Which of the following words represents a basic color?', options: ['Chair', 'Happy', 'Yellow', 'Jump'], correct: 2, explanation: 'Yellow significa amarillo.' },
    { q: 'Grammar interpretation: The sentence "She is taller than her brother" is an example of a:', options: ['Superlative degree', 'Comparative degree', 'Passive voice', 'Present perfect'], correct: 1, explanation: 'Se utiliza "taller than" para comparar (más alta que).' },
    { q: 'Literal reading: Read the sign: "The school library opens at 8:00 AM". When does the library open?', options: ['In the afternoon', 'At night', 'In the morning', 'On Sunday'], correct: 2, explanation: 'AM indica que es en la mañana (morning).' },
    { q: 'General noun forms: What is the correct irregular plural for the word "Child" (niño)?', options: ['Childs', 'Children', 'Childrens', 'Childes'], correct: 1, explanation: 'Es un plural irregular de uso muy común.' },
    { q: 'Pragmatic implication: If someone at dinner asks you "Can you pass me the salt, please?", they are using English to:', options: ['Saber si tienes sal en los bolsillos.', 'Pedir educadamente un favor en la mesa.', 'Quejarse de que la comida no tiene sabor.', 'Enseñarte a cocinar.'], correct: 1, explanation: '"Can you...?" es una estructura común para peticiones formales.' },
    { q: 'General vocabulary: According to the days of the week, what day comes exactly after Tuesday (martes)?', options: ['Monday', 'Friday', 'Thursday', 'Wednesday'], correct: 3, explanation: 'Lunes(Monday), Martes(Tuesday), Miércoles(Wednesday).' },
    { q: 'Opposites: The direct opposite of the adjective "Hot" (caliente) is:', options: ['Warm', 'Big', 'Cold', 'Fast'], correct: 2, explanation: 'Cold significa frío.' },
    { q: 'Grammar structure: Complete the present continuous sentence: "They ___ playing video games right now."', options: ['am', 'is', 'are', 'was'], correct: 2, explanation: 'Con el pronombre plural "They" se usa "are".' },
    { q: 'Sign implication: If you are driving and see a big sign that says "No Parking", you must implicitly understand that:', options: ['No puedes estacionar tu auto en ese lugar.', 'No hay parques cerca.', 'Es una zona para acampar.', 'Puedes parquear gratis.'], correct: 0, explanation: 'Parking = Estacionar. "No parking" prohíbe estacionarse.' },
    { q: 'General greetings: How do you say "Buenos días" formally in English?', options: ['Good night', 'Good evening', 'Good afternoon', 'Good morning'], correct: 3, explanation: 'Es el saludo estándar para la mañana.' }
  ]
};

const App = () => {
  const [screen, setScreen] = useState('welcome');
  const [selectedMethod, setSelectedMethod] = useState('active');
  const [dailyVerse, setDailyVerse] = useState(VERSES[0]);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Estado para el Exam
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    setDailyVerse(VERSES[Math.floor(Math.random() * VERSES.length)]);
  }, []);

  const startExam = (subject) => {
    setSelectedSubject(subject);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setHasChecked(false);
    setScore(0);
    setTimeLeft(20 * 60);
    setScreen('exam');
  };

  const BottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t flex justify-around py-3 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      {[
        { id: 'home', icon: BookOpen, label: 'Inicio' },
        { id: 'calendar', icon: CalendarIcon, label: 'Calendario' },
        { id: 'progress', icon: BarChart2, label: 'Progreso' },
        { id: 'profile', icon: User, label: 'Perfil' },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setScreen(item.id)}
          className={`flex flex-col items-center gap-1 transition-colors ${screen === item.id ? 'text-emerald-600' : 'text-gray-400'}`}
        >
          <item.icon size={22} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );

  const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-[#fcfdfc]">
      <div className="w-40 h-40 bg-white rounded-full shadow-xl flex items-center justify-center mb-10 border border-emerald-50">
        <div className="text-emerald-700">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <path d="M12 6v6m0 0l-2-2m2 2l2-2" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <h1 className="text-4xl font-extrabold text-emerald-800 mb-2 tracking-tight">SinPanic0</h1>
      <p className="text-slate-500 mb-16 font-medium">Estudia con confianza, presenta con seguridad</p>
      <div className="w-full space-y-4">
        <button onClick={() => setScreen('onboarding')} className="w-full py-4 bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 active:scale-95 transition-all">Inscríbete</button>
        <button onClick={() => setScreen('home')} className="w-full py-4 bg-emerald-50 text-emerald-800 rounded-2xl font-bold active:scale-95 transition-all">Iniciar sesión</button>
      </div>
    </div>
  );

  const OnboardingScreen = () => (
    <div className="p-6 pb-24 bg-white min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setScreen('welcome')} className="p-2 text-emerald-600 bg-emerald-50 rounded-full"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-bold text-slate-800">SinPanic0</h2>
      </div>
      <h2 className="text-2xl font-black text-slate-900 mb-2">Personaliza tu estudio</h2>
      <p className="text-slate-500 mb-8">Ayúdanos a preparar el mejor camino para tu éxito académico.</p>
      <button onClick={() => setScreen('methods')} className="w-full py-4 mt-10 bg-emerald-500 text-white rounded-2xl font-black shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all">
        Continuar <ArrowRight size={20} />
      </button>
    </div>
  );

  const MethodsScreen = () => (
    <div className="p-6 pb-32 bg-slate-50 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setScreen('home')} className="p-2 text-emerald-600"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-bold text-slate-800">SinPanic0</h2>
      </div>
      <h1 className="text-3xl font-black text-emerald-500 text-center mb-2">Planes de Estudio</h1>
      <p className="text-slate-500 text-center text-sm mb-8 px-4">Selecciona el método que mejor se adapte a ti.</p>
      <div className="space-y-4">
        {STUDY_METHODS.map((m) => (
          <div key={m.id} className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${selectedMethod === m.id ? 'bg-white border-emerald-500 shadow-xl' : 'bg-white border-transparent shadow-sm'}`} onClick={() => setSelectedMethod(m.id)}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{m.tag}</span>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedMethod === m.id ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                <m.icon size={24} />
              </div>
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-1">{m.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">{m.desc}</p>
            <button className={`w-full py-2 rounded-xl text-xs font-black transition-all ${selectedMethod === m.id ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
              {selectedMethod === m.id ? 'Seleccionado' : 'Seleccionar'}
            </button>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t z-50">
        <button onClick={() => setScreen('home')} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black shadow-lg shadow-emerald-100">
          Guardar y Volver
        </button>
      </div>
    </div>
  );

  const HomeScreen = () => (
    <div className="p-5 pb-24 bg-[#f8fafc] min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-100"><BookOpen size={20} /></div>
          <h2 className="text-2xl font-black text-slate-800">SinPanic0</h2>
        </div>
      </header>

      <div className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-[2rem] p-8 text-white mb-8 shadow-2xl shadow-emerald-200 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Versículo del día</span>
          <h3 className="text-2xl font-bold mt-3 leading-tight">{dailyVerse.text}</h3>
          <p className="mt-3 text-sm font-medium opacity-90">{dailyVerse.ref}</p>
        </div>
        <div className="absolute -right-6 -bottom-6 opacity-10"><BookOpen size={140} strokeWidth={1} /></div>
      </div>

      {(() => {
        const currentMethod = STUDY_METHODS.find(m => m.id === selectedMethod);
        const MethodIcon = currentMethod?.icon;
        return (
          <div className="bg-white p-5 rounded-[1.5rem] border-2 border-emerald-500 shadow-md mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Tu Plan de Estudio</span>
              <button onClick={() => setScreen('methods')} className="text-xs text-white font-bold bg-emerald-500 px-3 py-1.5 rounded-xl hover:bg-emerald-600 transition-colors shadow-sm">Cambiar</button>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
                {MethodIcon && <MethodIcon size={24} />}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-black text-slate-800">{currentMethod?.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{currentMethod?.desc}</p>
              </div>
            </div>
          </div>
        );
      })()}

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black text-slate-800 text-xl">Tus Materias</h3>
      </div>
      <div className="space-y-4">
        {SUBJECTS.map((sub) => (
          <div key={sub.id} onClick={() => { setSelectedSubject(sub); setScreen('subject'); }} className="bg-white p-5 rounded-[1.5rem] border border-slate-50 shadow-sm flex items-center gap-4 active:scale-98 transition-all cursor-pointer hover:shadow-md group">
            <div className={`w-14 h-14 bg-${sub.color}-50 text-${sub.color}-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}><sub.icon size={28} /></div>
            <div className="flex-1">
              <h4 className="font-black text-slate-800 text-base">{sub.name}</h4>
              <p className="text-xs text-slate-400 font-medium mt-1">{sub.completed} de {sub.total} lecciones completadas</p>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </div>
        ))}
      </div>
    </div>
  );

  const SubjectScreen = () => (
    <div className="p-6 pb-24 bg-[#fcfdfc] min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <button onClick={() => setScreen('home')} className="p-2 text-emerald-600 bg-emerald-50 rounded-full"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-black text-slate-800">{selectedSubject?.name}</h2>
        <div className="w-10"></div>
      </header>
      <div className={`bg-${selectedSubject?.color || 'emerald'}-50 p-6 rounded-[2rem] border border-${selectedSubject?.color || 'emerald'}-100 flex items-center gap-4 mb-8`}>
        <div className={`w-16 h-16 bg-white text-${selectedSubject?.color || 'emerald'}-500 rounded-2xl flex items-center justify-center shadow-sm`}>
          {selectedSubject?.icon && <selectedSubject.icon size={32} />}
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Tu progreso</p>
          <h3 className="text-2xl font-black text-slate-800">{selectedSubject?.completed} / {selectedSubject?.total}</h3>
          <p className="text-xs font-medium text-slate-500 mt-1">Lecciones completadas</p>
        </div>
      </div>
      <h3 className="font-black text-slate-800 text-xl mb-4">Exámenes Diagnósticos</h3>
      <div className="space-y-4">
        {[
          { title: "Prueba ICFES Saber 11", desc: "Examen de alta dificultad tipo ICFES", time: "20 min", type: "Avanzado" },
          { title: "Simulacro Complejo", desc: "Preguntas de análisis profundo e interpretación", time: "20 min", type: "Experto" },
        ].map((exam, idx) => (
          <div key={idx} className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{exam.type}</span>
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1"><Clock size={12} /> {exam.time}</span>
            </div>
            <h4 className="text-lg font-black text-slate-800 mb-1">{exam.title}</h4>
            <p className="text-sm text-slate-500 mb-4">{exam.desc}</p>
            <button onClick={() => startExam(selectedSubject)} className="w-full py-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl font-bold active:scale-95 transition-all hover:bg-emerald-100">
              Comenzar Examen
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const ExamScreen = () => {
    // Tomar las preguntas complejas (10 preguntas)
    const questions = EXAM_QUESTIONS[selectedSubject?.id] || [];

    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setScreen('exam_results');
      }
    }, [timeLeft]);

    const formatTime = (secs) => {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (questions.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-slate-50">
          <AlertCircle size={48} className="text-orange-500 mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Examen en construcción</h2>
          <p className="text-slate-500 mb-8">Aún no hay preguntas cargadas para esta materia.</p>
          <button onClick={() => setScreen('subject')} className="px-6 py-3 bg-slate-200 rounded-xl font-bold">Volver</button>
        </div>
      );
    }

    const currentQuestion = questions[currentQIndex];

    const handleCheck = () => {
      if (selectedOption === null) return;
      setHasChecked(true);
      if (selectedOption === currentQuestion.correct) {
        setScore(score + 1);
      }
    };

    const handleNext = () => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(currentQIndex + 1);
        setSelectedOption(null);
        setHasChecked(false);
      } else {
        setScreen('exam_results');
      }
    };

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <header className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setScreen('subject')} className="text-slate-400 hover:text-slate-600"><ChevronLeft size={24} /></button>
            <h1 className="text-sm font-black text-slate-800 line-clamp-1">Quiz de {selectedSubject?.name}</h1>
          </div>
          <div className="relative w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-100 shrink-0">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="28" cy="28" r="24" stroke="#f1f5f9" strokeWidth="4" fill="transparent" />
              <circle
                cx="28" cy="28" r="24"
                stroke={timeLeft < 180 ? "#ef4444" : "#10b981"}
                strokeWidth="4"
                fill="transparent"
                strokeDasharray="150.7"
                strokeDashoffset={150.7 - (150.7 * (timeLeft / 900))}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="flex flex-col items-center justify-center z-10">
              <span className={`text-[11px] font-black tracking-tighter ${timeLeft < 180 ? 'text-red-500' : 'text-slate-700'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </header>

        <div className="p-6 flex-1 max-w-3xl mx-auto w-full">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-xs font-bold text-slate-400">{currentQIndex + 1} / {questions.length}</span>
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden max-w-[200px]">
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}></div>
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-800 mb-6 leading-relaxed">
            {currentQuestion.q}
          </h2>

          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correct;

              let borderClass = "border-slate-200";
              let bgClass = "bg-white";
              let textClass = "text-slate-700";
              let icon = <div className="w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 mr-3">{String.fromCharCode(65 + idx)}</div>;

              if (hasChecked) {
                if (isCorrect) {
                  borderClass = "border-green-500";
                  bgClass = "bg-green-50";
                  textClass = "text-green-800 font-medium";
                  icon = <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white mr-3"><Check size={14} /></div>;
                } else if (isSelected && !isCorrect) {
                  borderClass = "border-red-500";
                  bgClass = "bg-red-50";
                  textClass = "text-red-800 font-medium";
                  icon = <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white mr-3"><X size={14} /></div>;
                } else {
                  borderClass = "border-slate-100 opacity-50";
                }
              } else if (isSelected) {
                borderClass = "border-blue-500 ring-2 ring-blue-100";
                bgClass = "bg-blue-50";
                textClass = "text-blue-800 font-medium";
                icon = <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3 text-[10px] font-bold">{String.fromCharCode(65 + idx)}</div>;
              }

              return (
                <button
                  key={idx}
                  disabled={hasChecked}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center ${borderClass} ${bgClass} ${textClass}`}
                >
                  {icon}
                  <span className="flex-1 text-sm">{opt}</span>
                </button>
              );
            })}
          </div>

          {hasChecked && (
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 mb-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-2 mb-2 text-orange-800 font-bold">
                <Lightbulb size={18} /> Explicación
              </div>
              <p className="text-sm text-orange-900 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white border-t border-slate-200 p-4 sticky bottom-0">
          <div className="max-w-3xl mx-auto flex justify-end">
            {!hasChecked ? (
              <button
                disabled={selectedOption === null}
                onClick={handleCheck}
                className={`px-8 py-3 rounded-xl font-black transition-all ${selectedOption !== null ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600' : 'bg-slate-100 text-slate-400'}`}
              >
                Comprobar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 rounded-xl font-black bg-blue-500 text-white shadow-md hover:bg-blue-600 flex items-center gap-2"
              >
                {currentQIndex < questions.length - 1 ? 'Siguiente' : 'Ver Resultados'} <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ExamResultsScreen = () => {
    const questions = EXAM_QUESTIONS[selectedSubject?.id] || [];
    const percentage = Math.round((score / questions.length) * 100);

    let recommendation = "";
    if (percentage >= 80) {
      recommendation = "¡Excelente trabajo! Tienes un dominio muy sólido de los temas evaluados en esta sección. Te recomendamos enfocarte en mantener este ritmo mediante repasos espaciados rápidos.";
    } else if (percentage >= 50) {
      recommendation = "Buen intento, pero hay margen de mejora. Te sugerimos revisar las explicaciones de las preguntas en las que fallaste y usar el Método Feynman para explicar esos conceptos en voz alta.";
    } else {
      recommendation = "Parece que esta área requiere más atención. No te preocupes, el diagnóstico es para ayudarte a enfocar tu energía. Te recomendamos volver a repasar la teoría fundamental usando la Recuperación Activa y dedicarle más horas en tu horario.";
    }

    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-32 h-32 rounded-full border-8 border-emerald-100 flex items-center justify-center mb-6 relative">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle cx="60" cy="60" r="56" stroke="#10b981" strokeWidth="8" fill="transparent" strokeDasharray="351.8" strokeDashoffset={351.8 - (351.8 * percentage) / 100} strokeLinecap="round" />
          </svg>
          <span className="text-4xl font-black text-slate-800">{percentage}%</span>
        </div>

        <h2 className="text-3xl font-black text-slate-900 mb-2">¡Examen Finalizado!</h2>
        <p className="text-slate-500 mb-8 font-medium">Acertaste {score} de {questions.length} preguntas de {selectedSubject?.name}.</p>

        <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 max-w-md w-full mb-10 text-left relative">
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg"><Lightbulb size={24} /></div>
          <h3 className="font-black text-blue-900 mb-2">Recomendación Personalizada</h3>
          <p className="text-sm text-blue-800 leading-relaxed">{recommendation}</p>
        </div>

        <button onClick={() => setScreen('subject')} className="w-full max-w-md py-4 bg-emerald-500 text-white rounded-2xl font-black shadow-lg shadow-emerald-100 active:scale-95 transition-all">
          Continuar Estudiando
        </button>
      </div>
    );
  };

  const CalendarScreen = () => {
    const today = new Date();
    const [displayDate, setDisplayDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const currentMonth = displayDate.getMonth();
    const currentYear = displayDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday

    // Días del mes anterior para rellenar
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => prevMonthDays - firstDayOfMonth + i + 1);

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Días del próximo mes para rellenar (completar la cuadrícula a 42 celdas)
    const totalCells = blanks.length + days.length;
    const nextBlanks = Array.from({ length: 42 - totalCells }, (_, i) => i + 1);

    // Simular el historial de estudio solo para el mes en curso
    const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();
    const practiceHistory = isCurrentMonth
      ? { 1: true, 2: true, 3: false, 4: true, 5: true, 6: false, 7: false, 8: true, 9: true, 10: true, 11: false, 12: true }
      : {};

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    const handlePrevMonth = () => {
      setDisplayDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
      setDisplayDate(new Date(currentYear, currentMonth + 1, 1));
    };

    return (
      <div className="p-6 pb-24 bg-slate-50 min-h-screen">
        <header className="flex justify-between items-center mb-8">
          <button onClick={() => setScreen('home')} className="w-11 h-11 rounded-full bg-white shadow-sm text-emerald-600 flex items-center justify-center border border-slate-100">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-black text-slate-800">Tu Calendario</h2>
          <div className="w-11 h-11" />
        </header>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-black text-slate-800 capitalize">{monthNames[currentMonth]} {currentYear}</h3>
            <div className="flex gap-2">
              <button onClick={handlePrevMonth} className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100"><ChevronLeft size={20} /></button>
              <button onClick={handleNextMonth} className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100"><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map(day => (
              <div key={day} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {blanks.map((day, idx) => (
              <div key={`prev-${idx}`} className="h-10 rounded-xl flex items-center justify-center text-sm text-slate-300 bg-transparent">
                {day}
              </div>
            ))}
            {days.map(day => {
              let bgClass = "bg-slate-50 text-slate-600";
              let borderClass = "border-transparent";

              if (practiceHistory[day] === true) {
                bgClass = "bg-emerald-500 text-white font-bold shadow-md shadow-emerald-200";
              } else if (practiceHistory[day] === false) {
                bgClass = "bg-red-500 text-white font-bold shadow-md shadow-red-200";
              } else if (isCurrentMonth && day === today.getDate() && practiceHistory[day] === undefined) {
                borderClass = "border-2 border-emerald-500";
                bgClass = "bg-white text-emerald-600 font-bold";
              } else if (isCurrentMonth && day > today.getDate()) {
                bgClass = "bg-slate-50 text-slate-400";
              }

              return (
                <div key={day} className={`h-10 rounded-xl flex items-center justify-center text-sm border ${bgClass} ${borderClass} transition-all`}>
                  {day}
                </div>
              );
            })}
            {nextBlanks.map((day, idx) => (
              <div key={`next-${idx}`} className="h-10 rounded-xl flex items-center justify-center text-sm text-slate-300 bg-transparent">
                {day}
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-medium text-slate-500">Practicado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs font-medium text-slate-500">No practicado</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProgressScreen = () => (
    <div className="p-6 pb-24 bg-white min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <button onClick={() => setScreen('home')} className="p-2"><ChevronLeft size={28} /></button>
        <h2 className="text-xl font-black text-slate-800">Tu Progreso</h2>
        <div className="w-10"></div>
      </header>
      <div className="text-center text-slate-500 mt-20 font-medium">Pantalla de progreso en construcción.</div>
    </div>
  );

  const ProfileScreen = () => (
    <div className="p-6 pb-24 bg-white min-h-screen">
      <header className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-black text-slate-900">Perfil</h2>
      </header>
      <div className="text-center text-slate-500 mt-10 font-medium">Pantalla de perfil en construcción.</div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 shadow-2xl overflow-x-hidden relative font-sans selection:bg-emerald-100">
      <main className="animate-in fade-in duration-500">
        {screen === 'welcome' && <WelcomeScreen />}
        {screen === 'onboarding' && <OnboardingScreen />}
        {screen === 'methods' && <MethodsScreen />}
        {screen === 'home' && <HomeScreen />}
        {screen === 'subject' && <SubjectScreen />}
        {screen === 'exam' && <ExamScreen />}
        {screen === 'exam_results' && <ExamResultsScreen />}
        {screen === 'calendar' && <CalendarScreen />}
        {screen === 'progress' && <ProgressScreen />}
        {screen === 'profile' && <ProfileScreen />}
      </main>

      {!['welcome', 'onboarding', 'methods', 'subject', 'exam', 'exam_results'].includes(screen) && <BottomNav />}
    </div>
  );
};

export default App;