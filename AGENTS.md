# AGENTS.md — astro-blog-shokax

**Generated:** 2026-05-25
**Commit:** 0785d2b
**Branch:** main

## OVERVIEW

Hexo Theme ShokaX 的 Astro 重建版——Astro 6 + Svelte 5 + UnoCSS + Pagefind 的 SSG 部落格主題。

## STRUCTURE

```
astro-blog-shokax/
├── src/
│   ├── toolkit/      # 可複用工具函式庫（共置 *.test.ts）
│   ├── components/   # Astro/Svelte UI 組件（見子目錄 AGENTS.md）
│   ├── pages/        # 路由頁面（見子目錄 AGENTS.md）
│   ├── posts/        # 文章 content collection（非標準位置，不在 src/content/）
│   ├── moments/      # 動態/說說 content collection
│   ├── content/      # ⚠️ 非 Astro Content Collections，僅存放直接匯入的 .md/.mdx
│   ├── layouts/      # Layout.astro (外殼) + TwoColumn/ThreeColumn
│   ├── styles/       # 12 個 CSS 檔案（palette/layout/post/view-transition 等）
│   ├── i18n/         # i18next + locales JSON (zh-CN, zh-TW, en, ja)
│   ├── stores/       # Svelte 5 全域 stores（sidebarStore, encryptedTocStore）
│   ├── remark-plugins/ # 自訂 remark 插件 (spoiler/note/span, .mjs 副檔名)
│   ├── content.config.ts  # posts + moments collection schema
│   ├── theme.config.ts    # 🌟 主題配置入口（全站身份/導航/側邊欄/封面/評論/版面）
│   └── types.d.ts         # 全域型別宣告
├── tests/e2e/        # Playwright E2E（見子目錄 AGENTS.md）
├── public/           # 靜態資源（l2d_resource, carousel-covers.json）
├── astro.config.mjs  # 🌟 Astro 配置
├── uno.config.ts     # UnoCSS 配置（⚠️ 不能用 @ 別名）
├── hyacine.yml       # HyC CMS 配置
└── hyacine.plugin.ts # Hyacine 插件（SiteUpTime, MouseFirework）
```

## WHERE TO LOOK

| 任務 | 位置 | 備註 |
|------|------|------|
| 新增/修改頁面路由 | `src/pages/` | 遵循 Astro 檔案路由 |
| 修改主題設定 | `src/theme.config.ts` | 型別由 `src/toolkit/themeConfig.ts` 定義 |
| 新增可複用 helper | `src/toolkit/` | 需附共置 `*.test.ts` |
| 新增 MDX 組件 | `src/components/mdx/` | 需在 `astro.config.mjs` AutoImport 註冊 |
| 修改全域版面 | `src/layouts/Layout.astro` | NavBar/Sidebar/Footer/全域腳本 |
| 修改 CSS 變數 | `src/styles/palette.css` | UnoCSS 色彩映射見 `uno.config.ts` |
| 新增文章 | `src/posts/` | 資料夾名即為分類（`withFolderCategories`） |
| 新增 remark 插件 | `src/remark-plugins/` | `.mjs` 副檔名，在 `astro.config.mjs` 註冊 |
| 搜尋功能 | Pagefind | `data-pagefind-body` 屬性控制索引範圍 |
| 文章加密 | `src/toolkit/encryption/` | AES-256-GCM + PBKDF2，密碼僅構建時使用 |

## CONVENTIONS

- 運行時與包管理器：**Bun**（`packageManager: bun@1.3.12`），所有腳本用 `bunx --bun`
- 預設溝通語言：**中文**（輸出與程式碼註解優先中文）
- 路由：`trailingSlash: "always"` + `build.format: "directory"`——內部連結保留尾 `/`
- Svelte 5 使用 runes 風格（`$state/$props/$effect`），禁止 `export let`
- 分頁拆分：第 1 頁 = `/`（`index.astro`），第 2+ 頁 = `/page/<n>/`（`page/[page].astro` 過濾 `page === "1"`）
- Custom element Svelte 組件需在 Layout 隱藏渲染一次以註冊（如 `<CodeBlock client:idle />`）
- `src/content/` **不是** Astro Content Collections 目錄，僅放直接匯入的靜態內容
- Content collections 定義在 `src/content.config.ts`，資料在 `src/posts/` 和 `src/moments/`
- `uno.config.ts` 不能用 `@/*` 別名，需用相對路徑匯入 theme.config
- 圖示慣例：`i-ri-*`（Remix Icon），UnoCSS safelist 從 theme.config 自動提取
- 建構分兩階段：`build:site`（Astro）→ `build:index`（Pagefind），缺少後者搜尋將失效
- Docker 建構用 Debian slim（非 Alpine），因 `cn-font-split` 需要 glibc
- 新增依賴時需回報：套件名稱、用途、使用範圍

## ANTI-PATTERNS (THIS PROJECT)

- ❌ 不要自創命令——優先使用 `package.json` 腳本
- ❌ 不要偏離現有架構（Astro + Svelte 5 + UnoCSS + Pagefind）
- ❌ 不要新增「工作總結 Markdown 報告」檔案——直接在聊天中總結
- ❌ 不要使用 `as any`、`@ts-ignore`（現有 2 處 `@ts-*` 為已知例外，需附說明）
- ❌ 不要使用 Svelte 4 `export let` 語法
- ❌ 不要在 `uno.config.ts` 使用 `@/*` 別名
- ❌ 不要移除 `data-pagefind-body` 屬性
- ❌ 不要只跑 `build:site` 而跳過 `build:index`（Pagefind 索引會缺失）
- ❌ 不要使用 CommonJS（`require`/`module.exports`）——全 ESM 專案

## COMMANDS

```bash
bun run dev              # 開發伺服器
bun run build            # 建構 + Pagefind 索引
bun run check            # Astro 型別檢查 + svelte-check
bun run lint             # oxlint --type-aware --type-check --fix
bun run format           # oxfmt
bun run test             # bun test src（單元測試）
bun run e2e:smoke        # Playwright @smoke 標籤
bun run e2e:critical     # Playwright @critical 標籤
bun run e2e:regression   # Playwright @regression 標籤
bun run check-links      # Lychee 死連結檢查
```

## NOTES

- 實驗性功能已啟用：`rustCompiler` + `queuedRendering`（Astro 6 experimental）
- 現有 `@ts-ignore` 2 處：`src/toolkit/encryption/crypto.ts`（Bun crypto 型別缺失）、`src/components/footer/Widgets.svelte`（Waline TS 定義不完整）
- `src/components/Loading.astro` 有 TODO：僅在第一次訪問時顯示載入動畫
- Lighthouse CI 門檻：perf ≥ 0.92, a11y ≥ 0.9, best-practices/seo ≥ 0.95
- CI 流程：bun install → build → lint → check → unit test → lychee → E2E
- `src/posts/` 資料夾名透過 `withFolderCategories` 自動對映為文章分類
