import { describe, expect, it } from 'vitest';
import { buildSkillStars, getSkillById, listSkillsByGroup, skillGroups, skills } from '../src/skills';
import { useAtlasStore } from '../src/store';

describe('skills atlas data', () => {
  it('keeps checked checklist skills across seven visible groups', () => {
    expect(skills).toHaveLength(87);
    expect(skillGroups.map((group) => group.id)).toEqual([
      'creative',
      'body',
      'engineering',
      'making',
      'life',
      'thinking',
      'leisure'
    ]);
  });

  it('returns detailed metadata for a selected skill', () => {
    expect(getSkillById('vibe-coding')).toMatchObject({
      name: 'Vibe Coding',
      group: 'engineering',
      level: 3,
      tags: expect.arrayContaining(['AI辅助编程'])
    });
  });

  it('filters skills by group without mutating the full list', () => {
    expect(listSkillsByGroup('body')).toHaveLength(13);
    expect(listSkillsByGroup('body').map((skill) => skill.name)).toEqual(expect.arrayContaining(['登山', '徒步', '潜水']));
    expect(listSkillsByGroup('all')).toHaveLength(skills.length);
  });

  it('renders every checked skill as a level-scaled star point', () => {
    const stars = buildSkillStars();
    expect(stars).toHaveLength(skills.length);

    for (const skill of skills) {
      const star = stars.find((item) => item.skillId === skill.id);
      expect(star).toBeDefined();
      expect(star?.group).toBe(skill.group);
      expect(star?.level).toBe(skill.level);
    }

    const levelOne = stars.find((star) => star.level === 1);
    const levelFour = stars.find((star) => star.level === 4);
    expect(levelOne && levelFour && levelFour.size > levelOne.size).toBe(true);
  });
});

describe('atlas ui state', () => {
  it('toggles persistent skill labels independently of the hidden hud', () => {
    useAtlasStore.setState({
      activeSkillId: null,
      activeGroup: 'all',
      uiHidden: false,
      quality: 'high',
      labelsVisible: false
    });

    useAtlasStore.getState().toggleLabels();
    expect(useAtlasStore.getState().labelsVisible).toBe(true);
    expect(useAtlasStore.getState().uiHidden).toBe(false);

    useAtlasStore.getState().toggleLabels();
    expect(useAtlasStore.getState().labelsVisible).toBe(false);
  });
});
