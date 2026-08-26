import fs from 'node:fs/promises'
import path from 'node:path'
const root = process.cwd()
const match = /<:\w+:(\d+)>/
const master = JSON.parse(await fs.readFile(path.join(root, 'emojis.json'), 'utf8'))
const uploadedPath = path.join(root, 'emojis.uploaded.json')
const uploaded = JSON.parse(await fs.readFile(uploadedPath, 'utf8'))
if (!process.env.DISCORD_APPLICATION_ID || !process.env.DISCORD_BOT_TOKEN) throw new Error('DISCORD_APPLICATION_ID and DISCORD_BOT_TOKEN are required.')
for (const [name, source] of Object.entries(master)) {
  if (uploaded[name]) continue
  const id = source.match(match)?.[1]
  if (!id) continue
  const image = await fetch(`https://cdn.discordapp.com/emojis/${id}.png`).then((res) => res.arrayBuffer())
  const response = await fetch(`https://discord.com/api/v10/applications/${process.env.DISCORD_APPLICATION_ID}/emojis`, { method: 'POST', headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name.toLowerCase(), image: `data:image/png;base64,${Buffer.from(image).toString('base64')}` }) })
  if (!response.ok) throw new Error(`Failed to upload ${name}: ${response.status}`)
  uploaded[name] = (await response.json()).id
  await fs.writeFile(uploadedPath, `${JSON.stringify(uploaded, null, 2)}\n`)
  console.log(`Uploaded ${name}`)
}
