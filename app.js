const questions = [
  {
    id: "authority",
    prompt: "Where should moral and spiritual authority primarily come from?",
    help: "This is about what you want to trust when your life gets complex: established tradition or ongoing reinterpretation.",
    leftLabel: "Enduring tradition and inherited teaching",
    rightLabel: "Conscience, reason, and ongoing reinterpretation",
    shortLeft: "inherited teaching and continuity",
    shortRight: "conscience, reason, and reinterpretation"
  },
  {
    id: "pluralism",
    prompt: "How much theological openness feels healthy to you?",
    help: "Some traditions offer clear doctrinal boundaries. Others make more room for ambiguity, pluralism, and unresolved questions.",
    leftLabel: "Clear doctrine and shared belief boundaries",
    rightLabel: "Wide room for questioning and pluralism",
    shortLeft: "clear doctrine and defined boundaries",
    shortRight: "wide room for questioning and pluralism"
  },
  {
    id: "ritual",
    prompt: "What kind of worship or gathering feels most life-giving?",
    help: "Think about whether ritual and liturgy ground you or whether you feel more at home in simplicity and spontaneity.",
    leftLabel: "Structured liturgy, ritual, and sacred rhythm",
    rightLabel: "Simple, informal, or flexible gatherings",
    shortLeft: "structured liturgy and sacred rhythm",
    shortRight: "simple and flexible gatherings"
  },
  {
    id: "mysticism",
    prompt: "How do you most want to encounter the sacred?",
    help: "This asks whether silence, contemplation, and mystery matter more to you than instruction, preaching, or doctrinal clarity.",
    leftLabel: "Through silence, contemplation, and mystery",
    rightLabel: "Through teaching, preaching, and articulated belief",
    shortLeft: "silence, contemplation, and mystery",
    shortRight: "teaching, preaching, and articulated belief"
  },
  {
    id: "inclusion",
    prompt: "How central is explicit inclusion in leadership and belonging?",
    help: "This is about whether you need a community that publicly centers broad participation across gender, sexuality, and identity.",
    leftLabel: "Continuity with inherited role boundaries matters more",
    rightLabel: "Explicit, public inclusion matters more",
    shortLeft: "inherited role boundaries",
    shortRight: "explicit public inclusion"
  },
  {
    id: "mission",
    prompt: "What kind of public witness feels most faithful?",
    help: "Some communities center evangelism or invitation. Others focus more on service, presence, and conscience-driven witness.",
    leftLabel: "A strong call to invite, convert, or proclaim",
    rightLabel: "Witness mainly through service and presence",
    shortLeft: "active invitation and proclamation",
    shortRight: "service and presence"
  },
  {
    id: "structure",
    prompt: "What kind of leadership structure do you trust most?",
    help: "Consider whether you are steadied by formal authority or by shared discernment and local participation.",
    leftLabel: "Hierarchy and formal spiritual authority",
    rightLabel: "Shared discernment and local participation",
    shortLeft: "hierarchy and formal authority",
    shortRight: "shared discernment and participation"
  },
  {
    id: "scripture",
    prompt: "How should sacred text function in community life?",
    help: "This compares traditions that center clear textual authority with those that tend to interpret text through history, reason, and lived experience.",
    leftLabel: "As a decisive, governing authority",
    rightLabel: "As one voice interpreted with context and experience",
    shortLeft: "decisive textual authority",
    shortRight: "interpretation with context and experience"
  },
  {
    id: "embodiment",
    prompt: "How important are embodied practices to your spiritual life?",
    help: "Embodied practice includes sacraments, fasting, set prayers, festivals, icons, bowing, pilgrimage, or disciplined communal rhythms.",
    leftLabel: "Very important. I want tangible, repeated practices.",
    rightLabel: "Less important. Simplicity matters more to me.",
    shortLeft: "tangible, repeated spiritual practices",
    shortRight: "spiritual simplicity over formal practice"
  },
  {
    id: "justice",
    prompt: "How directly should social ethics shape communal identity?",
    help: "This is not about whether compassion matters. It is about whether you want the community's public moral life to be visibly central.",
    leftLabel: "Personal holiness and inward transformation first",
    rightLabel: "Public justice and communal ethics visibly central",
    shortLeft: "personal holiness and inward transformation",
    shortRight: "public justice and communal ethics"
  },
  {
    id: "publicExpression",
    prompt: "How important are outwardly visible expressions of faith?",
    help: "Some traditions are relatively quiet and private in practice. Others expect visible testimony, expressive worship, public devotion, or strong communal identity markers.",
    leftLabel: "Mostly inward, private, or understated",
    rightLabel: "Publicly visible, expressive, or strongly communal",
    shortLeft: "inward and understated faith",
    shortRight: "publicly visible and expressive faith"
  },
  {
    id: "connectionSetting",
    prompt: "Where do you most expect to connect with Deity or the sacred?",
    help: "This distinguishes traditions centered on solitude, nature, and personal contemplation from traditions centered on corporate, structured worship with others.",
    leftLabel: "In nature, solitude, or personal contemplation",
    rightLabel: "In structured worship with peers and community",
    shortLeft: "nature, solitude, and personal contemplation",
    shortRight: "structured worship with community"
  },
  {
    id: "transformation",
    prompt: "How should spiritual transformation primarily happen?",
    help: "Some paths emphasize surrender, grace, worship, and relationship with Deity. Others emphasize disciplined self-mastery, special knowledge, spiritual technology, or inner development.",
    leftLabel: "Through grace, worship, and relationship with the sacred",
    rightLabel: "Through self-mastery, spiritual technology, or esoteric development",
    shortLeft: "grace, worship, and relationship with the sacred",
    shortRight: "self-mastery, spiritual technology, or esoteric development"
  },
  {
    id: "discipline",
    prompt: "How much should a tradition shape daily lifestyle and boundaries?",
    help: "This includes Sabbath practice, dietary or health codes, dress expectations, fasting, sexual ethics, and strong everyday rhythms or boundaries.",
    leftLabel: "Clear lifestyle expectations and disciplined boundaries",
    rightLabel: "Broad guidance with more personal discretion",
    shortLeft: "clear lifestyle boundaries and discipline",
    shortRight: "broad guidance with personal discretion"
  }
];

const filters = [
  {
    id: "womenLeadership",
    title: "Women can serve in senior clergy or equivalent leadership roles",
    description: "Keep traditions that affirm this or where practice varies by local community."
  },
  {
    id: "lgbtqAffirming",
    title: "LGBTQ+ people are explicitly affirmed in belonging, marriage, and leadership",
    description: "Remove traditions where this is broadly unlikely and flag traditions where local variation matters."
  },
  {
    id: "doubtFriendly",
    title: "There is room for sustained questioning and unresolved doubt",
    description: "Useful if certainty pressure would be harmful or counterproductive for you."
  },
  {
    id: "lowProselytizing",
    title: "Low pressure to recruit, convert, or evangelize",
    description: "Keep traditions whose public posture is usually less conversion-driven."
  }
];

