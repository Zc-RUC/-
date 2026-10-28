import { dashboard } from "./dashboard.js";

const allowedOrigin = "https://zc-ruc.github.io";
const allowedEvents = new Set([
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
  "contact:copy-email",
  "system:ping"
]);

const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" }
  });
}

async function recordEvent(request, env) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (request.headers.get("Origin") !== allowedOrigin) return json({ error: "Forbidden" }, 403);

  const declaredLength = Number(request.headers.get("Content-Length") || 0);
  if (declaredLength > 256) return json({ error: "Payload too large" }, 413);
  const body = await request.text();
  if (body.length > 256) return json({ error: "Payload too large" }, 413);

  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  if (!payload || typeof payload.name !== "string" || !allowedEvents.has(payload.name)) {
    return json({ error: "Invalid event" }, 400);
  }

  const day = new Date().toISOString().slice(0, 10);
  await env.DB.prepare(`
    INSERT INTO event_counts (day, event, count, updated_at)
    VALUES (?, ?, 1, CURRENT_TIMESTAMP)
    ON CONFLICT(day, event) DO UPDATE SET
      count = count + 1,
      updated_at = CURRENT_TIMESTAMP
  `).bind(day, payload.name).run();
  return new Response(null, { status: 204, headers: corsHeaders });
}

async function readStats(url, env) {
  const period = url.searchParams.get("days") || "30";
  if (!["7", "30", "90", "all"].includes(period)) return json({ error: "Invalid period" }, 400);

  const params = [];
  let where = "";
  if (period !== "all") {
    const days = Number(period);
    const since = new Date(Date.now() - (days - 1) * 86400000).toISOString().slice(0, 10);
    where = "WHERE day >= ?";
    params.push(since);
  }

  const query = (sql) => {
    const statement = env.DB.prepare(sql);
    return (params.length ? statement.bind(...params) : statement).all();
  };
  const [totals, daily] = await Promise.all([
    query(`SELECT event, SUM(count) AS count FROM event_counts ${where} GROUP BY event ORDER BY count DESC`),
    query(`SELECT day, event, count FROM event_counts ${where} ORDER BY day ASC, event ASC`)
  ]);
  return json({ period, totals: totals.results, daily: daily.results, generatedAt: new Date().toISOString() });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname === "/api/event") return await recordEvent(request, env);
      if (url.pathname === "/api/stats" && request.method === "GET") return await readStats(url, env);
      if (url.pathname === "/" && request.method === "GET") {
        return new Response(dashboard, {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store",
            "X-Content-Type-Options": "nosniff",
            "Referrer-Policy": "no-referrer"
          }
        });
      }
      return json({ error: "Not found" }, 404);
    } catch {
      return json({ error: "Internal error" }, 500);
    }
  }
};
