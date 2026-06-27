import { getGroupLabel, getSkillById } from '../skills';
import { useAtlasStore } from '../store';

export function DetailPanel() {
  const activeSkillId = useAtlasStore((state) => state.activeSkillId);
  const skill = activeSkillId ? getSkillById(activeSkillId) : undefined;

  if (!skill) {
    return (
      <aside className="detail-panel is-idle" aria-live="polite" aria-label="技能详情">
        <p className="detail-group">选择一颗星</p>
        <h2>能力星图</h2>
        <p className="detail-quote">点击星点查看它正在发光的原因。</p>
        <p className="detail-body">这版是 WebGL 星云：拖拽旋转，滚轮推进，按 H 隐藏界面。</p>
        <div className="tag-list">
          <span>创造</span>
          <span>身体</span>
          <span>工程</span>
          <span>手艺</span>
          <span>生活</span>
          <span>思维</span>
          <span>休闲</span>
        </div>
      </aside>
    );
  }

  return (
    <aside className="detail-panel is-active" aria-live="polite" aria-label="技能详情">
      <p className="detail-group">{getGroupLabel(skill.group)}</p>
      <h2>{skill.name}</h2>
      <p className="detail-quote">{skill.quote}</p>
      <p className="detail-body">{skill.body}</p>
      <div className="tag-list">
        {skill.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </aside>
  );
}
