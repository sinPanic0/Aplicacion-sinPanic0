import React, { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AppProvider } from './context/AppContext';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF4EE] dark:bg-[#18110C] text-[#3C2415] dark:text-[#F5EBE1] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="bg-white dark:bg-[#241A12] border-2 border-[#D9531E] p-8 rounded-3xl max-w-md w-full shadow-2xl">
            <div className="w-16 h-16 bg-[#D9531E]/10 text-[#D9531E] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black">
              ⚠️
            </div>
            <h2 className="text-xl font-black mb-2">¡Ups! Algo inesperado ocurrió</h2>
            <p className="text-xs text-[#7C5E47] dark:text-[#D2B49A] mb-6 font-semibold leading-relaxed">
              La aplicación se ha autorecuperado. Haz clic en el botón para recargarla normalmente.
            </p>
            <button
              onClick={() => {
                localStorage.removeItem('sinpanico_screen');
                window.location.href = '/';
              }}
              className="w-full py-3.5 bg-[#D9531E] hover:bg-[#C84B1A] text-white font-black rounded-2xl shadow-md transition-all text-sm"
            >
              Reiniciar Aplicación
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  </StrictMode>,
);
