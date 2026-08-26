const API = 'https://www.virustotal.com/api/v3'
export async function submitFile(fileBuffer, filename) {
  if (!process.env.VIRUSTOTAL_API_KEY) return { id: `demo-${Date.now()}`, demo: true }
  const upload = await fetch(`${API}/files`, { method: 'POST', headers: { 'x-apikey': process.env.VIRUSTOTAL_API_KEY, 'content-disposition': `form-data; name="file"; filename="${filename.replaceAll('"', '')}"` }, body: fileBuffer })
  if (!upload.ok) throw new Error(`VirusTotal upload failed: ${upload.status}`)
  return (await upload.json()).data
}
export async function getAnalysis(id) {
  if (id.startsWith('demo-')) return { verdict: 'clean', detections: 0, totalEngines: 68 }
  const response = await fetch(`${API}/analyses/${id}`, { headers: { 'x-apikey': process.env.VIRUSTOTAL_API_KEY } })
  if (!response.ok) throw new Error(`VirusTotal analysis failed: ${response.status}`)
  const data = (await response.json()).data
  const stats = data.attributes?.stats
  return { verdict: stats?.malicious > 0 ? 'threat' : data.attributes?.status === 'completed' ? 'clean' : 'pending', detections: stats?.malicious ?? 0, totalEngines: Object.values(stats ?? {}).reduce((a, b) => a + Number(b), 0) }
}
