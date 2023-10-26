import { create } from 'zustand';

interface UseModalStore {
  isOpen: boolean;
  openModal: () => void;
  onClose: () => void;
}

export const useModal = create<UseModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
