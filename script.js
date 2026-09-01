/* ==========================================================================
   Crystal 生日网站 · v4 脚本
   --------------------------------------------------------------------------
   ★ 新手友好说明：
   1. 想改内容？只改 content.js（图片和文字都在那里）
   2. 想加一个城市或一张照片？改 content.js 的对应数组即可
   3. 章节切换是"旧屏下推"动画，改 CSS 的 .chapter.active / .leaving
   ========================================================================== */

/* ============================================================
   ★ 配置区 - 所有内容来自 content.js
   ============================================================ */

// 从 content.js 读所有可修改内容（图片/文字/问题/歌曲/旅程清单等）
// 想改这些？看 content.js 顶部的注释。
const ALBUM_TRAVEL  = (window.CONTENT && window.CONTENT.travel)    || [];
const ALBUM_MUSIC   = (window.CONTENT && window.CONTENT.music)     || [];
const ALBUM_PARK    = (window.CONTENT && window.CONTENT.parks)     || [];
const FRAGMENTS     = (window.CONTENT && window.CONTENT.fragments) || [];
const MENU          = (window.CONTENT && window.CONTENT.food)       || [];
const CARDS         = (window.CONTENT && window.CONTENT.cards)      || [];
const OPEN_QUESTIONS= (window.CONTENT && window.CONTENT.openQuestions) || {};
const SONGS         = (window.CONTENT && window.CONTENT.songs)      || [];
const JOURNEY_LIST  = (window.CONTENT && window.CONTENT.journey)    || [];
const CH            = (window.CONTENT && window.CONTENT.chapters)   || {};
const CT            = (window.CONTENT && window.CONTENT)             || {};

// 生日日期
const BIRTHDAY = (() => {
  if (CT.site && CT.site.birthday) return new Date(CT.site.birthday + 'T00:00:00+08:00');
  return new Date('2026-10-03T00:00:00+08:00');
})();

// 把 content.js 里的章节文案 / 开场文案 / 提示文字 注入到 HTML 对应元素
// 规则：HTML 元素是"默认值"，content.js 存在就覆盖。这样即使 content.js 加载失败，
// 至少不会空白。
function applyUIText() {
  // 安全 fallback：默认值（与 HTML 静态一致）
  const F = {
    initial: 'HAPPY BIRTHDAY',
    name: 'Crystal',
    dateLine: '10月3日 · 农历八月廿三',
    cakeHint: '点一下小蜡烛',
    wishText: '闭上眼睛 · 许个愿吧',
    wishButton: '我 许 好 了',
    musicHint: '轻点播放音乐',
    qt: { eyebrow: 'CHAPTER ONE · TRAVEL', sub: '回忆第一站 · 从一次旅行开始', question: '我们第一次一起旅行的城市是？', hint: '再想想，离北京很近哦', success: '回 到 那 一 天', enterBtn: '进入回忆' },
    qm: { eyebrow: 'CHAPTER TWO · FESTIVAL', sub: '回忆第二站 · 从一次合唱开始', question: '我们第一次一起看音乐节的城市是？', hint: '再想想，离北京很近哦', success: '回 到 那 一 天', enterBtn: '进入回忆' },
    fg: { eyebrow: 'DAILY · FRAGMENTS', title: '日常快乐碎片', tip: '刮 开 一 张 · 看 回 忆', button: '继续旅程 →' },
    mn: { eyebrow: 'CHAPTER FOUR · EAT WITH YOU', title: '一起吃过的饭', end: '12 FLAVORS · 12 MEMORIES', button: '再问你一个秘密 →' },
    cd: { eyebrow: 'CHAPTER FIVE · CARDS', title: '我想对你说的话', end: '6 WHISPERS · 6 CARDS', button: '来看看你写下的' },
    sm: { eyebrow: 'CHAPTER SIX · TOGETHER', title: '这本相册 · 我们一起写完', empty: '她 还没 留 下 任 何 回 答 哦', button: '最 后 一 章' },
    fn: { eyebrow: 'HAPPY · BIRTHDAY', title: 'Happy Birthday, Crystal', sub: '2026.10.03 · 农历八月廿三', button: '再 看 一 遍' },
  };

  // 合并 content.js 提供的值
  const site   = Object.assign({ name: F.name, initial: F.initial, dateLine: F.dateLine, lunarBirthday: '农历八月廿三' }, CT.site || {});
  const open   = Object.assign({ initial: F.initial, name: F.name, dateLine: F.dateLine, cakeHint: F.cakeHint, wishText: F.wishText, wishButton: F.wishButton }, CT.opening || {});
  const qt = Object.assign({}, F.qt, CH.quizTravel || {});
  const qm = Object.assign({}, F.qm, CH.quizMusic  || {});
  const fg = Object.assign({}, F.fg, CH.fragments  || {});
  const mn = Object.assign({}, F.mn, CH.menu       || {});
  const cd = Object.assign({}, F.cd, CH.cards      || {});
  const sm = Object.assign({}, F.sm, CH.summary    || {});
  const fn = Object.assign({}, F.fn, CH.finale     || {});
  const musicHint = CH.musicHint || F.musicHint;

  const set = (sel, val) => { if (val != null) { const el = document.querySelector(sel); if (el) el.textContent = val; } };

  // 开场
  set('#chapter-opening .eyebrow', open.initial);
  set('#chapter-opening .big-name', open.name);
  set('#chapter-opening .sub-name', open.dateLine);
  // 许愿页
  set('#wish-overlay .wish-text', open.wishText);
  set('#wish-overlay #wish-btn', open.wishButton);

  // 旅行问答
  set('#chapter-quiz-travel .eyebrow', qt.eyebrow);
  set('#chapter-quiz-travel .sub-name', qt.sub);
  set('#chapter-quiz-travel .quiz-q', qt.question);
  set('#chapter-quiz-travel .quiz-hint', qt.hint);
  set('#chapter-quiz-travel #quiz-travel-success', qt.success);
  set('#chapter-quiz-travel #go-travel', qt.enterBtn);
  // 音乐节问答
  set('#chapter-quiz-music .eyebrow', qm.eyebrow);
  set('#chapter-quiz-music .sub-name', qm.sub);
  set('#chapter-quiz-music .quiz-q', qm.question);
  set('#chapter-quiz-music .quiz-hint', qm.hint);
  set('#chapter-quiz-music #quiz-music-success', qm.success);
  set('#chapter-quiz-music #go-music', qm.enterBtn);
  // 日常碎片
  set('#chapter-fragments .frag-eyebrow', fg.eyebrow);
  set('#chapter-fragments .frag-title', fg.title);
  set('#chapter-fragments #frag-tip', fg.tip);
  set('#chapter-fragments #next-fragments', fg.button);
  // 吃饭
  set('#chapter-menu .menu-eyebrow', mn.eyebrow);
  set('#chapter-menu .menu-title', mn.title);
  set('#chapter-menu .end-pin', mn.end);
  set('#chapter-menu #next-menu', mn.button);
  // 翻卡
  set('#chapter-cards .cards-eyebrow', cd.eyebrow);
  set('#chapter-cards .cards-title', cd.title);
  set('#chapter-cards .end-pin', cd.end);
  set('#chapter-cards #next-cards', cd.button);
  // 汇总
  set('#chapter-summary .summary-eyebrow', sm.eyebrow);
  set('#chapter-summary .summary-title', sm.title);
  set('#chapter-summary #summary-empty', sm.empty);
  set('#chapter-summary #go-finale', sm.button);
  // 末章
  set('#chapter-finale .finale-eyebrow', fn.eyebrow);
  set('#chapter-finale .env-letter-title', fn.title);
  set('#chapter-finale #restart-btn', fn.button);
  // 音乐提示
  set('#music-hint', musicHint);
}