const presets = [
  {
    id: "rebuilding-openness",
    title: "Rebuilding With Openness",
    description: "For someone prioritizing inclusion, active questioning, low certainty pressure, and service-centered community.",
    reflection: "I want an honest, compassionate community with room to question and rebuild slowly.",
    answers: {
      authority: 5,
      pluralism: 5,
      ritual: 5,
      mysticism: 4,
      inclusion: 5,
      mission: 5,
      structure: 5,
      scripture: 5,
      embodiment: 5,
      justice: 5,
      publicExpression: 3,
      connectionSetting: 3,
      transformation: 4,
      discipline: 5
    },
    activeFilters: ["womenLeadership", "lgbtqAffirming", "doubtFriendly", "lowProselytizing"]
  },
  {
    id: "historic-rootedness",
    title: "Seeking Historic Rootedness",
    description: "For someone drawn to continuity, sacrament, reverence, and clear spiritual structure.",
    reflection: "I want a durable tradition with embodied practices and a sense of inheritance.",
    answers: {
      authority: 1,
      pluralism: 1,
      ritual: 1,
      mysticism: 1,
      inclusion: 1,
      mission: 2,
      structure: 1,
      scripture: 1,
      embodiment: 1,
      justice: 2,
      publicExpression: 2,
      connectionSetting: 5,
      transformation: 1,
      discipline: 1
    },
    activeFilters: []
  },
  {
    id: "justice-liturgy",
    title: "Justice With Ritual Depth",
    description: "For someone who wants public ethics, inclusion, and a worship life with visible beauty and structure.",
    reflection: "I want a community that feels sacred, intellectually honest, and socially courageous.",
    answers: {
      authority: 4,
      pluralism: 4,
      ritual: 2,
      mysticism: 3,
      inclusion: 5,
      mission: 5,
      structure: 3,
      scripture: 4,
      embodiment: 2,
      justice: 5,
      publicExpression: 4,
      connectionSetting: 4,
      transformation: 2,
      discipline: 3
    },
    activeFilters: ["womenLeadership", "lgbtqAffirming", "doubtFriendly"]
  },
  {
    id: "contemplative-practice",
    title: "Contemplative Practice Seeker",
    description: "For someone seeking silence, inward transformation, discipline, and low-pressure community life.",
    reflection: "I want practices that quiet me, deepen compassion, and do not rely on pressure or spectacle.",
    answers: {
      authority: 4,
      pluralism: 4,
      ritual: 2,
      mysticism: 1,
      inclusion: 4,
      mission: 5,
      structure: 4,
      scripture: 4,
      embodiment: 2,
      justice: 4,
      publicExpression: 2,
      connectionSetting: 4,
      transformation: 1,
      discipline: 3
    },
    activeFilters: ["doubtFriendly", "lowProselytizing"]
  }
];

const coverageGroups = [
  {
    label: "Christian traditions",
    description: "Coverage now includes historic churches, mainline families, charismatic traditions, restorationist traditions, and requested denominations whose worship style and authority structure differ in real ways.",
    items: ["Roman Catholic", "Eastern Orthodox", "Anglican / Episcopal", "Lutheran", "Presbyterian", "Methodist", "Baptist", "Pentecostal", "Assemblies of God", "Seventh-day Adventist", "Evangelical Protestant", "Quaker", "Latter-day Saints", "Community of Christ"]
  },
  {
    label: "Muslim traditions",
    description: "The app currently includes the two largest broad Muslim families because authority, law, devotion, and communal tone can differ meaningfully.",
    items: ["Sunni Islam", "Shia Islam"]
  },
  {
    label: "Jewish traditions",
    description: "Jewish coverage includes several major denominational patterns with different balances between continuity, halakhah, inclusion, and adaptation.",
    items: ["Reform Judaism", "Conservative Judaism", "Modern Orthodox Judaism"]
  },
  {
    label: "Dharmic and contemplative traditions",
    description: "These profiles represent broad families rather than every lineage. Local temple, sangha, or teacher context still matters heavily.",
    items: ["Hinduism", "Buddhist modern meditation communities", "Sikhism", "Scientology"]
  },
  {
    label: "Other religions and pagan paths",
    description: "Pew places many smaller global traditions in an 'other religions' category. This app now includes several of those in broad exploratory form.",
    items: ["Bahá'í Faith", "Wicca", "Contemporary Pagan traditions"]
  },
  {
    label: "Religiously unaffiliated",
    description: "Pew treats the unaffiliated as a major global category. The app includes both strongly secular and spiritually open non-affiliated pathways.",
    items: ["Atheist / Secular Humanist", "Agnostic or spiritually open unaffiliated"]
  }
];

const coverageNoteText = "Folk or traditional religions are not modeled as generic match cards yet. Many are deeply tied to peoplehood, ancestry, land, or closed communal practice, so a broad values-matching shortcut could misrepresent them. The questionnaire now also distinguishes public faith expression, preferred connection setting, spiritual transformation style, and daily discipline so the additional denominations are more clearly separated.";

