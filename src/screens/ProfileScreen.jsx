import React, { useContext, useState, useEffect } from 'react';
import { Settings, Info, LogOut, User, Flame, Clock, ChevronRight, Brain, Calendar as CalendarIcon, Lock, Mail, Key } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { STUDY_METHODS } from '../utils/constants';
import { supabase } from '../lib/supabaseClient';

/**
 * @description Pantalla de perfil de usuario.
 * Muestra información del usuario, rachas, y permite navegar a configuraciones.
 */
export const ProfileScreen = () => {
  const { userProfile, setUserProfile, selectedMethod, setScreen, userId } = useContext(AppContext);
  const [showSettings, setShowSettings] = useState(false);
  const [personalInfoView, setPersonalInfoView] = useState('none'); // 'none', 'auth', 'view'
  const [userEmail, setUserEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserEmail(user.email);
    });
  }, []);

  const handleUnlock = async () => {
    setAuthError('');
    if (!authPassword) return setAuthError('Ingresa tu contraseña.');
    const { error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: authPassword
    });
    if (error) {
      setAuthError('Contraseña incorrecta.');
    } else {
      setPersonalInfoView('view');
      setAuthPassword('');
    }
  };

  const handleChangePassword = async () => {
    setAuthError('');
    setPasswordSuccess(false);
    if (newPassword.length < 6) return setAuthError('Mínimo 6 caracteres.');
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setAuthError(error.message);
    } else {
      setPasswordSuccess(true);
      setNewPassword('');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setScreen('welcome');
  };

  return (
    <div className="p-6 pb-32 bg-[#fcfdfc] min-h-screen relative">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-slate-900">Perfil</h2>
        <button onClick={() => setShowSettings(!showSettings)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Settings size={24} />
        </button>
      </header>

      {showSettings && (
        <div className="absolute top-20 right-6 bg-white border border-slate-100 shadow-xl rounded-2xl p-2 z-50 w-48 animate-in fade-in slide-in-from-top-2">
          <button className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-3">
            <Info size={16} className="text-emerald-500" /> Ayuda / Reseñas
          </button>
          <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-3 mt-1">
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      )}

      <div className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 rounded-full bg-emerald-100 border-4 border-white shadow-md flex items-center justify-center mb-4 relative">
          <User size={40} className="text-emerald-500" />
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 text-white rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-xs font-bold">{userProfile.grade.substring(0, 3)}</span>
          </div>
        </div>
        <h2 className="text-2xl font-black text-slate-800">{userProfile.fullName || `User_${userId ? userId.substring(0, 5).toUpperCase() : 'Guest'}`}</h2>
        <p className="text-emerald-600 font-bold text-sm">Meta: 450+ puntos</p>
        <p className="text-slate-400 text-xs mt-1">Nivel: Avanzado</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <Flame size={28} className="text-orange-500 mb-2" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Racha</span>
          <span className="text-2xl font-black text-slate-800">{userProfile.streak} Días</span>
        </div>
        <div className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <Clock size={28} className="text-blue-500 mb-2" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total</span>
          <span className="text-2xl font-black text-slate-800">{userProfile.totalHoursStudied}h</span>
        </div>
      </div>

      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Configuración de cuenta</h3>
      <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <button onClick={() => setPersonalInfoView('auth')} className="w-full p-5 flex items-center justify-between border-b border-slate-50 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center"><User size={20}/></div>
            <span className="font-bold text-slate-700">Información Personal</span>
          </div>
          <ChevronRight size={20} className="text-slate-300" />
        </button>
        <button onClick={() => setScreen('methods')} className="w-full p-5 flex items-center justify-between border-b border-slate-50 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center"><Brain size={20}/></div>
            <div className="text-left">
              <span className="font-bold text-slate-700 block">Método de Estudio</span>
              <span className="text-xs text-slate-400">{STUDY_METHODS.find(m => m.id === selectedMethod)?.title}</span>
            </div>
          </div>
          <ChevronRight size={20} className="text-slate-300" />
        </button>
        <button onClick={() => setScreen('calendar')} className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center"><CalendarIcon size={20}/></div>
            <span className="font-bold text-slate-700">Preferencias de Calendario</span>
          </div>
          <ChevronRight size={20} className="text-slate-300" />
        </button>
      </div>

      {/* MODAL DE SEGURIDAD PARA INFORMACIÓN PERSONAL */}
      {personalInfoView !== 'none' && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-6 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95">
            {personalInfoView === 'auth' ? (
              <>
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><Lock size={32} /></div>
                <h3 className="text-xl font-black text-slate-900 text-center mb-2">Área Segura</h3>
                <p className="text-sm text-slate-500 text-center mb-6">Por tu seguridad, ingresa tu contraseña actual para ver tu información personal.</p>
                <input 
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Tu contraseña actual"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-2 focus:ring-2 focus:ring-red-500 outline-none"
                />
                {authError && <p className="text-red-500 text-xs font-bold mb-4">{authError}</p>}
                <div className="flex gap-3 mt-6">
                  <button onClick={() => {setPersonalInfoView('none'); setAuthError('');}} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl">Cancelar</button>
                  <button onClick={handleUnlock} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-200">Desbloquear</button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black text-slate-900">Tu Información</h3>
                  <button onClick={() => {setPersonalInfoView('none'); setPasswordSuccess(false); setAuthError('');}} className="text-slate-400 hover:text-slate-600 font-bold">X</button>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-1"><User size={14}/> Nombre</label>
                    <div className="p-3 bg-slate-50 rounded-xl font-medium text-slate-800">{userProfile.fullName || 'No especificado'}</div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-1"><Mail size={14}/> Correo</label>
                    <div className="p-3 bg-slate-50 rounded-xl font-medium text-slate-800">{userEmail}</div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-4"><Key size={18} className="text-orange-500"/> Cambiar Contraseña</h4>
                  <input 
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nueva contraseña"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  {authError && <p className="text-red-500 text-xs font-bold mb-2">{authError}</p>}
                  {passwordSuccess && <p className="text-green-500 text-xs font-bold mb-2">¡Contraseña actualizada exitosamente!</p>}
                  <button onClick={handleChangePassword} className="w-full py-3 mt-2 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-200 active:scale-95 transition-all">
                    Actualizar Contraseña
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
