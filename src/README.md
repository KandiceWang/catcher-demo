# 💻 Source Code

本資料夾包含 Catcher 專案的所有原始碼：

## 📁 資料夾結構

### 🔧 backend/
ASP.NET Core 8.0 後端應用程式
- **Controllers/** - API 和 MVC 控制器
- **Data/** - Entity Framework 和資料存取
- **Models/** - 資料模型和 ViewModels
- **Services/** - 商業邏輯服務
- **Migrations/** - 資料庫遷移檔案
- **Views/** - MVC 視圖 (如有需要)
- **wwwroot/** - 靜態檔案

### ⚛️ frontend/
React 18 + TypeScript 前端應用程式
- **src/components/** - 可重用元件
- **src/pages/** - 頁面元件
- **src/services/** - API 服務層
- **src/hooks/** - 自定義 React Hooks
- **src/types/** - TypeScript 類型定義
- **src/utils/** - 工具函數

## 🚀 開發指令

### 後端開發
```bash
cd src/backend
dotnet run                    # 啟動後端 (https://localhost:5001)
dotnet watch run             # 監看模式
dotnet ef database update    # 更新資料庫
```

### 前端開發
```bash
cd src/frontend
npm start                    # 啟動前端 (http://localhost:3000)
npm run build               # 建置生產版本
```

## 📋 開發規範

- 後端使用 C# 命名規範 (PascalCase)
- 前端使用 TypeScript 嚴格模式
- 所有 API 控制器放在 `Controllers/Api/` 下
- 共用元件放在 `components/Common/` 下
