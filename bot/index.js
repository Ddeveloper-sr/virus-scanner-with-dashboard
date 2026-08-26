import { submitFile, getAnalysis } from './virustotal.js'
import { scanResultMessage } from './components-v2.js'

export async function scanAttachment({ buffer, filename, source = 'discord' }) {
  const upload = await submitFile(buffer, filename)
  let result = upload.demo ? await getAnalysis(upload.id) : { verdict: 'pending', detections: 0, totalEngines: 68 }
  if (!upload.demo) { for (let attempt = 0; attempt < 12 && result.verdict === 'pending'; attempt++) { await new Promise((resolve) => setTimeout(resolve, 2500)); result = await getAnalysis(upload.id) } }
  return { ...result, filename, source, discordMessage: await scanResultMessage(result) }
}

export function startBot() {
  if (!process.env.DISCORD_BOT_TOKEN) throw new Error('DISCORD_BOT_TOKEN is required to start the Discord gateway.')
  console.log('[ScanGuard] Bot adapter ready. Wire discord.js events to scanAttachment().')
}
