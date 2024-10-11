import { create } from "zustand";

export const darkMode = create((set) => ({
    darkMode: true,
    setDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));
