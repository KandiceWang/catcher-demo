# 📁 Catcher Demo 專案重構計畫

## 🎯 **重構目標**
- 清晰的資料夾結構，按功能和技術分層
- 統一的命名規範
- 分離開發文件、部署文件、和程式碼
- 便於新開發者快速理解專案結構

## 🏗️ **建議的新專案結構**

```
Catcher/                              # 專案根目錄 (重新命名)
├── 📁 docs/                          # 📋 所有文件集中管理
│   ├── 📁 development/               # 開發相關文件
│   │   ├── API_DOCUMENTATION.md
│   │   ├── BACKEND_EVALUATION.md
│   │   ├── DATABASE_SCHEMA.md
│   │   ├── REACT_IMPLEMENTATION.md
│   │   └── TECH_MIGRATION_PLAN.md
│   ├── 📁 deployment/                # 部署相關文件
│   │   ├── AZURE_DATABASE_QUICK_SETUP.md
│   │   ├── AZURE_DATABASE_SETUP_GUIDE.md
│   │   ├── AZURE_SQL_CONFIGURATION.md
│   │   ├── DEPLOYMENT_EXPLANATION.md
│   │   └── DEPLOYMENT_STATUS.md
│   ├── 📁 analysis/                  # 分析報告
│   │   ├── AZURE_DATABASE_COMPARISON.md
│   │   ├── DATABASE_RECOMMENDATION.md
│   │   ├── SECURITY_ANALYSIS.md
│   │   └── COMPREHENSIVE_FEATURE_SUMMARY.md
│   ├── 📁 guides/                    # 使用指南
│   │   ├── SETUP_INSTRUCTIONS.md
│   │   ├── START_GUIDE.md
│   │   ├── TROUBLESHOOTING.md
│   │   └── REACT_TAILWIND_GUIDE.md
│   └── 📁 project-management/        # 專案管理
│       ├── PROJECT_HANDOVER_REPORT.md
│       ├── PROJECT_STRUCTURE.md
│       ├── DETAILED_FEATURES_GUIDE.md
│       └── GIT_BACKUP.md
├── 📁 src/                           # 💻 所有程式碼
│   ├── 📁 backend/                   # 後端 (.NET Core)
│   │   ├── 📁 Controllers/
│   │   │   ├── Api/                  # API 控制器
│   │   │   │   ├── UsersController.cs
│   │   │   │   ├── CreatorsController.cs
│   │   │   │   ├── ServicesController.cs
│   │   │   │   ├── OrdersController.cs
│   │   │   │   └── TestController.cs
│   │   │   └── Mvc/                  # MVC 控制器
│   │   │       └── HomeController.cs
│   │   ├── 📁 Data/
│   │   │   ├── CatcherDbContext.cs
│   │   │   ├── Repositories/         # Repository 模式
│   │   │   └── Configurations/       # Entity 設定
│   │   ├── 📁 Models/
│   │   │   ├── Entities/             # 資料庫實體
│   │   │   ├── DTOs/                 # 資料傳輸物件
│   │   │   └── ViewModels/           # 視圖模型
│   │   ├── 📁 Services/              # 商業邏輯服務
│   │   │   ├── Interfaces/
│   │   │   └── Implementations/
│   │   ├── 📁 Middleware/            # 中介軟體
│   │   ├── 📁 Extensions/            # 擴展方法
│   │   ├── 📁 Migrations/            # EF 遷移檔案
│   │   ├── 📁 Views/                 # MVC 視圖 (如果需要)
│   │   ├── 📁 wwwroot/               # 靜態檔案
│   │   ├── appsettings.json
│   │   ├── appsettings.Development.json
│   │   ├── Program.cs
│   │   └── Catcher.Backend.csproj
│   └── 📁 frontend/                  # 前端 (React)
│       ├── 📁 public/
│       ├── 📁 src/
│       │   ├── 📁 components/        # 可重用元件
│       │   │   ├── Common/           # 通用元件
│       │   │   ├── Forms/            # 表單元件
│       │   │   └── Layout/           # 版面元件
│       │   ├── 📁 pages/             # 頁面元件
│       │   │   ├── Home/
│       │   │   ├── Services/
│       │   │   ├── Creators/
│       │   │   └── Orders/
│       │   ├── 📁 hooks/             # 自定義 Hooks
│       │   ├── 📁 services/          # API 服務層
│       │   ├── 📁 types/             # TypeScript 類型定義
│       │   ├── 📁 utils/             # 工具函數
│       │   ├── 📁 styles/            # 樣式檔案
│       │   ├── App.tsx
│       │   └── index.tsx
│       ├── package.json
│       ├── tailwind.config.js
│       └── tsconfig.json
├── 📁 tests/                         # 🧪 測試檔案
│   ├── 📁 backend/
│   │   ├── 📁 Unit/
│   │   ├── 📁 Integration/
│   │   └── Catcher.Tests.csproj
│   └── 📁 frontend/
│       ├── 📁 __tests__/
│       └── jest.config.js
├── 📁 scripts/                       # 🔧 自動化腳本
│   ├── build.sh / build.ps1
│   ├── deploy.sh / deploy.ps1
│   └── setup-dev.sh / setup-dev.ps1
├── 📁 docker/                        # 🐳 Docker 相關
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── docker-compose.override.yml
├── 📁 .github/                       # GitHub 相關
│   └── workflows/
├── .gitignore
├── .editorconfig
├── Catcher.sln
├── README.md
└── CHANGELOG.md
```

