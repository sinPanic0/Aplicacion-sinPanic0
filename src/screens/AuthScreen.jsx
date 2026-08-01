import React, { useState, useContext } from 'react';
import { Mail, Lock, ArrowRight, ChevronLeft, Loader2 } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { supabase } from '../lib/supabaseClient';

export const AuthScreen = () => {
  const { setScreen, setUserId } = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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
          
          // Crear fila en perfiles
          await supabase.from('user_profiles').insert([{ user_id: data.user.id }]);
          
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

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 p-6 relative">
      <button onClick={() => setScreen('welcome')} className="absolute top-6 left-6 p-2 text-slate-400 hover:text-slate-600 bg-white rounded-full shadow-sm">
        <ChevronLeft size={24} />
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-sm w-full mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            {isLogin ? '¡Bienvenido de nuevo!' : 'Crea tu cuenta'}
          </h2>
          <p className="text-slate-500 font-medium">
            {isLogin ? 'Ingresa tus datos para continuar estudiando.' : 'Guarda tu progreso de por vida.'}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 border border-red-100 text-center">
            {errorMsg}
          </div>
        )}

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
                className="w-full bg-white border border-slate-200 p-4 pl-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
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
                className="w-full bg-white border border-slate-200 p-4 pl-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-6 bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-lg shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Ingresar' : 'Registrarse')}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <button 
          onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }} 
          className="mt-8 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors"
        >
          {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    </div>
  );
};
