# 快速測試腳本

## 如果npm start失敗，嘗試以下步驟：

### 1. 檢查Node.js版本
```bash
node --version
npm --version
```
需要Node.js 16+

### 2. 清除快取並重新安裝
```bash
cd "d:\_KON\Project\Web\Catcher-demo\catcher-frontend"
rm -rf node_modules package-lock.json
npm install
npm start
```

### 3. 如果TypeScript錯誤，暫時使用JS版本
重命名檔案：
- App.tsx → App.js
- index.tsx → index.js

### 4. 檢查端口占用
```bash
netstat -ano | findstr :3000
```

### 5. 使用不同端口
```bash
set PORT=3001 && npm start
```

## 預期結果
✅ 成功啟動後，瀏覽器會自動打開
✅ 顯示Catcher首頁
✅ 看到搜尋欄和分類網格
✅ 響應式設計正常運作
