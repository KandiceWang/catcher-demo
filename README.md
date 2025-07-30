# 台灣創作者接發案平台 Demo

## 專案概述
這是一個專為台灣創作者設計的接發案平台演示版本，讓團隊能夠快速預覽功能並提供回饋。

## 功能特色
- 🎨 創作者服務展示
- 🔍 智慧搜尋與篩選
- 💬 即時訊息系統
- 💰 透明的定價機制
- ⭐ 評價與信任系統
- 📱 響應式設計

## 技術堆疊
- **後端**: ASP.NET Core 8.0
- **前端**: Bootstrap 5 + jQuery
- **資料庫**: SQL Server LocalDB
- **認證**: ASP.NET Core Identity

## 快速開始

### 環境需求
- .NET 8.0 SDK
- Visual Studio 2022 或 VS Code
- SQL Server Express LocalDB

### 安裝步驟
```bash
# 複製專案
git clone https://github.com/你的用戶名/catcher-demo.git
cd catcher-demo

# 還原套件
dotnet restore

# 建立資料庫
dotnet ef database update

# 執行專案
dotnet run
```

### 本地開發
```bash
# 監看模式執行
dotnet watch run

# 開啟瀏覽器訪問
https://localhost:7000
```

## 專案結構
```
Catcher/
├── Controllers/        # MVC 控制器
├── Models/            # 資料模型
├── Views/             # Razor 視圖
├── wwwroot/           # 靜態資源
├── Data/              # 資料庫上下文
└── Services/          # 業務邏輯服務
```

## 部署

### Azure部署
專案已設置自動部署到Azure，每次推送到main分支時自動更新。

- **Demo網址**: https://catcher-demo.azurewebsites.net
- **測試帳號**: demo@catcher.tw / Demo123!

### GitHub Pages (靜態版本)
如需純前端展示，可部署靜態版本到GitHub Pages。

## 功能回饋

### 提交需求
請使用GitHub Issues提交功能需求：
1. 點擊 [Issues](https://github.com/你的用戶名/catcher-demo/issues)
2. 選擇對應的模板
3. 詳細描述需求

### 錯誤回報
發現錯誤請提供：
- 重現步驟
- 預期行為
- 實際結果
- 瀏覽器/裝置資訊

## 開發路線圖

### Phase 1 - 基礎功能 ✅
- [x] 使用者註冊/登入
- [x] 基礎頁面佈局
- [x] 服務列表展示

### Phase 2 - 核心功能 🚧
- [ ] 服務發布功能
- [ ] 搜尋與篩選
- [ ] 個人檔案管理
- [ ] 訊息系統

### Phase 3 - 進階功能 📋
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
