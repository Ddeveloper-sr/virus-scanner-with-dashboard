import { NextResponse } from 'next/server'
import { MAX_FILE_SIZE, validateFile } from '@/lib/scan'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const form = await request.formData()
  const file = form.get('file')
  if (!(file instanceof File)) return NextResponse.json({ error: 'A file field is required.' }, { status: 400 })
  const error = validateFile(file)
  if (error) return NextResponse.json({ error }, { status: 413 })
  if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'File too large.' }, { status: 413 })
  if (!process.env.VIRUSTOTAL_API_KEY) return NextResponse.json({ mode: 'demo', verdict: 'clean', detections: 0, totalEngines: 68, message: 'ScanGuard demo mode. Add VIRUSTOTAL_API_KEY for live analysis.' })
  const upload = await fetch('https://www.virustotal.com/api/v3/files', { method: 'POST', headers: { 'x-apikey': process.env.VIRUSTOTAL_API_KEY }, body: await file.arrayBuffer() })
  if (!upload.ok) return NextResponse.json({ error: 'VirusTotal upload failed.' }, { status: 502 })
  const result = await upload.json() as { data?: { id?: string } }
  return NextResponse.json({ mode: 'live', analysisId: result.data?.id, verdict: 'pending' })
}
