# 📋 Changelog

All notable changes to the Catcher project will be documented in this file.

## [Unreleased]

### 🏗️ Restructured (2025-08-04)
- **BREAKING**: 完全重構專案資料夾結構
- 移動後端程式碼從 `Catcher-demo/` 到 `src/backend/`
- 移動前端程式碼從 `catcher-frontend/` 到 `src/frontend/`
- 整理所有文件到 `docs/` 資料夾，按類型分類：
  - `docs/analysis/` - 技術分析報告
  - `docs/deployment/` - 部署相關文件
  - `docs/development/` - 開發相關文件
  - `docs/guides/` - 使用指南
  - `docs/project-management/` - 專案管理文件
- 刪除廢棄的 HTML 檔案和重複的靜態資源
- 更新 Solution 檔案的專案路徑
- 建立各資料夾的 README 說明檔案
- 完全重寫主要 README.md

### 📁 Removed
- `creator.html`, `creators.html`, `portfolio.html`, `test.html`
- 根目錄下的 `css/`, `js/`, `images/`, `data/` 資料夾
- 舊的 `Catcher-demo/` 和 `catcher-frontend/` 資料夾

### 📝 Added
- `docs/README.md` - 文件導覽指南
- `src/README.md` - 原始碼說明
- `CHANGELOG.md` - 本檔案

### 🔧 Fixed
- 修正 `Catcher.sln` 中的專案路徑
- 統一命名規範

## [v0.1.0] - 2025-08-03

### ✅ Added
- 初始 ASP.NET Core 8.0 後端架構
- React 18 + TypeScript 前端應用
- Entity Framework Core 資料模型
- Azure SQL Database 設定指南
- GitHub Pages 自動部署
- 完整的技術文件

### 🎯 Features
- Upwork 風格的前端設計
- 使用者、創作者、服務、訂單資料模型
- 資料庫遷移檔案
- 測試 API 控制器

---

## 🔗 Links
- [專案主頁](https://github.com/KandiceWang/catcher-demo)
- [Live Demo](https://kandicewang.github.io/catcher-demo/)
- [Issues](https://github.com/KandiceWang/catcher-demo/issues)

---

## 📝 格式說明
此檔案基於 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/) 格式，
並遵循 [語義化版本](https://semver.org/lang/zh-TW/) 規範。

### 變更類型
- `Added` 新增功能
- `Changed` 功能變更
- `Deprecated` 即將移除的功能
- `Removed` 已移除的功能
- `Fixed` 問題修正
- `Security` 安全性更新
