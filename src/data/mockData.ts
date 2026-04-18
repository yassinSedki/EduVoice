// ─── Tunisia Wilayas (24 governorates) ───────────────────────────────────────
export const TUNISIAN_WILAYAS = [
  'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba',
  'Kairouan', 'Kasserine', 'Kébili', 'Le Kef', 'Mahdia', 'Manouba',
  'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana',
  'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan',
] as const

export type Wilaya = typeof TUNISIAN_WILAYAS[number]

// ─── Space Config ─────────────────────────────────────────────────────────────
export const spaceConfig = {
  lounge:    { label: "Teachers' Lounge",  color: '#1A5276', bg: '#D6EAF8', route: '/app/lounge',    textLight: '#EBF5FB' },
  parents:   { label: "Parents' Forum",    color: '#1E8449', bg: '#D5F5E3', route: '/app/parents',   textLight: '#EAFAF1' },
  claims:    { label: 'Formal Claims',     color: '#922B21', bg: '#FADBD8', route: '/app/claims',    textLight: '#FDEDEC' },
  gratitude: { label: 'Gratitude Wall',    color: '#6C3483', bg: '#E8DAEF', route: '/app/gratitude', textLight: '#F5EEF8' },
} as const

export type SpaceKey = keyof typeof spaceConfig

// ─── Interfaces ───────────────────────────────────────────────────────────────
export interface User {
  id: string
  name: string
  initials: string
  role: 'teacher' | 'parent' | 'admin'
  school: string
  district: string
  verified: boolean
}

export interface Post {
  id: string
  userId: string
  space: SpaceKey
  tag: string
  title?: string
  body: string
  school: string
  schoolId: string
  district: string
  anonymous: boolean
  timestamp: string
  reactions: number
  comments: number
  reacted?: boolean
  // claims only
  claimCategory?: string
  claimStatus?: 'Submitted' | 'Under Review' | 'Response Issued' | 'Resolved' | 'Escalated'
  supportCount?: number
  supported?: boolean
  hasOfficialResponse?: boolean
  officialResponse?: string
  officialResponseBy?: string
  officialResponseAt?: string
  // gratitude only
  targetTeacher?: string
  // parents only
  hasResponse?: boolean
}

export interface Comment {
  id: string
  postId: string
  userId: string
  body: string
  timestamp: string
  isOfficial?: boolean
}

export interface School {
  id: string
  name: string
  district: string
  city: string
  wilaya: Wilaya
  teacherCount: number
  parentPostCount: number
  openClaimsCount: number
  gratitudeCount: number
}

export interface Notification {
  id: string
  type: 'reaction' | 'comment' | 'claim_update' | 'official_response' | 'gratitude'
  text: string
  timestamp: string
  read: boolean
}

// ─── Tags by space ────────────────────────────────────────────────────────────
export const spaceTags: Record<SpaceKey, string[]> = {
  lounge:    ['Burnout', 'Pedagogy', 'Resource Gap', 'Achievement', 'Pupil Welfare', 'Policy Impact'],
  parents:   ['Academic Concern', 'Infrastructure', 'Suggestion', 'Wellbeing', 'Policy Question', 'Positive Feedback'],
  claims:    ['Unsafe Conditions', 'Missing Resources', 'Administrative Pressure', 'Harassment', 'Contract Issue'],
  gratitude: ['Thank You', 'Above & Beyond', 'Changed My Life', 'Dedication', 'Support'],
}

// ─── Mock Users ────────────────────────────────────────────────────────────────
export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Samira Karim',
    initials: 'SK',
    role: 'teacher',
    school: 'Ibn Khaldoun',
    district: 'Sfax',
    verified: true,
  },
  {
    id: 'u2',
    name: 'Youssef Belhaj',
    initials: 'YB',
    role: 'teacher',
    school: 'Farhat Hached',
    district: 'Tunis',
    verified: true,
  },
  {
    id: 'u3',
    name: 'Fatima Aïssaoui',
    initials: 'FA',
    role: 'parent',
    school: 'Ibn Khaldoun',
    district: 'Sfax',
    verified: true,
  },
  {
    id: 'u4',
    name: 'Mohammed Chérif',
    initials: 'MC',
    role: 'parent',
    school: 'Al Amal',
    district: 'Sfax',
    verified: true,
  },
  {
    id: 'u5',
    name: 'Leila Mansouri',
    initials: 'LM',
    role: 'teacher',
    school: 'Habib Bourguiba',
    district: 'Sousse',
    verified: true,
  },
  {
    id: 'u6',
    name: 'Karim Benali',
    initials: 'KB',
    role: 'admin',
    school: 'Regional Education Authority',
    district: 'Sfax',
    verified: true,
  },
]

