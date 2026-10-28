const nativeFetch = window.fetch.bind(window);
const clone = (value) => JSON.parse(JSON.stringify(value));
const now = () => new Date().toISOString();
const wait = (ms = 80) => new Promise((resolve) => setTimeout(resolve, ms));

const documents = [
  {
    id: 'demo-1', folder_id: 1, file_path: 'research.pdf',
    title: 'The Effect of Digital Infrastructure on Household Income',
    authors: [{ given: 'Alice', family: 'Smith' }, { given: 'Robert', family: 'Brown' }],
    year: '2024', publication: 'Journal of Applied Economics', doi: '10.1234/litdesk-verification',
    abstract: '', language: '', item_type: 'article-journal', pages: '', volume: '', issue: '',
    publisher: '', url: '', tags: ['数字基础设施', '因果推断'], file_size: 3000,
    file_mtime: now(), content_hash: 'demo', page_count: 4, missing: false,
    metadata_source: 'pdf', extraction_error: '', created_at: now(), updated_at: now(),
  },
  {
    id: 'demo-2', folder_id: 1, file_path: 'community-health.pdf',
    title: 'Community Health Access and Preventive Care',
    authors: [{ literal: 'Chen Li' }], year: '2022', publication: 'China Health Review',
    doi: '', abstract: '', language: 'en-US', item_type: 'article-journal', pages: '',
    volume: '', issue: '', publisher: '', url: '', tags: ['公共卫生'], file_size: 2200,
    file_mtime: now(), content_hash: 'demo-2', page_count: 1, missing: false,
    metadata_source: 'pdf', extraction_error: '', created_at: now(), updated_at: now(),
  },
];

const notes = [{
  id: 'note-1', document_id: 'demo-1', title: '识别策略', content: '**核心方法**：双重差分；县和年份固定效应，标准误县级聚类。',
  quote: 'Our baseline model is a two-way fixed effects estimator with county and year fixed effects.',
  page: 3, created_at: now(), updated_at: now(),
}];
const summaries = {};
const styleList = [
  { id: 'apa', name: 'APA 7th edition', shortName: 'APA 7', language: '英文 · 著者—年份', custom: false },
  { id: 'gbt7714', name: 'GB/T 7714—2015 顺序编码', shortName: 'GB/T 7714', language: '国标 · 顺序编码', custom: false },
  { id: 'gbt7714-author-date', name: 'GB/T 7714—2015 著者—出版年', shortName: 'GB/T 著者—年份', language: '国标 · 著者—年份', custom: false },
  { id: 'ieee', name: 'IEEE', shortName: 'IEEE', language: '英文 · 顺序编码', custom: false },
  { id: 'mla', name: 'MLA 9th edition', shortName: 'MLA 9', language: '英文 · 著者—页码', custom: false },
  { id: 'chicago', name: 'Chicago 17th edition · author-date', shortName: 'Chicago', language: '英文 · 著者—年份', custom: false },
];
let aiSettings = { baseUrl: 'https://demo.litdesk.local/v1', model: 'demo-model', hasApiKey: false, keyPreview: '', environmentKey: false, configured: true };

const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
const text = (data, type = 'text/plain') => new Response(data, { status: 200, headers: { 'Content-Type': type } });
const documentById = (id) => documents.find((document) => document.id === id);
const publicDocument = (document) => clone(document);

function bootstrap() {
  const tagCounts = {};
  for (const document of documents) for (const tag of document.tags) tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  return {
    documents: documents.map(publicDocument),
    folders: [{ id: 1, path: '/demo/library', name: '示例文献库', watching: 1, created_at: now(), last_scan: now(), document_count: documents.length, available_count: documents.length }],
    styles: clone(styleList),
    integrations: { word: { label: 'Word', installed: true, mode: 'field' }, wps: { label: 'WPS', installed: true, mode: 'field' } },
    settings: { ai: clone(aiSettings) },
    stats: { total: documents.length, available: documents.length, missing: 0, notes: notes.length, summaries: Object.keys(summaries).length, folders: 1, syncing: false },
    tags: Object.entries(tagCounts).map(([name, count]) => ({ name, count })),
  };
}

