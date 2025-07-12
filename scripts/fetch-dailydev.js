require('dotenv').config();
const Parser = require('rss-parser');
const fs = require('fs-extra');
const path = require('path');

// Load configuration
const config = require('../config.json');

async function fetchDailyDevBookmarks() {
  const rssUrl = process.env.DAILYDEV_RSS_URL || config.sources.dailydev.rssUrl;

  if (!rssUrl) {
    console.log('DAILYDEV_RSS_URL not found, skipping daily.dev fetch');
    return;
  }

  try {
    console.log('Fetching daily.dev bookmarks...');

    const parser = new Parser();
    const feed = await parser.parseURL(rssUrl);
    console.log('Feed:', JSON.stringify(feed.items));
    const articles = feed.items.slice(0, config.sync.maxArticles || 50).map(item => ({
      id: item.guid || item.link || '',
      title: item.title || '',
      description: item.contentSnippet || item.content || '',
      url: item.link || '',
      published_at: item.isoDate || item.pubDate || '',
      reading_time: null, // RSS doesn't provide reading time
      author: {
        name: item.creator || item.author || 'Unknown',
        username: null,
        profile_image: null
      },
      tags: Array.isArray(item.categories) ? item.categories : [],
      cover_image: item['media:content']?.['$']?.url || null,
      source: 'daily.dev',
      saved_at: new Date().toISOString()
    }));

    // Save to data file
    const dataPath = path.join(__dirname, '../data/dailydev.json');
    await fs.ensureDir(path.dirname(dataPath));
    await fs.writeJson(dataPath, {
      last_updated: new Date().toISOString(),
      count: articles.length,
      articles: articles
    }, { spaces: 2 });

    console.log(`✅ Fetched ${articles.length} articles from daily.dev bookmarks`);

  } catch (error) {
    console.error('❌ Error fetching daily.dev bookmarks:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  fetchDailyDevBookmarks();
}

module.exports = fetchDailyDevBookmarks;