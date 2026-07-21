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
  const parts = [`<span class="${className}">投稿日：${formatNewsDate(article.publishedAt)}</span>`];
  if (article.updatedAt && article.updatedAt !== article.publishedAt) {
    parts.push(`<span class="${className}">更新日：${formatNewsDate(article.updatedAt)}</span>`);
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
  const pageSize = 5;
  const pageCount = Math.max(1, Math.ceil(articles.length / pageSize));
  const params = new URLSearchParams(window.location.search);
  const currentPage = Math.min(pageCount, Math.max(1, Number(params.get('page')) || 1));
  const startIndex = (currentPage - 1) * pageSize;
  const pageArticles = articles.slice(startIndex, startIndex + pageSize);

  newsArchiveList.innerHTML = pageArticles.map((article) => (
    `<a class="news-archive__item" href="./news-detail.html?id=${article.id}"><span class="news-archive__date">投稿日：${formatNewsDate(article.publishedAt)}</span><strong class="news-archive__title">${article.title}</strong></a>`
  )).join('');

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
  if (article.updatedAt && article.updatedAt !== article.publishedAt) {
    newsDetailUpdated.parentElement.hidden = false;
    newsDetailUpdated.textContent = formatNewsDate(article.updatedAt);
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
        return `<article class="news-detail-page__latest-item is-current" aria-current="true"><span class="news-detail-page__latest-date">投稿日：${formatNewsDate(latestArticle.publishedAt)}</span><strong class="news-detail-page__latest-title">${latestArticle.title}</strong></article>`;
      }
      return `<a class="news-detail-page__latest-item" href="./news-detail.html?id=${latestArticle.id}" data-news-latest-id="${latestArticle.id}"><span class="news-detail-page__latest-date">投稿日：${formatNewsDate(latestArticle.publishedAt)}</span><strong class="news-detail-page__latest-title">${latestArticle.title}</strong></a>`;
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
      newsDetailPrevTitle.textContent = '記事はありません';
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
      newsDetailNextTitle.textContent = '記事はありません';
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

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('is-menu-open', isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        siteNav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('is-menu-open');
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (window.innerWidth > 768) return;
    if (!siteNav.classList.contains('is-open')) return;
    if (siteNav.contains(event.target) || menuButton.contains(event.target)) return;

    siteNav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-menu-open');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    siteNav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-menu-open');
    closeStaffModal();
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

if (inquiryForm && inquirySubmitButton) {
  const KATAKANA_PATTERN = /^[ァ-ヶーヽヾ\s　]+$/;
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fieldValidators = {
    type: (field) => (field.value ? '' : 'お問い合わせ種別を選択してください。'),
    name: (field) => (field.value.trim() ? '' : 'お名前を入力してください。'),
    kana: (field) => {
      const value = field.value.trim();
      if (!value) return 'フリガナを入力してください。';
      if (!KATAKANA_PATTERN.test(value)) return 'フリガナは全角カタカナで入力してください。';
      return '';
    },
    tel: (field) => {
      const value = field.value.trim();
      if (!value) return '電話番号を入力してください。';
      const digits = value.replace(/-/g, '');
      if (!/^0\d{9,10}$/.test(digits)) return '正しい電話番号の形式で入力してください（例：00-0000-0000）。';
      return '';
    },
    email: (field) => {
      const value = field.value.trim();
      if (!value) return 'メールアドレスを入力してください。';
      if (!EMAIL_PATTERN.test(value)) return '正しいメールアドレスの形式で入力してください。';
      return '';
    },
    'email-confirm': (field) => {
      const value = field.value.trim();
      if (!value) return '確認用のメールアドレスを入力してください。';
      const emailField = inquiryForm.querySelector('[name="email"]');
      if (emailField && value !== emailField.value.trim()) return 'メールアドレスが一致しません。';
      return '';
    },
    message: (field) => (field.value.trim() ? '' : 'お問い合わせ内容を入力してください。'),
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
      inquiryFormNotice.textContent = 'ご入力内容を確認しました。本フォームは公開前のモックのため、実際の送信は行われません。正式公開時には送信先の設定を行います。';
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
      document.body.classList.remove('is-menu-open');
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

function formatRemainingTime(targetTime, now) {
  const remainingMs = Math.max(0, targetTime.getTime() - now.getTime());
  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `あと ${hours}時間${minutes}分${seconds}秒`;
}

function updateScheduleStatus() {
  const now = new Date();
  const day = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const isWeekday = day >= 1 && day <= 5;
  const isSaturday = day === 6;
  const isMorningReception = currentMinutes >= 8 * 60 && currentMinutes < 11 * 60;
  const isAfternoonReception = currentMinutes >= 12 * 60 && currentMinutes < 17 * 60;

  let title = '受付時間外';
  let meta = '';
  let badge = '時間外';
  let showMeta = false;
  let activePeriod = '';

  if ((isWeekday || isSaturday) && isMorningReception) {
    const targetTime = new Date(now);
    targetTime.setHours(11, 0, 0, 0);
    title = '午前受付終了まで';
    meta = '受付時間：午前　8:00〜11:00';
    badge = formatRemainingTime(targetTime, now);
    showMeta = true;
    activePeriod = 'morning';
  } else if (isWeekday && isAfternoonReception) {
    const targetTime = new Date(now);
    targetTime.setHours(17, 0, 0, 0);
    title = '午後受付終了まで';
    meta = '受付時間：午後　12:00〜17:00';
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
