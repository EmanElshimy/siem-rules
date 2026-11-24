let rules = [];

async function loadRules() {
  const response = await fetch('rules.json');
  rules = await response.json();
  renderRules(rules);
}

function renderRules(filteredRules) {
  const container = document.getElementById('rules-list');
  const detail = document.getElementById('rule-detail');
  detail.classList.add('hidden');
  container.classList.remove('hidden');

  if (filteredRules.length === 0) {
    container.innerHTML = '<p style="color: var(--text-muted);">No rules match your filters.</p>';
    return;
  }

  container.innerHTML = filteredRules.map(rule => `
    <div class="rule-card" data-id="${rule.id}">
      <h3>${rule.name}</h3>
      <div class="rule-meta">
        <span class="badge badge-category">${rule.category}</span>
        <span class="badge badge-platform">${rule.platform}</span>
        <span class="badge badge-severity-${rule.severity}">${rule.severity}</span>
      </div>
      <div class="mitre">${rule.mitre}</div>
    </div>
  `).join('');

  document.querySelectorAll('.rule-card').forEach(card => {
    card.addEventListener('click', () => showDetail(card.dataset.id));
  });
}

function showDetail(id) {
  const rule = rules.find(r => r.id === id);
  if (!rule) return;

  const container = document.getElementById('rules-list');
  const detail = document.getElementById('rule-detail');
  container.classList.add('hidden');
  detail.classList.remove('hidden');

  const sampleRows = rule.sample_results.map(result => {
    const keys = Object.keys(result);
    return `<tr>${keys.map(k => `<td>${result[k]}</td>`).join('')}</tr>`;
  }).join('');

  const sampleHeaders = rule.sample_results.length > 0
    ? Object.keys(rule.sample_results[0]).map(k => `<th>${k}</th>`).join('')
    : '';

  detail.innerHTML = `
    <button class="back-btn" onclick="backToList()">← Back to Rules</button>
    <h2>${rule.name}</h2>
    <div class="rule-meta" style="margin-bottom: 1.5rem;">
      <span class="badge badge-category">${rule.category}</span>
      <span class="badge badge-platform">${rule.platform}</span>
      <span class="badge badge-severity-${rule.severity}">${rule.severity}</span>
    </div>
    <div class="mitre" style="margin-bottom: 1.5rem;">MITRE ATT&CK: ${rule.mitre}</div>

    <div class="section">
      <h3>Description</h3>
      <p>${rule.description}</p>
    </div>

    <div class="section">
      <h3>What This Rule Detects</h3>
      <p>${rule.what_it_detects}</p>
    </div>

    <div class="section">
      <h3>Benefits</h3>
      <p>${rule.benefits}</p>
    </div>

    <div class="section">
      <h3>Detection Query (${rule.query_language})</h3>
      <div class="query-box">${rule.query}</div>
    </div>

    <div class="section">
      <h3>Sample Results (Matching Logs)</h3>
      <table class="sample-table">
        <thead><tr>${sampleHeaders}</tr></thead>
        <tbody>${sampleRows}</tbody>
      </table>
    </div>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToList() {
  document.getElementById('rule-detail').classList.add('hidden');
  document.getElementById('rules-list').classList.remove('hidden');
  applyFilters();
}

function applyFilters() {
  const search = document.getElementById('search').value.toLowerCase();
  const category = document.getElementById('category-filter').value;
  const platform = document.getElementById('platform-filter').value;

  const filtered = rules.filter(rule => {
    const matchesSearch = !search ||
      rule.name.toLowerCase().includes(search) ||
      rule.mitre.toLowerCase().includes(search) ||
      rule.description.toLowerCase().includes(search) ||
      rule.category.toLowerCase().includes(search);
    const matchesCategory = !category || rule.category === category;
    const matchesPlatform = !platform || rule.platform === platform;
    return matchesSearch && matchesCategory && matchesPlatform;
  });

  renderRules(filtered);
}

document.getElementById('search').addEventListener('input', applyFilters);
document.getElementById('category-filter').addEventListener('change', applyFilters);
document.getElementById('platform-filter').addEventListener('change', applyFilters);

loadRules();
