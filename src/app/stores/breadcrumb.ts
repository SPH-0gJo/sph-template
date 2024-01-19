import { commonApis } from 'app/api/common.api';
import { MainMenu } from 'shared/constants/types/types';
import { create } from 'zustand';

interface BreadcrumbState {
  breadcrumb: string[];
  setBreadcrumb: (breadcrumb: string[]) => void;
}

export const useBreadcrumbStore = create<BreadcrumbState>()((set) => ({
  breadcrumb: [],
  setBreadcrumb: (breadcrumb) => set({ breadcrumb: [...breadcrumb] }),
}));
