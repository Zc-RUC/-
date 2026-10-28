const root = document.documentElement;
const header = document.querySelector("[data-header]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const languageToggle = document.querySelector("[data-language-toggle]");
const copyEmailButton = document.querySelector("[data-copy-email]");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const description = document.querySelector('meta[name="description"]');
const translatedNodes = [...document.querySelectorAll("[data-i18n]")];
const ariaLabelNodes = [...document.querySelectorAll("[data-i18n-aria-label]")];
const altNodes = [...document.querySelectorAll("[data-i18n-alt]")];
const hrefNodes = [...document.querySelectorAll("[data-i18n-href]")];
const chineseTitle = document.title;
const chineseDescription = description?.content;

const english = {
  "brand": "Zhang Chong",
  "cv.link": "cv-en.html",
  "projects.caseHub": "Case Studies →",
  "footer.analytics": "Privacy-friendly analytics",
  "nav.aria": "Main navigation",
  "theme.aria": "Toggle light and dark themes",
  "profile.aria": "Personal information",
  "profile.avatar": "Portrait of Zhang Chong",
  "profile.name": "Zhang Chong",
  "profile.tagline": "AI Power User",
  "profile.school": "Renmin University of China · Interdisciplinary Business & Economics Program",
  "social.aria": "Social links",
  "social.maimai": "Maimai",
  "actions.copyEmail": "Copy Email",
  "interests.ai": "AI agents and recruiting workflow efficiency",
  "interests.tools": "Independent tools and web application development",
  "interests.industry": "Deep tech, embodied intelligence, and advanced manufacturing",
  "interests.research": "Industry research, investment operations, and organizational management",
  "about.p1": "I’m Zhang Chong, an undergraduate in the Interdisciplinary Business & Economics Program at Renmin University of China, with a GPA of 3.76/4.00 and ranked 3rd in my cohort. My experience spans AI tooling, HRBP, investment operations, industry research, and empirical data research. I focus on using agents, generative AI, and structured workflows to improve complex information processing and organizational collaboration.",
  "about.p2": "During my internship with ByteDance Seed’s AI Infra team, I supported campus and experienced hiring and helped the recruiting team adopt AI tools. I mapped 500+ master’s and PhD students from relevant labs for the 2027 cohort and built a reusable Lab Mapper Skill in Codex, significantly accelerating work that had been highly manual.",
  "about.p3": "I use Codex, Claude Code, ChatGPT, and Grok, and work with Wind, iFinD, Bloomberg, Python, and Stata for data collection, processing, and research analysis. My goal is to bring AI-native ways of working into real business scenarios, making information gathering, candidate sourcing, industry research, and knowledge management faster, more accurate, and reusable.",
  "about.p4": "Beyond AI agents, I build lightweight applications with vanilla HTML/CSS/JavaScript, Python, and Cloudflare Workers, turning practical needs such as task management and meal tracking into accessible, reusable tools.",
  "projects.litdesk.title": "LitDesk: Local-first AI Literature Workspace",
  "projects.litdesk.meta": "Independent Project · Oct 2026",
  "projects.litdesk.body": "A local-first PDF library with watched-folder sync, PDF reading and page-linked notes, CSL citations, gray-shaded citation fields, and optional AI summaries and one-click metadata completion. Library data, notes, and settings stay on your computer.",
  "projects.litdesk.local": "Open Online Demo ↗",
  "projects.litdesk.localAria": "Open the LitDesk online demo",
  "projects.litdesk.githubAria": "View LitDesk source code on GitHub",
  "projects.ddl.title": "DDL.MISSION: Pixel-Space Deadline Manager",
  "projects.ddl.meta": "Independent Project · Oct 2026",
  "projects.ddl.body": "A pixel-space-inspired deadline manager with natural-language input, second-by-second countdowns, recurring tasks, and native macOS notifications. A local sync server connects the desktop widget, browsers, and devices on the same network. Four themes, offline use, and multi-device sync included.",
  "projects.ddl.demoAria": "Open the DDL.MISSION live demo",
  "projects.ddl.githubAria": "View DDL.MISSION source code on GitHub",
  "projects.meals.title": "Healthy Meals · JD Technology Tower",
  "projects.meals.meta": "Independent Project · Oct 2026",
  "projects.meals.body": "A mobile-first, single-file app combining a weekly meal plan, vendor price comparison, meal expense tracking, weight trends, and weekly reviews. Data stays in the browser, with optional multi-device sync through a Cloudflare Worker.",
  "projects.meals.demoAria": "Open the Healthy Meals live demo",
  "projects.meals.githubAria": "View Healthy Meals source code on GitHub",
  "projects.lab.title": "Lab Mapper Skill: Automated Lab Student Mapping",
  "projects.lab.meta": "ByteDance Seed · 2026",
  "projects.lab.body": "Built a reusable Lab Mapper Skill in Codex to source master’s and PhD students from relevant labs for the 2027 cohort. Given a link, it produces a complete mapping table. Mapped 500+ people, several times faster than the previous fully manual workflow.",
  "projects.author.title": "Author Sourcing Skill: Automated Paper Author Sourcing",
  "projects.author.meta": "ByteDance Seed · 2026",
  "projects.author.body": "For authors publishing at EuroSys, ASPLOS, FAST, and similar venues, automatically organizes personal homepages, GitHub, Google Scholar, advisors, labs, and current affiliations, turning paper author lists into actionable talent leads.",
  "projects.paper.title": "Daily Paper Briefing Skill: Automated Research Digests",
  "projects.paper.meta": "ByteDance Seed · 2026",
  "projects.paper.body": "Tracks new papers in systems, AI Infra, and related fields. Uses Feishu Aime and Mira to automatically generate daily paper briefings and author summaries, giving the recruiting team a continuous view of research developments and candidate discovery.",
  "experience.bytedance.company": "ByteDance Seed",
  "experience.bytedance.body1": "Supported campus and experienced hiring for Seed AI Infra, recruiting-team adoption of AI tools, candidate mapping, paper author sourcing, and recruiting workflow improvement.",
  "experience.bytedance.body2": "Shared AI tool practices and reusable skills weekly, and collaborated with the AI recruiting product manager on practical AI use cases and implementation.",
  "experience.jiukun.company": "Ubiquant Partners",
  "experience.jiukun.role": "Investment Operations & HR Intern",
  "experience.jiukun.body1": "Independently compiled research on deep tech, AI, embodied intelligence, advanced manufacturing, and the low-altitude economy; supported recruiting for 8 roles, recommended 10+ resumes per day, and achieved an interview invitation rate of about 80%.",
  "experience.jiukun.body2": "Later led 2 HR interns to create a recruiting SOP, helping new team members learn recruiting software and end-to-end workflows while supporting multiple searches and headhunter coordination.",
  "experience.xinliu.company": "Xinliu Think Tank",
  "experience.xinliu.role": "Industry Research Intern",
  "experience.xinliu.body": "Tracked semiconductors, embodied intelligence, AI, and intelligent driving, systematically gathering information with Wind, Bloomberg, company websites, and IT Juzi to support research and analysis.",
  "experience.cmb.company": "China Merchants Securities",
  "experience.cmb.role": "Bond Underwriting Intern, Investment Banking",
  "experience.cmb.body": "Assisted with offering memoranda, due-diligence reports, project bids, and roadshow materials, and supported debt-servicing analysis, risk assessment, and data preparation.",
  "research.agri.meta": "Core Member · 2024 MCM Meritorious Winner",
  "research.agri.body": "Built a multi-scale coupled modeling system integrating dynamic systems theory, toxicology mechanisms, and multi-objective optimization to quantify the effects of chemical use and species introduction in agricultural ecological transitions. Handled data preprocessing, visualization, and paper writing.",
  "research.tax.title": "How Does Proactive Fiscal Policy Strengthen Supply-Chain Resilience in Advanced Manufacturing?",
  "research.tax.meta": "Second Author · First Prize, Renmin University Innovation Cup",
  "research.tax.body": "Using 2015–2023 data on Chinese A-share advanced-manufacturing firms, built a high-dimensional two-way fixed-effects model and used difference-in-differences with a multidimensional TOPSIS index to identify the impact of the VAT credit refund policy.",
  "research.age.title": "The Impact of Age Discrimination at 35 on Firm Performance",
  "research.age.meta": "Second Author · RUC Qiushi Academic “Shoushan” Research Grant",
  "research.age.body": "Quantified age discrimination using textual data from listed-company job postings and examined the mediating roles of labor-allocation efficiency and innovation capability, as well as the moderating effect of R&D intensity.",
  "news.tools": "Launched DDL.MISSION and Healthy Meals · JD Technology Tower, turning task management and everyday tracking into ready-to-use web applications.",
  "news.bytedance": "Joined ByteDance Seed, supporting AI Infra recruiting and AI-powered workflow improvements.",
  "news.jiukun": "Joined Ubiquant Partners for investment operations and recruiting across AI, deep tech, embodied intelligence, and the low-altitude economy.",
  "news.awards": "Received a Meritorious Winner award in the Mathematical Contest in Modeling, First Prize in the Renmin University Innovation Cup, and a Qiushi Academic “Shoushan” Research Grant.",
  "news.campus.date": "2023 - Present",
  "news.campus": "Serve as monitor for Human Resource Management Class 2, Class of 2023 at Renmin University’s School of Labor and Human Resources, and participate in the School Student Union Practice Department, GEA Association, and other student activities."
};

const chinese = new Map(translatedNodes.map((node) => [node.dataset.i18n, node.textContent]));
const chineseAriaLabels = new Map(ariaLabelNodes.map((node) => [node, node.getAttribute("aria-label")]));
const chineseAlts = new Map(altNodes.map((node) => [node, node.getAttribute("alt")]));
const chineseHrefs = new Map(hrefNodes.map((node) => [node, node.getAttribute("href")]));

function applyLanguage(language) {
  const isEnglish = language === "en";
  translatedNodes.forEach((node) => {
    const translation = isEnglish ? english[node.dataset.i18n] : chinese.get(node.dataset.i18n);
    if (translation !== undefined) node.textContent = translation;
  });
  ariaLabelNodes.forEach((node) => {
    const translation = isEnglish ? english[node.dataset.i18nAriaLabel] : chineseAriaLabels.get(node);
    if (translation) node.setAttribute("aria-label", translation);
  });
  altNodes.forEach((node) => {
    const translation = isEnglish ? english[node.dataset.i18nAlt] : chineseAlts.get(node);
    if (translation) node.setAttribute("alt", translation);
  });
  hrefNodes.forEach((node) => {
    const translation = isEnglish ? english[node.dataset.i18nHref] : chineseHrefs.get(node);
    if (translation) node.setAttribute("href", translation);
  });
  root.lang = isEnglish ? "en" : "zh-CN";
  document.body.dataset.language = language;
  document.title = isEnglish ? "Zhang Chong | Personal Homepage" : chineseTitle;
  if (description) {
    description.content = isEnglish
      ? "Zhang Chong’s personal homepage, featuring AI tools, independent projects, industry research, investment operations, HR, and empirical research."
      : chineseDescription;
  }
  if (languageToggle) {
    languageToggle.textContent = isEnglish ? "中" : "En";
    languageToggle.setAttribute("aria-label", isEnglish ? "Switch to Chinese" : "Switch to English");
  }
  localStorage.setItem("homepage-language", language);
}

const savedLanguage = localStorage.getItem("homepage-language");
applyLanguage(savedLanguage === "en" ? "en" : "zh");
languageToggle?.addEventListener("click", () => {
  applyLanguage(document.body.dataset.language === "en" ? "zh" : "en");
});

const savedTheme = localStorage.getItem("homepage-theme");
if (savedTheme === "dark") {
  root.classList.add("dark");
}

themeToggle?.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("homepage-theme", root.classList.contains("dark") ? "dark" : "light");
});

copyEmailButton?.addEventListener("click", async () => {
  const email = "zhangchong050812@ruc.edu.cn";
  try {
    await navigator.clipboard.writeText(email);
    copyEmailButton.textContent = document.body.dataset.language === "en" ? "Copied" : "已复制";
    setTimeout(() => {
      copyEmailButton.textContent = document.body.dataset.language === "en" ? "Copy Email" : "复制邮箱";
    }, 1400);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 10);
};

const syncActiveNav = () => {
  let current = sections[0]?.id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 130) {
      current = section.id;
    }
  }

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", () => {
  syncHeader();
  syncActiveNav();
});

syncHeader();
syncActiveNav();