/* ============================================================
   工具函数
   ============================================================ */

// 图片占位：src 为空时显示"放照片"
function imgTag(src, alt) {
  if (src && src.trim()) {
    return `<img src="${src}" alt="${alt || ''}" loading="lazy">`;
  }
  return `<div class="placeholder"><div class="icon">＋</div><div>放 照 片</div></div>`;
}

// 章节切换：旧屏下推，新屏从下方升起
// 用法：goChapter('chapter-quiz-travel')
let currentChapterEl = null;
function goChapter(id) {
  const next = document.getElementById(id);
  if (!next) return console.warn('[goChapter] 找不到:', id);
  if (currentChapterEl === next) return;

  const prev = currentChapterEl;
  // 重置 next 的 transform/opacity/visibility（避免被卡住）
  next.style.visibility = '';
  next.style.transform = '';
  next.style.opacity = '';
  // 先让 next 也被布局（强制 reflow），再触发 transition
  // eslint-disable-next-line no-unused-expressions
  next.offsetHeight;
  next.classList.add('active');

  if (prev) {
    prev.classList.remove('active');
    prev.classList.add('leaving');
    // 转场结束后清理
    setTimeout(() => {
      prev.classList.remove('leaving');
      prev.style.visibility = 'hidden';
    }, 1100);
  }
  currentChapterEl = next;
  // 相册类章节滚动到顶部
  next.scrollTop = 0;
}

function insertChapterAfter(anchorId, html) {
  const anchor = document.getElementById(anchorId);
  if (!anchor) return;
  anchor.insertAdjacentHTML('afterend', html);
}

