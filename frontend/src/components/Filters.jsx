import config from '../../../config.json'

export default function Filters({ filter, setFilter, articles }) {
  const enabledSources = Object.entries(config.sources)
    .filter(([_, v]) => v.enabled)
    .map(([k]) => k)

  const sourceLabels = {
    devto: 'dev.to',
    dailydev: 'daily.dev',
  }

  return (
    <div className="w-full py-3 px-2 md:px-6 lg:px-10 flex flex-wrap gap-2 bg-white border-b border-gray-200 shadow-none sticky top-[70px] z-10">
      <button
        onClick={() => setFilter('all')}
        className={`px-5 py-2 rounded-full text-base font-semibold shadow-sm transition-all ${
          filter === 'all'
            ? 'bg-[#2563eb] text-white shadow-md'
            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
        }`}
      >
        All ({articles.length})
      </button>
      {enabledSources.map(source => (
        <button
          key={source}
          onClick={() => setFilter(sourceLabels[source] || source)}
          className={`px-5 py-2 rounded-full text-base font-semibold shadow-sm transition-all ${
            filter === (sourceLabels[source] || source)
              ? (source === 'devto' ? 'bg-[#2563eb] text-white shadow-md' : 'bg-purple-600 text-white shadow-md')
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {sourceLabels[source] || source} ({articles.filter(a => a.source === (sourceLabels[source] || source)).length})
        </button>
      ))}
    </div>
  )
}