const baseTraditions = [
  {
    id: "quaker",
    name: "Quaker (especially unprogrammed meetings)",
    family: "Christian-rooted, often contemplative and non-creedal",
    summary: "Often centers silence, conscience, equality, and communal discernment. Many meetings make room for uncertainty and lived ethical witness.",
    cautions: "Quaker communities vary widely. Some are deeply Christian and some are much more pluralistic. The amount of structure can feel freeing or too undefined.",
    verify: [
      "How explicitly Christian is this meeting in actual practice?",
      "How does the community make decisions when there is serious moral disagreement?",
      "Does the meeting's silence feel grounding or emotionally thin to you?"
    ],
    profile: {
      authority: 4.7,
      pluralism: 4.9,
      ritual: 4.8,
      mysticism: 1.2,
      inclusion: 4.8,
      mission: 4.8,
      structure: 4.8,
      scripture: 4.6,
      embodiment: 4.4,
      justice: 4.8
    },
    flags: {
      womenLeadership: "affirmed",
      lgbtqAffirming: "affirmed",
      doubtFriendly: "affirmed",
      lowProselytizing: "affirmed"
    }
  },
  {
    id: "unitarian-universalist",
    name: "Unitarian Universalism",
    family: "Pluralistic and non-creedal",
    summary: "Often attracts people seeking community, moral seriousness, and spiritual openness without fixed doctrinal commitments.",
    cautions: "If you want a strongly defined theological center or inherited ritual depth, many congregations may feel too open-ended.",
    verify: [
      "Is there enough spiritual depth here for the kind of life you want?",
      "How does this congregation ground moral claims when members disagree?",
      "Does the community offer durable practices, not only shared values?"
    ],
    profile: {
      authority: 5,
      pluralism: 5,
      ritual: 4.7,
      mysticism: 2.9,
      inclusion: 5,
      mission: 4.9,
      structure: 4.2,
      scripture: 5,
      embodiment: 4.5,
      justice: 5
    },
    flags: {
      womenLeadership: "affirmed",
      lgbtqAffirming: "affirmed",
      doubtFriendly: "affirmed",
      lowProselytizing: "affirmed"
    }
  },
  {
    id: "mainline-protestant",
    name: "Mainline Protestant",
    family: "Broadly Protestant; often Methodist, ELCA Lutheran, PCUSA, UCC, Episcopal, and similar",
    summary: "Often blends Christian liturgy or scripture with room for historical criticism, pastoral flexibility, and public ethics.",
    cautions: "Actual congregational culture varies sharply by denomination and location. Some communities may feel spiritually rich; others may feel institutionally tired.",
    verify: [
      "Is this congregation explicitly affirming in practice, not only in policy?",
      "How central are worship, scripture, and sacrament in daily community life?",
      "Does the church still feel alive enough for the kind of commitment you want?"
    ],
    profile: {
      authority: 3.8,
      pluralism: 4.2,
      ritual: 2.4,
      mysticism: 3.1,
      inclusion: 4.5,
      mission: 4.1,
      structure: 3.2,
      scripture: 3.7,
      embodiment: 2.7,
      justice: 4.5
    },
    flags: {
      womenLeadership: "affirmed",
      lgbtqAffirming: "varies",
      doubtFriendly: "affirmed",
      lowProselytizing: "affirmed"
    }
  },
  {
    id: "anglican-episcopal",
    name: "Anglican / Episcopal",
    family: "Liturgical Christian",
    summary: "Often offers a middle path: rooted liturgy, scripture, sacrament, and tradition with varying degrees of openness and intellectual range.",
    cautions: "The same liturgy can shelter very different moral and theological cultures. Local parish culture matters a great deal.",
    verify: [
      "How does this parish speak about authority, sacraments, and human dignity in practice?",
      "Does its liturgical beauty connect to lived community care?",
      "Is the local parish more expansive or more boundary-driven than the wider denomination?"
    ],
    profile: {
      authority: 2.9,
      pluralism: 3.8,
      ritual: 1.3,
      mysticism: 2.7,
      inclusion: 3.9,
      mission: 3.9,
      structure: 2.4,
      scripture: 3.2,
      embodiment: 1.6,
      justice: 4.1
    },
    flags: {
      womenLeadership: "affirmed",
      lgbtqAffirming: "varies",
      doubtFriendly: "affirmed",
      lowProselytizing: "affirmed"
    }
  },
  {
    id: "roman-catholic",
    name: "Roman Catholic",
    family: "Historic sacramental Christian tradition",
    summary: "Often appeals to people seeking continuity, sacramental life, moral tradition, global community, and a deeply embodied spiritual framework.",
    cautions: "If you need major doctrinal flexibility or explicit affirmation on gender and sexuality questions, there may be serious tension. Parish culture still varies.",
    verify: [
      "What does this parish feel like around conscience, mercy, and belonging?",
      "Can you live with the difference between official teaching and local pastoral practice?",
      "Does the sacramental and communal rhythm actually nourish you?"
    ],
    profile: {
      authority: 1.3,
      pluralism: 1.4,
      ritual: 1.2,
      mysticism: 2.2,
      inclusion: 1.6,
      mission: 2.7,
      structure: 1.1,
      scripture: 2.1,
      embodiment: 1.1,
      justice: 2.9
    },
    flags: {
      womenLeadership: "unlikely",
      lgbtqAffirming: "unlikely",
      doubtFriendly: "varies",
      lowProselytizing: "varies"
    }
  },
  {
    id: "eastern-orthodox",
    name: "Eastern Orthodox",
    family: "Historic liturgical Christian tradition",
    summary: "Often centers continuity, sacramental worship, reverence, iconography, ascetic practice, and a strong sense of participating in an ancient life.",
    cautions: "If you need local flexibility, low hierarchy, or explicit public inclusion, the fit may be difficult. Parish ethnic culture can also shape the experience.",
    verify: [
      "Does the parish's inherited beauty feel grounding or inaccessible?",
      "How does the local community treat outsiders, converts, and questioners?",
      "Can you inhabit the discipline this tradition asks for over time?"
    ],
    profile: {
      authority: 1.2,
      pluralism: 1.2,
      ritual: 1.1,
      mysticism: 1.6,
      inclusion: 1.4,
      mission: 3.2,
      structure: 1.3,
      scripture: 1.9,
      embodiment: 1,
      justice: 2.7
    },
    flags: {
      womenLeadership: "unlikely",
      lgbtqAffirming: "unlikely",
      doubtFriendly: "unlikely",
      lowProselytizing: "affirmed"
    }
  },
  {
    id: "evangelical-protestant",
    name: "Evangelical Protestant",
    family: "Broad Protestant family centered on conversion, scripture, and proclamation",
    summary: "Often fits people who want personal transformation, strong preaching, clear scriptural authority, and active invitation into faith.",
    cautions: "The category is extremely broad. Some communities are warm and service-oriented; others may feel certainty-driven, restrictive, or politically loaded.",
    verify: [
      "How does this church treat dissent, ambiguity, and spiritual struggle?",
      "Is the congregation's scriptural confidence paired with humility and care?",
      "Does the community's mission posture feel meaningful or pressuring?"
    ],
    profile: {
      authority: 1.8,
      pluralism: 1.4,
      ritual: 4,
      mysticism: 4.2,
      inclusion: 1.7,
      mission: 1.3,
      structure: 2.9,
      scripture: 1.2,
      embodiment: 3.7,
      justice: 2.2
    },
    flags: {
      womenLeadership: "varies",
      lgbtqAffirming: "unlikely",
      doubtFriendly: "varies",
      lowProselytizing: "unlikely"
    }
  },
  {
    id: "reform-judaism",
    name: "Reform Judaism",
    family: "Jewish tradition with strong emphasis on ethical life and adaptation",
    summary: "Often blends Jewish belonging, liturgical rhythm, moral seriousness, and modern reinterpretation with explicit room for contemporary life.",
    cautions: "If you are seeking highly fixed doctrine, strong orthopraxy, or a conversion-centered environment, this may not fit. Belonging and practice can feel different from Christian models.",
    verify: [
      "What level of practice and learning does this community actually invite?",
      "Does the congregation's Jewish life feel substantial or mostly cultural?",
      "How are outsiders, seekers, and potential converts guided?"
    ],
    profile: {
      authority: 4.2,
      pluralism: 4.3,
      ritual: 2.2,
      mysticism: 3,
      inclusion: 4.7,
      mission: 4.9,
      structure: 3.3,
      scripture: 3.9,
      embodiment: 2.5,
      justice: 4.4
    },
    flags: {
      womenLeadership: "affirmed",
      lgbtqAffirming: "affirmed",
      doubtFriendly: "affirmed",
      lowProselytizing: "affirmed"
    }
  },
  {
    id: "conservative-judaism",
    name: "Conservative Judaism",
    family: "Jewish tradition balancing continuity and adaptation",
    summary: "Often appeals to people who want serious Jewish practice, inherited structure, and interpretive flexibility without abandoning tradition.",
    cautions: "Congregational practice varies, and the balance between continuity and change can feel either steadying or unresolved depending on what you need.",
    verify: [
      "How traditional is this synagogue in actual daily and weekly practice?",
      "How does the community handle disagreement around halakhah and change?",
      "Does the communal rhythm feel substantial enough for you to grow in?"
    ],
    profile: {
      authority: 2.6,
      pluralism: 2.8,
      ritual: 1.8,
      mysticism: 2.8,
      inclusion: 3.7,
      mission: 5,
      structure: 2.6,
      scripture: 2.7,
      embodiment: 1.9,
      justice: 3.7
    },
    flags: {
      womenLeadership: "affirmed",
      lgbtqAffirming: "varies",
      doubtFriendly: "affirmed",
      lowProselytizing: "affirmed"
    }
  },
  {
    id: "modern-orthodox-judaism",
    name: "Modern Orthodox Judaism",
    family: "Orthodox Jewish tradition engaged with modern life",
    summary: "Often offers strong continuity, disciplined practice, text-centered life, and serious communal belonging with varying degrees of modern engagement.",
    cautions: "If you require explicit egalitarianism or expansive theological flexibility, there may be significant tension despite meaningful internal diversity.",
    verify: [
      "How does this community balance halakhic authority with engagement in modern life?",
      "What forms of participation are actually open to women and queer people here?",
      "Does the discipline of the community feel life-giving or constraining to you?"
    ],
    profile: {
      authority: 1.6,
      pluralism: 1.8,
      ritual: 1.4,
      mysticism: 3.2,
      inclusion: 1.8,
      mission: 5,
      structure: 2.1,
      scripture: 1.5,
      embodiment: 1.2,
      justice: 3
    },
    flags: {
      womenLeadership: "unlikely",
      lgbtqAffirming: "unlikely",
      doubtFriendly: "unlikely",
      lowProselytizing: "affirmed"
    }
  },
  {
    id: "sunni-islam",
    name: "Sunni Islam",
    family: "Global Islamic tradition with wide local diversity",
    summary: "Often centers disciplined prayer, communal worship, scripture, law, and a direct integration of daily life with devotion to God.",
    cautions: "Theological, legal, and cultural expressions vary by community. If you need high doctrinal elasticity or explicit affirmation on some inclusion questions, tension may remain.",
    verify: [
      "How does this mosque balance reverence, mercy, and intellectual seriousness?",
      "What is the lived experience of women, converts, and questioners here?",
      "Does the rhythm of prayer and communal discipline fit the life you want?"
    ],
    profile: {
      authority: 1.7,
      pluralism: 1.6,
      ritual: 1.5,
      mysticism: 2.9,
      inclusion: 1.7,
      mission: 3.8,
      structure: 2.3,
      scripture: 1.4,
      embodiment: 1.2,
      justice: 3.4
    },
    flags: {
      womenLeadership: "unlikely",
      lgbtqAffirming: "unlikely",
      doubtFriendly: "varies",
      lowProselytizing: "varies"
    }
  },
  {
    id: "shia-islam",
    name: "Shia Islam",
    family: "Islamic tradition shaped by lineage, memory, and devotional depth",
    summary: "Often combines disciplined practice, reverence for sacred history, strong communal identity, and rich forms of devotion and mourning.",
    cautions: "Local practice and national background shape community life significantly. Strong authority and inherited structure may feel profound or difficult, depending on your needs.",
    verify: [
      "How does this community hold tradition and compassion together?",
      "What forms of questioning are welcomed or resisted here?",
      "Do the devotional practices connect with you or remain mostly external?"
    ],
    profile: {
      authority: 1.5,
      pluralism: 1.4,
      ritual: 1.4,
      mysticism: 2.2,
      inclusion: 1.6,
      mission: 4.1,
      structure: 1.8,
      scripture: 1.5,
      embodiment: 1.1,
      justice: 3.4
    },
    flags: {
      womenLeadership: "unlikely",
      lgbtqAffirming: "unlikely",
      doubtFriendly: "varies",
      lowProselytizing: "affirmed"
    }
  },
  {
    id: "buddhist-modern",
    name: "Buddhist (Zen / Insight / modern meditation communities)",
    family: "Broad Buddhist family emphasizing practice and awareness",
    summary: "Often draws people who want disciplined contemplative practice, compassion, and transformation without a creator-centered theological frame.",
    cautions: "Communities vary from traditional and monastic to highly modernized. If you want strong congregational belonging or explicit theistic language, the fit may be mixed.",
    verify: [
      "Is this community rooted enough to sustain you beyond self-improvement?",
      "How does it handle ethics, authority, and teacher accountability?",
      "Does the practice deepen compassion in lived community, not just in private experience?"
    ],
    profile: {
      authority: 3.7,
      pluralism: 4,
      ritual: 2.8,
      mysticism: 1.1,
      inclusion: 4,
      mission: 5,
      structure: 3.3,
      scripture: 4.2,
      embodiment: 2.2,
      justice: 3.4
    },
    flags: {
      womenLeadership: "varies",
      lgbtqAffirming: "varies",
      doubtFriendly: "affirmed",
      lowProselytizing: "affirmed"
    }
  },
  {
    id: "sikhism",
    name: "Sikhism",
    family: "Monotheistic tradition centered on devotion, justice, and shared dignity",
    summary: "Often combines disciplined devotion, scripture, service, equality, hospitality, and a strong public ethic of shared human dignity.",
    cautions: "If you are looking for loose theological boundaries or a low-commitment spiritual environment, it may feel more structured than expected. Local culture matters.",
    verify: [
      "How does this gurdwara embody equality and service in practice?",
      "What level of commitment is assumed for meaningful participation?",
      "Do the devotional practices and communal meals draw you in over time?"
    ],
    profile: {
      authority: 2.1,
      pluralism: 2.6,
      ritual: 2.1,
      mysticism: 2.3,
      inclusion: 3.6,
      mission: 4.5,
      structure: 2.4,
      scripture: 2.1,
      embodiment: 1.6,
      justice: 4.3
    },
    flags: {
      womenLeadership: "affirmed",
      lgbtqAffirming: "varies",
      doubtFriendly: "varies",
      lowProselytizing: "affirmed"
    }
  },
  {
    id: "bahai",
    name: "Bahá'í Faith",
    family: "Monotheistic tradition centered on unity and global human dignity",
    summary: "Often appeals to people seeking spiritual devotion, global unity, moral seriousness, and explicit commitments to the oneness of humanity.",
    cautions: "If you want wide theological pluralism or a low-structure view of revelation, this may feel more defined than expected despite its universal language.",
    verify: [
      "How does this community hold unity without flattening real difference?",
      "What is expected around participation, devotion, and obedience?",
      "Does the community's global vision feel concrete in local practice?"
    ],
    profile: {
      authority: 2.2,
      pluralism: 2.5,
      ritual: 3.7,
      mysticism: 2.8,
      inclusion: 2.8,
      mission: 3,
      structure: 1.8,
      scripture: 2.1,
      embodiment: 3.6,
      justice: 4.5
    },
    flags: {
      womenLeadership: "varies",
      lgbtqAffirming: "unlikely",
      doubtFriendly: "varies",
      lowProselytizing: "varies"
    }
  },
  {
    id: "hinduism",
    name: "Hinduism (broad devotional, temple, and Vedantic communities)",
    family: "Dharmic tradition with wide internal diversity",
    summary: "Often offers a wide spectrum of devotional, philosophical, ritual, and contemplative life, with strong continuity and many paths for practice and belonging.",
    cautions: "Hindu communities differ substantially by lineage, region, temple culture, caste history, and whether they are primarily devotional, philosophical, or family-centered. Generic matching only goes so far.",
    verify: [
      "Is this community welcoming to seekers who are not from Hindu family backgrounds?",
      "How central are temple practice, home ritual, and inherited custom in actual community life?",
      "Does the local community's moral and social culture fit the life you are trying to build?"
    ],
    profile: {
      authority: 2.8,
      pluralism: 2.7,
      ritual: 1.6,
      mysticism: 1.9,
      inclusion: 2.8,
      mission: 4.9,
      structure: 3.2,
      scripture: 2.9,
      embodiment: 1.4,
      justice: 3.1
    },
    flags: {
      womenLeadership: "varies",
      lgbtqAffirming: "varies",
      doubtFriendly: "varies",
      lowProselytizing: "affirmed"
    }
  },
  {
    id: "lds",
    name: "Church of Jesus Christ of Latter-day Saints",
    family: "Restorationist Christian tradition",
    summary: "Often appeals to people seeking strong communal belonging, clear spiritual authority, disciplined family life, extra-biblical scripture, and a highly organized vision of covenant life.",
    cautions: "If you need broad doctrinal openness, low hierarchy, or explicit inclusion around sexuality and gender, there may be major tension. Local congregation warmth and institutional expectations can feel very different from each other.",
    verify: [
      "How does this local ward handle questions, transition stories, and unresolved belief?",
      "Does the community's family and leadership culture feel life-giving or pressuring?",
      "Can you live with the difference between local kindness and wider institutional boundaries?"
    ],
    profile: {
      authority: 1.7,
      pluralism: 1.6,
      ritual: 3.2,
      mysticism: 4,
      inclusion: 1.7,
      mission: 1.1,
      structure: 1.3,
      scripture: 1.5,
      embodiment: 2.4,
      justice: 2.8
    },
    flags: {
      womenLeadership: "unlikely",
      lgbtqAffirming: "unlikely",
      doubtFriendly: "unlikely",
      lowProselytizing: "unlikely"
    }
  },
  {
    id: "community-of-christ",
    name: "Community of Christ",
    family: "Restorationist Christian tradition with more progressive theology",
    summary: "Often fits people drawn to the Restoration tradition who also want broader inclusion, peace witness, less doctrinal rigidity, and more room for conscience and question.",
    cautions: "Local congregations vary in how much of the tradition's past and present they emphasize. Some may feel meaningfully sacramental and rooted; others may feel more diffuse.",
    verify: [
      "How does this congregation speak about scripture, continuing revelation, and inclusion in practice?",
      "Does the community offer enough spiritual depth and structure for long-term belonging?",
      "How connected is the local congregation to the denomination's peace and justice commitments?"
    ],
    profile: {
      authority: 3.9,
      pluralism: 4.2,
      ritual: 3.2,
      mysticism: 3.6,
      inclusion: 4.7,
      mission: 4.4,
      structure: 3.7,
      scripture: 4.2,
      embodiment: 3.3,
      justice: 4.7
    },
    flags: {
      womenLeadership: "affirmed",
      lgbtqAffirming: "varies",
      doubtFriendly: "affirmed",
      lowProselytizing: "affirmed"
    }
  },
  {
    id: "wicca",
    name: "Wicca",
    family: "Modern pagan religious tradition",
    summary: "Often appeals to people seeking nature-centered spirituality, ritual practice, immanence, personal agency, seasonal rhythm, and relatively low central control.",
    cautions: "Wiccan communities differ in lineage, initiatory structure, ethics, and how open they are to eclectic practice. Some are coven-based and intimate; others are solitary or public-facing.",
    verify: [
      "Is this community's ritual life grounded and ethical rather than performative or chaotic?",
      "How does the group handle leadership, consent, and power?",
      "Do the seasonal and magical practices feel like a durable path for you or mainly an experiment?"
    ],
    profile: {
      authority: 4.7,
      pluralism: 4.8,
      ritual: 1.8,
      mysticism: 1.2,
      inclusion: 4.3,
      mission: 5,
      structure: 4.6,
      scripture: 5,
      embodiment: 1.5,
      justice: 3.9
    },
    flags: {
      womenLeadership: "affirmed",
      lgbtqAffirming: "affirmed",
      doubtFriendly: "affirmed",
      lowProselytizing: "affirmed"
    }
  },
  {
    id: "pagan",
    name: "Contemporary Pagan traditions",
    family: "Broad family including reconstructionist, devotional, and earth-centered pagan paths",
    summary: "Often fits people drawn to polytheism or earth-centered spirituality, ritual, seasonal life, personal practice, and communities with relatively low creedal pressure.",
    cautions: "This category is especially broad. Heathen, Hellenic, Druid, eclectic, and reconstructionist communities can differ substantially in theology, openness, politics, and practice.",
    verify: [
      "Is this group ethically healthy and clear about boundaries, belonging, and accountability?",
      "How historically rooted or eclectic is the practice, and does that matter to you?",
      "Does the local community feel spiritually serious enough for the life you want?"
    ],
    profile: {
      authority: 4.6,
      pluralism: 4.7,
      ritual: 1.9,
      mysticism: 1.7,
      inclusion: 4.1,
      mission: 5,
      structure: 4.4,
      scripture: 5,
      embodiment: 1.6,
      justice: 3.8
    },
    flags: {
      womenLeadership: "affirmed",
      lgbtqAffirming: "varies",
      doubtFriendly: "affirmed",
      lowProselytizing: "affirmed"
    }
  },
  {
    id: "atheist-humanist",
    name: "Atheist / Secular Humanist",
    family: "Religiously unaffiliated, explicitly non-theistic",
    summary: "Often fits people who want moral seriousness, intellectual honesty, community or ethics without supernatural claims, and a strong emphasis on human flourishing and evidence-based reasoning.",
    cautions: "If you are looking for prayer, worship, transcendence, or ritual depth, many secular communities may not meet that need. Some also feel more like shared values circles than thick communities.",
    verify: [
      "Does this community offer real belonging and moral formation, not only critique of religion?",
      "Is there enough existential depth here for grief, wonder, and meaning?",
      "Does the community's social and intellectual tone actually fit your life, not just your objections to religion?"
    ],
    profile: {
      authority: 5,
      pluralism: 4.6,
      ritual: 5,
      mysticism: 4.8,
      inclusion: 4.6,
      mission: 4.7,
      structure: 4.5,
      scripture: 5,
      embodiment: 4.8,
      justice: 4.5
    },
    flags: {
      womenLeadership: "affirmed",
      lgbtqAffirming: "affirmed",
      doubtFriendly: "affirmed",
      lowProselytizing: "affirmed"
    }
  },
  {
    id: "agnostic-unaffiliated",
    name: "Agnostic or spiritually open unaffiliated",
    family: "Religiously unaffiliated, open to meaning without fixed institutional commitment",
    summary: "Often fits people who are not ready to re-enter a religious institution but still want room for moral reflection, wonder, community, and spiritual exploration without fixed doctrinal claims.",
    cautions: "This path can preserve freedom but also leave people under-rooted. It may be more a staging ground or durable posture than a thick tradition with inherited practices.",
    verify: [
      "Are you choosing this because it genuinely fits, or because you are still healing from a more controlling environment?",
      "What practices or communities would keep this path from becoming only private drift?",
      "Do you want openness for a season, or as a long-term foundation?"
    ],
    profile: {
      authority: 4.9,
      pluralism: 5,
      ritual: 4.7,
      mysticism: 3.2,
      inclusion: 4.8,
      mission: 4.8,
      structure: 4.7,
      scripture: 5,
      embodiment: 4.6,
      justice: 4.3
    },
    flags: {
      womenLeadership: "affirmed",
      lgbtqAffirming: "affirmed",
      doubtFriendly: "affirmed",
      lowProselytizing: "affirmed"
    }
  }
];

