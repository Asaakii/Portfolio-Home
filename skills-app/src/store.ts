import { create } from 'zustand';
import type { SkillGroupId } from './skills';

interface AtlasState {
  activeSkillId: string | null;
  activeGroup: SkillGroupId;
  uiHidden: boolean;
  labelsVisible: boolean;
  quality: 'high' | 'light';
  setActiveSkill: (skillId: string | null) => void;
  setActiveGroup: (group: SkillGroupId) => void;
  toggleUi: () => void;
  toggleLabels: () => void;
  toggleQuality: () => void;
}

export const useAtlasStore = create<AtlasState>((set) => ({
  activeSkillId: null,
  activeGroup: 'all',
  uiHidden: false,
  labelsVisible: false,
  quality: 'high',
  setActiveSkill: (skillId) => set({ activeSkillId: skillId }),
  setActiveGroup: (group) => set({ activeGroup: group }),
  toggleUi: () => set((state) => ({ uiHidden: !state.uiHidden })),
  toggleLabels: () => set((state) => ({ labelsVisible: !state.labelsVisible })),
  toggleQuality: () => set((state) => ({ quality: state.quality === 'high' ? 'light' : 'high' }))
}));