// Logged-in user
export const currentUser = mockUsers[0]
export const adminUser = mockUsers[5]

// ─── Mock Schools ──────────────────────────────────────────────────────────────
export const mockSchools: School[] = [
  {
    id: 's1',
    name: 'Ibn Khaldoun',
    district: 'Sfax',
    city: 'Sfax',
    wilaya: 'Sfax',
    teacherCount: 48,
    parentPostCount: 34,
    openClaimsCount: 3,
    gratitudeCount: 27,
  },
  {
    id: 's2',
    name: 'Farhat Hached',
    district: 'Tunis',
    city: 'Tunis',
    wilaya: 'Tunis',
    teacherCount: 62,
    parentPostCount: 51,
    openClaimsCount: 5,
    gratitudeCount: 41,
  },
  {
    id: 's3',
    name: 'Habib Bourguiba',
    district: 'Sousse',
    city: 'Sousse',
    wilaya: 'Sousse',
    teacherCount: 39,
    parentPostCount: 22,
    openClaimsCount: 2,
    gratitudeCount: 19,
  },
  {
    id: 's4',
    name: 'Al Amal',
    district: 'Sfax',
    city: 'Sfax',
    wilaya: 'Sfax',
    teacherCount: 31,
    parentPostCount: 18,
    openClaimsCount: 4,
    gratitudeCount: 12,
  },
]

