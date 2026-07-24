document.documentElement.classList.add('js-enabled');

const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');
const revealTargets = document.querySelectorAll('.reveal');
const draggableTargets = document.querySelectorAll('[data-draggable]');
const scrollTopLinks = document.querySelectorAll('[data-scroll-top]');
const scheduleStatusTitle = document.querySelector('#schedule-status-title');
const scheduleStatusMeta = document.querySelector('#schedule-status-meta');
const scheduleStatusBadge = document.querySelector('#schedule-status-badge');
const scheduleCells = document.querySelectorAll('[data-schedule-cell]');
const signatureHandwrite = document.querySelector('.signature-handwrite');
const newsItems = document.querySelectorAll('[data-news-item]');
const newsDetailTitle = document.querySelector('#news-detail-title');
const newsDetailBody = document.querySelector('#news-detail-body');
const staffTriggers = document.querySelectorAll('[data-staff-trigger]');
const staffModal = document.querySelector('#staff-modal');
const staffModalImage = document.querySelector('#staff-modal-image');
const staffModalTitle = document.querySelector('#staff-modal-title');
const staffModalHistory = document.querySelector('#staff-modal-history');
const staffModalSpecialty = document.querySelector('#staff-modal-specialty');
const staffModalComment = document.querySelector('#staff-modal-comment');
const staffModalCloseTargets = document.querySelectorAll('[data-staff-close]');
const newsHomeFeature = document.querySelector('[data-news-home-feature]');
const newsHomeFeatureTitle = document.querySelector('[data-news-feature-title]');
const newsHomeFeaturePublished = document.querySelector('[data-news-feature-published]');
const newsHomeList = document.querySelector('[data-news-home-list]');
const newsArchiveList = document.querySelector('[data-news-archive-list]');
const newsArchivePagination = document.querySelector('[data-news-archive-pagination]');
const newsDetailPage = document.querySelector('[data-news-detail-page]');
const newsDetailPublished = document.querySelector('[data-news-published]');
const newsDetailUpdated = document.querySelector('[data-news-updated]');
const newsDetailTitleElement = document.querySelector('[data-news-title]');
const newsDetailBodyElement = document.querySelector('[data-news-body]');
const newsDetailPrev = document.querySelector('[data-news-prev]');
const newsDetailPrevTitle = document.querySelector('[data-news-prev-title]');
const newsDetailNext = document.querySelector('[data-news-next]');
const newsDetailNextTitle = document.querySelector('[data-news-next-title]');
const newsLatestList = document.querySelector('[data-news-latest-list]');
const faqQuestions = document.querySelectorAll('.faq-item__question');
const contactTypeButtons = document.querySelectorAll('[data-contact-type]');
const contactTypeSelect = document.querySelector('#contact-type-select');
const inquiryForm = document.querySelector('#inquiry');
const inquiryFormNotice = document.querySelector('#inquiry-form-notice');
const inquirySubmitButton = document.querySelector('.inquiry-form__submit');
const pageTopButton = document.querySelector('.page-top-button');
let activeStaffTrigger = null;
const routeMapTrigger = document.querySelector('[data-route-map-trigger]');
const routeMapModal = document.querySelector('#route-map-modal');
const routeMapModalCloseTargets = document.querySelectorAll('[data-route-map-close]');
const routeMapModalImage = document.querySelector('#route-map-modal-image');
const routeMapZoomInButton = document.querySelector('[data-route-map-zoom-in]');
const routeMapZoomOutButton = document.querySelector('[data-route-map-zoom-out]');
const routeMapZoomResetButton = document.querySelector('[data-route-map-zoom-reset]');
let isRouteMapModalOpen = false;
let routeMapZoomLevel = 1;
const ROUTE_MAP_ZOOM_MIN = 0.85;
const ROUTE_MAP_ZOOM_MAX = 1.8;
const ROUTE_MAP_ZOOM_STEP = 0.15;

const LANGUAGE_STORAGE_KEY = 'sato-clinic-language';
const LANGUAGE_OPTIONS = [
  { key: 'ja', label: '日本語', htmlLang: 'ja', imageSuffix: '', ariaLabel: '日本語に切り替え' },
  { key: 'en', label: 'ENGLISH', htmlLang: 'en', imageSuffix: '_en', ariaLabel: '英語に切り替え' },
  { key: 'zh-tw', label: '繁體字', htmlLang: 'zh-Hant', imageSuffix: '_zh-tw', ariaLabel: '中文繁體字に切り替え' },
  { key: 'zh-cn', label: '简体字', htmlLang: 'zh-Hans', imageSuffix: '_zh-cn', ariaLabel: '中文簡体字に切り替え' },
  { key: 'ko', label: '한국어', htmlLang: 'ko', imageSuffix: '_ko', ariaLabel: '韓国語に切り替え' },
];
const LANGUAGE_DEFAULT = 'ja';
const LOCALIZED_PAGE_IMAGE_KEYS = {
  about: 'about',
  access: 'access',
  news: 'news',
  'news-detail': 'news',
  medical: 'medical',
  faq: 'faq',
  contact: 'contact',
  'first-visit': 'first-visit',
};
const LOCALIZED_IMAGE_SOURCES = {
  about: {
    ja: './assets/images/about_logo.png',
    en: './assets/images/about_en.png',
    'zh-tw': './assets/images/about_zh-tw.png',
    'zh-cn': './assets/images/about_zh-cn.png',
    ko: './assets/images/about_ko.png',
  },
  access: {
    ja: './assets/images/access_logo.png',
    en: './assets/images/access_en.png',
    'zh-tw': './assets/images/access_zh-tw.png',
    'zh-cn': './assets/images/access_zh-cn.png',
    ko: './assets/images/access_ko.png',
  },
  news: {
    ja: './assets/images/news_logo.png',
    en: './assets/images/news_en.png',
    'zh-tw': './assets/images/news_zh-tw.png',
    'zh-cn': './assets/images/news_zh-cn.png',
    ko: './assets/images/news_ko.png',
  },
  medical: {
    ja: './assets/images/medical_logo.png',
    en: './assets/images/medical_en.png',
    'zh-tw': './assets/images/medical_zh-tw.png',
    'zh-cn': './assets/images/medical_zh-cn.png',
    ko: './assets/images/medical_ko.png',
  },
  faq: {
    ja: './assets/images/faq_logo.png',
    en: './assets/images/faq_en.png',
    'zh-tw': './assets/images/faq_zh-tw.png',
    'zh-cn': './assets/images/faq_zh-cn.png',
    ko: './assets/images/faq_ko.png',
  },
  contact: {
    ja: './assets/images/contact_logo.png',
    en: './assets/images/contact_en.png',
    'zh-tw': './assets/images/contact_zh-tw.png',
    'zh-cn': './assets/images/contact_zh-cn.png',
    ko: './assets/images/contact_ko.png',
  },
  'first-visit': {
    ja: './assets/images/first-visit_logo.png',
    en: './assets/images/first-visit_logo_en.png',
    'zh-tw': './assets/images/first-visit_logo_zh-tw.png',
    'zh-cn': './assets/images/first-visit_logo_zh-cn.png',
    ko: './assets/images/first-visit_logo_ko.png',
  },
};

const COMMON_TEXT_TRANSLATIONS = {
  ja: {
    nav: ['トップ', '診療時間・所在地', 'お知らせ', '診療内容', '当院について', 'よくあるご質問', '予約・お問い合わせ'],
    menuLabel: 'メニューを開く',
    pageTopLabel: 'ページ上部へ戻る',
    footerBrandLabel: 'トップへ戻る',
    footerSections: ['初めての方へ', '診療時間・所在地', 'お知らせ', '診療内容', '当院について', 'よくあるご質問', '予約・お問い合わせ'],
    footerFirstVisit: ['受診の流れ', 'ご持参いただくもの', 'ご予約について', 'ご来院にあたってのお願い'],
    footerAccess: ['診療時間', '診療科目', '所在地', 'お問い合わせ'],
    footerMedical: ['一般内科診療', '生活習慣病の診断・治療', '消化器系の診療', '呼吸器系の診療', '健康診断・各種検査', '予防接種', '禁煙外来'],
    footerAbout: ['診療方針', '地域に根ざした医療', 'ご家族全員をサポート', '医療設備とチーム医療', '医院の理念・方針', '患者様とともに歩む未来', 'スタッフ紹介'],
    footerFaq: ['診療について', '予防接種・健康診断について', 'お支払いについて', 'その他'],
    footerContact: ['予約', 'お問い合わせ', 'ご案内'],
    footerAddress: '〒123-4567　東京都台東区上野0-0-0',
    footerPhone: '電話：00-0000-0000',
    footerMail: 'メール：info@sato-clinic-test.jp',
    footerStation: '最寄り駅：JR上野駅より徒歩5分',
    footerParking: '駐車場：当院専用の無料駐車場 10台分あり',
    footerCopy: '© 佐藤医院',
  },
  en: {
    nav: ['Top', 'Hours / Location', 'News', 'Services', 'About Us', 'FAQ', 'Reservations / Contact'],
    menuLabel: 'Open menu',
    pageTopLabel: 'Back to top',
    footerBrandLabel: 'Back to top',
    footerSections: ['First Visit', 'Hours / Location', 'News', 'Services', 'About Us', 'FAQ', 'Reservations / Contact'],
    footerFirstVisit: ['Visit flow', 'What to bring', 'About reservations', 'Requests for visitors'],
    footerAccess: ['Hours', 'Departments', 'Location', 'Contact'],
    footerMedical: ['General internal medicine', 'Lifestyle disease care', 'Digestive care', 'Respiratory care', 'Checkups / tests', 'Vaccinations', 'Smoking cessation clinic'],
    footerAbout: ['Care policy', 'Community-based care', 'Support for the whole family', 'Equipment and team care', 'Clinic philosophy', 'Future with our patients', 'Staff'],
    footerFaq: ['About treatment', 'Vaccinations / checkups', 'Payments', 'Other'],
    footerContact: ['Reservations', 'Contact', 'Guidance'],
    footerAddress: '123-4567, Ueno, Taito-ku, Tokyo',
    footerPhone: 'Phone: 00-0000-0000',
    footerMail: 'Email: info@sato-clinic-test.jp',
    footerStation: 'Nearest station: 5 minutes on foot from JR Ueno Station',
    footerParking: 'Parking: 10 free spaces available exclusively for our clinic',
    footerCopy: '© Sato Clinic',
  },
  'zh-tw': {
    nav: ['首頁', '診療時間・地點', '最新消息', '診療內容', '關於本院', '常見問題', '預約・聯絡我們'],
    menuLabel: '開啟選單',
    pageTopLabel: '回到頁首',
    footerBrandLabel: '回到頁首',
    footerSections: ['初診指南', '診療時間・地點', '最新消息', '診療內容', '關於本院', '常見問題', '預約・聯絡我們'],
    footerFirstVisit: ['就診流程', '攜帶物品', '預約說明', '就診注意事項'],
    footerAccess: ['診療時間', '診療科目', '地點', '聯絡我們'],
    footerMedical: ['一般內科診療', '生活習慣病診斷・治療', '消化系診療', '呼吸系診療', '健康檢查・各項檢驗', '預防接種', '戒菸門診'],
    footerAbout: ['診療方針', '深耕社區的醫療', '守護全家人的健康', '醫療設備與團隊醫療', '本院理念・方針', '與患者一同前行的未來', '員工介紹'],
    footerFaq: ['關於診療', '預防接種・健康檢查', '付款方式', '其他'],
    footerContact: ['預約', '聯絡我們', '說明'],
    footerAddress: '〒123-4567　東京都台東區上野0-0-0',
    footerPhone: '電話：00-0000-0000',
    footerMail: '電子郵件：info@sato-clinic-test.jp',
    footerStation: '最近車站：JR上野站步行5分鐘',
    footerParking: '停車場：本院專用免費停車場 10 台',
    footerCopy: '© 佐藤診所',
  },
  'zh-cn': {
    nav: ['首页', '诊疗时间・地点', '最新消息', '诊疗内容', '关于本院', '常见问题', '预约・联系我们'],
    menuLabel: '打开菜单',
    pageTopLabel: '回到页首',
    footerBrandLabel: '回到页首',
    footerSections: ['初诊指南', '诊疗时间・地点', '最新消息', '诊疗内容', '关于本院', '常见问题', '预约・联系我们'],
    footerFirstVisit: ['就诊流程', '携带物品', '预约说明', '就诊注意事项'],
    footerAccess: ['诊疗时间', '诊疗科目', '地点', '联系我们'],
    footerMedical: ['一般内科诊疗', '生活习惯病诊断・治疗', '消化系统诊疗', '呼吸系统诊疗', '健康检查・各项检查', '预防接种', '戒烟门诊'],
    footerAbout: ['诊疗方针', '扎根社区的医疗', '守护全家人的健康', '医疗设备与团队医疗', '本院理念・方针', '与患者同行的未来', '员工介绍'],
    footerFaq: ['关于诊疗', '预防接种・健康检查', '付款方式', '其他'],
    footerContact: ['预约', '联系我们', '说明'],
    footerAddress: '〒123-4567　東京都台东区上野0-0-0',
    footerPhone: '电话：00-0000-0000',
    footerMail: '邮箱：info@sato-clinic-test.jp',
    footerStation: '最近车站：JR上野站步行5分钟',
    footerParking: '停车场：本院专用免费停车场 10台',
    footerCopy: '© 佐藤诊所',
  },
  ko: {
    nav: ['홈', '진료시간·위치', '공지사항', '진료 안내', '병원 소개', '자주 묻는 질문', '예약·문의'],
    menuLabel: '메뉴 열기',
    pageTopLabel: '페이지 상단으로',
    footerBrandLabel: '페이지 상단으로',
    footerSections: ['초진 안내', '진료시간·위치', '공지사항', '진료 안내', '병원 소개', '자주 묻는 질문', '예약·문의'],
    footerFirstVisit: ['진료 흐름', '준비물', '예약 안내', '내원 시 부탁말씀'],
    footerAccess: ['진료시간', '진료과목', '위치', '문의'],
    footerMedical: ['일반내과 진료', '생활습관병 진단·치료', '소화기 진료', '호흡기 진료', '건강검진·각종 검사', '예방접종', '금연 외래'],
    footerAbout: ['진료 방침', '지역 밀착 의료', '온 가족 지원', '의료 장비와 팀 의료', '병원 이념·방침', '환자와 함께하는 미래', '직원 소개'],
    footerFaq: ['진료 관련', '예방접종·건강검진', '결제 관련', '기타'],
    footerContact: ['예약', '문의', '안내'],
    footerAddress: '〒123-4567　도쿄도 다이토구 우에노0-0-0',
    footerPhone: '전화: 00-0000-0000',
    footerMail: '이메일: info@sato-clinic-test.jp',
    footerStation: '가까운 역: JR 우에노역에서 도보 5분',
    footerParking: '주차장: 병원 전용 무료 주차장 10대',
    footerCopy: '© 사토 클리닉',
  },
};

const FONT_SCALE_STORAGE_KEY = 'sato-clinic-font-scale';
const FONT_SCALE_OPTIONS = [
  { key: 'small', label: '小', ariaLabel: '文字サイズを小さく' },
  { key: 'standard', label: '標準', ariaLabel: '標準の文字サイズ' },
  { key: 'large', label: '大', ariaLabel: '文字サイズを大きく' },
  { key: 'xlarge', label: '特大', ariaLabel: '文字サイズをさらに大きく' },
];
const FONT_SCALE_DEFAULT = 'standard';

function getStoredFontScale() {
  try {
    const stored = window.localStorage.getItem(FONT_SCALE_STORAGE_KEY);
    return FONT_SCALE_OPTIONS.some((option) => option.key === stored) ? stored : FONT_SCALE_DEFAULT;
  } catch (error) {
    return FONT_SCALE_DEFAULT;
  }
}

function getStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return LANGUAGE_OPTIONS.some((option) => option.key === stored) ? stored : LANGUAGE_DEFAULT;
  } catch (error) {
    return LANGUAGE_DEFAULT;
  }
}

function setStoredLanguage(languageKey) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, languageKey);
  } catch (error) {
    // localStorage unavailable: keep the live state only.
  }
}

function setStoredFontScale(scaleKey) {
  try {
    window.localStorage.setItem(FONT_SCALE_STORAGE_KEY, scaleKey);
  } catch (error) {
    // localStorage unavailable: keep the live state only.
  }
}