const summaryTemplate = {
  oneSentence: '数字基础设施使家庭收入提高 4.2%（PDF 第 4 页）。',
  researchQuestion: '宽带基础设施是否改变家庭收入（PDF 第 1 页）。',
  researchDesign: '采用双重差分与事件研究识别因果效应（PDF 第 1、3 页）。',
  data: '2010—2020 年 500 个县的平衡面板，共 5,500 个县—年观测（PDF 第 2 页）。',
  methods: '双向固定效应，县级聚类标准误，并实施安慰剂与稳健性检验（PDF 第 3 页）。',
  findings: '家庭收入中位数提高 4.2%，农村县效应更大（PDF 第 4 页）。',
  limitations: '县级聚合与未观测地方政策（PDF 第 4 页）。',
};

const pageTexts = [
  { page: 1, content: 'The Effect of Digital Infrastructure on Household Income\nAlice Smith and Robert Brown\n2024\nAbstract\nThis study examines whether broadband infrastructure changes household income. We use a difference-in-differences research design with county-level panel data.' },
  { page: 2, content: 'Data and Sample\nWe construct a balanced panel of 500 counties from 2010 to 2020. The final sample contains 5,500 county-year observations.' },
  { page: 3, content: 'Empirical Method\nOur baseline model is a two-way fixed effects estimator with county and year fixed effects. Standard errors are clustered by county.' },
  { page: 4, content: 'Results and Conclusion\nBroadband access increases median household income by 4.2 percent. The effects are larger in rural counties. The study is limited by county-level aggregation and potential unobserved local policies.' },
];

function completeMetadata(document) {
  const changes = {};
  if (!document.abstract) changes.abstract = 'This study uses 5,500 county-year observations and two-way fixed effects. Broadband access increases median household income by 4.2 percent.';
  if (!document.volume) changes.volume = '42';
  if (!document.issue) changes.issue = '2';
  if (!document.pages) changes.pages = '101-128';
  if (!document.publisher) changes.publisher = 'Applied Economics Press';
  if (!document.url && document.doi) changes.url = `https://doi.org/${document.doi}`;
  if (!document.language) changes.language = 'en-US';
  if (!document.publication) changes.publication = 'Journal of Applied Economics';
  if (!document.authors.length) changes.authors = [{ given: 'Alice', family: 'Smith' }, { given: 'Robert', family: 'Brown' }];
  Object.assign(document, changes, { metadata_source: Object.keys(changes).length ? 'ai' : document.metadata_source, updated_at: now() });
  return { document: publicDocument(document), changedFields: Object.keys(changes), model: Object.keys(changes).length ? 'demo-model' : null };
}

function citationFor(ids, styleId) {
  const selected = ids.map(documentById).filter(Boolean);
  const count = selected.length;
  const multi = count > 1;
  let citation = multi ? '(Smith & Brown, 2024; Li, 2022)' : '(Smith & Brown, 2024)';
  let entries = [
    'Smith, A., & Brown, R. (2024). The Effect of Digital Infrastructure on Household Income. <i>Journal of Applied Economics, 42</i>(2), 101–128. https://doi.org/10.1234/litdesk-verification',
    'Li, C. (2022). Community Health Access and Preventive Care. <i>China Health Review</i>.',
  ];
  if (styleId === 'gbt7714' || styleId === 'ieee') {
    citation = multi ? (styleId === 'ieee' ? '[1], [2]' : '[1,2]') : '[1]';
    entries = [
      'SMITH A, BROWN R. The Effect of Digital Infrastructure on Household Income[J/OL]. Journal of Applied Economics, 2024, 42(2): 101-128. DOI:10.1234/litdesk-verification.',
      'LI C. Community Health Access and Preventive Care[J]. China Health Review, 2022.',
    ];
    if (styleId === 'ieee') entries = [
      'A. Smith and R. Brown, “The Effect of Digital Infrastructure on Household Income,” <i>Journal of Applied Economics</i>, vol. 42, no. 2, pp. 101–128, 2024, doi: 10.1234/litdesk-verification.',
      'C. Li, “Community Health Access and Preventive Care,” <i>China Health Review</i>, 2022.',
    ];
  }
  if (styleId === 'gbt7714-author-date') citation = multi ? '(Smith, 2024; Li, 2022)' : '(Smith, 2024)';
  if (styleId === 'chicago') {
    citation = multi ? '(Smith and Brown 2024; Li 2022)' : '(Smith and Brown 2024)';
    entries = [
      'Smith, Alice, and Robert Brown. 2024. “The Effect of Digital Infrastructure on Household Income.” <i>Journal of Applied Economics</i> 42 (2): 101–28. https://doi.org/10.1234/litdesk-verification.',
      'Li, Chen. 2022. “Community Health Access and Preventive Care.” <i>China Health Review</i>.',
    ];
  }
  if (styleId === 'mla') {
    citation = multi ? '(Smith; Li)' : '(Smith)';
    entries = [
      'Smith, Alice, and Robert Brown. “The Effect of Digital Infrastructure on Household Income.” <i>Journal of Applied Economics</i>, vol. 42, no. 2, 2024, pp. 101–28, https://doi.org/10.1234/litdesk-verification.',
      'Li, Chen. “Community Health Access and Preventive Care.” <i>China Health Review</i>, 2022.',
    ];
  }
  const used = entries.slice(0, count).map((entry, index) => styleId === 'gbt7714' || styleId === 'ieee' ? `[${index + 1}] ${entry}` : entry);
  const bibliographyHtml = `<div class="litdesk-bibliography">${used.map((entry) => `<div class="csl-entry">${entry}</div>`).join('')}</div>`;
  return {
    citationHtml: `<span class="litdesk-citation">${citation}</span>`,
    citationText: citation,
    bibliographyHtml,
    bibliographyText: used.map((entry) => entry.replace(/<[^>]+>/g, '')).join('\n\n'),
  };
}

