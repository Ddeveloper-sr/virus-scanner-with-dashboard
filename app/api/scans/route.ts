import { NextResponse } from 'next/server'
import type { ScanRecord } from '@/lib/scan'

const demoScans: ScanRecord[] = [
  { id: '1', filename: 'invoice_2026-08.pdf', size: 824000, source: 'dashboard', verdict: 'clean', detections: 0, totalEngines: 68, createdAt: new Date().toISOString() },
  { id: '2', filename: 'plugin-update.zip', size: 4210000, source: 'discord', verdict: 'threat', detections: 4, totalEngines: 68, createdAt: new Date(Date.now() - 18 * 60000).toISOString() },
]
export async function GET() { return NextResponse.json({ scans: demoScans, mode: process.env.VIRUSTOTAL_API_KEY ? 'live' : 'demo' }) }