function applyFontScale(scaleKey) {
  const nextScale = FONT_SCALE_OPTIONS.some((option) => option.key === scaleKey) ? scaleKey : FONT_SCALE_DEFAULT;
  document.documentElement.dataset.fontScale = nextScale;
  setStoredFontScale(nextScale);

  document.querySelectorAll('[data-font-scale-option]').forEach((button) => {
    const isActive = button.dataset.fontScaleOption === nextScale;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function getCurrentPageKey() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const match = path.match(/^([^.]+)\.html$/);
  return match ? match[1] : 'index';
}

function getLanguageOption(languageKey) {
  return LANGUAGE_OPTIONS.find((option) => option.key === languageKey) || LANGUAGE_OPTIONS[0];
}

function getLocalizedImageSrc(pageKey, languageKey) {
  const sourceMap = LOCALIZED_IMAGE_SOURCES[pageKey];
  if (!sourceMap) return '';
  const option = getLanguageOption(languageKey);
  return sourceMap[option.key] || sourceMap.ja || '';
}

function updateLocalizedImages(languageKey) {
  const pageKey = getCurrentPageKey();
  const option = getLanguageOption(languageKey);
  const localizedPageKey = LOCALIZED_PAGE_IMAGE_KEYS[pageKey];

  if (localizedPageKey) {
    const nextSrc = getLocalizedImageSrc(localizedPageKey, languageKey);
    const titleImage = document.querySelector('.subpage-title-image img, .news-page-title-image img');
    if (titleImage && nextSrc) {
      titleImage.setAttribute('src', nextSrc);
      const pageTitleAltMap = {
        about: '当院について',
        access: '診療時間・所在地',
        news: 'お知らせ',
        medical: '診療内容',
        faq: 'よくあるご質問',
        contact: '予約・お問い合わせ',
        'first-visit': '初めての方へ',
      };
      titleImage.setAttribute('alt', pageTitleAltMap[localizedPageKey] || titleImage.alt || 'ページタイトル');
    }
  }

  document.querySelectorAll('.font-scale-switcher [data-language-option]').forEach((button) => {
    const isActive = button.dataset.languageOption === languageKey;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function applyLanguage(languageKey) {
  const nextLanguage = LANGUAGE_OPTIONS.some((option) => option.key === languageKey) ? languageKey : LANGUAGE_DEFAULT;
  const option = getLanguageOption(nextLanguage);
  document.documentElement.lang = option.htmlLang;
  document.documentElement.dataset.language = nextLanguage;
  setStoredLanguage(nextLanguage);
  applyCommonTranslations(nextLanguage);
  applyHomeTranslations(nextLanguage);
  applyAboutTranslations(nextLanguage);
  applyAccessTranslations(nextLanguage);
  applyFaqTranslations(nextLanguage);
  applyContactTranslations(nextLanguage);
  applyMedicalTranslations(nextLanguage);
  updateLocalizedImages(nextLanguage);
  renderHomeNews();
  renderNewsArchive();
  if (newsDetailPage) {
    const params = new URLSearchParams(window.location.search);
    renderNewsDetailById(params.get('id'), { skipHistory: true });
  }
}

function applyCommonTranslations(languageKey) {
  const translations = COMMON_TEXT_TRANSLATIONS[languageKey] || COMMON_TEXT_TRANSLATIONS.ja;

  if (menuButton) {
    menuButton.setAttribute('aria-label', translations.menuLabel);
  }

  const navLinks = document.querySelectorAll('.site-nav > a');
  navLinks.forEach((link, index) => {
    if (link.classList.contains('site-nav__phone')) {
      link.textContent = translations.footerPhone;
      return;
    }
    if (translations.nav[index]) {
      link.textContent = translations.nav[index];
    }
  });

  document.querySelectorAll('.footer__column--info .footer__brand').forEach((link) => {
    link.setAttribute('aria-label', translations.footerBrandLabel);
  });

  const footerGroups = document.querySelectorAll('.footer__nav-group');
  const footerLists = [
    translations.footerFirstVisit,
    translations.footerAccess,
    null,
    translations.footerMedical,
    translations.footerAbout,
    translations.footerFaq,
    translations.footerContact,
  ];

  footerGroups.forEach((group, index) => {
    const sectionLink = group.querySelector('.footer__section-link');
    if (!sectionLink) return;
    if (translations.footerSections[index]) {
      sectionLink.textContent = translations.footerSections[index];
    }
    const list = group.querySelectorAll('.footer__sublist a');
    const targetLabels = footerLists[index] || [];
    list.forEach((link, itemIndex) => {
      if (targetLabels[itemIndex]) {
        link.textContent = `・${targetLabels[itemIndex]}`;
      }
    });
  });

  document.querySelectorAll('.footer__info p').forEach((paragraph) => {
    const text = paragraph.textContent.trim();
    const replacements = {
      '〒123-4567　東京都台東区上野0-0-0': translations.footerAddress,
      '123-4567, Ueno, Taito-ku, Tokyo': translations.footerAddress,
      '〒123-4567　東京都台東區上野0-0-0': translations.footerAddress,
      '〒123-4567　東京都台东区上野0-0-0': translations.footerAddress,
      '〒123-4567　도쿄도 다이토구 우에노0-0-0': translations.footerAddress,
      '電話：00-0000-0000': translations.footerPhone,
      'FAX：00-0000-0000': languageKey === 'ja' ? 'FAX：00-0000-0000' : 'FAX: 00-0000-0000',
      'メール：info@sato-clinic-test.jp': translations.footerMail,
      '最寄り駅：JR上野駅より徒歩5分': translations.footerStation,
      '駐車場：当院専用の無料駐車場 10台分あり': translations.footerParking,
      'Phone: 00-0000-0000': translations.footerPhone,
      'FAX: 00-0000-0000': 'FAX: 00-0000-0000',
      'Email: info@sato-clinic-test.jp': translations.footerMail,
      'Nearest station: 5 minutes on foot from JR Ueno Station': translations.footerStation,
      'Parking: 10 free spaces available exclusively for our clinic': translations.footerParking,
      '電子郵件：info@sato-clinic-test.jp': translations.footerMail,
      '邮箱：info@sato-clinic-test.jp': translations.footerMail,
      '最近車站：JR上野站步行5分鐘': translations.footerStation,
      '最近车站：JR上野站步行5分钟': translations.footerStation,
      '停車場：本院專用免費停車場 10 台': translations.footerParking,
      '停车场：本院专用免费停车场 10台': translations.footerParking,
      '이메일: info@sato-clinic-test.jp': translations.footerMail,
      '가까운 역: JR 우에노역에서 도보 5분': translations.footerStation,
      '주차장: 병원 전용 무료 주차장 10대': translations.footerParking,
    };
    if (replacements[text]) {
      paragraph.textContent = replacements[text];
    }
  });

  document.querySelectorAll('.footer__copy').forEach((copy) => {
    copy.textContent = translations.footerCopy;
  });

  document.querySelectorAll('.page-top-button').forEach((button) => {
    button.setAttribute('aria-label', translations.pageTopLabel);
  });

  document.querySelectorAll('.brand[aria-label]').forEach((link) => {
    if (link.getAttribute('aria-label')?.includes('トップへ戻る')) {
      link.setAttribute('aria-label', translations.footerBrandLabel);
    }
    if (link.getAttribute('aria-label')?.includes('ページ最上部へ戻る')) {
      link.setAttribute('aria-label', translations.pageTopLabel);
    }
  });

  const languageToggleLabel = document.querySelector('[data-language-label]');
  if (languageToggleLabel) {
    languageToggleLabel.textContent = 'Language';
  }
}

function applyHomeTranslations(languageKey) {
  const translations = {
    ja: {
      heroLabel: '地域に根ざした医療',
      heroSub: '内科・循環器科・呼吸器科',
      firstVisitLabel: '初めての方へ',
      firstVisitStrong: '受診前に確認',
      scheduleLabel: '診療時間',
      scheduleStrong: '受付時間を確認',
      symptomLabel: '症状から探す',
      symptomStrong: '診療内容へ進む',
      accessLabel: 'アクセス',
      accessStrong: '所在地を確認',
      newsHeading: '診療時間・お知らせ',
      scheduleEyebrow: '受付終了までの目安',
      scheduleTitle: '受付時間外',
      scheduleSummary: '当日の受付状況をご案内しています。診療時間表や休診日、診療科目、所在地の詳細は「診療時間・所在地」ページをご確認ください。',
      newsLabel: 'お知らせ',
      newsButton: 'お知らせ一覧へ',
      greetingHeading: '院長挨拶',
      greetingLead: 'こんにちは。<br>佐藤医院の院長、佐藤太郎と申します。<br>当院のホームページをご覧いただき、ありがとうございます。',
      greetingRole: '佐藤医院　院長',
      greetingBody: [
        '佐藤医院では、「地域に根ざした医療」をモットーに、患者様一人ひとりに寄り添った医療を提供することを目指しております。日常的な健康管理から生活習慣病の予防、さらには専門的な診断や治療まで、幅広い内科診療を行い、地域の皆様の健康を支える役割を担っていきたいと考えております。',
        '私たちは、患者様の不安を少しでも軽減し、安心して診療を受けていただけるよう、わかりやすい説明と丁寧な対応を心掛けております。また、近隣の医療機関とも連携し、必要に応じて高度医療へのアクセスもサポートいたします。どんな小さな不調でも、どうぞお気軽にご相談ください。',
        'これからも、患者様の健康を第一に考え、地域の皆様に信頼される医療機関であり続けるため、スタッフ一同努力してまいります。どうぞよろしくお願いいたします。',
      ],
      medicalHeading: '診療内容',
      medicalIntro: '当院では、地域の皆様の健康を支えるため、幅広い内科診療を行っております。日常的な体調管理から、各種の検査や治療に至るまで、どんなお悩みもお気軽にご相談ください。',
      medicalLabels: ['一般内科診療', '生活習慣病の診断・治療', '消化器系の診療', '呼吸器系の診療'],
      medicalButton: '診療内容一覧へ',
      aboutHeading: '当院について',
      aboutCopy: '佐藤医院は、地域の皆様の健康を守り、より良い生活をサポートすることを使命としています。<br>創立以来、私たちは「患者様一人ひとりに寄り添った診療」を大切にし、地域密着型の医療を提供してまいりました。<br>今後も、皆様の健康維持と病気予防に貢献するため、より良い医療サービスを提供し続けることをお約束いたします。',
      aboutButton: '当院についてへ',
      staffHeading: 'スタッフ紹介',
      staffButton: 'スタッフ一覧へ',
      accessHeading: 'アクセス',
      accessPhoneButton: 'お電話はこちら',
      accessContactLabel: '予約・お問い合わせページへ移動',
      accessMapLabel: '診療時間・所在地ページの所在地へ移動',
      accessAddress: '〒123-4567<br>東京都台東区上野0-0-0',
      accessStation: 'JR上野駅より徒歩5分',
      accessParking: '当院専用の無料駐車場　10台分あり',
      accessTelLabel: 'TEL:',
      accessMail: 'メール：info@sato-clinic-test.jp',
    },
    en: {
      heroLabel: 'Community-based care',
      heroSub: 'Internal medicine / Cardiology / Respiratory medicine',
      firstVisitLabel: 'First Visit',
      firstVisitStrong: 'Check before your visit',
      scheduleLabel: 'Hours',
      scheduleStrong: 'Check reception time',
      symptomLabel: 'Find by symptom',
      symptomStrong: 'Go to services',
      accessLabel: 'Access',
      accessStrong: 'Check location',
      newsHeading: 'Hours / News',
      scheduleEyebrow: 'Estimate until reception closes',
      scheduleTitle: 'Outside reception hours',
      scheduleSummary: 'Today’s reception status is shown here. Please see the Hours / Location page for the hours table, closed days, departments, and location details.',
      newsLabel: 'News',
      newsButton: 'View all news',
      greetingHeading: 'Message from the director',
      greetingLead: 'Hello.<br>I am Taro Sato, director of Sato Clinic.<br>Thank you for visiting our website.',
      greetingRole: 'Director, Sato Clinic',
      greetingBody: [
        'At Sato Clinic, our motto is "community-based care," and we aim to provide healthcare that stays close to each patient. From everyday health management and prevention of lifestyle diseases to specialized diagnosis and treatment, we offer a broad range of internal medicine services and hope to support the health of everyone in the community.',
        'We strive to reduce patient anxiety as much as possible and to provide clear explanations and careful support so that everyone can feel at ease during consultations. We also work with nearby medical institutions and, when needed, support access to advanced medical care. Please feel free to consult us about even the smallest symptom.',
        'Going forward as well, we will continue to put patients’ health first and work as a team to remain a trusted medical institution for the local community. Thank you for your continued support.',
      ],
      medicalHeading: 'Services',
      medicalIntro: 'At our clinic, we provide a wide range of internal medicine services to support the health of our community. Please feel free to consult us about anything, from daily health management to examinations and treatment.',
      medicalLabels: ['General internal medicine', 'Lifestyle disease care', 'Digestive care', 'Respiratory care'],
      medicalButton: 'View all services',
      aboutHeading: 'About Us',
      aboutCopy: 'Sato Clinic is committed to protecting the health of the local community and supporting a better daily life.<br>Since our founding, we have valued care that stays close to each patient and have provided community-based medical services.<br>We will continue to offer better medical care to help maintain your health and prevent illness.',
      aboutButton: 'Go to About Us',
      staffHeading: 'Staff',
      staffButton: 'View staff list',
      accessHeading: 'Access',
      accessPhoneButton: 'Call us',
      accessContactLabel: 'Go to the Reservations / Contact page',
      accessMapLabel: 'Go to location details on the Hours / Location page',
      accessAddress: '123-4567<br>Ueno 0-0-0, Taito-ku, Tokyo',
      accessStation: '5 minutes on foot from JR Ueno Station',
      accessParking: '10 free parking spaces available exclusively for our clinic',
      accessTelLabel: 'TEL:',
      accessMail: 'Email: info@sato-clinic-test.jp',
    },
    'zh-tw': {
      heroLabel: '深耕社區的醫療',
      heroSub: '內科・心臟內科・呼吸內科',
      firstVisitLabel: '初診指南',
      firstVisitStrong: '就診前確認',
      scheduleLabel: '診療時間',
      scheduleStrong: '確認受理時間',
      symptomLabel: '依症狀搜尋',
      symptomStrong: '前往診療內容',
      accessLabel: '地點',
      accessStrong: '確認位置',
      newsHeading: '診療時間・最新消息',
      scheduleEyebrow: '距離受理結束的目安',
      scheduleTitle: '非受理時間',
      scheduleSummary: '此處提供當日受理狀況。診療時間表、休診日、診療科目與地點詳細資訊請參閱「診療時間・地點」頁面。',
      newsLabel: '最新消息',
      newsButton: '前往消息一覧',
      greetingHeading: '院長致詞',
      greetingLead: '您好。<br>我是佐藤診所院長佐藤太郎。<br>感謝您瀏覽本院網站。',
      greetingRole: '佐藤診所　院長',
      greetingBody: [
        '佐藤診所以「深耕社區的醫療」為宗旨，致力提供貼近每位患者的醫療服務。從日常健康管理、生活習慣病預防，到專業診斷與治療，我們提供廣泛的內科診療，希望成為守護社區居民健康的力量。',
        '我們重視以淺顯易懂且細心的方式說明，盡可能減輕患者的不安，讓大家能安心接受診療。此外，我們也與鄰近醫療機構合作，必要時協助銜接高階醫療。即使是很小的不適，也歡迎您隨時諮詢。',
        '今後我們也會持續以患者健康為第一優先，全體員工齊心努力，成為深受社區信賴的醫療機構。敬請多多指教。',
      ],
      medicalHeading: '診療內容',
      medicalIntro: '本院為了守護鄰里居民的健康，提供廣泛的內科診療。從日常健康管理到各項檢查與治療，歡迎您隨時諮詢。',
      medicalLabels: ['一般內科診療', '生活習慣病診斷・治療', '消化系診療', '呼吸系診療'],
      medicalButton: '前往診療內容一覧',
      aboutHeading: '關於本院',
      aboutCopy: '佐藤診所以守護社區居民的健康、協助大家擁有更好的生活為使命。<br>自創立以來，我們始終重視「貼近每位患者的診療」，持續提供深耕社區的醫療服務。<br>今後也將持續提供更好的醫療服務，為您的健康維持與疾病預防盡一份心力。',
      aboutButton: '前往關於本院',
      staffHeading: '員工介紹',
      staffButton: '前往員工一覧',
      accessHeading: '地點',
      accessPhoneButton: '電話聯絡',
      accessContactLabel: '前往預約・聯絡我們頁面',
      accessMapLabel: '前往診療時間・地點頁面的地點資訊',
      accessAddress: '〒123-4567<br>東京都台東區上野0-0-0',
      accessStation: 'JR上野站步行5分鐘',
      accessParking: '本院專用免費停車場 10 台',
      accessTelLabel: 'TEL:',
      accessMail: '電子郵件：info@sato-clinic-test.jp',
    },
    'zh-cn': {
      heroLabel: '扎根社区的医疗',
      heroSub: '内科・心内科・呼吸内科',
      firstVisitLabel: '初诊指南',
      firstVisitStrong: '就诊前确认',
      scheduleLabel: '诊疗时间',
      scheduleStrong: '确认接待时间',
      symptomLabel: '按症状查找',
      symptomStrong: '前往诊疗内容',
      accessLabel: '地点',
      accessStrong: '确认位置',
      newsHeading: '诊疗时间・最新消息',
      scheduleEyebrow: '距离接待结束的参考',
      scheduleTitle: '非接待时间',
      scheduleSummary: '这里提供当天的接待情况。诊疗时间表、休诊日、诊疗科目与地点详情请查看“诊疗时间・地点”页面。',
      newsLabel: '最新消息',
      newsButton: '前往消息列表',
      greetingHeading: '院长致辞',
      greetingLead: '您好。<br>我是佐藤诊所院长佐藤太郎。<br>感谢您浏览本院网站。',
      greetingRole: '佐藤诊所　院长',
      greetingBody: [
        '佐藤诊所以“扎根社区的医疗”为宗旨，致力于提供贴近每位患者的医疗服务。从日常健康管理、生活习惯病预防，到专业诊断与治疗，我们提供广泛的内科诊疗，希望成为守护社区居民健康的一份力量。',
        '我们重视以通俗易懂且细心的方式说明，尽可能减轻患者的不安，让大家能够安心接受诊疗。此外，我们也与邻近医疗机构合作，必要时协助衔接高阶医疗。即使是很小的不适，也欢迎您随时咨询。',
        '今后我们也会继续将患者健康放在第一位，全体员工齐心努力，成为深受社区信赖的医疗机构。敬请多多指教。',
      ],
      medicalHeading: '诊疗内容',
      medicalIntro: '本院为了守护周边居民的健康，提供广泛的内科诊疗。从日常健康管理到各类检查与治疗，欢迎随时咨询。',
      medicalLabels: ['一般内科诊疗', '生活习惯病诊断・治疗', '消化系统诊疗', '呼吸系统诊疗'],
      medicalButton: '前往诊疗内容列表',
      aboutHeading: '关于本院',
      aboutCopy: '佐藤诊所以守护社区居民的健康、支持更好生活为使命。<br>自创立以来，我们始终重视“贴近每位患者的诊疗”，持续提供扎根社区的医疗服务。<br>今后也将继续提供更好的医疗服务，为大家的健康维持与疾病预防尽一份力。',
      aboutButton: '前往关于本院',
      staffHeading: '员工介绍',
      staffButton: '前往员工列表',
      accessHeading: '地点',
      accessPhoneButton: '电话联系',
      accessContactLabel: '前往预约・联系我们页面',
      accessMapLabel: '前往诊疗时间・地点页面的地点信息',
      accessAddress: '〒123-4567<br>东京都台东区上野0-0-0',
      accessStation: 'JR上野站步行5分钟',
      accessParking: '本院专用免费停车场 10 台',
      accessTelLabel: 'TEL:',
      accessMail: '邮箱：info@sato-clinic-test.jp',
    },
    ko: {
      heroLabel: '지역 밀착 의료',
      heroSub: '내과 · 심장내과 · 호흡기내과',
      firstVisitLabel: '초진 안내',
      firstVisitStrong: '내원 전 확인',
      scheduleLabel: '진료시간',
      scheduleStrong: '접수 시간 확인',
      symptomLabel: '증상으로 찾기',
      symptomStrong: '진료 안내로 이동',
      accessLabel: '위치',
      accessStrong: '위치 확인',
      newsHeading: '진료시간·공지사항',
      scheduleEyebrow: '접수 종료까지의 참고',
      scheduleTitle: '접수 시간 외',
      scheduleSummary: '오늘의 접수 현황을 안내합니다. 진료시간표와 휴진일, 진료과목, 위치 상세는 “진료시간·위치” 페이지를 확인해 주세요.',
      newsLabel: '공지사항',
      newsButton: '공지사항 전체보기',
      greetingHeading: '원장 인사',
      greetingLead: '안녕하세요.<br>사토 클리닉 원장 사토 타로입니다.<br>홈페이지를 방문해 주셔서 감사합니다.',
      greetingRole: '사토 클리닉 원장',
      greetingBody: [
        '사토 클리닉은 “지역 밀착 의료”를 모토로, 환자 한 분 한 분에게 다가가는 의료를 제공하고자 합니다. 일상적인 건강관리부터 생활습관병 예방, 전문적인 진단과 치료에 이르기까지 폭넓은 내과 진료를 통해 지역 여러분의 건강을 지키는 역할을 하고자 합니다.',
        '환자의 불안을 조금이라도 덜어드릴 수 있도록 알기 쉬운 설명과 세심한 대응을 늘 마음에 새기고 있습니다. 또한 인근 의료기관과도 협력하여 필요 시 고도 의료로의 연계도 지원합니다. 어떤 작은 증상이라도 편하게 상담해 주세요.',
        '앞으로도 환자의 건강을 최우선으로 생각하며, 지역 여러분께 신뢰받는 의료기관으로 남을 수 있도록 직원 모두가 노력하겠습니다. 잘 부탁드립니다.',
      ],
      medicalHeading: '진료 안내',
      medicalIntro: '저희 병원은 지역 주민의 건강을 지키기 위해 폭넓은 내과 진료를 제공합니다. 일상적인 건강 관리부터 각종 검사와 치료까지 무엇이든 편하게 상담해 주세요.',
      medicalLabels: ['일반내과 진료', '생활습관병 진단·치료', '소화기 진료', '호흡기 진료'],
      medicalButton: '진료 안내 전체보기',
      aboutHeading: '병원 소개',
      aboutCopy: '사토 클리닉은 지역 주민의 건강을 지키고 더 나은 일상을 지원하는 것을 사명으로 삼고 있습니다.<br>개원 이래, 환자 한 분 한 분에게 다가가는 진료를 소중히 여기며 지역 밀착형 의료를 제공해 왔습니다.<br>앞으로도 건강 유지와 질병 예방에 도움이 되는 더 나은 의료 서비스를 계속 제공하겠습니다.',
      aboutButton: '병원 소개로 이동',
      staffHeading: '직원 소개',
      staffButton: '직원 목록 보기',
      accessHeading: '위치',
      accessPhoneButton: '전화 문의',
      accessContactLabel: '예약·문의 페이지로 이동',
      accessMapLabel: '진료시간·위치 페이지의 위치 정보로 이동',
      accessAddress: '〒123-4567<br>도쿄도 다이토구 우에노 0-0-0',
      accessStation: 'JR 우에노역에서 도보 5분',
      accessParking: '병원 전용 무료 주차장 10대',
      accessTelLabel: 'TEL:',
      accessMail: '이메일: info@sato-clinic-test.jp',
    },
  };

  const map = translations[languageKey] || translations.ja;
  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.innerHTML = value;
    });
  };
  const setPlainText = (selector, value) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  };

  setText('.hero-orb__content h1', map.heroLabel);
  setText('.hero-orb__content p', map.heroSub);

  const heroCards = document.querySelectorAll('.hero__card-link');
  if (heroCards[0]) {
    heroCards[0].querySelector('span').textContent = map.firstVisitLabel;
    heroCards[0].querySelector('strong').textContent = map.firstVisitStrong;
  }
  if (heroCards[1]) {
    heroCards[1].querySelector('span').textContent = map.scheduleLabel;
    heroCards[1].querySelector('strong').textContent = map.scheduleStrong;
  }
  if (heroCards[2]) {
    heroCards[2].querySelector('span').textContent = map.symptomLabel;
    heroCards[2].querySelector('strong').textContent = map.symptomStrong;
  }
  if (heroCards[3]) {
    heroCards[3].querySelector('span').textContent = map.accessLabel;
    heroCards[3].querySelector('strong').textContent = map.accessStrong;
  }

  setPlainText('.schedule-news .section-heading h2', map.newsHeading);
  setPlainText('#news .schedule-panel__eyebrow', map.scheduleEyebrow);
  setPlainText('#schedule-status-title', map.scheduleTitle);
  setPlainText('#news .schedule-panel__summary-copy', map.scheduleSummary);
  setPlainText('.news-feature__label', map.newsLabel);
  setPlainText('.news-panel .button--secondary', map.newsButton);
  setPlainText('#greeting .section-heading h2', map.greetingHeading);
  setText('.greeting-card__lead', map.greetingLead);
  setPlainText('.greeting-card__signature-role', map.greetingRole);
  const greetingBodyParagraphs = document.querySelectorAll('#greeting .greeting-card__body > p:not(.greeting-card__lead):not(.greeting-card__signature)');
  greetingBodyParagraphs.forEach((paragraph, index) => {
    if (map.greetingBody && map.greetingBody[index]) {
      paragraph.innerHTML = map.greetingBody[index];
    }
  });
  setPlainText('#medical .section-heading h2', map.medicalHeading);
  setText('#medical .section-heading p', map.medicalIntro);
  document.querySelectorAll('#medical .medical-menu__label').forEach((label, index) => {
    if (map.medicalLabels && map.medicalLabels[index]) {
      label.textContent = map.medicalLabels[index];
    }
  });
  setPlainText('#medical .medical-menu__action .button--secondary', map.medicalButton);
  setPlainText('#about .section-heading h2', map.aboutHeading);
  setText('#about .about-showcase__copy > p:nth-of-type(2)', map.aboutCopy);
  setPlainText('#about .button--secondary', map.aboutButton);
  setPlainText('#staff .section-heading h2', map.staffHeading);
  setPlainText('#staff .staff-index-button__label', map.staffButton);
  setPlainText('#access .section-heading h2', map.accessHeading);
  setPlainText('#access .button', map.accessPhoneButton);
  setText('.access-card__block--contact .access-card__phone', `${map.accessTelLabel} 00-0000-0000`);
  setText('.access-card__block--contact .access-card__mail', map.accessMail);
  setText('.access-card__block--link .access-card__address', map.accessAddress);
  setPlainText('.access-card__block--link p:nth-of-type(2)', map.accessStation);
  setPlainText('.access-card__block--link p:nth-of-type(3)', map.accessParking);
  document.querySelectorAll('.access-card__block-link').forEach((link) => {
    link.setAttribute('aria-label', map.accessContactLabel);
  });
  document.querySelectorAll('.access-card__map').forEach((link) => {
    link.setAttribute('aria-label', map.accessMapLabel);
  });
}

function applyAboutTranslations(languageKey) {
  const translations = {
    ja: {
      titleAlt: '当院について',
      eyebrow: 'About',
      policyHeading: '診療方針',
      policyBody: [
        '当院の診療方針は、「患者様の声に耳を傾け、共に歩む医療」です。内科を中心にさまざまな疾患へ対応し、症状を的確に診断して最適な治療を提供します。患者様との信頼関係を大切に、わかりやすく丁寧な説明を行い、納得いただける治療方針を一緒に考えます。',
        '病気の治療だけでなく、生活習慣の改善や予防についてもアドバイスし、患者様の健康管理を全力でサポートします。治療方法やお薬について不安があれば、遠慮なくお尋ねください。',
      ],
      communityHeading: '地域に根ざした医療',
      communityBody: [
        '佐藤医院は、地域の皆様の健康を守るために、長年にわたり地域医療を支えてきました。定期的な健康診断や健康相談も実施し、地域住民の皆様が健康な生活を送れるようサポートしています。',
        '病気の治療だけでなく予防の重要性も強く認識し、定期的な健診を通じた早期発見・早期治療に努めています。',
      ],
      familyHeading: 'ご家族全員をサポート',
      familyBody: '当院では、子どもから高齢者まですべての年代の患者様に対応し、各世代に必要な医療サービスを提供しています。予防医療や健康相談を通じて、ご家族全員のより良い生活習慣の定着を目指します。',
      familyItems: [
        '<strong>小児科的対応</strong>：子どもの成長や発育に関するアドバイス、予防接種を行っています。',
        '<strong>高齢者医療</strong>：高齢者の健康管理や介護予防、生活習慣病の管理をしっかりサポートします。',
      ],
      teamHeading: '医療設備とチーム医療',
      teamBody: [
        '診断精度を高めるため、最新の医療設備を導入し診療に活かしています。必要に応じて適切な検査を行い、迅速に対応します。',
        'また、医師・看護師・事務スタッフが一丸となるチーム医療を実践し、スタッフ全員が最新の治療法・技術の研鑽を積みながら、患者様に最適なケアを提供します。',
      ],
      visionHeading: '医院の理念・方針',
      visionIntro: '佐藤医院は、地域医療の一翼を担う医療機関として「患者様第一」の精神を大切にしています。単に病気を治療するだけでなく、患者様が心身ともに健やかな生活を送れるよう、あらゆる面からサポートすることを使命と考えています。',
      visionTitles: ['1. 信頼関係を築く医療', '2. 予防医療の重視', '3. 最先端の技術・設備', '4. ライフステージに応じた医療', '5. 地域密着型の医療', '6. プライバシーと安全の確保', '7. チーム医療の推進'],
      visionBodies: ['患者様一人ひとりと向き合い、納得いただける説明を尽くす', '健診・予防接種・健康相談で病気を未然に防ぐ', '高度な医療機器と最新知識で精度の高い診断・治療を行う', '小児から高齢者まで、各年代に必要なケアを提供', '気軽に相談できる存在として、健康セミナー等で地域に貢献', '個人情報保護と感染症対策・衛生管理を徹底', '多職種が連携し、患者様に最適なケアを提供'],
      promiseHeading: '患者様とともに歩む未来',
      promiseBody: '佐藤医院では、患者様の健康を第一に考え、今後も安心・安全な医療を提供し続けます。どんな小さな悩みでも、お気軽にご相談ください。地域の皆様とともに、より健康で豊かな生活を築いていきたいと考えています。スタッフ一同、皆様のご来院を心よりお待ちしております。',
      staffHeading: 'スタッフ紹介',
      staffLead: '地域の皆様に安心してご来院いただけるよう、スタッフ一同、誠心誠意対応いたします。<br>それぞれの専門性と温かさを活かし、皆様の健康を支えるパートナーとしてお力になれるよう努めてまいります。',
      staffLabels: ['経歴・専門分野・コメントを見る', '経歴・専門分野・メッセージを見る', '経歴・専門分野・コメントを見る', '経歴・専門分野・コメントを見る'],
      staffButton: 'スタッフ一覧へ',
      staffNames: ['院長：佐藤 太郎', '看護師長：鈴木 真理', '臨床検査技師：高橋 由美', '医療事務：山本 花'],
      staffRoleHints: ['院長：', '看護師長：', '臨床検査技師：', '医療事務：'],
      staffFallback: [
        '院長：佐藤 太郎 - 経歴：光明大学医学部卒業後、瑞穂中央総合病院で内科医として10年間勤務。その後、地域医療への貢献を目指し、佐藤医院を開院。専門分野：生活習慣病、呼吸器疾患、内科全般。コメント：患者様にとって気軽に相談できる「かかりつけ医」を目指しています。どんな小さな不安でも、まずはご相談ください。',
        '看護師長：鈴木 真理 - 経歴：白桜大学看護学部卒業後、緑が丘大学病院で10年勤務。地域医療に携わりたい思いから、佐藤医院に入職。得意分野：親身な対応、注射・採血技術、健康管理指導。メッセージ：安心して治療を受けていただけるよう、いつも笑顔でお待ちしています。些細なことでもお気軽にご相談ください。',
        '臨床検査技師：高橋 由美 - 経歴：東都臨床検査技術専門学校を卒業後、武蔵中央医療センターにて15年間の臨床検査技師としての経験を積む。得意分野：血液検査、心電図検査、超音波検査。コメント：検査は不安が伴うこともありますが、できるだけリラックスしていただけるよう、優しく丁寧な対応を心がけています。',
        '医療事務：山本 花 - 経歴：希望医療カレッジ卒業後、さくら診療所にて受付業務を担当。現在は佐藤医院で患者様対応を担当。得意分野：受付業務、カルテ管理、医療費計算。コメント：皆様に気持ちよくご利用いただけるよう、笑顔と真心を大切にしております。初めての方もどうぞ安心してお越しください。',
      ],
      staffHistory: [
        '経歴：光明大学医学部卒業後、瑞穂中央総合病院で内科医として10年間勤務。その後、地域医療への貢献を目指し、佐藤医院を開院。',
        '経歴：白桜大学看護学部卒業後、緑が丘大学病院で10年勤務。地域医療に携わりたい思いから、佐藤医院に入職。',
        '経歴：東都臨床検査技術専門学校を卒業後、武蔵中央医療センターにて15年間の臨床検査技師としての経験を積む。',
        '経歴：希望医療カレッジ卒業後、さくら診療所にて受付業務を担当。現在は佐藤医院で患者様対応を担当。',
      ],
      staffSpecialty: [
        '専門分野：生活習慣病、呼吸器疾患、内科全般',
        '得意分野：親身な対応、注射・採血技術、健康管理指導',
        '得意分野：血液検査、心電図検査、超音波検査',
        '得意分野：受付業務、カルテ管理、医療費計算',
      ],
      staffComment: [
        'コメント：患者様にとって気軽に相談できる「かかりつけ医」を目指しています。どんな小さな不安でも、まずはご相談ください。',
        'メッセージ：安心して治療を受けていただけるよう、いつも笑顔でお待ちしています。些細なことでもお気軽にご相談ください。',
        'コメント：検査は不安が伴うこともありますが、できるだけリラックスしていただけるよう、優しく丁寧な対応を心がけています。',
        'コメント：皆様に気持ちよくご利用いただけるよう、笑顔と真心を大切にしております。初めての方もどうぞ安心してお越しください。',
      ],
    },
    en: {
      titleAlt: 'About Us',
      eyebrow: 'About',
      policyHeading: 'Care Policy',
      policyBody: [
        'Our care policy is "listening to patients and walking together." We handle a wide range of internal medicine conditions, diagnose symptoms accurately, and provide the most suitable treatment. We value trust with each patient and work together to build a treatment plan through clear, careful explanations.',
        'In addition to treating illness, we also give advice on lifestyle improvements and prevention so that we can fully support your health management. Please feel free to ask us if you have any concerns about treatment or medication.',
      ],
      communityHeading: 'Community-Based Care',
      communityBody: [
        'Sato Clinic has supported local healthcare for many years to protect the health of people in the community. We also provide regular health checkups and consultations so residents can live healthy lives.',
        'We place strong importance on prevention as well as treatment, and we work toward early detection and early treatment through regular checkups.',
      ],
      familyHeading: 'Support for the Whole Family',
      familyBody: 'We care for patients of all ages, from children to older adults, and provide the medical services each generation needs. Through preventive care and health consultations, we aim to help the whole family build better daily habits.',
      familyItems: [
        '<strong>Pediatric support</strong>: Advice on growth and development, as well as vaccinations.',
        '<strong>Geriatric care</strong>: Health management, preventive care, and lifestyle disease support for older adults.',
      ],
      teamHeading: 'Equipment and Team Care',
      teamBody: [
        'To improve diagnostic accuracy, we use the latest medical equipment in our care. We perform the necessary examinations as needed and respond promptly.',
        'Our physicians, nurses, and administrative staff work together as a team, continuously studying the latest treatment methods and techniques to provide the best possible care.',
      ],
      visionHeading: 'Clinic Philosophy',
      visionIntro: 'As a medical institution that plays a part in community healthcare, Sato Clinic values a "patients first" spirit. We believe our mission is not only to treat illness, but to support patients in living healthy, comfortable lives in every respect.',
      visionTitles: ['1. Building trusting relationships', '2. Focusing on preventive care', '3. Cutting-edge technology and equipment', '4. Care according to life stage', '5. Community-rooted care', '6. Privacy and safety', '7. Promoting team care'],
      visionBodies: ['Facing each patient individually and providing careful explanations', 'Preventing disease through checkups, vaccinations, and health consultations', 'Providing accurate diagnosis and treatment with advanced equipment and the latest knowledge', 'Providing care needed for each age group, from children to older adults', 'Contributing to the community through health seminars and easy consultation', 'Thorough personal information protection and infection control', 'Providing the best care through multidisciplinary cooperation'],
      promiseHeading: 'A Future We Build Together with Our Patients',
      promiseBody: 'At Sato Clinic, we put patients’ health first and will continue to provide safe and reliable medical care. Please feel free to consult us about even the smallest concern. We hope to help build a healthier and richer life together with the local community. All staff look forward to welcoming you.',
      staffHeading: 'Staff',
      staffLead: 'Our staff will continue to serve the community with sincere care so that everyone can visit with peace of mind.<br>We make use of each person’s expertise and warmth to support your health as your partners in care.',
      staffLabels: ['View history, specialty, and comments', 'View history, specialty, and message', 'View history, specialty, and comments', 'View history, specialty, and comments'],
      staffButton: 'View staff list',
      staffNames: ['Director: Taro Sato', 'Head Nurse: Mari Suzuki', 'Medical Laboratory Technologist: Yumi Takahashi', 'Medical Office Staff: Hana Yamamoto'],
      staffRoleHints: ['Director: ', 'Head Nurse: ', 'Medical Laboratory Technologist: ', 'Medical Office Staff: '],
      staffFallback: [
        'Director: Taro Sato - Education and career: After graduating from Komei University School of Medicine, worked for 10 years as an internist at Mizuho Central General Hospital. Later opened Sato Clinic to contribute to community healthcare. Specialty: lifestyle diseases, respiratory diseases, and internal medicine in general. Comment: I aim to be a family doctor people can consult easily. Please feel free to talk to us about any concern, no matter how small.',
        'Head Nurse: Mari Suzuki - Education and career: After graduating from Shirosakura University School of Nursing, worked for 10 years at Midorigaoka University Hospital. Joined Sato Clinic with a desire to support community healthcare. Specialty: attentive care, injection and blood collection techniques, health management guidance. Message: We always welcome you with a smile so that you can receive treatment with peace of mind. Please feel free to consult us about anything.',
        'Medical Laboratory Technologist: Yumi Takahashi - Education and career: After graduating from Toto Clinical Laboratory Technology Vocational School, gained 15 years of experience as a medical laboratory technologist at Musashi Central Medical Center. Specialty: blood tests, electrocardiograms, ultrasound examinations. Comment: Tests can sometimes be stressful, so we strive to provide kind and careful support to help you relax as much as possible.',
        'Medical Office Staff: Hana Yamamoto - Education and career: After graduating from Kibou Medical College, handled reception duties at Sakura Clinic and now supports patients at Sato Clinic. Specialty: reception work, medical record management, medical billing. Comment: We value a smile and sincerity so everyone can feel comfortable using our clinic. First-time visitors are very welcome.',
      ],
      staffHistory: [
        'Education and career: After graduating from Komei University School of Medicine, worked for 10 years as an internist at Mizuho Central General Hospital. Later opened Sato Clinic to contribute to community healthcare.',
        'Education and career: After graduating from Shirosakura University School of Nursing, worked for 10 years at Midorigaoka University Hospital. Joined Sato Clinic with a desire to support community healthcare.',
        'Education and career: After graduating from Toto Clinical Laboratory Technology Vocational School, gained 15 years of experience as a medical laboratory technologist at Musashi Central Medical Center.',
        'Education and career: After graduating from Kibou Medical College, handled reception duties at Sakura Clinic and now supports patients at Sato Clinic.',
      ],
      staffSpecialty: [
        'Specialty: lifestyle diseases, respiratory diseases, and internal medicine in general.',
        'Specialty: attentive care, injection and blood collection techniques, health management guidance.',
        'Specialty: blood tests, electrocardiograms, ultrasound examinations.',
        'Specialty: reception work, medical record management, medical billing.',
      ],
      staffComment: [
        'Comment: I aim to be a family doctor people can consult easily. Please feel free to talk to us about any concern, no matter how small.',
        'Message: We always welcome you with a smile so that you can receive treatment with peace of mind. Please feel free to consult us about anything.',
        'Comment: Tests can sometimes be stressful, so we strive to provide kind and careful support to help you relax as much as possible.',
        'Comment: We value a smile and sincerity so everyone can feel comfortable using our clinic. First-time visitors are very welcome.',
      ],
    },
    'zh-tw': {
      titleAlt: '關於本院',
      eyebrow: 'About',
      policyHeading: '診療方針',
      policyBody: [
        '本院的診療方針是「傾聽患者的聲音，與患者一同前行的醫療」。我們以內科為中心，對各種疾病提供對應，準確診斷症狀並提供最適切的治療。重視與患者建立信賴關係，透過清楚且細心的說明，與您一起思考能夠安心接受的治療方針。',
        '除了治療疾病外，我們也會就生活習慣改善與預防提供建議，全力支援患者的健康管理。若您對治療方式或藥物有任何疑問，請隨時告訴我們。',
      ],
      communityHeading: '深耕社區的醫療',
      communityBody: [
        '佐藤診所多年來持續支援在地醫療，守護社區居民的健康。我們也提供定期健康檢查與健康諮詢，協助居民維持健康生活。',
        '我們深知預防的重要性，不僅重視治療，也透過定期健檢努力及早發現、及早治療。',
      ],
      familyHeading: '守護全家人的健康',
      familyBody: '本院照護從兒童到高齡者的各個年齡層患者，提供每個世代所需的醫療服務。透過預防醫療與健康諮詢，協助全家建立更好的生活習慣。',
      familyItems: [
        '<strong>兒科支援</strong>：提供成長與發育建議，以及預防接種。',
        '<strong>高齡者醫療</strong>：高齡者健康管理、預防照護與生活習慣病管理支援。',
      ],
      teamHeading: '醫療設備與團隊醫療',
      teamBody: [
        '為提升診斷精度，我們導入最新醫療設備並活用於診療。必要時會進行適切的檢查並迅速應對。',
        '此外，醫師、護理師與行政人員攜手實踐團隊醫療，全體人員持續研習最新治療方法與技術，提供患者最適切的照護。',
      ],
      visionHeading: '本院理念・方針',
      visionIntro: '佐藤診所作為肩負社區醫療一角的醫療機構，珍視「以患者為先」的精神。我們認為不僅要治療疾病，更應從各個面向支援患者身心健康地生活。',
      visionTitles: ['1. 建立信賴關係的醫療', '2. 重視預防醫療', '3. 領先技術與設備', '4. 因應人生階段的醫療', '5. 深耕社區的醫療', '6. 隱私與安全的確保', '7. 推動團隊醫療'],
      visionBodies: ['用心面對每位患者，提供讓人安心的說明', '透過健檢、預防接種與健康諮詢預防疾病', '以先進醫療儀器與最新知識進行精準診斷與治療', '從兒童到高齡者，提供各年齡層所需的照護', '作為可輕鬆諮詢的存在，透過健康講座回饋社區', '徹底落實個資保護、感染對策與衛生管理', '跨專業連攜，提供患者最適切的照護'],
      promiseHeading: '與患者一同前行的未來',
      promiseBody: '佐藤診所始終以患者健康為優先，今後也將持續提供安心且安全的醫療。無論多小的煩惱，都歡迎隨時與我們商量。我們希望與社區居民一同打造更健康、更豐富的生活。全體員工誠摯期待您的蒞臨。',
      staffHeading: '員工介紹',
      staffLead: '為了讓社區居民安心來院，所有員工都將以誠懇態度提供服務。<br>我們會活用各自專業與溫暖，作為守護大家健康的夥伴持續努力。',
      staffLabels: ['查看經歷・專長・留言', '查看經歷・專長・留言', '查看經歷・專長・留言', '查看經歷・專長・留言'],
      staffButton: '前往員工一覧',
      staffNames: ['院長：佐藤 太郎', '護理長：鈴木 真理', '臨床檢驗技師：高橋 由美', '醫療事務：山本 花'],
      staffRoleHints: ['院長：', '護理長：', '臨床檢驗技師：', '醫療事務：'],
      staffFallback: [
        '院長：佐藤 太郎 - 經歷：光明大學醫學部畢業後，於瑞穗中央綜合醫院擔任內科醫師 10 年。之後為貢獻社區醫療而開設佐藤診所。專長：生活習慣病、呼吸系疾病、內科全般。留言：希望成為讓患者能輕鬆諮詢的「家庭醫師」。無論多小的不安，都歡迎先與我們商量。',
        '護理長：鈴木 真理 - 經歷：白櫻大學護理學部畢業後，在綠丘大學醫院服務 10 年。因希望投入社區醫療而加入佐藤診所。專長：親切應對、注射・抽血技術、健康管理指導。訊息：我們會一直帶著笑容迎接您，讓您安心接受治療。任何小事都歡迎向我們諮詢。',
        '臨床檢驗技師：高橋 由美 - 經歷：東都臨床檢驗技術專門學校畢業後，於武藏中央醫療中心累積 15 年臨床檢驗技師經驗。專長：血液檢查、心電圖檢查、超音波檢查。留言：檢查有時會讓人感到不安，因此我們會盡量以溫和細心的方式，讓您放鬆接受。',
        '醫療事務：山本 花 - 經歷：希望醫療學院畢業後，於櫻花診所負責櫃台業務，現任佐藤診所患者接待。專長：櫃台業務、病歷管理、醫療費計算。留言：我們重視笑容與真誠，讓每位使用本院服務的人都能感到舒適。首次來院的您也請放心前來。',
      ],
      staffHistory: [
        '經歷：光明大學醫學部畢業後，於瑞穗中央綜合醫院擔任內科醫師 10 年。之後為貢獻社區醫療而開設佐藤診所。',
        '經歷：白櫻大學護理學部畢業後，在綠丘大學醫院服務 10 年。因希望投入社區醫療而加入佐藤診所。',
        '經歷：東都臨床檢驗技術專門學校畢業後，於武藏中央醫療中心累積 15 年臨床檢驗技師經驗。',
        '經歷：希望醫療學院畢業後，於櫻花診所負責櫃台業務，現任佐藤診所患者接待。',
      ],
      staffSpecialty: [
        '專長：生活習慣病、呼吸系疾病、內科全般。',
        '專長：親切應對、注射・抽血技術、健康管理指導。',
        '專長：血液檢查、心電圖檢查、超音波檢查。',
        '專長：櫃台業務、病歷管理、醫療費計算。',
      ],
      staffComment: [
        '留言：希望成為讓患者能輕鬆諮詢的「家庭醫師」。無論多小的不安，都歡迎先與我們商量。',
        '訊息：我們會一直帶著笑容迎接您，讓您安心接受治療。任何小事都歡迎向我們諮詢。',
        '留言：檢查有時會讓人感到不安，因此我們會盡量以溫和細心的方式，讓您放鬆接受。',
        '留言：我們重視笑容與真誠，讓每位使用本院服務的人都能感到舒適。首次來院的您也請放心前來。',
      ],
    },
    'zh-cn': {
      titleAlt: '关于本院',
      eyebrow: 'About',
      policyHeading: '诊疗方针',
      policyBody: [
        '本院的诊疗方针是“倾听患者心声，与患者一同前行的医疗”。我们以内科为中心，对各种疾病进行对应，准确诊断症状并提供最合适的治疗。重视与患者建立信赖关系，通过清楚而细心的说明，与您一起思考能够安心接受的治疗方针。',
        '除了治疗疾病外，我们也会就生活习惯改善与预防提供建议，全力支持患者的健康管理。若您对治疗方式或药物有任何疑问，请随时告诉我们。',
      ],
      communityHeading: '扎根社区的医疗',
      communityBody: [
        '佐藤诊所多年来持续支持在地医疗，守护社区居民的健康。我们也提供定期健康检查与健康咨询，协助居民维持健康生活。',
        '我们深知预防的重要性，不仅重视治疗，也透过定期体检努力做到早发现、早治疗。',
      ],
      familyHeading: '守护全家人的健康',
      familyBody: '本院照护从儿童到高龄者的各年龄层患者，提供每个世代所需的医疗服务。透过预防医疗与健康咨询，协助全家建立更好的生活习惯。',
      familyItems: [
        '<strong>儿科支援</strong>：提供成长与发育建议，以及预防接种。',
        '<strong>高龄者医疗</strong>：高龄者健康管理、预防照护与生活习惯病管理支持。',
      ],
      teamHeading: '医疗设备与团队医疗',
      teamBody: [
        '为了提升诊断精度，我们导入最新医疗设备并活用于诊疗。必要时会进行适切检查并迅速应对。',
        '此外，医生、护理师与行政人员携手实践团队医疗，全体人员持续研习最新治疗方法与技术，提供患者最适切的照护。',
      ],
      visionHeading: '本院理念・方针',
      visionIntro: '佐藤诊所作为肩负社区医疗一角的医疗机构，珍视“以患者为先”的精神。我们认为不仅要治疗疾病，更应从各个面向支持患者身心健康地生活。',
      visionTitles: ['1. 建立信赖关系的医疗', '2. 重视预防医疗', '3. 领先技术与设备', '4. 因应人生阶段的医疗', '5. 扎根社区的医疗', '6. 隐私与安全的确保', '7. 推动团队医疗'],
      visionBodies: ['用心面对每位患者，提供让人安心的说明', '透过体检、预防接种与健康咨询预防疾病', '以先进医疗仪器与最新知识进行精准诊断与治疗', '从儿童到高龄者，提供各年龄层所需的照护', '作为可轻松咨询的存在，透过健康讲座回馈社区', '彻底落实个人信息保护、感染对策与卫生管理', '跨专业连携，提供患者最适切的照护'],
      promiseHeading: '与患者一同前行的未来',
      promiseBody: '佐藤诊所始终以患者健康为优先，今后也将持续提供安心且安全的医疗。无论多小的烦恼，都欢迎随时与我们商量。我们希望与社区居民一同打造更健康、更丰富的生活。全体员工诚挚期待您的到来。',
      staffHeading: '员工介绍',
      staffLead: '为了让社区居民安心来院，所有员工都将以诚恳态度提供服务。<br>我们会活用各自专业与温暖，作为守护大家健康的伙伴持续努力。',
      staffLabels: ['查看经历・专长・留言', '查看经历・专长・留言', '查看经历・专长・留言', '查看经历・专长・留言'],
      staffButton: '前往员工列表',
      staffNames: ['院长：佐藤 太郎', '护理长：铃木 真理', '临床检验技师：高桥 由美', '医疗事务：山本 花'],
      staffRoleHints: ['院长：', '护理长：', '临床检验技师：', '医疗事务：'],
      staffFallback: [
        '院长：佐藤 太郎 - 经历：光明大学医学部毕业后，曾在瑞穗中央综合医院担任内科医师 10 年。之后为贡献社区医疗而开设佐藤诊所。专长：生活习惯病、呼吸系统疾病、内科全般。留言：希望成为患者能轻松咨询的“家庭医生”。无论多小的不安，都欢迎先与我们商量。',
        '护理长：铃木 真理 - 经历：白樱大学护理学部毕业后，在绿丘大学医院服务 10 年。因希望投身社区医疗而加入佐藤诊所。专长：亲切应对、注射・采血技术、健康管理指导。讯息：我们会一直带着笑容迎接您，让您安心接受治疗。任何小事都欢迎向我们咨询。',
        '临床检验技师：高桥 由美 - 经历：东都临床检验技术专门学校毕业后，于武藏中央医疗中心累积 15 年临床检验技师经验。专长：血液检查、心电图检查、超音波检查。留言：检查有时会让人感到不安，因此我们会尽量以温和细心的方式，让您放松接受。',
        '医疗事务：山本 花 - 经历：希望医疗学院毕业后，曾在樱花诊所负责窗口业务，现任佐藤诊所患者接待。专长：窗口业务、病历管理、医疗费用计算。留言：我们重视笑容与真诚，让每位使用本院服务的人都能感到舒适。首次来院的您也请放心前来。',
      ],
      staffHistory: [
        '经历：光明大学医学部毕业后，曾在瑞穗中央综合医院担任内科医师 10 年。之后为贡献社区医疗而开设佐藤诊所。',
        '经历：白樱大学护理学部毕业后，在绿丘大学医院服务 10 年。因希望投身社区医疗而加入佐藤诊所。',
        '经历：东都临床检验技术专门学校毕业后，于武藏中央医疗中心累积 15 年临床检验技师经验。',
        '经历：希望医疗学院毕业后，曾在樱花诊所负责窗口业务，现任佐藤诊所患者接待。',
      ],
      staffSpecialty: [
        '专长：生活习惯病、呼吸系统疾病、内科全般。',
        '专长：亲切应对、注射・采血技术、健康管理指导。',
        '专长：血液检查、心电图检查、超音波检查。',
        '专长：窗口业务、病历管理、医疗费用计算。',
      ],
      staffComment: [
        '留言：希望成为患者能轻松咨询的“家庭医生”。无论多小的不安，都欢迎先与我们商量。',
        '讯息：我们会一直带着笑容迎接您，让您安心接受治疗。任何小事都欢迎向我们咨询。',
        '留言：检查有时会让人感到不安，因此我们会尽量以温和细心的方式，让您放松接受。',
        '留言：我们重视笑容与真诚，让每位使用本院服务的人都能感到舒适。首次来院的您也请放心前来。',
      ],
    },
    ko: {
      titleAlt: '병원 소개',
      eyebrow: 'About',
      policyHeading: '진료 방침',
      policyBody: [
        '저희 병원의 진료 방침은 “환자의 목소리에 귀 기울이며 함께 걸어가는 의료”입니다. 내과를 중심으로 다양한 질환에 대응하며, 증상을 정확하게 진단해 최적의 치료를 제공합니다. 환자와의 신뢰를 소중히 여기며, 이해하기 쉽고 세심한 설명으로 납득할 수 있는 치료 방침을 함께 고민합니다.',
        '질병 치료뿐만 아니라 생활습관 개선과 예방에 대해서도 조언하여, 환자의 건강 관리를 최선을 다해 지원합니다. 치료 방법이나 약에 대해 궁금한 점이 있으면 언제든 편하게 말씀해 주세요.',
      ],
      communityHeading: '지역 밀착 의료',
      communityBody: [
        '사토 클리닉은 지역 주민의 건강을 지키기 위해 오랜 기간 지역 의료를 지원해 왔습니다. 정기 건강검진과 건강 상담도 실시하여 주민들이 건강한 생활을 이어갈 수 있도록 돕고 있습니다.',
        '질병 치료뿐 아니라 예방의 중요성도 깊이 인식하고 있으며, 정기 검진을 통해 조기 발견과 조기 치료에 힘쓰고 있습니다.',
      ],
      familyHeading: '온 가족 지원',
      familyBody: '저희 병원은 어린이부터 고령자까지 모든 연령대의 환자를 진료하며, 각 세대에 필요한 의료 서비스를 제공합니다. 예방의료와 건강 상담을 통해 가족 모두가 더 좋은 생활습관을 갖도록 돕고자 합니다.',
      familyItems: [
        '<strong>소아과적 지원</strong>: 아이의 성장과 발달에 대한 조언, 예방접종을 실시합니다.',
        '<strong>노인 의료</strong>: 노년층의 건강관리, 예방 케어, 생활습관병 관리까지 든든하게 지원합니다.',
      ],
      teamHeading: '의료 장비와 팀 의료',
      teamBody: [
        '진단 정확도를 높이기 위해 최신 의료 장비를 도입하여 진료에 활용하고 있습니다. 필요에 따라 적절한 검사를 시행하고 신속하게 대응합니다.',
        '또한 의사, 간호사, 행정직원이 하나가 되어 팀 의료를 실천하며, 전 직원이 최신 치료법과 기술을 꾸준히 익히며 환자에게 가장 적합한 케어를 제공합니다.',
      ],
      visionHeading: '병원 이념·방침',
      visionIntro: '사토 클리닉은 지역 의료의 한 축을 담당하는 의료기관으로서 “환자 우선”의 정신을 소중히 여기고 있습니다. 단순히 병을 치료하는 데 그치지 않고, 환자가 몸과 마음 모두 건강한 생활을 할 수 있도록 모든 면에서 지원하는 것을 사명으로 생각합니다.',
      visionTitles: ['1. 신뢰 관계를 만드는 의료', '2. 예방의료 중시', '3. 최첨단 기술과 장비', '4. 생애 단계에 맞는 의료', '5. 지역 밀착형 의료', '6. 개인정보와 안전의 확보', '7. 팀 의료의 추진'],
      visionBodies: ['환자 한 분 한 분과 마주하며 납득할 수 있는 설명을 다함', '검진·예방접종·건강상담으로 질병을 미연에 방지', '고도 의료장비와 최신 지식으로 정밀한 진단·치료를 실시', '어린이부터 고령자까지 각 세대에 필요한 케어 제공', '가볍게 상담할 수 있는 존재로서 건강 세미나 등으로 지역에 공헌', '개인정보 보호와 감염증 대책·위생 관리를 철저히 함', '다직종이 연계하여 환자에게 가장 적합한 케어를 제공'],
      promiseHeading: '환자와 함께하는 미래',
      promiseBody: '사토 클리닉은 환자의 건강을 최우선으로 생각하며, 앞으로도 안심하고 안전한 의료를 제공하겠습니다. 어떤 작은 고민이라도 편하게 상담해 주세요. 지역의 여러분과 함께 더 건강하고 풍요로운 삶을 만들어 가고자 합니다. 전 직원이 여러분의 내원을 진심으로 기다리고 있습니다.',
      staffHeading: '직원 소개',
      staffLead: '지역 주민 여러분이 안심하고 내원하실 수 있도록, 직원 모두가 성심성의껏 응대하겠습니다.<br>각자의 전문성과 따뜻함을 살려, 여러분의 건강을 지키는 파트너가 되도록 노력하겠습니다.',
      staffLabels: ['경력·전문분야·코멘트 보기', '경력·전문분야·메시지 보기', '경력·전문분야·코멘트 보기', '경력·전문분야·코멘트 보기'],
      staffButton: '직원 목록 보기',
      staffNames: ['원장: 사토 타로', '간호사장: 스즈키 마리', '임상검사기사: 다카하시 유미', '의료사무: 야마모토 하나'],
      staffRoleHints: ['원장: ', '간호사장: ', '임상검사기사: ', '의료사무: '],
      staffFallback: [
        '원장: 사토 타로 - 경력: 코우메이 대학 의학부 졸업 후 미즈호 중앙 종합병원에서 내과의로 10년 근무. 이후 지역 의료에 기여하고자 사토 클리닉을 개원. 전문 분야: 생활습관병, 호흡기 질환, 내과 전반. 코멘트: 환자분이 편하게 상담할 수 있는 “주치의”를 지향합니다. 어떤 작은 불안이라도 먼저 상담해 주세요.',
        '간호사장: 스즈키 마리 - 경력: 시로사쿠라 대학 간호학부 졸업 후, 미도리가오카 대학병원에서 10년 근무. 지역 의료에 힘을 보태고자 사토 클리닉에 합류. 전문 분야: 친절한 응대, 주사·채혈 기술, 건강관리 지도. 메시지: 안심하고 치료받으실 수 있도록 늘 웃는 얼굴로 기다리고 있습니다. 사소한 일도 편하게 상담해 주세요.',
        '임상검사기사: 다카하시 유미 - 경력: 도토 임상검사기술 전문학교 졸업 후 무사시 중앙 의료센터에서 15년간 임상검사기사로 근무. 전문 분야: 혈액검사, 심전도 검사, 초음파 검사. 코멘트: 검사는 불안하실 수 있으므로, 최대한 편안하게 받으실 수 있도록 친절하고 세심한 대응을 마음가짐으로 하고 있습니다.',
        '의료사무: 야마모토 하나 - 경력: 키보 의료칼리지 졸업 후 사쿠라 진료소에서 접수 업무를 담당. 현재는 사토 클리닉에서 환자 응대를 담당. 전문 분야: 접수 업무, 차트 관리, 진료비 계산. 코멘트: 여러분이 기분 좋게 이용하실 수 있도록 웃음과 진심을 소중히 하고 있습니다. 처음 오시는 분도 안심하고 방문해 주세요.',
      ],
      staffHistory: [
        '경력: 코우메이 대학 의학부 졸업 후 미즈호 중앙 종합병원에서 내과의로 10년 근무. 이후 지역 의료에 기여하고자 사토 클리닉을 개원.',
        '경력: 시로사쿠라 대학 간호학부 졸업 후, 미도리가오카 대학병원에서 10년 근무. 지역 의료에 힘을 보태고자 사토 클리닉에 합류.',
        '경력: 도토 임상검사기술 전문학교 졸업 후 무사시 중앙 의료센터에서 15년간 임상검사기사로 근무.',
        '경력: 키보 의료칼리지 졸업 후 사쿠라 진료소에서 접수 업무를 담당. 현재는 사토 클리닉에서 환자 응대를 담당.',
      ],
      staffSpecialty: [
        '전문 분야: 생활습관병, 호흡기 질환, 내과 전반.',
        '전문 분야: 친절한 응대, 주사·채혈 기술, 건강관리 지도.',
        '전문 분야: 혈액검사, 심전도 검사, 초음파 검사.',
        '전문 분야: 접수 업무, 차트 관리, 진료비 계산.',
      ],
      staffComment: [
        '코멘트: 환자분이 편하게 상담할 수 있는 “주치의”를 지향합니다. 어떤 작은 불안이라도 먼저 상담해 주세요.',
        '메시지: 안심하고 치료받으실 수 있도록 늘 웃는 얼굴로 기다리고 있습니다. 사소한 일도 편하게 상담해 주세요.',
        '코멘트: 검사는 불안하실 수 있으므로, 최대한 편안하게 받으실 수 있도록 친절하고 세심한 대응을 마음가짐으로 하고 있습니다.',
        '코멘트: 여러분이 기분 좋게 이용하실 수 있도록 웃음과 진심을 소중히 하고 있습니다. 처음 오시는 분도 안심하고 방문해 주세요.',
      ],
    },
  };
  const map = translations[languageKey] || translations.ja;
  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.innerHTML = value;
    });
  };
  const setPlainText = (selector, value) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  };

  if (getCurrentPageKey() === 'about') {
    setPlainText('.subpage-hero__eyebrow--page-logo', map.eyebrow);
  }
  setPlainText('#policy .about-feature-block__heading h2', map.policyHeading);
  setText('#policy .about-feature-block__body p:nth-of-type(1)', map.policyBody[0]);
  setText('#policy .about-feature-block__body p:nth-of-type(2)', map.policyBody[1]);
  setPlainText('#community .about-feature-block__heading h2', map.communityHeading);
  setText('#community .about-feature-block__body p:nth-of-type(1)', map.communityBody[0]);
  setText('#community .about-feature-block__body p:nth-of-type(2)', map.communityBody[1]);
  setPlainText('#family .about-feature-block__heading h2', map.familyHeading);
  setText('#family .about-feature-block__body > p', map.familyBody);
  const familyItems = document.querySelectorAll('#family .page-card__list li');
  familyItems.forEach((item, index) => {
    if (map.familyItems[index]) item.innerHTML = map.familyItems[index];
  });
  setPlainText('#team .about-feature-block__heading h2', map.teamHeading);
  setText('#team .about-feature-block__body p:nth-of-type(1)', map.teamBody[0]);
  setText('#team .about-feature-block__body p:nth-of-type(2)', map.teamBody[1]);
  setPlainText('#vision .vision-orbit__layout h2', map.visionHeading);
  setText('#vision .vision-orbit__intro', map.visionIntro);
  const visionItems = document.querySelectorAll('#vision .vision-orbit__item');
  visionItems.forEach((item, index) => {
    const strong = item.querySelector('strong');
    const paragraph = item.querySelector('p');
    if (strong && map.visionTitles[index]) strong.textContent = map.visionTitles[index];
    if (paragraph && map.visionBodies[index]) paragraph.innerHTML = map.visionBodies[index];
  });
  setPlainText('#future .about-promise__eyebrow', 'Message');
  setPlainText('#future h2', map.promiseHeading);
  setText('#future p', map.promiseBody);
  setPlainText('#staff h2', map.staffHeading);
  setText('#staff > p:not(.no-js-fallback p)', map.staffLead);
  const staffButtons = document.querySelectorAll('.staff-directory__item');
  staffButtons.forEach((button, index) => {
    const body = button.querySelector('.staff-directory__body');
    if (body && map.staffNames[index]) {
      body.querySelector('strong').textContent = map.staffNames[index];
      body.querySelector('span').textContent = map.staffLabels[index] || body.querySelector('span').textContent;
    }
    button.dataset.staffName = map.staffNames[index] || button.dataset.staffName;
    button.dataset.staffHistory = map.staffHistory[index] || button.dataset.staffHistory;
    button.dataset.staffSpecialty = map.staffSpecialty[index] || button.dataset.staffSpecialty;
    button.dataset.staffComment = map.staffComment[index] || button.dataset.staffComment;
  });
  const fallbackList = document.querySelectorAll('#staff noscript li');
  fallbackList.forEach((item, index) => {
    if (map.staffFallback[index]) item.textContent = map.staffFallback[index];
  });
  const staffFallbackHeading = document.querySelector('#staff noscript h3');
  if (staffFallbackHeading) staffFallbackHeading.textContent = map.staffHeading;
}

