export type ScanVerdict = 'clean' | 'threat' | 'pending' | 'error'
export type ScanSource = 'discord' | 'dashboard'
export type ScanRecord = { id: string; filename: string; size: number; source: ScanSource; verdict: ScanVerdict; detections: number; totalEngines: number; createdAt: string }

export const MAX_FILE_SIZE = 32 * 1024 * 1024
export const ALLOWED_TYPES = new Set(['application/pdf', 'application/zip', 'application/x-7z-compressed', 'application/gzip', 'application/x-gzip', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/octet-stream'])

export function validateFile(file: File) {
  if (!file || file.size === 0) return 'Select a non-empty file.'
  if (file.size > MAX_FILE_SIZE) return 'Files must be 32 MB or smaller.'
  return null
}

export function normalizeVerdict(stats: { malicious?: number; suspicious?: number } | undefined): ScanVerdict {
  if (!stats) return 'pending'
  if ((stats.malicious ?? 0) > 0) return 'threat'
  return 'clean'
}
