import React, { useContext, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { SUBJECTS } from '../utils/constants';

/**
 * @description Pantalla del calendario de progreso.
 * Muestra el progreso de exámenes de práctica por día con un código de colores semáforo.
 */
export const CalendarScreen = () => {
  const { practiceProgress, selectedCalendarDay, setSelectedCalendarDay, setScreen } = useContext(AppContext);
  const today = new Date();
  const [displayDate, setDisplayDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const currentMonth = displayDate.getMonth();
  const currentYear = displayDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday

  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => prevMonthDays - firstDayOfMonth + i + 1);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const totalCells = blanks.length + days.length;
  const nextBlanks = Array.from({ length: 42 - totalCells }, (_, i) => i + 1);

  const getDayColorClass = (day) => {
    const dateStr = `${currentYear}-${currentMonth + 1}-${day}`;
    const dayData = practiceProgress[dateStr];
    const isPastOrToday = new Date(currentYear, currentMonth, day) <= today;

    if (!isPastOrToday) return "bg-slate-50 text-slate-400 border-transparent";

    if (!dayData) {
      if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
        return "bg-white text-slate-600 border-2 border-red-300";
      }
      return "bg-red-500 text-white font-bold shadow-md shadow-red-200 border-transparent";
    }

    let totalCompleted = 0;
    SUBJECTS.forEach(sub => {
      if (dayData[sub.id]?.practice_1) totalCompleted++;
      if (dayData[sub.id]?.practice_2) totalCompleted++;
    });

    if (totalCompleted === 10) return "bg-emerald-500 text-white font-bold shadow-md shadow-emerald-200 border-transparent";
    if (totalCompleted >= 5) return "bg-yellow-400 text-yellow-900 font-bold shadow-md shadow-yellow-200 border-transparent";
    return "bg-red-500 text-white font-bold shadow-md shadow-red-200 border-transparent";
  };

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
            const bgClass = getDayColorClass(day);
            const dateStr = `${currentYear}-${currentMonth + 1}-${day}`;

            return (
              <div
                key={day}
                onClick={() => setSelectedCalendarDay(dateStr)}
                className={`h-10 rounded-xl flex items-center justify-center text-sm border cursor-pointer transition-all ${bgClass}`}
              >
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

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs font-medium text-slate-500">10 Pruebas Completadas (Excelente)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span className="text-xs font-medium text-slate-500">Mitad o más Completadas (Regular)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs font-medium text-slate-500">Pocas o Ninguna Completada (Critico)</span>
          </div>
        </div>
      </div>

      {selectedCalendarDay && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-sm p-6 relative shadow-2xl">
            <button onClick={() => setSelectedCalendarDay(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full">
              <X size={20} />
            </button>
            <h3 className="text-xl font-black text-slate-800 mb-6">Desempeño del Día</h3>
            <div className="space-y-3">
              {SUBJECTS.map(sub => {
                const dayData = practiceProgress[selectedCalendarDay]?.[sub.id] || {};
                return (
                  <div key={sub.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-${sub.color}-50 text-${sub.color}-500 flex items-center justify-center`}>
                        <sub.icon size={16} />
                      </div>
                      <span className="font-bold text-sm text-slate-700">{sub.name}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[10px] font-black uppercase ${dayData.practice_1 ? 'text-emerald-500' : 'text-slate-400'}`}>P1: {dayData.practice_1 ? 'Completado' : 'Pendiente'}</span>
                      <span className={`text-[10px] font-black uppercase ${dayData.practice_2 ? 'text-emerald-500' : 'text-slate-400'}`}>P2: {dayData.practice_2 ? 'Completado' : 'Pendiente'}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
