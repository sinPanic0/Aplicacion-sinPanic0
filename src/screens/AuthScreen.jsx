import React, { useState, useContext } from 'react';
import { Mail, Lock, ArrowRight, ChevronLeft, Loader2 } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { supabase } from '../lib/supabaseClient';

export const AuthScreen = () => {
  const { setScreen, setUserId } = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isLogin) {
        // Iniciar sesión
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        setUserId(data.user.id);
        localStorage.setItem('sinpanico_user_id', data.user.id);
        setScreen('home');
      } else {
        // Registro
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        
        if (data.user) {
          setUserId(data.user.id);
          localStorage.setItem('sinpanico_user_id', data.user.id);
          
          // Crear fila en perfiles si no existe
          await supabase.from('user_profiles').upsert([{ user_id: data.user.id }]);
          
          setScreen('onboarding');
        } else {
          setErrorMsg('Por favor revisa tu correo para confirmar la cuenta.');
        }
      }
    } catch (err) {
      setErrorMsg(err.message === 'Invalid login credentials' ? 'Correo o contraseña incorrectos' : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    setErrorMsg('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err) {
      console.error("Error en autenticación Google:", err);
      setErrorMsg(err.message || 'Error al conectar con Google. Verifica la configuración de la cuenta.');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 p-6 relative">
      <button onClick={() => setScreen('welcome')} className="absolute top-6 left-6 p-2.5 text-slate-400 hover:text-slate-600 bg-white rounded-full shadow-sm">
        <ChevronLeft size={24} />
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-sm w-full mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            {isLogin ? '¡Bienvenido de nuevo!' : 'Crea tu cuenta'}
          </h2>
          <p className="text-slate-500 font-medium">
            {isLogin ? 'Ingresa tus datos para continuar estudiando.' : 'Guarda tu progreso del ICFES de por vida.'}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 border border-red-100 text-center animate-shake">
            {errorMsg}
          </div>
        )}

        {/* Botón Iniciar Sesión / Registro con Google */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={googleLoading || loading}
          className="w-full py-4 px-4 bg-white border-2 border-slate-200 hover:border-emerald-500 text-slate-700 rounded-2xl font-black shadow-sm active:scale-95 transition-all flex items-center justify-center gap-3 mb-6 disabled:opacity-50"
        >
          {googleLoading ? (
            <Loader2 className="animate-spin text-emerald-600" size={22} />
          ) : (
            <>
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{isLogin ? 'Iniciar sesión con Google' : 'Registrarse con Google'}</span>
            </>
          )}
        </button>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-xs font-black text-slate-400 uppercase tracking-wider">o correo electrónico</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-200 p-4 pl-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-800"
                placeholder="tu@correo.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-slate-200 p-4 pl-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-800"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || googleLoading}
            className="w-full py-4 mt-6 bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-lg shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Ingresar' : 'Registrarse')}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <button 
          onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }} 
          className="mt-8 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors text-center"
        >
          {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    </div>
  );
};
