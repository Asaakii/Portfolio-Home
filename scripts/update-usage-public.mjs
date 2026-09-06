#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const sourceIndex = args.indexOf('--source')
const sourceFile = sourceIndex >= 0 ? args[sourceIndex + 1] : null
const extraIndex = args.indexOf('--extra')

if (!sourceFile) {
  console.error('用法：node scripts/update-usage-public.mjs --source /绝对路径/usage-data.json')
  process.exit(1)
}

const resolvedSource = path.resolve(sourceFile)
const raw = JSON.parse(fs.readFileSync(resolvedSource, 'utf8'))
const extraFile = extraIndex >= 0
  ? path.resolve(args[extraIndex + 1])
  : path.join(path.dirname(resolvedSource), 'extra-data.json')
const extra = fs.existsSync(extraFile)
  ? JSON.parse(fs.readFileSync(extraFile, 'utf8'))
  : { daily: [] }

const totalOf = (row) =>
  Number(row.inputTokens || 0) + Number(row.outputTokens || 0) + Number(row.cacheTokens || 0)

const recordsByDateAgentModel = new Map()
for (const row of raw.details || []) {
  if (!row.date || !row.agent || !row.model) continue
  const key = [row.date, row.agent, row.model].join('\u0001')
  const current = recordsByDateAgentModel.get(key) || {
    date: row.date, agent: row.agent, model: row.model,
    input: 0, output: 0, cache: 0, tokens: 0,
  }
  current.input += Number(row.inputTokens || 0)
  current.output += Number(row.outputTokens || 0)
  current.cache += Number(row.cacheTokens || 0)
  current.tokens += totalOf(row)
  recordsByDateAgentModel.set(key, current)
}

const records = [...recordsByDateAgentModel.values()]
  .filter((row) => row.tokens > 0)
  .sort((a, b) => a.date.localeCompare(b.date))

const hourlyByDateHour = new Map()
for (const point of raw.sessionPoints || []) {
  if (!point.d || !Number.isInteger(point.h)) continue
  const key = `${point.d}\u0001${point.h}`
  hourlyByDateHour.set(key, (hourlyByDateHour.get(key) || 0) + Number(point.t || 0))
}

const hourly = [...hourlyByDateHour.entries()]
  .map(([key, tokens]) => {
    const [date, hour] = key.split('\u0001')
    return { date, hour: Number(hour), tokens }
  })
  .filter((point) => point.tokens > 0)
  .sort((a, b) => a.date.localeCompare(b.date) || a.hour - b.hour)

const activityByDate = new Map()
for (const row of extra.daily || []) {
  if (!row.date) continue
  const current = activityByDate.get(row.date) || { date: row.date, activeSec: 0, sessions: 0, messages: 0 }
  current.activeSec += Number(row.activeSec || 0)
  current.sessions += Number(row.sessions || 0)
  current.messages += Number(row.userMsgs || 0) + Number(row.assistantMsgs || 0)
  activityByDate.set(row.date, current)
}

const activity = [...activityByDate.values()].sort((a, b) => a.date.localeCompare(b.date))

const tokens = (raw.details || []).reduce(
  (sum, row) => ({
    input: sum.input + Number(row.inputTokens || 0),
    output: sum.output + Number(row.outputTokens || 0),
    cache: sum.cache + Number(row.cacheTokens || 0),
  }),
  { input: 0, output: 0, cache: 0 },
)

const publicSnapshot = {
  generatedAt: raw.generatedAt,
  range: raw.range,
  note: '公开快照：仅含按日期、工具、模型和小时聚合的 Token 数据；不含项目、终端、会话明细和费用。',
  totals: {
    ...tokens,
    total: tokens.input + tokens.output + tokens.cache,
  },
  records,
  hourly,
  activity,
}

const outputFile = path.resolve('usage/data.json')
fs.writeFileSync(outputFile, `${JSON.stringify(publicSnapshot, null, 2)}\n`)
console.log(`已写入公开快照：${outputFile}`)
