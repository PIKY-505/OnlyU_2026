import { create } from "zustand";

export const useGameStore = create((set) => ({
  // --- ECONOMÍA ---
  coins: 0,
  addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
  spendCoins: (amount) => set((state) => ({ coins: state.coins - amount })),

  // --- PERSONALIZACIÓN ACTIVA ---
  activeBackground: "default", // ej: 'aurora', 'galaxy'
  activeCursor: "default", // ej: 'img-pato', 'react-blob'
  activeTrail: null, // ej: 'img-trail-1'

  // --- SETTERS ---
  setBackground: (bgId) => set({ activeBackground: bgId }),
  setCursor: (cursorId) => set({ activeCursor: cursorId }),
  setTrail: (trailId) => set({ activeTrail: trailId }),

  // --- ESTADO DE LA UI ---
  isShopOpen: false,
  toggleShop: () => set((state) => ({ isShopOpen: !state.isShopOpen })),
}));