const traditionProfileOverrides = {
  quaker: { publicExpression: 1.8, connectionSetting: 1.9, transformation: 2.3, discipline: 3.6 },
  "unitarian-universalist": { publicExpression: 2.5, connectionSetting: 3.1, transformation: 3.6, discipline: 4.8 },
  "mainline-protestant": { publicExpression: 3.1, connectionSetting: 3.9, transformation: 2.2, discipline: 4.1 },
  "anglican-episcopal": { publicExpression: 2.8, connectionSetting: 4.8, transformation: 1.9, discipline: 3.1 },
  "roman-catholic": { publicExpression: 2.7, connectionSetting: 4.9, transformation: 1.5, discipline: 2.3 },
  "eastern-orthodox": { publicExpression: 2.4, connectionSetting: 4.9, transformation: 1.7, discipline: 1.7 },
  "evangelical-protestant": { publicExpression: 4.1, connectionSetting: 4.2, transformation: 1.2, discipline: 2.4 },
  "reform-judaism": { publicExpression: 2.9, connectionSetting: 4.1, transformation: 2, discipline: 3.9 },
  "conservative-judaism": { publicExpression: 3, connectionSetting: 4.2, transformation: 2, discipline: 2.7 },
  "modern-orthodox-judaism": { publicExpression: 3.2, connectionSetting: 4.4, transformation: 1.9, discipline: 1.4 },
  "sunni-islam": { publicExpression: 3.1, connectionSetting: 4.6, transformation: 1.8, discipline: 1.6 },
  "shia-islam": { publicExpression: 3, connectionSetting: 4.6, transformation: 1.9, discipline: 1.5 },
  "buddhist-modern": { publicExpression: 2.1, connectionSetting: 1.8, transformation: 4.5, discipline: 2.7 },
  sikhism: { publicExpression: 3.2, connectionSetting: 4, transformation: 1.8, discipline: 2.2 },
  bahai: { publicExpression: 2.9, connectionSetting: 4, transformation: 1.8, discipline: 2.6 },
  hinduism: { publicExpression: 3, connectionSetting: 2.8, transformation: 2.9, discipline: 2.3 },
  lds: { publicExpression: 4, connectionSetting: 4.4, transformation: 2.7, discipline: 1.5 },
  "community-of-christ": { publicExpression: 3.2, connectionSetting: 4.2, transformation: 2.3, discipline: 3.4 },
  wicca: { publicExpression: 3.1, connectionSetting: 1.7, transformation: 3.8, discipline: 3.4 },
  pagan: { publicExpression: 3.3, connectionSetting: 1.8, transformation: 3.4, discipline: 3.2 },
  "atheist-humanist": { publicExpression: 2.2, connectionSetting: 2.5, transformation: 4.8, discipline: 4.8 },
  "agnostic-unaffiliated": { publicExpression: 2.4, connectionSetting: 2.7, transformation: 4, discipline: 4.7 }
};