## 🎯 **重構執行計畫**

### 階段一：建立新結構 (30分鐘)
1. 建立新的資料夾結構
2. 移動現有檔案到對應位置
3. 更新專案參考和路徑

### 階段二：清理與整理 (20分鐘)
1. 刪除廢棄檔案
2. 更新檔案內的路徑參考
3. 統一命名規範

### 階段三：文件整理 (15分鐘)
1. 更新 README.md
2. 建立各資料夾的 README
3. 更新專案結構文件

## 🔧 **實施細節**

### 需要移動的檔案對應表
```
舊位置 → 新位置
─────────────────────────────────────────────
./AZURE_*.md → docs/deployment/
./DATABASE_*.md → docs/analysis/
./BACKEND_*.md → docs/development/
./REACT_*.md → docs/development/
./SECURITY_*.md → docs/analysis/
./SETUP_*.md → docs/guides/
./Catcher-demo/ → src/backend/
./catcher-frontend/ → src/frontend/
```

### 需要刪除的檔案
- creator.html, creators.html, portfolio.html, test.html
- css/, js/, images/ (根目錄下的，已被前端專案取代)
- data/ (測試資料，應移到測試專案中)

### 需要更新的設定檔
- Catcher.sln (更新專案路徑)
- .github/workflows/ (更新建置路徑)
- package.json (更新 homepage 路徑)

## 💡 **重構後的優勢**

1. **清晰的結構** - 按功能和技術分層，易於理解
2. **標準化命名** - 統一的命名規範，便於維護
3. **文件集中管理** - 所有文件按類型分類，易於查找
4. **擴展性** - 為未來功能預留空間 (tests/, scripts/, docker/)
5. **團隊協作** - 新成員可快速理解專案結構

## ⚠️ **注意事項**

1. 移動檔案前先提交目前變更
2. 更新所有相對路徑參考
3. 測試建置和部署流程
4. 更新團隊文件和 Wiki

## 📋 **檢查清單**

- [ ] 備份目前專案
- [ ] 建立新資料夾結構
- [ ] 移動程式碼檔案
- [ ] 移動文件檔案
- [ ] 刪除廢棄檔案
- [ ] 更新專案設定
- [ ] 更新建置腳本
- [ ] 測試本地開發環境
- [ ] 測試部署流程
- [ ] 更新 README 和文件
