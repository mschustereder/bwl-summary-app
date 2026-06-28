let chapters = [];
let currentChapterId = null;

async function init() {
  chapters = await loadChapters();
  if (chapters.length > 0) {
    currentChapterId = chapters[0].id;
  }
  render();
}

async function loadChapters() {
  try {
    const resp = await fetch('/chapters-list');
    const files = await resp.json();
    const chs = await Promise.all(files.map(f =>
      fetch(`/chapters/${f}`).then(r => r.json())
    ));
    return chs;
  } catch {
    const resp = await fetch('/chapters/chapter_1.json');
    const data = await resp.json();
    return [data];
  }
}

function getChapter() {
  return chapters.find(c => c.id === currentChapterId);
}

function switchChapter(id) {
  currentChapterId = id;
  render();
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function renderMarkdown(text) {
  let html = escapeHtml(text);
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');
  html = '<p>' + html + '</p>';
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<br><\/li>/g, '</li>');
  html = html.replace(/<\/ul><br>/g, '</ul>');
  html = html.replace(/<p><ul>/g, '<ul>');
  html = html.replace(/<\/ul><\/p>/g, '</ul>');
  html = html.replace(/<p><li>/g, '<li>');
  html = html.replace(/<\/li><\/p>/g, '</li>');
  return html;
}

function render() {
  const main = document.getElementById('main');
  const nav = document.getElementById('tab-bar');

  const shortNames = {
    1: '1  Warum wirtschaften?',
    2: '2  Wirtschaft & Umwelt',
    3: '3  Unternehmen',
    4: '4  Digitalisierung'
  };

  nav.innerHTML = chapters.map(c =>
    `<button class="tab-btn${c.id === currentChapterId ? ' active' : ''}"
      onclick="switchChapter(${c.id})">${shortNames[c.id] || escapeHtml(c.title)}</button>`
  ).join('');

  const ch = getChapter();
  if (!ch) {
    main.innerHTML = '<p class="empty">Kein Kapitel geladen.</p>';
    return;
  }

  main.innerHTML = `
    <div class="chapter-header">
      <span class="chapter-icon">${escapeHtml(ch.icon)}</span>
      <span class="chapter-title">${escapeHtml(ch.title)}</span>
    </div>
    <div class="sections">
      ${ch.sections.map(s => `
        <div class="section-card">
          <div class="section-heading">
            <h2>${escapeHtml(s.heading)}</h2>
            <span class="importance-badge">${s.importance}</span>
          </div>
          <div class="section-content">${renderMarkdown(s.content)}</div>
          <div class="key-concepts">
            <span class="label">Schlüsselkonzepte:</span>
            ${s.key_concepts.map(k => `<span class="tag">${escapeHtml(k)}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

init();
