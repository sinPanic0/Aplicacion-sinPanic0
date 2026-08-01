-- ==========================================
-- SCRIPT DE BASE DE DATOS PARA SINPANIC0
-- Cópialo y pégalo en el SQL Editor de Supabase
-- ==========================================

-- 1. Tabla de Perfiles de Usuario
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT,
  grade TEXT NOT NULL DEFAULT '11° Grado',
  test_date DATE,
  time_left_months INTEGER DEFAULT 3,
  intensity INTEGER DEFAULT 3,
  selected_method TEXT DEFAULT 'active',
  total_hours_studied NUMERIC DEFAULT 0,
  streak INTEGER DEFAULT 0,
  language TEXT NOT NULL DEFAULT 'es',
  dark_mode BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Tabla de Progreso de Diagnósticos
CREATE TABLE user_diagnostics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  subject_id INTEGER NOT NULL,
  completed BOOLEAN DEFAULT false,
  score INTEGER DEFAULT 0,
  failed_categories TEXT[] DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, subject_id)
);

-- 3. Tabla de Prácticas Diarias (Calendario)
CREATE TABLE practice_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  practice_date DATE NOT NULL,
  subject_id INTEGER NOT NULL,
  practice_1_completed BOOLEAN DEFAULT false,
  practice_2_completed BOOLEAN DEFAULT false,
  score INTEGER DEFAULT 0,
  UNIQUE(user_id, practice_date, subject_id)
);

-- ==========================================
-- Políticas de Seguridad (RLS)
-- Permitimos lectura/escritura anónima temporalmente para desarrollo
-- ==========================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_diagnostics ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir todo a anónimos en user_profiles" ON user_profiles FOR ALL USING (true);
CREATE POLICY "Permitir todo a anónimos en user_diagnostics" ON user_diagnostics FOR ALL USING (true);
CREATE POLICY "Permitir todo a anónimos en practice_logs" ON practice_logs FOR ALL USING (true);

-- ==========================================
-- MIGRACIÓN DE ACTUALIZACIÓN:
-- Ejecuta estas líneas en tu SQL Editor de Supabase si ya tienes las tablas creadas
-- ==========================================
-- ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'es';
-- ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS dark_mode BOOLEAN NOT NULL DEFAULT false;