function cslItems(ids) {
  return ids.map(documentById).filter(Boolean).map((document) => ({
    id: document.id, type: document.item_type, title: document.title,
    author: document.authors.map((author) => author.literal ? { literal: author.literal } : { given: author.given, family: author.family }),
    'container-title': document.publication || undefined, DOI: document.doi || undefined,
    issued: document.year ? { 'date-parts': [[Number(document.year)]] } : undefined,
    volume: document.volume || undefined, issue: document.issue || undefined, page: document.pages || undefined,
    publisher: document.publisher || undefined, URL: document.url || undefined, abstract: document.abstract || undefined,
  }));
}

function bibtex(ids) {
  return ids.map(documentById).filter(Boolean).map((document, index) => {
    const first = document.authors[0] || {};
    const key = `${first.family || first.literal || 'Work'}${document.year}${document.title.split(' ')[0]}`;
    const authors = document.authors.map((author) => author.literal || `${author.family}, ${author.given}`).join(' and ');
    return `@article{${key}${index ? index + 1 : ''},\n  title = {${document.title}},\n  author = {${authors}},\n  year = {${document.year}},\n  journal = {${document.publication}},\n  doi = {${document.doi}}\n}`;
  }).join('\n\n');
}

function saveNote(documentId, body) {
  const note = { id: crypto.randomUUID(), document_id: documentId, title: body.title || '', content: body.content || '', quote: body.quote || '', page: body.page || null, created_at: now(), updated_at: now() };
  notes.unshift(note);
  return note;
}

