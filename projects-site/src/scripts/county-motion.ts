type ExhibitActions = { select: (group: HTMLElement, value: string) => void; setAsyncStep: (step: number) => void };

export function initializeCountyMotion(page: HTMLElement, actions: ExhibitActions) {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = preference.matches;
  let chosen = false;
  let autoSelecting = false;
  const motionButton = document.getElementById('county-motion-toggle');
  const players: { root: HTMLElement; stop: () => void }[] = [];
  const animatePanel = (panel: HTMLElement) => {
    if (paused || preference.matches) return;
    panel.getAnimations().forEach(animation => animation.cancel());
    panel.animate([{ opacity: .85, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 360, easing: 'cubic-bezier(.22,1,.36,1)' });
  };
  function setMotion() {
    page.dataset.motion = paused ? 'paused' : 'active';
    motionButton?.setAttribute('aria-pressed', String(paused));
    if (motionButton) motionButton.innerHTML = paused ? '开启动效 <span aria-hidden="true">▶</span>' : '暂停动效 <span aria-hidden="true">Ⅱ</span>';
    if (paused) {
      players.forEach(player => player.stop());
      page.getAnimations({ subtree: true }).filter(animation => !('animationName' in animation)).forEach(animation => animation.cancel());
    }
  }
  motionButton?.addEventListener('click', () => { chosen = true; paused = !paused; setMotion(); });
  preference.addEventListener('change', () => { if (!chosen) paused = preference.matches; setMotion(); });
  setMotion();

  // Every playback is explicit, finite, pausable and stopped when it leaves view.
  function sequence(root: HTMLElement, labels: string[], getStep: () => number, onStep: (step: number) => void, buttonLabel: string) {
    const button = root.querySelector<HTMLButtonElement>('[data-play]');
    const status = root.querySelector<HTMLElement>('[data-player-status]');
    let timer: ReturnType<typeof setTimeout> | undefined;
    let started = false;
    const announce = (prefix: string) => { if (status) status.textContent = `${prefix} · ${getStep() + 1} / ${labels.length} · ${labels[getStep()]}`; };
    const stop = () => {
      if (timer) { clearTimeout(timer); timer = undefined; announce('已暂停'); }
      root.dataset.playing = 'false';
      button?.setAttribute('aria-pressed', 'false');
      if (button) button.textContent = `▶ ${buttonLabel}`;
    };
    function advance() {
      timer = undefined;
      if (document.hidden) { stop(); return; }
      if (getStep() >= labels.length - 1) { stop(); announce('演示完成'); return; }
      onStep(getStep() + 1); announce('本地演示');
      timer = setTimeout(advance, 3400);
    }
    button?.addEventListener('click', () => {
      if (root.dataset.playing === 'true') { stop(); return; }
      if (!started || getStep() === labels.length - 1) onStep(0);
      started = true;
      root.dataset.playing = 'true'; button.setAttribute('aria-pressed', 'true'); button.textContent = 'Ⅱ 暂停演示';
      announce('本地演示'); timer = setTimeout(advance, 3400);
    });
    players.push({ root, stop });
    return { stop, announce };
  }

  const architecture = page.querySelector<HTMLElement>('[data-switcher="architecture"]');
  if (architecture) {
    const layers = Array.from(architecture.querySelectorAll<HTMLElement>('[data-choice]'));
    const root = architecture.querySelector<HTMLElement>('[data-player="architecture"]')!;
    const tour = sequence(root, layers.map(layer => layer.querySelector('h3')!.textContent!), () => layers.findIndex(layer => layer.classList.contains('selected')), step => {
      autoSelecting = true; actions.select(architecture, String(step)); autoSelecting = false;
    }, '播放分层导览');
    architecture.addEventListener('exhibit:change', () => { if (!autoSelecting) { tour.stop(); tour.announce('当前分层'); } });
  }

  page.querySelectorAll<HTMLElement>('[data-player="workflow"]').forEach(root => {
    const steps = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-walk-step]'));
    let current = 0;
    function showStep(step: number) {
      current = step;
      steps.forEach((button, index) => {
        button.classList.toggle('current', index === step); button.classList.toggle('complete', index < step);
        button.setAttribute('aria-pressed', String(index === step));
      });
      root.querySelector('[data-walk-number]')!.textContent = `${String(step + 1).padStart(2, '0')} / 06`;
      root.querySelector('[data-walk-title]')!.textContent = steps[step].querySelector('strong')!.textContent;
      root.querySelector('[data-walk-note]')!.textContent = steps[step].dataset.stepNote!;
      root.querySelector<HTMLElement>('[data-walk-progress]')!.style.setProperty('--step-progress', `${(step + 1) / steps.length * 100}%`);
      animatePanel(root.querySelector<HTMLElement>('.walkthrough-detail')!);
    }
    const player = sequence(root, steps.map(step => step.querySelector('strong')!.textContent!), () => current, showStep, '播放这条业务链');
    steps.forEach((button, index) => button.addEventListener('click', () => { player.stop(); showStep(index); player.announce('当前步骤'); }));
    root.querySelector('[data-walk-reset]')?.addEventListener('click', () => { player.stop(); showStep(0); player.announce('已重置'); });
    root.closest('[data-switcher]')?.addEventListener('exhibit:change', () => player.stop());
  });

  const async = page.querySelector<HTMLElement>('[data-player="async"]');
  if (async) {
    const steps = Array.from(async.querySelectorAll<HTMLButtonElement>('[data-async-step]'));
    const player = sequence(async, steps.map(button => button.textContent!.trim()), () => steps.findIndex(button => button.classList.contains('selected')), actions.setAsyncStep, '自动演示');
    async.querySelectorAll('[data-async-step], #async-reset, #async-next').forEach(button => button.addEventListener('click', player.stop));
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) players.forEach(player => player.stop()); });
  if ('IntersectionObserver' in window) {
    const playObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (!entry.isIntersecting) players.find(player => player.root === entry.target)?.stop(); });
    });
    players.forEach(player => playObserver.observe(player.root));
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animatePanel(entry.target as HTMLElement); reveal.unobserve(entry.target);
      });
    }, { threshold: .08 });
    page.querySelectorAll<HTMLElement>('.section-heading, .interactive-panel, .origin-layout, .data-assets, .node-grid, .infra-grid, .evidence-grid, .deliverable-shelf').forEach(element => reveal.observe(element));
    const hero = page.querySelector('.hero-blueprint');
    if (hero) new IntersectionObserver(entries => hero.classList.toggle('is-in-view', entries[0].isIntersecting)).observe(hero);
  }
  page.querySelectorAll<HTMLDetailsElement>('.handbook-topic').forEach(topic => topic.addEventListener('toggle', () => {
    if (topic.open) animatePanel(topic.querySelector<HTMLElement>('.topic-body')!);
  }));

  const progress = page.querySelector<HTMLElement>('.reading-progress > span');
  let frame = 0;
  function requestProgress() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const range = document.documentElement.scrollHeight - innerHeight;
      if (progress) progress.style.transform = `scaleX(${range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0})`;
    });
  }
  addEventListener('scroll', requestProgress, { passive: true }); addEventListener('resize', requestProgress);
  if ('ResizeObserver' in window) new ResizeObserver(requestProgress).observe(page);
  requestProgress();
  return animatePanel;
}
