# AI 使用情况（公开快照）

这是个人主页的静态公开版，只发布聚合 Token 数据。页面支持自定义时间段、每周趋势、分时热力图、工具分布、模型分布，以及活跃时长、会话数和消息数；项目、终端、会话明细和费用都不会写入 `usage/data.json`。活动指标与分时热力图仅使用带本机时间戳的聚合会话记录。

在本机完整仪表盘完成同步后，使用下面的命令更新公开快照：

```bash
node scripts/update-usage-public.mjs --source /Users/leehom/Documents/kimi/tasks/2026-09-06/08-09-46-097bc3bf/vibe-usage/public/usage-data.json
```

随后提交 `usage/` 下的变更即可发布新的静态数据。
