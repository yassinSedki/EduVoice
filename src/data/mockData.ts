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
  lounge: { label: "Staff Room", color: '#1A5276', bg: '#D6EAF8', route: '/app/lounge', textLight: '#EBF5FB' },
  parents: { label: "Parents' Forum", color: '#1E8449', bg: '#D5F5E3', route: '/app/parents', textLight: '#EAFAF1' },
  claims: { label: 'Claims', color: '#922B21', bg: '#FADBD8', route: '/app/claims', textLight: '#FDEDEC' },
  gratitude: { label: 'Gratitude Wall', color: '#6C3483', bg: '#E8DAEF', route: '/app/gratitude', textLight: '#F5EEF8' },
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
  lounge: ['Burnout', 'Pedagogy', 'Resource Gap', 'Achievement', 'Pupil Welfare', 'Policy Impact'],
  parents: ['Academic Concern', 'Infrastructure', 'Suggestion', 'Wellbeing', 'Policy Question', 'Positive Feedback'],
  claims: ['Unsafe Conditions', 'Missing Resources', 'Administrative Pressure', 'Harassment', 'Contract Issue'],
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
  // ── Staff Room ───────────────────────────────────────────────────────
  {
    id: 'p1',
    userId: 'u1',
    space: 'lounge',
    tag: 'Burnout',
    title: 'ثلاث اختبارات للتصحيح، واجتماعان إداريان، وشكوى من ولي أمر — كل هذا قبل الظهيرة',
    body: 'استيقظت في الخامسة صباحاً لإنهاء التصحيح قبل المدرسة. وحين وصلت إلى الفصل، كنت قد حضرت بالفعل اجتماعَين إداريَّين "عاجلَين" حول أمور كان يمكن تناولها برسالة إلكترونية. ثم جاءت شكوى ولي أمر بشأن درجة كانت موضّحة بوضوح في معايير التقييم لديّ. أنا أحب التدريس، حقاً أحبه. لكن في بعض الأيام تبدو الأعمال الورقية والسياسات والضغوط أثقل من المهنة ذاتها. كل يوم أتساءل: كم من الوقت يمكنني الصمود على هذا النحو؟',
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
    title: '42 تلميذاً و28 كتاباً مدرسياً — المعادلة لا تستقيم',
    body: 'فصلنا يضم 42 تلميذاً هذا العام، وتلقينا 28 كتاباً مدرسياً فقط. أنا أتكفل بتصوير الصفحات من مالي الخاص منذ أكتوبر. مدير المدرسة يقول إن الشحنة "في الطريق" — وهذا ما قيل لي قبل ثلاثة أشهر. يتقاسم التلاميذ الكتب في مجموعات من ثلاثة حتى أثناء الامتحانات. رفعت هذا الأمر رسمياً مرتين ولم أتلقَّ أي رد. متى تصبح هذه المسألة شكوى رسمية؟ لستُ أسعى إلى إثارة الإشكاليات، أحتاج فقط إلى الموارد اللازمة لأداء عملي.',
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
    body: 'لا بدّ أن أشارككم هذه اللحظة، فأنا أحتاج إلى التمسك بها في الأيام الصعبة. بدأ أمين العام الدراسي وهو بالكاد يستطيع فكّ بعض الجمل البسيطة. كان والداه قلقَين، وكنت قلقةً أنا أيضاً. عملنا معاً ثلاث مرات في الأسبوع بعد انتهاء الدروس. الخميس الماضي، وأمام كامل الفصل، وقف وأتمّ قصيدةً من ثمانية مقاطع، كلمةً كلمةً، دون أي توجيه. صفّق له الفصل لمدة دقيقة كاملة. ذلك الوجه. هذا هو السبب الوحيد الذي يجعلني أواصل هذه المهنة. استمروا يا زملائي.',
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
    body: 'دخل إصلاح التقييم الجديد حيز التطبيق هذا الأسبوع. أمضيت الصيف الماضي في حضور ثلاث دورات تكوينية حوله. أعدت هيكلة جميع خططي الدراسية، وصممت أدوات تقييم جديدة، وحدّثت نظام سجل الدرجات. هذا الأسبوع تلقيت منشوراً يفيد بأن الإطلاق "مؤجل إلى أجل غير مسمى" ريثما تُستكمل المراجعة. ستة أشهر من الإعداد — يمحوها منشور إداري واحد. أفهم أن السياسات بحاجة إلى تقييم، لكن الفشل في التواصل مُنهِك. لسنا آلات تُعاد برمجتها في لحظة.',
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
    body: 'لديّ تلميذ أشعر بقلق متصاعد حياله. منعزل، توقف عن المشاركة، وتراجعت درجاته بشكل ملحوظ خلال شهرين. حاولت التحدث معه مرتين — هو مؤدّب لكنه منغلق. أبلغت مستشار المدرسة قبل أسبوعين ولم أسمع شيئاً منذ ذلك الحين. لا أعرف إن كان ثمة بروتوكول لتصعيد هذا الأمر. هل يعرف أحد هنا كيفية إثارة قضية رعاية تلميذ رسمياً حين تبدو القنوات الداخلية غير مستجيبة؟ أريد التأكد من أن هذا الطفل يحظى بالدعم اللازم.',
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
    title: 'جربت حلقات التعلم التعاوني للمرة الأولى — أشارككم ما نجح',
    body: 'انتقلت من الصفوف التقليدية إلى حلقات التعلم هذا الفصل في فصول العلوم. كل مجموعة من أربعة تضم مدوّناً ومحاوراً وملخّصاً وعارضاً، مع تدوير الأدوار كل أسبوعين. جودة النقاشات أدهشتني حقاً — تلاميذ كانوا نادراً ما يتكلمون باتوا يقودون ملخصات المجموعة. المفتاح كان منحهم بطاقة نقاش منظّمة تحتوي أربعة محاور لكل جلسة. ليست مثالية لكل موضوع، لكنها كانت تحويلية للمواضيع المعقدة. يسعدني مشاركة النموذج مع من يرغب.',
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
    title: 'ابنتي في السنة الثانية ابتدائي وما زالت تعاني في القراءة — هل هذا طبيعي؟',
    body: 'ابنتي عمرها 8 سنوات وهي في السنة الثانية ابتدائي. طفلة ذكية وفضولية لكن القراءة صعبة جداً عليها. تقلب الحروف كثيراً وتفقد موضعها وتُصيبها ضائقة واضحة عند القراءة الجهرية. معلمتها تقول إنها "بطيئة نوعاً ما" وتنصح بالتمرين في البيت. نحن نتمرن كل ليلة. أتساءل هل هناك مسار تقييم رسمي عبر المدرسة لصعوبات التعلم. هل مرّ أحد من الأولياء بهذه التجربة؟ لا أعرف من أسأل ولا أين أتوجه داخل المنظومة التربوية.',
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
    body: 'أخبرتنا المدرسة الأربعاء الماضي برسالة نصية أن مسار حافلة المنطقة 3 (وادي الزيت) سيتغير اعتباراً من الصباح الموالي. زوجي وأنا نبدأ العمل في السابعة والنصف، ولم يكن لدينا وقت لترتيب بدائل. ثلاثة أولياء في مجموعتنا واجهوا الأمر ذاته، واضطر ثلاثة أطفال إلى التغيب عن المدرسة ذلك اليوم. هذا الوضع لا يمكن قبوله. قد يكون تغيير المسار مبرراً، لكن إشعاراً بـ24 ساعة يطال أكثر من 40 عائلة غير مقبول بالمرة. هل يمكن لإدارة المدرسة معالجة هذا الأمر علناً؟',
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
    title: 'مقترح: اجتماع شهري بين الأولياء والمعلمين، لا فقط عند الكشوف المدرسية',
    body: 'حالياً نلتقي بالمعلمين رسمياً مرتين في السنة فقط — عند كشوف الثلاثيات. وحين نعلم بوجود مشكلة تكون قد تراكمت لأشهر. أودّ أن أقترح رسمياً على مدرستنا اعتماد موعد لقاء شهري مدته 20 دقيقة لكل وليّ يرغب في ذلك. لا يجب أن يكون إلزامياً للمعلمين — حتى نظام الحجز الطوعي سيكون تحسناً ملموساً. كثير من المنظومات التربوية الأوروبية تعتمد هذا النموذج. أيها الأولياء — هل تدعمون هذا المقترح؟ إن رفعناه جماعةً ربما أصغى المدير.',
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
    body: 'عاد ابني الثلاثاء باكياً ورفض الذهاب إلى المدرسة في اليوم التالي. بعد ساعة من الحديث معه أخبرني أن مجموعة من الأولاد الأكبر سناً تُنعته بألفاظ تتعلق بوزنه كل يوم منذ أسبوعين. أبلغت معلم الفصل في المساء ذاته. مضى يومان دون أن تتصل المدرسة بي. اضطررت للاتصال بالمدير مباشرة. تم "تدوين" الأمر لكنني لا أعلم بأي إجراء اتُّخذ. أنشر هنا لأنني أشعر بالوحدة التامة في هذا. أيها الأولياء — كيف تعاملتم مع تنمر لم تأخذه المدرسة بجدية؟',
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
    title: 'تجديد مخبر العلوم — أخيراً فضاء يستحق الاحتفال',
    body: 'أودّ أن أتوقف لحظة لأسجّل شيئاً إيجابياً. اكتمل تجديد مخبر العلوم في ابن خلدون الشهر الماضي وهو مثير للإعجاب حقاً. معدات حديثة، تهوية جيدة، وأرضيات كافية لفصل كامل دون ازدحام. عادت ابنتي متحمسة بعد أول جلسة مخبر — شيء لم أشهده من قبل. أعرف أننا نستخدم هذه المنصة للمخاوف والشكاوى، لكن الفضل لمن يستحقه: من دفع نحو هذا التجديد يستحق التقدير. شكراً للإدارة ولكل من دافع عن هذا المشروع.',
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
    title: 'جهاز العرض الرقمي الموعود في سبتمبر لم يُسلَّم بعد — 7 أشهر',
    body: 'في أغسطس أُبلغت من مدير المدرسة أن كل فصل سيتلقى جهاز عرض رقمي وشاشة ضمن برنامج التحديث الجهوي. بعد سبعة أشهر من السنة الدراسية، فصلي لم يتسلم شيئاً. أرسلت ثلاثة طلبات رسمية مكتوبة للإدارة المدرسية، أُقرّت كل منها لكن دون متابعة. تلاميذي في وضع أدنى بكثير مقارنةً بأقرانهم في فصول مجهّزة. هذا المورد وُعد به رسمياً وأطلب رسمياً من المكتب الجهوي تأكيد جدول التسليم أو شرح سبب التأخير.',
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
    title: 'توجيه بتغيير درجات التلاميذ بأمر إداري',
    body: 'في 14 مارس استدعيت إلى مكتب المدير وأُبلغت شفهياً بتعليمات برفع الدرجة النهائية لثلاثة تلاميذ بعينهم ممن "أبدى أولياؤهم مخاوف لمكتب الجهة". لم تُعطَ أي تعليمات خطية. رفضت ووثّقت الحادثة. بعد ذلك استُبعدت من لجنة الجدول الزمني للهيئة دون أي تفسير. أودّع هذه الشكوى لإنشاء سجل رسمي لهذه الواقعة. بإمكاني تقديم تواريخ وأسماء وملاحظات من سجلي الشخصي. أطلب من مكتب الجهة التحقيق في هذا الضغط.',
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
    title: 'شق هيكلي في سقف قاعة 7 أُبلغ عنه ثلاث مرات — دون إجراء',
    body: 'ظهر شق هيكلي واضح في سقف قاعة 7 في مدرستنا في يناير. صوّرته في 18 يناير وأرسلت تقريراً مكتوباً إلى الإدارة المدرسية. في 3 فبراير زار مفتش الموقع، دوّن الشق وغادر. في 28 فبراير اتسع الشق بشكل ملحوظ. قدّمت تقريراً ثانياً. في 15 مارس قدّمت تقريراً ثالثاً مع صور توثّق التطور. ما زلت أدرّس في هذه القاعة مع 38 تلميذاً. خطر السلامة غير مقبول وأطلب رسمياً إجراء تقييم هيكلي عاجل وإعادة توجيه الفصول إن اقتضى الأمر.',
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
    officialResponse: "في أعقاب مراجعة التقارير المُقدَّمة وزيارة ميدانية أُجريت في 4 أبريل، أكد مكتب الهندسة الجهوي ضرورة تعزيز الهيكل في قاعة 7. كإجراء فوري، ستُنقل جميع الفصول المخصصة للقاعة 7 إلى الجناح الجاهز المؤقت اعتباراً من الاثنين 20 أبريل، وذلك ريثما تُقيَّم الأشغال وتنتهي. سيُوجَّه تقرير هيكلي شامل إلى الإدارة المدرسية خلال 10 أيام عمل. صحة وسلامة التلاميذ والطاقم التربوي تبقى أولويتنا المطلقة.",
    officialResponseBy: 'Karim Benali',
    officialResponseAt: '2026-04-07T11:00:00Z',
  },
  {
    id: 'p15',
    userId: 'u2',
    space: 'claims',
    tag: 'Contract Issue',
    title: 'ستة أشهر من ساعات العمل الإضافي غير المدفوعة — القضية لا تزال معلّقة',
    body: 'ينص عقدي على تعويض ساعات الإشراف التي تتجاوز 18 ساعة أسبوعياً بمعدل 1.5x. منذ سبتمبر أشرف في المتوسط على 22 ساعة أسبوعياً بسبب نقص الكوادر. كشوف راتبي للأشهر من سبتمبر إلى فبراير لا تتضمن أي تعويض إضافي. رفعت الأمر للإدارة في نوفمبر — قيل لي إنه "قيد المعالجة مركزياً". رفعته مجدداً في يناير وفبراير دون حل. يُقدَّر المبلغ المستحق بنحو 720 دينار. أودّع هذه الشكوى بوصفها نزاعاً تعاقدياً رسمياً للبت فيه على المستوى الجهوي.',
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
    officialResponse: "في أعقاب التحقيق في نزاع تعويض العمل الإضافي، أكد مكتب رواتب الجهة وجود خطأ في حساب ساعات الإشراف الإضافية للفترة من سبتمبر 2025 إلى فبراير 2026. تمت معالجة الرصيد المستحق البالغ 720 ديناراً وسيُدرج في كشف راتب أبريل 2026. نعتذر عن التأخير والإزعاج. تمت إضافة خطوة تحقق إلى مسار الرواتب الشهرية لتفادي تكرار هذا الخطأ. هذه الشكوى مُصنَّفة الآن بوصفها محلولة.",
    officialResponseBy: 'Karim Benali',
    officialResponseAt: '2026-03-25T10:00:00Z',
  },
  {
    id: 'p16',
    userId: 'u1',
    space: 'claims',
    tag: 'Harassment',
    title: 'نمط من التخويف الممنهج من قِبَل المدير المساعد في أعقاب النشاط النقابي',
    body: 'منذ مشاركتي في الجمعية الجهوية للنقابة التعليمية في ديسمبر، أعاني من نمط ممنهج مما أعدّه تخويفاً مهنياً موجّهاً. يتجلى ذلك في زيارات مفاجئة للفصل لا تطال غيري من الأساتذة، وانتقاد علني لأساليبي في اجتماعات الهيئة التدريسية، فضلاً عن إسناد أسوأ جدول زمني في الفصل القادم دون أي تشاور. بحوزتي توثيق لكل حادثة. أطلب رسمياً إحالة هذه الشكوى إلى مستوى السلطة التعليمية الجهوية للمراجعة المستقلة، إذ لا أعتقد بإمكانية إجراء تحقيق داخلي نزيه.',
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
    title: 'شكراً لكِ، مدام سميرة كريم',
    body: 'ابني كريم يعاني من قلق شديد في الرياضيات. العام الماضي، في فصلك، تغيّر فيه شيء ما. لم تجعليه يشعر مرة واحدة بالغباء لأنه طرح سؤالاً مرتين. مكثتِ بعد المدرسة إحدى عشرة مرة — عددتها — للعمل معه بشكل خاص. درجته النهائية في الامتحان كانت 14 من 20. الرقم لا يعكس ما حدث حقاً: طفل كان يبكي قبل امتحانات الرياضيات دخل تلك القاعة هادئاً ومستعداً. أنتِ من فعلتِ ذلك. شكراً لا يكفي لكنه كل ما لديّ. أنتِ السبب في أن ابني يؤمن الآن بقدرته على التعلم.',
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
    title: 'لأستاذ يوسف بلحاج — الذي لم يستسلم في مواجهة ابنتي',
    body: 'عانت سيرين من الضعف في قواعد اللغة العربية والتعبير لمدة سنتين قبل أن تدخل فصلك. رأيت فيها شيئاً غاب عن الآخرين. صممت لها سجل قراءة خاصاً، وعرّفتها على الشعر العربي، وجعلت طفلة في الثانية عشرة تهتم اهتماماً عميقاً بصناعة اللغة. الآن تكتب قصصاً قصيرة طوعياً في عطل نهاية الأسبوع. أراها تقرأ الروايات العربية بشغف. غيّرت علاقتها بلغتها الأم. هذه هديّة ستبقى معها طوال حياتها. شكراً لك، أستاذ بلحاج.',
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
    body: 'حين فقد ابني حمزة جدّه في نوفمبر، انزوى كثيراً على نفسه. كنت غارقةً في حزني بحيث لم أنتبه مدى معاناته في المدرسة. مدام منصوري هي من اتصلت بي — ليس لتشكو من تراجع درجاته، ولا لتنبّهني. اتصلت لتخبرني أنها كانت تجلس معه وقت الغداء وتتيح له الكلام، وأنه يحمل ثقلاً كبيراً. وكانت قد رتّبت مسبقاً لمستشار المدرسة أن يطمئن عليه. ذلك الاتصال أعادني إلى رؤية ابني بوضوح. معلمون من أمثالك هم الأبطال الصامتون لكل عائلة تمر بمحنة.',
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
    title: 'إلى أستاذة الفيزياء التي جاءت في عطلة العيد',
    body: 'لم أتوقع يوماً أن يأتي معلم إلى المدرسة خلال عطلة العيد لإجراء جلسة مراجعة قبل الامتحان الوطني. مدام أميرة الطليلي فعلت ذلك بالضبط من أجل اثني عشر تلميذاً كانوا على حافة الرسوب. أحضرت تمارين مطبوعة وقهوتها الخاصة ومنحت أربع ساعات من عطلتها لتلاميذ لا تستطيع عائلاتهم تحمّل تكاليف الدروس الخصوصية. ثلاثة من هؤلاء الاثني عشر نجحوا في الامتحان الوطني. أحدهم ابني. لا أملك كلمات تعبّر عمّا يعنيه هذا العطاء. المنظومة التربوية لا تستحق دائماً معلمين كها — لكن أطفالنا يستحقون ذلك بالتأكيد.',
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
  { id: 'c1', postId: 'p1', userId: 'u2', body: 'لستَ وحدك في هذا. نسبة العمل الإداري مقارنةً بالتدريس الفعلي باتت لا تُحتمل. تتبّعت الأمر مرة — 34% من ساعاتي التعاقدية تذهب لمهام غير تدريسية.', timestamp: '2026-04-15T08:30:00Z' },
  { id: 'c2', postId: 'p1', userId: 'u5', body: 'أشعر بهذا كل أسبوع. ما يُبقيني صامدة هي لحظات كتلك التي شاركها زميلنا عن أمين. تمسّك بها.', timestamp: '2026-04-15T09:00:00Z' },
  { id: 'c3', postId: 'p14', userId: 'u2', body: 'أستطيع تأكيد ذلك — زرت القاعة الشهر الماضي. الشق يمتد على كامل عرض عارضة السقف. هذا يستوجب تدخلاً عاجلاً.', timestamp: '2026-04-06T09:00:00Z', isOfficial: false },
  { id: 'c4', postId: 'p14', userId: 'u5', body: 'رد رسمي: في أعقاب مراجعة التقارير المُقدَّمة وزيارة ميدانية في 4 أبريل، أكد مكتب الهندسة الجهوي ضرورة التعزيز الهيكلي لقاعة 7. ستُنقل الفصول إلى الجناح المؤقت اعتباراً من الاثنين 20 أبريل ريثما تُقيَّم الأشغال. سيُوجَّه تقرير هيكلي شامل في غضون 10 أيام عمل.', timestamp: '2026-04-07T11:00:00Z', isOfficial: true },
  { id: 'c5', postId: 'p17', userId: 'u2', body: 'سميرة، تستحقين كل كلمة من هذا. كل القسم يعرف مقدار ما تعطين.', timestamp: '2026-04-15T11:00:00Z' },
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
  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return then.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}