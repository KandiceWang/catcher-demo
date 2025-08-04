# Azure SQL Database 配置建議書

## 🚀 **小型階段配置 (1000 用戶)**

### Azure SQL Database
- **Type**: Single Database
- **Purchase Model**: DTU (Basic 或 S0)
- **Service Tier**: General Purpose
- **Compute Tier**: DTU Basic (5 DTU) 或 S0 (10 DTU)
- **Hardware**: 不適用 (DTU 模式)
- **Disaster Recovery**: Primary only
- **預估月費**: $5-15

### Storage
- **Data Storage**: 32 GB
- **預估月費**: $3

### Backup Storage  
- **Redundancy**: LRS
- **估算容量**: 10 GB
- **預估月費**: $0.5

### 📊 **小型階段總計: ~$20/月**

---

## 📈 **成長階段配置 (10,000 用戶)**

### Azure SQL Database
- **Type**: Single Database
- **Purchase Model**: vCore
- **Service Tier**: General Purpose
- **Compute Tier**: Provisioned
- **Hardware**: Standard-series (Gen 5)
- **vCores**: 2 vCores
- **Memory**: 10.4 GB
- **Disaster Recovery**: Primary only
- **預估月費**: $365 (2 vCore × $182.5/vCore)

### Storage
- **Data Storage**: 100 GB
- **預估月費**: $10

### Backup Storage
- **Redundancy**: LRS
- **估算容量**: 30 GB  
- **預估月費**: $1.5

### 📊 **成長階段總計: ~$377/月**

---

## 🏢 **企業階段配置 (100,000 用戶)**

### Azure SQL Database
- **Type**: Single Database
- **Purchase Model**: vCore
- **Service Tier**: General Purpose
- **Compute Tier**: Provisioned  
- **Hardware**: Standard-series (Gen 5)
- **vCores**: 8 vCores
- **Memory**: 41.6 GB
- **Disaster Recovery**: Geo replica (同樣規格)
- **預估月費**: $2920 (Primary: $1460 + Geo Replica: $1460)

### Storage
- **Data Storage**: 500 GB
- **預估月費**: $50

### Backup Storage
- **Redundancy**: RA-GRS (異地備份)
- **估算容量**: 150 GB
- **預估月費**: $15

### 📊 **企業階段總計: ~$2985/月**

---

## 🎯 **Azure Pricing Calculator 填寫步驟**

### Step 1: 加入 Azure SQL Database
1. 搜尋 "Azure SQL Database"
2. 點擊 "Add to estimate"

### Step 2: 基本設定
- **Type**: 選擇 "Single Database"
- **Purchase Model**: 
  - 小型: 選擇 "DTU"
  - 成長/企業: 選擇 "vCore"

### Step 3: 服務層級
- **Service Tier**: 選擇 "General Purpose"
- **Compute Tier**: 
  - 小型: 不適用 (DTU)
  - 成長/企業: 選擇 "Provisioned"

### Step 4: 硬體配置
- **Hardware**: 選擇 "Standard-series (Gen 5)"
- **vCores**: 
  - 成長階段: 2
  - 企業階段: 8

### Step 5: 災難復原
- **小型/成長**: 保持 "Primary" only
- **企業**: 勾選 "Geo replica"

### Step 6: 儲存設定
- **Data Storage**: 
  - 小型: 32 GB
  - 成長: 100 GB  
  - 企業: 500 GB

### Step 7: 備份設定
- **Backup Redundancy**:
  - 小型/成長: LRS
  - 企業: RA-GRS

---

## 💡 **成本優化建議**

### 🔄 **Serverless 選項 (小型階段)**
如果流量不穩定，考慮：
- **Compute Tier**: Serverless
- **Auto-pause**: 1 hour
- **Min vCores**: 0.5
- **Max vCores**: 2
- **優勢**: 沒有用戶時自動暫停，只付儲存費用

### 📊 **預留容量 (企業階段)**
- 考慮購買 1-3 年預留容量
- 可節省 15-20% 成本
- 適合穩定負載

### 🔍 **監控建議**
- 設定 Azure Monitor 警告
- 監控 DTU/vCore 使用率
- 定期檢視 Query Performance Insight

---

## ⚠️ **注意事項**

1. **DTU vs vCore**: DTU 簡單但彈性低，vCore 複雜但可精確控制
2. **區域選擇**: 選擇 "East Asia (Hong Kong)" 或 "Southeast Asia (Singapore)" 延遲較低
3. **備份保留期**: 預設 7 天，可調整至 35 天
4. **點對點復原**: 預設啟用，可復原到任意時間點

---

## 🎯 **推薦起始配置**

### 對於 Catcher 專案，建議從以下開始：

```
Azure SQL Database
├── Type: Single Database
├── Purchase Model: DTU
├── Service Tier: Basic (5 DTU)
├── Storage: 32 GB
├── Backup: LRS, 7-day retention
└── 預估月費: $8

當用戶數超過 1000 時，升級到：
├── Purchase Model: vCore (2 vCores)
├── Service Tier: General Purpose
└── 預估月費: $377
```

這樣的配置足以支撐您的 MVP 和初期成長需求！