// 渲染旅行时间线（v11 改造）
// 一条垂直时间线呈现 10 个地点与时间：节点随滚动渐入（IntersectionObserver），
// hover/点击节点 → 展开该城市的 3 张照片；底部"前往问题"接开放问题章节。
function renderAlbumChapters() {
  const anchor = document.getElementById('chapter-album-travel');
  if (!anchor) return;

  anchor.outerHTML = `
    <section class="chapter album timeline" id="chapter-album-travel">
      <div class="album-head">
        <div class="album-eyebrow">TRAVEL · MEMORY</div>
        <div class="album-title">一起走过的路</div>
        <div class="album-sub">把光标放在城市上 · 看看那天的照片</div>
      </div>
      <div class="tl-wrap">
        <div class="tl-line"></div>
        ${ALBUM_TRAVEL.map(t => {
          // 时间：剥掉"XXX · "前缀只留日期，纯下划线占位则显示"—"
          const headDate = (t.date || '').split('·').pop().trim().replace(/^_+$/, '') || '—';
          const photos = (t.photos || []).map(p => `
            <div class="tl-photo">
              ${imgTag(p.img, p.place)}
              <div class="tl-photo-meta">
                <div class="tl-photo-place">${p.place || ''}</div>
                <div class="tl-photo-desc">${p.desc || ''}</div>
              </div>
            </div>
          `).join('');
          return `
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div class="tl-card">
                <div class="tl-time">${headDate}</div>
                <div class="tl-city">${t.title}</div>
                <div class="tl-photos">${photos}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      <div class="album-end">
        <div class="end-pin">TRAVEL · END</div>
        <div class="end-next">NEXT →</div>
        <button class="btn primary" data-next="chapter-chat-travel">continue</button>
      </div>
    </section>
  `;

  const sec = document.getElementById('chapter-album-travel');
  const items = sec.querySelectorAll('.tl-item');

  // 渐入：节点滚进视口时逐个浮现
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.2 });
  items.forEach(it => io.observe(it));

  // 点击展开该城市 3 张照片（同时收起其他；再点一次收起）——不用 hover，桌面手机行为一致
  items.forEach(item => {
    item.addEventListener('click', () => {
      if (item.classList.contains('open')) {
        item.classList.remove('open');
      } else {
        items.forEach(o => o.classList.remove('open'));
        item.classList.add('open');
      }
    });
  });
}

/* === 海报拼贴墙 / 票根墙（v7/v9 已删除，保留注释） === */
// 删除：POSTER_PALETTE / POSTER_LAYOUT / makePosterWallChapter / makeTicketChapter 全部移除。
// 音乐节=黑胶唱片翻面（方案 A）：正面=唱片封面（cover 自定义图），点击翻面 → 黑胶盘转动 + 3 张照片 + 回忆。

// 黑胶唱片工厂：正面封面（可自定义图）→ 点击翻面 → 背面黑胶盘转动 + 照片
function makeVinylChapter({ id, title, date, cover, photos, prevId, nextId, nextLabel, initial }) {
  const headDate = (date || '').split('·').pop().trim().replace(/^_+$/, '');
  // 封面图：优先用 cover 字段（用户自己放的照片），没有就用第一张照片，再没有就默认底色+首字
  const coverImg = (cover && cover.trim()) || (photos[0] && photos[0].img && photos[0].img.trim()) || '';
  // 中心标签文字：取 date 里 "·" 前面的部分（如 CAOMEI），没有就用首字
  const labelText = (date || '').split('·')[0].trim().replace(/^_+$/, '') || (title || 'LIVE').slice(0, 6);
  const photoCells = photos.map(p => `
    <div class="vb-photo">
      ${imgTag(p.img, p.place)}
      <div class="vb-place">${p.place || ''}</div>
    </div>
  `).join('');
  const memo = (photos[0] && photos[0].desc) || '';

  return `
    <section class="chapter album vinyl-page" id="${id}"
             data-prev="${prevId || ''}" data-next="${nextId || ''}">
      <div class="album-head">
        <div class="album-eyebrow">MUSIC · FESTIVAL</div>
        <div class="album-title">${title}</div>
        <div class="album-date">${headDate}</div>
      </div>
      <div class="vinyl-wall">
        <div class="vinyl-card">
          <div class="vinyl-inner">
            <div class="vinyl-face vf-cover">
              ${coverImg
                ? `<div class="vc-cover" style="background-image:url('${coverImg}');"></div>`
                : `<div class="vc-cover vc-cover--empty"><span>${initial || '♪'}</span></div>`}
              <div class="vc-info">
                <div class="vc-name">${title}</div>
                <div class="vc-date">${headDate || labelText}</div>
              </div>
            </div>
            <div class="vinyl-face vf-disc">
              <div class="vd-disc">
                <div class="vd-label">
                  <div class="vd-name">${labelText}</div>
                  <div class="vd-rpm">33⅓ RPM</div>
                </div>
              </div>
              <div class="vd-photos">${photoCells}</div>
              ${memo ? `<div class="vd-memo">${memo}</div>` : ''}
            </div>
          </div>
          <div class="vinyl-peek">滑 走 看 下 一 场 ‹</div>
        </div>
      </div>
    </section>
  `;
}

// 渲染所有音乐节 chapter（6 张黑胶唱片），并绑定"翻面"点击
function renderMusicChapters() {
  const anchor = document.getElementById('chapter-album-music');
  if (!anchor) return;

  // 第一场直接替换锚点章节
  const first = ALBUM_MUSIC[0];
  anchor.outerHTML = makeVinylChapter({
    id: 'chapter-album-music',
    title: first.title,
    date: first.date,
    cover: first.cover,
    photos: first.photos,
    prevId: 'chapter-quiz-music',
    nextId: ALBUM_MUSIC.length === 1 ? 'chapter-chat-music' : 'chapter-album-music-1',
    nextLabel: ALBUM_MUSIC.length === 1 ? 'OPEN A QUESTION' : ALBUM_MUSIC[1].title,
    initial: (first.title || 'LIVE').slice(0, 1)
  });

  // 剩余场次依次插入
  for (let i = 1; i < ALBUM_MUSIC.length; i++) {
    const fes = ALBUM_MUSIC[i];
    const isLast = i === ALBUM_MUSIC.length - 1;
    // 首章 id 无后缀（chapter-album-music），其余为 chapter-album-music-N
    const prevId = i === 1 ? 'chapter-album-music' : 'chapter-album-music-' + (i - 1);
    insertChapterAfter(prevId, makeVinylChapter({
      id: 'chapter-album-music-' + i,
      title: fes.title,
      date: fes.date,
      cover: fes.cover,
      photos: fes.photos,
      prevId: prevId,
      nextId: isLast ? 'chapter-chat-music' : 'chapter-album-music-' + (i + 1),
      nextLabel: isLast ? 'OPEN A QUESTION' : ALBUM_MUSIC[i + 1].title,
      initial: (fes.title || 'LIVE').slice(0, 1)
    }));
  }

  // 黑胶点击：正面 → 翻面看照片；背面 → 前进下一场（替代原 ↓ 按钮，保留滑动手势）
  document.querySelectorAll('.vinyl-page .vinyl-card').forEach(card => {
    card.addEventListener('click', () => {
      const sec = card.closest('.vinyl-page');
      const flipped = card.classList.contains('flipped');
      if (sec._vinylAuto) { clearTimeout(sec._vinylAuto); sec._vinylAuto = null; }
      if (!flipped) {
        // 正面：翻到背面
        card.classList.add('flipped');
        card.classList.add('peek');   // 背面展示"滑走看下一场"提示
      } else {
        // 背面：前进下一场
        const target = sec.dataset.next;
        if (target) goChapter(target);
      }
    });
  });

  // 上下滑动翻页：上滑 → 下一张唱片，下滑 → 上一张（最后一张上滑 → 前往问题）
  setupVinylSwipe();
}

// 音乐节滑动翻页：上滑 → 下一张唱片，下滑 → 上一张（最后一张上滑 → 前往问题）
function setupVinylSwipe() {
  const pages = [...document.querySelectorAll('.vinyl-page')];
  const goVinyl = (sec, dir) => {
    const target = dir === 'next' ? sec.dataset.next : sec.dataset.prev;
    if (target) {
      if (sec._vinylAuto) { clearTimeout(sec._vinylAuto); sec._vinylAuto = null; }
      setTimeout(() => goChapter(target), 60);
    }
  };
  pages.forEach(sec => {
    let startY = 0, tracking = false;
    sec.addEventListener('touchstart', e => { startY = e.touches[0].clientY; tracking = true; }, { passive: true });
    sec.addEventListener('touchend', e => {
      if (!tracking) return; tracking = false;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dy) < 40) return;
      goVinyl(sec, dy < 0 ? 'next' : 'prev');
    }, { passive: true });
  });
}


/* === 拍立得工厂 / 翻页书工厂（v6/v7 已删除，保留注释） === */
// 删除：POLAROID_LAYOUT / makePolaroidChapter / openPolaroidLightbox / makeBookChapter 全部移除。
// 公园=魔法门（方案 B）：chapter-album-park 是两扇门选择器（HTML 静态），点门进对应乐园照片页。

// 记录用户推开过哪几扇门（决定乐园页底部按钮是"另一扇门"还是"前往问题"）
let PARK_VISITED = [];

// 乐园照片页工厂：9 宫格照片墙 + 底部导航按钮
function makeParkChapter({ id, eyebrow, park, date, photos, theme }) {
  const gridCells = photos.map(p => `
    <div class="pg-cell">
      ${imgTag(p.img, p.place)}
    </div>
  `).join('');
  const headDate = (date || '').split('·').pop().trim().replace(/^_+$/, '');

  return `
    <section class="chapter album park-page ${theme}" id="${id}">
      <div class="album-head">
        <div class="album-eyebrow">${eyebrow}</div>
        <div class="album-title">${park}</div>
        <div class="album-date">${headDate}</div>
      </div>
      <div class="pg-grid">
        ${gridCells}
      </div>
      <div class="album-end">
        <div class="end-pin">${park} · END</div>
        <div class="end-next">NEXT →</div>
        <button class="btn primary park-nav" data-theme="${theme}">推开另一扇门</button>
      </div>
    </section>
  `;
}

// 渲染两个乐园照片页（迪士尼 + 环球），插在魔法门章节后面
function renderParkChapters() {
  const anchor = document.getElementById('chapter-album-park');
  if (!anchor) return;

  const disney = ALBUM_PARK[0];
  const universal = ALBUM_PARK[1];

  if (disney) {
    insertChapterAfter('chapter-album-park', makeParkChapter({
      id: 'chapter-album-park-disney',
      eyebrow: 'FAIRY · TALE · ONE',
      park: disney.title,
      date: disney.date,
      photos: disney.photos,
      theme: 'disney'
    }));
  }
  if (universal) {
    insertChapterAfter('chapter-album-park-disney', makeParkChapter({
      id: 'chapter-album-park-universal',
      eyebrow: 'FAIRY · TALE · TWO',
      park: universal.title,
      date: universal.date,
      photos: universal.photos,
      theme: 'universal'
    }));
  }
}

function renderFragments() {
  const stage = document.getElementById('fragments-list');
  // 插入 9 张碎片（3×3 网格，刮刮乐：每张盖一层"刮层"，手指擦开露出照片）
  const fragPieces = FRAGMENTS.map((p, i) => `
    <div class="frag-piece scratch-piece" data-frag="${i}"
         style="animation-delay:${i * 0.4}s;">
      <div class="frag-photo">${imgTag(p.img, p.place)}</div>
      <canvas class="scratch-layer" data-frag="${i}"></canvas>
      <div class="frag-caption"></div>
    </div>
  `).join('');
  // 在 next-fragments 按钮前插入网格容器
  const btn = document.getElementById('next-fragments');
  const grid = document.createElement('div');
  grid.className = 'frag-grid';
  grid.innerHTML = fragPieces;
  btn.parentElement.insertBefore(grid, btn);

  // 显示提示
  setTimeout(() => document.getElementById('frag-tip').classList.add('show'), 800);

  // 每张碎片：铺刮层 + 擦除交互；刮开后点击放大查看
  document.querySelectorAll('.scratch-piece').forEach(piece => {
    setupScratch(piece);
    piece.addEventListener('click', () => {
      if (!piece.classList.contains('scratched')) return;
      openFragLightbox(parseInt(piece.getAttribute('data-frag')));
    });
  });

  // 创建 lightbox 容器（一次创建多次复用）
  if (!document.getElementById('frag-lightbox')) {
    const lb = document.createElement('div');
    lb.className = 'frag-lightbox';
    lb.id = 'frag-lightbox';
    lb.innerHTML = `
      <div class="frag-lightbox-card">
        <div class="frag-lightbox-close">×</div>
        <div class="lb-photo"></div>
        <div class="lb-title"></div>
        <div class="lb-desc"></div>
      </div>
    `;
    document.body.appendChild(lb);
    lb.querySelector('.frag-lightbox-close').addEventListener('click', closeFragLightbox);
    lb.addEventListener('click', e => {
      if (e.target === lb) closeFragLightbox();
    });
  }
}

// 刮刮乐：canvas 涂层铺在照片上，手指/鼠标擦除露出照片
function setupScratch(piece) {
  const canvas = piece.querySelector('.scratch-layer');
  const photo = piece.querySelector('.frag-photo');
  const w = photo.clientWidth || 118;
  const h = photo.clientHeight || 118;
  const DPR = 2;
  canvas.width = w * DPR;
  canvas.height = h * DPR;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(DPR, DPR);

  // 刮层：奶油灰渐变（奖券手感）
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#EAE0CC');
  grad.addColorStop(1, '#D8CBB0');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  // 刮层提示文字
  ctx.fillStyle = 'rgba(92,75,82,0.55)';
  ctx.font = '600 12px "PingFang SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('刮 开 回 忆', w / 2, h / 2 - 8);
  ctx.font = '9px "PingFang SC", sans-serif';
  ctx.fillStyle = 'rgba(92,75,82,0.4)';
  ctx.fillText('用 手 指 擦 一 擦', w / 2, h / 2 + 10);

  let scratching = false;
  let scratchCount = 0;
  const getPos = e => {
    const r = canvas.getBoundingClientRect();
    const c = e.touches && e.touches[0] ? e.touches[0] : e;
    return { x: c.clientX - r.left, y: c.clientY - r.top };
  };
  const erase = (x, y) => {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath(); ctx.arc(x, y, 15, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2);  ctx.fill();
  };
  // 抽样检查刮除比例（每 4 设备像素取一个 alpha 点）
  const doneRatio = () => {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0, total = 0;
    for (let i = 3; i < data.length; i += 16) { total++; if (data[i] < 40) clear++; }
    return clear / total;
  };
  const finish = () => {
    piece.classList.add('scratched');
    canvas.style.transition = 'opacity .5s';
    canvas.style.opacity = '0';
    setTimeout(() => canvas.remove(), 500);
  };
  canvas.addEventListener('pointerdown', e => {
    scratching = true;
    try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
    const p = getPos(e); erase(p.x, p.y);
  });
  canvas.addEventListener('pointermove', e => {
    if (!scratching) return;
    const p = getPos(e); erase(p.x, p.y);
    if (++scratchCount % 6 === 0 && doneRatio() > 0.55) { scratching = false; finish(); }
  });
  const stop = () => { scratching = false; };
  canvas.addEventListener('pointerup', stop);
  canvas.addEventListener('pointercancel', stop);
}

function openFragLightbox(idx) {
  const p = FRAGMENTS[idx];
  const lb = document.getElementById('frag-lightbox');
  const photoHtml = p.img && p.img.trim()
    ? `<img src="${p.img}" alt="${p.place}">`
    : `<div style="font-size:14px;letter-spacing:3px;color:var(--ink-faint);">放 照 片</div>`;
  lb.querySelector('.lb-photo').innerHTML = photoHtml;
  lb.querySelector('.lb-title').textContent = p.place;
  lb.querySelector('.lb-desc').textContent = p.desc;
  lb.classList.add('show');
  // 模糊其他碎片
  document.querySelectorAll('.frag-piece').forEach(piece => {
    if (parseInt(piece.getAttribute('data-frag')) !== idx) piece.classList.add('dimmed');
  });
}

function closeFragLightbox() {
  document.getElementById('frag-lightbox').classList.remove('show');
  document.querySelectorAll('.frag-piece').forEach(piece => piece.classList.remove('dimmed'));
}

function renderMenu() {
  document.getElementById('menu-grid').innerHTML = MENU.map((d, i) => `
    <div class="flip-card" data-i="${i}">
      <div class="flip-inner">
        <div class="flip-face flip-front glass">
          <div class="dish-label">DISH 0${i+1}</div>
          <div class="dish-name">${d.name}</div>
        </div>
        <div class="flip-face flip-back">
          ${d.photo && d.photo.trim()
            ? `<img src="${d.photo}" alt="${d.name}">`
            : `<div class="photo-fallback"><div class="icon" style="width:40px;height:40px;border:1.5px dashed #D4738D;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#D4738D;font-size:18px;margin-bottom:10px;">＋</div><div>放 食 物 照 片</div></div>`}
          <div class="memo-tag">${d.memo}</div>
        </div>
      </div>
    </div>
  `).join('');
  // 翻牌交互
  document.querySelectorAll('#menu-grid .flip-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });
}

function renderCards() {
  document.getElementById('cards-grid').innerHTML = CARDS.map((c, i) => `
    <div class="qcard" data-i="${i}">
      <div class="qcard-inner">
        <div class="qcard-face qcard-front glass">
          <div class="q-num">CARD 0${i+1}</div>
          <div class="q-text">${c.q}</div>
        </div>
        <div class="qcard-face qcard-back">
          <div class="a-text">${c.a}</div>
        </div>
      </div>
    </div>
  `).join('');
  document.querySelectorAll('#cards-grid .qcard').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });
}

/* ============================================================
   蛋糕吹蜡烛 + 许愿
   ============================================================ */
// 打字机音效：短促"嗒"声（Web Audio 合成，零依赖；浏览器未解锁时静默跳过）
let typeCtx = null;
function playTypeTick() {
  try {
    if (!typeCtx) typeCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (typeCtx.state === 'suspended') typeCtx.resume();
    const o = typeCtx.createOscillator();
    const g = typeCtx.createGain();
    o.type = 'square';
    o.frequency.value = 1700 + Math.random() * 300;
    g.gain.setValueAtTime(0.045, typeCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, typeCtx.currentTime + 0.05);
    o.connect(g).connect(typeCtx.destination);
    o.start();
    o.stop(typeCtx.currentTime + 0.06);
  } catch (err) { /* 未解锁时静默 */ }
}

// 烟花爆炸音效：白噪声爆发 + 低通 + 0.4s 衰减，叠加 60Hz 低频"砰"（Web Audio 合成，零依赖）
let boomCtx = null;
function playBoom() {
  try {
    if (!boomCtx) boomCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (boomCtx.state === 'suspended') boomCtx.resume();
    const t = boomCtx.currentTime;
    // 噪声爆发（"砰"的主体，加长到 0.55s）
    const len = Math.floor(boomCtx.sampleRate * 0.55);
    const buf = boomCtx.createBuffer(1, len, boomCtx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const noise = boomCtx.createBufferSource();
    noise.buffer = buf;
    const lp = boomCtx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(2400, t);
    lp.frequency.exponentialRampToValueAtTime(280, t + 0.5);
    const g = boomCtx.createGain();
    g.gain.setValueAtTime(0.75, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
    noise.connect(lp).connect(g).connect(boomCtx.destination);
    noise.start(t);
    noise.stop(t + 0.58);
    // 低频 sub（更低更沉，110→35Hz 体感更强）
    const o = boomCtx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(110, t);
    o.frequency.exponentialRampToValueAtTime(35, t + 0.35);
    const og = boomCtx.createGain();
    og.gain.setValueAtTime(0.45, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    o.connect(og).connect(boomCtx.destination);
    o.start(t);
    o.stop(t + 0.37);
    // 高频"噼啪"（火星四溅的碎裂感）
    const crackLen = Math.floor(boomCtx.sampleRate * 0.18);
    const cb = boomCtx.createBuffer(1, crackLen, boomCtx.sampleRate);
    const cd = cb.getChannelData(0);
    for (let i = 0; i < crackLen; i++) {
      cd[i] = (Math.random() * 2 - 1) * (1 - i / crackLen) * (Math.random() > 0.7 ? 0.6 : 1);
    }
    const crack = boomCtx.createBufferSource();
    crack.buffer = cb;
    const hp = boomCtx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(2800, t);
    const cg = boomCtx.createGain();
    cg.gain.setValueAtTime(0.35, t);
    cg.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    crack.connect(hp).connect(cg).connect(boomCtx.destination);
    crack.start(t);
    crack.stop(t + 0.18);
  } catch (err) { /* 未解锁时静默 */ }
}

// 开场眉标打字机：HAPPY BIRTHDAY 逐字出现 + 光标 + 嗒嗒音效
// 加载即自动播放（无需点击）。本地 file:// 有声音；严格 https 下浏览器自动播放策略会静音（属限制，非 bug）
function typeOpeningEyebrow() {
  const el = document.getElementById('opening-eyebrow');
  if (!el) return;
  const full = (el.textContent || '').trim();
  if (!full) return;
  el.textContent = '';
  el.classList.add('typing');
  let i = 0;
  const timer = setInterval(() => {
    el.textContent = full.slice(0, ++i);
    playTypeTick();
    if (i >= full.length) {
      clearInterval(timer);
      setTimeout(() => el.classList.remove('typing'), 800);
    }
  }, 130);
}

function setupOpening() {
  const cake = document.getElementById('cake');
  const flame = document.getElementById('flame');
  const wishOverlay = document.getElementById('wish-overlay');
  const wishBtn = document.getElementById('wish-btn');

  // 开场眉标打字机（applyUIText 注入文案之后调用）
  typeOpeningEyebrow();

  cake.addEventListener('click', () => {
    if (flame.classList.contains('out')) return;
    flame.classList.add('out');
    // ★ user gesture：在点蜡烛的瞬间同步启动背景音乐（绕过自动播放限制）
    tryStartMusic();
    // 1 秒后弹出黑底许愿层
    setTimeout(() => { wishOverlay.classList.add('show'); }, 800);
  });

  wishBtn.addEventListener('click', () => {
    wishOverlay.classList.remove('show');
    // 许愿成真：黑层淡出后放中央烟花（mini：无背景色、范围适中）+ 爆炸音效
    setTimeout(() => startFireworks({ mini: true }), 350);
    // 爆炸音效响完（3 波 × 250ms ≈ 1.1s）后自动接音乐
    setTimeout(tryStartMusic, 1400);
    // 看 1.6 秒烟花，再下推进问答（衔接干净）
    setTimeout(() => goChapter('chapter-quiz-travel'), 1600);
    // 进入问答后停掉烟花（避免残留）
    setTimeout(stopFireworks, 2000);
  });
}

/* ============================================================
   问答（两个章节答案都是 天津）
   ============================================================ */
function setupQuiz({ inputId, hintId, successId, goId, nextChapter, answer }) {
  const input = document.getElementById(inputId);
  const hint = document.getElementById(hintId);
  const success = document.getElementById(successId);
  const go = document.getElementById(goId);

  const check = () => {
    const v = input.value.trim();
    if (v === answer) {
      hint.classList.remove('show');
      success.classList.add('show');
      go.classList.remove('hidden');
    } else {
      // 提示语为空时不显示（用户关闭了提示）
      if (hint && hint.textContent.trim()) hint.classList.add('show');
      success.classList.remove('show');
      go.classList.add('hidden');
    }
  };
  input.addEventListener('input', check);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
  go.addEventListener('click', () => setTimeout(() => goChapter(nextChapter), 200));
}

function setupAllQuizzes() {
  setupQuiz({
    inputId: 'quiz-travel-input',
    hintId:  'quiz-travel-hint',
    successId: 'quiz-travel-success',
    goId:    'go-travel',
    nextChapter: 'chapter-album-travel',
    answer:  '青岛'
  });
  setupQuiz({
    inputId: 'quiz-music-input',
    hintId:  'quiz-music-hint',
    successId: 'quiz-music-success',
    goId:    'go-music',
    nextChapter: 'chapter-album-music',
    answer:  '芒果音乐节'
  });
}

/* ============================================================
   对话气泡（开放问题，仅本次会话内有效，刷新即重置）
   ============================================================ */
const sessionAnswers = {};   // 每次刷新清空，不再持久化到 localStorage

function setupChat({ key, qId, inputId, saveId, nextChapter }) {
  // 替换问题文本（如配置了）
  const qEl = document.getElementById(qId);
  if (qEl) qEl.textContent = OPEN_QUESTIONS[key];

  document.getElementById(saveId).addEventListener('click', () => {
    const v = document.getElementById(inputId).value.trim();
    if (!v) { document.getElementById(inputId).focus(); return; }
    sessionAnswers[key] = v;   // 仅本次会话内保存，刷新即重置
    renderSummary();
    // 粉光扩散瞬间反馈
    const btnRect = document.getElementById(saveId).getBoundingClientRect();
    const burst = document.createElement('div');
    burst.className = 'burst-light';
    burst.style.left = (btnRect.left + btnRect.width/2 - 30) + 'px';
    burst.style.top  = (btnRect.top  + btnRect.height/2 - 30) + 'px';
    burst.style.width = '60px';
    burst.style.height = '60px';
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 650);
    // 答案从输入框飞起 + 自动转场（节省一次点击）
    const inputEl = document.getElementById(inputId);
    const r = inputEl.getBoundingClientRect();
    const fly = document.createElement('div');
    fly.className = 'flying-bubble';
    fly.textContent = v;
    fly.style.left = (r.left) + 'px';
    fly.style.top  = (r.top) + 'px';
    fly.style.maxWidth = Math.min(r.width, window.innerWidth * 0.7) + 'px';
    // 飞到屏幕中央顶部
    const tx = (window.innerWidth / 2) - (r.left + r.width / 2);
    const ty = -(r.top) + 80;
    fly.style.setProperty('--bx', tx + 'px');
    fly.style.setProperty('--by', ty + 'px');
    document.body.appendChild(fly);
    setTimeout(() => fly.remove(), 1000);
    // 输入框瞬间收起
    inputEl.style.transition = 'opacity .3s, transform .3s';
    inputEl.style.opacity = '0';
    inputEl.style.transform = 'scale(0.95)';
    document.getElementById(saveId).style.opacity = '0';
    setTimeout(() => { inputEl.style.display = 'none'; document.getElementById(saveId).style.display = 'none'; }, 300);
    // 800ms 后自动转场到下一章
    setTimeout(() => goChapter(nextChapter), 800);
  });
}

function setupAllChats() {
  setupChat({ key: 'travel',    qId: 'chat-travel-q',    inputId: 'chat-travel-input',    saveId: 'chat-travel-save',     nextChapter: 'chapter-quiz-music' });
  setupChat({ key: 'music',     qId: 'chat-music-q',     inputId: 'chat-music-input',     saveId: 'chat-music-save',      nextChapter: 'chapter-album-park' });
  setupChat({ key: 'park',      qId: 'chat-park-q',      inputId: 'chat-park-input',      saveId: 'chat-park-save',       nextChapter: 'chapter-fragments' });
  setupChat({ key: 'fragments', qId: 'chat-fragments-q', inputId: 'chat-fragments-input', saveId: 'chat-fragments-save',  nextChapter: 'chapter-menu' });
  setupChat({ key: 'food',      qId: 'chat-food-q',      inputId: 'chat-food-input',      saveId: 'chat-food-save',       nextChapter: 'chapter-cards' });

  // 每次保存后立即刷新汇总预览（实时反映）
  ['travel','music','park','fragments','food'].forEach(k => {
    document.getElementById('chat-' + k + '-save').addEventListener('click', renderSummary);
    document.getElementById('chat-' + k + '-input').addEventListener('input', renderSummary);
  });
}

/* ============================================================
   全局按钮：相册/碎片/menu/cards/汇总 的 next 按钮
   ============================================================ */
function setupGlobalNextButtons() {
  document.body.addEventListener('click', e => {
    // 音乐节黑胶章节自管翻页（翻面 3s 自动下滑 / ↓ 按钮），跳过全局委托，避免抢跳
    if (e.target.closest('.vinyl-page')) return;
    const btn = e.target.closest('[data-next], .park-nav');
    if (!btn) return;

    // 乐园页底部按钮：根据已访问的乐园动态决定去向
    if (btn.classList.contains('park-nav')) {
      const theme = btn.dataset.theme;
      const other = theme === 'disney' ? 'universal' : 'disney';
      const visitedOther = PARK_VISITED.includes(other);
      if (visitedOther) {
        // 两扇门都逛完了 → 按钮文字变 Next，去开放式问答
        btn.textContent = 'Next';
        setTimeout(() => goChapter('chapter-chat-park'), 200);
      } else {
        PARK_VISITED.push(other);
        setTimeout(() => goChapter('chapter-album-park-' + other), 200);
      }
      return;
    }

    const next = btn.getAttribute('data-next');
    // 魔法门：记录推开过哪扇门（用于乐园页按钮判断）
    if (btn.dataset.park) PARK_VISITED.push(btn.dataset.park);
    if (next) setTimeout(() => goChapter(next), 200);
  });

  // HTML 里没写在 data-next 的（quiz 等的连接）
  const linkMap = {
    'next-fragments': 'chapter-chat-fragments',
    'next-menu':      'chapter-cards',
    'next-cards':     'chapter-summary',
    'go-finale':      'chapter-finale'
  };
  Object.entries(linkMap).forEach(([btnId, target]) => {
    const btn = document.getElementById(btnId);
    if (btn) btn.addEventListener('click', () => setTimeout(() => goChapter(target), 200));
  });
}

/* ============================================================
   回答汇总
   ============================================================ */
function renderSummary() {
  const keys = ['travel', 'music', 'park', 'fragments', 'food'];
  const list = document.getElementById('summary-list');
  const empty = document.getElementById('summary-empty');
  list.innerHTML = '';
  let count = 0;
  keys.forEach(k => {
    const ans = sessionAnswers[k];
    if (ans && ans.trim()) {
      count++;
      const item = document.createElement('div');
      item.className = 'summary-item glass';
      item.innerHTML = `
        <div class="s-q">${OPEN_QUESTIONS[k]}</div>
        <div class="s-a">${ans}</div>
      `;
      list.appendChild(item);
    }
  });
  empty.style.display = count === 0 ? '' : 'none';
}

/* ============================================================
   烟花终章
   ============================================================ */
// 章节导航列表（用于侧拉栏）—— 来自 content.journey
// 想改章节标题？看 content.js 顶部的 journey 数组（注意 id 不要改，那是程序跳转用的）。

function buildJourneyDrawer() {
  // 抽屉（终点后由 showJourneyDrawer 自动弹出，用户没有手动入口按钮）
  const drawer = document.createElement('div');
  drawer.className = 'journey-drawer';
  drawer.id = 'journey-drawer';

  // 章节"已回答"标记：基于本次会话内答题记录（刷新即重置）
  const answered = new Set(['travel', 'music', 'park', 'fragments', 'food'].filter(k => sessionAnswers[k]));

  const itemsHtml = JOURNEY_LIST.map(j => {
    let status = '';
    if (j.id.includes('chat-travel') && answered.has('travel')) status = '✓';
    else if (j.id.includes('chat-music') && answered.has('music')) status = '✓';
    else if (j.id.includes('chat-park') && answered.has('park')) status = '✓';
    else if (j.id.includes('chat-fragments') && answered.has('fragments')) status = '✓';
    else if (j.id.includes('chat-food') && answered.has('food')) status = '✓';
    else if (j.id === 'chapter-summary') status = '↻';
    return `<li data-target="${j.id}">
      <span class="jl-label">${j.label}</span>
      <span class="jl-status">${status}</span>
    </li>`;
  }).join('');

  drawer.innerHTML = `
    <div class="journey-drawer-backdrop" id="journey-drawer-backdrop"></div>
    <div class="journey-drawer-panel">
      <div class="journey-drawer-head">
        <div class="journey-drawer-title">重温这趟旅程</div>
        <div class="journey-drawer-close" id="journey-drawer-close">×</div>
      </div>
      <div class="journey-drawer-eyebrow">CHAPTER MAP · ${JOURNEY_LIST.length} STOPS</div>
      <ul class="journey-list">${itemsHtml}</ul>
    </div>
  `;
  document.body.appendChild(drawer);

  // 绑定关闭
  document.getElementById('journey-drawer-close').addEventListener('click', closeJourneyDrawer);
  document.getElementById('journey-drawer-backdrop').addEventListener('click', closeJourneyDrawer);

  // 绑定章节跳转
  drawer.querySelectorAll('.journey-list li').forEach(li => {
    li.addEventListener('click', () => {
      const target = li.getAttribute('data-target');
      closeJourneyDrawer();
      // 兜底：跳转前先停掉烟花，避免残留画面覆盖目标章节
      stopFireworks();
      setTimeout(() => goChapter(target), 400);
    });
  });
}

function showJourneyDrawer() {
  openJourneyDrawer();   // 让抽屉在终章后自动弹出
  // 显示终章后常驻的左侧旅程入口（细线书签）
  const tab = document.getElementById('journey-tab');
  if (tab) tab.hidden = false;
  // 侧拉栏出现时烟花收场（finale 烟花停止持续发射，粒子自然消散，页面恢复干净）
  stopFireworks();
}

// 左侧常驻入口：点击重新打开旅程抽屉
function setupJourneyTab() {
  const tab = document.getElementById('journey-tab');
  if (!tab) return;
  tab.addEventListener('click', openJourneyDrawer);
}

function openJourneyDrawer() {
  document.getElementById('journey-drawer').classList.add('show');
}

function closeJourneyDrawer() {
  document.getElementById('journey-drawer').classList.remove('show');
}

function setupFinale() {
  const box = document.getElementById('giftbox');
  const restart = document.getElementById('restart-btn');

  // ① 点盒子：盒盖飞出 + 光晕闪现 + 一束烟花 + 彩带迸发（CSS 动画接力）
  // ② 信纸自盒中升起（1.9s）→ 文字分段浮现
  // ③ 升起后 ~3.4s 侧拉栏 → 再留白出"再看一遍"
  box.addEventListener('click', () => {
    if (box.classList.contains('open')) return;
    box.classList.add('open');
    startFireworks({ mini: true });   // 爆破那一束
    startConfettiRain();              // 彩带雨
    setTimeout(showJourneyDrawer, 3400);
    setTimeout(() => restart.classList.remove('hidden'), 4700);
  });

  restart.addEventListener('click', () => {
    location.reload();
  });
}

// 彩带雨：40 条彩色纸带从顶部飘落（跟侧拉栏同步出现）
function startConfettiRain() {
  const wrap = document.createElement('div');
  wrap.className = 'confetti-wrap';
  const colors = ['#FFD1DC', '#C5E0F2', '#FFD479', '#D4738D', '#7AA7CE', '#A85B5F', '#7E8B6F'];
  for (let i = 0; i < 40; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = (Math.random() * 100) + 'vw';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDelay = (Math.random() * 1.5) + 's';
    c.style.animationDuration = (2.6 + Math.random() * 2) + 's';
    c.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
    wrap.appendChild(c);
  }
  document.body.appendChild(wrap);
  setTimeout(() => wrap.remove(), 7000);
}

// 极简烟花（自研，零依赖，粒子更大更亮以适应浅色背景）
let fwTimer = null;  // 烟花持续发射定时器
let fwRaf = null;    // 烟花动画帧

// 极简烟花（自研，零依赖，粒子更大更亮以适应浅色背景）
// opts.mini = true 时放"中央小簇"（许愿场景）：范围小、粒子少、不持续发射，不盖全屏
function startFireworks(opts = {}) {
  // 清理上一次的定时器（许愿烟花 / finale 烟花可能多次调用）
  if (fwTimer) { clearInterval(fwTimer); fwTimer = null; }
  if (fwRaf) { cancelAnimationFrame(fwRaf); fwRaf = null; }
  const canvas = document.getElementById('fw');
  const ctx = canvas.getContext('2d');
  canvas.classList.add('show');
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  const parts = [];
  const colors = ['#D4738D', '#7AA7CE', '#FFD479', '#ffffff', '#5C4B52', '#A85B5F'];
  const noTrail = !!opts.mini;  // mini 模式：无拖尾背景色，画面始终透明
  function burst(x, y, n, spMin, spMax, r, life) {
    n = n || 80;
    spMin = spMin || 2; spMax = spMax || 6; r = r || 3.5; life = life || 1;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = Math.random() * (spMax - spMin) + spMin;
      parts.push({ x, y, vx: Math.cos(a)*sp, vy: Math.sin(a)*sp, life, c: colors[Math.floor(Math.random()*colors.length)], r });
    }
  }
  function tick() {
    if (noTrail) {
      // 无背景：直接清空上一帧（不残留奶油色拖尾）
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      // 用极淡的矩形逐帧绘制，保留粒子拖尾
      ctx.fillStyle = 'rgba(247, 240, 226, 0.10)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.x += p.vx; p.y += p.vy;
      p.vy += 0.06;
      p.vx *= 0.99;
      p.life -= 0.01;
      if (p.life <= 0) { parts.splice(i, 1); continue; }
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r || 3.5, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    // 已停止且粒子放完 → 结束动画循环（避免空转）
    if (parts.length === 0 && !canvas.classList.contains('show')) return;
    fwRaf = requestAnimationFrame(tick);
  }
  if (opts.mini) {
    // 许愿小簇：中央偏上 70% 区域，4 波，粒子稍多、寿命稍长，无持续发射，1.6s 内自然消散
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        burst(W*(0.15 + Math.random()*0.7), H*(0.15 + Math.random()*0.45), 60, 1.8, 4.8, 3, 0.7);
        playBoom();  // 每波爆炸音效
      }, i*250);
    }
    fwRaf = requestAnimationFrame(tick);
    return;
  }
  // finale：全屏多波 + 持续随机发射
  for (let i = 0; i < 5; i++) {
    setTimeout(() => burst(W*(0.2 + Math.random()*0.6), H*(0.2 + Math.random()*0.45)), i*250);
  }
  fwTimer = setInterval(() => {
    if (canvas.classList.contains('show')) {
      burst(W*Math.random()*0.7 + W*0.15, H*Math.random()*0.55 + H*0.15);
    }
  }, 600);
  fwRaf = requestAnimationFrame(tick);
}

// 停止烟花（许愿场景播放几秒后调用；finale 长放不调用）
function stopFireworks() {
  const canvas = document.getElementById('fw');
  canvas.classList.remove('show');
  if (fwTimer) { clearInterval(fwTimer); fwTimer = null; }
  // tick 会在粒子耗尽后自动退出 rAF 循环
}

/* ============================================================
   音乐
   ============================================================ */
// 全局音频对象：在 setupOpening 中点蜡烛时同步播放（满足 user gesture）
const BgMusic = {
  audio: null,
  curIdx: 0,
  ready: false,
  isPlaying: false,
  wantPlay: false
};

function setupMusic() {
  const btn = document.getElementById('music-btn');

  function tryNext() {
    if (BgMusic.curIdx >= SONGS.length) {
      btn.classList.add('hidden');
      return;
    }
    BgMusic.audio = new Audio(SONGS[BgMusic.curIdx]);
    BgMusic.audio.preload = 'auto';
    BgMusic.audio.load(); // 立即开始缓冲，缩短首次手势到出声的延迟
    BgMusic.audio.volume = 0.6;
    BgMusic.audio.addEventListener('ended', () => {
      BgMusic.curIdx++;
      tryNext();
      BgMusic.wantPlay = true; // 下一首在 canplay 时自动续播
    });
    // 缓冲就绪后若已请求播放且仍暂停，则自动续播（消除 ready/play 时序竞态）
    const autoStartIfWanted = () => {
      btn.classList.remove('hidden');
      BgMusic.ready = true;
      if (BgMusic.wantPlay && BgMusic.audio.paused) {
        BgMusic.audio.play().then(() => {
          BgMusic.isPlaying = true;
          btn.classList.add('playing');
          document.getElementById('music-hint').classList.add('hidden');
        }).catch(() => {});
      }
    };
    BgMusic.audio.addEventListener('canplay', autoStartIfWanted);
    BgMusic.audio.addEventListener('loadeddata', autoStartIfWanted);
    BgMusic.audio.addEventListener('playing', () => {
      BgMusic.isPlaying = true;
      btn.classList.add('playing');
      document.getElementById('music-hint').classList.add('hidden');
    });
    BgMusic.audio.addEventListener('error', () => {
      BgMusic.curIdx++;
      tryNext();
    });
  }

  btn.addEventListener('click', () => {
    if (!BgMusic.audio) return;
    if (BgMusic.audio.paused) {
      BgMusic.wantPlay = true;
      BgMusic.audio.play().then(() => {
        BgMusic.isPlaying = true;
        btn.classList.add('playing');
        document.getElementById('music-hint').classList.add('hidden');
      }).catch(() => {
        document.getElementById('music-hint').classList.remove('hidden');
      });
    } else {
      BgMusic.wantPlay = false;
      BgMusic.audio.pause();
      btn.classList.remove('playing');
      BgMusic.isPlaying = false;
    }
  });

  tryNext();
}

// 由 setupOpening 在 user gesture 中调用
function tryStartMusic() {
  if (!BgMusic.audio) return;
  BgMusic.wantPlay = true;
  // 在 user gesture 内调用 .play() 即可绕过自动播放限制，
  // 即使音频尚未缓冲完毕，浏览器也会在数据就绪后自动开始。
  const p = BgMusic.audio.play();
  if (p && p.then) {
    p.then(() => {
      BgMusic.isPlaying = true;
      document.getElementById('music-btn').classList.add('playing');
      document.getElementById('music-hint').classList.add('hidden');
    }).catch(() => { /* 数据未就绪：canplay 时会再次尝试 */ });
  }
}

/* ============================================================
   启动
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // 把 content.js 里的章节文案/按钮注入 HTML（HTML 静态作为默认值，content.js 存在则覆盖）
  applyUIText();
  buildJourneyDrawer();
  renderAlbumChapters();
  renderMusicChapters();
  renderParkChapters();
  renderFragments();
  renderMenu();
  renderCards();

  setupOpening();
  setupAllQuizzes();
  setupAllChats();
  setupGlobalNextButtons();
  renderSummary();
  setupFinale();
  setupJourneyTab();
  setupMusic();

  // 初始章节：opening
  goChapter('chapter-opening');
});
