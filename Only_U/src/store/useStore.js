import { create } from "zustand";

export const useGameStore = create((set) => ({
  // --- SEGURIDAD (CANDADO) ---
  isUnlocked: false, // Empieza bloqueado
  unlockApp: () => set({ isUnlocked: true }),

  // --- ECONOMÍA ---
  coins: 0,
  addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
  spendCoins: (amount) => set((state) => ({ coins: state.coins - amount })),

  // --- PERSONALIZACIÓN ---
  activeBackground: "default",
  activeCursor: "default",
  activeTrail: null,

  setBackground: (bgId) => set({ activeBackground: bgId }),
  setCursor: (cursorId) => set({ activeCursor: cursorId }),
  setTrail: (trailId) => set({ activeTrail: trailId }),

  // --- UI ---
  isShopOpen: false,
  toggleShop: () => set((state) => ({ isShopOpen: !state.isShopOpen })),
}));
