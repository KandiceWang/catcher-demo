# 🚀 Catcher 專案開發注意事項

## ✅ 目前狀態
- **GitHub Pages**: https://kandicewang.github.io/catcher-demo/ ✅ 正常運作
- **部署方式**: GitHub Actions → gh-pages 分支 ✅ 已設定完成
- **專案結構**: ✅ 已重新整理完成
- **本地開發環境**: ✅ 可正常建置

---

## 📋 開發注意事項清單

### 🎯 **1. 前端開發 (React)**

#### 📍 **開發環境設定**
```bash
# 進入前端目錄
cd src/frontend

# 安裝依賴
npm install

# 開發模式運行 (http://localhost:3000)
npm start

# 生產建置
npm run build
```

#### ⚠️ **重要注意事項**
- **路徑設定**: `package.json` 中的 `homepage` 已設為 `/catcher-demo/`，確保 GitHub Pages 路徑正確
- **ESLint 警告**: 目前有 anchor href 無效值警告，建議修正：
  ```typescript
  // ❌ 避免
  <a href="#">連結</a>
  
  // ✅ 建議
  <button className="link-style" onClick={handleClick}>連結</button>
  // 或使用 React Router
  <Link to="/path">連結</Link>
  ```

#### 🔧 **技術堆疊**
- **React 18** + **TypeScript**
- **Tailwind CSS** (已設定完成)
- **建議添加**: React Router for SPA 路由

---

### 🎯 **2. 後端開發 (ASP.NET Core)**

#### 📍 **開發環境設定**
```bash
# 進入後端目錄
cd src/backend

# 運行開發伺服器
dotnet run

# 或使用 VS Code Task (推薦)
# Ctrl+Shift+P → "Tasks: Run Task" → "Run Catcher Demo"
```

#### ⚠️ **重要注意事項**
- **資料庫連線**: 目前使用範本連線字串，需要設定實際的 Azure SQL Database
- **CORS 設定**: 如果前後端分離部署，需要正確設定 CORS
- **環境變數**: 敏感資訊應使用環境變數或 Azure Key Vault

#### 🔧 **技術堆疊**
- **ASP.NET Core 8.0**
- **Entity Framework Core 9.0**
- **Azure SQL Database** (計劃中)

---

### 🎯 **3. 部署流程**

#### 📍 **GitHub Pages 自動部署**
```bash
# 每次推送到 master 分支會自動觸發部署
git add .
git commit -m "功能描述"
git push origin master

# 約 2-3 分鐘後在 https://kandicewang.github.io/catcher-demo/ 看到更新
```

#### ⚠️ **部署注意事項**
- **工作流程**: 使用 `.github/workflows/react-deploy.yml`
- **建置路徑**: 自動從 `src/frontend/build/` 部署到 `gh-pages` 分支
- **Jekyll 禁用**: `.nojekyll` 檔案確保不被 Jekyll 處理
- **建置警告**: ESLint 警告不會阻止部署，但建議修正

---

### 🎯 **4. 資料庫開發**

#### 📍 **Entity Framework 操作**
```bash
# 進入後端目錄
cd src/backend

# 添加新的遷移
dotnet ef migrations add MigrationName

# 更新資料庫
dotnet ef database update

# 移除最後一個遷移 (如果有錯誤)
dotnet ef migrations remove
```

#### ⚠️ **資料庫注意事項**
- **連線字串**: 在 `appsettings.json` 和 `appsettings.Development.json` 中設定
- **Azure SQL**: 正式環境建議使用 Azure SQL Database
- **本地開發**: 可使用 SQL Server LocalDB 或 SQLite
- **資料種子**: 考慮在 `Program.cs` 中加入測試資料

---

### 🎯 **5. 程式碼品質**

#### 📍 **代碼檢查**
```bash
# 前端 ESLint 檢查
cd src/frontend
npm run lint

# TypeScript 型別檢查
npm run type-check
```

#### ⚠️ **品質注意事項**
- **TypeScript**: 嚴格模式已啟用，確保型別安全
- **ESLint**: 修正所有警告，特別是無障礙相關
- **Prettier**: 建議設定程式碼格式化
- **測試**: 目前缺少單元測試，建議補充

---

### 🎯 **6. 安全性考量**

#### ⚠️ **安全注意事項**
- **API 金鑰**: 絕不在前端代碼中硬編碼 API 金鑰
- **環境變數**: 敏感配置使用環境變數
- **HTTPS**: 生產環境強制使用 HTTPS
- **CORS**: 正確設定允許的來源域名
- **SQL 注入**: 使用 Entity Framework 參數化查詢

---

### 🎯 **7. 效能優化**

#### 📍 **前端優化**
- **圖片優化**: 使用 WebP 格式，添加 lazy loading
- **Bundle 分割**: 考慮使用 React.lazy() 進行代碼分割
- **快取策略**: 設定適當的瀏覽器快取標頭

#### 📍 **後端優化**
- **資料庫索引**: 為常用查詢欄位添加索引
- **快取**: 考慮使用 Redis 或記憶體快取
- **連接池**: 設定適當的資料庫連接池大小

---

## 🛠️ **開發工作流程建議**

### 📍 **日常開發流程**
1. **拉取最新代碼**: `git pull origin master`
2. **創建功能分支**: `git checkout -b feature/功能名稱`
3. **本地開發和測試**
4. **提交變更**: `git commit -m "feat: 功能描述"`
5. **推送分支**: `git push origin feature/功能名稱`
6. **創建 Pull Request** (可選，但建議)
7. **合併到 master**: 自動觸發部署

### 📍 **測試流程**
1. **本地測試**: 前後端功能測試
2. **建置測試**: `npm run build` 確保無錯誤
3. **部署測試**: 推送後檢查 GitHub Pages

---

## 📚 **常用命令速查**

### 前端
```bash
cd src/frontend
npm start          # 開發伺服器
npm run build      # 生產建置
npm run lint       # 代碼檢查
```

### 後端
```bash
cd src/backend
dotnet run         # 開發伺服器
dotnet build       # 建置專案
dotnet test        # 運行測試
```

### Git
```bash
git status         # 檢查狀態
git add .          # 添加所有變更
git commit -m ""   # 提交變更
git push origin master  # 推送到遠端
```

---

## 🔗 **重要連結**

- **線上網站**: https://kandicewang.github.io/catcher-demo/
- **GitHub 倉庫**: https://github.com/KandiceWang/catcher-demo
- **GitHub Actions**: https://github.com/KandiceWang/catcher-demo/actions
- **專案文檔**: [docs/README.md](../README.md)

---

## 📅 **更新記錄**
- **2025-08-05**: GitHub Pages 部署修正完成，創建開發注意事項文檔
