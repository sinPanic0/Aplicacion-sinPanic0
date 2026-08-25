import React, { useState } from 'react';
import { ShoppingBag, X, Check, Zap, Sparkles, Shirt, Glasses, Crown, Coffee } from 'lucide-react';
import { CapybaraMascot } from './CapybaraMascot';

export const SHOP_ITEMS = [
  // SOMBREROS
  { id: 'hat_grad', name: 'Birrete de Graduado', category: 'hat', price: 50, icon: '🎓', desc: 'Símbolo de éxito académico en el ICFES.' },
  { id: 'hat_crown', name: 'Corona Real de Sabio', category: 'hat', price: 100, icon: '👑', desc: 'Para reyes y reinas del puntaje 450+.' },
  { id: 'hat_vueltiao', name: 'Sombrero Vueltiao', category: 'hat', price: 75, icon: '👒', desc: 'Orgullo 100% colombiano para tu Chigüiro.' },
  { id: 'hat_cap', name: 'Gorra Deportiva', category: 'hat', price: 40, icon: '🧢', desc: 'Estilo relajado para estudiar sin estrés.' },

  // GAFAS
  { id: 'glasses_study', name: 'Gafas de Inteligencia', category: 'glasses', price: 35, icon: '🤓', desc: 'Aumentan el enfoque en preguntas complejas.' },
  { id: 'glasses_sun', name: 'Gafas de Sol Estilo', category: 'glasses', price: 50, icon: '🕶️', desc: 'Para cuando apruebas todos los simulacros.' },
  { id: 'glasses_monocle', name: 'Monóculo de Sabio', category: 'glasses', price: 80, icon: '🧐', desc: 'Para un toque de elegancia y distinción.' },

  // ROPA
  { id: 'outfit_jacket', name: 'Chaqueta Universitaria', category: 'outfit', price: 60, icon: '🧥', desc: 'Directo a la universidad de tus sueños.' },
  { id: 'outfit_shirt', name: 'Camiseta Selección', category: 'outfit', price: 70, icon: '👕', desc: 'Apoya el talento nacional mientras estudias.' },
  { id: 'outfit_suit', name: 'Traje Formal de Gala', category: 'outfit', price: 90, icon: '👔', desc: 'Para las ocasiones más importantes.' },
  { id: 'outfit_cape', name: 'Capa de Superhéroe', category: 'outfit', price: 120, icon: '🦸', desc: 'Para los estudiantes invencibles.' },

  // ACCESORIOS
  { id: 'acc_coffee', name: 'Taza de Café Colombiano', category: 'accessory', price: 30, icon: '☕', desc: 'Energía pura para tus sesiones de repaso.' },
  { id: 'acc_book', name: 'Libro Guía ICFES', category: 'accessory', price: 45, icon: '📖', desc: 'El secreto del conocimiento absoluto.' },
  { id: 'acc_medal', name: 'Medalla de Oro ICFES', category: 'accessory', price: 110, icon: '🥇', desc: 'Reconocimiento a tu esfuerzo diario.' }
];

