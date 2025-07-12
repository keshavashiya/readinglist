import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Filters from './components/Filters'
import ArticleGrid from './components/ArticleGrid'
import config from '../../config.json'
import './App.css'

function App() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      setLoading(true)
      const isDevelopment = import.meta.env.DEV
      const basePath = isDevelopment ? '' : '/readinglist'
      const [devtoData, dailydevData] = await Promise.allSettled([
        fetch(`${basePath}/data/devto.json`).then(res => res.json()),
        fetch(`${basePath}/data/dailydev.json`).then(res => res.json())
      ])
      let allArticles = []
      if (devtoData.status === 'fulfilled' && devtoData.value.articles) {
        allArticles.push(...devtoData.value.articles)
      }
      if (dailydevData.status === 'fulfilled' && dailydevData.value.articles) {
        allArticles.push(...dailydevData.value.articles)
      }
      allArticles.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
      setArticles(allArticles)
    } catch (err) {
      setError('Failed to load articles')
      console.error('Error loading articles:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredArticles = articles.filter(article => {
    if (filter === 'all') return true
    return article.source === filter
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
          <p className="text-gray-600">Loading your reading list...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadArticles}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-200 font-sans w-full">
      <Header
        title={config.ui?.title || 'Reading List'}
        description={config.ui?.description || 'Articles and bookmarks from dev.to and daily.dev'}
        count={articles.length}
      />
      <Filters filter={filter} setFilter={setFilter} articles={articles} />
      <main className="flex-1 w-full py-10 px-2 md:px-6 lg:px-10 pb-16">
        <ArticleGrid articles={filteredArticles} />
      </main>
      <Footer />
    </div>
  )
}

export default App