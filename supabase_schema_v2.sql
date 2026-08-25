-- ==========================================
-- SCRIPT DE ACTUALIZACIÓN DE BASE DE DATOS PARA SINPANIC0 (V2)
-- ==========================================

-- 4. Tabla del Banco de Preguntas (ICFES 2020-2025)
CREATE TABLE questions_bank (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_index INTEGER NOT NULL,
  explanation TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT DEFAULT 'hard',
  year INTEGER NOT NULL
);

-- 5. Tabla de Historial de Preguntas por Usuario (para evitar repeticiones)
CREATE TABLE user_question_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions_bank(id) ON DELETE CASCADE,
  is_correct BOOLEAN NOT NULL,
  answered_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, question_id)
);

-- ==========================================
-- Políticas de Seguridad (RLS)
-- ==========================================

ALTER TABLE questions_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_question_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura a anónimos en questions_bank" ON questions_bank FOR SELECT USING (true);
CREATE POLICY "Permitir todo a anónimos en user_question_history" ON user_question_history FOR ALL USING (true);

-- ==========================================
-- DATOS SEMILLA: Preguntas tipo ICFES (Difíciles 2020-2025)
-- ==========================================

-- LECTURA CRÍTICA (subject_id = 1)
INSERT INTO questions_bank (subject_id, question_text, options, correct_index, explanation, category, difficulty, year) VALUES
(1, '[ICFES 2024] En un ensayo filosófico contemporáneo, el autor expresa: "La inmediatez de las redes sociales ha disuelto la contemplación profunda, transformando el conocimiento en un mero flujo de datos consumibles". La tesis central del autor asume implícitamente que:', '["El conocimiento genuino requiere de tiempo y reflexión.", "Las redes sociales son la única fuente válida de datos.", "La contemplación profunda es innecesaria en la era digital.", "El flujo de datos impide cualquier tipo de aprendizaje."]'::jsonb, 0, 'La crítica a la inmediatez y el contraste con la "contemplación profunda" implica que para el autor, el verdadero conocimiento requiere de esta reflexión pausada que se está perdiendo.', 'interpretacion', 'hard', 2024),
(1, '[ICFES 2025] "El laberinto burocrático de nuestras instituciones es un monstruo de mil cabezas que devora la esperanza del ciudadano de a pie". La figura literaria empleada y su propósito son:', '["Metáfora, para ilustrar lo invencible y destructivo que resulta el sistema administrativo para la gente.", "Hipérbole, para demostrar que los ciudadanos siempre mueren en las instituciones.", "Símil, para comparar al ciudadano con un laberinto.", "Personificación, para darle vida propia a la esperanza."]'::jsonb, 0, 'Se utiliza una metáfora (monstruo de mil cabezas) para representar la complejidad destructiva y paralizante de la burocracia.', 'literal', 'hard', 2025),
(1, '[ICFES 2023] Si un líder argumenta: "No podemos confiar en el informe del científico sobre el clima porque él fue multado por exceso de velocidad el mes pasado", está incurriendo en una falacia:', '["Ad ignorantiam", "Ad hominem", "Falso dilema", "Hombre de paja"]'::jsonb, 1, 'Ataca las características personales o acciones del emisor (la multa) que no tienen relación lógica con la validez de su argumento científico.', 'general', 'hard', 2023);

