import ArticleCard from './ArticleCard'

export default function ArticleGrid({ articles }) {
  if (!articles.length) {
    return (
      <div className="text-center py-24">
        <svg className="h-16 w-16 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><path d="M8 12h8M8 16h8M8 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">No articles found</h3>
        <p className="text-gray-600 text-lg">Try adjusting your filters or check back later.</p>
      </div>
    )
  }
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}