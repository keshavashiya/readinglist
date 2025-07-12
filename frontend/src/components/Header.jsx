import { BookOpen } from 'lucide-react'

export default function Header({ title, description, count }) {
  return (
    <header className="w-full sticky top-0 z-20 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <BookOpen className="h-7 w-7 text-[#2563eb]" />
          <div>
            <h1 className="text-xl font-bold tracking-tight leading-tight text-gray-900 text-left">{title}</h1>
            <p className="text-gray-500 text-sm font-medium text-left">{description}</p>
          </div>
        </div>
        <div className="text-base font-semibold text-gray-500 text-left">
          {count} articles
        </div>
      </div>
    </header>
  )
}