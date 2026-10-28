export const dashboard = String.raw`<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="referrer" content="no-referrer" />
    <title>匿名聚合统计 · 张翀个人主页</title>
    <style>
      :root { color-scheme: light; --bg:#f8f7f3; --surface:#fff; --soft:#f0eee7; --text:#1f241f; --muted:#62685f; --line:#ded9cd; --accent:#2f6f5e; --accent-strong:#174e42; --warm:#b16b3a; }
      * { box-sizing:border-box; }
      body { margin:0; background:var(--bg); color:var(--text); font-family:ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC",sans-serif; line-height:1.55; }
      main { width:min(100% - 32px,1000px); margin:0 auto; padding:48px 0 40px; }
      h1,h2,p { margin-top:0; }
      h1 { margin-bottom:12px; font-size:clamp(30px,5vw,44px); line-height:1.15; }
      h2 { margin-bottom:16px; font-size:20px; }
      .eyebrow { margin-bottom:8px; color:var(--accent-strong); font-size:12px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; }
      .intro { max-width:700px; color:var(--muted); }
      .controls { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px; margin:28px 0 20px; }
      label { color:var(--muted); font-size:14px; }
      select { margin-left:8px; padding:8px 12px; border:1px solid var(--line); border-radius:8px; background:var(--surface); color:var(--text); font:inherit; }
      #updated { color:var(--muted); font-size:12px; }
      .summary { display:grid; grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:10px; margin-bottom:30px; }
      .card,.panel { border:1px solid var(--line); border-radius:12px; background:var(--surface); }
      .card { padding:16px; }
      .card span { display:block; color:var(--muted); font-size:13px; }
      .card strong { display:block; margin-top:5px; font-size:28px; line-height:1.1; }
      .panel { padding:20px; }
      .panel + .panel { margin-top:18px; }
      .event-row { display:grid; grid-template-columns:minmax(130px,1.2fr) minmax(90px,2fr) 52px; align-items:center; gap:14px; padding:10px 0; border-bottom:1px solid var(--soft); }
      .event-row:last-child { border-bottom:0; }
      .event-label { overflow-wrap:anywhere; font-size:14px; }
      .track { height:8px; overflow:hidden; border-radius:999px; background:var(--soft); }
      .bar { height:100%; border-radius:inherit; background:var(--accent); }
      .count { text-align:right; font-variant-numeric:tabular-nums; font-weight:700; }
      .daily-row { display:grid; grid-template-columns:92px 1fr 48px; align-items:center; gap:12px; padding:7px 0; color:var(--muted); font-size:13px; }
      .daily-row .count { color:var(--text); }
      .empty,.status { padding:22px 0; color:var(--muted); text-align:center; }
      .privacy { margin-top:24px; color:var(--muted); font-size:13px; }
      .privacy strong { color:var(--text); }
      @media (max-width:560px) {
        main { padding-top:28px; }
        .event-row { grid-template-columns:minmax(110px,1.4fr) minmax(60px,1fr) 42px; gap:8px; }
        .panel { padding:16px; }
      }
    </style>
  </head>
  <body>
    <main>
      <p class="eyebrow">Privacy-friendly analytics</p>
      <h1>匿名聚合统计</h1>
      <p class="intro">这里展示个人主页的页面访问和内容点击排行。数据只用于了解哪些 Demo、CV、源码和资料更受关注。</p>
      <div class="controls">
        <label>时间范围
          <select id="period">
            <option value="7">最近 7 天</option>
            <option value="30" selected>最近 30 天</option>
            <option value="90">最近 90 天</option>
            <option value="all">全部时间</option>
          </select>
        </label>
        <span id="updated"></span>
      </div>
      <section class="summary" id="summary" aria-label="分类统计" aria-live="polite"></section>
      <section class="panel">
        <h2>事件排行</h2>
        <div id="events" aria-live="polite"></div>
      </section>
      <section class="panel">
        <h2>每日记录</h2>
        <div id="daily"></div>
      </section>
      <p class="privacy"><strong>隐私边界：</strong>仅按日期和事件名保存聚合计数，不使用追踪 Cookie，不保存 IP、User-Agent、Referrer、访客 ID 或点击明细。这里统计的是页面访问与点击次数，不代表唯一访客人数。</p>
    </main>
    <script>
      const labels = {
        "page:home":"主页访问","page:cv-zh":"中文 CV 访问","page:cv-en":"英文 CV 访问",
        "demo:ddl-mission":"DDL.MISSION Demo","demo:jianzhi-meals":"减脂餐 Demo",
        "case:hub":"精选案例中心","case:ddl-mission":"DDL.MISSION 案例","case:jianzhi-meals":"减脂餐案例","case:lab-mapper":"Lab Mapper 案例","case:author-sourcing":"Author Sourcing 案例","case:daily-paper-briefing":"Daily Paper Briefing 案例",
        "cv:open:zh":"打开中文 CV","cv:open:en":"打开英文 CV","cv:download:zh":"打开中文 PDF","cv:download:en":"下载英文 PDF",
        "source:ddl-mission":"DDL.MISSION 源码","source:jianzhi-meals":"减脂餐源码","source:github-profile":"个人 GitHub",
        "skill:lab-mapper":"Lab Mapper 下载","skill:author-sourcing":"Author Sourcing 下载","skill:daily-paper-briefing":"Daily Paper Briefing 下载",
        "research:mcm":"数学建模 PDF","research:qiushi":"求是研究 PDF",
        "social:linkedin":"LinkedIn","social:maimai":"脉脉","contact:email":"邮件链接","contact:copy-email":"复制邮箱","system:ping":"系统检查"
      };
      const categoryLabels = { page:"页面访问",demo:"Demo 点击",case:"案例阅读",cv:"CV 点击",source:"源码点击",skill:"Skill 下载",research:"研究 PDF",social:"社交与联系" };
      const categoryOrder = ["page","demo","case","cv","source","skill","research","social"];
      const periodSelect = document.querySelector("#period");
      const summary = document.querySelector("#summary");
      const events = document.querySelector("#events");
      const daily = document.querySelector("#daily");
      const updated = document.querySelector("#updated");

      function emptyState(target, text) {
        target.replaceChildren();
        const paragraph = document.createElement("p");
        paragraph.className = "empty";
        paragraph.textContent = text;
        target.append(paragraph);
      }

      function renderSummary(totals) {
        const groups = {};
        totals.forEach((row) => {
          const category = row.event.split(":")[0];
          groups[category] = (groups[category] || 0) + Number(row.count);
        });
        summary.replaceChildren();
        categoryOrder.forEach((category) => {
          const card = document.createElement("div");
          card.className = "card";
          const label = document.createElement("span");
          label.textContent = categoryLabels[category];
          const value = document.createElement("strong");
          value.textContent = groups[category] || 0;
          card.append(label,value);
          summary.append(card);
        });
      }

      function renderEvents(totals) {
        if (!totals.length) return emptyState(events,"当前区间还没有记录");
        events.replaceChildren();
        const maximum = Math.max(...totals.map((row) => Number(row.count)),1);
        totals.forEach((row) => {
          const element = document.createElement("div");
          element.className = "event-row";
          const label = document.createElement("div");
          label.className = "event-label";
          label.textContent = labels[row.event] || row.event;
          const track = document.createElement("div");
          track.className = "track";
          const bar = document.createElement("div");
          bar.className = "bar";
          bar.style.width = Math.max(2,Number(row.count) / maximum * 100) + "%";
          track.append(bar);
          const count = document.createElement("div");
          count.className = "count";
          count.textContent = row.count;
          element.append(label,track,count);
          events.append(element);
        });
      }

      function renderDaily(rows) {
        if (!rows.length) return emptyState(daily,"当前区间还没有记录");
        const byDay = {};
        rows.forEach((row) => { byDay[row.day] = (byDay[row.day] || 0) + Number(row.count); });
        const days = Object.keys(byDay).sort().slice(-14);
        daily.replaceChildren();
        const maximum = Math.max(...days.map((day) => byDay[day]),1);
        days.forEach((day) => {
          const element = document.createElement("div");
          element.className = "daily-row";
          const label = document.createElement("span");
          label.textContent = day.slice(5);
          const track = document.createElement("div");
          track.className = "track";
          const bar = document.createElement("div");
          bar.className = "bar";
          bar.style.width = Math.max(2,byDay[day] / maximum * 100) + "%";
          track.append(bar);
          const count = document.createElement("span");
          count.className = "count";
          count.textContent = byDay[day];
          element.append(label,track,count);
          daily.append(element);
        });
      }

      async function loadStats() {
        summary.textContent = "加载中…";
        try {
          const response = await fetch("/api/stats?days=" + encodeURIComponent(periodSelect.value),{ cache:"no-store" });
          if (!response.ok) throw new Error("stats");
          const data = await response.json();
          renderSummary(data.totals);
          renderEvents(data.totals);
          renderDaily(data.daily);
          updated.textContent = "更新于 " + new Date(data.generatedAt).toLocaleString("zh-CN",{ hour12:false });
        } catch {
          summary.replaceChildren();
          emptyState(events,"暂时无法读取统计，请稍后重试");
          emptyState(daily,"");
          updated.textContent = "";
        }
      }

      periodSelect.addEventListener("change",loadStats);
      loadStats();
    </script>
  </body>
</html>`;