const additionalTraditions = [
  {
    id: "lutheran",
    name: "Lutheran",
    family: "Protestant tradition often balancing liturgy, grace, and scripture",
    summary: "Often appeals to people who want sacramental or liturgical depth without Roman Catholic hierarchy, with strong emphasis on grace and preaching.",
    cautions: "Lutheran bodies vary sharply, especially between more progressive and more confessional branches. Local church tone matters.",
    verify: [
      "Is this congregation closer to mainline Lutheranism or a more confessional branch?",
      "How central are grace, sacrament, and preaching in actual practice?",
      "Does the local church's culture feel spacious enough for you?"
    ],
    profile: { authority: 2.8, pluralism: 3.2, ritual: 2.2, mysticism: 3.2, inclusion: 3.5, mission: 3.8, structure: 2.9, scripture: 2.7, embodiment: 2.4, justice: 3.8, publicExpression: 2.8, connectionSetting: 4.2, transformation: 1.6, discipline: 3.7 },
    flags: { womenLeadership: "varies", lgbtqAffirming: "varies", doubtFriendly: "varies", lowProselytizing: "affirmed" }
  },
  {
    id: "presbyterian",
    name: "Presbyterian",
    family: "Reformed Protestant tradition with elder-led polity",
    summary: "Often fits people who want intellectually serious preaching, moderate order, covenant theology, and church governance through elders rather than bishops.",
    cautions: "Presbyterian bodies vary widely. A PCUSA congregation may feel very different from a PCA one on inclusion, doctrine, and culture.",
    verify: [
      "Which Presbyterian body is this congregation part of, and how much does that matter locally?",
      "Does the church's theological and moral clarity feel grounding or confining?",
      "Is its governance participatory in a healthy way?"
    ],
    profile: { authority: 2.4, pluralism: 3.1, ritual: 3.1, mysticism: 3.9, inclusion: 3.2, mission: 3.6, structure: 2.6, scripture: 2.1, embodiment: 3.2, justice: 3.7, publicExpression: 2.8, connectionSetting: 4.1, transformation: 1.9, discipline: 3.2 },
    flags: { womenLeadership: "varies", lgbtqAffirming: "varies", doubtFriendly: "varies", lowProselytizing: "affirmed" }
  },
  {
    id: "methodist",
    name: "Methodist",
    family: "Wesleyan Protestant tradition shaped by grace, discipleship, and practical holiness",
    summary: "Often balances structured worship, preaching, personal transformation, and a practical concern for how faith shapes daily life and public service.",
    cautions: "Congregations and denominational branches differ, especially on sexuality, inclusion, and how strongly they retain Wesleyan discipline.",
    verify: [
      "How much of the church's Wesleyan identity is actually alive in practice?",
      "Is this congregation more service-oriented, revival-oriented, or liturgically moderate?",
      "How does the local church handle disagreement and change?"
    ],
    profile: { authority: 3.1, pluralism: 3.5, ritual: 2.9, mysticism: 3.4, inclusion: 3.7, mission: 3.8, structure: 3.1, scripture: 2.8, embodiment: 3.2, justice: 4.1, publicExpression: 3.2, connectionSetting: 4, transformation: 1.8, discipline: 3.1 },
    flags: { womenLeadership: "affirmed", lgbtqAffirming: "varies", doubtFriendly: "affirmed", lowProselytizing: "affirmed" }
  },
  {
    id: "baptist",
    name: "Baptist",
    family: "Free-church Protestant tradition centered on believer's baptism and congregational life",
    summary: "Often appeals to people who value scripture, preaching, local church autonomy, conversion language, and relatively simple worship without heavy hierarchy.",
    cautions: "Baptist churches range from progressive and community-centered to highly conservative and certainty-driven. The label alone does not settle the culture.",
    verify: [
      "Is this church's Baptist identity closer to revivalist evangelicalism, moderate congregationalism, or something else?",
      "How does the congregation treat doubt, gender, and moral disagreement?",
      "Does its simplicity feel spiritually clean or emotionally narrow?"
    ],
    profile: { authority: 2.1, pluralism: 2.3, ritual: 4.2, mysticism: 4.2, inclusion: 2.3, mission: 1.9, structure: 4.2, scripture: 1.4, embodiment: 3.8, justice: 3, publicExpression: 3.4, connectionSetting: 4.2, transformation: 1.4, discipline: 2.7 },
    flags: { womenLeadership: "varies", lgbtqAffirming: "unlikely", doubtFriendly: "varies", lowProselytizing: "unlikely" }
  },
  {
    id: "pentecostal",
    name: "Pentecostal",
    family: "Charismatic Christian tradition centered on Spirit-filled worship and visible gifts",
    summary: "Often fits people seeking emotionally expressive worship, strong prayer, visible spiritual gifts, healing, testimony, and direct divine presence.",
    cautions: "Some Pentecostal communities are deeply life-giving; others may feel pressuring, anti-intellectual, or heavily normed around spiritual performance.",
    verify: [
      "How does this church handle discernment, emotional intensity, and claimed spiritual gifts?",
      "Does the visible spirituality feel authentic and grounding or performative and pressuring?",
      "How safe is the church for doubt, difference, and slow growth?"
    ],
    profile: { authority: 1.9, pluralism: 1.7, ritual: 4.5, mysticism: 2.7, inclusion: 2.1, mission: 1.4, structure: 3.3, scripture: 1.3, embodiment: 2.6, justice: 2.8, publicExpression: 4.9, connectionSetting: 4.7, transformation: 1.3, discipline: 2.2 },
    flags: { womenLeadership: "varies", lgbtqAffirming: "unlikely", doubtFriendly: "unlikely", lowProselytizing: "unlikely" }
  },
  {
    id: "assemblies-of-god",
    name: "Assemblies of God",
    family: "Pentecostal evangelical denomination",
    summary: "Often combines Pentecostal worship, evangelistic energy, strong biblical authority, and clearer denominational identity than some independent charismatic churches.",
    cautions: "Local culture matters, but many Assemblies of God churches maintain stronger doctrinal and moral boundaries than a generic charismatic label suggests.",
    verify: [
      "How strongly does this church enforce denominational norms around gender, sexuality, and spiritual experience?",
      "Does its worship culture feel enlivening or demanding?",
      "How much room is there for intellectual and emotional complexity?"
    ],
    profile: { authority: 1.8, pluralism: 1.5, ritual: 4.6, mysticism: 2.5, inclusion: 1.9, mission: 1.2, structure: 2.6, scripture: 1.2, embodiment: 2.7, justice: 2.6, publicExpression: 5, connectionSetting: 4.8, transformation: 1.2, discipline: 2.1 },
    flags: { womenLeadership: "varies", lgbtqAffirming: "unlikely", doubtFriendly: "unlikely", lowProselytizing: "unlikely" }
  },
  {
    id: "seventh-day-adventist",
    name: "Seventh-day Adventist",
    family: "Restorationist Protestant tradition emphasizing Sabbath, health, and biblical expectation",
    summary: "Often appeals to people who want scripture-centered faith, disciplined lifestyle, Sabbath observance, health practices, and a strong sense that belief shapes daily habits.",
    cautions: "Depending on local culture, the tradition can feel grounded and intentional or highly regulated and identity-heavy. The experience of questioning varies.",
    verify: [
      "How central are Sabbath, diet, and end-times frameworks in the actual life of this congregation?",
      "Does the church's discipline feel clarifying or constricting?",
      "How are uncertainty and transition handled?"
    ],
    profile: { authority: 1.8, pluralism: 1.9, ritual: 3.7, mysticism: 3.8, inclusion: 2.2, mission: 1.8, structure: 3.2, scripture: 1.3, embodiment: 2.3, justice: 3.1, publicExpression: 3.6, connectionSetting: 4.3, transformation: 1.5, discipline: 1.2 },
    flags: { womenLeadership: "varies", lgbtqAffirming: "unlikely", doubtFriendly: "varies", lowProselytizing: "varies" }
  },
  {
    id: "scientology",
    name: "Scientology",
    family: "New religious movement centered on auditing, spiritual technology, and self-development",
    summary: "Often appeals to people seeking a structured path of personal advancement, specialized spiritual methods, and a strong self-improvement framework rather than classical worship or sacramental life.",
    cautions: "This tradition differs sharply from the theistic and liturgical traditions around it. Local engagement should be approached with substantial caution and independent research.",
    verify: [
      "Are you drawn to a relationship with Deity, or to a system of self-development and spiritual technology?",
      "How transparent are expectations around money, advancement, and authority?",
      "Does the local organization allow informed consent and critical questioning?"
    ],
    profile: { authority: 1.6, pluralism: 1.8, ritual: 3.8, mysticism: 4.4, inclusion: 2.7, mission: 1.5, structure: 1.4, scripture: 3.7, embodiment: 2.8, justice: 3.1, publicExpression: 4.1, connectionSetting: 3.6, transformation: 5, discipline: 1.9 },
    flags: { womenLeadership: "varies", lgbtqAffirming: "varies", doubtFriendly: "unlikely", lowProselytizing: "unlikely" }
  }
];

