# 匿名聚合访问统计

独立 Cloudflare Worker + D1 服务，用于统计个人主页的页面访问、Demo、CV、源码、Skill 下载、研究 PDF 和社交联系点击。

## 隐私边界

数据库只保存 `day`、`event`、`count`、`updated_at`，即日期、事件名、聚合计数和更新时间。不使用追踪 Cookie，不保存 IP、User-Agent、Referrer、访客 ID 或点击明细。统计结果表示页面访问与点击次数，不代表唯一访客人数。

`POST /api/event` 仅接受白名单事件、不超过 256 字节的 JSON 请求体，以及 `https://zc-ruc.github.io` 来源。`GET /api/stats` 和 Dashboard 仅提供聚合结果。

## 本地开发

```bash
cd analytics
npm install
npx wrangler login
```

首次创建 D1 数据库：

```bash
npx wrangler d1 create zc-homepage-analytics
```

将输出中的 `database_id` 写入 `wrangler.jsonc`，然后初始化本地数据库并启动开发服务：

```bash
npx wrangler d1 execute DB --file schema.sql --local
npm run dev
```

## 部署

```bash
npx wrangler d1 execute DB --file schema.sql --remote
npm run deploy
```

部署后，将 Worker 的 `/api/event` 地址写入网站根目录 `analytics.js` 的 `ANALYTICS_ENDPOINT`。可选统计区间为 `7`、`30`、`90`、`all`。

当前部署：

- Dashboard：https://zc-homepage-analytics.zhangchong050812.workers.dev/
- 事件接口：https://zc-homepage-analytics.zhangchong050812.workers.dev/api/event
- 聚合 JSON：https://zc-homepage-analytics.zhangchong050812.workers.dev/api/stats?days=30

## 验证与维护

使用专用 `system:ping` 检查生产接口，并在验证后删除测试事件：

```bash
npx wrangler d1 execute DB --remote --command "DELETE FROM event_counts WHERE event = 'system:ping'"
```

查看聚合数据：

```bash
npx wrangler d1 execute DB --remote --command "SELECT day, event, count, updated_at FROM event_counts ORDER BY day DESC, event"
```

如需调整统计内容，应同时更新 `worker.js` 的事件白名单、网站 `analytics.js` 的事件属性和 `dashboard.js` 的显示名称。
