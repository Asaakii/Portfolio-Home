import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Hud } from './components/Hud';
import { SkillGalaxy } from './components/SkillGalaxy';
import { DetailPanel } from './components/DetailPanel';
import { useAtlasStore } from './store';

export function App() {
  const uiHidden = useAtlasStore((state) => state.uiHidden);
  const toggleUi = useAtlasStore((state) => state.toggleUi);
  const setActiveSkill = useAtlasStore((state) => state.setActiveSkill);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveSkill(null);
      if (event.key.toLowerCase() === 'h' && !event.metaKey && !event.ctrlKey && !event.altKey) toggleUi();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setActiveSkill, toggleUi]);

  return (
    <main className={uiHidden ? 'app-shell is-ui-hidden' : 'app-shell'} aria-label="Asaakii 的能力星图">
      <nav className="top-nav">
        <a href="/" className="brand">Asaakii</a>
        <div className="nav-links">
          <a href="/projects/">项目集</a>
          <a href="https://blog.asaakii.com" target="_blank" rel="noreferrer">博客</a>
          <a href="https://github.com/asaakii" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </nav>

      <Canvas
        className="galaxy-canvas"
        camera={{ position: [-1.7, 0.55, 6.35], fov: 60, near: 0.1, far: 90 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <SkillGalaxy />
      </Canvas>

      <Hud />
      <DetailPanel />
      <p className="gesture-hint">拖拽旋转 · 滚轮推进 · 点击星点 · H 隐藏界面</p>
    </main>
  );
}