const traditions = baseTraditions
  .concat(additionalTraditions)
  .map((tradition) => ({
    ...tradition,
    profile: {
      publicExpression: 3,
      connectionSetting: 3.5,
      transformation: 2.5,
      discipline: 3,
      ...tradition.profile,
      ...(traditionProfileOverrides[tradition.id] || {})
    }
  }));

const questionContainer = document.getElementById("questions");
const filterContainer = document.getElementById("filters");
const form = document.getElementById("assessment-form");
const resultsPanel = document.getElementById("results-panel");
const resultsContainer = document.getElementById("results");
const filterSummary = document.getElementById("filter-summary");
const reflectionSummary = document.getElementById("reflection-summary");
const reflectionInput = document.getElementById("reflection-notes");
const resetButton = document.getElementById("reset-form");
const presetContainer = document.getElementById("presets");
const presetFeedback = document.getElementById("preset-feedback");
const coverageContainer = document.getElementById("coverage-grid");
const coverageNote = document.getElementById("coverage-note");
const shareForm = document.getElementById("share-form");
const shareConsent = document.getElementById("share-consent");
const shareSubmit = document.getElementById("share-submit");
const shareStatus = document.getElementById("share-status");
const shareFields = Array.from(shareForm.querySelectorAll("input[type='text'], input[type='number']"));

