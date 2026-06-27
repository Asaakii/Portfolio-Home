import { skillGroups, skills, type SkillGroupId } from '../skills';
import { useAtlasStore } from '../store';

const filters: { id: SkillGroupId; label: string }[] = [
  { id: 'all', label: '全部' },
  ...skillGroups.map((group) => ({ id: group.id, label: group.label }))
];

export function Hud() {
  const activeGroup = useAtlasStore((state) => state.activeGroup);
  const quality = useAtlasStore((state) => state.quality);
  const uiHidden = useAtlasStore((state) => state.uiHidden);
  const labelsVisible = useAtlasStore((state) => state.labelsVisible);
  const setActiveGroup = useAtlasStore((state) => state.setActiveGroup);
  const toggleLabels = useAtlasStore((state) => state.toggleLabels);
  const toggleQuality = useAtlasStore((state) => state.toggleQuality);
  const toggleUi = useAtlasStore((state) => state.toggleUi);

  return (
    <section className="hud" aria-label="星图控制">
      <div className="hud-copy">
        <h1>技能云</h1>
        <p className="eyebrow">Skill Cloud</p>
        <p>要有听雨的心情，也要有淋雨的心情。</p>
      </div>
      <div className="hud-actions">
        <div className="chip-row" aria-label="能力分组筛选">
          {filters.map((filter) => (
            <button
              className={filter.id === activeGroup ? 'chip is-active' : 'chip'}
              key={filter.id}
              type="button"
              aria-pressed={filter.id === activeGroup}
              onClick={() => setActiveGroup(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <button className="chip utility" type="button" aria-pressed={quality === 'high'} onClick={toggleQuality}>
          画质 {quality === 'high' ? '高' : '轻'}
        </button>
        <button className="chip utility" type="button" aria-pressed={labelsVisible} onClick={toggleLabels}>
          {labelsVisible ? '隐藏名称' : '显示名称'}
        </button>
        <button className="chip utility" type="button" aria-pressed={uiHidden} onClick={toggleUi}>
          {uiHidden ? '显示界面 H' : '隐藏界面 H'}
        </button>
        <p className="atlas-stats">{skills.length} 技能 · {skillGroups.length} 星团</p>
      </div>
    </section>
  );
}