-- MATEMÁTICAS (subject_id = 2)
INSERT INTO questions_bank (subject_id, question_text, options, correct_index, explanation, category, difficulty, year) VALUES
(2, '[ICFES 2024] Un modelo financiero indica que la deuda de una empresa crece según D(t) = 5000 * e^(0.1t), con t en años. Un economista afirma que la deuda se duplicará exactamente en 10 años. Esto es:', '["Falso, porque e^(1) es aproximadamente 2.71, lo cual es mayor a 2, por lo que se duplicará en menos tiempo.", "Cierto, porque 10 * 0.1 = 1.", "Falso, porque la deuda disminuye con el tiempo.", "Cierto, porque 5000 * 2 = 10000."]'::jsonb, 0, 'Para que D(t) sea 10000, se necesita e^(0.1t) = 2. Sabemos que ln(2) es aprox 0.693. Así, 0.1t = 0.693, t = 6.93 años, no 10. En t=10, e^1 = 2.71, la deuda sería 13591.', 'interpretacion', 'hard', 2024),
(2, '[ICFES 2025] En un torneo, un equipo tiene una probabilidad de 0.7 de ganar en casa y 0.4 de ganar de visitante. Si juegan 2 partidos en casa y 1 de visitante de manera independiente, la probabilidad de que ganen LOS TRES partidos es:', '["1.8", "0.196", "0.28", "0.112"]'::jsonb, 1, 'Al ser eventos independientes, se multiplican las probabilidades: 0.7 * 0.7 * 0.4 = 0.49 * 0.4 = 0.196.', 'literal', 'hard', 2025),
(2, '[ICFES 2022] Se construye un cono inscrito perfectamente dentro de un cilindro de radio R y altura H. La razón entre el volumen del espacio vacío (el volumen del cilindro que no ocupa el cono) y el volumen del cono es:', '["1:1", "2:1", "3:1", "1:3"]'::jsonb, 1, 'El volumen del cilindro es V = π*R²*H. El del cono es (1/3)*π*R²*H. El espacio vacío es V - (1/3)V = (2/3)V. La relación vacío a cono es (2/3)V / (1/3)V = 2:1.', 'general', 'hard', 2022);

-- SOCIALES Y CIUDADANAS (subject_id = 3)
INSERT INTO questions_bank (subject_id, question_text, options, correct_index, explanation, category, difficulty, year) VALUES
(3, '[ICFES 2025] Frente a un paro nacional, el gobierno invoca el Estado de Conmoción Interior. Según la Constitución de 1991, este estado excepcional NO autoriza al presidente a:', '["Restringir el derecho de tránsito y reunión pacífica temporalmente.", "Emitir decretos con fuerza de ley que suspendan temporalmente leyes incompatibles.", "Suspender los derechos humanos fundamentales y el derecho internacional humanitario.", "Asumir control sobre las fuerzas de policía de gobernadores y alcaldes."]'::jsonb, 2, 'El Artículo 214 de la Constitución establece explícitamente que en los Estados de Excepción NO podrán suspenderse los derechos humanos ni las libertades fundamentales.', 'general', 'hard', 2025),
(3, '[ICFES 2024] Durante el periodo de "La Violencia" (1948-1958) en Colombia, el fenómeno del despojo de tierras resultó en:', '["Una distribución más equitativa de la riqueza rural al desplazar a los latifundistas.", "Un aumento sin precedentes de la migración campo-ciudad y una profunda reconcentración de la propiedad agraria.", "La eliminación completa de los conflictos partidistas tradicionales.", "El fin definitivo de los grupos armados en el territorio nacional."]'::jsonb, 1, 'La Violencia provocó un desplazamiento forzado masivo hacia las ciudades, mientras que las tierras abandonadas fueron apropiadas por terratenientes, agravando la desigualdad.', 'interpretacion', 'hard', 2024),
(3, '[ICFES 2023] En el diseño de una política ambiental local, choca el interés de una gran multinacional minera que promete miles de empleos y el de una comunidad afrodescendiente que protege un río sagrado. Desde una perspectiva de Justicia Ambiental, se debe:', '["Priorizar el crecimiento del PIB nacional por encima de la cosmovisión local.", "Desplazar a la comunidad asegurándoles una indemnización alta sin consultarlos.", "Garantizar la participación efectiva de la comunidad mediante Consulta Previa y proteger sus derechos bioculturales.", "Prohibir la minería en todo el territorio nacional de forma absoluta."]'::jsonb, 2, 'La justicia ambiental en Colombia (y según convenios de la OIT) exige que las minorías étnicas participen en las decisiones y se respete su territorio y cultura.', 'literal', 'hard', 2023);