function applyAccessTranslations(languageKey) {
  const translations = {
    ja: {
      titleAlt: '診療時間・所在地',
      eyebrow: 'Access',
      lead: '診療時間、診療科目、交通案内、お問い合わせ先を掲載しています。',
      scheduleHeading: '診療時間',
      scheduleEyebrow: '受付終了までの目安',
      scheduleTitle: '受付時間外',
      scheduleSummary: '当日の受付状況をご案内しています。診療時間表や休診日、診療科目、所在地の詳細は「診療時間・所在地」ページをご確認ください。',
      scheduleHeader: ['診察時間', '月', '火', '水', '木', '金', '土', '日'],
      morning: '午前 9:00-12:00',
      afternoon: '午後 13:00-18:00',
      reception: ['受付時間：午前　8:00〜11:00　／　午後　12:00〜17:00', '休診日：木曜・土曜午後・日曜', '※祝祭日も診療を行っておりますが、休診日もございますので、事前にご確認ください。'],
      departmentHeading: '診療科目',
      departmentList: ['内科', '循環器科', '呼吸器科', '予防医療・健康診断', '生活習慣病（高血圧、糖尿病等）の治療・管理'],
      departmentNote: 'その他、ご不明点があればお電話またはメールでお問い合わせください。',
      locationHeading: '所在地',
      locationList: ['〒123-4567　東京都台東区上野0-0-0', '最寄駅：JR上野駅より徒歩5分', '当院専用の無料駐車場 10台分あり'],
      locationNote: 'ご来院の際は、交通状況にご注意ください。最寄駅から徒歩5分の便利な立地です。',
      mapTitle: '佐藤医院 周辺地図',
      routeAlt: '上野駅への主要駅からのアクセス所要時間と路線図',
      routeButtonLabel: '路線図を拡大表示する',
      routeFallbackHeading: '路線図について',
      routeFallbackBody: 'JavaScriptを無効にしている場合、路線図の拡大表示はご利用いただけません。上の画像をご確認ください。',
      contactHeading: 'お問い合わせ',
      contactList: ['電話番号：00-0000-0000', 'FAX：00-0000-0000', 'メール：info@sato-clinic-test.jp'],
      routeDialogTitle: '路線図の拡大表示',
      routeCloseLabel: '路線図を閉じる',
      routeZoom: ['路線図を縮小', '路線図の拡大率を戻す', '路線図を拡大'],
    },
    en: {
      titleAlt: 'Hours / Location',
      eyebrow: 'Access',
      lead: 'We provide clinic hours, departments, transportation guidance, and contact information.',
      scheduleHeading: 'Hours',
      scheduleEyebrow: 'Estimate until reception closes',
      scheduleTitle: 'Outside reception hours',
      scheduleSummary: 'Today’s reception status is shown here. Please see the Hours / Location page for the hours table, closed days, departments, and location details.',
      scheduleHeader: ['Hours', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      morning: 'Morning 9:00-12:00',
      afternoon: 'Afternoon 13:00-18:00',
      reception: ['Reception hours: Morning 8:00-11:00 / Afternoon 12:00-17:00', 'Closed: Thursday, Saturday afternoon, Sunday', '*We are open on national holidays as well, but there are some closed days. Please check in advance.'],
      departmentHeading: 'Departments',
      departmentList: ['Internal medicine', 'Cardiology', 'Respiratory medicine', 'Preventive care / health checks', 'Treatment and management of lifestyle diseases (hypertension, diabetes, etc.)'],
      departmentNote: 'If you have any questions, please contact us by phone or email.',
      locationHeading: 'Location',
      locationList: ['123-4567 Ueno 0-0-0, Taito-ku, Tokyo', 'Nearest station: 5 minutes on foot from JR Ueno Station', '10 free parking spaces available exclusively for our clinic'],
      locationNote: 'Please pay attention to traffic conditions when visiting. Our clinic is conveniently located 5 minutes on foot from the nearest station.',
      mapTitle: 'Sato Clinic area map',
      routeAlt: 'Travel times and route map from major stations to Ueno Station',
      routeButtonLabel: 'Enlarge route map',
      routeFallbackHeading: 'About the route map',
      routeFallbackBody: 'If JavaScript is disabled, the route map cannot be enlarged. Please check the image above.',
      contactHeading: 'Contact',
      contactList: ['Phone: 00-0000-0000', 'FAX: 00-0000-0000', 'Email: info@sato-clinic-test.jp'],
      routeDialogTitle: 'Enlarged route map',
      routeCloseLabel: 'Close route map',
      routeZoom: ['Zoom out', 'Reset zoom', 'Zoom in'],
    },
  };
  const map = translations[languageKey] || translations.ja;
  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.innerHTML = value;
    });
  };
  const setPlainText = (selector, value) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  };

  if (getCurrentPageKey() === 'access') {
    setPlainText('.subpage-hero__eyebrow--page-logo', map.eyebrow);
    setPlainText('.subpage-hero__title-stack > p:not(.subpage-hero__eyebrow)', map.lead);
  }
  setPlainText('#schedule-detail h2', map.scheduleHeading);
  setPlainText('#schedule-detail .schedule-panel__eyebrow', map.scheduleEyebrow);
  setPlainText('#schedule-status-title', map.scheduleTitle);
  setPlainText('#schedule-detail .schedule-panel__summary-copy', map.scheduleSummary);
  const scheduleHeaders = document.querySelectorAll('#schedule-detail [role="columnheader"]');
  scheduleHeaders.forEach((header, index) => {
    if (map.scheduleHeader[index]) header.textContent = map.scheduleHeader[index];
  });
  const timeCells = document.querySelectorAll('#schedule-detail .schedule-table__time');
  if (timeCells[0]) timeCells[0].textContent = map.morning;
  if (timeCells[1]) timeCells[1].textContent = map.afternoon;
  const receptionItems = document.querySelectorAll('#schedule-detail .page-card__list li');
  receptionItems.forEach((item, index) => {
    if (map.reception[index]) item.textContent = map.reception[index];
  });
  setPlainText('#department-detail h2', map.departmentHeading);
  const departmentItems = document.querySelectorAll('#department-detail .page-card__list li');
  departmentItems.forEach((item, index) => {
    if (map.departmentList[index]) item.textContent = map.departmentList[index];
  });
  setPlainText('#department-detail > p', map.departmentNote);
  setPlainText('#location-detail h2', map.locationHeading);
  const locationItems = document.querySelectorAll('#location-detail .page-card__list li');
  locationItems.forEach((item, index) => {
    if (map.locationList[index]) item.textContent = map.locationList[index];
  });
  setPlainText('#location-detail > p', map.locationNote);
  const mapTitle = document.querySelector('#location-detail iframe');
  if (mapTitle) mapTitle.setAttribute('title', map.mapTitle);
  const routeImage = document.querySelector('.subpage-route-image img');
  if (routeImage) routeImage.setAttribute('alt', map.routeAlt);
  const routeButton = document.querySelector('.subpage-route-image--button');
  if (routeButton) routeButton.setAttribute('aria-label', map.routeButtonLabel);
  const routeFallback = document.querySelector('#location-detail noscript');
  if (routeFallback) {
    const fallbackHeading = routeFallback.querySelector('h3');
    const fallbackBody = routeFallback.querySelector('p');
    if (fallbackHeading) fallbackHeading.textContent = map.routeFallbackHeading;
    if (fallbackBody) fallbackBody.textContent = map.routeFallbackBody;
  }
  setPlainText('#contact-detail h2', map.contactHeading);
  const contactItems = document.querySelectorAll('#contact-detail .page-card__list li');
  contactItems.forEach((item, index) => {
    if (map.contactList[index]) item.textContent = map.contactList[index];
  });
  const routeTitle = document.querySelector('#route-map-modal-title');
  if (routeTitle) routeTitle.textContent = map.routeDialogTitle;
  document.querySelectorAll('[data-route-map-close]').forEach((button) => {
    button.setAttribute('aria-label', map.routeCloseLabel);
  });
  document.querySelectorAll('.route-map-modal__zoom').forEach((button, index) => {
    if (map.routeZoom[index]) button.setAttribute('aria-label', map.routeZoom[index]);
  });
}

