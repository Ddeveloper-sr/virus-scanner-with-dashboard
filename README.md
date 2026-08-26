# ScanGuard

ScanGuard is a Next.js dashboard and Discord bot foundation for scanning files with VirusTotal. It supports dashboard uploads, Discord attachment scanning, Discord Components V2 scan results, and application-owned custom emoji fallbacks.

## Features

- Security operations dashboard for scan activity and gateway health
- Dashboard scan endpoint at `POST /api/scan`
- Scan history endpoint at `GET /api/scans`
- VirusTotal upload and analysis polling adapter
- Discord attachment scanning through the bot
- Discord Components V2 result messages
- Manual dashboard scan flow
- `emojis.json` as the original guild emoji master list
- `emojis.uploaded.json` for application-owned emoji IDs
- Emoji upload utility that downloads original emoji assets and uploads them to the Discord application

## Requirements

- Node.js 20 or newer
- A Discord application and bot token
- A VirusTotal API key for live scanning
- Discord application emoji access enabled for the upload workflow

## Environment variables

Create a `.env.local` file for the dashboard and bot:

```bash
VIRUSTOTAL_API_KEY=your_virustotal_api_key
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_APPLICATION_ID=your_discord_application_id
DISCORD_GUILD_ID=your_guild_id
```

The dashboard uses a safe demo fallback when `VIRUSTOTAL_API_KEY` is not configured. Do not expose API keys in client-side code or commit `.env.local`.

## Install and run

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` to use the dashboard.

## Run the Discord bot

```bash
pnpm bot
```

The bot listens for file attachments, uploads them to VirusTotal, polls the analysis result, and replies with a Components V2 result message. Configure channel and file limits in `bot/index.js` as needed.

## Upload application emojis

`emojis.json` stores entries in the form:

```json
{
  "SUCCESS": "<:SUCCESS:123456789012345678>"
}
```

Run the uploader after setting the Discord environment variables:

```bash
pnpm upload-emojis
```

The script downloads each original guild emoji, uploads it to the Discord application, and writes application-owned IDs to `emojis.uploaded.json`. Runtime emoji resolution checks the uploaded file first and falls back to the original guild emoji when no application-owned ID exists.

## Production build

```bash
pnpm build
pnpm start
```

## Security notes

- Keep VirusTotal and Discord credentials server-side.
- Validate file size and file type before uploading.
- VirusTotal files may be retained according to VirusTotal account and API terms.
- Add authentication and persistent database storage before exposing the dashboard to multiple users.

## Project structure

```text
app/                 Next.js dashboard and API routes
bot/                 Discord bot, Components V2, VirusTotal, emoji utilities
lib/                 Shared scan contracts and helpers
emojis.json          Original guild emoji master list
emojis.uploaded.json Application-owned emoji ID map
```
