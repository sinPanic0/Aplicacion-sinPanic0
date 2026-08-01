import React, { useContext, useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Calendar as CalendarIcon, GraduationCap, Timer, Zap, ArrowRight, User } from 'lucide-react';
import { AppContext } from '../context/AppContext';

/**
 * @description Pantalla de configuración del estudio.
 * Permite seleccionar grado, fecha del examen e intensidad para personalizar el progreso.
 */
export const OnboardingScreen = () => {
  const { userProfile, setUserProfile, setScreen } = useContext(AppContext);
  const [calendarDate, setCalendarDate] = useState(new Date());

  const handleCalMonthChange = (delta) => {
    const newDate = new Date(calendarDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCalendarDate(newDate);
  };

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const handleMonthChange = (delta) => {
    setUserProfile(prev => {
      let newMonths = prev.timeLeftMonths + delta;
      if (newMonths < 1) newMonths = 1;
      if (newMonths > 12) newMonths = 12;
      
      // Ajustar intensidad sugerida
      let recommendedIntensity = prev.intensity;
      if (newMonths > 6) recommendedIntensity = 1;
      else if (newMonths > 3) recommendedIntensity = 2;
      else if (newMonths > 1) recommendedIntensity = 3;
      else recommendedIntensity = 4;

      return { ...prev, timeLeftMonths: newMonths, intensity: recommendedIntensity };
    });
  };

  const intensityLabels = {
    1: { title: 'Relajado', desc: '30 min a 1 hora diaria, ritmo suave' },
    2: { title: 'Medio', desc: '1 a 2 horas diarias, ritmo constante' },
    3: { title: 'Intensivo', desc: '2 a 3 horas diarias, enfoque profundo' },
    4: { title: 'Muy Intensivo', desc: '3+ horas diarias, máxima dedicación' }
  };

  return (
    <div className="p-6 pb-24 bg-[#fcfdfc] min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setScreen('welcome')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"><ChevronLeft size={24} /></button>
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-emerald-600" />
          <h2 className="text-base font-bold text-slate-800">SinPanic0</h2>
        </div>
      </div>
      
      <h2 className="text-3xl font-black text-slate-900 mb-2">Personaliza tu estudio</h2>
      <p className="text-slate-500 mb-8 text-sm">Ayúdanos a preparar el mejor camino para tu éxito académico.</p>

      {/* Nombre */}
      <div className="mb-8">
        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <User size={20} className="text-emerald-500" /> ¿Cómo te llamas?
        </h3>
        <input 
          type="text" 
          value={userProfile.fullName || ''}
          onChange={(e) => setUserProfile({...userProfile, fullName: e.target.value})}
          className="w-full p-4 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Tu nombre o apodo"
        />
      </div>

      {/* Fecha del examen */}
      <div className="mb-8">
        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <CalendarIcon size={20} className="text-emerald-500" /> ¿Cuándo presentarás tus pruebas?
        </h3>
        <div className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col items-center w-full">
          <div className="flex justify-between items-center w-full mb-4 px-2">
            <button onClick={() => handleCalMonthChange(-1)} className="text-emerald-500 p-2 hover:bg-emerald-50 rounded-full transition-colors"><ChevronLeft size={20}/></button>
            <span className="font-bold text-slate-800">{monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}</span>
            <button onClick={() => handleCalMonthChange(1)} className="text-emerald-500 p-2 hover:bg-emerald-50 rounded-full transition-colors"><ChevronRight size={20}/></button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 w-full text-center mb-2">
            {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => (
              <span key={d} className="text-[10px] font-black text-slate-400 uppercase">{d}</span>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-y-2 gap-x-1 w-full">
            {Array.from({ length: new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getDay() }).map((_, i) => (
              <div key={`b-${i}`} className="h-8"></div>
            ))}
            {Array.from({ length: new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate() }).map((_, i) => {
              const day = i + 1;
              const isSelected = userProfile.testDate && 
                               userProfile.testDate.getDate() === day && 
                               userProfile.testDate.getMonth() === calendarDate.getMonth() && 
                               userProfile.testDate.getFullYear() === calendarDate.getFullYear();
              
              return (
                <button 
                  key={day}
                  onClick={() => setUserProfile({...userProfile, testDate: new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day)})}
                  className={`h-8 w-8 mx-auto rounded-xl flex items-center justify-center text-sm font-bold transition-all ${isSelected ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Curso */}
      <div className="mb-8">
        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <GraduationCap size={20} className="text-emerald-500" /> ¿En qué curso estás actualmente?
        </h3>
        <select 
          value={userProfile.grade}
          onChange={(e) => setUserProfile({...userProfile, grade: e.target.value})}
          className="w-full p-4 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none"
        >
          <option value="10° Grado">10° Grado</option>
          <option value="11° Grado">11° Grado</option>
        </select>
      </div>

      {/* Tiempo faltante */}
      <div className="mb-8">
        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Timer size={20} className="text-emerald-500" /> ¿Cuánto tiempo te falta para el examen?
        </h3>
        <div className="flex gap-4">
          <div className="flex-1 bg-white border-2 border-emerald-500 rounded-[1.5rem] p-4 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-4">
              <button onClick={() => handleMonthChange(-1)} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-full"><ChevronLeft size={20}/></button>
              <span className="text-3xl font-black text-emerald-600">{userProfile.timeLeftMonths}</span>
              <button onClick={() => handleMonthChange(1)} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-full"><ChevronRight size={20}/></button>
            </div>
            <span className="text-xs text-slate-400 font-medium mt-1">Meses</span>
          </div>
          <div className="flex-1 bg-white border border-slate-100 rounded-[1.5rem] p-4 flex flex-col items-center justify-center shadow-sm">
            <span className="text-2xl font-bold text-slate-800">{userProfile.timeLeftMonths * 4}</span>
            <span className="text-xs text-slate-400 font-medium mt-1">Semanas</span>
          </div>
        </div>
      </div>

      {/* Tipo de estudio */}
      <div className="mb-8">
        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Zap size={20} className="text-emerald-500" /> ¿Qué tipo de estudio prefieres?
        </h3>
        <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
            <span>Relajado</span>
            <span>Muy Intensivo</span>
          </div>
          
          <div className="relative mb-6">
            <div className="h-2 bg-slate-100 rounded-full absolute top-1/2 -translate-y-1/2 left-0 right-0"></div>
            <div 
              className="h-2 bg-emerald-500 rounded-full absolute top-1/2 -translate-y-1/2 left-0 transition-all duration-300"
              style={{ width: `${((userProfile.intensity - 1) / 3) * 100}%` }}
            ></div>
            
            <div className="flex justify-between relative z-10">
              {[1, 2, 3, 4].map(level => (
                <button 
                  key={level}
                  onClick={() => setUserProfile({...userProfile, intensity: level})}
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${userProfile.intensity >= level ? 'bg-emerald-500 border-white shadow-md' : 'bg-white border-slate-200'}`}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <h4 className="font-bold text-emerald-600">{intensityLabels[userProfile.intensity].title}</h4>
            <p className="text-xs text-slate-500 mt-1 italic">"{intensityLabels[userProfile.intensity].desc}"</p>
          </div>
        </div>
      </div>

      <button onClick={() => setScreen('methods')} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black shadow-lg shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center gap-2">
        Continuar <ArrowRight size={20} />
      </button>
    </div>
  );
};
