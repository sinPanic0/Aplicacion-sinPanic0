import React, { useContext } from 'react';
import { BookOpen, Calendar as CalendarIcon, BarChart2, User } from 'lucide-react';
import { AppContext } from '../context/AppContext';

/**
 * @description Barra de navegación inferior principal.
 * Se muestra en las pantallas principales (Home, Calendario, Progreso, Perfil).
 */
export const BottomNav = () => {
  const { screen, setScreen } = useContext(AppContext);

  return (
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
};
