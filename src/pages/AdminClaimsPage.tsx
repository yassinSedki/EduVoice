import { useState } from 'react'
import { ShieldCheck, ChevronDown, ChevronUp, Users, Clock, CheckCircle, AlertTriangle, FileText } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { timeAgo, adminUser } from '../data/mockData'
import Avatar from '../components/ui/Avatar'
import { useTranslation } from 'react-i18next'

const STATUS_OPTIONS = ['Under Review', 'Response Issued', 'Resolved', 'Escalated'] as const

const statusConfig: Record<string, { bg: string; color: string }> = {
  'Submitted':       { bg: '#FEF3C7', color: '#92400E' },
  'Under Review':    { bg: '#DBEAFE', color: '#1E40AF' },
  'Response Issued': { bg: '#D1FAE5', color: '#065F46' },
  'Resolved':        { bg: '#F3F4F6', color: '#374151' },
  'Escalated':       { bg: '#FEE2E2', color: '#991B1B' },
}

function statusKey(s: string) {
  return s.replace(/\s+/g, '_')
}

export default function AdminClaimsPage() {
  const { t } = useTranslation()
  const { posts, respondToClaim } = useAppStore()

  const claims = posts.filter((p) => p.space === 'claims')
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const [expandedId, setExpandedId]     = useState<string | null>(null)
  const [responseText, setResponseText] = useState<Record<string, string>>({})
  const [statusChoice, setStatusChoice] = useState<Record<string, string>>({})

  const statCards = [
    { key: 'Submitted',       icon: FileText,      labelKey: 'admin.stat_submitted'    },
    { key: 'Under Review',    icon: Clock,         labelKey: 'admin.stat_under_review' },
    { key: 'Response Issued', icon: CheckCircle,   labelKey: 'admin.stat_responded'    },
    { key: 'Resolved',        icon: CheckCircle,   labelKey: 'admin.stat_resolved'     },
    { key: 'Escalated',       icon: AlertTriangle, labelKey: 'admin.stat_escalated'    },
  ]

  function handleSubmit(postId: string) {
    const text   = responseText[postId]?.trim()
    const status = statusChoice[postId] || 'Response Issued'
    if (!text) return
    respondToClaim(postId, text, status)
    setExpandedId(null)
    setResponseText((prev) => ({ ...prev, [postId]: '' }))
  }

  return (
    <div className="p-5 md:p-8 max-w-3xl mx-auto">

      {/* ── Page header ─────────────────────────────────────── */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-full bg-[#922B21] flex items-center justify-center shrink-0">
            <ShieldCheck size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#1C2833]" style={{ fontFamily: '"Crimson Pro", Georgia, serif' }}>
              {t('admin.title')}
            </h1>
            <p className="text-[11px] text-[#5D6D7E]">
              {t('admin.subtitle', { name: adminUser.name })}
            </p>
          </div>
        </div>
      </div>

      {/* ── Stats row ───────────────────────────────────────── */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {statCards.map(({ key, icon: Icon, labelKey }) => {
          const count = claims.filter((p) => p.claimStatus === key).length
          const cfg   = statusConfig[key]
          return (
            <div key={key} className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-3 text-center">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center mx-auto mb-1.5"
                style={{ backgroundColor: cfg.bg }}
              >
                <Icon size={13} style={{ color: cfg.color }} />
              </div>
              <p className="text-lg font-bold text-[#1C2833]">{count}</p>
              <p className="text-[9px] font-semibold tracking-wider uppercase text-[#9CA3AF] mt-0.5 leading-tight">
                {t(labelKey)}
              </p>
            </div>
          )
        })}
      </div>

      {/* ── Claims list ─────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        {claims.map((claim) => {
          const scfg    = statusConfig[claim.claimStatus ?? 'Submitted']
          const isOpen  = expandedId === claim.id
          const chosenStatus = statusChoice[claim.id] || 'Response Issued'

          return (
            <article key={claim.id} className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
              {/* ── Claim info ─────────────────────────────────── */}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full leading-none"
                        style={{ backgroundColor: scfg.bg, color: scfg.color }}
                      >
                        {t(`claim_status.${statusKey(claim.claimStatus ?? 'Submitted')}`, claim.claimStatus)}
                      </span>
                      {claim.claimCategory && (
                        <span className="text-[10px] font-medium text-[#5D6D7E] px-2 py-0.5 rounded-full bg-[#F3F4F6]">
                          {claim.claimCategory}
                        </span>
                      )}
                      <span className="text-[10px] text-[#9CA3AF] ms-auto">{timeAgo(claim.timestamp)}</span>
                    </div>

                    {claim.title && (
                      <h3 className="text-sm font-semibold text-[#1C2833] leading-snug mb-1">
                        {claim.title}
                      </h3>
                    )}
                    <p className="text-[12px] text-[#5D6D7E] leading-relaxed line-clamp-2">{claim.body}</p>

                    <div className="flex items-center gap-3 mt-2 text-[11px] text-[#9CA3AF]">
                      <span>{claim.school} · {claim.district}</span>
                      <span className="flex items-center gap-1">
                        <Users size={11} /> {claim.supportCount ?? 0} {t('admin.supporting')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Existing official response ─────────────────── */}
              {claim.hasOfficialResponse && claim.officialResponse && (
                <div className="border-t border-[#D1FAE5] bg-[#F0FDF4] px-4 py-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <ShieldCheck size={13} className="text-[#065F46]" />
                    <span className="text-[10px] font-semibold text-[#065F46] uppercase tracking-wide">
                      {t('admin.response_label')}
                    </span>
                    <Avatar initials={adminUser.initials} role="admin" size="sm" />
                    <span className="text-[10px] text-[#5D6D7E]">{adminUser.name}</span>
                    <span className="text-[10px] text-[#9CA3AF] ms-auto">
                      {claim.officialResponseAt
                        ? new Date(claim.officialResponseAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                        : ''}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#1C2833] leading-relaxed">{claim.officialResponse}</p>
                </div>
              )}

              {/* ── Respond / Update toggle ────────────────────── */}
              <div className="border-t border-[#E5E7EB]">
                <button
                  onClick={() => setExpandedId(isOpen ? null : claim.id)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-[12px] font-semibold transition-colors duration-150 hover:bg-[#FEF2F2]"
                  style={{ color: '#922B21' }}
                >
                  {claim.hasOfficialResponse ? t('admin.update_response') : t('admin.respond')}
                  {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 flex flex-col gap-3 border-t border-[#F3F4F6]">
                    {/* Status selector */}
                    <div className="pt-3">
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-[#9CA3AF] mb-2">
                        {t('admin.status_label')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {STATUS_OPTIONS.map((s) => {
                          const scfg2 = statusConfig[s]
                          return (
                            <button
                              key={s}
                              onClick={() => setStatusChoice((prev) => ({ ...prev, [claim.id]: s }))}
                              className="text-[11px] font-medium px-3 py-1.5 rounded-full border transition-all duration-150"
                              style={
                                chosenStatus === s
                                  ? { backgroundColor: scfg2.bg, borderColor: scfg2.color, color: scfg2.color }
                                  : { borderColor: '#E5E7EB', color: '#5D6D7E' }
                              }
                            >
                              {t(`claim_status.${statusKey(s)}`, s)}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Response textarea */}
                    <div>
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-[#9CA3AF] mb-1.5">
                        {t('admin.response_label')}
                      </p>
                      <textarea
                        value={responseText[claim.id] ?? ''}
                        onChange={(e) =>
                          setResponseText((prev) => ({ ...prev, [claim.id]: e.target.value }))
                        }
                        rows={4}
                        placeholder={t('admin.response_placeholder')}
                        className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-xl text-sm text-[#1C2833] placeholder:text-[#9CA3AF] focus:outline-none resize-none transition-colors"
                        onFocus={(e) => { e.target.style.borderColor = '#922B21' }}
                        onBlur={(e)  => { e.target.style.borderColor = '#E5E7EB' }}
                      />
                    </div>

                    <button
                      onClick={() => handleSubmit(claim.id)}
                      disabled={!responseText[claim.id]?.trim()}
                      className="self-end flex items-center gap-2 text-sm font-semibold text-white px-5 py-2 rounded-lg transition-opacity disabled:opacity-40"
                      style={{ backgroundColor: '#922B21' }}
                    >
                      <ShieldCheck size={14} /> {t('admin.submit_response')}
                    </button>
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
