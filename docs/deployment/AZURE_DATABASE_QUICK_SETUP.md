# 🎯 Azure Database 快速設定指南

## 📋 **前置準備**

✅ 已安裝 Entity Framework Core 套件
✅ 已建立資料庫模型和 DbContext
✅ 已建立初始資料庫遷移
✅ 已建立測試控制器

## 🚀 **第一步：建立 Azure SQL Database**

### 1️⃣ 登入 Azure Portal
```bash
開啟瀏覽器前往: https://portal.azure.com
使用您的 Microsoft 帳號登入
```

### 2️⃣ 建立 SQL Database
```bash
搜尋 "SQL Database" → 點擊 "建立"

基本設定：
- 訂用帳戶: 選擇您的訂用帳戶
- 資源群組: 建立新的 "catcher-rg"
- 資料庫名稱: "CatcherDB"
- 伺服器: 建立新伺服器

新伺服器設定：
- 伺服器名稱: "catcher-sql-server-[隨機數字]" (全域唯一)
- 位置: "Southeast Asia" (最接近台灣)
- 驗證方法: "使用 SQL 驗證"
- 伺服器管理員登入: "catcheradmin"
- 密碼: 建立強密碼 (記住這個密碼！)

計算與儲存體：
- 服務層級: "基本" (最便宜的選項)
- 最大資料庫大小: 2GB
- DTU: 5 (約 $5 USD/月)
```

### 3️⃣ 設定防火牆規則
```bash
建立完成後：
1. 前往您的 SQL Database
2. 點擊左側選單的 "設定防火牆和虛擬網路"
3. ✅ 勾選 "允許 Azure 服務和資源存取此伺服器"
4. 點擊 "新增用戶端 IP" 來新增您目前的 IP 位址
5. 點擊 "儲存"
```

## 🔗 **第二步：設定連接字串**

### 1️⃣ 取得連接字串
```bash
在 Azure Portal 中：
1. 前往您的 SQL Database
2. 點擊左側選單的 "連接字串"
3. 複製 "ADO.NET (SQL 驗證)" 連接字串
```

### 2️⃣ 更新 appsettings.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=tcp:[您的伺服器名].database.windows.net,1433;Initial Catalog=CatcherDB;User ID=catcheradmin;Password=[您的密碼];Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  }
}
```

**⚠️ 重要提醒：**
- 替換 `[您的伺服器名]` 為實際的伺服器名稱
- 替換 `[您的密碼]` 為您設定的管理員密碼

## 🧪 **第三步：測試連接**

### 1️⃣ 啟動應用程式
```bash
cd "d:\_KON\Project\Web\Catcher-demo\Catcher-demo"
dotnet run
```

### 2️⃣ 測試 API 端點

**測試資料庫連接：**
```bash
# 開啟瀏覽器前往：
https://localhost:5001/api/test/database

# 或使用 curl：
curl -k https://localhost:5001/api/test/database
```

**執行資料庫遷移：**
```bash
https://localhost:5001/api/test/migrate
```

**建立測試資料：**
```bash
https://localhost:5001/api/test/seed
```

## 📊 **第四步：監控和管理**

### 1️⃣ 檢查資料庫狀態
```bash
# Azure Portal 中可以檢查：
- 連接數量
- DTU 使用率
- 儲存體使用量
- 查詢效能
```

### 2️⃣ 成本監控
```bash
# 基本層 (5 DTU) 預期成本：
- 每月約 $5-7 USD
- 包含 2GB 儲存空間
- 每月約 150-200 台幣
```

## 🔒 **安全性最佳實務**

### 1️⃣ 連接字串安全
```bash
# 生產環境請使用：
- Azure Key Vault 儲存敏感資訊
- 環境變數而非 appsettings.json
- Managed Identity 驗證
```

### 2️⃣ 防火牆設定
```bash
# 建議設定：
- 僅允許必要的 IP 位址
- 使用虛擬網路規則 (VNet)
- 定期檢查和更新規則
```

## 🚀 **成功指標**

✅ **連接測試成功** - `/api/test/database` 回傳成功訊息
✅ **遷移完成** - `/api/test/migrate` 建立所有資料表
✅ **資料建立** - `/api/test/seed` 成功建立測試資料
✅ **Azure 監控** - 在 Azure Portal 中看到連接活動

## 🔧 **常見問題排解**

### ❌ 連接失敗
```bash
可能原因：
1. 防火牆規則未正確設定
2. 連接字串中的密碼錯誤
3. 伺服器名稱拼寫錯誤
4. 網路連線問題

解決方案：
1. 檢查 Azure 防火牆設定
2. 重新確認密碼
3. 檢查連接字串格式
4. 測試網路連線
```

### ❌ 遷移失敗
```bash
可能原因：
1. 資料庫權限不足
2. 表格已存在
3. 語法錯誤

解決方案：
1. 確認使用管理員帳號
2. 檢查資料庫是否為空
3. 查看錯誤訊息詳情
```

## 🎉 **恭喜！**

您已成功設定 Azure SQL Database 並與 .NET Core 應用程式整合！

**下一步建議：**
1. 建立更多的資料模型
2. 實作 Repository 模式
3. 新增資料驗證和錯誤處理
4. 設定自動備份策略
5. 實作生產環境的安全設定

**需要幫助？**
- 查看 Azure SQL Database 文檔
- 檢查 Entity Framework Core 指南
- 聯繫 Azure 技術支援
