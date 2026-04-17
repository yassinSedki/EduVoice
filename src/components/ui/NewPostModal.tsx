import { useState } from 'react'
import { Lock, ChevronLeft, ChevronRight } from 'lucide-react'
import Modal from './Modal'
import { useTranslation } from 'react-i18next'
import { type SpaceKey, type Post, spaceConfig, spaceTags } from '../../data/mockData'
import { useAppStore, getActiveUser } from '../../store/useAppStore'

// Raw English values kept for data integrity; display is translated via tagKey()
const claimCategories = ['Unsafe Conditions', 'Missing Resources', 'Administrative Pressure', 'Harassment', 'Contract Issue', 'Other']
const priorStepKeys   = ['prior_raised_informally', 'prior_first_step', 'prior_blocked'] as const
const priorStepValues = ['Yes, raised informally', 'No, this is the first step', 'Attempted but blocked']

function tagKey(tag: string) {
  return tag.replace(/[\s&]+/g, '_').replace(/_+/g, '_').replace(/^_|_$/, '')
}

interface NewPostModalProps {
  space: SpaceKey
}

export default function NewPostModal({ space }: NewPostModalProps) {
  const { t } = useTranslation()
  const { isNewPostModalOpen, closeNewPostModal, submitPost, activeUserId } = useAppStore()
  const activeUser = getActiveUser(activeUserId)
  const cfg  = spaceConfig[space]
  const tags = spaceTags[space]

  // Lounge / Parents state
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [customTag, setCustomTag] = useState<string>('')
  const [body, setBody] = useState('')
  const [anonymous, setAnonymous] = useState(false)

  // Claims wizard state
  const [claimStep, setClaimStep] = useState(1)
  const [claimCategory, setClaimCategory] = useState('')
  const [customClaimCategory, setCustomClaimCategory] = useState('')
  const [claimDescription, setClaimDescription] = useState('')
  const [priorStep, setPriorStep] = useState('')
  const [visibility, setVisibility] = useState<'public' | 'restricted'>('public')

  // Gratitude state
  const [targetTeacher, setTargetTeacher] = useState('')
  const [gratitudeBody, setGratitudeBody] = useState('')

  function reset() {
    setSelectedTag(''); setCustomTag(''); setBody(''); setAnonymous(false)
    setClaimStep(1); setClaimCategory(''); setCustomClaimCategory(''); setClaimDescription(''); setPriorStep(''); setVisibility('public')
    setTargetTeacher(''); setGratitudeBody('')
  }

  function handleClose() {
    closeNewPostModal()
    reset()
  }

  function handleSubmit() {
    const base: Post = {
      id: `p_${Date.now()}`,
      userId: activeUser.id,
      space,
      tag: selectedTag === 'Other' ? (customTag.trim() || 'Other') : (selectedTag || tags[0]),
      body: body || claimDescription || gratitudeBody,
      school: activeUser.school,
      schoolId: 's1',
      district: activeUser.district,
      anonymous: anonymous,
      timestamp: new Date().toISOString(),
      reactions: 0,
      comments: 0,
    }

    if (space === 'claims') {
      Object.assign(base, {
        claimCategory: claimCategory === 'Other' ? (customClaimCategory.trim() || 'Other') : claimCategory,
        claimStatus: 'Submitted' as const,
        supportCount: 0,
        anonymous: visibility === 'restricted',
      })
    }
    if (space === 'gratitude') {
      Object.assign(base, { targetTeacher, body: gratitudeBody, tag: 'Thank You' })
    }

    submitPost(base)
    reset()
  }

  const visibilityOptions = [
    {
      value: 'public'     as const,
      titleKey: 'post_modal.claim_public',
      descKey:  'post_modal.claim_public_desc',
    },
    {
      value: 'restricted' as const,
      titleKey: 'post_modal.claim_restricted',
      descKey:  'post_modal.claim_restricted_desc',
    },
  ]

  return (
    <Modal open={isNewPostModalOpen} onClose={handleClose}>
      {/* Header accent */}
      <div className="border-s-4 rounded-tl-2xl" style={{ borderColor: cfg.color }}>
        <div className="px-6 py-5 border-b border-[#E5E7EB]">
          <h2 className="text-base font-semibold text-[#1C2833]">
            {t('post_modal.new_post_in')} <span style={{ color: cfg.color }}>{t(`nav.${space}`, cfg.label)}</span>
          </h2>
          {space === 'claims' && (
            <p className="text-xs text-[#5D6D7E] mt-0.5">
              {t('post_modal.step_of', { step: claimStep, total: 4 })}
            </p>
          )}
        </div>
      </div>

      <div className="px-6 py-5">
        {/* ── Lounge / Parents ────────────────────────────────── */}
        {(space === 'lounge' || space === 'parents') && (
          <div className="flex flex-col gap-4">
            {/* School (locked) */}
            <div>
              <label className="label-caps mb-1.5 block">{t('post_modal.school_label')}</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg">
                <Lock size={13} className="text-[#5D6D7E]" />
                <span className="text-sm text-[#5D6D7E]">{activeUser.school} · {activeUser.district}</span>
              </div>
            </div>

            {/* Tag selector */}
            <div>
              <label className="label-caps mb-1.5 block">{t('post_modal.topic_label')}</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
                    className="text-[11px] font-medium px-3 py-1.5 rounded-full border transition-all duration-150"
                    style={
                      selectedTag === tag
                        ? { backgroundColor: cfg.color, color: '#fff', borderColor: cfg.color }
                        : { borderColor: '#E5E7EB', color: '#5D6D7E', backgroundColor: '#fff' }
                    }
                  >
                    {t(`tags.${tagKey(tag)}`, tag)}
                  </button>
                ))}
                {/* Other — custom topic */}
                <button
                  onClick={() => setSelectedTag(selectedTag === 'Other' ? '' : 'Other')}
                  className="text-[11px] font-medium px-3 py-1.5 rounded-full border transition-all duration-150"
                  style={
                    selectedTag === 'Other'
                      ? { backgroundColor: cfg.color, color: '#fff', borderColor: cfg.color }
                      : { borderColor: '#D1D5DB', borderStyle: 'dashed', color: '#5D6D7E', backgroundColor: '#fff' }
                  }
                >
                  {t('post_modal.other')}
                </button>
              </div>
              {selectedTag === 'Other' && (
                <input
                  type="text"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  placeholder={t('post_modal.other_placeholder')}
                  className="mt-2 w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#1C2833] placeholder:text-[#9CA3AF] focus:outline-none transition-colors"
                  onFocus={(e) => { e.target.style.borderColor = cfg.color }}
                  onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
                  autoFocus
                />
              )}
            </div>

            {/* Anonymous toggle */}
            <div className="flex items-center justify-between py-2 px-3 bg-[#F8F9FA] rounded-lg border border-[#E5E7EB]">
              <div>
                <p className="text-sm font-medium text-[#1C2833]">{t('post_modal.post_anon')}</p>
                <p className="text-[11px] text-[#5D6D7E]">{t('post_modal.post_anon_sub')}</p>
              </div>
              <button
                onClick={() => setAnonymous((v) => !v)}
                className="relative w-10 rounded-full transition-colors duration-200 focus:outline-none"
                style={{ backgroundColor: anonymous ? cfg.color : '#D1D5DB', height: '22px' }}
                role="switch"
                aria-checked={anonymous}
              >
                <span
                  className="absolute top-0.5 start-0.5 rounded-full bg-white shadow transition-transform duration-200"
                  style={{
                    transform: anonymous ? 'translateX(18px)' : 'translateX(0)',
                    width: '18px',
                    height: '18px',
                  }}
                />
              </button>
            </div>

            {/* Textarea */}
            <div>
              <label className="label-caps mb-1.5 block">{t('post_modal.your_post_label')}</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={6}
                className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-xl text-sm text-[#1C2833] placeholder:text-[#9CA3AF] focus:outline-none resize-none"
                onFocus={(e) => { e.target.style.borderColor = cfg.color }}
                onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
                placeholder={
                  space === 'lounge'
                    ? t('post_modal.lounge_placeholder')
                    : t('post_modal.parents_placeholder')
                }
              />
            </div>
          </div>
        )}

        {/* ── Formal Claims wizard ─────────────────────────────── */}
        {space === 'claims' && (
          <div className="flex flex-col gap-4">
            {/* Step progress bar */}
            <div className="flex gap-1.5">
              {[1,2,3,4].map((s) => (
                <div
                  key={s}
                  className="h-1 flex-1 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: claimStep >= s ? cfg.color : '#E5E7EB' }}
                />
              ))}
            </div>

            {claimStep === 1 && (
              <div>
                <label className="label-caps mb-3 block">{t('post_modal.claim_category_label')}</label>
                <div className="grid grid-cols-2 gap-2">
                  {claimCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setClaimCategory(cat); if (cat !== 'Other') setCustomClaimCategory('') }}
                      className="text-[12px] font-medium px-3 py-2.5 rounded-xl border text-start transition-all duration-150"
                      style={
                        claimCategory === cat
                          ? { backgroundColor: cfg.bg, borderColor: cfg.color, color: cfg.color }
                          : { borderColor: '#E5E7EB', color: '#5D6D7E' }
                      }
                    >
                      {cat === 'Other'
                        ? t('post_modal.other_key')
                        : t(`tags.${tagKey(cat)}`, cat)}
                    </button>
                  ))}
                </div>
                {claimCategory === 'Other' && (
                  <input
                    type="text"
                    value={customClaimCategory}
                    onChange={(e) => setCustomClaimCategory(e.target.value)}
                    placeholder={t('post_modal.claim_other_placeholder')}
                    className="mt-3 w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#1C2833] placeholder:text-[#9CA3AF] focus:outline-none transition-colors"
                    onFocus={(e) => { e.target.style.borderColor = cfg.color }}
                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
                    autoFocus
                  />
                )}
              </div>
            )}

            {claimStep === 2 && (
              <div className="flex flex-col gap-3">
                <div>
                  <label className="label-caps mb-1 block">{t('post_modal.claim_what_happened')}</label>
                  <textarea
                    value={claimDescription}
                    onChange={(e) => setClaimDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#1C2833] placeholder:text-[#9CA3AF] focus:outline-none resize-none"
                    onFocus={(e) => { e.target.style.borderColor = cfg.color }}
                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
                    placeholder={t('post_modal.claim_what_happened_placeholder')}
                  />
                </div>
                <div>
                  <label className="label-caps mb-1 block">{t('post_modal.claim_when')}</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none"
                    onFocus={(e) => { e.target.style.borderColor = cfg.color }}
                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
                    placeholder={t('post_modal.claim_when_placeholder')}
                  />
                </div>
                <div>
                  <label className="label-caps mb-1 block">{t('post_modal.claim_outcome')}</label>
                  <textarea
                    rows={2}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none resize-none"
                    onFocus={(e) => { e.target.style.borderColor = cfg.color }}
                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
                    placeholder={t('post_modal.claim_outcome_placeholder')}
                  />
                </div>
              </div>
            )}

            {claimStep === 3 && (
              <div>
                <label className="label-caps mb-3 block">{t('post_modal.claim_prior_label')}</label>
                <div className="flex flex-col gap-2">
                  {priorStepKeys.map((key, idx) => {
                    const value = priorStepValues[idx]
                    return (
                      <button
                        key={key}
                        onClick={() => setPriorStep(value)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-start transition-all duration-150"
                        style={
                          priorStep === value
                            ? { backgroundColor: cfg.bg, borderColor: cfg.color, color: '#1C2833' }
                            : { borderColor: '#E5E7EB', color: '#5D6D7E' }
                        }
                      >
                        <div
                          className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                          style={{ borderColor: priorStep === value ? cfg.color : '#D1D5DB' }}
                        >
                          {priorStep === value && (
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                          )}
                        </div>
                        {t(`post_modal.${key}`)}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {claimStep === 4 && (
              <div>
                <label className="label-caps mb-3 block">{t('post_modal.claim_visibility_label')}</label>
                <div className="flex flex-col gap-2">
                  {visibilityOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setVisibility(opt.value)}
                      className="flex items-start gap-3 px-4 py-3 rounded-xl border text-start transition-all duration-150"
                      style={
                        visibility === opt.value
                          ? { backgroundColor: cfg.bg, borderColor: cfg.color }
                          : { borderColor: '#E5E7EB' }
                      }
                    >
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ borderColor: visibility === opt.value ? cfg.color : '#D1D5DB' }}
                      >
                        {visibility === opt.value && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#1C2833]">{t(opt.titleKey)}</p>
                        <p className="text-[11px] text-[#5D6D7E] mt-0.5">{t(opt.descKey)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Gratitude ────────────────────────────────────────── */}
        {space === 'gratitude' && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="label-caps mb-1.5 block">{t('post_modal.gratitude_teacher_label')}</label>
              <input
                type="text"
                value={targetTeacher}
                onChange={(e) => setTargetTeacher(e.target.value)}
                className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none"
                onFocus={(e) => { e.target.style.borderColor = cfg.color }}
                onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
                placeholder="e.g. Madame Samira Karim"
              />
            </div>
            <div>
              <label className="label-caps mb-1.5 block">{t('post_modal.gratitude_school_label')}</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl">
                <Lock size={13} className="text-[#5D6D7E]" />
                <span className="text-sm text-[#5D6D7E]">{activeUser.school} · {activeUser.district}</span>
              </div>
            </div>
            <div>
              <label className="label-caps mb-1.5 block">{t('post_modal.gratitude_message_label')}</label>
              <textarea
                value={gratitudeBody}
                onChange={(e) => setGratitudeBody(e.target.value)}
                rows={5}
                className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none resize-none"
                onFocus={(e) => { e.target.style.borderColor = cfg.color }}
                onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
                placeholder={t('post_modal.gratitude_placeholder')}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-[#E5E7EB] flex items-center justify-between">
        <button
          onClick={handleClose}
          className="text-sm font-medium text-[#5D6D7E] hover:text-[#1C2833] transition-colors px-4 py-2 rounded-lg hover:bg-[#F8F9FA]"
        >
          {t('post_modal.cancel')}
        </button>

        <div className="flex gap-2">
          {space === 'claims' && claimStep > 1 && (
            <button
              onClick={() => setClaimStep((s) => s - 1)}
              className="flex items-center gap-1 text-sm font-medium text-[#5D6D7E] hover:text-[#1C2833] px-4 py-2 rounded-lg hover:bg-[#F8F9FA] transition-colors border border-[#E5E7EB]"
            >
              <ChevronLeft size={16} /> {t('post_modal.back')}
            </button>
          )}

          {space === 'claims' && claimStep < 4 ? (
            <button
              onClick={() => setClaimStep((s) => s + 1)}
              disabled={claimStep === 1 && (!claimCategory || (claimCategory === 'Other' && !customClaimCategory.trim()))}
              className="flex items-center gap-1 text-sm font-semibold text-white px-5 py-2 rounded-lg transition-opacity disabled:opacity-40"
              style={{ backgroundColor: cfg.color }}
            >
              {t('post_modal.next')} <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={
                (space !== 'claims' && space !== 'gratitude' && !body.trim()) ||
                (space === 'gratitude' && (!targetTeacher.trim() || !gratitudeBody.trim())) ||
                (space === 'claims' && !claimCategory)
              }
              className="text-sm font-semibold text-white px-5 py-2 rounded-lg transition-opacity disabled:opacity-40"
              style={{ backgroundColor: cfg.color }}
            >
              {t('post_modal.post')}
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}
