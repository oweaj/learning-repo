import { create } from "zustand";

interface IPageProps {
  currentPage: number;
  setPage: (newPage: number) => void;
}

export const usePageStore = create<IPageProps>((set) => ({
  currentPage: 1,
  setPage: (newPage: number) => set({ currentPage: newPage }),
}));