let latestRun = null;

renderQuestions();
renderFilters();
renderPresets();
renderCoverage();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const answers = collectAnswers();
  if (!answers) {
    return;
  }

  const activeFilters = collectFilters();
  const results = scoreTraditions(answers, activeFilters);
  latestRun = buildLatestRun(answers, activeFilters, reflectionInput.value.trim(), results);
  renderResults(results, activeFilters, reflectionInput.value.trim());
  resetShareFormState();
  resultsPanel.hidden = false;
  resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

resetButton.addEventListener("click", () => {
  form.reset();
  resultsPanel.hidden = true;
  resultsContainer.innerHTML = "";
  presetFeedback.textContent = "No preset loaded.";
  latestRun = null;
  resetShareFormState();
});

presetContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-preset-id]");
  if (!button) {
    return;
  }

  const preset = presets.find((item) => item.id === button.dataset.presetId);
  if (!preset) {
    return;
  }

  applyPreset(preset);
});

shareConsent.addEventListener("change", () => {
  toggleShareFields(shareConsent.checked);
  setShareStatus(shareConsent.checked ? "Complete the optional fields and submit to save this result set." : "Opt in to enable sharing.", shareConsent.checked ? "neutral" : "neutral");
});

shareForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!latestRun) {
    setShareStatus("Run an assessment before sharing results.", "error");
    return;
  }

  if (!shareConsent.checked) {
    setShareStatus("Check the consent box before sharing results.", "error");
    return;
  }

  const demographics = collectShareDemographics();
  if (!demographics) {
    return;
  }

  try {
    const response = await fetch("/api/share-results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        consented: true,
        demographics,
        assessment: latestRun
      })
    });

    if (!response.ok) {
      throw new Error("Share request failed");
    }

    const payload = await response.json();
    setShareStatus(`Saved to ${payload.filePath}. Your anonymized result set was appended as a new line.`, "success");
  } catch (error) {
    const isFileMode = window.location.protocol === "file:";
    setShareStatus(
      isFileMode
        ? "Sharing needs the local server. Open the app through http://127.0.0.1:4173 and try again."
        : "The share request did not complete. Confirm the local server is running and try again.",
      "error"
    );
  }
});

function renderQuestions() {
  questionContainer.innerHTML = questions.map((question, index) => {
    const choices = [1, 2, 3, 4, 5].map((value) => `
      <label class="choice-pill">
        <input type="radio" name="${question.id}" value="${value}">
        <span>${value}</span>
      </label>
    `).join("");

    return `
      <fieldset class="question-card">
        <div class="question-top">
          <legend>
            <span class="question-number">Question ${index + 1}</span>
            <h3>${question.prompt}</h3>
          </legend>
        </div>
        <p class="question-help">${question.help}</p>
        <div class="scale-grid">
          <div class="scale-label">${question.leftLabel}</div>
          ${choices}
          <div class="scale-label right">${question.rightLabel}</div>
        </div>
      </fieldset>
    `;
  }).join("");
}

function renderFilters() {
  filterContainer.innerHTML = filters.map((filter) => `
    <label class="filter-card">
      <input type="checkbox" name="${filter.id}">
      <span>
        <strong>${filter.title}</strong>
        <br>
        ${filter.description}
      </span>
    </label>
  `).join("");
}

function renderPresets() {
  presetContainer.innerHTML = presets.map((preset) => `
    <button class="preset-button" type="button" data-preset-id="${preset.id}" aria-label="Load preset: ${preset.title}">
      <strong>${preset.title}</strong>
      <span>${preset.description}</span>
    </button>
  `).join("");
}

