const axios = require('axios');

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

// ─── Risk Keywords ────────────────────────────────────
const RISK_KEYWORDS = [
  'strike', 'protest', 'flood', 'earthquake', 'fire',
  'explosion', 'shortage', 'disruption', 'shutdown',
  'bankruptcy', 'sanctions', 'war', 'conflict', 'storm',
  'hurricane', 'typhoon', 'drought', 'pandemic', 'lockdown',
  'supply chain', 'factory closure', 'port strike',
];

// ─── Severity Keywords ────────────────────────────────
const CRITICAL_KEYWORDS = ['war', 'explosion', 'earthquake', 'pandemic', 'sanctions'];
const HIGH_KEYWORDS     = ['flood', 'fire', 'strike', 'shutdown', 'bankruptcy'];
const MEDIUM_KEYWORDS   = ['protest', 'shortage', 'disruption', 'storm', 'typhoon'];

// ─── Get Severity from Article ────────────────────────
const getSeverity = (title, description) => {
  const text = `${title} ${description}`.toLowerCase();

  if (CRITICAL_KEYWORDS.some(k => text.includes(k))) return 'critical';
  if (HIGH_KEYWORDS.some(k => text.includes(k)))     return 'high';
  if (MEDIUM_KEYWORDS.some(k => text.includes(k)))   return 'medium';
  return 'low';
};

// ─── Fetch News for Location ──────────────────────────
const fetchNewsForLocation = async (country, city) => {
  try {
    const query = city
      ? `${city} OR ${country} ${RISK_KEYWORDS.slice(0, 5).join(' OR ')}`
      : `${country} ${RISK_KEYWORDS.slice(0, 5).join(' OR ')}`;

    const response = await axios.get(NEWS_API_URL, {
      params: {
        q:        query,
        language: 'en',
        sortBy:   'publishedAt',
        pageSize: 10,
        apiKey:   NEWS_API_KEY,
      },
    });

    const articles = response.data.articles || [];

    // Filter only relevant articles
    return articles
      .filter(a => a.title && a.description)
      .map(a => ({
        title:       a.title,
        description: a.description || '',
        url:         a.url || '',
        source:      a.source?.name || 'NewsAPI',
        severity:    getSeverity(a.title, a.description),
        publishedAt: a.publishedAt,
      }));

  } catch (error) {
    console.error(`❌ NewsAPI error: ${error.message}`);
    return [];
  }
};

module.exports = { fetchNewsForLocation };