// Banco Completo de Preguntas ICFES (Lectura Crítica, Matemáticas, Sociales, Ciencias Naturales, Inglés)

export const EXAM_QUESTIONS = {
  1: [ // Lectura Crítica - Nivel Avanzado ICFES
    { q: '[ICFES 2023] En una columna periodística, el autor argumenta: "La automatización destruirá millones de empleos, pero creará otros nuevos que requieren habilidades tecnológicas. Sin embargo, el Estado debe intervenir para evitar una crisis social transitoria". ¿Cuál es la premisa principal subyacente al argumento?', options: ['La tecnología siempre es negativa para la sociedad.', 'El progreso tecnológico requiere una red de seguridad estatal durante la transición.', 'Los empleos tecnológicos son más fáciles que los manuales.', 'El Estado debe prohibir el avance de la automatización.'], correct: 1, explanation: 'La premisa central es que, aunque el cambio es inevitable, se requiere intervención del Estado para mitigar el impacto social inmediato.', category: 'interpretacion' },
    { q: '[ICFES 2024] Lee el siguiente fragmento: "La luna, testigo mudo de mil batallas, se ocultó tras un velo de nubes grises, como si no quisiera presenciar la masacre". La figura retórica predominante y su propósito en el texto es:', options: ['Símil, para comparar la luna con las nubes.', 'Hipérbole, para exagerar el número de batallas.', 'Personificación, para dotar de sensibilidad al entorno natural frente a la tragedia humana.', 'Metáfora, para explicar la astronomía.'], correct: 2, explanation: 'Al atribuirle la voluntad de "no querer presenciar" o ser un "testigo mudo", se está humanizando la luna (personificación) para intensificar el dramatismo.', category: 'interpretacion' },
    { q: '[ICFES 2022] Un texto expositivo sobre historia económica señala que "la inflación descontrolada erosiona el poder adquisitivo, golpeando desproporcionadamente a los estratos bajos". A partir de esto, se puede deducir que:', options: ['La inflación beneficia a los más pobres.', 'Los estratos altos son inmunes a cualquier problema económico.', 'La pérdida de valor del dinero afecta más severamente a quienes tienen ingresos fijos y limitados.', 'La economía no depende de la inflación.'], correct: 2, explanation: 'Se infiere que los estratos bajos sufren más porque no tienen activos para protegerse de la pérdida del valor del dinero.', category: 'interpretacion' },
    { q: '[ICFES 2025] Si un político afirma: "Mi oponente propone aumentar los impuestos porque odia a los empresarios y quiere destruir el empleo", está incurriendo en una falacia de tipo:', options: ['Ad hominem (ataque personal).', 'Hombre de paja (tergiversar la postura del oponente).', 'Falso dilema.', 'Apelación a la autoridad.'], correct: 1, explanation: 'Asignar intenciones extremas y falsas ("odia a los empresarios") a la propuesta del oponente para atacarla fácilmente es la falacia del hombre de paja.', category: 'general' },
    { q: '[ICFES 2021] En el poema de Borges, el laberinto simboliza frecuentemente:', options: ['Un juego de niños.', 'La estructura geométrica perfecta de la ciudad.', 'La complejidad inabarcable y confusa del universo y el destino humano.', 'El miedo irracional a perderse.'], correct: 2, explanation: 'El laberinto en la literatura borgiana representa la perplejidad del hombre frente a un mundo que no puede descifrar por completo.', category: 'interpretacion' },
    { q: '[ICFES] De acuerdo con el texto argumentativo de Estanislao Zuleta sobre la lectura, ¿qué implica el "deber de leer"?', options: ['Una obligación moral de acumular conocimiento.', 'Un esfuerzo activo para interpretar y confrontar las ideas del autor.', 'Una lectura rápida para encontrar datos explícitos.', 'La memorización de los conceptos centrales del texto.'], correct: 1, explanation: 'Zuleta propone que leer es un trabajo activo, de interpretación y confrontación.', category: 'interpretacion' },
    { q: '[ICFES] Según un informe sobre estrés crónico, ¿cuál es el porcentaje de población afectada mencionado explícitamente?', options: ['15%', '25%', '35%', '50%'], correct: 1, explanation: 'El texto indica explícitamente que el 25% de la población sufre esta condición.', category: 'literal' },
    { q: '[ICFES] En la frase "El ocaso de la civilización es un espejo de nuestra avaricia", la figura sugiere que:', options: ['El sol se oculta más temprano debido a la contaminación.', 'La caída de la sociedad refleja nuestra propia codicia.', 'Los espejos son elementos comunes en las civilizaciones antiguas.', 'La avaricia ilumina el futuro de la sociedad.'], correct: 1, explanation: 'Es una metáfora que establece una relación directa entre la destrucción social y la codicia humana.', category: 'interpretacion' },
    { q: '[ICFES] El concepto de "banalidad del mal" de Hannah Arendt se evidencia cuando un personaje:', options: ['Comete crímenes por odio extremo.', 'Realiza actos atroces simplemente cumpliendo órdenes de la burocracia sin reflexionar.', 'Planifica meticulosamente la caída de su enemigo.', 'Nace con un defecto genético que lo hace malvado.'], correct: 1, explanation: 'Arendt define la banalidad del mal como la falta de pensamiento crítico y obediencia ciega.', category: 'filosofia' },
    { q: '[ICFES] En el mito de la caverna de Platón, las sombras representan:', options: ['El conocimiento absoluto.', 'Las ilusiones y la percepción engañosa de los sentidos.', 'La noche eterna.', 'La verdad revelada.'], correct: 1, explanation: 'Las sombras son apariencias engañosas que los prisioneros confunden con la realidad.', category: 'filosofia' }
  ],

  2: [ // Matemáticas - Nivel Avanzado ICFES
    { q: '[ICFES 2024] En un colegio, la probabilidad de que un estudiante juegue fútbol es 0.6. De los que juegan fútbol, el 30% también juega baloncesto. ¿Cuál es la probabilidad de que un estudiante elegido al azar juegue AMBOS deportes?', options: ['0.18', '0.9', '0.3', '0.5'], correct: 0, explanation: 'Se multiplican las probabilidades: 0.6 (fútbol) * 0.3 (baloncesto dado fútbol) = 0.18 (18%).', category: 'interpretacion' },
    { q: '[ICFES 2023] Se desea construir un cilindro con un volumen fijo de 1000 cm³. Para minimizar el costo del material, el radio "r" y la altura "h" deben cumplir:', options: ['La altura debe ser el doble del diámetro.', 'El diámetro de la base debe ser igual a la altura.', 'El radio debe ser igual a la altura.', 'La altura debe ser nula.'], correct: 1, explanation: 'En optimización, el área mínima para un volumen dado en un cilindro se logra cuando su diámetro (2r) es exactamente igual a su altura (h).', category: 'general' },
    { q: '[ICFES 2025] En un estudio demográfico, se modela el crecimiento de una bacteria con la ecuación P(t) = 500 * (2)^(t/3), donde t está en horas. ¿Cuántas horas deben pasar para que la población sea de 4000 bacterias?', options: ['3 horas', '6 horas', '9 horas', '12 horas'], correct: 2, explanation: '4000 = 500 * 2^(t/3) -> 8 = 2^(t/3) -> 2^3 = 2^(t/3) -> 3 = t/3 -> t = 9 horas.', category: 'literal' },
    { q: '[ICFES 2022] Un gráfico de dispersión muestra una correlación de r = -0.92 entre "Horas de redes sociales" y "Calificaciones". Esto indica que:', options: ['El uso de redes causa directamente malas notas.', 'No hay ninguna relación.', 'Existe una fuerte asociación estadística inversa: a más horas, tienden a bajar las notas.', 'Las notas son negativas.'], correct: 2, explanation: 'Un coeficiente cercano a -1 indica una fuerte correlación negativa.', category: 'interpretacion' },
    { q: '[ICFES 2021] Si sen(θ) = 3/5 y θ está en el primer cuadrante, el valor exacto de cos(θ) es:', options: ['4/5', '5/3', '2/5', '1'], correct: 0, explanation: 'Por identidad pitagórica: sen² + cos² = 1. (3/5)² = 9/25. 1 - 9/25 = 16/25. La raíz es 4/5.', category: 'literal' },
    { q: '[ICFES] En un modelo P(t) = P0 * e^(rt), si una población se duplica en 5 horas, el valor de r es:', options: ['ln(2) / 5', '5 / ln(2)', 'ln(5) / 2', '2 / 5'], correct: 0, explanation: '2 = e^(5r) -> ln(2) = 5r -> r = ln(2)/5.', category: 'algebra' },
    { q: '[ICFES] El área de un hexágono regular inscrito en una circunferencia de radio R es:', options: ['(3 * sqrt(3) * R^2) / 2', '3 * R^2', '6 * R^2', '(sqrt(3) * R^2) / 4'], correct: 0, explanation: 'Son 6 triángulos equiláteros de lado R. Área = 6 * (sqrt(3)*R^2)/4 = (3*sqrt(3)*R^2)/2.', category: 'geometria' },
    { q: '[ICFES] En una distribución normal, el porcentaje de datos dentro de una desviación estándar de la media es aproximadamente:', options: ['50%', '68%', '95%', '99.7%'], correct: 1, explanation: 'Regra empírica de la distribución normal: ~68% caen en (Media ± 1 DE).', category: 'estadistica' },
    { q: '[ICFES] La derivada de la función f(x) = x * ln(x) es:', options: ['ln(x)', '1/x', 'ln(x) + 1', 'x/ln(x)'], correct: 2, explanation: 'Regla del producto: (1)*ln(x) + x*(1/x) = ln(x) + 1.', category: 'calculo' },
    { q: '[ICFES] El valor de log_2(32) + log_3(1/9) es:', options: ['3', '5', '7', '1'], correct: 0, explanation: 'log_2(32) = 5 y log_3(1/9) = -2. 5 + (-2) = 3.', category: 'algebra' }
  ],

  3: [ // Sociales y Ciudadanas - Nivel Avanzado ICFES
    { q: '[ICFES 2024] En un municipio, el Alcalde decide construir una represa que inundará tierras indígenas. La Constitución de 1991 exige que el Estado debe obligatoriamente:', options: ['Pagarles el doble del valor de las tierras.', 'Realizar una Consulta Previa libre e informada con las comunidades afectadas.', 'Ignorar a la comunidad por el bien general.', 'Hacer un plebiscito nacional.'], correct: 1, explanation: 'La Consulta Previa es un derecho constitucional fundamental de grupos étnicos.', category: 'general' },
    { q: '[ICFES 2023] ¿Cuál fue una causa estructural económica del surgimiento de guerrillas en Colombia en los 60?', options: ['La influencia exclusiva de la Iglesia.', 'Una reforma agraria exitosa.', 'La alta concentración de la tierra y la exclusión del Frente Nacional.', 'El descubrimiento de oro.'], correct: 2, explanation: 'El latifundismo y la exclusión política fueron factores clave.', category: 'interpretacion' },
    { q: '[ICFES 2025] Frente a un conflicto entre el libre desarrollo de la personalidad y el manual de convivencia escolar, la Corte Constitucional falla que:', options: ['El colegio siempre tiene la razón.', 'El derecho constitucional prima sobre normas internas si no afecta el proceso educativo.', 'El estudiante debe ser expulsado.', 'El manual prima sobre la Constitución.'], correct: 1, explanation: 'La jurisprudencia protege el libre desarrollo de la personalidad frente a códigos de vestimenta o peinado.', category: 'interpretacion' },
    { q: '[ICFES 2022] La Revolución Francesa influyó en la independencia latinoamericana al:', options: ['Enviar tropas a América.', 'Implantar dictaduras.', 'Aportar el marco ideológico de soberanía popular, derechos y república.', 'Prohibir la esclavitud mundial.'], correct: 2, explanation: 'El pensamiento ilustrado sirvió de guía ideológica a los patriotas.', category: 'general' },
    { q: '[ICFES 2021] ¿Qué mecanismo constitucional se usa para anular una ley que contradice la Constitución?', options: ['Acción de Tutela.', 'Acción Popular.', 'Acción Pública de Inconstitucionalidad.', 'Derecho de Petición.'], correct: 2, explanation: 'Permite a cualquier ciudadano demandar leyes ante la Corte Constitucional.', category: 'general' },
    { q: '[ICFES] El periodo de "La Violencia" en Colombia se intensificó tras el asesinato en 1948 de:', options: ['Rafael Uribe Uribe.', 'Jorge Eliécer Gaitán.', 'Luis Carlos Galán.', 'Alfonso López Pumarejo.'], correct: 1, explanation: 'El Bogotazo tras la muerte de Gaitán desató una violencia bipartidista sin precedentes.', category: 'historia' },
    { q: '[ICFES] El mecanismo de participación para que el pueblo derogue una ley aprobada por el Congreso es:', options: ['Referendo derogatorio', 'Plebiscito', 'Consulta Popular', 'Cabildo Abierto'], correct: 0, explanation: 'El referendo derogatorio busca anular leyes vigentes.', category: 'constitucion' },
    { q: '[ICFES] Una inflación acelerada en un país perjudica principalmente a:', options: ['Grandes bancos.', 'Exportadores.', 'Asalariados y pensionados con ingresos fijos.', 'Inversionistas inmobiliarios.'], correct: 2, explanation: 'Quienes tienen ingresos fijos pierden capacidad de compra rápidamente.', category: 'economia' },
    { q: '[ICFES] La Doctrina Monroe ("América para los americanos") buscaba:', options: ['Fomentar la inmigración europea.', 'Rechazar intervenciones o reconquistas europeas en el continente.', 'Unir políticamente a Sudamérica.', 'Compartir tecnología militar.'], correct: 1, explanation: 'Fue una advertencia estadounidense contra la injerencia europea en América.', category: 'historia' },
    { q: '[ICFES] El control de constitucionalidad de las leyes en Colombia lo ejerce:', options: ['El Presidente.', 'El Congreso.', 'La Corte Constitucional.', 'La Fiscalía.'], correct: 2, explanation: 'La Corte Constitucional es el máximo órgano de guardia de la Carta Magna.', category: 'constitucion' }
  ],

  4: [ // Ciencias Naturales - Nivel Avanzado ICFES
    { q: '[ICFES 2024] En una reacción endotérmica en equilibrio (A + B + Calor ⇌ C + D), si se aumenta la temperatura:', options: ['El equilibrio va hacia la izquierda.', 'El equilibrio se desplaza a la derecha, favoreciendo C + D.', 'El sistema se congela.', 'No hay efecto.'], correct: 1, explanation: 'Según Le Chatelier, absorber el exceso de calor desplaza la reacción endotérmica hacia productos.', category: 'interpretacion' },
    { q: '[ICFES 2023] El uso indebido de antibióticos genera:', options: ['Pacientes inmunes.', 'Bacterias resistentes que sobreviven por selección natural.', 'Virus más fuertes.', 'Mutaciones celulares instantáneas.'], correct: 1, explanation: 'Las bacterias con mutaciones resistentes sobreviven y se multiplican.', category: 'interpretacion' },
    { q: '[ICFES 2025] Si un bloque desliza por un plano inclinado a velocidad constante, la fuerza neta sobre él es:', options: ['Cero porque la aceleración es cero.', 'Igual a la fricción únicamente.', 'Nula por ausencia de gravedad.', 'Mayor que el peso.'], correct: 0, explanation: 'Por 1ª Ley de Newton, a velocidad constante (a=0), la suma de fuerzas es cero.', category: 'literal' },
    { q: '[ICFES 2022] Una especie invasora sin depredadores naturales en un nuevo hábitat mostrará un crecimiento:', options: ['Lineal descendente.', 'Exponencial (curva en J).', 'Constante.', 'Logístico inmediato.'], correct: 1, explanation: 'Sin resistencia ambiental, la población crece exponencialmente.', category: 'interpretacion' },
    { q: '[ICFES 2021] La función principal de los ribosomas en la célula es:', options: ['Generar ATP.', 'Destruir virus.', 'Sintetizar proteínas a partir de ARN mensajero.', 'Almacenar agua.'], correct: 2, explanation: 'Los ribosomas traducen el código del ARNm en cadenas de aminoácidos.', category: 'general' },
    { q: '[ICFES] En la respiración celular aeróbica, la mayor cantidad de ATP se produce en:', options: ['La glucólisis.', 'El ciclo de Krebs.', 'La cadena de transporte de electrones en la mitocondria.', 'La fermentación.'], correct: 2, explanation: 'La fosforilación oxidativa mitocondrial genera más de 30 ATP por glucosa.', category: 'biologia' },
    { q: '[ICFES] Si un elemento del grupo IIA (+2) reacciona con uno del VIIA (-1), la fórmula resultante es:', options: ['XY', 'X2Y', 'XY2', 'X2Y3'], correct: 2, explanation: 'Equilibrio de cargas: X(+2) requiere dos Y(-1) -> XY2.', category: 'quimica' },
    { q: '[ICFES] Dos cargas eléctricas positivas se separan al doble de distancia. La fuerza de repulsión:', options: ['Se reduce a la mitad.', 'Se reduce a la cuarta parte.', 'Se duplica.', 'Se cuadruplica.'], correct: 1, explanation: 'Por Ley de Coulomb (F ∝ 1/r²), al duplicar r, la fuerza disminuye a 1/4.', category: 'fisica' },
    { q: '[ICFES] ¿Qué tipo de enlace otorga al agua su alto punto de ebullición y cohesión?', options: ['Iónico', 'Lass de London', 'Puentes de hidrógeno', 'Metálico'], correct: 2, explanation: 'La polaridad del agua permite fuertes interacciones por puentes de hidrógeno.', category: 'quimica' },
    { q: '[ICFES] Los virus no son considerados seres vivos autónomos porque:', options: ['No tienen ADN.', 'No tienen proteínas.', 'Requieren la maquinaria celular de un hospedero para replicarse.', 'Son invisibles.'], correct: 2, explanation: 'Son parásitos intracelulares obligados sin metabolismo propio.', category: 'biologia' }
  ],

  5: [ // Inglés - Nivel Avanzado ICFES
    { q: '[ICFES 2025] Where would you see: "UNATTENDED LUGGAGE WILL BE DESTROYED BY SECURITY"?', options: ['In a library.', 'At an international airport terminal.', 'In a kindergarten.', 'At a grocery store.'], correct: 1, explanation: 'Airport security measures require unattended luggage to be inspected or destroyed.', category: 'interpretacion' },
    { q: '[ICFES 2024] Complete: "If I had studied harder last year, I ___ at the university right now."', options: ['will be', 'would have been', 'would be', 'was'], correct: 2, explanation: 'Mixed conditional: Past condition + Present result (would be).', category: 'general' },
    { q: '[ICFES 2023] In "the startup secured unprecedented funding", "unprecedented" means:', options: ['Terrible.', 'Expected.', 'Never done before; exceptionally high.', 'Illegal.'], correct: 2, explanation: 'Unprecedented means without previous example.', category: 'interpretacion' },
    { q: '[ICFES 2022] Which sentence is in Passive Voice?', options: ['The novel was writing by Gabriel García Márquez.', 'The novel was written by Gabriel García Márquez.', 'The novel wrote Gabriel García Márquez.', 'Gabriel García Márquez is written the novel.'], correct: 1, explanation: 'Structure: Object + was + Past Participle.', category: 'literal' },
    { q: '[ICFES 2021] If a teacher says "It\'s getting quite noisy, isn\'t it?", she means:', options: ['Asking about acoustics.', 'Politely asking students to be quiet.', 'Complimenting noise.', 'Playing music.'], correct: 1, explanation: 'An indirect polite command to lower the volume.', category: 'interpretacion' },
    { q: '[ICFES] Complete: "If she _______ earlier, she would have caught the train."', options: ['leaves', 'left', 'had left', 'would leave'], correct: 2, explanation: 'Third conditional requires Past Perfect (had left).', category: 'grammar' },
    { q: '[ICFES] Which phrasal verb means "to postpone or delay"?', options: ['Put out', 'Put off', 'Call off', 'Bring up'], correct: 1, explanation: '"Put off" means to delay an event or meeting.', category: 'vocabulary' },
    { q: '[ICFES] In "the update aims to mitigate security flaws", "mitigate" means:', options: ['Destroy.', 'Increase.', 'Make less severe or harmful.', 'Ignore.'], correct: 2, explanation: 'Mitigate means to reduce severity or harm.', category: 'reading' },
    { q: '[ICFES] "A piece of cake" means:', options: ['Complicated.', 'A sweet dessert.', 'Something very easy to do.', 'A small portion.'], correct: 2, explanation: 'Common idiom meaning an easy task.', category: 'vocabulary' },
    { q: '[ICFES] "She is extremely good _______ solving complex equations."', options: ['in', 'at', 'on', 'for'], correct: 1, explanation: 'The preposition after "good" for skills is "at".', category: 'grammar' }
  ]
};

