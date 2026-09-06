const DATA_URL = './data.json?v=data-v1'
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 })
const full = new Intl.NumberFormat('en-US')
const dateFormat = new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })
const formatDate = (value) => dateFormat.format(new Date(value + 'T00:00:00'))
const totalOf = (row) => Number(row.input || 0) + Number(row.output || 0) + Number(row.cache || 0)
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]))
const formatDuration = (seconds) => {
  const minutes = Math.round(seconds / 60)
  const hours = Math.floor(minutes / 60)
  return hours ? hours + 'h ' + (minutes % 60) + 'm' : minutes + 'm'
}

function sum(records) {
  return records.reduce((result, row) => ({
    input: result.input + Number(row.input || 0),
    output: result.output + Number(row.output || 0),
    cache: result.cache + Number(row.cache || 0),
  }), { input: 0, output: 0, cache: 0 })
}

function distribution(records, key, limit) {
  const map = new Map()
  records.forEach((row) => map.set(row[key], (map.get(row[key]) || 0) + totalOf(row)))
  return [...map.entries()].map(([name, tokens]) => ({ name, tokens }))
    .filter((item) => item.tokens > 0).sort((a, b) => b.tokens - a.tokens).slice(0, limit)
}

function rankList(node, items) {
  const max = Math.max(...items.map((item) => item.tokens), 1)
  node.innerHTML = items.length
    ? items.map((item) => '<div class="rank-row"><span class="rank-name" title="' + escapeHtml(item.name) + '">' + escapeHtml(item.name) + '</span><span class="rank-value">' + compact.format(item.tokens) + '</span><span class="bar"><i style="width:' + ((item.tokens / max) * 100) + '%"></i></span></div>').join('')
    : '<p class="empty">该时间段没有可展示的数据。</p>'
}

function startOfWeek(date) {
  const point = new Date(date + 'T00:00:00')
  const day = (point.getDay() + 6) % 7
  point.setDate(point.getDate() - day)
  return point.toISOString().slice(0, 10)
}

function weekly(records) {
  const map = new Map()
  records.forEach((row) => {
    const week = startOfWeek(row.date)
    map.set(week, (map.get(week) || 0) + totalOf(row))
  })
  return [...map.entries()].map(([date, tokens]) => ({ date, tokens })).sort((a, b) => a.date.localeCompare(b.date))
}

function renderTrend(points) {
  const svg = document.querySelector('#trend-chart')
  const tooltip = document.querySelector('#tooltip')
  const width = 900, height = 280, top = 16, bottom = 20
  const max = Math.max(...points.map((item) => item.tokens), 1)
  const slot = width / Math.max(points.length, 1)
  const barWidth = Math.max(2, slot * 0.66)
  const grid = [0.25, 0.5, 0.75].map((ratio) => '<line x1="0" x2="' + width + '" y1="' + (top + ratio * (height - top - bottom)) + '" y2="' + (top + ratio * (height - top - bottom)) + '" stroke="#e4e6eb" stroke-dasharray="4 5"/>').join('')
  const bars = points.map((item, index) => {
    const barHeight = (item.tokens / max) * (height - top - bottom)
    return '<rect x="' + (index * slot + (slot - barWidth) / 2) + '" y="' + (height - bottom - barHeight) + '" width="' + barWidth + '" height="' + barHeight + '" rx="3" fill="#4779ef"/>'
  }).join('')
  svg.innerHTML = grid + bars
  svg.onmousemove = (event) => {
    if (!points.length) return
    const rect = svg.getBoundingClientRect()
    const index = Math.min(points.length - 1, Math.max(0, Math.floor(((event.clientX - rect.left) / rect.width) * points.length)))
    const item = points[index]
    tooltip.textContent = formatDate(item.date) + ' 当周 · ' + full.format(item.tokens) + ' Token'
    tooltip.hidden = false
    tooltip.style.left = (((index + 0.5) / points.length) * 100) + '%'
    tooltip.style.top = Math.max(10, 100 - (item.tokens / max) * 100) + '%'
  }
  svg.onmouseleave = () => { tooltip.hidden = true }
}

