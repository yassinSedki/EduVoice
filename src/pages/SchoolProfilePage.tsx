import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Building2, ShieldCheck } from 'lucide-react'
import { mockSchools, mockPosts, type SpaceKey } from '../data/mockData'
import PostCard from '../components/ui/PostCard'
import { useTranslation } from 'react-i18next'

type TabKey = 'recent' | 'claims' | 'gratitude'

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center py-14">
      <p className="text-sm font-medium text-[#5D6D7E]">{message}</p>
    </div>
  )
}

export default function SchoolProfilePage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState<TabKey>('recent')

  const school = mockSchools.find((s) => s.id === id)

  if (!school) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-[#5D6D7E] text-sm font-medium">{t('school.not_found')}</p>
      </div>
    )
  }

  const tabConfig: { key: TabKey; labelKey: string; space: SpaceKey; color: string }[] = [
    { key: 'recent',    labelKey: 'school.tab_recent',    space: 'lounge',    color: '#1A5276' },
    { key: 'claims',    labelKey: 'school.tab_claims',    space: 'claims',    color: '#922B21' },
    { key: 'gratitude', labelKey: 'school.tab_gratitude', space: 'gratitude', color: '#6C3483' },
  ]

  const statCards = [
    { labelKey: 'school.active_teachers', value: school.teacherCount,    color: '#1A5276', bg: '#D6EAF8' },
    { labelKey: 'school.parent_posts',    value: school.parentPostCount, color: '#1E8449', bg: '#D5F5E3' },
    { labelKey: 'school.open_claims',     value: school.openClaimsCount, color: '#922B21', bg: '#FADBD8' },
    { labelKey: 'school.thank_yous',      value: school.gratitudeCount,  color: '#6C3483', bg: '#E8DAEF' },
  ]

  const schoolPosts   = mockPosts.filter((p) => p.schoolId === id)
  const claimsPosts   = mockPosts.filter((p) => p.schoolId === id && p.space === 'claims')
  const gratitudePosts = mockPosts.filter((p) => p.schoolId === id && p.space === 'gratitude')

  function getTabPosts(): { posts: typeof schoolPosts; space: SpaceKey } {
    switch (activeTab) {
      case 'claims':   return { posts: claimsPosts,    space: 'claims'    }
      case 'gratitude': return { posts: gratitudePosts, space: 'gratitude' }
      default:          return { posts: schoolPosts,    space: 'lounge'    }
    }
  }

  function resolvePostSpace(space: string): SpaceKey {
    if (space === 'lounge' || space === 'parents' || space === 'claims' || space === 'gratitude') {
      return space as SpaceKey
    }
    return 'lounge'
  }

  const activeTabCfg = tabConfig.find((tab) => tab.key === activeTab)!
  const { posts: tabPosts } = getTabPosts()

  const emptyMessages: Record<TabKey, string> = {
    recent:    t('app.empty.lounge_title'),
    claims:    t('app.empty.claims_title'),
    gratitude: t('app.empty.gratitude_title'),
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Building2 size={28} className="text-[#1A5276]" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-[#1C2833] leading-tight">
            {school.name}
          </h1>
          <p className="text-[#5D6D7E] text-sm mt-0.5">
            {school.district}&nbsp;&middot;&nbsp;{school.city}
          </p>
          <span className="inline-flex items-center gap-1 border border-[#1A5276] text-[#1A5276] text-xs px-2.5 py-0.5 rounded-full mt-2">
            <ShieldCheck size={12} />
            Verified Institution
          </span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {statCards.map((card) => (
          <div
            key={card.labelKey}
            className="rounded-xl p-4 flex flex-col gap-1"
            style={{ backgroundColor: card.bg }}
          >
            <span className="text-2xl font-bold font-display" style={{ color: card.color }}>
              {card.value}
            </span>
            <span className="text-xs font-medium" style={{ color: card.color }}>
              {t(card.labelKey)}
            </span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E5E7EB] mt-8">
        {tabConfig.map((tab) => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 text-sm transition-colors duration-150 -mb-px ${
                isActive
                  ? 'border-b-2 font-semibold'
                  : 'text-[#5D6D7E] hover:text-[#1C2833]'
              }`}
              style={isActive ? { borderColor: tab.color, color: tab.color } : {}}
            >
              {t(tab.labelKey)}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div className="mt-5 flex flex-col gap-3">
        {tabPosts.length === 0 ? (
          <EmptyState message={emptyMessages[activeTab]} />
        ) : (
          activeTab === 'recent'
            ? tabPosts.map((post) => (
                <PostCard key={post.id} post={post} space={resolvePostSpace(post.space)} />
              ))
            : tabPosts.map((post) => (
                <PostCard key={post.id} post={post} space={activeTabCfg.space} />
              ))
        )}
      </div>
    </div>
  )
}
