# ✅ 開發檢查清單

## 🎯 **每次開發前檢查**

### 📍 **環境檢查**
- [ ] Git 倉庫是最新版本 (`git pull origin master`)
- [ ] Node.js 依賴是最新的 (`cd src/frontend && npm install`)
- [ ] .NET 專案可正常建置 (`cd src/backend && dotnet build`)
- [ ] 開發伺服器可正常啟動

### 📍 **分支管理**
- [ ] 從 master 創建新的功能分支 (`git checkout -b feature/功能名稱`)
- [ ] 分支命名清楚明確
- [ ] 避免直接在 master 分支開發

---

## 🎯 **開發過程中檢查**

### 📍 **程式碼品質**
- [ ] TypeScript 無型別錯誤
- [ ] ESLint 無警告 (特別注意 anchor href 問題)
- [ ] 程式碼風格一致
- [ ] 適當的註解和文檔

### 📍 **功能測試**
- [ ] 前端功能在瀏覽器正常運作
- [ ] 後端 API 正確回應
- [ ] 響應式設計在不同螢幕尺寸正常
- [ ] 無 JavaScript 控制台錯誤

### 📍 **安全檢查**
- [ ] 無硬編碼的 API 金鑰或密碼
- [ ] 敏感資料使用環境變數
- [ ] 表單驗證正確實施
- [ ] SQL 查詢使用參數化

---

## 🎯 **提交前檢查**

### 📍 **建置測試**
- [ ] 前端建置無錯誤 (`npm run build`)
- [ ] 後端建置無錯誤 (`dotnet build`)
- [ ] 建置產出檔案正確
- [ ] 無遺漏的檔案或依賴

### 📍 **版本控制**
- [ ] 所有變更檔案已加入 (`git add .`)
- [ ] 提交訊息清楚明確 (`git commit -m "feat: 功能描述"`)
- [ ] 遵循提交訊息規範 (feat/fix/docs/style/refactor/test/chore)

### 📍 **文檔更新**
- [ ] README.md 如有需要已更新
- [ ] API 文檔已更新 (如有 API 變更)
- [ ] 版本號已更新 (如有重大變更)

---

## 🎯 **部署前檢查**

### 📍 **部署準備**
- [ ] 所有測試通過
- [ ] 建置在本地環境正常
- [ ] 環境變數設定正確
- [ ] 資料庫遷移檔案準備完成

### 📍 **推送部署**
- [ ] 推送到遠端倉庫 (`git push origin master`)
- [ ] GitHub Actions 工作流程執行成功
- [ ] 部署到 GitHub Pages 無錯誤
- [ ] 線上網站功能正常

### 📍 **部署後驗證**
- [ ] https://kandicewang.github.io/catcher-demo/ 正常顯示
- [ ] 所有頁面和功能正常運作
- [ ] 響應式設計正常
- [ ] 無 404 錯誤或缺失資源

---

## 🎯 **常見問題檢查**

### ❌ **GitHub Pages 顯示 404**
- [ ] 檢查 `package.json` 中的 `homepage` 設定
- [ ] 確認 `.nojekyll` 檔案存在
- [ ] 檢查 GitHub Actions 部署是否成功
- [ ] 確認 `gh-pages` 分支有正確內容

### ❌ **ESLint anchor-is-valid 警告**
- [ ] 使用 `<button>` 取代無效的 `<a href="#">`
- [ ] 或使用 React Router 的 `<Link>` 組件
- [ ] 確保所有連結都有有效的 href 值

### ❌ **建置失敗**
- [ ] 檢查 Node.js 版本 (建議 18+)
- [ ] 清除快取 (`npm clean-cache --force`)
- [ ] 重新安裝依賴 (`rm -rf node_modules && npm install`)
- [ ] 檢查 TypeScript 錯誤

### ❌ **API 連接問題**
- [ ] 檢查 CORS 設定
- [ ] 確認 API 端點 URL 正確
- [ ] 檢查網路連接和防火牆
- [ ] 驗證 API 金鑰和認證

---

## 📱 **快速命令參考**

```bash
# 開發環境啟動
cd src/frontend && npm start
cd src/backend && dotnet run

# 建置測試
cd src/frontend && npm run build
cd src/backend && dotnet build

# 程式碼檢查
cd src/frontend && npm run lint

# 部署流程
git add .
git commit -m "feat: 功能描述"
git push origin master
```

---

**💡 提示**: 將此檢查清單加入書籤，每次開發時參考使用！
