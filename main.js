/* Simple Markdown site loader for the Git course */
(function () {
  const files = [
    { id: 'README.md', label: 'Accueil (README)', path: 'README.md' },
    { id: 'PARTIE-1-Git-Bases.md', label: 'Partie 1 — Bases de Git', path: 'PARTIE-1-Git-Bases.md' },
    { id: 'PARTIE-2-GitHub-Remotes.md', label: 'Partie 2 — GitHub & remotes', path: 'PARTIE-2-GitHub-Remotes.md' },
    { id: 'exercices/README.md', label: 'Exercices — Recettes', path: 'exercices/README.md' },
    { id: 'exercices/learn-git-branching.md', label: 'Exercice bonus — Learn Git Branching', path: 'exercices/learn-git-branching.md' },
    { id: 'annexes/Cheatsheet.md', label: 'Annexe — Cheatsheet', path: 'annexes/Cheatsheet.md' },
  ];

  // Build sidebar
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = [
    '<div class="nav-section">Cours</div>',
    '<ul class="nav-list">',
    ...files.slice(0, 3).map(f => `<li><a href="#${encodeURIComponent(f.path)}" data-path="${f.path}">${f.label}</a></li>`),
    '</ul>',
    '<div class="nav-section">Exercices</div>',
    '<ul class="nav-list">',
    ...files.slice(3, 5).map(f => `<li><a href="#${encodeURIComponent(f.path)}" data-path="${f.path}">${f.label}</a></li>`),
    '</ul>',
    '<div class="nav-section">Annexes</div>',
    '<ul class="nav-list">',
    ...files.slice(5).map(f => `<li><a href="#${encodeURIComponent(f.path)}" data-path="${f.path}">${f.label}</a></li>`),
    '</ul>',
    '<div class="nav-section">Ressource externe</div>',
    '<ul class="nav-list">',
    `<li><a href="https://learngitbranching.js.org/?locale=fr_FR&demo=" target="_blank" rel="noopener">Learn Git Branching (FR)</a></li>`,
    '</ul>'
  ].join('');

  const content = document.getElementById('content');

  // Configure marked
  if (window.marked) {
    marked.setOptions({
      breaks: true,
      gfm: true,
      mangle: false,
      headerIds: true,
      langPrefix: 'hljs language-'
    });
  }

  async function loadMarkdown(path) {
    const navLinks = sidebar.querySelectorAll('a[data-path]');
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('data-path') === path));
    content.innerHTML = '<p class="loading">Chargement…</p>';
    try {
      const res = await fetch(path, { cache: 'no-store' });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const md = await res.text();
      const html = window.marked ? marked.parse(md) : `<pre>${escapeHtml(md)}</pre>`;
      const safe = window.DOMPurify ? DOMPurify.sanitize(html) : html;
      content.innerHTML = safe;
      if (window.hljs) window.hljs.highlightAll();
      document.title = `Cours Git L3 — ${path}`;
    } catch (e) {
      content.innerHTML = `<p class="error">Impossible de charger <code>${path}</code><br><small>${e.message}</small></p>`;
    }
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // Handle hash navigation
  function currentPathFromHash() {
    const raw = decodeURIComponent((location.hash || '').replace(/^#/, ''));
    const found = files.find(f => f.path === raw);
    return found ? found.path : files[0].path; // default to README
  }

  window.addEventListener('hashchange', () => loadMarkdown(currentPathFromHash()));
  // Initial load
  loadMarkdown(currentPathFromHash());
})();