async function route(input, init = {}) {
  const url = new URL(input, location.origin);
  const path = url.pathname;
  const method = (init.method || 'GET').toUpperCase();
  const body = init.body ? JSON.parse(init.body) : {};
  await wait();
  if (path === '/api/health') return json({ status: 'ok', name: 'LitDesk Demo', version: '0.1.0' });
  if (path === '/api/bootstrap') return json(bootstrap());
  if (path === '/api/events') return text('event: connected\ndata: {"status":"demo"}\n\n', 'text/event-stream');
  if (path === '/api/settings') {
    if (method === 'PUT') {
      const input = body.ai || {};
      aiSettings = { baseUrl: input.baseUrl || aiSettings.baseUrl, model: input.model || aiSettings.model, hasApiKey: Boolean(input.apiKey), keyPreview: input.apiKey ? '••••demo' : '', environmentKey: false, configured: Boolean((input.baseUrl || aiSettings.baseUrl) && (input.model || aiSettings.model)) };
    }
    return json({ ai: clone(aiSettings) });
  }
  if (path === '/api/ai/test') return json({ success: true, model: aiSettings.model });
  if (path === '/api/documents' && method === 'GET') return json({ items: documents.map(publicDocument), total: documents.length });
  if (path === '/api/folders' && method === 'GET') return json(bootstrap().folders);
  if (path === '/api/folders/choose' || (path === '/api/folders' && method === 'POST')) return json({ error: '在线 Demo 使用内置示例文献，不支持选择本地文件夹。' }, 400);
  if (path.startsWith('/api/folders/') && path.endsWith('/scan')) return json({ success: true, stats: bootstrap().stats });
  if (path.startsWith('/api/folders/') && method === 'DELETE') return json({ success: true });
  if (path === '/api/citation/styles' && method === 'GET') return json(clone(styleList));
  if (path === '/api/citation/styles' && method === 'POST') {
    const style = { id: `custom-${crypto.randomUUID()}`, name: body.xml.match(/<title>(.*?)<\/title>/)?.[1] || body.filename, shortName: '自定义 CSL', language: '自定义样式', custom: true };
    styleList.push(style);
    return json(style, 201);
  }
  if (path === '/api/citation/render') return json(citationFor(body.ids || [], body.styleId));
  if (path === '/api/citation/export') return body.format === 'bibtex' ? text(bibtex(body.ids || []), 'application/x-bibtex') : text(JSON.stringify(cslItems(body.ids || []), null, 2), 'application/json');
  if (path === '/api/citation/insert') return json({ success: true, message: '在线 Demo 不控制本地 Word/WPS，请使用“复制富文本”体验引用。' });
  if (path === '/api/notes' && method === 'GET') {
    const query = (url.searchParams.get('q') || '').toLowerCase();
    return json(notes.filter((note) => `${note.title}${note.content}${note.quote}${documentById(note.document_id)?.title}`.toLowerCase().includes(query)).map((note) => ({ ...note, document_title: documentById(note.document_id)?.title })));
  }
  const noteMatch = path.match(/^\/api\/notes\/([^/]+)$/);
  if (noteMatch) {
    const index = notes.findIndex((note) => note.id === noteMatch[1]);
    if (index < 0) return json({ error: '笔记不存在' }, 404);
    if (method === 'PATCH') { Object.assign(notes[index], body, { updated_at: now() }); return json(notes[index]); }
    if (method === 'DELETE') { notes.splice(index, 1); return json({ success: true }); }
    return json(notes[index]);
  }
  const match = path.match(/^\/api\/documents\/([^/]+)(?:\/(file|text|notes|summary|refresh|enrich|complete-metadata|reveal|summarize|summary\/note))?$/);
  if (!match) return json({ error: `在线 Demo 未实现 ${method} ${path}` }, 404);
  const document = documentById(match[1]);
  if (!document) return json({ error: '文献不存在' }, 404);
  const action = match[2];
  if (!action) {
    if (method === 'GET') return json(publicDocument(document));
    if (method === 'PATCH') { Object.assign(document, body, { metadata_source: 'manual', updated_at: now() }); return json(publicDocument(document)); }
    if (method === 'DELETE') { documents.splice(documents.indexOf(document), 1); return json({ success: true }); }
  }
  if (action === 'file') return nativeFetch('research.pdf');
  if (action === 'text') return json({ pages: clone(pageTexts) });
  if (action === 'refresh') { document.updated_at = now(); return json(publicDocument(document)); }
  if (action === 'enrich') { Object.assign(document, { publication: document.publication || 'Journal of Applied Economics', metadata_source: 'crossref', updated_at: now() }); return json(publicDocument(document)); }
  if (action === 'complete-metadata') return json(completeMetadata(document));
  if (action === 'reveal') return json({ error: '在线 Demo 无法访问本地 Finder。' }, 400);
  if (action === 'notes') {
    if (method === 'GET') return json(notes.filter((note) => note.document_id === document.id).map(clone));
    if (method === 'POST') return json(saveNote(document.id, body), 201);
  }
  if (action === 'summary') {
    if (method === 'GET') return json(summaries[document.id] || null);
    const summary = { document_id: document.id, content: clone(summaryTemplate), model: 'demo-model', created_at: now() };
    summaries[document.id] = summary;
    return json(summary);
  }
  if (action === 'summarize') {
    const summary = { document_id: document.id, content: clone(summaryTemplate), model: 'demo-model', created_at: now() };
    summaries[document.id] = summary;
    return json(summary);
  }
  if (action === 'summary/note') {
    const summary = summaries[document.id];
    if (!summary) return json({ error: '还没有可保存的 AI 解析' }, 404);
    const content = Object.entries(summary.content).map(([key, value]) => `## ${key}\n\n${value}`).join('\n\n');
    return json(saveNote(document.id, { title: 'AI 文献解析', content }), 201);
  }
  return json({ error: `在线 Demo 未实现 ${method} ${path}` }, 404);
}

window.fetch = (input, init) => route(input, init);
window.EventSource = class {
  constructor() { setTimeout(() => this.onopen?.({}), 0); }
  addEventListener() {}
  close() {}
};
