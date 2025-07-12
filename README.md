# Reading List

A public reading list that automatically syncs bookmarks and articles from popular platforms like dev.to and daily.dev using GitHub Actions.

## Features

- 🔄 **Auto-sync**: GitHub Actions fetch bookmarks from dev.to and daily.dev
- 📱 **Public UI**: Beautiful web interface at `{username}.github.io/readinglist`
- 🎯 **Open Source**: Easy to fork and customize for your own reading list
- 📊 **Multiple Sources**: Support for dev.to reading list and daily.dev bookmarks

## Quick Start

1. **Fork this repository**
2. **Set up environment variables**:
   - Go to your repo Settings → Secrets and variables → Actions
   - Add `DEVTO_API_KEY` with your dev.to API key
   - Add `DAILYDEV_RSS_URL` with your daily.dev RSS feed URL (optional)

3. **Customize the configuration**:
   - Edit `config.json` to set your username and preferences
   - Update the GitHub Actions workflow schedule in `.github/workflows/sync.yml`

4. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Set source to "Deploy from a branch"
   - Select `gh-pages` branch

## Data Sources

### dev.to Reading List
- Go to [dev.to/settings/account](https://dev.to/settings/account)
- Requires API key from your dev.to account
- Fetches articles from your reading list

### daily.dev Bookmarks
- Uses RSS feed from your shareable bookmarks
- No API key required
- Public RSS feed URL needed

## Project Structure

```
readinglist/
├── .github/workflows/sync.yml    # GitHub Actions workflow
├── data/                         # Synced data (auto-generated)
│   ├── devto.json               # dev.to reading list
│   └── dailydev.json            # daily.dev bookmarks
├── frontend/                     # React app for GitHub Pages
├── scripts/                      # Fetch scripts
│   ├── fetch-devto.js           # dev.to API script
│   └── fetch-dailydev.js        # daily.dev RSS script
├── config.json                   # Configuration
└── README.md                     # This file
```

## Configuration

Edit `config.json` to customize your setup:

```json
{
  "username": "your-github-username",
  "repo": "readinglist",
  "sources": {
    "devto": {
      "enabled": true,
      "username": "your-devto-username"
    },
    "dailydev": {
      "enabled": true,
      "rssUrl": "your-dailydev-rss-url"
    }
  },
  "ui": {
    "title": "My Reading List",
    "description": "Articles and bookmarks I'm reading"
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

If you have questions or need help setting up your own reading list, please open an issue!