function applyFaqTranslations(languageKey) {
  const translations = {
    ja: {
      titleAlt: 'よくあるご質問',
      eyebrow: 'FAQ',
      lead: '当院に関するご質問をまとめました。その他のご不明点がございましたら、スタッフまでお気軽にお問い合わせください。',
      nav: ['診療について', '予防接種・健康診断について', 'お支払いについて', 'その他'],
      sections: ['診療について', '予防接種・健康診断について', 'お支払いについて', 'その他'],
      note: 'その他のご質問や詳細については、スタッフまでお気軽にお問い合わせください。',
      faqItems: [
        { q: 'Q. 診療は予約制ですか？', a: 'A. 一般診療は予約なしでも受け付けていますが、予約優先制となっております。予防接種や健康診断などは完全予約制です。お電話またはWeb予約をご利用ください。' },
        { q: 'Q. 初診時に必要なものは何ですか？', a: 'A. 健康保険証、お薬手帳（お持ちの方）、診療情報提供書（紹介状）があればご持参ください。また、問診票を事前にご記入いただけると受付がスムーズです。' },
        { q: 'Q. 診察にはどれくらい時間がかかりますか？', a: 'A. 症状や混雑状況によりますが、目安として30分〜1時間程度です。事前に混雑状況をお問い合わせいただくことをお勧めします。' },
        { q: 'Q. インフルエンザの予防接種はいつから受けられますか？', a: 'A. 例年10月中旬頃から接種を開始します。予約受付は9月末から行っておりますので、詳しくはお知らせをご確認ください。' },
        { q: 'Q. 健康診断はどのような内容がありますか？', a: 'A. 一般的な健康診断から生活習慣病予防検診まで対応しております。採血、尿検査、心電図、胸部レントゲンなどが含まれます。詳しくはスタッフまでお問い合わせください。' },
        { q: 'Q. 子どもの予防接種も対応していますか？', a: 'A. 当院では、小児用の予防接種（例：MRワクチン、ヒブワクチンなど）も実施しております。スケジュールについてはお問い合わせください。' },
        { q: 'Q. 支払いにクレジットカードは使えますか？', a: 'A. はい、当院では現金、クレジットカード（一部カードを除く）、電子マネーに対応しております。詳しくは受付にてお尋ねください。' },
        { q: 'Q. 医療費控除に必要な領収書を再発行してもらえますか？', a: 'A. はい、再発行可能です。ただし、再発行には日数をいただく場合がありますのでご了承ください。' },
        { q: 'Q. 駐車場はありますか？', a: 'A. はい、当院専用の無料駐車場が10台分ございます。満車の場合は近隣のコインパーキングをご利用ください。' },
        { q: 'Q. 車椅子での利用は可能ですか？', a: 'A. 可能です。エントランスはバリアフリー設計となっており、スロープもご用意しております。また、院内には車椅子で移動可能なスペースを確保しています。' },
        { q: 'Q. 院内でWi-Fiは使えますか？', a: 'A. はい、当院では無料Wi-Fiを提供しております。パスワードは受付でお知らせいたします。' },
      ],
      faqFallback: [
        '診療は予約制ですか？ - 一般診療は予約なしでも受け付けていますが、予約優先制となっております。予防接種や健康診断などは完全予約制です。お電話またはWeb予約をご利用ください。',
        '初診時に必要なものは何ですか？ - 健康保険証、お薬手帳（お持ちの方）、診療情報提供書（紹介状）があればご持参ください。また、問診票を事前にご記入いただけると受付がスムーズです。',
        '診察にはどれくらい時間がかかりますか？ - 症状や混雑状況によりますが、目安として30分〜1時間程度です。事前に混雑状況をお問い合わせいただくことをお勧めします。',
        'インフルエンザの予防接種はいつから受けられますか？ - 例年10月中旬頃から接種を開始します。予約受付は9月末から行っておりますので、詳しくはお知らせをご確認ください。',
        '健康診断はどのような内容がありますか？ - 一般的な健康診断から生活習慣病予防検診まで対応しております。採血、尿検査、心電図、胸部レントゲンなどが含まれます。詳しくはスタッフまでお問い合わせください。',
        '子どもの予防接種も対応していますか？ - 当院では、小児用の予防接種（例：MRワクチン、ヒブワクチンなど）も実施しております。スケジュールについてはお問い合わせください。',
        '支払いにクレジットカードは使えますか？ - はい、当院では現金、クレジットカード（一部カードを除く）、電子マネーに対応しております。詳しくは受付にてお尋ねください。',
        '医療費控除に必要な領収書を再発行してもらえますか？ - はい、再発行可能です。ただし、再発行には日数をいただく場合がありますのでご了承ください。',
        '駐車場はありますか？ - はい、当院専用の無料駐車場が10台分ございます。満車の場合は近隣のコインパーキングをご利用ください。',
        '車椅子での利用は可能ですか？ - 可能です。エントランスはバリアフリー設計となっており、スロープもご用意しております。また、院内には車椅子で移動可能なスペースを確保しています。',
        '院内でWi-Fiは使えますか？ - はい、当院では無料Wi-Fiを提供しております。パスワードは受付でお知らせいたします。',
      ],
    },
    en: {
      titleAlt: 'FAQ',
      eyebrow: 'FAQ',
      lead: 'We have gathered frequently asked questions about our clinic. If you have any other concerns, please feel free to contact our staff.',
      nav: ['About treatment', 'Vaccinations / checkups', 'Payments', 'Other'],
      sections: ['About treatment', 'Vaccinations / checkups', 'Payments', 'Other'],
      note: 'If you have any other questions or need more details, please feel free to contact our staff.',
      faqItems: [
        { q: 'Q. Is an appointment required for treatment?', a: 'A. General treatment is accepted without an appointment, but appointments are given priority. Vaccinations and health checkups require a reservation. Please use phone or online booking.' },
        { q: 'Q. What do I need to bring for my first visit?', a: 'A. Please bring your health insurance card, medication notebook (if you have one), and referral letter (if you have one). Filling out the questionnaire in advance also helps speed up check-in.' },
        { q: 'Q. How long does an examination take?', a: 'A. It depends on your symptoms and how busy we are, but generally 30 minutes to 1 hour. We recommend checking how busy we are in advance.' },
        { q: 'Q. When can I get a flu vaccination?', a: 'A. Vaccinations typically begin in mid-October each year. Reservations open from the end of September, so please check our news page for details.' },
        { q: 'Q. What does the health checkup include?', a: 'A. We offer everything from general health checkups to lifestyle disease prevention screenings, including blood tests, urine tests, electrocardiograms, and chest X-rays. Please contact our staff for details.' },
        { q: 'Q. Do you offer vaccinations for children?', a: 'A. Yes, we offer pediatric vaccinations (such as MR and Hib vaccines). Please contact us for scheduling.' },
        { q: 'Q. Can I pay by credit card?', a: 'A. Yes, we accept cash, credit cards (excluding some cards), and electronic payment. Please ask at reception for details.' },
        { q: 'Q. Can you reissue a receipt needed for a medical expense deduction?', a: 'A. Yes, we can reissue receipts. Please note that reissuing may take a few days.' },
        { q: 'Q. Is parking available?', a: 'A. Yes, we have 10 free parking spaces exclusively for our clinic. If full, please use a nearby paid parking lot.' },
        { q: 'Q. Can I visit in a wheelchair?', a: 'A. Yes. Our entrance is barrier-free with a ramp, and we have space inside the clinic for wheelchair access.' },
        { q: 'Q. Is Wi-Fi available in the clinic?', a: 'A. Yes, we offer free Wi-Fi. Please ask at reception for the password.' },
      ],
      faqFallback: [
        'Is an appointment required for treatment? - General treatment is accepted without an appointment, but appointments are given priority. Vaccinations and health checkups require a reservation. Please use phone or online booking.',
        'What do I need to bring for my first visit? - Please bring your health insurance card, medication notebook (if you have one), and referral letter (if you have one). Filling out the questionnaire in advance also helps speed up check-in.',
        'How long does an examination take? - It depends on your symptoms and how busy we are, but generally 30 minutes to 1 hour. We recommend checking how busy we are in advance.',
        'When can I get a flu vaccination? - Vaccinations typically begin in mid-October each year. Reservations open from the end of September, so please check our news page for details.',
        'What does the health checkup include? - We offer everything from general health checkups to lifestyle disease prevention screenings, including blood tests, urine tests, electrocardiograms, and chest X-rays. Please contact our staff for details.',
        'Do you offer vaccinations for children? - Yes, we offer pediatric vaccinations (such as MR and Hib vaccines). Please contact us for scheduling.',
        'Can I pay by credit card? - Yes, we accept cash, credit cards (excluding some cards), and electronic payment. Please ask at reception for details.',
        'Can you reissue a receipt needed for a medical expense deduction? - Yes, we can reissue receipts. Please note that reissuing may take a few days.',
        'Is parking available? - Yes, we have 10 free parking spaces exclusively for our clinic. If full, please use a nearby paid parking lot.',
        'Can I visit in a wheelchair? - Yes. Our entrance is barrier-free with a ramp, and we have space inside the clinic for wheelchair access.',
        'Is Wi-Fi available in the clinic? - Yes, we offer free Wi-Fi. Please ask at reception for the password.',
      ],
    },
    'zh-tw': {
      titleAlt: '常見問題',
      eyebrow: 'FAQ',
      lead: '我們整理了關於本院的常見問題。若您還有其他疑問，歡迎隨時洽詢工作人員。',
      nav: ['關於診療', '預防接種・健康檢查', '付款方式', '其他'],
      sections: ['關於診療', '預防接種・健康檢查', '付款方式', '其他'],
      note: '若有其他問題或需要更詳細的說明，歡迎隨時洽詢工作人員。',
      faqItems: [
        { q: 'Q. 看診需要預約嗎？', a: 'A. 一般診療即使沒有預約也能看診，但採預約優先制。預防接種與健康檢查則為完全預約制。請透過電話或網路預約。' },
        { q: 'Q. 初診時需要攜帶什麼物品？', a: 'A. 請攜帶健保卡、藥歷手冊（如有）、診療資訊提供書（轉診單，如有）。若能事先填寫問診表，也能讓報到手續更順暢。' },
        { q: 'Q. 看診大約需要多久時間？', a: 'A. 依症狀與門診擁擠程度而異，大致上約30分鐘至1小時。建議您事先致電詢問門診狀況。' },
        { q: 'Q. 流感疫苗什麼時候開始接種？', a: 'A. 每年大約自10月中旬開始接種，預約自9月底開始受理，詳情請參閱最新消息。' },
        { q: 'Q. 健康檢查包含哪些項目？', a: 'A. 我們提供從一般健康檢查到生活習慣病預防檢查等服務，項目包含抽血、尿液檢查、心電圖、胸部X光等。詳情請洽詢工作人員。' },
        { q: 'Q. 是否提供兒童預防接種？', a: 'A. 本院有提供兒童用預防接種（如：MMR疫苗、b型嗜血桿菌疫苗等）。詳細時程請洽詢本院。' },
        { q: 'Q. 是否可以使用信用卡付款？', a: 'A. 是的，本院支援現金、信用卡（部分卡別除外）及電子支付。詳情請於櫃檯洽詢。' },
        { q: 'Q. 可以補發醫療費控除所需的收據嗎？', a: 'A. 可以補發，但補發可能需要數天時間，敬請見諒。' },
        { q: 'Q. 是否設有停車場？', a: 'A. 是的，本院設有專用免費停車場，共10個車位。若已停滿，請利用附近的付費停車場。' },
        { q: 'Q. 可以使用輪椅就診嗎？', a: 'A. 可以。入口採無障礙設計並設有斜坡，院內也備有輪椅可通行的空間。' },
        { q: 'Q. 院內可以使用Wi-Fi嗎？', a: 'A. 是的，本院提供免費Wi-Fi，密碼請於櫃檯詢問。' },
      ],
      faqFallback: [
        '看診需要預約嗎？ - 一般診療即使沒有預約也能看診，但採預約優先制。預防接種與健康檢查則為完全預約制。請透過電話或網路預約。',
        '初診時需要攜帶什麼物品？ - 請攜帶健保卡、藥歷手冊（如有）、診療資訊提供書（轉診單，如有）。若能事先填寫問診表，也能讓報到手續更順暢。',
        '看診大約需要多久時間？ - 依症狀與門診擁擠程度而異，大致上約30分鐘至1小時。建議您事先致電詢問門診狀況。',
        '流感疫苗什麼時候開始接種？ - 每年大約自10月中旬開始接種，預約自9月底開始受理，詳情請參閱最新消息。',
        '健康檢查包含哪些項目？ - 我們提供從一般健康檢查到生活習慣病預防檢查等服務，項目包含抽血、尿液檢查、心電圖、胸部X光等。詳情請洽詢工作人員。',
        '是否提供兒童預防接種？ - 本院有提供兒童用預防接種（如：MMR疫苗、b型嗜血桿菌疫苗等）。詳細時程請洽詢本院。',
        '是否可以使用信用卡付款？ - 是的，本院支援現金、信用卡（部分卡別除外）及電子支付。詳情請於櫃檯洽詢。',
        '可以補發醫療費控除所需的收據嗎？ - 可以補發，但補發可能需要數天時間，敬請見諒。',
        '是否設有停車場？ - 是的，本院設有專用免費停車場，共10個車位。若已停滿，請利用附近的付費停車場。',
        '可以使用輪椅就診嗎？ - 可以。入口採無障礙設計並設有斜坡，院內也備有輪椅可通行的空間。',
        '院內可以使用Wi-Fi嗎？ - 是的，本院提供免費Wi-Fi，密碼請於櫃檯詢問。',
      ],
    },
    'zh-cn': {
      titleAlt: '常见问题',
      eyebrow: 'FAQ',
      lead: '我们整理了关于本院的常见问题。如您还有其他疑问，欢迎随时咨询工作人员。',
      nav: ['关于诊疗', '预防接种・健康检查', '付款方式', '其他'],
      sections: ['关于诊疗', '预防接种・健康检查', '付款方式', '其他'],
      note: '如有其他问题或需要更详细的说明，欢迎随时咨询工作人员。',
      faqItems: [
        { q: 'Q. 就诊需要预约吗？', a: 'A. 一般诊疗即使没有预约也可就诊，但采取预约优先制。预防接种与健康检查则为完全预约制。请通过电话或网络预约。' },
        { q: 'Q. 初诊时需要携带什么物品？', a: 'A. 请携带医保卡、用药手册（如有）、诊疗信息提供书（转诊单，如有）。若能提前填写问诊表，也能让就诊手续更顺畅。' },
        { q: 'Q. 看诊大约需要多长时间？', a: 'A. 视症状与门诊拥挤程度而定，大致约30分钟至1小时。建议您提前致电询问门诊情况。' },
        { q: 'Q. 流感疫苗什么时候开始接种？', a: 'A. 每年一般从10月中旬开始接种，预约自9月底开始受理，详情请查看最新消息。' },
        { q: 'Q. 健康检查包含哪些内容？', a: 'A. 我们提供从一般健康检查到生活习惯病预防检查等服务，项目包含抽血、尿液检查、心电图、胸部X光等。详情请咨询工作人员。' },
        { q: 'Q. 是否提供儿童预防接种？', a: 'A. 本院有提供儿童用预防接种（如：MMR疫苗、b型流感嗜血杆菌疫苗等）。具体时间请咨询本院。' },
        { q: 'Q. 可以使用信用卡付款吗？', a: 'A. 可以，本院支持现金、信用卡（部分卡种除外）及电子支付。详情请在前台咨询。' },
        { q: 'Q. 可以补办医疗费扣除所需的收据吗？', a: 'A. 可以补办，但补办可能需要数天时间，敬请谅解。' },
        { q: 'Q. 是否设有停车场？', a: 'A. 是的，本院设有专用免费停车场，共10个车位。如已停满，请使用附近的收费停车场。' },
        { q: 'Q. 可以使用轮椅就诊吗？', a: 'A. 可以。入口采用无障碍设计并设有坡道，院内也备有轮椅可通行的空间。' },
        { q: 'Q. 院内可以使用Wi-Fi吗？', a: 'A. 可以，本院提供免费Wi-Fi，密码请在前台询问。' },
      ],
      faqFallback: [
        '就诊需要预约吗？ - 一般诊疗即使没有预约也可就诊，但采取预约优先制。预防接种与健康检查则为完全预约制。请通过电话或网络预约。',
        '初诊时需要携带什么物品？ - 请携带医保卡、用药手册（如有）、诊疗信息提供书（转诊单，如有）。若能提前填写问诊表，也能让就诊手续更顺畅。',
        '看诊大约需要多长时间？ - 视症状与门诊拥挤程度而定，大致约30分钟至1小时。建议您提前致电询问门诊情况。',
        '流感疫苗什么时候开始接种？ - 每年一般从10月中旬开始接种，预约自9月底开始受理，详情请查看最新消息。',
        '健康检查包含哪些内容？ - 我们提供从一般健康检查到生活习惯病预防检查等服务，项目包含抽血、尿液检查、心电图、胸部X光等。详情请咨询工作人员。',
        '是否提供儿童预防接种？ - 本院有提供儿童用预防接种（如：MMR疫苗、b型流感嗜血杆菌疫苗等）。具体时间请咨询本院。',
        '可以使用信用卡付款吗？ - 可以，本院支持现金、信用卡（部分卡种除外）及电子支付。详情请在前台咨询。',
        '可以补办医疗费扣除所需的收据吗？ - 可以补办，但补办可能需要数天时间，敬请谅解。',
        '是否设有停车场？ - 是的，本院设有专用免费停车场，共10个车位。如已停满，请使用附近的收费停车场。',
        '可以使用轮椅就诊吗？ - 可以。入口采用无障碍设计并设有坡道，院内也备有轮椅可通行的空间。',
        '院内可以使用Wi-Fi吗？ - 可以，本院提供免费Wi-Fi，密码请在前台询问。',
      ],
    },
    ko: {
      titleAlt: '자주 묻는 질문',
      eyebrow: 'FAQ',
      lead: '저희 병원에 대한 자주 묻는 질문을 정리했습니다. 그 밖의 궁금한 점이 있으시면 언제든지 직원에게 문의해 주세요.',
      nav: ['진료 관련', '예방접종·건강검진', '결제 관련', '기타'],
      sections: ['진료 관련', '예방접종·건강검진', '결제 관련', '기타'],
      note: '그 밖의 질문이나 자세한 내용은 언제든지 직원에게 문의해 주세요.',
      faqItems: [
        { q: 'Q. 진료는 예약제인가요?', a: 'A. 일반 진료는 예약 없이도 접수 가능하지만, 예약이 우선됩니다. 예방접종이나 건강검진 등은 완전 예약제입니다. 전화 또는 온라인 예약을 이용해 주세요.' },
        { q: 'Q. 초진 시 필요한 것은 무엇인가요?', a: 'A. 건강보험증, 약수첩(소지하신 분), 진료정보제공서(소개장)가 있으시면 지참해 주세요. 또한 문진표를 미리 작성해 주시면 접수가 원활합니다.' },
        { q: 'Q. 진료는 얼마나 걸리나요?', a: 'A. 증상이나 혼잡 상황에 따라 다르지만, 대략 30분~1시간 정도입니다. 사전에 혼잡 상황을 문의하시는 것을 권장합니다.' },
        { q: 'Q. 독감 예방접종은 언제부터 받을 수 있나요?', a: 'A. 매년 10월 중순경부터 접종을 시작합니다. 예약 접수는 9월 말부터 진행하므로 자세한 내용은 공지사항을 확인해 주세요.' },
        { q: 'Q. 건강검진은 어떤 내용인가요?', a: 'A. 일반 건강검진부터 생활습관병 예방검진까지 대응하고 있습니다. 채혈, 소변검사, 심전도, 흉부 엑스레이 등이 포함됩니다. 자세한 내용은 직원에게 문의해 주세요.' },
        { q: 'Q. 어린이 예방접종도 가능한가요?', a: 'A. 저희 병원에서는 소아용 예방접종(예: MMR백신, Hib백신 등)도 실시하고 있습니다. 일정은 문의해 주세요.' },
        { q: 'Q. 신용카드로 결제할 수 있나요?', a: 'A. 네, 저희 병원에서는 현금, 신용카드(일부 카드 제외), 전자화폐를 이용하실 수 있습니다. 자세한 내용은 접수처에서 문의해 주세요.' },
        { q: 'Q. 의료비 공제에 필요한 영수증을 재발급받을 수 있나요?', a: 'A. 네, 재발급 가능합니다. 다만 재발급에는 며칠 소요될 수 있으니 양해 부탁드립니다.' },
        { q: 'Q. 주차장이 있나요?', a: 'A. 네, 저희 병원 전용 무료 주차장이 10대분 마련되어 있습니다. 만차 시에는 인근 유료 주차장을 이용해 주세요.' },
        { q: 'Q. 휠체어로 이용 가능한가요?', a: 'A. 가능합니다. 입구는 배리어프리 설계로 되어 있으며 경사로도 마련되어 있습니다. 원내에도 휠체어로 이동 가능한 공간을 확보하고 있습니다.' },
        { q: 'Q. 원내에서 Wi-Fi를 사용할 수 있나요?', a: 'A. 네, 저희 병원에서는 무료 Wi-Fi를 제공하고 있습니다. 비밀번호는 접수처에서 안내해 드립니다.' },
      ],
      faqFallback: [
        '진료는 예약제인가요? - 일반 진료는 예약 없이도 접수 가능하지만, 예약이 우선됩니다. 예방접종이나 건강검진 등은 완전 예약제입니다. 전화 또는 온라인 예약을 이용해 주세요.',
        '초진 시 필요한 것은 무엇인가요? - 건강보험증, 약수첩(소지하신 분), 진료정보제공서(소개장)가 있으시면 지참해 주세요. 또한 문진표를 미리 작성해 주시면 접수가 원활합니다.',
        '진료는 얼마나 걸리나요? - 증상이나 혼잡 상황에 따라 다르지만, 대략 30분~1시간 정도입니다. 사전에 혼잡 상황을 문의하시는 것을 권장합니다.',
        '독감 예방접종은 언제부터 받을 수 있나요? - 매년 10월 중순경부터 접종을 시작합니다. 예약 접수는 9월 말부터 진행하므로 자세한 내용은 공지사항을 확인해 주세요.',
        '건강검진은 어떤 내용인가요? - 일반 건강검진부터 생활습관병 예방검진까지 대응하고 있습니다. 채혈, 소변검사, 심전도, 흉부 엑스레이 등이 포함됩니다. 자세한 내용은 직원에게 문의해 주세요.',
        '어린이 예방접종도 가능한가요? - 저희 병원에서는 소아용 예방접종(예: MMR백신, Hib백신 등)도 실시하고 있습니다. 일정은 문의해 주세요.',
        '신용카드로 결제할 수 있나요? - 네, 저희 병원에서는 현금, 신용카드(일부 카드 제외), 전자화폐를 이용하실 수 있습니다. 자세한 내용은 접수처에서 문의해 주세요.',
        '의료비 공제에 필요한 영수증을 재발급받을 수 있나요? - 네, 재발급 가능합니다. 다만 재발급에는 며칠 소요될 수 있으니 양해 부탁드립니다.',
        '주차장이 있나요? - 네, 저희 병원 전용 무료 주차장이 10대분 마련되어 있습니다. 만차 시에는 인근 유료 주차장을 이용해 주세요.',
        '휠체어로 이용 가능한가요? - 가능합니다. 입구는 배리어프리 설계로 되어 있으며 경사로도 마련되어 있습니다. 원내에도 휠체어로 이동 가능한 공간을 확보하고 있습니다.',
        '원내에서 Wi-Fi를 사용할 수 있나요? - 네, 저희 병원에서는 무료 Wi-Fi를 제공하고 있습니다. 비밀번호는 접수처에서 안내해 드립니다.',
      ],
    },
  };
  const map = translations[languageKey] || translations.ja;
  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.innerHTML = value;
    });
  };
  const setPlainText = (selector, value) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  };

  document.querySelectorAll('.faq-nav__item').forEach((item, index) => {
    const label = item.querySelector('.faq-nav__label');
    if (label && map.nav[index]) label.textContent = map.nav[index];
  });
  if (getCurrentPageKey() === 'faq') {
    setPlainText('.subpage-hero__eyebrow--page-logo', map.eyebrow);
    setText('.subpage-hero__lead--faq', map.lead);
  }
  const sections = document.querySelectorAll('.faq-stack > .page-card > h2');
  sections.forEach((section, index) => {
    if (map.sections[index]) section.textContent = map.sections[index];
  });
  document.querySelectorAll('.faq-note').forEach((note) => {
    note.textContent = map.note;
  });
  document.querySelectorAll('.faq-item').forEach((item, index) => {
    const data = map.faqItems[index];
    if (!data) return;
    const question = item.querySelector('.faq-item__question-text');
    const answer = item.querySelector('.faq-item__answer-inner p');
    if (question) question.textContent = data.q;
    if (answer) answer.textContent = data.a;
  });
  document.querySelectorAll('main noscript li').forEach((item, index) => {
    if (map.faqFallback[index]) item.textContent = map.faqFallback[index];
  });
  const fallbackHeading = document.querySelector('main noscript h3');
  if (fallbackHeading) fallbackHeading.textContent = map.titleAlt;
}

