'use client'

import { useState } from 'react'
import { Activity, AlertTriangle, CheckCircle2, ChevronRight, CircleHelp, CloudUpload, FileWarning, Fingerprint, Gauge, LayoutDashboard, LockKeyhole, Menu, RefreshCw, Search, Settings2, ShieldCheck, Terminal, UploadCloud, XCircle } from 'lucide-react'

type Scan = { name: string; type: string; status: 'Clean' | 'Threat found' | 'Scanning'; time: string; score: string }

const initialScans: Scan[] = [
  { name: 'invoice_2026-08.pdf', type: 'PDF document', status: 'Clean', time: '2 min ago', score: '0 / 68' },
  { name: 'plugin-update.zip', type: 'ZIP archive', status: 'Threat found', time: '18 min ago', score: '4 / 68' },
  { name: 'brand-assets.tar.gz', type: 'Archive', status: 'Clean', time: '42 min ago', score: '0 / 68' },
  { name: 'report-q3.xlsx', type: 'Spreadsheet', status: 'Clean', time: '1 hr ago', score: '0 / 68' },
]

export default function Page() {
  const [scans, setScans] = useState(initialScans)
  const [isScanning, setIsScanning] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  function startDemoScan() {
    setIsScanning(true)
    setScans((current) => [{ name: 'manual-upload.bin', type: 'Binary file', status: 'Scanning', time: 'Just now', score: '—' }, ...current])
    window.setTimeout(() => {
      setScans((current) => current.map((scan, index) => index === 0 ? { ...scan, status: 'Clean', score: '0 / 68' } : scan))
      setIsScanning(false)
    }, 1200)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <aside className={`fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-border bg-sidebar px-4 py-5 transition-transform md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 px-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><ShieldCheck className="size-5" /></div>
          <div><p className="font-mono text-sm font-semibold tracking-tight">SCANGUARD</p><p className="text-xs text-muted-foreground">security operations</p></div>
        </div>
        <nav className="mt-10 flex flex-col gap-1" aria-label="Main navigation">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Workspace</p>
          <a className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2.5 text-sm font-medium text-sidebar-accent-foreground" href="#overview"><LayoutDashboard className="size-4" /> Overview</a>
          <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground" href="#scans"><Search className="size-4" /> Scan history <span className="ml-auto rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">248</span></a>
          <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground" href="#bot"><Terminal className="size-4" /> Discord bot</a>
          <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground" href="#emojis"><Fingerprint className="size-4" /> Emoji assets</a>
        </nav>
        <div className="mt-auto flex flex-col gap-1 border-t border-border pt-4">
          <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground" href="#settings"><Settings2 className="size-4" /> Settings</a>
          <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground" href="#help"><CircleHelp className="size-4" /> Documentation</a>
          <div className="mt-3 flex items-center gap-3 rounded-lg bg-muted/60 p-3"><div className="flex size-8 items-center justify-center rounded-full bg-primary font-mono text-xs text-primary-foreground">JD</div><div className="min-w-0"><p className="truncate text-xs font-medium">Jordan Davis</p><p className="truncate text-[11px] text-muted-foreground">jordan@acme.dev</p></div><ChevronRight className="ml-auto size-4 text-muted-foreground" /></div>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="flex h-16 items-center justify-between border-b border-border px-5 md:px-8"><button aria-label="Open menu" className="rounded-lg p-2 hover:bg-muted md:hidden" onClick={() => setMobileOpen(true)}><Menu className="size-5" /></button><div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex"><span>Workspace</span><ChevronRight className="size-3" /><span className="text-foreground">Overview</span></div><div className="flex items-center gap-3"><span className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><span className="size-2 rounded-full bg-emerald-500" /> All systems operational</span><button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-muted" aria-label="Refresh"><RefreshCw className="size-4" /></button></div></header>
        {mobileOpen && <button className="fixed inset-0 z-10 bg-background/70 md:hidden" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
        <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-8">
          <section id="overview" className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"><Activity className="size-3 text-emerald-500" /> Live monitoring</div><h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Good morning, Jordan.</h1><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">Your workspace is protected. Review your latest scans or send a file for analysis.</p></div><button onClick={startDemoScan} disabled={isScanning} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60"><UploadCloud className="size-4" /> {isScanning ? 'Scanning file...' : 'Scan a file'}</button></section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Files scanned" value="248" note="+18% this month" icon={<FileWarning className="size-4" />} /><Stat label="Threats blocked" value="07" note="Last detected 18m ago" icon={<AlertTriangle className="size-4" />} danger /><Stat label="Clean rate" value="97.2%" note="Across 68 engines" icon={<Gauge className="size-4" />} /><Stat label="Bot uptime" value="99.98%" note="Running in 3 servers" icon={<Activity className="size-4" />} /></section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <div id="scans" className="rounded-xl border border-border bg-card"><div className="flex items-center justify-between border-b border-border px-5 py-4"><div><h2 className="text-sm font-semibold">Recent scans</h2><p className="mt-1 text-xs text-muted-foreground">Latest activity across your workspace</p></div><button className="text-xs font-medium text-muted-foreground hover:text-foreground">View all <ChevronRight className="ml-1 inline size-3" /></button></div><div className="divide-y divide-border">{scans.map((scan) => <div key={`${scan.name}-${scan.time}`} className="flex items-center gap-4 px-5 py-4"><div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${scan.status === 'Threat found' ? 'bg-destructive/10 text-destructive' : scan.status === 'Scanning' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}`}>{scan.status === 'Threat found' ? <XCircle className="size-4" /> : scan.status === 'Scanning' ? <RefreshCw className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{scan.name}</p><p className="mt-0.5 text-xs text-muted-foreground">{scan.type} · {scan.time}</p></div><div className="hidden text-right sm:block"><p className={`text-xs font-semibold ${scan.status === 'Threat found' ? 'text-destructive' : scan.status === 'Scanning' ? 'text-amber-600' : 'text-emerald-600'}`}>{scan.status}</p><p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{scan.score} detections</p></div><ChevronRight className="size-4 text-muted-foreground" /></div>)}</div></div>
            <div className="flex flex-col gap-6"><div className="rounded-xl border border-border bg-card p-5"><div className="flex items-start justify-between"><div><h2 className="text-sm font-semibold">VirusTotal coverage</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">Global intelligence powering every scan.</p></div><div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"><LockKeyhole className="size-4" /></div></div><div className="mt-6 flex items-end justify-between"><p className="font-mono text-3xl font-semibold">68</p><p className="pb-1 text-xs text-muted-foreground">engines connected</p></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full w-[92%] rounded-full bg-emerald-500" /></div><p className="mt-3 text-xs text-muted-foreground"><span className="font-medium text-emerald-600">92% availability</span> · refreshed just now</p></div><div id="bot" className="rounded-xl border border-border bg-card p-5"><div className="flex items-center justify-between"><div><h2 className="text-sm font-semibold">Discord gateway</h2><p className="mt-1 text-xs text-muted-foreground">scanguard#0420 · 3 servers</p></div><span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-600"><span className="size-1.5 rounded-full bg-emerald-500" /> Online</span></div><div className="mt-5 flex items-center gap-2 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground"><Terminal className="size-4 text-primary" /><span>Listening for attachments and commands</span></div></div></div>
          </section>

          <section className="mt-6 grid gap-6 lg:grid-cols-2"><div id="upload" className="group rounded-xl border border-dashed border-border bg-card p-6 transition-colors hover:border-primary/50"><div className="flex flex-col items-center justify-center py-8 text-center"><div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-muted group-hover:bg-primary/10"><CloudUpload className="size-6 text-muted-foreground group-hover:text-primary" /></div><h2 className="text-sm font-semibold">Drop a file to scan</h2><p className="mt-2 max-w-xs text-xs leading-5 text-muted-foreground">Upload a file from your dashboard. We&apos;ll inspect it with 68 antivirus engines.</p><button onClick={startDemoScan} className="mt-5 rounded-lg border border-border px-4 py-2 text-xs font-medium hover:bg-muted">Choose file</button><p className="mt-4 font-mono text-[10px] text-muted-foreground">MAX 32 MB · SHA-256 ANALYSIS</p></div></div><div id="emojis" className="rounded-xl border border-border bg-card p-6"><div className="flex items-start justify-between"><div><h2 className="text-sm font-semibold">Emoji assets</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">Application-owned assets work across every server.</p></div><Fingerprint className="size-5 text-muted-foreground" /></div><div className="mt-6 flex items-center gap-4"><div className="flex -space-x-2"><span className="flex size-9 items-center justify-center rounded-full border-2 border-card bg-emerald-500/15 text-emerald-600">✓</span><span className="flex size-9 items-center justify-center rounded-full border-2 border-card bg-destructive/15 text-destructive">!</span><span className="flex size-9 items-center justify-center rounded-full border-2 border-card bg-amber-500/15 text-amber-600">?</span></div><div><p className="text-sm font-semibold">3 / 3 ready</p><p className="text-xs text-muted-foreground">Uploaded to bot application</p></div></div><div className="mt-6 flex items-center justify-between border-t border-border pt-4"><span className="font-mono text-[10px] text-muted-foreground">emojis.uploaded.json</span><span className="text-xs font-medium text-emerald-600">Synced</span></div></div></section>
        </div>
      </div>
    </main>
  )
}

function Stat({ label, value, note, icon, danger }: { label: string; value: string; note: string; icon: React.ReactNode; danger?: boolean }) { return <div className="rounded-xl border border-border bg-card p-5"><div className="flex items-center justify-between"><p className="text-xs text-muted-foreground">{label}</p><span className={danger ? 'text-destructive' : 'text-muted-foreground'}>{icon}</span></div><p className="mt-4 font-mono text-3xl font-semibold tracking-tight">{value}</p><p className={`mt-2 text-xs ${danger ? 'text-destructive' : 'text-muted-foreground'}`}>{note}</p></div> }