// ─── Mock Posts ────────────────────────────────────────────────────────────────
export const mockPosts: Post[] = [
  // ── Teachers' Lounge ───────────────────────────────────────────────────────
  {
    id: 'p1',
    userId: 'u1',
    space: 'lounge',
    tag: 'Burnout',
    title: 'Three exams to grade, two admin meetings, and a parent complaint — all before noon',
    body: "I woke up at 5 AM to finish grading before school. By the time I got to class, I had already attended two 'urgent' administrative meetings about things that could have been an email. Then came a parent complaint about a grade that was clearly explained in my rubric. I love teaching. I genuinely do. But some days the paperwork, the politics, and the pressure feel heavier than the actual job. Anyone else feel like we spend more time managing bureaucracy than actually educating? I keep asking myself how long this is sustainable.",
    school: 'Ibn Khaldoun',
    schoolId: 's1',
    district: 'Sfax',
    anonymous: false,
    timestamp: '2026-04-15T07:30:00Z',
    reactions: 47,
    comments: 12,
  },
  {
    id: 'p2',
    userId: 'u2',
    space: 'lounge',
    tag: 'Resource Gap',
    title: '42 pupils, 28 textbooks — the math does not add up',
    body: "Our classroom has 42 pupils this year. We received 28 textbooks. I have been photocopying pages with my own money since October. The school director says the shipment is 'on its way' — that was three months ago. The pupils are sharing books in groups of three for exams. I have raised this officially twice and received no response. At what point does this become a formal claim? I am not trying to cause trouble, I just need resources to do my job.",
    school: 'Farhat Hached',
    schoolId: 's2',
    district: 'Tunis',
    anonymous: false,
    timestamp: '2026-04-14T11:00:00Z',
    reactions: 63,
    comments: 18,
  },
  {
    id: 'p3',
    userId: 'u5',
    space: 'lounge',
    tag: 'Achievement',
    title: 'طالبي الذي كان يكاد يعجز عن القراءة في سبتمبر أتمّ للتو تلاوة قصيدة كاملة عن ظهر قلب',
    body: "لا بدّ أن أشارككم هذه اللحظة، فأنا أحتاج إلى التمسك بها في الأيام الصعبة. بدأ أمين العام الدراسي وهو بالكاد يستطيع فكّ بعض الجمل البسيطة. كان والداه قلقَين، وكنت قلقةً أنا أيضاً. عملنا معاً ثلاث مرات في الأسبوع بعد انتهاء الدروس. الخميس الماضي، وأمام كامل الفصل، وقف وأتمّ قصيدةً من ثمانية مقاطع، كلمةً كلمةً، دون أي توجيه. صفّق له الفصل لمدة دقيقة كاملة. ذلك الوجه. هذا هو السبب الوحيد الذي يجعلني أواصل هذه المهنة. استمروا يا زملائي.",
    school: 'Habib Bourguiba',
    schoolId: 's3',
    district: 'Sousse',
    anonymous: false,
    timestamp: '2026-04-13T16:45:00Z',
    reactions: 112,
    comments: 29,
  },
  {
    id: 'p4',
    userId: 'u1',
    space: 'lounge',
    tag: 'Policy Impact',
    body: "The new assessment reform took effect this week. I spent last summer attending three training sessions about it. I restructured all my lesson plans, redesigned my assessment tools, and updated my grade book system. This week I received a circular saying the rollout is 'postponed indefinitely' pending further review. Six months of preparation — erased by a single administrative circular. I understand policy needs to be evaluated, but the communication failure is exhausting. We are not automatons who reset instantly.",
    school: 'Ibn Khaldoun',
    schoolId: 's1',
    district: 'Sfax',
    anonymous: true,
    timestamp: '2026-04-12T09:00:00Z',
    reactions: 89,
    comments: 24,
  },
  {
    id: 'p5',
    userId: 'u2',
    space: 'lounge',
    tag: 'Pupil Welfare',
    body: "I have a pupil who I am increasingly concerned about. Withdrawn, stopped participating, grades dropped significantly over two months. I tried talking to him twice — he is polite but closed off. I flagged it with the school counselor two weeks ago and have heard nothing. I do not know if there is a protocol for escalating this. Does anyone here know how to formally raise a pupil welfare concern when the internal channels seem unresponsive? I want to make sure this child has support.",
    school: 'Farhat Hached',
    schoolId: 's2',
    district: 'Tunis',
    anonymous: false,
    timestamp: '2026-04-11T14:20:00Z',
    reactions: 34,
    comments: 9,
  },
  {
    id: 'p6',
    userId: 'u5',
    space: 'lounge',
    tag: 'Pedagogy',
    title: 'Tried collaborative learning circles for the first time — sharing what worked',
    body: "Switched from rows to learning circles this term for my science classes. Each group of four has a designated note-taker, questioner, summarizer, and presenter. Rotation every two weeks. The quality of discussion has been genuinely surprising — pupils who rarely spoke are now leading group summaries. The key adjustment was giving them a structured discussion card with four prompts per session. Happy to share the template if anyone is interested. Not perfect for every topic but for complex subjects it has been transformative.",
    school: 'Habib Bourguiba',
    schoolId: 's3',
    district: 'Sousse',
    anonymous: false,
    timestamp: '2026-04-10T10:00:00Z',
    reactions: 58,
    comments: 14,
  },

  // ── Parents' Forum ─────────────────────────────────────────────────────────
  {
    id: 'p7',
    userId: 'u3',
    space: 'parents',
    tag: 'Academic Concern',
    title: 'My daughter is in CE2 and still struggling to read — is this normal?',
    body: "My daughter is 8 years old and in CE2. She is a bright, curious child but reading is very difficult for her. She reverses letters frequently, loses her place, and reading aloud causes her visible distress. Her teacher says she is 'a bit slow' and to practice at home. We practice every night. I am wondering if there is a formal assessment process through the school for learning difficulties. Has any other parent navigated this? I do not know who to ask or where to go within the school system.",
    school: 'Ibn Khaldoun',
    schoolId: 's1',
    district: 'Sfax',
    anonymous: false,
    timestamp: '2026-04-15T08:00:00Z',
    reactions: 29,
    comments: 11,
    hasResponse: false,
  },
  {
    id: 'p8',
    userId: 'u4',
    space: 'parents',
    tag: 'Infrastructure',
    title: 'تغيير مسار الحافلة المدرسية بإشعار 24 ساعة فقط — كثير من الأولياء عاجزون عن التكيّف',
    body: "أخبرتنا المدرسة الأربعاء الماضي برسالة نصية أن مسار حافلة المنطقة 3 (وادي الزيت) سيتغير اعتباراً من الصباح الموالي. زوجي وأنا نبدأ العمل في السابعة والنصف، ولم يكن لدينا وقت لترتيب بدائل. ثلاثة أولياء في مجموعتنا واجهوا الأمر ذاته، واضطر ثلاثة أطفال إلى التغيب عن المدرسة ذلك اليوم. هذا الوضع لا يمكن قبوله. قد يكون تغيير المسار مبرراً، لكن إشعاراً بـ24 ساعة يطال أكثر من 40 عائلة غير مقبول بالمرة. هل يمكن لإدارة المدرسة معالجة هذا الأمر علناً؟",
    school: 'Al Amal',
    schoolId: 's4',
    district: 'Sfax',
    anonymous: false,
    timestamp: '2026-04-14T09:30:00Z',
    reactions: 44,
    comments: 7,
    hasResponse: true,
  },
  {
    id: 'p9',
    userId: 'u3',
    space: 'parents',
    tag: 'Suggestion',
    title: 'Proposal: a monthly parent-teacher meeting, not just at report card time',
    body: "Right now we meet teachers formally only twice a year — at trimester report cards. By the time we learn there is a problem, it has been building for months. I would like to formally suggest that our school adopt a simple 20-minute parent-teacher meeting slot every month for any parent who wants it. It does not have to be mandatory for teachers — even a voluntary booking system would be a significant improvement. Many European school systems use this model. Other parents — would you support this proposal? If enough of us raise it, the director might listen.",
    school: 'Ibn Khaldoun',
    schoolId: 's1',
    district: 'Sfax',
    anonymous: false,
    timestamp: '2026-04-13T12:00:00Z',
    reactions: 61,
    comments: 22,
    hasResponse: false,
  },
  {
    id: 'p10',
    userId: 'u4',
    space: 'parents',
    tag: 'Wellbeing',
    body: "My son came home on Tuesday crying and refused to go to school the next day. After talking with him for an hour, he told me a group of older boys has been calling him names related to his weight every day for two weeks. I informed the class teacher that same evening. Two days passed with no contact from the school. I had to call the director directly. The situation has been 'noted' but I have no information about any action taken. I am posting here because I feel completely alone in this. Other parents — how did you handle bullying that was not taken seriously by the school?",
    school: 'Al Amal',
    schoolId: 's4',
    district: 'Sfax',
    anonymous: false,
    timestamp: '2026-04-12T18:00:00Z',
    reactions: 52,
    comments: 17,
    hasResponse: false,
  },
  {
    id: 'p11',
    userId: 'u3',
    space: 'parents',
    tag: 'Positive Feedback',
    title: 'The new science lab renovation — finally a space worth celebrating',
    body: "I want to take a moment to acknowledge something positive. The renovation of the science lab at Ibn Khaldoun was completed last month and it is genuinely impressive. Modern equipment, proper ventilation, and enough stations for a full class without crowding. My daughter came home excited after her first lab session — something I have never seen before. I know we use this platform for concerns and complaints but credit where it is due: whoever pushed for that renovation deserves recognition. Thank you to the administration and anyone who advocated for this.",
    school: 'Ibn Khaldoun',
    schoolId: 's1',
    district: 'Sfax',
    anonymous: false,
    timestamp: '2026-04-11T10:00:00Z',
    reactions: 38,
    comments: 6,
    hasResponse: false,
  },

  // ── Formal Claims ─────────────────────────────────────────────────────────
  {
    id: 'p12',
    userId: 'u1',
    space: 'claims',
    tag: 'Missing Resources',
    title: 'Digital projector promised in September still not delivered — 7 months',
    body: "In August I was informed by the school director that each classroom would receive a digital projector and screen as part of the district modernization program. Seven months into the school year, my classroom has received nothing. I have sent three formal written requests to the school administration, each acknowledged but with no follow-up. My pupils are at a significant disadvantage compared to peers in equipped classrooms. This resource was officially promised and I am formally requesting that the district office confirm the delivery timeline or explain the delay.",
    school: 'Ibn Khaldoun',
    schoolId: 's1',
    district: 'Sfax',
    anonymous: false,
    timestamp: '2026-04-10T09:00:00Z',
    reactions: 41,
    comments: 5,
    claimCategory: 'Missing Resources',
    claimStatus: 'Submitted',
    supportCount: 18,
  },
  {
    id: 'p13',
    userId: 'u2',
    space: 'claims',
    tag: 'Administrative Pressure',
    title: 'Directed to change pupil grades under administrative instruction',
    body: "On March 14th I was called into the director's office and verbally instructed to raise the final assessment grade of three specific pupils whose parents had 'expressed concerns to the district office'. No written instruction was given. I declined and documented the conversation. I was subsequently excluded from the faculty scheduling committee without explanation. I am filing this claim to create an official record of this event. I can provide dates, names, and notes from my personal log. I am requesting that the district office investigate this pressure.",
    school: 'Farhat Hached',
    schoolId: 's2',
    district: 'Tunis',
    anonymous: false,
    timestamp: '2026-04-08T11:00:00Z',
    reactions: 76,
    comments: 8,
    claimCategory: 'Administrative Pressure',
    claimStatus: 'Under Review',
    supportCount: 34,
    hasOfficialResponse: false,
  },
  {
    id: 'p14',
    userId: 'u5',
    space: 'claims',
    tag: 'Unsafe Conditions',
    title: 'Structural crack in Classroom 7 ceiling flagged three times — no action',
    body: "A visible structural crack appeared in the ceiling of Classroom 7 at our school in January. I photographed it on January 18th and submitted a written report to the school administration. On February 3rd, an inspector visited, noted the crack, and left. On February 28th the crack had visibly widened. I submitted a second report. On March 15th, a third report with photographs showing progression. I continue to teach in this classroom with 38 pupils. The safety risk is unacceptable and I am formally requesting an urgent structural assessment and, if warranted, relocation of classes from this room.",
    school: 'Habib Bourguiba',
    schoolId: 's3',
    district: 'Sousse',
    anonymous: false,
    timestamp: '2026-04-05T08:30:00Z',
    reactions: 93,
    comments: 11,
    claimCategory: 'Unsafe Conditions',
    claimStatus: 'Response Issued',
    supportCount: 47,
    hasOfficialResponse: true,
    officialResponse: "Following review of submitted reports and a site inspection conducted on April 4th, the district engineering office has confirmed that structural reinforcement is required for Classroom 7. As an immediate measure, all classes currently assigned to Room 7 will be relocated to the prefab annexe effective Monday, April 20th, until works are assessed and completed. A full structural report will be communicated to the school administration within 10 working days. The health and safety of pupils and staff remains our absolute priority.",
    officialResponseBy: 'Karim Benali',
    officialResponseAt: '2026-04-07T11:00:00Z',
  },
  {
    id: 'p15',
    userId: 'u2',
    space: 'claims',
    tag: 'Contract Issue',
    title: 'Six months of unpaid overtime for supervision hours — still unresolved',
    body: "My contract specifies that supervision hours beyond 18 per week are compensated at 1.5x rate. Since September I have averaged 22 supervision hours per week due to staff shortages. My payslips for months September through February show no overtime compensation. I raised this with the school administration in November — I was told it was being 'processed centrally'. I raised it again in January and February with no resolution. This amounts to approximately 720 TND in unpaid compensation. I am submitting this as a formal contract dispute for district resolution.",
    school: 'Farhat Hached',
    schoolId: 's2',
    district: 'Tunis',
    anonymous: false,
    timestamp: '2026-03-20T10:00:00Z',
    reactions: 68,
    comments: 14,
    claimCategory: 'Contract Issue',
    claimStatus: 'Resolved',
    supportCount: 29,
    hasOfficialResponse: true,
    officialResponse: "Following investigation of this overtime compensation dispute, the district payroll office has confirmed a calculation error affecting supplementary supervision hours for the period September 2025 to February 2026. The outstanding balance of 720 TND has been processed and will be reflected in the April 2026 payslip. We apologise for the delay and inconvenience. A verification step has been added to the monthly payroll process to prevent recurrence. This claim is now marked as Resolved.",
    officialResponseBy: 'Karim Benali',
    officialResponseAt: '2026-03-25T10:00:00Z',
  },
  {
    id: 'p16',
    userId: 'u1',
    space: 'claims',
    tag: 'Harassment',
    title: 'نمط من التخويف الممنهج من قِبَل المدير المساعد في أعقاب النشاط النقابي',
    body: "منذ مشاركتي في الجمعية الجهوية للنقابة التعليمية في ديسمبر، أعاني من نمط ممنهج مما أعدّه تخويفاً مهنياً موجّهاً. يتجلى ذلك في زيارات مفاجئة للفصل لا تطال غيري من الأساتذة، وانتقاد علني لأساليبي في اجتماعات الهيئة التدريسية، فضلاً عن إسناد أسوأ جدول زمني في الفصل القادم دون أي تشاور. بحوزتي توثيق لكل حادثة. أطلب رسمياً إحالة هذه الشكوى إلى مستوى السلطة التعليمية الجهوية للمراجعة المستقلة، إذ لا أعتقد بإمكانية إجراء تحقيق داخلي نزيه.",
    school: 'Ibn Khaldoun',
    schoolId: 's1',
    district: 'Sfax',
    anonymous: false,
    timestamp: '2026-03-10T09:00:00Z',
    reactions: 105,
    comments: 16,
    claimCategory: 'Harassment',
    claimStatus: 'Escalated',
    supportCount: 62,
    hasOfficialResponse: false,
  },

  // ── Gratitude Wall ─────────────────────────────────────────────────────────
  {
    id: 'p17',
    userId: 'u3',
    space: 'gratitude',
    tag: 'Changed My Life',
    title: 'Thank you, Madame Samira Karim',
    body: "My son Karim has severe maths anxiety. Last year, sitting in your class, something changed in him. You never once made him feel stupid for asking a question twice. You stayed after school eleven times — I counted — to work with him privately. His final exam grade was 14/20. The number does not capture what actually happened: a child who used to cry before maths tests walked into that room calm and prepared. You did that. Thank you is not enough but it is what I have. You are the reason my son believes he can learn.",
    school: 'Ibn Khaldoun',
    schoolId: 's1',
    district: 'Sfax',
    anonymous: false,
    timestamp: '2026-04-15T10:00:00Z',
    reactions: 187,
    comments: 34,
    targetTeacher: 'Samira Karim',
  },
  {
    id: 'p18',
    userId: 'u4',
    space: 'gratitude',
    tag: 'Above & Beyond',
    title: 'For Monsieur Youssef Belhaj — who never gave up on my daughter',
    body: "Sirine was struggling with Arabic grammar and composition for two years before she entered your class. You saw something in her that others had missed. You designed a special reading log just for her, introduced her to Arabic poetry, and somehow made a 12-year-old care deeply about the craft of language. She is now writing short stories voluntarily on weekends. I see her reading Arabic novels with pleasure. You changed her relationship with her own mother tongue. This is a gift that will last her entire life. Shukran, Monsieur Belhaj.",
    school: 'Farhat Hached',
    schoolId: 's2',
    district: 'Tunis',
    anonymous: false,
    timestamp: '2026-04-12T14:00:00Z',
    reactions: 143,
    comments: 21,
    targetTeacher: 'Youssef Belhaj',
  },
  {
    id: 'p19',
    userId: 'u3',
    space: 'gratitude',
    tag: 'Support',
    title: 'مدام ليلى منصوري — شكراً لأنك لاحظتِ',
    body: "حين فقد ابني حمزة جدّه في نوفمبر، انزوى كثيراً على نفسه. كنت غارقةً في حزني بحيث لم أنتبه مدى معاناته في المدرسة. مدام منصوري هي من اتصلت بي — ليس لتشكو من تراجع درجاته، ولا لتنبّهني. اتصلت لتخبرني أنها كانت تجلس معه وقت الغداء وتتيح له الكلام، وأنه يحمل ثقلاً كبيراً. وكانت قد رتّبت مسبقاً لمستشار المدرسة أن يطمئن عليه. ذلك الاتصال أعادني إلى رؤية ابني بوضوح. معلمون من أمثالك هم الأبطال الصامتون لكل عائلة تمر بمحنة.",
    school: 'Habib Bourguiba',
    schoolId: 's3',
    district: 'Sousse',
    anonymous: false,
    timestamp: '2026-04-10T16:00:00Z',
    reactions: 121,
    comments: 18,
    targetTeacher: 'Leila Mansouri',
  },
  {
    id: 'p20',
    userId: 'u4',
    space: 'gratitude',
    tag: 'Dedication',
    title: 'To the physics teacher who came in during Eid break',
    body: "I never expected a teacher to come to school during the Eid holiday break to run a revision session for the national exam. Madame Amira Tlili did exactly that for twelve pupils who were at risk of failing. She brought printed exercises, her own coffee, and gave four hours of her holiday to pupils whose families could not afford private tutoring. Three of those twelve passed the national exam. One of them is my son. I do not have words for what this act of generosity means. The education system does not always deserve teachers like her — but our children certainly do.",
    school: 'Al Amal',
    schoolId: 's4',
    district: 'Sfax',
    anonymous: false,
    timestamp: '2026-04-08T11:00:00Z',
    reactions: 156,
    comments: 27,
    targetTeacher: 'Amira Tlili',
  },
]