// Banco de preguntas para las pruebas de práctica por materia y categoría
export const PRACTICE_QUESTIONS = {
  1: { // Lectura Crítica
    literal: [
      { q: '[ICFES] En el texto "El estado gasta el 30% del presupuesto en educación", la información literal es:', options: ['El estado invierte en salud.', 'La educación no sirve.', 'Un 30% del dinero estatal se destina a educación.', 'Los profesores ganan poco.'], correct: 2, explanation: 'Es una paráfrasis explícita del texto.' },
      { q: '[ICFES] Según la cifra oficial del texto, ¿cuál es el porcentaje de población con estrés crónico?', options: ['15%', '25%', '35%', '50%'], correct: 1, explanation: 'Se menciona literalmente en el texto.' },
      { q: '[ICFES] ¿En qué año fue publicado el informe citado sobre el cambio climático en el artículo?', options: ['2020', '2023', '2015', '2010'], correct: 1, explanation: 'Es el dato de año que consta explícitamente.' }
    ],
    interpretacion: [
      { q: '[ICFES] Si el autor termina su ensayo diciendo "Nos encaminamos hacia un precipicio digital", su postura es de:', options: ['Optimismo absoluto.', 'Indiferencia.', 'Preocupación y alerta.', 'Apoyo incondicional.'], correct: 2, explanation: '"Precipicio" denota peligro e inquietud.' },
      { q: '[ICFES] "El rumor corrió como pólvora". Esta figura indica:', options: ['Lentitud.', 'Velocidad y capacidad expansiva.', 'Que hubo un incendio.', 'Que el rumor era falso.'], correct: 1, explanation: 'Símil de propagación veloz.' },
      { q: '[ICFES] La expresión "un gigante con pies de barro" aplicada a una economía sugiere que:', options: ['Es una potencia invencible.', 'Es grande y poderosa en apariencia, pero frágil en sus bases.', 'Está construida con materiales de construcción antiguos.', 'Produce muchas artesanías.'], correct: 1, explanation: 'Metáfora sobre la fragilidad oculta de algo grande.' }
    ],
    general: [
      { q: '[ICFES] Un texto que presenta premisas para llegar a una conclusión con el fin de persuadir al lector se denomina:', options: ['Descriptivo.', 'Argumentativo.', 'Lírico.', 'Informativo.'], correct: 1, explanation: 'La argumentación busca persuadir mediante razones.' },
      { q: '[ICFES] ¿Cuál es la función principal del conector "sin embargo" en un párrafo?', options: ['Agregar información similar.', 'Introducir una oposición o contraste con la idea anterior.', 'Concluir el escrito.', 'Ejemplificar un punto.'], correct: 1, explanation: 'Es un conector adversativo que señala contraste.' }
    ],
    filosofia: [
      { q: '[ICFES] Para Platón en el Mito de la Caverna, el sol representa:', options: ['La oscuridad del alma.', 'La Verdad Suprema y la Idea del Bien.', 'La ceguera física.', 'Un dios griego destructivo.'], correct: 1, explanation: 'El sol simboliza la luz de la verdad filosófica.' },
      { q: '[ICFES] El concepto de "banalidad del mal" de Hannah Arendt explica que las atrocidades ocurren por:', options: ['Malicia biológica.', 'Falta de reflexión crítica y obediencia irreflexiva al sistema.', 'Fuerzas sobrenaturales.', 'Odio personal.'], correct: 1, explanation: 'Arendt enfatiza la renuncia al pensamiento propio.' }
    ]
  },
  2: { // Matemáticas
    literal: [
      { q: '[ICFES] La ecuación de una parábola básica con vértice en el origen y que abre hacia arriba es:', options: ['y = x', 'y = x^3', 'y = x^2', 'y = -x^2'], correct: 2, explanation: 'y = x^2 abre hacia arriba.' },
      { q: '[ICFES] En la función lineal f(x) = 4x - 7, la pendiente "m" es:', options: ['-7', '4', '1/4', '0'], correct: 1, explanation: 'En y = mx + b, m es el coeficiente de x.' }
    ],
    interpretacion: [
      { q: '[ICFES] Si al lanzar dos dados se quiere obtener una suma de 7, ¿cuántas combinaciones favorables existen?', options: ['3', '6', '12', '1'], correct: 1, explanation: '(1,6),(2,5),(3,4),(4,3),(5,2),(6,1). Total 6.' },
      { q: '[ICFES] En un triángulo rectángulo con catetos de 3 cm y 4 cm, la hipotenusa mide:', options: ['5 cm', '7 cm', '1 cm', '25 cm'], correct: 0, explanation: 'sqrt(9 + 16) = sqrt(25) = 5.' }
    ],
    general: [
      { q: '[ICFES] En estadística, el dato central al ordenar la muestra de menor a mayor es:', options: ['La media.', 'La moda.', 'La mediana.', 'La varianza.'], correct: 2, explanation: 'Definición de mediana.' },
      { q: '[ICFES] El 25% de 800 equivale a:', options: ['100', '200', '400', '150'], correct: 1, explanation: '800 * 0.25 = 200.' }
    ],
    algebra: [
      { q: '[ICFES] La solución de 2x - 4 = 10 es:', options: ['x = 7', 'x = 3', 'x = 14', 'x = 5'], correct: 0, explanation: '2x = 14 -> x = 7.' },
      { q: '[ICFES] El valor de 2^4 * 2^3 es:', options: ['2^12', '2^7', '4^7', '2^1'], correct: 1, explanation: 'Se suman exponentes: 4 + 3 = 7 -> 2^7.' }
    ],
    geometria: [
      { q: '[ICFES] El perímetro de un cuadrado de área 36 cm² es:', options: ['24 cm', '36 cm', '12 cm', '18 cm'], correct: 0, explanation: 'Lado = sqrt(36) = 6 cm. Perímetro = 4 * 6 = 24 cm.' }
    ],
    estadistica: [
      { q: '[ICFES] Si la moda de un conjunto de datos es 8, significa que el 8 es:', options: ['El promedio de los datos.', 'El número más pequeño.', 'El dato que más veces se repite.', 'El dato del centro.'], correct: 2, explanation: 'La moda es el valor con mayor frecuencia absoluta.' }
    ],
    calculo: [
      { q: '[ICFES] La derivada de f(x) = x^3 es:', options: ['3x', '3x^2', 'x^2', 'x^4 / 4'], correct: 1, explanation: 'Regla de potencia: d/dx(x^n) = n*x^(n-1).' }
    ]
  },
  3: { // Sociales y Ciudadanas
    literal: [
      { q: '[ICFES] El acuerdo de Paz entre el Gobierno colombiano y las FARC se firmó en el año:', options: ['2012', '1991', '2016', '2020'], correct: 2, explanation: 'Firmado en 2016.' },
      { q: '[ICFES] ¿En qué año se promulgó la actual Constitución Política de Colombia?', options: ['1886', '1991', '1948', '2000'], correct: 1, explanation: 'Es la Constitución de 1991.' }
    ],
    interpretacion: [
      { q: '[ICFES] El aumento rápido del dólar en el país genera:', options: ['Importaciones más baratas.', 'Mayor costo de productos importados.', 'Deflación.', 'Viajes internacionales gratis.'], correct: 1, explanation: 'Si la moneda se devalúa, importar cuesta más.' },
      { q: '[ICFES] El sistema feudal medieval europeo se basaba en:', options: ['Bolsa de valores.', 'Industria.', 'Propiedad de la tierra y relación vasallaje.', 'Comercio digital.'], correct: 2, explanation: 'Tierra y vasallaje eran los pilares.' }
    ],
    general: [
      { q: '[ICFES] La rama del poder en Colombia encargada de ejecutar políticas públicas es:', options: ['Legislativa.', 'Ejecutiva.', 'Judicial.', 'Electoral.'], correct: 1, explanation: 'Presidida por el Ejecutivo.' },
      { q: '[ICFES] La separación de poderes busca principalmente:', options: ['Evitar la concentración del poder y los abusos autoritarios.', 'Aumentar los salarios públicos.', 'Hacer más lentas las leyes.', 'Eliminar las elecciones.'], correct: 0, explanation: 'Evita la tiranía garantizando pesos y contrapesos.' }
    ],
    historia: [
      { q: '[ICFES] El evento de 1948 que exacerbó la violencia bipartidista en Colombia fue:', options: ['La separación de Panamá.', 'El Bogotazo tras la muerte de Gaitán.', 'La Toma del Palacio de Justicia.', 'El paro agrario.'], correct: 1, explanation: 'El asesinato de Gaitán el 9 de abril de 1948 marcó el Bogotazo.' }
    ],
    constitucion: [
      { q: '[ICFES] La Acción de Tutela protege primordialmente:', options: ['Derechos de propiedad comercial.', 'Derechos fundamentales vulnerados de forma inminente.', 'Leyes aprobadas por el Congreso.', 'Impuestos estatales.'], correct: 1, explanation: 'Protege derechos fundamentales como la vida, salud, debido proceso.' }
    ],
    economia: [
      { q: '[ICFES] Si el Banco de la República sube las tasas de interés, su objetivo es:', options: ['Incentivar el endeudamiento.', 'Frenar la inflación desincentivando el consumo excesivo.', 'Aumentar las importaciones.', 'Reducir impuestos.'], correct: 1, explanation: 'Tasas altas encarecen el crédito y enfrían la inflación.' }
    ],
    geografia: [
      { q: '[ICFES] El fenómeno del "Niño" en Colombia genera:', options: ['Inundaciones constantes.', 'Sequías e incendios forestales por falta de lluvias.', 'Nevadas en la costa.', 'Terremotos.'], correct: 1, explanation: 'Asociado con déficit hídrico y sequía.' }
    ]
  },
  4: { // Ciencias Naturales
    literal: [
      { q: '[ICFES] La fórmula química del dióxido de carbono es:', options: ['CO', 'CO2', 'C2O', 'H2O'], correct: 1, explanation: 'Un átomo de carbono y dos de oxígeno.' },
      { q: '[ICFES] El símbolo químico del Sodio en la tabla periódica es:', options: ['So', 'Na', 'Sd', 'K'], correct: 1, explanation: 'Proviene del latín Natrium (Na).' }
    ],
    interpretacion: [
      { q: '[ICFES] Si conectas 3 bombillas en serie y una se funde:', options: ['Las demás brillan más.', 'Siguen igual.', 'Todas se apagan porque el circuito se interrumpe.', 'Explotan.'], correct: 2, explanation: 'En serie hay un solo camino eléctrico.' },
      { q: '[ICFES] Los glóbulos rojos maduros no hacen mitosis porque:', options: ['Son bacterias.', 'Carecen de núcleo celular y ADN.', 'Son muy rápidos.', 'No tienen agua.'], correct: 1, explanation: 'Pierden su núcleo para alojar más hemoglobina.' }
    ],
    general: [
      { q: '[ICFES] La Ley de Conservación de la Masa fue postulada por:', options: ['Newton.', 'Einstein.', 'Lavoisier.', 'Darwin.'], correct: 2, explanation: 'Lavoisier: La materia no se crea ni se destruye.' },
      { q: '[ICFES] La unidad de medida de la fuerza en el Sistema Internacional es:', options: ['Joule', 'Pascal', 'Newton', 'Watt'], correct: 2, explanation: 'El Newton (N = kg*m/s²).' }
    ],
    biologia: [
      { q: '[ICFES] El organelo encargado de la respiración celular y producción de ATP es:', options: ['El núcleo', 'La mitocondria', 'El aparato de Golgi', 'El lisosoma'], correct: 1, explanation: 'La mitocondria es la central energética celular.' }
    ],
    quimica: [
      { q: '[ICFES] Un pH menor a 7 indica una solución:', options: ['Neutra', 'Básica o alcalina', 'Ácida', 'Salina'], correct: 2, explanation: 'pH < 7 es ácido, pH = 7 neutro, pH > 7 básico.' }
    ],
    fisica: [
      { q: '[ICFES] La 1ª Ley de Newton establece que un cuerpo permanece en reposo o MRU a menos que:', options: ['Se le aplique calor.', 'Actúe sobre él una fuerza neta diferente de cero.', 'Cambie su masa.', 'Pase el tiempo.'], correct: 1, explanation: 'Principio de inercia.' }
    ]
  },
  5: { // Inglés
    literal: [
      { q: '[ICFES] Translation for "Medio ambiente":', options: ['Weather.', 'Environment.', 'Surroundings.', 'Ecosystem.'], correct: 1, explanation: '"Environment" es el término exacto.' },
      { q: '[ICFES] What is the past simple of the verb "go"?', options: ['Gone', 'Went', 'Going', 'Goes'], correct: 1, explanation: 'Go -> Went -> Gone.' }
    ],
    interpretacion: [
      { q: '[ICFES] "She was completely over the moon". This implies she was:', options: ['Studying astronomy.', 'Sad.', 'Extremely happy.', 'Sleeping.'], correct: 2, explanation: 'Idiom for immense happiness.' },
      { q: '[ICFES] If a waiter asks "Would you like room for dessert?", "room" means:', options: ['Hotel room.', 'Space in your stomach.', 'Money.', 'Chair.'], correct: 1, explanation: 'Capacity or space for food.' }
    ],
    general: [
      { q: '[ICFES] Grammar: "I ___ to London three times in my life."', options: ['have been', 'went', 'go', 'was going'], correct: 0, explanation: 'Present perfect for life experiences.' },
      { q: '[ICFES] Choose the opposite of "ancient":', options: ['Old', 'Historic', 'Modern', 'Traditional'], correct: 2, explanation: 'Modern is the direct antonym of ancient.' }
    ],
    grammar: [
      { q: '[ICFES] Select the correct option: "They _______ TV when I called."', options: ['were watching', 'watch', 'are watching', 'have watched'], correct: 0, explanation: 'Past continuous for an action in progress in the past.' }
    ],
    vocabulary: [
      { q: '[ICFES] What is a synonym for "huge"?', options: ['Tiny', 'Gigantic', 'Small', 'Narrow'], correct: 1, explanation: 'Gigantic means extremely huge.' }
    ],
    reading: [
      { q: '[ICFES] "The company announced a significant increase in sales." What does "significant" mean?', options: ['Small and minor', 'Important and noticeable', 'Zero', 'Negative'], correct: 1, explanation: 'Significant means noticeable or large in amount.' }
    ]
  }
};
