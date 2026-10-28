const ANALYTICS_ENDPOINT = "https://zc-homepage-analytics.zhangchong050812.workers.dev/api/event";
const analyticsEvents = new Set([
  "page:home",
  "page:cv-zh",
  "page:cv-en",
  "demo:ddl-mission",
  "demo:jianzhi-meals",
  "case:hub",
  "case:ddl-mission",
  "case:jianzhi-meals",
  "case:lab-mapper",
  "case:author-sourcing",
  "case:daily-paper-briefing",
  "cv:open:zh",
  "cv:open:en",
  "cv:download:zh",
  "cv:download:en",
  "source:ddl-mission",
  "source:jianzhi-meals",
  "source:github-profile",
  "skill:lab-mapper",
  "skill:author-sourcing",
  "skill:daily-paper-briefing",
  "research:mcm",
  "research:qiushi",
  "social:linkedin",
  "social:maimai",
  "contact:email",
  "contact:copy-email"
]);

function trackAnalyticsEvent(name) {
  if (!ANALYTICS_ENDPOINT || !analyticsEvents.has(name)) return;
  fetch(ANALYTICS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
    body: JSON.stringify({ name }),
    keepalive: true,
    credentials: "omit",
    referrerPolicy: "no-referrer",
    cache: "no-store"
  }).catch(() => {});
}

if (document.body.dataset.pageview) {
  trackAnalyticsEvent(document.body.dataset.pageview);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest?.("[data-analytics]");
  if (!target) return;
  let name = target.dataset.analytics;
  if (name === "cv:open") {
    name = `${name}:${document.body.dataset.language === "en" ? "en" : "zh"}`;
  }
  trackAnalyticsEvent(name);
});