-- CIENCIAS NATURALES (subject_id = 4)
INSERT INTO questions_bank (subject_id, question_text, options, correct_index, explanation, category, difficulty, year) VALUES
(4, '[ICFES 2024] En la respiración celular, la inhibición irreversible del complejo citocromo c oxidasa (ej. por envenenamiento con cianuro) en la cadena de transporte de electrones provocará inmediatamente:', '["Un incremento en la producción de ATP.", "La detención del consumo de oxígeno y la caída drástica en la producción mitocondrial de ATP.", "Que la célula cambie a fotosíntesis.", "La replicación descontrolada del ADN celular."]'::jsonb, 1, 'El cianuro bloquea el aceptor final de electrones en la mitocondria. Sin esto, el gradiente de protones colapsa, no hay síntesis de ATP aeróbico y el consumo de oxígeno se detiene.', 'interpretacion', 'hard', 2024),
(4, '[ICFES 2025] Un objeto se lanza verticalmente hacia arriba con una velocidad inicial V. En el punto más alto de su trayectoria parabólica/vertical, es correcto afirmar que:', '["Su velocidad y su aceleración son nulas.", "Su velocidad es máxima y su aceleración es cero.", "Su velocidad es nula y su aceleración es igual a la aceleración de la gravedad (-g).", "La fuerza neta sobre el objeto es cero."]'::jsonb, 2, 'En el punto máximo la velocidad es instantáneamente 0 m/s, pero la aceleración sigue siendo la gravedad (aprox 9.8 m/s²) apuntando hacia abajo; por ello cambia de dirección.', 'literal', 'hard', 2025),
(4, '[ICFES 2023] Dos isótopos de un elemento X difieren únicamente en:', '["El número de protones en su núcleo.", "Su electronegatividad química.", "El número de neutrones, lo que afecta su masa atómica pero no su comportamiento químico principal.", "Su posición en la tabla periódica."]'::jsonb, 2, 'Los isótopos tienen el mismo número atómico (protones) por lo que son el mismo elemento químico, pero varían en el número de neutrones (diferente masa).', 'general', 'hard', 2023);

-- INGLÉS (subject_id = 5)
INSERT INTO questions_bank (subject_id, question_text, options, correct_index, explanation, category, difficulty, year) VALUES
(5, '[ICFES 2025] Pragmatics & Idioms: During a difficult project, a colleague says: "Let’s cross that bridge when we come to it." They mean:', '["We need to build a literal bridge to solve the issue.", "We should deal with the problem later, only if it actually happens.", "We are avoiding the problem entirely and giving up.", "We should solve all future problems right now."]'::jsonb, 1, 'The idiom means not to worry about a possible future problem until it actually becomes a reality.', 'interpretacion', 'hard', 2025),
(5, '[ICFES 2024] Grammar (Inversion): Which of the following sentences correctly uses inversion for emphasis?', '["Hardly I had walked in when the phone rang.", "Never I have seen such a beautiful sunset.", "Not only did she win the race, but she also broke the world record.", "Seldom he visits his grandparents."]'::jsonb, 2, 'After negative or limiting adverbs (Not only, Hardly, Never, Seldom) at the beginning of a sentence, auxiliary inversion is required (did she win).', 'literal', 'hard', 2024),
(5, '[ICFES 2023] Reading Comprehension: "The company’s decision to lay off a third of its workforce was met with vociferous opposition from the labor union." In this context, "vociferous" is closest in meaning to:', '["Silent and peaceful", "Loud, vehement, and forceful", "Logical and rational", "Indifferent"]'::jsonb, 1, '"Vociferous" describes someone expressing their opinions or complaints loudly and forcefully.', 'general', 'hard', 2023);

-- ==========================================
-- ACTUALIZACIÓN DE ESQUEMA V2:
-- Ejecuta estas líneas en tu SQL Editor de Supabase si ya tienes las tablas creadas
-- ==========================================
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'es';
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS dark_mode BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS knowledge_points NUMERIC DEFAULT 0;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS daily_points NUMERIC DEFAULT 0;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS last_points_date TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS daily_active_minutes INTEGER DEFAULT 0;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS last_active_date TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS pet_name TEXT DEFAULT 'Chigüiro Sabio';
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS pet_equipped JSONB DEFAULT '{"hat": "hat_grad"}'::jsonb;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS pet_purchased JSONB DEFAULT '["hat_grad"]'::jsonb;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS profile_pic TEXT;


