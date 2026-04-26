import { create } from 'zustand';

const useStore = create((set) => ({
  user: null, // { role: 'student' | 'admin', name: string }
  isAuthModalOpen: false,
  authView: 'login', // 'login' | 'signup'
  
  login: (userData) => set({ user: userData, isAuthModalOpen: false }),
  logout: () => set({ user: null }),
  
  openAuthModal: (view = 'login') => set({ isAuthModalOpen: true, authView: typeof view === 'string' ? view : 'login' }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  setAuthView: (view) => set({ authView: view }),
}));

export default useStore;