function applyContactTranslations(languageKey) {
  const translations = {
    ja: {
      titleAlt: '予約・お問い合わせ',
      eyebrow: 'Contact',
      heroLead: 'ご予約やお問い合わせは、以下のフォーム項目をご確認のうえご連絡ください。',
      lead: 'ご予約やお問い合わせは、以下のフォーム項目をご確認のうえご連絡ください。',
      notice: '診療に関するご質問につきましては、まずよくあるご質問をご確認ください。',
      noticeLink: '▶ よくあるご質問はこちらから',
      instruction: '必要情報を入力後「送信する」ボタンをクリックしてください。',
      toggle: 'お問い合わせ種別の選択',
      toggleButtons: ['診療を予約する', 'お問い合わせをする'],
      fallbackHeading: 'お問い合わせ種別について',
      fallbackBody: 'JavaScriptを無効にしている場合も、下の選択欄で「予約」または「お問い合わせ」を選べます。必要に応じて内容をご入力ください。',
      typeLabel: 'お問い合わせ種別',
      typeOption: '―以下から選択してください―',
      typeOptions: ['予約', 'お問い合わせ'],
      nameLabel: '氏名',
      kanaLabel: 'フリガナ',
      telLabel: '電話番号',
      emailLabel: 'メールアドレス',
      emailConfirmLabel: 'メールアドレス（確認）',
      messageLabel: 'お問い合わせ内容',
      namePlaceholder: '佐藤 太郎',
      placeholderMessage: '診療内容など、具体的な内容のご記入をお願いいたします。',
      submit: '送信する',
      guidanceHeading: 'ご案内',
      guidanceList: ['診療時間：午前　9:00〜12:00　／　午後　13:00〜18:00', '受付時間：午前　8:00〜11:00　／　午後　12:00〜17:00', '電話番号：00-0000-0000', 'メール：info@sato-clinic-test.jp'],
      guidanceNote: 'フォームは公開前のモックです。正式運用時には送信先設定を行います。',
    },
    en: {
      titleAlt: 'Reservations / Contact',
      eyebrow: 'Contact',
      heroLead: 'Please check the form fields below before making a reservation or inquiry.',
      lead: 'Please review the form items below before making a reservation or inquiry.',
      notice: 'If you have questions about medical care, please first check the FAQ.',
      noticeLink: '▶ Go to the FAQ',
      instruction: 'After entering the required information, click the "Send" button.',
      toggle: 'Select contact type',
      toggleButtons: ['Reserve a visit', 'Make an inquiry'],
      fallbackHeading: 'About the contact type',
      fallbackBody: 'If JavaScript is disabled, you can still choose either "Reservation" or "Inquiry" in the select box below.',
      typeLabel: 'Contact type',
      typeOption: '-- Please select --',
      typeOptions: ['Reservation', 'Inquiry'],
      nameLabel: 'Name',
      kanaLabel: 'Name in katakana',
      telLabel: 'Phone number',
      emailLabel: 'Email address',
      emailConfirmLabel: 'Email address (confirm)',
      messageLabel: 'Inquiry details',
      namePlaceholder: 'Taro Sato',
      placeholderMessage: 'Please enter specific details such as symptoms or questions.',
      submit: 'Send',
      guidanceHeading: 'Guidance',
      guidanceList: ['Consultation hours: Morning 9:00-12:00 / Afternoon 13:00-18:00', 'Reception hours: Morning 8:00-11:00 / Afternoon 12:00-17:00', 'Phone: 00-0000-0000', 'Email: info@sato-clinic-test.jp'],
      guidanceNote: 'This form is a pre-release mock. A sending destination will be set up for the official release.',
    },
    'zh-tw': {
      titleAlt: '預約・聯絡我們',
      eyebrow: 'Contact',
      heroLead: '請先確認下列表單項目，再進行預約或聯絡。',
      lead: '請先確認下列表單項目，再進行預約或聯絡。',
      notice: '若有關於診療的問題，請先查看常見問題。',
      noticeLink: '▶ 前往常見問題',
      instruction: '輸入必要資訊後，請點選「送出」按鈕。',
      toggle: '選擇聯絡種類',
      toggleButtons: ['預約就診', '聯絡我們'],
      fallbackHeading: '關於聯絡種類',
      fallbackBody: '若 JavaScript 停用，您仍可在下方選單選擇「預約」或「聯絡我們」。',
      typeLabel: '聯絡種類',
      typeOption: '―請從下列選擇―',
      typeOptions: ['預約', '聯絡我們'],
      nameLabel: '姓名',
      kanaLabel: '片假名',
      telLabel: '電話號碼',
      emailLabel: '電子郵件',
      emailConfirmLabel: '電子郵件（確認）',
      messageLabel: '聯絡內容',
      namePlaceholder: '佐藤 太郎',
      placeholderMessage: '請填寫具體內容，例如症狀等。',
      submit: '送出',
      guidanceHeading: '說明',
      guidanceList: ['診療時間：上午 9:00〜12:00 ／ 下午 13:00〜18:00', '受理時間：上午 8:00〜11:00 ／ 下午 12:00〜17:00', '電話號碼：00-0000-0000', '電子郵件：info@sato-clinic-test.jp'],
      guidanceNote: '此表單為公開前的模擬版。正式上線時將設定送出目的地。',
    },
    'zh-cn': {
      titleAlt: '预约・联系我们',
      eyebrow: 'Contact',
      heroLead: '请先确认下列表单项目，再进行预约或联系。',
      lead: '请先确认下列表单项目，再进行预约或联系。',
      notice: '如果有关于诊疗的问题，请先查看常见问题。',
      noticeLink: '▶ 前往常见问题',
      instruction: '输入必要信息后，请点击“发送”按钮。',
      toggle: '选择联系种类',
      toggleButtons: ['预约就诊', '联系我们'],
      fallbackHeading: '关于联系种类',
      fallbackBody: '如果 JavaScript 被禁用，您仍可在下方选择“预约”或“联系我们”。',
      typeLabel: '联系种类',
      typeOption: '―请从下列选择―',
      typeOptions: ['预约', '联系我们'],
      nameLabel: '姓名',
      kanaLabel: '片假名',
      telLabel: '电话号码',
      emailLabel: '电子邮件',
      emailConfirmLabel: '电子邮件（确认）',
      messageLabel: '联系内容',
      namePlaceholder: '佐藤 太郎',
      placeholderMessage: '请填写具体内容，例如症状等。',
      submit: '发送',
      guidanceHeading: '说明',
      guidanceList: ['诊疗时间：上午 9:00〜12:00 ／ 下午 13:00〜18:00', '受理时间：上午 8:00〜11:00 ／ 下午 12:00〜17:00', '电话号码：00-0000-0000', '电子邮件：info@sato-clinic-test.jp'],
      guidanceNote: '此表单为公开前的模拟版。正式上线时将设置发送目的地。',
    },
    ko: {
      titleAlt: '예약·문의',
      eyebrow: 'Contact',
      heroLead: '예약이나 문의를 하시기 전에 아래 입력 항목을 확인해 주세요.',
      lead: '예약이나 문의를 하시기 전에 아래 입력 항목을 확인해 주세요.',
      notice: '진료 관련 질문은 먼저 자주 묻는 질문을 확인해 주세요.',
      noticeLink: '▶ 자주 묻는 질문 보기',
      instruction: '필수 정보를 입력한 뒤 "보내기" 버튼을 눌러 주세요.',
      toggle: '문의 유형 선택',
      toggleButtons: ['진료 예약', '문의하기'],
      fallbackHeading: '문의 유형 안내',
      fallbackBody: 'JavaScript를 비활성화해도 아래 선택 항목에서 “예약” 또는 “문의”를 선택할 수 있습니다.',
      typeLabel: '문의 유형',
      typeOption: '―아래에서 선택해 주세요―',
      typeOptions: ['예약', '문의'],
      nameLabel: '이름',
      kanaLabel: '가타카나',
      telLabel: '전화번호',
      emailLabel: '이메일 주소',
      emailConfirmLabel: '이메일 주소(확인)',
      messageLabel: '문의 내용',
      namePlaceholder: '사토 타로',
      placeholderMessage: '증상 등 구체적인 내용을 적어 주세요.',
      submit: '보내기',
      guidanceHeading: '안내',
      guidanceList: ['진료시간: 오전 9:00〜12:00 ／ 오후 13:00〜18:00', '접수시간: 오전 8:00〜11:00 ／ 오후 12:00〜17:00', '전화번호: 00-0000-0000', '이메일: info@sato-clinic-test.jp'],
      guidanceNote: '이 폼은 공개 전 목업입니다. 정식 공개 시 전송 대상이 설정됩니다.',
    },
  };
  const map = translations[languageKey] || translations.ja;
  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.innerHTML = value;
    });
  };
  const setPlainText = (selector, value) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  };

  if (getCurrentPageKey() === 'contact') {
    setPlainText('.subpage-hero__eyebrow--page-logo', map.eyebrow);
    setText('.subpage-hero__lead--contact', map.heroLead || map.lead);
  }
  setText('.contact-notice p', map.notice);
  setPlainText('.contact-notice__link', map.noticeLink);
  setPlainText('.contact-instruction', map.instruction);
  const toggleGroup = document.querySelector('.contact-type-toggle');
  if (toggleGroup) toggleGroup.setAttribute('aria-label', map.toggle);
  const toggleButtons = document.querySelectorAll('.contact-type-toggle__button');
  if (toggleButtons[0]) toggleButtons[0].lastChild.textContent = map.toggleButtons[0];
  if (toggleButtons[1]) toggleButtons[1].lastChild.textContent = map.toggleButtons[1];
  const fallbackHeading = document.querySelector('.contact-card noscript h3');
  if (fallbackHeading) fallbackHeading.textContent = map.fallbackHeading;
  const fallbackBody = document.querySelector('.contact-card noscript p');
  if (fallbackBody) fallbackBody.textContent = map.fallbackBody;
  const labels = {
    type: map.typeLabel,
    name: map.nameLabel,
    kana: map.kanaLabel,
    tel: map.telLabel,
    email: map.emailLabel,
    'email-confirm': map.emailConfirmLabel,
    message: map.messageLabel,
  };
  Object.entries(labels).forEach(([key, label]) => {
    const wrapper = document.querySelector(`.inquiry-form__field[data-field="${key}"] > span`);
    if (!wrapper) return;
    const textNode = Array.from(wrapper.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
    if (textNode) {
      textNode.textContent = label;
    }
  });
  const typeSelect = document.querySelector('#contact-type-select');
  if (typeSelect) {
    typeSelect.options[0].textContent = map.typeOption;
    if (typeSelect.options[1] && map.typeOptions[0]) typeSelect.options[1].textContent = map.typeOptions[0];
    if (typeSelect.options[2] && map.typeOptions[1]) typeSelect.options[2].textContent = map.typeOptions[1];
  }
  const message = document.querySelector('textarea[name="message"]');
  if (message) message.setAttribute('placeholder', map.placeholderMessage);
  const nameField = document.querySelector('input[name="name"]');
  if (nameField) nameField.setAttribute('placeholder', map.namePlaceholder);
  setPlainText('.inquiry-form__submit', map.submit);
  setPlainText('#guidance h2', map.guidanceHeading);
  const guidanceItems = document.querySelectorAll('#guidance .page-card__list li');
  guidanceItems.forEach((item, index) => {
    if (map.guidanceList[index]) item.textContent = map.guidanceList[index];
  });
  setPlainText('#guidance > p', map.guidanceNote);
}

