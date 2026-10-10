// The exhibit stays readable without JavaScript. Every simulation is local.
import { initializeCountyMotion } from './county-motion';
const page = document.querySelector<HTMLElement>('.county-page');
if (page) {
  let animatePanel = (_panel: HTMLElement) => {};
  const imageDialog = document.getElementById('county-image-dialog') as HTMLDialogElement | null;
  const dialogImage = document.getElementById('county-dialog-image') as HTMLImageElement | null;
  page.querySelectorAll<HTMLAnchorElement>('[data-project-image]').forEach(link => link.addEventListener('click', event => {
    if (!imageDialog || !dialogImage || typeof imageDialog.showModal !== 'function') return;
    event.preventDefault();
    dialogImage.src = link.href;
    dialogImage.alt = link.querySelector('img')?.alt ?? '项目截图';
    imageDialog.dataset.native = 'false';
    const size = document.getElementById('county-image-size');
    if (size) { size.textContent = '原始尺寸'; size.setAttribute('aria-pressed', 'false'); }
    const original = document.getElementById('county-image-original') as HTMLAnchorElement | null;
    if (original) original.href = link.href;
    const caption = document.getElementById('county-dialog-caption');
    if (caption) caption.textContent = dialogImage.alt;
    imageDialog.showModal();
    imageDialog.querySelector('.image-dialog-canvas')?.scrollTo(0, 0);
  }));
  document.getElementById('county-image-size')?.addEventListener('click', event => {
    if (!imageDialog) return;
    const native = imageDialog.dataset.native !== 'true';
    imageDialog.dataset.native = String(native);
    const button = event.currentTarget as HTMLButtonElement;
    button.textContent = native ? '适配视图' : '原始尺寸'; button.setAttribute('aria-pressed', String(native));
    imageDialog.querySelector('.image-dialog-canvas')?.scrollTo(0, 0);
  });
  document.getElementById('county-image-close')?.addEventListener('click', () => imageDialog?.close());
  imageDialog?.addEventListener('click', event => { if (event.target === imageDialog) imageDialog.close(); });
  function activate(group: HTMLElement, value: string) {
    group.querySelectorAll<HTMLElement>('[data-choice]').forEach(button => {
      const active = button.dataset.choice === value;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    group.querySelectorAll<HTMLElement>('[data-panel]').forEach(panel => {
      panel.hidden = panel.dataset.panel !== value;
      if (!panel.hidden) animatePanel(panel);
    });
    if (group.dataset.switcher === 'quality') updateGates(group);
    group.dispatchEvent(new CustomEvent('exhibit:change', { detail: value }));
  }
  function updateGates(group: HTMLElement) {
    const active = group.querySelector<HTMLElement>('[data-panel]:not([hidden])');
    const stop = Number(active?.dataset.stoppingGate ?? 0);
    group.querySelectorAll<HTMLElement>('[data-gate-index]').forEach(gate => {
      const index = Number(gate.dataset.gateIndex);
      gate.style.setProperty('--gate-delay', `${index * 90}ms`);
      gate.classList.toggle('passed', index < stop);
      gate.classList.toggle('stopped', index === stop);
      const indicator = gate.querySelector('.gate-indicator');
      if (indicator) indicator.textContent = index < stop ? '✓' : index === stop ? '!' : '○';
    });
  }
  page.querySelectorAll<HTMLElement>('[data-switcher]').forEach(group => {
    const buttons = Array.from(group.querySelectorAll<HTMLButtonElement>('[data-choice]'));
    buttons.forEach(button => {
      button.addEventListener('click', () => activate(group, button.dataset.choice!));
      button.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const visible = buttons.filter(item => !item.hidden);
        const current = visible.indexOf(button);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? visible.length - 1 : (current + (['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1) + visible.length) % visible.length;
        visible[next]?.click(); visible[next]?.focus();
      });
    });
    if (group.dataset.switcher === 'quality') updateGates(group);
  });
  page.querySelectorAll<HTMLButtonElement>('[data-role-filter]').forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.roleFilter!;
    page.querySelectorAll<HTMLElement>('[data-role-filter]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('selected', selected); item.setAttribute('aria-pressed', String(selected));
    });
    const cards = Array.from(page.querySelectorAll<HTMLButtonElement>('[data-role-group]'));
    cards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.roleGroup !== filter; });
    const selected = cards.find(card => card.classList.contains('selected'));
    if (selected?.hidden) cards.find(card => !card.hidden)?.click();
  }));
  let asyncStep = 0;
  const asyncButtons = page.querySelectorAll<HTMLButtonElement>('[data-async-step]');
  function setAsyncStep(step: number) {
    asyncStep = step;
    asyncButtons.forEach(button => {
      const selected = Number(button.dataset.asyncStep) === step;
      button.classList.toggle('selected', selected); button.setAttribute('aria-pressed', String(selected));
    });
    page.querySelectorAll<HTMLElement>('[data-async-panel]').forEach(panel => { panel.hidden = Number(panel.dataset.asyncPanel) !== step; if (!panel.hidden) animatePanel(panel); });
    const announcement = document.getElementById('async-announcement');
    if (announcement) announcement.textContent = `步骤 ${step + 1} / 4 · ${['任务运行中', '等待外部补数，Worker 已释放', '验证回调签名与状态', '恢复原现场，继续推进'][step]}`;
    const next = document.getElementById('async-next');
    if (next) next.textContent = step === 3 ? '再走一遍 ↺' : '下一步 →';
  }
  asyncButtons.forEach(button => button.addEventListener('click', () => setAsyncStep(Number(button.dataset.asyncStep))));
  document.getElementById('async-next')?.addEventListener('click', () => setAsyncStep((asyncStep + 1) % 4));
  document.getElementById('async-reset')?.addEventListener('click', () => setAsyncStep(0));

  const topics = Array.from(page.querySelectorAll<HTMLDetailsElement>('[data-topic]'));
  const search = document.getElementById('handbook-search') as HTMLInputElement | null;
  let chapterFilter = 'all';
  function filterTopics() {
    const words = (search?.value.trim().toLowerCase() ?? '').split(/\s+/).filter(Boolean);
    let count = 0;
    topics.forEach(topic => {
      const match = (chapterFilter === 'all' || topic.dataset.topicChapter === chapterFilter) && words.every(word => topic.dataset.search?.includes(word));
      topic.hidden = !match; if (match) count++;
    });
    const label = document.getElementById('handbook-count');
    if (label) label.textContent = `${count} / ${topics.length} 个技术主题`;
    const empty = document.getElementById('handbook-empty');
    if (empty) empty.hidden = count !== 0;
  }
  search?.addEventListener('input', filterTopics);
  function setChapterFilter(value: string) {
    chapterFilter = value;
    page!.querySelectorAll<HTMLElement>('[data-handbook-filter]').forEach(button => {
      const selected = button.dataset.handbookFilter === value;
      button.classList.toggle('selected', selected); button.setAttribute('aria-pressed', String(selected));
    });
    page!.querySelectorAll<HTMLElement>('[data-handbook-jump]').forEach(button => {
      const selected = button.dataset.handbookJump === value;
      button.classList.toggle('selected', selected); button.setAttribute('aria-pressed', String(selected));
    });
    filterTopics();
  }
  page.querySelectorAll<HTMLButtonElement>('[data-handbook-filter]').forEach(button => button.addEventListener('click', () => setChapterFilter(button.dataset.handbookFilter!)));
  page.querySelectorAll<HTMLButtonElement>('[data-handbook-jump]').forEach(button => button.addEventListener('click', () => {
    setChapterFilter(button.dataset.handbookJump!);
    const toolbar = document.querySelector('.handbook-toolbar');
    toolbar?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }));
  document.getElementById('handbook-collapse')?.addEventListener('click', () => topics.forEach(topic => { topic.open = false; }));
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement) && !(event.target as HTMLElement)?.isContentEditable) {
      event.preventDefault(); search?.focus(); search?.scrollIntoView({ block: 'center' });
    }
  });
  function openTopic(hash: string) {
    if (!hash.startsWith('#topic-')) return;
    const target = topics.find(topic => `#${topic.id}` === hash);
    if (!target) return;
    if (search) search.value = '';
    setChapterFilter('all'); target.open = true;
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }));
  }
  page.querySelectorAll<HTMLAnchorElement>('[data-topic-link]').forEach(link => link.addEventListener('click', () => openTopic(link.hash)));
  window.addEventListener('hashchange', () => openTopic(location.hash));
  if (location.hash.startsWith('#topic-')) openTopic(location.hash);

  // Diagrams are SVGs already present in the HTML; JS only handles zoom controls.
  function diagramEntry(svg: SVGSVGElement) {
    const frame = svg.getBoundingClientRect();
    const node = svg.querySelector('.node, .actor')?.getBoundingClientRect();
    const ratio = frame.width / svg.viewBox.baseVal.width;
    return node && ratio > 0 ? { x: (node.x + node.width / 2 - frame.x) / ratio, y: (node.y + node.height / 2 - frame.y) / ratio } : { x: svg.viewBox.baseVal.width / 2, y: 0 };
  }
  document.querySelectorAll<HTMLButtonElement>('[data-diagram-zoom]').forEach(button => button.addEventListener('click', () => {
    const figure = button.closest<HTMLElement>('.source-diagram');
    const host = figure?.querySelector<HTMLElement>('.mermaid-host');
    const surface = host?.querySelector<SVGSVGElement | HTMLImageElement>('svg, img');
    if (!figure || !host || !surface) return;
    const action = button.dataset.diagramZoom;
    const current = Number(host.dataset.zoom ?? 100);
    const natural = Number(host.dataset.naturalWidth ?? 560);
    const before = surface.getBoundingClientRect();
    const centerX = (host.scrollLeft + host.clientWidth / 2) / before.width;
    const centerY = (host.scrollTop + host.clientHeight / 2) / before.height;
    const zoom = action === 'reset' ? Math.min(100, host.clientWidth / natural * 100) : action === 'natural' ? 100 : Math.max(10, Math.min(350, current + (action === 'in' ? 25 : -25)));
    host.dataset.zoom = String(zoom);
    surface.style.width = `${natural * zoom / 100}px`;
    const scale = figure.querySelector('[data-diagram-scale]');
    if (scale) scale.textContent = `${Math.round(zoom)}%`;
    if (action === 'reset') host.scrollTo(0, 0);
    else if (action === 'natural') host.scrollTo(Math.max(0, (host.scrollWidth - host.clientWidth) / 2), 0);
    else host.scrollTo(centerX * surface.getBoundingClientRect().width - host.clientWidth / 2, centerY * surface.getBoundingClientRect().height - host.clientHeight / 2);
  }));
  const diagramDialog = document.getElementById('county-diagram-dialog') as HTMLDialogElement;
  const diagramImage = document.getElementById('county-dialog-diagram') as HTMLImageElement;
  let diagramUrl: string | undefined;
  page.querySelectorAll<HTMLButtonElement>('[data-diagram-expand]').forEach(button => button.addEventListener('click', () => {
    const svg = button.closest('.source-diagram')?.querySelector('svg');
    const host = diagramDialog.querySelector<HTMLElement>('.mermaid-host');
    if (!svg || !host || !diagramDialog.showModal) return;
    const topic = button.closest('.handbook-topic')?.querySelector('summary h3')?.textContent ?? '白皮书架构图';
    document.getElementById('county-diagram-title')!.textContent = topic;
    const copy = svg.cloneNode(true) as SVGSVGElement;
    const natural = svg.viewBox.baseVal.width;
    copy.setAttribute('width', String(natural)); copy.setAttribute('height', String(svg.viewBox.baseVal.height));
    copy.removeAttribute('style');
    diagramUrl = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(copy)], { type: 'image/svg+xml' }));
    const entry = diagramEntry(svg);
    diagramImage.onload = () => { if (diagramDialog.open) host.scrollTo(Math.max(0, entry.x - host.clientWidth / 2), Math.max(0, entry.y - 100)); };
    diagramImage.src = diagramUrl; diagramImage.alt = `${topic}的完整流程图`;
    host.dataset.naturalWidth = String(natural); host.dataset.zoom = '100';
    diagramImage.style.width = `${natural}px`;
    diagramDialog.querySelector('[data-diagram-scale]')!.textContent = '100%';
    diagramDialog.showModal(); host.scrollTo(0, 0);
  }));
  document.getElementById('county-diagram-close')?.addEventListener('click', () => diagramDialog.close());
  diagramDialog.addEventListener('click', event => { if (event.target === diagramDialog) diagramDialog.close(); });
  diagramDialog.addEventListener('close', () => { if (diagramUrl) URL.revokeObjectURL(diagramUrl); diagramUrl = undefined; diagramImage.removeAttribute('src'); });
  document.querySelectorAll<HTMLElement>('.mermaid-host').forEach(host => {
    let drag: { x: number; y: number; left: number; top: number } | undefined;
    host.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      drag = { x: event.clientX, y: event.clientY, left: host.scrollLeft, top: host.scrollTop };
      host.setPointerCapture(event.pointerId); host.classList.add('dragging'); event.preventDefault();
    });
    host.addEventListener('pointermove', event => {
      if (!drag) return;
      host.scrollLeft = drag.left - (event.clientX - drag.x); host.scrollTop = drag.top - (event.clientY - drag.y);
    });
    const endDrag = () => { drag = undefined; host.classList.remove('dragging'); };
    host.addEventListener('pointerup', endDrag); host.addEventListener('pointercancel', endDrag); host.addEventListener('lostpointercapture', endDrag);
  });
  topics.forEach(topic => {
    topic.addEventListener('toggle', () => {
      if (!topic.open) return;
      requestAnimationFrame(() => topic.querySelectorAll<HTMLElement>('.mermaid-host').forEach(host => {
        if (host.dataset.centered) return;
        const svg = host.querySelector<SVGSVGElement>('svg');
        if (svg) {
          const entry = diagramEntry(svg);
          const ratio = svg.getBoundingClientRect().width / svg.viewBox.baseVal.width;
          host.scrollTo(Math.max(0, entry.x * ratio - host.clientWidth / 2), Math.max(0, entry.y * ratio - 100));
        }
        host.dataset.centered = 'true';
      }));
    });
    topic.querySelectorAll('table').forEach(table => {
      const wrapper = document.createElement('div'); wrapper.className = 'table-scroll'; wrapper.tabIndex = 0; wrapper.setAttribute('role', 'region'); wrapper.setAttribute('aria-label', '技术对照表，可横向滚动');
      table.before(wrapper); wrapper.append(table);
    });
  });
  const chapterLinks = Array.from(page.querySelectorAll<HTMLAnchorElement>('[data-chapter-link]'));
  animatePanel = initializeCountyMotion(page, { select: activate, setAsyncStep });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        chapterLinks.forEach(link => {
          const active = link.dataset.chapterLink === entry.target.id;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
        });
      }
    }, { rootMargin: '-130px 0px -55% 0px', threshold: 0 });
    page.querySelectorAll('[data-chapter]').forEach(section => observer.observe(section));
  }
}
