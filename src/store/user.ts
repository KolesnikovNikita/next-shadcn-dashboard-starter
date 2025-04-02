import { create } from 'zustand';
import { UserDetails } from '@/features/auth/types';

const STORAGE_KEY = 'user_details';

interface UserStore {
  userDetails: UserDetails | null;
  setUserDetails: (details: UserDetails) => void;
  clearUserDetails: () => void;
}

// Функция для загрузки данных из localStorage
const loadUserDetails = (): UserDetails | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const useUserStore = create<UserStore>((set) => ({
  userDetails: loadUserDetails(),
  setUserDetails: (details) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(details));
    set({ userDetails: details });
  },
  clearUserDetails: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ userDetails: null });
  }
}));