function applyMedicalTranslations(languageKey) {
  if (getCurrentPageKey() !== 'medical') return;

  const translations = {
    ja: {
      intro: '当院では、地域の皆様の健康を支えるため、幅広い内科診療を行っております。<br>日常的な体調管理から、各種の検査や治療に至るまで、どんなお悩みもお気軽にご相談ください。',
      cards: [
        { heading: '一般内科診療', body: '風邪や発熱、喉の痛み、頭痛、腹痛などの症状を中心に、一般的な体調不良の診療を行っています。また、原因不明の不調や軽い症状であっても、早期診断に努めております。' },
        { heading: '生活習慣病の診断・治療', body: '高血圧症、糖尿病、脂質異常症（高コレステロール血症）、メタボリック症候群など、生活習慣病の診断と治療を行います。病気の進行を予防し、健康維持のための生活指導や薬物療法を行います。' },
        { heading: '消化器系の診療', body: '胃痛、胃もたれ、胸やけ、便秘、下痢などの消化器系の不調に対応しています。必要に応じて胃カメラや超音波検査などを実施し、胃腸の健康をサポートします。' },
        { heading: '呼吸器系の診療', body: '咳、息切れ、胸の痛みなど、呼吸器系の症状について診療を行っています。季節性の喘息やアレルギー性鼻炎、慢性閉塞性肺疾患（COPD）などにも対応し、適切な治療と予防をサポートします。' },
        { heading: '健康診断・各種検査', body: '定期健康診断をはじめ、血液検査、尿検査、心電図、超音波検査、レントゲン検査などを行い、病気の早期発見と予防に努めます。異常が見つかった場合は、経過観察や専門治療へとつなげてまいります。' },
        { heading: '予防接種', body: 'インフルエンザや肺炎球菌などの各種予防接種を行っています。定期的な接種で感染予防と体調管理を支援いたします。予防接種は予約制となりますので、事前にお問い合わせください。' },
        { heading: '禁煙外来', body: '禁煙をご希望の方に、禁煙治療とサポートを行っています。必要に応じて、ニコチン依存症の治療薬を使用し、無理なく禁煙が継続できるようお手伝いいたします。' },
      ],
    },
    en: {
      intro: 'At our clinic, we provide a wide range of internal medicine services to support the health of our community.<br>Please feel free to consult us about anything, from daily health management to examinations and treatment.',
      cards: [
        { heading: 'General internal medicine', body: 'We treat everyday health concerns such as colds, fever, sore throat, headaches, and abdominal pain. We also strive for early diagnosis, even for minor symptoms or conditions with an unclear cause.' },
        { heading: 'Lifestyle disease care', body: 'We diagnose and treat lifestyle-related diseases such as hypertension, diabetes, dyslipidemia (high cholesterol), and metabolic syndrome. To help prevent disease progression and maintain your health, we provide lifestyle guidance and medication as needed.' },
        { heading: 'Digestive care', body: 'We treat digestive concerns such as stomach pain, indigestion, heartburn, constipation, and diarrhea. When necessary, we perform gastroscopy, ultrasound, and other examinations to support your digestive health.' },
        { heading: 'Respiratory care', body: 'We treat respiratory symptoms such as coughing, shortness of breath, and chest pain. We also support the treatment and prevention of seasonal asthma, allergic rhinitis, chronic obstructive pulmonary disease (COPD), and other conditions.' },
        { heading: 'Checkups / tests', body: 'In addition to regular health checkups, we perform blood tests, urine tests, electrocardiograms, ultrasound examinations, and X-rays to support the early detection and prevention of disease. If any abnormalities are found, we will arrange follow-up observation or referral to specialist care.' },
        { heading: 'Vaccinations', body: 'We offer a range of vaccinations, including for influenza and pneumococcus. Regular vaccination helps prevent infection and supports your overall health management. Vaccinations require a reservation, so please contact us in advance.' },
        { heading: 'Smoking cessation clinic', body: 'For those who wish to quit smoking, we provide treatment and support to help you succeed. When needed, we use medication for nicotine dependence to help you continue without excessive strain.' },
      ],
    },
    'zh-tw': {
      intro: '本院為了守護鄰里居民的健康，提供廣泛的內科診療。<br>從日常健康管理到各項檢查與治療，歡迎您隨時諮詢。',
      cards: [
        { heading: '一般內科診療', body: '針對感冒、發燒、喉嚨痛、頭痛、腹痛等症狀，提供一般身體不適的診療服務。即使是原因不明的不適或輕微症狀，我們也致力於早期診斷。' },
        { heading: '生活習慣病診斷・治療', body: '針對高血壓、糖尿病、血脂異常（高膽固醇血症）、代謝症候群等生活習慣病進行診斷與治療。為預防疾病惡化、維持健康，提供生活指導與藥物治療。' },
        { heading: '消化系診療', body: '因應胃痛、胃脹、胸口灼熱、便秘、腹瀉等消化系統不適症狀。視需要進行胃鏡檢查或超音波檢查等，守護您的腸胃健康。' },
        { heading: '呼吸系診療', body: '針對咳嗽、呼吸困難、胸痛等呼吸系統症狀提供診療。同時對季節性氣喘、過敏性鼻炎、慢性阻塞性肺病（COPD）等症狀提供適當的治療與預防支援。' },
        { heading: '健康檢查・各項檢驗', body: '提供定期健康檢查，以及血液檢查、尿液檢查、心電圖、超音波檢查、X光檢查等，致力於疾病的早期發現與預防。若發現異常，將協助安排後續追蹤或轉介專科治療。' },
        { heading: '預防接種', body: '提供流感、肺炎鏈球菌等各項預防接種服務。透過定期接種，協助預防感染並維持健康管理。預防接種採預約制，請事先與本院聯繫。' },
        { heading: '戒菸門診', body: '為有戒菸意願的患者提供戒菸治療與支援。視需要使用尼古丁依賴治療藥物，協助您無負擔地持續戒菸。' },
      ],
    },
    'zh-cn': {
      intro: '本院为了守护周边居民的健康，提供广泛的内科诊疗。<br>从日常健康管理到各类检查与治疗，欢迎随时咨询。',
      cards: [
        { heading: '一般内科诊疗', body: '针对感冒、发热、喉咙痛、头痛、腹痛等症状，提供一般身体不适的诊疗服务。即使是原因不明的不适或轻微症状，我们也致力于早期诊断。' },
        { heading: '生活习惯病诊断・治疗', body: '针对高血压、糖尿病、血脂异常（高胆固醇血症）、代谢综合征等生活习惯病进行诊断与治疗。为预防疾病恶化、维持健康，提供生活指导与药物治疗。' },
        { heading: '消化系统诊疗', body: '应对胃痛、胃胀、反酸烧心、便秘、腹泻等消化系统不适症状。视需要进行胃镜或超声检查等，守护您的肠胃健康。' },
        { heading: '呼吸系统诊疗', body: '针对咳嗽、气短、胸痛等呼吸系统症状提供诊疗。同时对季节性哮喘、过敏性鼻炎、慢性阻塞性肺病（COPD）等症状提供适当的治疗与预防支持。' },
        { heading: '健康检查・各项检查', body: '提供定期健康检查，以及血液检查、尿液检查、心电图、超声检查、X光检查等，致力于疾病的早期发现与预防。如发现异常，将协助安排后续观察或转诊专科治疗。' },
        { heading: '预防接种', body: '提供流感、肺炎球菌等各类预防接种服务。通过定期接种，帮助预防感染并维持健康管理。预防接种为预约制，请提前与本院联系。' },
        { heading: '戒烟门诊', body: '为有戒烟意愿的患者提供戒烟治疗与支持。视需要使用尼古丁依赖治疗药物，协助您轻松持续戒烟。' },
      ],
    },
    ko: {
      intro: '저희 병원은 지역 주민의 건강을 지키기 위해 폭넓은 내과 진료를 제공합니다.<br>일상적인 건강 관리부터 각종 검사와 치료까지 무엇이든 편하게 상담해 주세요.',
      cards: [
        { heading: '일반내과 진료', body: '감기, 발열, 인후통, 두통, 복통 등의 증상을 중심으로 일반적인 컨디션 난조에 대한 진료를 실시하고 있습니다. 원인을 알 수 없는 증상이나 가벼운 증상이라도 조기 진단에 힘쓰고 있습니다.' },
        { heading: '생활습관병 진단·치료', body: '고혈압, 당뇨병, 이상지질혈증(고콜레스테롤혈증), 대사증후군 등 생활습관병의 진단과 치료를 실시합니다. 질병의 진행을 예방하고 건강을 유지할 수 있도록 생활 지도와 약물 치료를 제공합니다.' },
        { heading: '소화기 진료', body: '위통, 속쓰림, 소화불량, 변비, 설사 등 소화기 관련 증상에 대응하고 있습니다. 필요에 따라 위내시경이나 초음파 검사 등을 실시하여 위장 건강을 지원합니다.' },
        { heading: '호흡기 진료', body: '기침, 숨가쁨, 흉통 등 호흡기 증상에 대한 진료를 실시하고 있습니다. 계절성 천식, 알레르기 비염, 만성폐쇄성폐질환(COPD) 등에도 대응하여 적절한 치료와 예방을 지원합니다.' },
        { heading: '건강검진·각종 검사', body: '정기 건강검진을 비롯해 혈액검사, 소변검사, 심전도, 초음파검사, X선 검사 등을 실시하여 질병의 조기 발견과 예방에 힘쓰고 있습니다. 이상이 발견될 경우 경과 관찰이나 전문 치료로 연계해 드립니다.' },
        { heading: '예방접종', body: '독감, 폐렴구균 등 각종 예방접종을 실시하고 있습니다. 정기적인 접종을 통해 감염 예방과 건강 관리를 지원합니다. 예방접종은 예약제로 운영되므로 사전에 문의해 주세요.' },
        { heading: '금연 외래', body: '금연을 원하시는 분께 금연 치료와 지원을 제공하고 있습니다. 필요에 따라 니코틴 의존증 치료제를 사용하여 무리 없이 금연을 지속할 수 있도록 돕습니다.' },
      ],
    },
  };

  const map = translations[languageKey] || translations.ja;

  const introEl = document.querySelector('.subpage-hero__lead--medical');
  if (introEl) introEl.innerHTML = map.intro;

  document.querySelectorAll('.medical-page-card__content').forEach((card, index) => {
    const data = map.cards[index];
    if (!data) return;
    const heading = card.querySelector('h2');
    const body = card.querySelector('p');
    if (heading) heading.textContent = `${index + 1}. ${data.heading}`;
    if (body) body.innerHTML = data.body;
  });
}

