/* Simple Markdown site loader for the Git course */
(function () {
  const sections = [
    {
      title: 'Cours',
      items: [
        { label: 'Accueil (README)', path: 'README.md' },
        { label: 'Partie 1 — Bases de Git', path: 'PARTIE-1-Git-Bases.md' },
        { label: 'Partie 2 — GitHub & remotes', path: 'PARTIE-2-GitHub-Remotes.md' },
        { label: 'Partie 3 — Collaboration (Forks & PR)', path: 'PARTIE-3-GitHub-Collaboration.md' }
      ]
    },
    {
      title: 'Exercices',
      items: [
        { label: 'Exercices — Recettes', path: 'exercices/README.md' },
        { label: 'Exercices — Collaboration GitHub', path: 'exercices/github-collaboration.md' },
        { label: 'Exercice bonus — Learn Git Branching', path: 'exercices/learn-git-branching.md' }
      ]
    },
    {
      title: 'Annexes',
      items: [
        { label: 'Annexe — Cheatsheet', path: 'annexes/Cheatsheet.md' }
      ]
    }
  ];

  const externalLinks = [
    {
      title: 'Ressource externe',
      items: [
        { label: 'Learn Git Branching (FR)', href: 'https://learngitbranching.js.org/?locale=fr_FR&demo=' }
      ]
    }
  ];

  const allItems = sections.flatMap(section => section.items);

  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = [
    ...sections.map(section => [
      `<div class="nav-section">${section.title}</div>`,
      '<ul class="nav-list">',
      ...section.items.map(item => `<li><a href="#${encodeURIComponent(item.path)}" data-path="${item.path}">${item.label}</a></li>`),
      '</ul>'
    ].join('')),
    ...externalLinks.map(section => [
      `<div class="nav-section">${section.title}</div>`,
      '<ul class="nav-list">',
      ...section.items.map(item => `<li><a href="${item.href}" target="_blank" rel="noopener">${item.label}</a></li>`),
      '</ul>'
    ].join(''))
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
      const item = allItems.find(entry => entry.path === path);
      document.title = `Cours Git L3 — ${item ? item.label : path}`;
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
    const found = allItems.find(item => item.path === raw);
    return found ? found.path : 'README.md';
  }

  window.addEventListener('hashchange', () => loadMarkdown(currentPathFromHash()));
  // Initial load
  loadMarkdown(currentPathFromHash());
})();
