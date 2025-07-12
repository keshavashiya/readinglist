require('dotenv').config();
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

// Load configuration
const config = require('../config.json');

async function fetchDevToReadingList() {
  const apiKey = process.env.DEVTO_API_KEY;
  const username = config.sources.devto.username;

  if (!apiKey) {
    console.log('DEVTO_API_KEY not found, skipping dev.to fetch');
    return;
  }

  if (!username) {
    console.log('dev.to username not configured, skipping dev.to fetch');
    return;
  }

  try {
    console.log('Fetching dev.to reading list...');

    // Fetch reading list from dev.to API
    const response = await axios.get(`https://dev.to/api/readinglist`, {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      params: {
        per_page: config.sync.maxArticles || 50
      }
    });

    // extract article from each readinglist item
    const articles = response.data.map(item => {
      const article = item.article;
      return {
        id: article.id,
        title: article.title,
        description: article.description,
        url: article.url,
        published_at: article.published_at || article.published_timestamp,
        reading_time: article.reading_time_minutes,
        author: {
          name: article.user?.name || 'Unknown',
          username: article.user?.username || 'unknown',
          profile_image: article.user?.profile_image_90 || null
        },
        tags: Array.isArray(article.tags) ? article.tags : (article.tags ? article.tags.split(',').map(t => t.trim()) : []),
        cover_image: article.cover_image,
        source: 'dev.to',
        saved_at: item.created_at || new Date().toISOString()
      };
    });

    // Save to data file
    const dataPath = path.join(__dirname, '../data/devto.json');
    await fs.ensureDir(path.dirname(dataPath));
    await fs.writeJson(dataPath, {
      last_updated: new Date().toISOString(),
      count: articles.length,
      articles: articles
    }, { spaces: 2 });

    console.log(`✅ Fetched ${articles.length} articles from dev.to reading list`);

  } catch (error) {
    console.error('❌ Error fetching dev.to reading list:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run if called directly
if (require.main === module) {
  fetchDevToReadingList();
}

module.exports = fetchDevToReadingList;