// ─── Mock Comments ─────────────────────────────────────────────────────────────
export const mockComments: Comment[] = [
  { id: 'c1', postId: 'p1',  userId: 'u2', body: "You are not alone in this. The ratio of admin work to actual teaching has become unsustainable. I tracked it once — 34% of my contracted hours go to non-teaching tasks.", timestamp: '2026-04-15T08:30:00Z' },
  { id: 'c2', postId: 'p1',  userId: 'u5', body: "I feel this every single week. What keeps me going is the moments like what our colleague shared about Amine. Hold onto those.", timestamp: '2026-04-15T09:00:00Z' },
  { id: 'c3', postId: 'p14', userId: 'u2', body: "I can verify this — I visited the classroom last month. The crack runs the full width of the ceiling beam. This needs urgent attention.", timestamp: '2026-04-06T09:00:00Z', isOfficial: false },
  { id: 'c4', postId: 'p14', userId: 'u5', body: "Official Response: Following review of the submitted reports and a site inspection on April 4th, the district engineering office has confirmed the requirement for structural reinforcement. Classes in Room 7 will be relocated to the prefab annexe from Monday 20th April while works are assessed. A full structural report will be shared within 10 working days.", timestamp: '2026-04-07T11:00:00Z', isOfficial: true },
  { id: 'c5', postId: 'p17', userId: 'u2', body: "Samira, you deserve every word of this. The whole department knows how much you give.", timestamp: '2026-04-15T11:00:00Z' },
]

