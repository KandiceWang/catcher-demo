# 🎯 Catcher - 創作者服務媒合平台

**類似 Upwork 的台灣創作者接發案平台**

[![Deploy to GitHub Pages](https://github.com/KandiceWang/catcher-demo/actions/workflows/deploy.yml/badge.svg)](https://github.com/KandiceWang/catcher-demo/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue)](https://kandicewang.github.io/catcher-demo/)

## 📋 專案概述

Catcher 是一個專為台灣創作者設計的服務媒合平台，連接有才華的創作者與需要服務的客戶。

### ✨ 功能特色
- 🎨 創作者服務展示與管理
- 🔍 智慧搜尋與篩選系統
- 💰 透明的定價機制
- ⭐ 評價與信任系統
- 📱 完全響應式設計 (Tailwind CSS)
- 🔐 安全的訂單與付款流程

### 🏗️ 技術架構
- **前端**: React 18 + TypeScript + Tailwind CSS
- **後端**: ASP.NET Core 8.0 + Entity Framework Core 9.0
- **資料庫**: Azure SQL Database
- **部署**: GitHub Pages (前端) + Azure App Service (後端)

## 📁 專案結構

```
Catcher/
├── 📁 docs/                     # 📋 所有文件
│   ├── analysis/                # 技術分析報告
│   ├── deployment/              # 部署指南
│   ├── development/             # 開發文件
│   ├── guides/                  # 使用指南
│   └── project-management/      # 專案管理
├── 📁 src/                      # 💻 原始碼
│   ├── backend/                 # ASP.NET Core 後端
│   └── frontend/                # React 前端
├── 📁 tests/                    # 🧪 測試檔案
├── 📁 scripts/                  # 🔧 自動化腳本
└── 📁 docker/                   # 🐳 Docker 設定
```

## 🚀 快速開始

### 📋 環境需求
- .NET 8.0 SDK
- Node.js 18+
- Visual Studio Code
- Azure CLI (部署時需要)

### 🔧 開發環境設定

**前端開發**
```bash
cd src/frontend
npm install
npm start          # 開發伺服器 http://localhost:3000
```

**後端開發**
```bash
cd src/backend
dotnet run         # API 伺服器 https://localhost:5001
```

### 📖 開發指南
詳細的開發注意事項請參考：[開發指南](docs/development/DEVELOPMENT_NOTES.md)

### ⚡ 安裝步驟

1. **複製專案**
```bash
git clone https://github.com/KandiceWang/catcher-demo.git
cd catcher-demo
```

2. **後端設定**
```bash
cd src/backend
dotnet restore
dotnet ef database update    # 需要先設定 Azure SQL 連接字串
dotnet run                   # https://localhost:5001
```

3. **前端設定**
```bash
cd src/frontend
npm install
npm start                    # http://localhost:3000
```

### 🔧 開發模式
```bash
# 後端監看模式
cd src/backend
dotnet watch run

# 前端開發模式  
cd src/frontend
npm start
```

## 📚 文件導覽

### 🚀 快速入門
- [📖 安裝指南](docs/guides/SETUP_INSTRUCTIONS.md) - 開發環境設定
- [🎯 快速開始](docs/guides/START_GUIDE.md) - 5分鐘上手指南
- [🔧 故障排除](docs/guides/TROUBLESHOOTING.md) - 常見問題解決

### 🏗️ 開發文件
- [⚛️ React 實作指南](docs/development/REACT_IMPLEMENTATION.md)
- [🔄 技術遷移計畫](docs/development/TECH_MIGRATION_PLAN.md)
- [📊 API 文件](docs/development/API_DOCUMENTATION.md)

### 🚀 部署指南
- [☁️ Azure 快速設定](docs/deployment/AZURE_DATABASE_QUICK_SETUP.md)
- [🗄️ 資料庫設定](docs/deployment/AZURE_SQL_CONFIGURATION.md)
- [📋 部署狀態](docs/deployment/DEPLOYMENT_STATUS.md)

### 📊 分析報告
- [🗄️ 資料庫選擇分析](docs/analysis/DATABASE_RECOMMENDATION.md)
- [🔒 安全性分析](docs/analysis/SECURITY_ANALYSIS.md)
- [📈 功能摘要](docs/analysis/COMPREHENSIVE_FEATURE_SUMMARY.md)

## 🌐 線上展示

### 🎯 Live Demo
- **前端展示**: [https://kandicewang.github.io/catcher-demo/](https://kandicewang.github.io/catcher-demo/)
- **後端 API**: 待 Azure 部署完成

### 🧪 測試帳號 (未來功能)
```
創作者帳號: creator@demo.com / Demo123!
客戶帳號: client@demo.com / Demo123!
```

## 🤝 貢獻指南

### 📝 提交需求
1. 前往 [Issues](https://github.com/KandiceWang/catcher-demo/issues)
2. 選擇適當的問題模板
3. 詳細描述需求或問題

### 🐛 錯誤回報
發現問題請提供：
- 重現步驟
- 預期行為 vs 實際結果
- 瀏覽器和作業系統版本
- 錯誤訊息截圖

## 📈 開發路線圖

### ✅ Phase 1 - 基礎架構 (已完成)
- [x] 前端 React + Tailwind 架構
- [x] 後端 ASP.NET Core + EF Core
- [x] 資料庫模型設計
- [x] GitHub Pages 部署

### 🚧 Phase 2 - 核心功能 (進行中)
- [ ] Azure SQL Database 連接
- [ ] API 控制器開發
- [ ] 前後端整合
- [ ] 使用者認證系統

### � Phase 3 - 進階功能 (規劃中)
- [ ] 服務發布與管理
- [ ] 搜尋與篩選系統
- [ ] 即時訊息功能
- [ ] 付款整合

## 💰 成本估算

### Azure 資源 (每月)
- SQL Database (基本層): $5 USD
- App Service (B1): $13 USD
- Storage Account: $1 USD
- **總計**: 約 $19 USD/月

## 📄 授權

本專案採用 MIT 授權 - 詳見 [LICENSE](LICENSE) 檔案

## 🙏 致謝

- React 與 Tailwind CSS 社群
- ASP.NET Core 開發團隊
- 所有貢獻者和測試用戶

---

**⭐ 如果這個專案對您有幫助，請給我們一個 Star！**

� 聯絡我們: [您的信箱]  
🌐 官方網站: [待建立]
- [ ] 訂單管理
- [ ] 支付整合
- [ ] 評價系統
- [ ] 手機App

## 聯絡方式
如有任何問題或建議，請聯絡：
- Email: your-email@example.com
- GitHub: [@你的用戶名](https://github.com/你的用戶名)

## 授權
本專案採用 MIT 授權條款。
