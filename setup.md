# Setup Guide

Follow these steps to set up your own reading list:

## 1. Fork and Clone

1. Fork this repository to your GitHub account
2. Clone your forked repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/readinglist.git
   cd readinglist
   ```

## 2. Configure Your Settings

1. Edit `config.json` with your information:
   ```json
   {
     "username": "YOUR_GITHUB_USERNAME",
     "repo": "readinglist",
     "sources": {
       "devto": {
         "enabled": true,
         "username": "YOUR_DEVTO_USERNAME"
       },
       "dailydev": {
         "enabled": true,
         "rssUrl": "YOUR_DAILYDEV_RSS_URL"
       }
     },
     "ui": {
       "title": "Your Name's Reading List",
       "description": "Articles and bookmarks I'm reading"
     }
   }
   ```

## 3. Get API Keys and URLs

### dev.to API Key
1. Go to [dev.to/settings/account](https://dev.to/settings/account)
2. Scroll down to "API Keys" section
3. Generate a new API key
4. Copy the key

### daily.dev RSS URL
1. Go to [daily.dev](https://daily.dev)
2. Navigate to your bookmarks
3. Look for the RSS feed URL (usually in the format: `https://daily.dev/rss/your-username`)

## 4. Set GitHub Secrets

1. Go to your repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Add the following secrets:
   - `DEVTO_API_KEY`: Your dev.to API key
   - `DAILYDEV_RSS_URL`: Your daily.dev RSS feed URL

## 5. Enable GitHub Pages

1. Go to Settings → Pages
2. Set source to "Deploy from a branch"
3. Select `gh-pages` branch
4. Save

## 6. Test the Setup

1. Go to Actions tab in your repository
2. Click on "Sync Reading List" workflow
3. Click "Run workflow" to manually trigger the first sync
4. Wait for the workflow to complete

## 7. Access Your Reading List

Your reading list will be available at:
```
https://YOUR_USERNAME.github.io/readinglist/
```

## Troubleshooting

### No articles showing up?
- Check that your API keys and RSS URLs are correct
- Look at the GitHub Actions logs for any errors
- Make sure you have articles in your dev.to reading list or daily.dev bookmarks

### GitHub Pages not working?
- Ensure the `gh-pages` branch was created
- Check that the base path in `frontend/vite.config.js` matches your repository name
- Wait a few minutes for GitHub Pages to build

### Need help?
- Open an issue in this repository
- Check the GitHub Actions logs for error messages