function getNewsTextMap(languageKey) {
  const translations = {
    ja: {
      titleAlt: 'お知らせ',
      eyebrow: 'News',
      archiveLabel: 'お知らせ一覧',
      archivePaginationLabel: 'お知らせページ切り替え',
      detailEyebrow: 'お知らせ',
      publishedLabel: '投稿日：',
      updatedLabel: '更新日：',
      loadingTitle: 'お知らせを読み込み中です',
      loadingBody: '記事内容を読み込み中です。',
      prevLabel: '前の記事',
      nextLabel: '次の記事',
      backLabel: 'お知らせ一覧へ',
      latestHeading: '最新のお知らせ',
      latestLink: 'お知らせ一覧へ',
      noArticles: '記事はありません',
    },
    en: {
      titleAlt: 'News',
      eyebrow: 'News',
      archiveLabel: 'News archive',
      archivePaginationLabel: 'News page navigation',
      detailEyebrow: 'News',
      publishedLabel: 'Published: ',
      updatedLabel: 'Updated: ',
      loadingTitle: 'Loading news',
      loadingBody: 'Loading article content.',
      prevLabel: 'Previous article',
      nextLabel: 'Next article',
      backLabel: 'Back to news archive',
      latestHeading: 'Latest news',
      latestLink: 'Back to news archive',
      noArticles: 'No articles available',
    },
    'zh-tw': {
      titleAlt: '最新消息',
      eyebrow: 'News',
      archiveLabel: '最新消息列表',
      archivePaginationLabel: '最新消息分頁切換',
      detailEyebrow: '最新消息',
      publishedLabel: '發佈日：',
      updatedLabel: '更新日：',
      loadingTitle: '最新消息載入中',
      loadingBody: '文章內容載入中。',
      prevLabel: '上一篇',
      nextLabel: '下一篇',
      backLabel: '回到最新消息列表',
      latestHeading: '最新消息',
      latestLink: '回到最新消息列表',
      noArticles: '沒有文章',
    },
    'zh-cn': {
      titleAlt: '最新消息',
      eyebrow: 'News',
      archiveLabel: '最新消息列表',
      archivePaginationLabel: '最新消息分页切换',
      detailEyebrow: '最新消息',
      publishedLabel: '发布日期：',
      updatedLabel: '更新日期：',
      loadingTitle: '最新消息加载中',
      loadingBody: '文章内容加载中。',
      prevLabel: '上一篇',
      nextLabel: '下一篇',
      backLabel: '返回最新消息列表',
      latestHeading: '最新消息',
      latestLink: '返回最新消息列表',
      noArticles: '没有文章',
    },
    ko: {
      titleAlt: '공지사항',
      eyebrow: 'News',
      archiveLabel: '공지사항 목록',
      archivePaginationLabel: '공지사항 페이지 전환',
      detailEyebrow: '공지사항',
      publishedLabel: '게시일: ',
      updatedLabel: '수정일: ',
      loadingTitle: '공지사항을 불러오는 중입니다',
      loadingBody: '게시글 내용을 불러오는 중입니다.',
      prevLabel: '이전 글',
      nextLabel: '다음 글',
      backLabel: '공지사항 목록으로',
      latestHeading: '최신 공지',
      latestLink: '공지사항 목록으로',
      noArticles: '글이 없습니다',
    },
  };
  return translations[languageKey] || translations.ja;
}

function applyNewsTranslations(languageKey) {
  const map = getNewsTextMap(languageKey);

  const titleImage = document.querySelector('.news-page-title-image img');
  if (titleImage) titleImage.alt = map.titleAlt;
  setPlainText('.subpage-hero__eyebrow--news-logo', map.eyebrow);
  const archiveList = document.querySelector('[data-news-archive-list]');
  if (archiveList) archiveList.setAttribute('aria-label', map.archiveLabel);
  const archivePagination = document.querySelector('[data-news-archive-pagination]');
  if (archivePagination) archivePagination.setAttribute('aria-label', map.archivePaginationLabel);
  setPlainText('.news-detail-page__eyebrow', map.detailEyebrow);
  document.querySelectorAll('.news-detail-page__meta').forEach((meta) => {
    const firstText = meta.firstChild;
    if (firstText && firstText.nodeType === Node.TEXT_NODE) {
      firstText.textContent = firstText.textContent.includes('更新日：') ? map.updatedLabel : map.publishedLabel;
    }
  });
  const titlePlaceholder = document.querySelector('[data-news-title]');
  if (titlePlaceholder && titlePlaceholder.textContent.trim() === 'お知らせを読み込み中です') {
    titlePlaceholder.textContent = map.loadingTitle;
  }
  const bodyPlaceholder = document.querySelector('[data-news-body]');
  if (bodyPlaceholder && bodyPlaceholder.textContent.includes('記事内容を読み込み中です。')) {
    bodyPlaceholder.textContent = map.loadingBody;
  }
  setPlainText('.news-detail-page__nav--prev .news-detail-page__nav-label', map.prevLabel);
  setPlainText('.news-detail-page__nav--next .news-detail-page__nav-label', map.nextLabel);
  setPlainText('.news-detail-page__back', map.backLabel);
  setPlainText('#news-latest-heading', map.latestHeading);
  setPlainText('.news-detail-page__latest-link', map.latestLink);
}

function mountFontScaleSwitcher() {
  if (document.querySelector('[data-font-scale-switcher]')) return;

  const switcher = document.createElement('div');
  switcher.className = 'font-scale-switcher';
  switcher.setAttribute('data-font-scale-switcher', 'true');
  switcher.setAttribute('aria-label', '文字サイズ切り替え');

  const languageGroup = document.createElement('div');
  languageGroup.className = 'font-scale-switcher__language-group';

  const languageToggle = document.createElement('button');
  languageToggle.type = 'button';
  languageToggle.className = 'font-scale-switcher__language-placeholder';
  languageToggle.setAttribute('data-language-toggle', 'true');
  languageToggle.setAttribute('aria-haspopup', 'listbox');
  languageToggle.setAttribute('aria-expanded', 'false');
  languageToggle.innerHTML = '<span class="font-scale-switcher__language-text" data-language-label>Language</span>';
  languageGroup.appendChild(languageToggle);

  const languageMenu = document.createElement('div');
  languageMenu.className = 'font-scale-switcher__language-menu';
  languageMenu.setAttribute('data-language-menu', 'true');
  languageMenu.setAttribute('role', 'listbox');

  const closeLanguageMenu = () => {
    languageMenu.classList.remove('is-open');
    languageToggle.setAttribute('aria-expanded', 'false');
  };

  const openLanguageMenu = () => {
    requestAnimationFrame(() => {
      languageMenu.classList.add('is-open');
    });
    languageToggle.setAttribute('aria-expanded', 'true');
  };

  LANGUAGE_OPTIONS.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'font-scale-switcher__language-option';
    button.dataset.languageOption = option.key;
    button.setAttribute('role', 'option');
    button.setAttribute('aria-label', option.ariaLabel);
    button.setAttribute('aria-pressed', 'false');
    button.textContent = option.label;
    button.addEventListener('click', () => {
      closeLanguageMenu();
      applyLanguage(option.key);
    });
    languageMenu.appendChild(button);
  });

  languageToggle.addEventListener('click', () => {
    const isOpen = languageMenu.classList.contains('is-open');
    if (isOpen) {
      closeLanguageMenu();
      return;
    }
    openLanguageMenu();
  });

  languageGroup.appendChild(languageMenu);
  switcher.appendChild(languageGroup);

  [...FONT_SCALE_OPTIONS].reverse().forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'font-scale-switcher__button';
    button.dataset.fontScaleOption = option.key;
    button.setAttribute('aria-label', option.ariaLabel);
    button.setAttribute('aria-pressed', 'false');
    button.textContent = option.label;
    button.addEventListener('click', () => applyFontScale(option.key));
    switcher.appendChild(button);
  });

  document.body.appendChild(switcher);

  document.addEventListener('click', (event) => {
    if (!switcher.contains(event.target)) {
      closeLanguageMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeLanguageMenu();
    }
  });

  closeLanguageMenu();
}

function getNewsArticles() {
  if (!Array.isArray(window.NEWS_ARTICLES)) return [];
  return [...window.NEWS_ARTICLES];
}

function formatNewsDate(dateValue) {
  if (!dateValue) return '';
  const [year, month, day] = dateValue.split('-');
  return `${year}.${month}.${day}`;
}

function buildNewsMetaMarkup(article, className) {
  const map = getNewsTextMap(document.documentElement.dataset.language || LANGUAGE_DEFAULT);
  const parts = [`<span class="${className}">${map.publishedLabel}${formatNewsDate(article.publishedAt)}</span>`];
  if (article.updatedAt && article.updatedAt !== article.publishedAt) {
    parts.push(`<span class="${className}">${map.updatedLabel}${formatNewsDate(article.updatedAt)}</span>`);
  }
  return parts.join('');
}

function renderHomeNews() {
  const articles = getNewsArticles();
  if (!articles.length) return;

  if (newsHomeFeature && newsHomeFeatureTitle && newsHomeFeaturePublished) {
    const featureArticle = articles[0];
    newsHomeFeature.href = `./news-detail.html?id=${featureArticle.id}`;
    newsHomeFeatureTitle.textContent = featureArticle.title;
    newsHomeFeaturePublished.textContent = formatNewsDate(featureArticle.publishedAt);
  }

  if (newsHomeList) {
    const listArticles = articles.slice(1, 5);
    newsHomeList.innerHTML = listArticles.map((article) => (
      `<li><a class="news-list__link" href="./news-detail.html?id=${article.id}">${buildNewsMetaMarkup(article, 'news-list__meta')}<span>${article.title}</span></a></li>`
    )).join('');
  }
}

function renderNewsArchive() {
  if (!newsArchiveList || !newsArchivePagination) return;
  const articles = getNewsArticles();
  const map = getNewsTextMap(document.documentElement.dataset.language || LANGUAGE_DEFAULT);
  const pageSize = 5;
  const pageCount = Math.max(1, Math.ceil(articles.length / pageSize));
  const params = new URLSearchParams(window.location.search);
  const currentPage = Math.min(pageCount, Math.max(1, Number(params.get('page')) || 1));
  const startIndex = (currentPage - 1) * pageSize;
  const pageArticles = articles.slice(startIndex, startIndex + pageSize);

  newsArchiveList.innerHTML = pageArticles.length ? pageArticles.map((article) => (
    `<a class="news-archive__item" href="./news-detail.html?id=${article.id}"><span class="news-archive__date">${map.publishedLabel}${formatNewsDate(article.publishedAt)}</span><strong class="news-archive__title">${article.title}</strong></a>`
  )).join('') : `<p class="news-archive__empty">${map.noArticles}</p>`;

  newsArchivePagination.innerHTML = Array.from({ length: pageCount }, (_, index) => {
    const page = index + 1;
    if (page === currentPage) {
      return `<span class="news-archive__page is-current" aria-current="page">${page}</span>`;
    }
    return `<a class="news-archive__page" href="./news.html?page=${page}">${page}</a>`;
  }).join('');
}

function renderNewsDetailById(id, options = {}) {
  if (!newsDetailPage || !newsDetailTitleElement || !newsDetailBodyElement || !newsDetailPublished || !newsDetailUpdated) return;
  const articles = getNewsArticles();
  const map = getNewsTextMap(document.documentElement.dataset.language || LANGUAGE_DEFAULT);
  const foundIndex = articles.findIndex((item) => item.id === id);
  const currentIndex = foundIndex >= 0 ? foundIndex : 0;
  const article = articles[currentIndex] || articles[0];

  if (!article) return;

  document.title = `${article.title} | 佐藤医院`;
  if (!options.skipHistory) {
    const nextUrl = `./news-detail.html?id=${article.id}`;
    window.history.pushState({ newsId: article.id }, '', nextUrl);
  }
  newsDetailTitleElement.textContent = article.title;
  newsDetailPublished.textContent = formatNewsDate(article.publishedAt);
  if (newsDetailPublished.parentElement && newsDetailPublished.parentElement.firstChild) {
    newsDetailPublished.parentElement.firstChild.textContent = map.publishedLabel;
  }
  if (article.updatedAt && article.updatedAt !== article.publishedAt) {
    newsDetailUpdated.parentElement.hidden = false;
    newsDetailUpdated.textContent = formatNewsDate(article.updatedAt);
    if (newsDetailUpdated.parentElement && newsDetailUpdated.parentElement.firstChild) {
      newsDetailUpdated.parentElement.firstChild.textContent = map.updatedLabel;
    }
  } else {
    newsDetailUpdated.parentElement.hidden = true;
    newsDetailUpdated.textContent = '';
  }
  newsDetailBodyElement.innerHTML = article.body.map((paragraph) => `<p>${paragraph}</p>`).join('');

  if (newsLatestList) {
    const latestArticles = articles.slice(0, 3);
    newsLatestList.innerHTML = latestArticles.map((latestArticle) => {
      const isCurrent = latestArticle.id === article.id;
      if (isCurrent) {
        return `<article class="news-detail-page__latest-item is-current" aria-current="true"><span class="news-detail-page__latest-date">${map.publishedLabel}${formatNewsDate(latestArticle.publishedAt)}</span><strong class="news-detail-page__latest-title">${latestArticle.title}</strong></article>`;
      }
      return `<a class="news-detail-page__latest-item" href="./news-detail.html?id=${latestArticle.id}" data-news-latest-id="${latestArticle.id}"><span class="news-detail-page__latest-date">${map.publishedLabel}${formatNewsDate(latestArticle.publishedAt)}</span><strong class="news-detail-page__latest-title">${latestArticle.title}</strong></a>`;
    }).join('');
  }

  const previousArticle = articles[currentIndex - 1];
  const nextArticle = articles[currentIndex + 1];

  if (newsDetailPrev && newsDetailPrevTitle) {
    if (previousArticle) {
      newsDetailPrev.href = `./news-detail.html?id=${previousArticle.id}`;
      newsDetailPrev.dataset.newsTargetId = previousArticle.id;
      newsDetailPrevTitle.textContent = previousArticle.title;
      newsDetailPrev.classList.remove('is-disabled');
      newsDetailPrev.setAttribute('aria-disabled', 'false');
      newsDetailPrev.tabIndex = 0;
    } else {
      newsDetailPrev.removeAttribute('href');
      newsDetailPrevTitle.textContent = map.noArticles;
      newsDetailPrev.classList.add('is-disabled');
      newsDetailPrev.setAttribute('aria-disabled', 'true');
      newsDetailPrev.tabIndex = -1;
      delete newsDetailPrev.dataset.newsTargetId;
    }
  }

  if (newsDetailNext && newsDetailNextTitle) {
    if (nextArticle) {
      newsDetailNext.href = `./news-detail.html?id=${nextArticle.id}`;
      newsDetailNext.dataset.newsTargetId = nextArticle.id;
      newsDetailNextTitle.textContent = nextArticle.title;
      newsDetailNext.classList.remove('is-disabled');
      newsDetailNext.setAttribute('aria-disabled', 'false');
      newsDetailNext.tabIndex = 0;
    } else {
      newsDetailNext.removeAttribute('href');
      newsDetailNextTitle.textContent = map.noArticles;
      newsDetailNext.classList.add('is-disabled');
      newsDetailNext.setAttribute('aria-disabled', 'true');
      newsDetailNext.tabIndex = -1;
      delete newsDetailNext.dataset.newsTargetId;
    }
  }
}

function setupNewsDetailNavigation() {
  if (!newsDetailPage) return;

  const params = new URLSearchParams(window.location.search);
  const initialId = params.get('id');
  renderNewsDetailById(initialId, { skipHistory: true });

  [newsDetailPrev, newsDetailNext].forEach((link) => {
    if (!link) return;
    link.addEventListener('click', (event) => {
      const targetId = link.dataset.newsTargetId;
      if (!targetId) return;
      event.preventDefault();
      renderNewsDetailById(targetId);
    });
  });

  if (newsLatestList) {
    newsLatestList.addEventListener('click', (event) => {
      const target = event.target.closest('[data-news-latest-id]');
      if (!target) return;
      const targetId = target.dataset.newsLatestId;
      if (!targetId) return;
      event.preventDefault();
      renderNewsDetailById(targetId);
    });
  }

  window.addEventListener('popstate', () => {
    const nextParams = new URLSearchParams(window.location.search);
    renderNewsDetailById(nextParams.get('id'), { skipHistory: true });
  });
}

function closeStaffModal() {
  if (!staffModal) return;
  staffModal.classList.remove('is-open');
  staffModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-modal-open');
  activeStaffTrigger = null;
}

function updateStaffModalTitle(trigger) {
  if (!staffModalTitle || !trigger) return;
  const staffName = trigger.dataset.staffName || '';
  if (window.innerWidth <= 565 && staffName.includes('：')) {
    const [role, name] = staffName.split('：');
    staffModalTitle.innerHTML = `${role}：<br>${name}`;
  } else {
    staffModalTitle.textContent = staffName;
  }
}

