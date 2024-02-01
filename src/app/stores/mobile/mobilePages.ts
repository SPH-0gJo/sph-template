import { create } from 'zustand';

interface MobilePagesState {
  currentPage: string;
  setCurrentPage: (currentPage:string) => void;
  menuOpen: boolean;
  setMenuOpen: (menuOpen:boolean) => void;
}

export const useMobilePageStore = create<MobilePagesState>()(set=> ({
  currentPage:'MAIN',
  setCurrentPage:(currentPage:string) =>
    set(()=>({
      currentPage : currentPage
    })),
  menuOpen:false,
  setMenuOpen:(menuOpen:boolean) =>
    set(()=>({
      menuOpen : menuOpen
    })),
}));