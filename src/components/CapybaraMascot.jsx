import React, { useState } from 'react';
import { Heart, Sparkles, Smile } from 'lucide-react';

/**
 * @description Componente del Chigüiro (Capybara) Mascota Interactivo en SVG.
 * Renderiza el cuerpo base del Chigüiro y capas dinámicas para sombreros, gafas, ropa y accesorios.
 */
export const CapybaraMascot = ({ equippedItems = {}, size = 'md', onClick, interactive = true }) => {
  const [isBouncing, setIsBouncing] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState(null);

  const messages = [
    "¡Sigue estudiando! ¡Vamos por ese 450+ en el ICFES! 🚀",
    "¡Me encanta mi outfit! Gracias por tus puntos KP 🐾",
    "¡Amo el café colombiano por las mañanas! ☕",
    "¡Haz otro simulacro y compramos más accesorios! 🎓",
    "¡Sin pánico, tú puedes con este examen! ❤️",
    "¡Orgullo estudiantil colombiano! 🇨🇴"
  ];

  const handleTap = (e) => {
    if (!interactive) return;
    if (onClick) onClick(e);
    setIsBouncing(true);
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setBubbleMessage(randomMsg);
    setTimeout(() => setIsBouncing(false), 500);
    setTimeout(() => setBubbleMessage(null), 3500);
  };

  const dimensionClass = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-52 h-52',
    xl: 'w-64 h-64'
  }[size] || 'w-36 h-36';

  return (
    <div className="relative flex flex-col items-center justify-center select-none group">
      {/* Mensaje de diálogo flotante */}
      {bubbleMessage && (
        <div className="absolute -top-12 z-30 bg-white dark:bg-[#241A12] border-2 border-[#D9531E] px-3.5 py-1.5 rounded-2xl shadow-xl animate-bounce text-[11px] font-black text-[#3C2415] dark:text-[#F5EBE1] whitespace-nowrap">
          {bubbleMessage}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-[#241A12] border-r-2 border-b-2 border-[#D9531E] transform rotate-45"></div>
        </div>
      )}

      <div
        onClick={handleTap}
        className={`${dimensionClass} relative cursor-pointer transition-transform duration-300 ${
          isBouncing ? 'scale-110 -rotate-3' : 'hover:scale-105'
        }`}
      >
        {/* SVG CHIGÜIRO BASE Y CAPAS */}
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Sombras inferiores */}
          <ellipse cx="100" cy="180" rx="65" ry="12" fill="rgba(0,0,0,0.15)" />

          {/* Orejas de Chigüiro */}
          <ellipse cx="62" cy="72" rx="14" ry="18" fill="#8D5524" transform="rotate(-15 62 72)" />
          <ellipse cx="62" cy="72" rx="8" ry="11" fill="#C58C58" transform="rotate(-15 62 72)" />

          <ellipse cx="138" cy="72" rx="14" ry="18" fill="#8D5524" transform="rotate(15 138 72)" />
          <ellipse cx="138" cy="72" rx="8" ry="11" fill="#C58C58" transform="rotate(15 138 72)" />

          {/* Cuerpo principal */}
          <path
            d="M 50 140 C 40 100, 60 70, 100 68 C 140 70, 160 100, 150 140 C 155 170, 45 170, 50 140 Z"
            fill="#B06D3B"
          />

          {/* Cabeza Chigüiro (Forma característica cuadrada y tierna) */}
          <rect x="58" y="70" width="84" height="75" rx="36" fill="#B06D3B" />
          <path d="M 68 85 C 68 75, 132 75, 132 85 L 128 125 C 128 140, 72 140, 72 125 Z" fill="#965B2D" />

          {/* Hocico de Capybara */}
          <ellipse cx="100" cy="120" rx="26" ry="18" fill="#6A3B18" />
          {/* Narina característica (forma de T corta) */}
          <ellipse cx="94" cy="115" rx="3" ry="5" fill="#3D200B" />
          <ellipse cx="106" cy="115" rx="3" ry="5" fill="#3D200B" />
          <path d="M 94 122 Q 100 126 106 122" stroke="#3D200B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Ojos adorables */}
          <ellipse cx="78" cy="96" rx="5" ry="6" fill="#241408" />
          <circle cx="76.5" cy="94" r="2" fill="#FFFFFF" />

          <ellipse cx="122" cy="96" rx="5" ry="6" fill="#241408" />
          <circle cx="120.5" cy="94" r="2" fill="#FFFFFF" />

          {/* Cachetitos sonrosados */}
          <ellipse cx="70" cy="110" rx="8" ry="5" fill="#E8887D" opacity="0.6" />
          <ellipse cx="130" cy="110" rx="8" ry="5" fill="#E8887D" opacity="0.6" />

          {/* -------------------------------------------------------- */}
          {/* OVERLAY: ROPA / OUTFIT */}
          {/* -------------------------------------------------------- */}
          {equippedItems.outfit === 'outfit_jacket' && (
            /* Chaqueta Universitaria */
            <g>
              <path d="M 52 135 C 50 160, 150 160, 148 135 L 140 170 L 60 170 Z" fill="#D9531E" />
              <path d="M 90 135 L 100 170 L 110 135" stroke="#FFFFFF" strokeWidth="3" fill="none" />
              <circle cx="76" cy="150" r="4" fill="#FFFFFF" />
            </g>
          )}

          {equippedItems.outfit === 'outfit_shirt' && (
            /* Camiseta de Selección Colombia */
            <g>
              <path d="M 55 135 C 50 160, 150 160, 145 135 L 140 170 L 60 170 Z" fill="#F4C430" />
              <rect x="60" y="162" width="80" height="4" fill="#003893" />
              <rect x="60" y="166" width="80" height="4" fill="#CE1126" />
            </g>
          )}

          {equippedItems.outfit === 'outfit_suit' && (
            /* Traje Formal con Corbata */
            <g>
              <path d="M 55 135 C 50 160, 150 160, 145 135 L 140 170 L 60 170 Z" fill="#1C2833" />
              <polygon points="100,135 93,145 100,165 107,145" fill="#C0392B" />
              <polygon points="90,135 100,148 110,135" fill="#FFFFFF" />
            </g>
          )}

          {equippedItems.outfit === 'outfit_cape' && (
            /* Capa de Superhéroe */
            <g>
              <path d="M 50 130 Q 30 170 40 180 Q 100 165 160 180 Q 170 170 150 130 Z" fill="#E74C3C" />
              <circle cx="100" cy="138" r="7" fill="#F1C40F" />
            </g>
          )}

          {/* -------------------------------------------------------- */}
          {/* OVERLAY: GAFAS / GLASSES */}
          {/* -------------------------------------------------------- */}
          {equippedItems.glasses === 'glasses_study' && (
            /* Gafas de Inteligencia 🤓 */
            <g>
              <rect x="68" y="86" width="22" height="18" rx="5" stroke="#2C3E50" strokeWidth="3.5" fill="rgba(255,255,255,0.3)" />
              <rect x="110" y="86" width="22" height="18" rx="5" stroke="#2C3E50" strokeWidth="3.5" fill="rgba(255,255,255,0.3)" />
              <line x1="90" y1="94" x2="110" y2="94" stroke="#2C3E50" strokeWidth="3.5" />
            </g>
          )}

          {equippedItems.glasses === 'glasses_sun' && (
            /* Gafas de Sol 🕶️ */
            <g>
              <polygon points="66,88 92,88 88,104 70,104" fill="#111111" stroke="#333" strokeWidth="2" />
              <polygon points="108,88 134,88 130,104 112,104" fill="#111111" stroke="#333" strokeWidth="2" />
              <line x1="92" y1="92" x2="108" y2="92" stroke="#111111" strokeWidth="3" />
              <line x1="68" y1="90" x2="84" y2="98" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
            </g>
          )}

          {equippedItems.glasses === 'glasses_monocle' && (
            /* Monóculo de Sabio 🧐 */
            <g>
              <circle cx="122" cy="96" r="11" stroke="#F1C40F" strokeWidth="3" fill="rgba(241,196,15,0.2)" />
              <path d="M 122 107 Q 128 125 132 140" stroke="#F1C40F" strokeWidth="2" fill="none" />
            </g>
          )}

          {/* -------------------------------------------------------- */}
          {/* OVERLAY: SOMBREROS / HATS */}
          {/* -------------------------------------------------------- */}
          {equippedItems.hat === 'hat_grad' && (
            /* Birrete de Graduación 🎓 */
            <g>
              <polygon points="100,32 145,50 100,68 55,50" fill="#1A252C" />
              <rect x="75" y="56" width="50" height="20" fill="#2C3E50" />
              <path d="M 135 53 L 138 75" stroke="#F1C40F" strokeWidth="3" />
              <circle cx="138" cy="77" r="3" fill="#F1C40F" />
            </g>
          )}

          {equippedItems.hat === 'hat_crown' && (
            /* Corona de Rey 👑 */
            <g>
              <polygon points="65,65 72,40 85,55 100,35 115,55 128,40 135,65" fill="#F1C40F" stroke="#D4AC0D" strokeWidth="2" />
              <circle cx="72" cy="38" r="3" fill="#E74C3C" />
              <circle cx="100" cy="33" r="4" fill="#3498DB" />
              <circle cx="128" cy="38" r="3" fill="#2ECC71" />
            </g>
          )}

          {equippedItems.hat === 'hat_vueltiao' && (
            /* Sombrero Vueltiao Colombiano 👒 */
            <g>
              <ellipse cx="100" cy="62" rx="48" ry="12" fill="#F5E6CC" stroke="#3D200B" strokeWidth="2.5" />
              <path d="M 75 60 C 75 42, 125 42, 125 60 Z" fill="#F5E6CC" stroke="#3D200B" strokeWidth="2.5" />
              <rect x="76" y="54" width="48" height="6" fill="#1A0C03" />
            </g>
          )}

          {equippedItems.hat === 'hat_cap' && (
            /* Gorra Deportiva 🧢 */
            <g>
              <path d="M 68 66 C 68 45, 132 45, 132 66 Z" fill="#2980B9" />
              <path d="M 60 66 Q 100 68 145 62" fill="#1F618D" stroke="#1B4F72" strokeWidth="3" />
            </g>
          )}

          {/* -------------------------------------------------------- */}
          {/* OVERLAY: ACCESORIOS / ITEMS */}
          {/* -------------------------------------------------------- */}
          {equippedItems.accessory === 'acc_coffee' && (
            /* Taza de Café Colombiano ☕ */
            <g>
              <rect x="135" y="130" width="22" height="26" rx="4" fill="#FFFFFF" stroke="#D9531E" strokeWidth="2" />
              <path d="M 157 136 C 165 136, 165 150, 157 150" stroke="#D9531E" strokeWidth="2.5" fill="none" />
              <path d="M 142 125 Q 140 120 144 116" stroke="#BDC3C7" strokeWidth="2" fill="none" />
              <path d="M 148 125 Q 146 120 150 116" stroke="#BDC3C7" strokeWidth="2" fill="none" />
            </g>
          )}

          {equippedItems.accessory === 'acc_book' && (
            /* Libro de Estudio ICFES 📖 */
            <g>
              <path d="M 130 140 L 165 132 L 165 162 L 130 170 Z" fill="#27AE60" />
              <path d="M 130 140 L 135 142 L 135 172 L 130 170 Z" fill="#1E8449" />
              <line x1="140" y1="145" x2="160" y2="140" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="140" y1="152" x2="158" y2="147" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}

          {equippedItems.accessory === 'acc_medal' && (
            /* Medalla de Oro 🥇 */
            <g>
              <path d="M 94 135 L 100 155 L 106 135" stroke="#E74C3C" strokeWidth="3" fill="none" />
              <circle cx="100" cy="158" r="8" fill="#F1C40F" stroke="#D4AC0D" strokeWidth="1.5" />
              <text x="100" y="161" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#7D6608">1</text>
            </g>
          )}
        </svg>
      </div>

      {/* Etiqueta flotante del Chigüiro */}
      <div className="mt-2 flex items-center gap-1.5 bg-white dark:bg-[#241A12] border border-[#EADBC8] dark:border-[#3A2A1E] px-3 py-1 rounded-full shadow-sm">
        <Sparkles size={14} className="text-[#D9531E]" />
        <span className="text-xs font-black text-[#3C2415] dark:text-[#F5EBE1]">Chigüiro Sabio</span>
      </div>
    </div>
  );
};
