const dayjs = require('dayjs')

const tool = {}

tool.formatTime = (t, f) => dayjs(t).format(f)

module.exports = tool
