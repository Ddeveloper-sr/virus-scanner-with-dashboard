import { resolveEmoji } from './emoji-resolver.js'
export async function scanResultMessage(result) {
  const icon = await resolveEmoji(result.verdict === 'clean' ? 'SUCCESS' : result.verdict === 'threat' ? 'ERROR' : 'SCANNING')
  return { flags: 1 << 15, components: [{ type: 17, accent_color: result.verdict === 'clean' ? 0x35d399 : 0xef6b73, components: [{ type: 10, content: `${icon} **${result.verdict === 'clean' ? 'File is clean' : result.verdict === 'threat' ? 'Threat detected' : 'Analysis in progress'}**` }, { type: 10, content: `VirusTotal engines: **${result.detections} / ${result.totalEngines} detections**` }] }] }
}