export const CapybaraShopModal = ({
  isOpen,
  onClose,
  knowledgePoints = 0,
  setKnowledgePoints,
  equippedItems = {},
  setEquippedItems,
  purchasedItems = [],
  setPurchasedItems,
  customName = 'Chigüiro Sabio'
}) => {
  const [activeCategory, setActiveCategory] = useState('hat');

  if (!isOpen) return null;

  const categories = [
    { id: 'hat', name: 'Sombreros', icon: Crown },
    { id: 'glasses', name: 'Gafas', icon: Glasses },
    { id: 'outfit', name: 'Ropa', icon: Shirt },
    { id: 'accessory', name: 'Accesorios', icon: Coffee }
  ];

  const handleBuyItem = (item) => {
    if (knowledgePoints < item.price) return;

    // Descontar puntos KP
    if (setKnowledgePoints) {
      setKnowledgePoints(prev => Math.max(0, prev - item.price));
    }

    // Agregar a comprados
    if (setPurchasedItems) {
      setPurchasedItems(prev => [...prev, item.id]);
    }

    // Equipar automáticamente al comprar
    handleEquipItem(item);
  };

  const handleEquipItem = (item) => {
    if (setEquippedItems) {
      setEquippedItems(prev => {
        // Si ya está equipado, desequipar (toggle)
        if (prev[item.category] === item.id) {
          const updated = { ...prev };
          delete updated[item.category];
          return updated;
        }
        return { ...prev, [item.category]: item.id };
      });
    }
  };

  const filteredItems = SHOP_ITEMS.filter(i => i.category === activeCategory);

  return (
    <div className="fixed inset-0 bg-[#3C2415]/70 dark:bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-fade-in font-sans">
      <div className="bg-[#FAF4EE] dark:bg-[#18110C] rounded-3xl w-full max-w-2xl border-2 border-[#EADBC8] dark:border-[#3A2A1E] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* LADO IZQUIERDO: PREVIEW DEL CHIGÜIRO */}
        <div className="bg-white dark:bg-[#241A12] p-6 border-b md:border-b-0 md:border-r border-[#EADBC8] dark:border-[#3A2A1E] flex flex-col items-center justify-between md:w-64 shrink-0">
          <div className="w-full flex justify-between items-center mb-2">
            <span className="text-[10px] font-black text-[#C85A28] uppercase tracking-widest flex items-center gap-1">
              <Sparkles size={14} /> Tu Mascota
            </span>
            <div className="flex items-center gap-1 text-xs font-black text-[#C85A28] bg-[#C85A28]/10 px-2.5 py-1 rounded-full">
              <Zap size={14} /> {knowledgePoints} KP
            </div>
          </div>

          <div className="my-4">
            <CapybaraMascot equippedItems={equippedItems} customName={customName} size="lg" />
          </div>

          <p className="text-[11px] text-[#7C5E47] dark:text-[#D2B49A] text-center font-semibold">
            Toca a tu Chigüiro para interactuar con él o equipa sus accesorios.
          </p>
        </div>

        {/* LADO DERECHO: TIENDA Y CATÁLOGO DE ACCESORIOS */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden bg-[#FAF4EE] dark:bg-[#18110C]">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-black text-[#3C2415] dark:text-[#F5EBE1] flex items-center gap-2">
                <ShoppingBag size={22} className="text-[#C85A28]" /> Tienda del Chigüiro
              </h2>
              <p className="text-xs text-[#7C5E47] dark:text-[#D2B49A] font-semibold">
                Canjea tus Puntos KP ganados en las pruebas para vestir a tu mascota.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#7C5E47] hover:text-[#3C2415] dark:text-[#D2B49A] bg-white dark:bg-[#241A12] border border-[#EADBC8] dark:border-[#3A2A1E] rounded-full"
            >
              <X size={18} />
            </button>
          </div>

          {/* Selector de Categorías */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1 no-scrollbar">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 border ${
                    isSelected
                      ? 'bg-[#C85A28] text-white border-[#C85A28] shadow-sm'
                      : 'bg-white dark:bg-[#241A12] text-[#3C2415] dark:text-[#F5EBE1] border-[#EADBC8] dark:border-[#3A2A1E]'
                  }`}
                >
                  <Icon size={14} /> {cat.name}
                </button>
              );
            })}
          </div>

          {/* Grid de Ítems */}
          <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3 pr-1">
            {filteredItems.map(item => {
              const isPurchased = purchasedItems.includes(item.id);
              const isEquipped = equippedItems[item.category] === item.id;
              const canAfford = knowledgePoints >= item.price;

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isEquipped
                      ? 'bg-white dark:bg-[#241A12] border-2 border-[#C85A28] shadow-md'
                      : 'bg-white dark:bg-[#241A12] border-[#EADBC8] dark:border-[#3A2A1E]'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-3xl p-2 bg-[#FAF4EE] dark:bg-[#18110C] rounded-xl border border-[#EADBC8] dark:border-[#3A2A1E]">
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-[#3C2415] dark:text-[#F5EBE1] text-xs truncate">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-[#7C5E47] dark:text-[#D2B49A] line-clamp-2 leading-tight mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#EADBC8]/50 dark:border-[#3A2A1E]/50">
                    <span className="text-xs font-black text-[#C85A28] flex items-center gap-0.5">
                      <Zap size={12} /> {item.price} KP
                    </span>

                    {isPurchased ? (
                      <button
                        onClick={() => handleEquipItem(item)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
                          isEquipped
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-[#FAF4EE] dark:bg-[#18110C] text-[#3C2415] dark:text-[#F5EBE1] border border-[#EADBC8] dark:border-[#3A2A1E]'
                        }`}
                      >
                        {isEquipped ? <><Check size={12} /> Equipado</> : 'Equipar'}
                      </button>
                    ) : (
                      <button
                        disabled={!canAfford}
                        onClick={() => handleBuyItem(item)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-sm ${
                          canAfford
                            ? 'bg-[#C85A28] hover:bg-[#B04A1F] text-white active:scale-95'
                            : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Comprar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
