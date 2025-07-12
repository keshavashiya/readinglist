require('dotenv').config();
const fetchDevTo = require('./fetch-devto');
const fetchDailyDev = require('./fetch-dailydev');

async function fetchAll() {
  console.log('🚀 Starting reading list sync...');

  try {
    // Run both fetch scripts in parallel
    await Promise.all([
      fetchDevTo(),
      fetchDailyDev()
    ]);

    console.log('✅ Reading list sync completed!');
  } catch (error) {
    console.error('❌ Error during sync:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  fetchAll();
}

module.exports = fetchAll;