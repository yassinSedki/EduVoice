import { useAppStore } from '../../store/useAppStore'
import { spaceConfig } from '../../data/mockData'
import { useTranslation } from 'react-i18next'

const trendingTopics = [
  { tagKey: 'Burnout',        posts: 23 },
  { tagKey: 'Resource_Gap',   posts: 18 },
  { tagKey: 'Pupil_Welfare',posts: 14 },
  { tagKey: 'Pedagogy',       posts: 11 },
  { tagKey: 'Infrastructure', posts: 9  },
]

const maxPosts = Math.max(...trendingTopics.map((t) => t.posts))

export default function RightPanel() {
  const { t } = useTranslation()
  const currentSpace = useAppStore((s) => s.currentSpace)
  const cfg = spaceConfig[currentSpace]

  const communityMetrics = [
    { labelKey: 'app.right_panel.teachers', value: '1,247', color: '#1A5276' },
    { labelKey: 'app.right_panel.parents',  value: '3,824', color: '#1E8449' },
    { labelKey: 'app.right_panel.claims',   value: '47',    color: '#922B21' },
    { labelKey: 'app.right_panel.thank_yous', value: '218', color: '#6C3483' },
  ]

  return (
    <aside className="flex flex-col gap-0 w-[220px] bg-white overflow-y-auto">

      {/* ── Community ────────────────────────────────────────────────── */}
      <section className="px-4 pt-5 pb-4 border-b border-[#E5E7EB]">
        <p className="mb-3 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
          {t('app.right_panel.community')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {communityMetrics.map(({ labelKey, value, color }) => (
            <div
              key={labelKey}
              className="rounded-lg border border-[#E5E7EB] bg-white p-2.5"
            >
              <p
                className="text-[10px] font-semibold tracking-widest uppercase leading-tight mb-1"
                style={{ color }}
              >
                {t(labelKey)}
              </p>
              <p className="text-lg font-bold leading-none" style={{ color }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trending Topics ──────────────────────────────────────────── */}
      <section className="px-4 pt-4 pb-4 border-b border-[#E5E7EB]">
        <p className="mb-3 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
          {t('app.right_panel.trending')}
        </p>
        <ul className="space-y-3">
          {trendingTopics.map(({ tagKey, posts }) => {
            const pct = Math.round((posts / maxPosts) * 100)
            return (
              <li key={tagKey}>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm font-medium text-gray-800">#{t(`tags.${tagKey}`, tagKey)}</span>
                  <span className="text-xs text-gray-400">
                    {t('app.right_panel.posts_count', { count: posts })}
                  </span>
                </div>
                <div className="h-px w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div
                    className="h-px rounded-full transition-all duration-150"
                    style={{ width: `${pct}%`, backgroundColor: cfg.color }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </aside>
  )
}