function renderHeatmap(hourly) {
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const values = new Map()
  hourly.forEach((point) => {
    const nativeDay = new Date(point.date + 'T00:00:00').getDay()
    const day = (nativeDay + 6) % 7
    const key = day + '-' + point.hour
    values.set(key, (values.get(key) || 0) + point.tokens)
  })
  const max = Math.max(...values.values(), 1)
  const cells = ['<span></span>']
  for (let hour = 0; hour < 24; hour += 1) cells.push('<span class="heat-hour">' + (hour % 3 === 0 ? String(hour).padStart(2, '0') : '') + '</span>')
  days.forEach((day, dayIndex) => {
    cells.push('<span class="heat-day">' + day + '</span>')
    for (let hour = 0; hour < 24; hour += 1) {
      const tokens = values.get(dayIndex + '-' + hour) || 0
      const level = tokens ? Math.max(1, Math.ceil((tokens / max) * 5)) : 0
      cells.push('<span class="heat-cell level-' + level + '" title="' + day + ' ' + String(hour).padStart(2, '0') + ':00 · ' + full.format(tokens) + ' Token"></span>')
    }
  })
  document.querySelector('#heatmap').innerHTML = '<div class="heat-scroll"><div class="heatmap">' + cells.join('') + '</div></div>'
}

function update(data, range) {
  const records = data.records.filter((row) => row.date >= range.from && row.date <= range.to)
  const hourly = data.hourly.filter((row) => row.date >= range.from && row.date <= range.to)
  const activity = data.activity.filter((row) => row.date >= range.from && row.date <= range.to)
  const totals = sum(records)
  const activityTotals = activity.reduce((result, row) => ({
    activeSec: result.activeSec + Number(row.activeSec || 0),
    sessions: result.sessions + Number(row.sessions || 0),
    messages: result.messages + Number(row.messages || 0),
  }), { activeSec: 0, sessions: 0, messages: 0 })
  document.querySelector('#total').textContent = compact.format(totals.input + totals.output + totals.cache)
  document.querySelector('#input').textContent = compact.format(totals.input)
  document.querySelector('#output').textContent = compact.format(totals.output)
  document.querySelector('#cache').textContent = compact.format(totals.cache)
  document.querySelector('#active-duration').textContent = formatDuration(activityTotals.activeSec)
  document.querySelector('#session-count').textContent = full.format(activityTotals.sessions)
  document.querySelector('#message-count').textContent = full.format(activityTotals.messages)
  document.querySelector('#trend-range').textContent = formatDate(range.from) + ' — ' + formatDate(range.to)
  document.querySelector('#range-start').textContent = formatDate(range.from)
  document.querySelector('#range-end').textContent = formatDate(range.to)
  rankList(document.querySelector('#agent-list'), distribution(records, 'agent', 8))
  rankList(document.querySelector('#model-list'), distribution(records, 'model', 8))
  renderTrend(weekly(records))
  renderHeatmap(hourly)
}

let updateTimer
function animateUpdate(data, range) {
  const status = document.querySelector('#updating')
  document.body.classList.add('dashboard-loading')
  status.hidden = false
  clearTimeout(updateTimer)
  updateTimer = window.setTimeout(() => {
    update(data, range)
    document.body.classList.remove('dashboard-loading')
    status.hidden = true
  }, 180)
}

fetch(DATA_URL)
  .then((response) => { if (!response.ok) throw new Error('数据快照尚未生成'); return response.json() })
  .then((data) => {
    const from = document.querySelector('#from-date')
    const to = document.querySelector('#to-date')
    const apply = () => {
      if (!from.value || !to.value || from.value > to.value) return
      document.querySelectorAll('.range-button').forEach((button) => button.classList.remove('is-active'))
      animateUpdate(data, { from: from.value, to: to.value })
    }
    from.value = data.range.since
    to.value = data.range.until
    document.querySelector('#snapshot').textContent = '更新于 ' + new Date(data.generatedAt).toLocaleString('zh-CN', { dateStyle: 'medium' })
    document.querySelector('#apply-range').addEventListener('click', apply)
    document.querySelectorAll('.range-button').forEach((button) => button.addEventListener('click', () => {
      const days = button.dataset.range
      let start = data.range.since
      if (days !== 'all') {
        const end = new Date(data.range.until + 'T00:00:00')
        end.setDate(end.getDate() - Number(days) + 1)
        start = end.toISOString().slice(0, 10)
      }
      from.value = start
      to.value = data.range.until
      document.querySelectorAll('.range-button').forEach((item) => item.classList.toggle('is-active', item === button))
      animateUpdate(data, { from: start, to: data.range.until })
    }))
    update(data, { from: data.range.since, to: data.range.until })
  })
  .catch((error) => { document.querySelector('#snapshot').textContent = error.message })
