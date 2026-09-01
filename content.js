/* ==========================================================================
   ★ 内容中心 · content.js
   --------------------------------------------------------------------------
   【这是什么？】
   这是整个生日网站的"内容档案"。想改文字？改这里。想换照片？改这里。
   改这一个文件就能改变网站里所有看得见的文字和图片，
   不需要碰 index.html、style.css、script.js。

   【怎么改？】
   1. 改文字 → 直接改引号 "" 或 '' 里的中文字
   2. 改图片 → 把图片文件放到 assets/images/ 对应目录里，
      然后把路径写到对应 img 字段（路径以 assets/images/ 开头）
   3. 不想改 → 留空字符串 '' 即可，会显示"放 照 片"占位

   【路径速查】
   - 旅行照片   → assets/images/memories/travel/
   - 音乐节照片 → assets/images/memories/music/
   - 乐园照片   → assets/images/memories/parks/
   - 日常碎片   → assets/images/memories/fragments/
   - 歌曲文件   → assets/music/

   【文件命名建议】
   - 用英文短词 + 序号，方便排序：travel-tianjin-river.png
   - 不要用中文 / 空格 / 特殊符号
   ========================================================================== */


const CONTENT = {

  /* ========================================================================
     1. 基础信息（开场大屏、许愿页、倒计时）
     ======================================================================== */
  site: {
    // 大名字（许愿页、开场都显示这个）
    name:          'Crystal',
    // 公历生日（倒计时用这个，格式 YYYY-MM-DD）
    birthday:      '2026-10-03',
    // 农历生日（仅展示用）
    lunarBirthday: '农历八月廿三',
    // 开场眉标英文
    initial:       'HAPPY BIRTHDAY',
  },

  /* ========================================================================
     2. 开场蛋糕页
     ======================================================================== */
  opening: {
    initial:     'HAPPY BIRTHDAY',         // 眉标
    name:        'Crystal',                // 大名字
    dateLine:    '10月3日 · 农历八月廿三', // 名字下方的日期
    cakeHint:    '点一下小蜡烛',           // 蛋糕下方提示
    wishText:    '闭上眼睛 · 许个愿吧',     // 许愿页中央字
    wishButton:  '我许好了',             // 许愿页按钮
  },

  /* ========================================================================
     3. 旅行回忆（10 城，每城 3 张照片）
     --------------------------------------------------------------------------
     每张照片三个字段：
       img   - 图片路径（留空 '' 显示"放照片"占位）
       place - 拍摄地点（卡片标题用）
       desc  - 你的回忆描述（一句话）
     --------------------------------------------------------------------------
     改法：想加城市？复制一段 {...} 改 city 名字和 photos 数组，逗号别漏。
     ======================================================================== */
  travel: [
    {
      title: '青岛',
      date: 'QINGDAO · 2023.07',
      photos: [
        { img: 'assets/images/memories/travel/travel-qingdao-1.jpg' },
        { img: 'assets/images/memories/travel/travel-qingdao-2.jpg' },
        { img: 'assets/images/memories/travel/travel-qingdao-3.jpg' },
      ],
    },
    {
      title: '天津',
      date: 'TIANJIN · 2023.10',
      photos: [
        { img: 'assets/images/memories/travel/travel-tianjin-1.jpg' },
        { img: 'assets/images/memories/travel/travel-tianjin-2.jpg' },
        { img: 'assets/images/memories/travel/travel-tianjin-3.jpg' },
      ],
    },
    {
      title: '南京', date: 'NANJING · 2024.05',
      photos: [
        { img: 'assets/images/memories/travel/travel-nanjing-1.jpg' },
        { img: 'assets/images/memories/travel/travel-nanjing-2.jpg' },
        { img: 'assets/images/memories/travel/travel-nanjing-3.jpg' },
      ],
    },
    {
      title: '呼和浩特', date: 'HOHHHOT · 2024.06',
      photos: [
        { img: 'assets/images/memories/travel/travel-hohhot-1.jpg' },
        { img: 'assets/images/memories/travel/travel-hohhot-2.jpg' },
        { img: 'assets/images/memories/travel/travel-hohhot-3.jpg' },
      ],
    },
    {
      title: '阿那亚', date: 'ANAYA · 2025.04',
      photos: [
        { img: 'assets/images/memories/travel/travel-anaya-1.jpg' },
        { img: 'assets/images/memories/travel/travel-anaya-2.jpg' },
        { img: 'assets/images/memories/travel/travel-anaya-3.jpg' },
      ],
    },
    {
      title: '龙庆峡', date: 'LONGQING · 2025.10',
      photos: [
        { img: 'assets/images/memories/travel/travel-longqing-1.jpg' },
        { img: 'assets/images/memories/travel/travel-longqing-2.jpg' },
        { img: 'assets/images/memories/travel/travel-longqing-3.jpg' },
      ],
    },
    {
      title: '上海', date: 'SHANGHAI · 2025.12',
      photos: [
        { img: 'assets/images/memories/travel/travel-shanghai-1.jpg' },
        { img: 'assets/images/memories/travel/travel-shanghai-2.jpg' },
        { img: 'assets/images/memories/travel/travel-shanghai-3.jpg' },
      ],
    },
    {
      title: '武汉', date: 'WUHAN · 2026.04',
      photos: [
        { img: 'assets/images/memories/travel/travel-wuhan-1.jpg' },
        { img: 'assets/images/memories/travel/travel-wuhan-2.jpg' },
        { img: 'assets/images/memories/travel/travel-wuhan-3.jpg' },
      ],
    },
    {
      title: '合肥', date: 'HEFEI · 2026.05',
      photos: [
        { img: 'assets/images/memories/travel/travel-hefei-1.jpg' },
        { img: 'assets/images/memories/travel/travel-hefei-2.jpg' },
        { img: 'assets/images/memories/travel/travel-hefei-3.jpg' },
      ],
    },
    {
      title: '古北水镇', date: 'GUBEI · 2026.07',
      photos: [
        { img: 'assets/images/memories/travel/travel-gubei-1.jpg' },
        { img: 'assets/images/memories/travel/travel-gubei-2.jpg' },
        { img: 'assets/images/memories/travel/travel-gubei-3.jpg' },
      ],
    },
  ],

  /* ========================================================================
     4. 音乐节回忆（6 场，每场 cover 封面 + 3 张照片）
     --------------------------------------------------------------------------
     每场一个对象：
       cover - 唱片封面图（用户自己的封面图）
       photos - 3 张现场照片（img 图片路径）
     ======================================================================== */
  music: [
    {
      title: '芒果音乐节', date: 'MANGGUO',
      cover: 'assets/images/memories/music/music-mango-cover.jpg',
      photos: [
        { img: 'assets/images/memories/music/music-mango-1.jpg' },
        { img: 'assets/images/memories/music/music-mango-2.jpg' },
        { img: 'assets/images/memories/music/music-mango-3.jpg' },
      ],
    },
    {
      title: '咪豆音乐节', date: 'MIDOU',
      cover: 'assets/images/memories/music/music-midou-cover.jpg',
      photos: [
        { img: 'assets/images/memories/music/music-midou-1.jpg' },
        { img: 'assets/images/memories/music/music-midou-2.jpg' },
        { img: 'assets/images/memories/music/music-midou-3.jpg' },
      ],
    },
    {
      title: 'MDSK 音乐节', date: 'MDSK',
      cover: 'assets/images/memories/music/music-mdsk-cover.jpg',
      photos: [
        { img: 'assets/images/memories/music/music-mdsk-1.jpg' },
        { img: 'assets/images/memories/music/music-mdsk-2.jpg' },
        { img: 'assets/images/memories/music/music-mdsk-3.jpg' },
      ],
    },
    {
      title: '奇遇海音乐节', date: 'QIYUHAI',
      cover: 'assets/images/memories/music/music-qiyuhai-cover.jpg',
      photos: [
        { img: 'assets/images/memories/music/music-qiyuhai-1.jpg' },
        { img: 'assets/images/memories/music/music-qiyuhai-2.jpg' },
        { img: 'assets/images/memories/music/music-qiyuhai-3.jpg' },
      ],
    },
    {
      title: 'MDSK音乐节', date: 'MDSK',
      cover: 'assets/images/memories/music/music-mangodui-cover.jpg',
      photos: [
        { img: 'assets/images/memories/music/music-mangodui-1.jpg' },
        { img: 'assets/images/memories/music/music-mangodui-2.jpg' },
        { img: 'assets/images/memories/music/music-mangodui-3.jpg' },
      ],
    },
    {
      title: '葫芦果音乐节', date: 'HULUGUO',
      cover: 'assets/images/memories/music/music-huluguo-cover.jpg',
      photos: [
        { img: 'assets/images/memories/music/music-huluguo-1.jpg' },
        { img: 'assets/images/memories/music/music-huluguo-2.jpg' },
        { img: 'assets/images/memories/music/music-huluguo-3.jpg' },
      ],
    },
  ],

  /* ========================================================================
     5. 童话回忆（迪士尼 + 环球，每场 9 张照片 9宫格）
     ======================================================================== */
  parks: [
    {
      title: 'Disneyland', date: 'DISNEY · ____',
      photos: [
        { img: 'assets/images/memories/parks/park-disney-1.jpg' },
        { img: 'assets/images/memories/parks/park-disney-2.jpg' },
        { img: 'assets/images/memories/parks/park-disney-3.jpg' },
        { img: 'assets/images/memories/parks/park-disney-4.jpg' },
        { img: 'assets/images/memories/parks/park-disney-5.jpg' },
        { img: 'assets/images/memories/parks/park-disney-6.jpg' },
        { img: 'assets/images/memories/parks/park-disney-7.jpg' },
        { img: 'assets/images/memories/parks/park-disney-8.jpg' },
        { img: 'assets/images/memories/parks/park-disney-9.jpg' },
      ],
    },
    {
      title: 'Universal Studios', date: 'UNIVERSAL · ____',
      photos: [
        { img: 'assets/images/memories/parks/park-universal-1.jpg' },
        { img: 'assets/images/memories/parks/park-universal-2.jpg' },
        { img: 'assets/images/memories/parks/park-universal-3.jpg' },
        { img: 'assets/images/memories/parks/park-universal-4.jpg' },
        { img: 'assets/images/memories/parks/park-universal-5.jpg' },
        { img: 'assets/images/memories/parks/park-universal-6.jpg' },
        { img: 'assets/images/memories/parks/park-universal-7.jpg' },
        { img: 'assets/images/memories/parks/park-universal-8.jpg' },
        { img: 'assets/images/memories/parks/park-universal-9.jpg' },
      ],
    },
  ],

  /* ========================================================================
     6. 日常快乐碎片（9 张悬浮小照片，刮开查看，点击放大）
     ======================================================================== */
  fragments: [
    { img: 'assets/images/memories/fragments/fragment-01.jpg' },
    { img: 'assets/images/memories/fragments/fragment-02.jpg' },
    { img: 'assets/images/memories/fragments/fragment-03.jpg' },
    { img: 'assets/images/memories/fragments/fragment-04.jpg' },
    { img: 'assets/images/memories/fragments/fragment-05.jpg' },
    { img: 'assets/images/memories/fragments/fragment-06.jpg' },
    { img: 'assets/images/memories/fragments/fragment-07.jpg' },
    { img: 'assets/images/memories/fragments/fragment-08.jpg' },
    { img: 'assets/images/memories/fragments/fragment-09.jpg' },
  ],

  /* ========================================================================
     7. 一起吃过的饭（12 道菜，正面是菜名，翻面是照片和回忆）
     ======================================================================== */
  food: [
    { name: '一家著名的面店', photo: 'assets/images/memories/food/food-01.jpg', memo: '王繁星，一个馋字，无需多说' },
    { name: '猜猜是哪家的烤鱼', photo: 'assets/images/memories/food/food-02.jpg', memo: '哪一家是你的烤鱼TOP1' },
    { name: '一家神秘的店',   photo: 'assets/images/memories/food/food-03.jpg', memo: '永不缺席的辛拉面和部队锅' },
    { name: ' 口味奇特的火锅', photo: 'assets/images/memories/food/food-04.jpg', memo: '云南酸汤，或许我们共同的TOP1？' },
    { name: '神秘自习室', photo: 'assets/images/memories/food/food-05.jpg', memo: '当然是俄式厨房' },
    { name: '💗', photo: 'assets/images/memories/food/food-06.jpg', memo: '分别是为了下一次更好的遇见' },
    { name: '🦀', photo: 'assets/images/memories/food/food-07.jpg', memo: '必不可少的胖哥俩' },
    { name: '著名地标美食', photo: 'assets/images/memories/food/food-08.jpg', memo: '才饮长沙水' },
    { name: ' Citywalk的尽头', photo: 'assets/images/memories/food/food-09.jpg', memo: '上海必吃榜' },
    { name: '乐园之夜', photo: 'assets/images/memories/food/food-10.jpg', memo: '泡泡玛特一餐' },
    { name: '又一地标美食', photo: 'assets/images/memories/food/food-11.jpg', memo: '每次旅行都吃的很好' },
    { name: '色彩绚烂', photo: 'assets/images/memories/food/food-12.jpg', memo: '好吃的绿油油的米饭' },
  ],

  /* ========================================================================
     8. 翻卡问答（你的心里话，6 张）
     ======================================================================== */
  cards: [
    { q: '我最喜欢的时刻？',         a: '喜欢我们每次出去玩一天结束，身体疲惫但神经兴奋，晚上躺在酒店床上一起看照片的时候，你一言我一语，回味快乐的每一刻。' },
    { q: '我希望我们一起做的一件事是？',     a: '1. 想去景德镇烧盘子。2. 去韩国玩。3. 去俄罗斯玩。4.暂时没想到，点子解锁中。' },
    { q: '你身上我最羡慕的一点？',           a: '决定好的事情就勇往直前。我真的被你身上这种坚定的气场改变了很多，而且我自己是比较思前想后，犹豫不决，想做但总害怕失败的性格，但过去几年，你给了我很多意想不到的力量。每次我有什么想法都会大声鼓励我的婷子，我要好好努力成为你最拿得出手的好朋友。' },
    { q: '我最喜欢你的地方？',   a: '真心换真心，傲娇的狮子座需要一个真诚的天秤。' },
    { q: '你治愈我的一个瞬间？',             a: '那次舞会和你一起跳舞的时候，真的非常非常想哭，但是那个瞬间好像所有困扰的事情都消失了，还有每次我不开心都会喊我做一些有意思的事情， 比如带我一起玩剧本杀，玩桌游，羽毛球，还有一起学游泳，因为有你都快乐加倍。' },
    { q: '祝我们下一个十年？',               a: '祝我们下一个十年依旧可以一起看音乐节，一起旅行，一起向对方吐露心声，向彼此展露我们的脆弱、坚强、勇敢和伤心的故事。' },
  ],

  /* ========================================================================
     9. 开放问题（每章末尾的气泡对话，让 ta 写下回答）
     ======================================================================== */
  openQuestions: {
    travel:    '这些旅程里你最开心的是？',
    music:     '哪一次音乐节最让你难忘？',
    park:      '最喜欢的乐园项目是？',
    fragments: '你最喜欢的日常活动？',
    food:      '和我一起吃过的美食TOP1？',
  },

  /* ========================================================================
     10. 章节文案（每章的标题、问题、按钮等）
     --------------------------------------------------------------------------
     这些是"框架性文案"——日常不用改，但都在这里方便你统一管理。
     ======================================================================== */
  chapters: {
    quizTravel: {
      eyebrow:  'CHAPTER ONE · TRAVEL',
      sub:      '回忆第一站 · 从一次旅行开始',
      question: '还记得我们第一次一起坐高铁去的目的地吗？',
      hint:     '',
      success:  '回 到 那 一 天',
      enterBtn: '进入回忆',
    },
    quizMusic: {
      eyebrow:  'CHAPTER TWO · FESTIVAL',
      sub:      '回忆第二站 · 从一次音符开始',
      question: '我们的第一场音乐节是？',
      hint:     '',
      success:  '回 到 那 一 天',
      enterBtn: '进入回忆',
    },
    fragments: {
      eyebrow: 'DAILY · FRAGMENTS',
      title:   '日常快乐碎片',
      tip:     '刮 开 一 张 · 看 回 忆',
      button:  ' Continue →',
    },
    menu: {
      eyebrow: 'CHAPTER FOUR · EAT WITH YOU',
      title:   '一起吃过的饭',
      end:     '12 FLAVORS · 12 MEMORIES',
      button:  'One More Question →',
    },
    cards: {
      eyebrow: 'CHAPTER FIVE · CARDS',
      title:   '我想对你说的话',
      end:     '6 WHISPERS · 6 CARDS',
      button:  '来看看你写下的',
    },
    summary: {
      eyebrow: 'CHAPTER SIX · TOGETHER',
      title:   '回忆 · 让我们一起写完',
      empty:   '她 还 没 留 下 任 何 回 答 哦',
      button:  ' Finally',
    },
    finale: {
      eyebrow: 'HAPPY · BIRTHDAY',
      title:   'Happy Birthday, Crystal',
      sub:     ' ',
      button:  '再 看 一 遍',
    },
    musicHint: '轻点播放音乐',
    nextLabel:  '下一章',
    openQBtn:   'Next',
  },

  /* ========================================================================
     11. 音乐文件
     --------------------------------------------------------------------------
     放一首歌就填一项。把音乐文件放进 assets/music/，再在这里写路径。
     ======================================================================== */
  songs: [
    'assets/music/song.m4a',
  ],

  /* ========================================================================
     12. 侧拉栏旅程清单（左侧抽屉菜单，显示章节标题）
     --------------------------------------------------------------------------
     label 字段可以改成你喜欢的标题（如"第一次旅行"）。
     id 字段是 chapter id，**不要改**——这是程序跳转用的。
     ======================================================================== */
  journey: [
    { id: 'chapter-opening',         label: '开场' },
    { id: 'chapter-album-travel',    label: '旅行' },
    { id: 'chapter-album-music',     label: '音乐节' },
    { id: 'chapter-album-park',      label: '魔法门' },
    { id: 'chapter-fragments',       label: '日常快乐碎片' },
    { id: 'chapter-menu',            label: '一起吃过的饭' },
    { id: 'chapter-cards',           label: '心里话' },
  ],
};


// 暴露到全局
window.CONTENT = CONTENT;
