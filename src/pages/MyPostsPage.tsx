import { useState } from 'react'
import { FileText } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { type SpaceKey, spaceConfig } from '../data/mockData'
import PostCard from '../components/ui/PostCard'
import { useTranslation } from 'react-i18next'

type FilterKey = 'all' | SpaceKey

export default function MyPostsPage() {
  const { t } = useTranslation()
  const { posts, activeUserId } = useAppStore()
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const filterTabs: { key: FilterKey; labelKey: string }[] = [
    { key: 'all',       labelKey: 'my_posts.filter_all' },
    { key: 'lounge',    labelKey: 'my_posts.filter_lounge' },
    { key: 'parents',   labelKey: 'my_posts.filter_parents' },
    { key: 'claims',    labelKey: 'my_posts.filter_claims' },
    { key: 'gratitude', labelKey: 'my_posts.filter_gratitude' },
  ]

  const myPosts = posts.filter((p) => {
    if (p.userId !== activeUserId) return false
    if (activeFilter !== 'all' && p.space !== activeFilter) return false
    return true
  })

  const totalCount = posts.filter((p) => p.userId === activeUserId).length

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center">
        <h1 className="font-display text-xl font-bold text-[#1C2833]">{t('my_posts.title')}</h1>
        <span className="text-[#5D6D7E] text-sm ml-2">({totalCount})</span>
      </div>

      {/* Space filter tabs */}
      <div className="flex gap-2 mt-4 mb-5 flex-wrap">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-150 ${
                isActive
                  ? 'bg-[#1A5276] text-white border border-transparent'
                  : 'border border-[#E5E7EB] text-[#5D6D7E] bg-white hover:border-[#D1D5DB]'
              }`}
            >
              {t(tab.labelKey)}
            </button>
          )
        })}
      </div>

      {/* Post list */}
      <div className="flex flex-col gap-3">
        {myPosts.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <FileText size={32} className="text-[#D1D5DB]" />
            <p className="text-sm font-medium text-[#5D6D7E] mt-3">{t('my_posts.empty_title')}</p>
            <p className="text-xs text-[#9CA3AF] mt-1">
              {activeFilter === 'all'
                ? t('my_posts.empty_all')
                : t('my_posts.empty_space', { space: spaceConfig[activeFilter as SpaceKey]?.label ?? activeFilter })}
            </p>
          </div>
        ) : (
          myPosts.map((post) => (
            <PostCard key={post.id} post={post} space={post.space} />
          ))
        )}
      </div>
    </div>
  )
}