// ─── Mock Notifications ────────────────────────────────────────────────────────
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'gratitude',
    text: 'Fatima Aïssaoui posted a gratitude message for you on the Gratitude Wall',
    timestamp: '2026-04-15T10:05:00Z',
    read: false,
  },
  {
    id: 'n2',
    type: 'reaction',
    text: '47 colleagues reacted to your post "Three exams to grade…" in Teachers\' Lounge',
    timestamp: '2026-04-15T09:00:00Z',
    read: false,
  },
  {
    id: 'n3',
    type: 'comment',
    text: 'Youssef Belhaj commented on your post in Teachers\' Lounge',
    timestamp: '2026-04-15T08:30:00Z',
    read: false,
  },
  {
    id: 'n4',
    type: 'claim_update',
    text: 'Your claim #C-2026-003 "Digital projector…" has been updated to Under Review',
    timestamp: '2026-04-13T14:00:00Z',
    read: true,
  },
  {
    id: 'n5',
    type: 'official_response',
    text: 'An official response was added to claim #C-2026-011 at Ibn Khaldoun',
    timestamp: '2026-04-07T11:30:00Z',
    read: true,
  },
  {
    id: 'n6',
    type: 'reaction',
    text: '89 colleagues reacted to your anonymous post about the assessment reform',
    timestamp: '2026-04-12T12:00:00Z',
    read: true,
  },
]

// ─── Helpers ───────────────────────────────────────────────────────────────────
export function timeAgo(timestamp: string): string {
  const now = new Date()
  const then = new Date(timestamp)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffMins < 1)  return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7)  return `${diffDays} days ago`
  return then.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}
