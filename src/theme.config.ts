// cannot use path alias here because unocss can not resolve it
import { defineConfig } from "./toolkit/themeConfig";

export default defineConfig({
  siteName: "結露的神秘小屋",
  locale: "zh-TW", // 推薦用 zh-CN 或 zh-TW
  // === 首頁品牌區 (大標題/副標題) ===
  brand: {
    title: "結露的神秘小屋", // alternate
    subtitle: "今天喝的是綠茶", // subtitle
    logo: "✨",
  },

  // === 側邊欄信息 (來自 _config.shokax.yml) ===
  sidebar: {
    author: "ketsuro",
    description: "收著一堆垃圾話的小地方",

    // 社交鏈接轉換
    social: {
      github: {
        url: "https://github.com/XketsuroX",
        icon: "i-ri-github-fill",
      },
      twitter: {
        url: "https://twitter.com/ketsuro_",
        icon: "i-ri-twitter-x-fill",
        color: "#1da1f2",
      },
      bangumi: {
        url: "https://bangumi.tv/user/886021",
        icon: "i-ri-bilibili-fill", // 這裡用 B站 icon 代替
        color: "#ffb6c1",
      },
      email: {
        url: "mailto:ketsuro04@outlook.com",
        icon: "i-ri-mail-fill",
        color: "#55acd5",
      },
    },
  },

  // === 導航欄 (你的 Menu 轉換) ===
  nav: [
    {
      text: "首頁",
      href: "/",
      icon: "i-ri-home-line",
    },
    {
      text: "文章",
      href: "/archives/", // 這裡指向歸檔頁
      icon: "i-ri-file-list-3-line",
      dropbox: {
        enable: true,
        items: [
          { text: "歸檔", href: "/archives/", icon: "i-ri-archive-fill" },
          { text: "分類", href: "/categories/", icon: "i-ri-layout-grid-fill" },
          { text: "標籤", href: "/tags/", icon: "i-ri-price-tag-3-fill" },
        ],
      },
    },
    {
      text: "友鏈",
      href: "/friends/",
      icon: "i-ri-heart-fill",
    },
    {
      text: "關於",
      href: "/about/",
      icon: "i-ri-user-smile-line",
      dropbox: {
        enable: false,
        items: [
          { text: "關於我", href: "/about/", icon: "i-ri-user-3-fill" },
          { text: "打賞", href: "/admiration/", icon: "i-ri-cup-line" },
        ],
      },
    },
  ],

  // === 版權聲明 (來自 creative_commons: by-nc-sa) ===
  copyright: {
    license: "CC-BY-NC-SA-4.0",
    show: true,
  },

  // === 頁腳信息 (來自 footer 節點) ===
  footer: {
    since: 2024,
    icon: {
      name: "sakura rotate",
      color: "#ffc0cb",
    },
    count: true, // 顯示字數統計
    powered: true, // 顯示 Powered by Astro
    icp: {
      enable: false, // 你之前開 false，保持原樣
    },
  },

  // === 頁腳小組件 ===
  widgets: {
    randomPosts: true,
    recentComments: true,
  },

  // === 友鏈（來自舊 Hexo friends 頁） ===
  friends: {
    title: "友鏈",
    description: "一些有趣的朋友們與站點。",
    links: [
      {
        url: "https://moe.lolicon.io/",
        title: "Neko Palace - 白上貓的溫馨小窩",
        desc: "一片既充滿知識又堆滿垃圾的海洋",
        author: "白上ねこ",
        avatar: "https://r2.lolicon.io/blog/assets/avatar_512.webp",
        color: "#e9546b",
      },
    ],
  },

  // === 音樂播放器 (來自 audio 節點) ===
  nyxPlayer: {
    enable: true,
    urls: [
      {
        name: "Default Playlist",
        url: "https://music.163.com/#/playlist?id=2943811283",
      },
    ],
  },

  // === 封面圖配置 ===
  cover: {
    enable: true,
    preload: true,
    fixedCover: {
      enable: false, // false 代表使用輪播，true 代表固定一張
      url: "cover-1", // 如果上面是 true，這裡填圖片名
    },
    carouselSource: "/carousel-covers.json",
    gradient: false, // 設为 false，否則會變成純色漸變
    nextGradientCover: false,
  },

  // === 首頁顯示設置 ===
  home: {
    pageSize: 10,
  },

  // === 三欄右側區 ===
  layout: {
    mode: "three-column",
    rightSidebar: {
      announcement: true,
      search: true,
      calendar: true,
      recentMoments: true,
      randomPosts: true,
      tagCloud: true,
      order: ["announcement", "search", "calendar", "recentMoments", "randomPosts", "tagCloud"],
    },
  },
});
