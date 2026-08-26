import fs from 'node:fs/promises'
import path from 'node:path'
const root = process.cwd()
export async function resolveEmoji(name) {
  const master = JSON.parse(await fs.readFile(path.join(root, 'emojis.json'), 'utf8'))
  const uploaded = JSON.parse(await fs.readFile(path.join(root, 'emojis.uploaded.json'), 'utf8'))
  if (uploaded[name]) return `<:${name}:${uploaded[name]}>`
  return master[name] ?? ''
}
export async function resolveAllEmojis() { const names = Object.keys(JSON.parse(await fs.readFile(path.join(root, 'emojis.json'), 'utf8'))); return Object.fromEntries(await Promise.all(names.map(async (name) => [name, await resolveEmoji(name)]))) }
