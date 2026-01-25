import { create } from "zustand";

export const useGameStore = create((set) => ({
  // ... Estado existente (isUnlocked, etc) ...
  isUnlocked: false,
  unlockApp: () => set({ isUnlocked: true }),
  lockGame: () => set({ isUnlocked: false }),

  // --- LÓGICA DE TIENDA Y NAVEGACIÓN ---
  activeShop: null, // 'backgrounds' | 'cursors' | 'trails'
  openShop: (shopType) => set({ activeShop: shopType }),
  closeShop: () => set({ activeShop: null }),

  // --- INVENTARIO EQUIPADO ---

  // 1. FONDOS
  activeBackground: "gradient",
  setBackground: (id) => set({ activeBackground: id }),

  // 2. CURSORES (Nuevo)
  activeCursor: "default",
  setCursor: (id) => set({ activeCursor: id }),

  // 3. RASTROS (Nuevo)
  activeTrail: "none",
  setTrail: (id) => set({ activeTrail: id }),
}));