function openStaffModal(trigger) {
  if (!staffModal || !staffModalTitle || !staffModalHistory || !staffModalSpecialty || !staffModalComment) return;
  const staffName = trigger.dataset.staffName || '';
  if (staffModalImage) {
    staffModalImage.src = trigger.dataset.staffImage || '';
    staffModalImage.alt = staffName;
  }
  updateStaffModalTitle(trigger);
  staffModalHistory.textContent = trigger.dataset.staffHistory || '';
  staffModalSpecialty.textContent = trigger.dataset.staffSpecialty || '';
  staffModalComment.textContent = trigger.dataset.staffComment || '';
  staffModal.classList.add('is-open');
  staffModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-modal-open');
  activeStaffTrigger = trigger;
}

function openRouteMapModal() {
  if (!routeMapModal) return;
  routeMapZoomLevel = 1;
  if (routeMapModalImage) {
    routeMapModalImage.style.width = '100%';
  }
  routeMapModal.classList.add('is-open');
  routeMapModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-modal-open');
  isRouteMapModalOpen = true;
}

function closeRouteMapModal() {
  if (!routeMapModal) return;
  routeMapModal.classList.remove('is-open');
  routeMapModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-modal-open');
  isRouteMapModalOpen = false;
}

function setRouteMapZoom(nextZoomLevel) {
  if (!routeMapModalImage) return;
  routeMapZoomLevel = Math.min(ROUTE_MAP_ZOOM_MAX, Math.max(ROUTE_MAP_ZOOM_MIN, nextZoomLevel));
  routeMapModalImage.style.width = `${routeMapZoomLevel * 100}%`;
}

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    document.documentElement.classList.toggle('is-menu-open', isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        siteNav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        document.documentElement.classList.remove('is-menu-open');
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (window.innerWidth > 768) return;
    if (!siteNav.classList.contains('is-open')) return;
    if (siteNav.contains(event.target) || menuButton.contains(event.target)) return;

    siteNav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('is-menu-open');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    siteNav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('is-menu-open');
    closeStaffModal();
    closeRouteMapModal();
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}

if (signatureHandwrite) {
  if ('IntersectionObserver' in window) {
    const signatureObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        signatureHandwrite.classList.add('is-visible');
        signatureObserver.unobserve(entry.target);
      });
    }, { threshold: 0.65 });

    signatureObserver.observe(signatureHandwrite);
  } else {
    signatureHandwrite.classList.add('is-visible');
  }
}

staffTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => openStaffModal(trigger));
});

staffModalCloseTargets.forEach((target) => {
  target.addEventListener('click', closeStaffModal);
});

if (routeMapTrigger) {
  routeMapTrigger.addEventListener('click', openRouteMapModal);
}

routeMapModalCloseTargets.forEach((target) => {
  target.addEventListener('click', closeRouteMapModal);
});

if (routeMapModal) {
  routeMapModal.addEventListener('click', (event) => {
    if (event.target === routeMapModal) closeRouteMapModal();
  });
}

if (routeMapZoomInButton) {
  routeMapZoomInButton.addEventListener('click', () => {
    setRouteMapZoom(routeMapZoomLevel + ROUTE_MAP_ZOOM_STEP);
  });
}

if (routeMapZoomOutButton) {
  routeMapZoomOutButton.addEventListener('click', () => {
    setRouteMapZoom(routeMapZoomLevel - ROUTE_MAP_ZOOM_STEP);
  });
}

if (routeMapZoomResetButton) {
  routeMapZoomResetButton.addEventListener('click', () => {
    setRouteMapZoom(1);
  });
}

if (routeMapModalImage) {
  routeMapModalImage.addEventListener('wheel', (event) => {
    if (!routeMapModal?.classList.contains('is-open')) return;
    if (!event.ctrlKey) return;
    event.preventDefault();
    const direction = event.deltaY < 0 ? 1 : -1;
    setRouteMapZoom(routeMapZoomLevel + direction * ROUTE_MAP_ZOOM_STEP);
  }, { passive: false });
}

window.addEventListener('resize', () => {
  if (!staffModal?.classList.contains('is-open') || !activeStaffTrigger) return;
  updateStaffModalTitle(activeStaffTrigger);
});

if (newsItems.length && newsDetailTitle && newsDetailBody) {
  const activateNewsItem = (item) => {
    newsItems.forEach((button) => {
      const isActive = button === item;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', String(isActive));
    });
    newsDetailTitle.textContent = item.dataset.newsTitle || '';
    newsDetailBody.textContent = item.dataset.newsBody || '';
  };

  newsItems.forEach((item) => {
    item.addEventListener('click', () => activateNewsItem(item));
  });

  const currentHash = window.location.hash.replace('#', '');
  const initialItem = Array.from(newsItems).find((item) => item.id === currentHash) || newsItems[0];
  if (initialItem) activateNewsItem(initialItem);
}

if (contactTypeButtons.length && contactTypeSelect) {
  const activateContactType = (type) => {
    contactTypeButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.contactType === type);
    });
  };

  contactTypeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      contactTypeSelect.value = button.dataset.contactType;
      activateContactType(button.dataset.contactType);
    });
  });

  contactTypeSelect.addEventListener('change', () => {
    activateContactType(contactTypeSelect.value);
  });
}

const CONTACT_VALIDATION_MESSAGES = {
  ja: {
    type: 'お問い合わせ種別を選択してください。',
    nameRequired: 'お名前を入力してください。',
    kanaRequired: 'フリガナを入力してください。',
    kanaFormat: 'フリガナは全角カタカナで入力してください。',
    telRequired: '電話番号を入力してください。',
    telFormat: '正しい電話番号の形式で入力してください（例：00-0000-0000）。',
    emailRequired: 'メールアドレスを入力してください。',
    emailFormat: '正しいメールアドレスの形式で入力してください。',
    emailConfirmRequired: '確認用のメールアドレスを入力してください。',
    emailMismatch: 'メールアドレスが一致しません。',
    messageRequired: 'お問い合わせ内容を入力してください。',
    successNotice: 'ご入力内容を確認しました。本フォームは公開前のモックのため、実際の送信は行われません。正式公開時には送信先の設定を行います。',
  },
  en: {
    type: 'Please select a contact type.',
    nameRequired: 'Please enter your name.',
    kanaRequired: 'Please enter your name in katakana.',
    kanaFormat: 'Please enter your name using full-width katakana.',
    telRequired: 'Please enter your phone number.',
    telFormat: 'Please enter a valid phone number (e.g., 00-0000-0000).',
    emailRequired: 'Please enter your email address.',
    emailFormat: 'Please enter a valid email address.',
    emailConfirmRequired: 'Please enter your email address again to confirm.',
    emailMismatch: 'The email addresses do not match.',
    messageRequired: 'Please enter your inquiry details.',
    successNotice: 'Your information has been received. This form is a pre-release mock, so nothing has actually been sent. A sending destination will be configured before the official release.',
  },
  'zh-tw': {
    type: '請選擇聯絡種類。',
    nameRequired: '請輸入姓名。',
    kanaRequired: '請輸入片假名讀音。',
    kanaFormat: '請以全形片假名輸入。',
    telRequired: '請輸入電話號碼。',
    telFormat: '請輸入正確格式的電話號碼（例：00-0000-0000）。',
    emailRequired: '請輸入電子郵件地址。',
    emailFormat: '請輸入正確格式的電子郵件地址。',
    emailConfirmRequired: '請輸入確認用的電子郵件地址。',
    emailMismatch: '電子郵件地址不一致。',
    messageRequired: '請輸入聯絡內容。',
    successNotice: '已確認您輸入的內容。本表單為正式上線前的模擬版本，實際上並未送出資料。正式上線時將設定送出目的地。',
  },
  'zh-cn': {
    type: '请选择联系种类。',
    nameRequired: '请输入姓名。',
    kanaRequired: '请输入片假名读音。',
    kanaFormat: '请使用全角片假名输入。',
    telRequired: '请输入电话号码。',
    telFormat: '请输入正确格式的电话号码（例：00-0000-0000）。',
    emailRequired: '请输入电子邮件地址。',
    emailFormat: '请输入正确格式的电子邮件地址。',
    emailConfirmRequired: '请输入确认用的电子邮件地址。',
    emailMismatch: '电子邮件地址不一致。',
    messageRequired: '请输入联系内容。',
    successNotice: '已确认您输入的内容。本表单为正式上线前的模拟版本，实际上并未发送数据。正式上线时将设置发送目的地。',
  },
  ko: {
    type: '문의 종류를 선택해 주세요.',
    nameRequired: '이름을 입력해 주세요.',
    kanaRequired: '가타카나 표기를 입력해 주세요.',
    kanaFormat: '가타카나 표기는 전각 가타카나로 입력해 주세요.',
    telRequired: '전화번호를 입력해 주세요.',
    telFormat: '올바른 전화번호 형식으로 입력해 주세요(예: 00-0000-0000).',
    emailRequired: '이메일 주소를 입력해 주세요.',
    emailFormat: '올바른 이메일 주소 형식으로 입력해 주세요.',
    emailConfirmRequired: '확인용 이메일 주소를 입력해 주세요.',
    emailMismatch: '이메일 주소가 일치하지 않습니다.',
    messageRequired: '문의 내용을 입력해 주세요.',
    successNotice: '입력하신 내용을 확인했습니다. 이 양식은 공개 전 모형이므로 실제로 전송되지 않습니다. 정식 공개 시 전송 대상을 설정할 예정입니다.',
  },
};

function getContactValidationMessages() {
  return CONTACT_VALIDATION_MESSAGES[getStoredLanguage()] || CONTACT_VALIDATION_MESSAGES.ja;
}

if (inquiryForm && inquirySubmitButton) {
  const KATAKANA_PATTERN = /^[ァ-ヶーヽヾ\s　]+$/;
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fieldValidators = {
    type: (field) => (field.value ? '' : getContactValidationMessages().type),
    name: (field) => (field.value.trim() ? '' : getContactValidationMessages().nameRequired),
    kana: (field) => {
      const value = field.value.trim();
      const messages = getContactValidationMessages();
      if (!value) return messages.kanaRequired;
      if (!KATAKANA_PATTERN.test(value)) return messages.kanaFormat;
      return '';
    },
    tel: (field) => {
      const value = field.value.trim();
      const messages = getContactValidationMessages();
      if (!value) return messages.telRequired;
      const digits = value.replace(/-/g, '');
      if (!/^0\d{9,10}$/.test(digits)) return messages.telFormat;
      return '';
    },
    email: (field) => {
      const value = field.value.trim();
      const messages = getContactValidationMessages();
      if (!value) return messages.emailRequired;
      if (!EMAIL_PATTERN.test(value)) return messages.emailFormat;
      return '';
    },
    'email-confirm': (field) => {
      const value = field.value.trim();
      const messages = getContactValidationMessages();
      if (!value) return messages.emailConfirmRequired;
      const emailField = inquiryForm.querySelector('[name="email"]');
      if (emailField && value !== emailField.value.trim()) return messages.emailMismatch;
      return '';
    },
    message: (field) => (field.value.trim() ? '' : getContactValidationMessages().messageRequired),
  };

  const inquiryFields = Array.from(inquiryForm.querySelectorAll('.inquiry-form__field')).map((wrapper) => ({
    key: wrapper.dataset.field,
    wrapper,
    field: wrapper.querySelector('input, select, textarea'),
    errorEl: wrapper.querySelector('.form-error'),
  }));

  const validateField = ({ key, wrapper, field, errorEl }) => {
    const validator = fieldValidators[key];
    if (!validator || !field || !errorEl) return true;
    const message = validator(field);
    wrapper.classList.toggle('has-error', Boolean(message));
    errorEl.textContent = message;
    errorEl.classList.toggle('is-visible', Boolean(message));
    return !message;
  };

  inquiryFields.forEach((entry) => {
    if (!entry.field) return;
    entry.field.addEventListener('blur', () => validateField(entry));
    entry.field.addEventListener('input', () => {
      if (entry.wrapper.classList.contains('has-error')) validateField(entry);
      if (entry.key === 'email') {
        const confirmEntry = inquiryFields.find((item) => item.key === 'email-confirm');
        if (confirmEntry && confirmEntry.wrapper.classList.contains('has-error')) validateField(confirmEntry);
      }
    });
    if (entry.field.tagName === 'SELECT') {
      entry.field.addEventListener('change', () => validateField(entry));
    }
  });

  inquirySubmitButton.addEventListener('click', () => {
    let firstInvalid = null;
    let isValid = true;
    inquiryFields.forEach((entry) => {
      if (!validateField(entry)) {
        isValid = false;
        if (!firstInvalid) firstInvalid = entry.field;
      }
    });

    if (!isValid) {
      if (inquiryFormNotice) inquiryFormNotice.hidden = true;
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (inquiryFormNotice) {
      inquiryFormNotice.textContent = getContactValidationMessages().successNotice;
      inquiryFormNotice.hidden = false;
      inquiryFormNotice.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    if (!item) return;
    const isOpen = item.classList.toggle('is-open');
    question.setAttribute('aria-expanded', String(isOpen));
  });
});

scrollTopLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (window.innerWidth <= 768 && siteNav && menuButton) {
      siteNav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('is-menu-open');
    }
  });
});

if (pageTopButton) {
  const togglePageTopButton = () => {
    pageTopButton.classList.toggle('is-visible', window.scrollY > 240);
  };

  togglePageTopButton();
  window.addEventListener('scroll', togglePageTopButton, { passive: true });
}

if (getCurrentPageKey() !== 'admin') {
  mountFontScaleSwitcher();
  applyFontScale(getStoredFontScale());
  applyLanguage(getStoredLanguage());
}

function formatRemainingTime(targetTime, now) {
  const remainingMs = Math.max(0, targetTime.getTime() - now.getTime());
  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `あと ${hours}時間${minutes}分${seconds}秒`;
}

function getScheduleStatusText(languageKey) {
  const texts = {
    ja: {
      outside: '受付時間外',
      morning: '午前受付終了まで',
      afternoon: '午後受付終了まで',
      badgeOutside: '時間外',
      metaMorning: '受付時間：午前　8:00〜11:00',
      metaAfternoon: '受付時間：午後　12:00〜17:00',
    },
    en: {
      outside: 'Outside reception hours',
      morning: 'Until morning reception closes',
      afternoon: 'Until afternoon reception closes',
      badgeOutside: 'Closed',
      metaMorning: 'Reception hours: Morning 8:00-11:00',
      metaAfternoon: 'Reception hours: Afternoon 12:00-17:00',
    },
    'zh-tw': {
      outside: '受理時間外',
      morning: '上午受理結束前',
      afternoon: '下午受理結束前',
      badgeOutside: '非受理時間',
      metaMorning: '受理時間：上午 8:00〜11:00',
      metaAfternoon: '受理時間：下午 12:00〜17:00',
    },
    'zh-cn': {
      outside: '受理时间外',
      morning: '上午受理结束前',
      afternoon: '下午受理结束前',
      badgeOutside: '非受理时间',
      metaMorning: '受理时间：上午 8:00〜11:00',
      metaAfternoon: '受理时间：下午 12:00〜17:00',
    },
    ko: {
      outside: '접수시간 외',
      morning: '오전 접수 종료까지',
      afternoon: '오후 접수 종료까지',
      badgeOutside: '시간 외',
      metaMorning: '접수시간: 오전 8:00~11:00',
      metaAfternoon: '접수시간: 오후 12:00~17:00',
    },
  };
  return texts[languageKey] || texts.ja;
}

function updateScheduleStatus() {
  const now = new Date();
  const languageKey = document.documentElement.dataset.language || LANGUAGE_DEFAULT;
  const text = getScheduleStatusText(languageKey);
  const day = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const isWeekday = day >= 1 && day <= 5;
  const isSaturday = day === 6;
  const isMorningReception = currentMinutes >= 8 * 60 && currentMinutes < 11 * 60;
  const isAfternoonReception = currentMinutes >= 12 * 60 && currentMinutes < 17 * 60;

  let title = text.outside;
  let meta = '';
  let badge = text.badgeOutside;
  let showMeta = false;
  let activePeriod = '';

  if ((isWeekday || isSaturday) && isMorningReception) {
    const targetTime = new Date(now);
    targetTime.setHours(11, 0, 0, 0);
    title = text.morning;
    meta = text.metaMorning;
    badge = formatRemainingTime(targetTime, now);
    showMeta = true;
    activePeriod = 'morning';
  } else if (isWeekday && isAfternoonReception) {
    const targetTime = new Date(now);
    targetTime.setHours(17, 0, 0, 0);
    title = text.afternoon;
    meta = text.metaAfternoon;
    badge = formatRemainingTime(targetTime, now);
    showMeta = true;
    activePeriod = 'afternoon';
  }

  if (scheduleStatusTitle && scheduleStatusMeta && scheduleStatusBadge) {
    scheduleStatusTitle.textContent = title;
    scheduleStatusBadge.textContent = badge;
    scheduleStatusMeta.textContent = meta;
    scheduleStatusMeta.hidden = !showMeta;
  }

  scheduleCells.forEach((cell) => {
    const isCurrentDay = Number(cell.dataset.day) === day;
    const isCurrentPeriod = cell.dataset.period === activePeriod;
    cell.classList.toggle('is-current-slot', isCurrentDay && isCurrentPeriod);
  });
}

updateScheduleStatus();
window.setInterval(updateScheduleStatus, 1000);

renderHomeNews();
renderNewsArchive();
setupNewsDetailNavigation();

const heroStage = document.querySelector('.hero__stage');
const heroOrb = document.querySelector('.hero-orb');
const heroDoctorPhoto = document.querySelector('.hero__photo--doctor');
const heroExteriorPhoto = document.querySelector('.hero__photo--exterior');

function updateHeroResponsivePhotos() {
  if (!heroStage || !heroOrb || !heroDoctorPhoto || !heroExteriorPhoto) return;

  const viewportWidth = window.innerWidth;
  const shouldOrbit = viewportWidth < 1000 && viewportWidth >= 769;

  if (!shouldOrbit) {
    [heroDoctorPhoto, heroExteriorPhoto].forEach((element) => {
      element.style.removeProperty('left');
      element.style.removeProperty('top');
      element.style.removeProperty('right');
      element.style.removeProperty('bottom');
      element.style.removeProperty('width');
    });
    return;
  }

  const stageRect = heroStage.getBoundingClientRect();
  const orbRect = heroOrb.getBoundingClientRect();
  const centerX = orbRect.left - stageRect.left + (orbRect.width / 2);
  const centerY = orbRect.top - stageRect.top + (orbRect.height / 2);
  const widthRatio = (1000 - viewportWidth) / 231;

  const placePhoto = (element, options) => {
    const width = options.maxWidth - ((options.maxWidth - options.minWidth) * widthRatio);
    const height = width / options.aspect;
    const radius = (orbRect.width / 2) + (Math.max(width, height) / 2) + options.gap;
    const left = centerX + (Math.cos(options.angle) * radius) - (width / 2);
    const top = centerY + (Math.sin(options.angle) * radius) - (height / 2);
    const clampedLeft = Math.min(
      Math.max(left, 8),
      Math.max(8, stageRect.width - width - 8)
    );
    const clampedTop = Math.min(
      Math.max(top, 16),
      Math.max(16, stageRect.height - height - 16)
    );

    element.style.left = `${clampedLeft}px`;
    element.style.top = `${clampedTop}px`;
    element.style.right = 'auto';
    element.style.bottom = 'auto';
    element.style.width = `${width}px`;
  };

  placePhoto(heroDoctorPhoto, {
    angle: -0.72,
    aspect: 1,
    minWidth: 150,
    maxWidth: 188,
    gap: 16,
  });

  placePhoto(heroExteriorPhoto, {
    angle: 0.86,
    aspect: 1.18,
    minWidth: 120,
    maxWidth: 150,
    gap: 18,
  });
}

updateHeroResponsivePhotos();
window.addEventListener('resize', updateHeroResponsivePhotos);

if (window.matchMedia('(min-width: 769px)').matches && draggableTargets.length) {
  const floatingItems = [];

  draggableTargets.forEach((element) => {
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let movedX = 0;
    let movedY = 0;
    let dragged = false;
    const amplitudeX = Number(element.dataset.floatX || 10);
    const amplitudeY = Number(element.dataset.floatY || 14);
    const speed = Number(element.dataset.floatSpeed || 0.0012);
    const phase = Math.random() * Math.PI * 2;

    element.style.touchAction = 'none';
    floatingItems.push({ element, amplitudeX, amplitudeY, speed, phase });

    element.addEventListener('pointerdown', (event) => {
      if (!event.isPrimary) return;
      if (event.target.closest('.hero__card-link')) return;
      pointerId = event.pointerId;
      startX = event.clientX - movedX;
      startY = event.clientY - movedY;
      dragged = false;
      element.setPointerCapture(pointerId);
      element.classList.add('is-dragging');
    });

    element.addEventListener('pointermove', (event) => {
      if (pointerId !== event.pointerId) return;
      movedX = event.clientX - startX;
      movedY = event.clientY - startY;
      if (Math.abs(movedX) > 4 || Math.abs(movedY) > 4) {
        dragged = true;
      }
      element.style.setProperty('--drag-x', `${movedX}px`);
      element.style.setProperty('--drag-y', `${movedY}px`);
    });

    const stopDrag = (event) => {
      if (pointerId !== event.pointerId) return;
      element.classList.remove('is-dragging');
      element.releasePointerCapture(pointerId);
      pointerId = null;
    };

    element.addEventListener('pointerup', stopDrag);
    element.addEventListener('pointercancel', stopDrag);
    element.addEventListener('click', (event) => {
      if (!dragged) return;
      event.preventDefault();
      event.stopPropagation();
      dragged = false;
    }, true);
  });

  const animateFloating = (time) => {
    floatingItems.forEach(({ element, amplitudeX, amplitudeY, speed, phase }) => {
      if (element.classList.contains('is-dragging')) return;
      const x = Math.sin(time * speed + phase) * amplitudeX;
      const y = Math.cos(time * speed * 0.9 + phase) * amplitudeY;
      element.style.setProperty('--float-x', `${x.toFixed(2)}px`);
      element.style.setProperty('--float-y', `${y.toFixed(2)}px`);
    });

    window.requestAnimationFrame(animateFloating);
  };

  window.requestAnimationFrame(animateFloating);
}