function renderCoverage() {
  coverageContainer.innerHTML = coverageGroups.map((group) => `
    <article class="coverage-card">
      <h3>${group.label}</h3>
      <p>${group.description}</p>
      <ul class="coverage-list">
        ${group.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </article>
  `).join("");

  coverageNote.textContent = coverageNoteText;
}

function applyPreset(preset) {
  form.reset();

  for (const question of questions) {
    const answer = preset.answers[question.id];
    const input = form.querySelector(`input[name="${question.id}"][value="${answer}"]`);
    if (input) {
      input.checked = true;
    }
  }

  for (const filter of filters) {
    form.elements[filter.id].checked = preset.activeFilters.includes(filter.id);
  }

  reflectionInput.value = preset.reflection;
  presetFeedback.textContent = `${preset.title} loaded. Review the answers, then submit or adjust them.`;
  resultsPanel.hidden = true;
  resultsContainer.innerHTML = "";
  latestRun = null;
  resetShareFormState();
}

function resetShareFormState() {
  shareForm.reset();
  toggleShareFields(false);
  setShareStatus("Opt in to enable sharing.", "neutral");
}

function toggleShareFields(enabled) {
  for (const field of shareFields) {
    field.disabled = !enabled;
  }

  shareSubmit.disabled = !enabled;
}

function setShareStatus(message, state) {
  shareStatus.textContent = message;

  if (state === "success" || state === "error") {
    shareStatus.dataset.state = state;
    return;
  }

  delete shareStatus.dataset.state;
}

function collectShareDemographics() {
  const demographics = {
    recentReligion: shareForm.elements.recentReligion.value.trim(),
    gender: shareForm.elements.gender.value.trim(),
    age: shareForm.elements.age.value.trim(),
    race: shareForm.elements.race.value.trim(),
    city: shareForm.elements.city.value.trim(),
    stateProvince: shareForm.elements.stateProvince.value.trim(),
    country: shareForm.elements.country.value.trim()
  };

  const missingField = Object.entries(demographics).find(([, value]) => !value);
  if (missingField) {
    setShareStatus("Complete every optional-share field before submitting.", "error");
    return null;
  }

  return {
    ...demographics,
    age: Number(demographics.age)
  };
}

function buildLatestRun(answers, activeFilters, reflection, results) {
  return {
    generatedAt: new Date().toISOString(),
    answers,
    activeFilters,
    reflection,
    results: results.map((result) => ({
      id: result.id,
      name: result.name,
      family: result.family,
      score: result.score,
      summary: result.summary,
      cautions: result.cautions,
      whyItFits: result.whyItFits,
      tensions: result.tensions,
      filterNotes: result.filterNotes,
      verify: result.verify
    }))
  };
}

function collectAnswers() {
  const answers = {};

  for (const question of questions) {
    const selected = form.elements[question.id].value;
    if (!selected) {
      window.alert("Please answer every question before viewing results.");
      return null;
    }

    answers[question.id] = Number(selected);
  }

  return answers;
}

function collectFilters() {
  return filters
    .filter((filter) => form.elements[filter.id].checked)
    .map((filter) => filter.id);
}

function scoreTraditions(answers, activeFilters) {
  return traditions
    .map((tradition) => {
      const breakdown = questions.map((question) => {
        const answer = answers[question.id];
        const target = tradition.profile[question.id];
        const distance = Math.abs(answer - target);
        const similarity = 1 - distance / 4;

        return {
          question,
          answer,
          target,
          distance,
          similarity
        };
      });

      const rawScore = breakdown.reduce((sum, item) => sum + item.similarity, 0) / breakdown.length;
      const whyItFits = breakdown
        .slice()
        .sort((left, right) => right.similarity - left.similarity)
        .slice(0, 3)
        .map((item) => explainFit(item));

      const tensions = breakdown
        .slice()
        .sort((left, right) => right.distance - left.distance)
        .slice(0, 2)
        .filter((item) => item.distance >= 1.5)
        .map((item) => explainTension(item));

      const filterNotes = activeFilters
        .map((filterId) => ({ filterId, status: tradition.flags[filterId] }))
        .filter((entry) => entry.status && entry.status !== "affirmed")
        .map((entry) => `${labelForFilter(entry.filterId)}: ${flagLabel(entry.status)}`);

      const excluded = activeFilters.some((filterId) => tradition.flags[filterId] === "unlikely");

      return {
        ...tradition,
        score: Math.round(rawScore * 100),
        whyItFits,
        tensions,
        filterNotes,
        excluded
      };
    })
    .filter((tradition) => !tradition.excluded)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);
}

function explainFit(item) {
  const direction = item.answer >= 3 ? item.question.shortRight : item.question.shortLeft;
  return `${direction} is close to this tradition's broad pattern.`;
}

function explainTension(item) {
  const userDirection = item.answer >= 3 ? item.question.shortRight : item.question.shortLeft;
  const traditionDirection = item.target >= 3 ? item.question.shortRight : item.question.shortLeft;
  return `You leaned toward ${userDirection}, while this tradition tends closer to ${traditionDirection}.`;
}

function labelForFilter(filterId) {
  const filter = filters.find((item) => item.id === filterId);
  return filter ? filter.title : filterId;
}

function flagLabel(value) {
  if (value === "varies") {
    return "local variation matters";
  }

  if (value === "unlikely") {
    return "broadly unlikely";
  }

  return value;
}

function renderResults(results, activeFilters, reflection) {
  const filterLines = activeFilters.length
    ? activeFilters.map((filterId) => `<li>${labelForFilter(filterId)}</li>`).join("")
    : "<p>No filters selected.</p>";

  filterSummary.innerHTML = `
    <h3>Active filters</h3>
    ${activeFilters.length ? `<ul class="verify-list">${filterLines}</ul>` : filterLines}
  `;

  reflectionSummary.innerHTML = `
    <h3>Your reflection</h3>
    <p>${reflection || "Add a note above if you want your own story visible beside the results."}</p>
  `;

  if (!results.length) {
    resultsContainer.innerHTML = `
      <article class="empty-state">
        <h3>No traditions remained after your filters.</h3>
        <p>Try relaxing one non-negotiable at a time. That can help you distinguish between what must be present and what can be explored cautiously in local variation.</p>
      </article>
    `;
    return;
  }

  resultsContainer.innerHTML = results.map((tradition, index) => `
    <article class="result-card">
      <div class="result-top">
        <div>
          <p class="eyebrow">Match ${index + 1}</p>
          <h3>${tradition.name}</h3>
          <p><strong>${tradition.family}</strong></p>
        </div>
        <div class="result-score">${tradition.score}% fit</div>
      </div>
      <div class="result-body">
        <p>${tradition.summary}</p>
        <p><strong>Important context:</strong> ${tradition.cautions}</p>
        <ul class="dimension-list">
          ${tradition.whyItFits.map((line) => `<li class="good"><strong>Why it fit:</strong> ${line}</li>`).join("")}
          ${tradition.tensions.length ? tradition.tensions.map((line) => `<li class="caution"><strong>Tension:</strong> ${line}</li>`).join("") : ""}
        </ul>
        ${tradition.filterNotes.length ? `<ul class="tag-row">${tradition.filterNotes.map((line) => `<li class="tag"><strong>Filter note:</strong> ${line}</li>`).join("")}</ul>` : ""}
        <ul class="verify-list">
          ${tradition.verify.map((line) => `<li>${line}</li>`).join("")}
        </ul>
      </div>
    </article>
  `).join("");
}