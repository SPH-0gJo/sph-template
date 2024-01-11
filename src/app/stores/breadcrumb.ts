import { create } from 'zustand';
import { MainMenu } from 'shared/constants/types';
import { commonApis } from 'app/api/common.api';

interface BreadcrumbState {
  breadcrumb: string[];
  setBreadcrumb: (breadcrumb: string[]) => void;
}

export const useBreadcrumbStore = create<BreadcrumbState>()((set) => ({
  breadcrumb: [],
  setBreadcrumb: (breadcrumb) => set({ breadcrumb: [...breadcrumb] }),
}));
