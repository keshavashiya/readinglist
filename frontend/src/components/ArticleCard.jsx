import { ExternalLink, Clock, Tag, Image as ImageIcon } from 'lucide-react'

function getInitials(name) {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function ArticleCard({ article }) {
  const title = article.title || 'Untitled';
  const authorName = article.author?.name || 'Unknown';
  const date = article.published_at ? new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown Date';
  const tags = Array.isArray(article.tags) ? article.tags : [];
  const fallbackCover = (
    <div className="flex items-center justify-center w-full h-44 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl">
      <ImageIcon className="h-12 w-12 text-gray-300" />
    </div>
  )
  return (
    <article className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm h-full text-left">
      {article.cover_image ? (
        <img
          src={article.cover_image}
          alt={title}
          className="w-full h-44 object-cover rounded-t-xl"
          onError={e => { e.target.style.display = 'none'; }}
        />
      ) : fallbackCover}
      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-center justify-between mb-2">
          <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${article.source === 'dev.to' ? 'bg-blue-100 text-blue-800' : article.source === 'daily.dev' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
            {article.source}
          </span>
          {article.reading_time && (
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {article.reading_time} min
            </div>
          )}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
          {title}
        </h3>
        {article.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {article.description}
          </p>
        )}
        <div className="flex items-center gap-2 mb-3">
          {article.author?.profile_image ? (
            <img src={article.author.profile_image} alt={authorName} className="h-7 w-7 rounded-full object-cover border" />
          ) : (
            <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 border">
              {getInitials(authorName)}
            </div>
          )}
          <span className="text-xs text-gray-700 font-medium truncate max-w-[100px]">{authorName}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4 overflow-x-auto">
            {tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 whitespace-nowrap">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto pt-2">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#2563eb] hover:text-blue-800 font-semibold text-sm group"
          >
            Read Article
            <ExternalLink className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </article>
  )
}