# Catcher 專案資料庫架構建議

## 🏆 推薦方案：Azure 全家桶

### 🗄️ **主要資料庫：Azure SQL Database**
```sql
-- 用戶相關表
Users (Id, Email, Name, Avatar, CreatedAt, UpdatedAt)
Creators (UserId, Bio, Skills, Rating, CompletedOrders)
Clients (UserId, CompanyName, VerificationStatus)

-- 服務相關表
Services (Id, CreatorId, Title, Description, Price, Category, Tags)
ServicePackages (Id, ServiceId, Name, Price, DeliveryDays, Features)
ServiceImages (Id, ServiceId, ImageUrl, IsMain, SortOrder)

-- 訂單相關表
Orders (Id, ServiceId, ClientId, Status, TotalAmount, CreatedAt)
OrderMessages (Id, OrderId, SenderId, Content, Timestamp)
OrderDeliverables (Id, OrderId, FileUrl, FileName, DeliveredAt)

-- 評價系統
Reviews (Id, OrderId, Rating, Comment, ReviewDate)
```

### 📊 **即時資料：Azure SignalR Service**
```csharp
// 即時訊息系統
public class ChatHub : Hub
{
    public async Task SendMessage(string orderId, string message)
    {
        await Clients.Group($"order_{orderId}").SendAsync("ReceiveMessage", message);
    }
}
```

### 📁 **檔案儲存：Azure Blob Storage**
```
catcher-storage/
├── avatars/           # 用戶頭像
├── portfolios/        # 作品集圖片
├── service-images/    # 服務展示圖
├── deliverables/      # 交付檔案
└── documents/         # 合約文件
```

### 🔐 **身份驗證：Azure AD B2C**
```csharp
services.AddAuthentication()
    .AddMicrosoftIdentityWebApp(options =>
    {
        Configuration.Bind("AzureAdB2C", options);
    });
```

## 💰 **成本預估 (月費)**

### 小型階段 (1000用戶)
- **Azure SQL Database (Basic)**: $5
- **Blob Storage (熱存取 100GB)**: $2
- **SignalR Service (免費層)**: $0
- **App Service (B1)**: $13
- **總計**: ~$20/月

### 成長階段 (10000用戶)
- **Azure SQL Database (S2)**: $30
- **Blob Storage (1TB)**: $20
- **SignalR Service (標準層)**: $50
- **App Service (P1V2)**: $80
- **總計**: ~$180/月

### 企業階段 (100000用戶)
- **Azure SQL Database (P2)**: $500
- **Blob Storage (10TB)**: $200
- **SignalR Service**: $200
- **App Service (P3V2)**: $320
- **CDN**: $50
- **總計**: ~$1270/月

## 🔄 **遷移策略**

### Phase 1: 基礎設施 (2週)
1. 設置 Azure SQL Database
2. 配置 Blob Storage
3. 實作基本的 Entity Framework Models

### Phase 2: 核心功能 (4週)
1. 用戶註冊/登入系統
2. 服務發布與展示
3. 基本訂單流程

### Phase 3: 進階功能 (6週)
1. SignalR 即時訊息
2. 檔案上傳與管理
3. 支付整合

## 🛠️ **實作範例**

### Entity Framework 設置
```csharp
public class CatcherDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Creator> Creators { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // 設定關聯
        modelBuilder.Entity<Creator>()
            .HasOne(c => c.User)
            .WithOne()
            .HasForeignKey<Creator>(c => c.UserId);
    }
}
```

### 連接字串設置
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=tcp:catcher-db.database.windows.net,1433;Database=CatcherDB;User ID=your-admin;Password=your-password;Encrypt=True;"
  },
  "AzureStorage": {
    "ConnectionString": "DefaultEndpointsProtocol=https;AccountName=catcherstorage;AccountKey=..."
  }
}
```

## � **備用方案：AWS 生態系統**

### 🗄️ **主要資料庫：Amazon RDS (PostgreSQL)**
```sql
-- AWS RDS PostgreSQL 架構
-- 用戶相關表
Users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE, name VARCHAR(255), avatar VARCHAR(500), created_at TIMESTAMP, updated_at TIMESTAMP)
Creators (user_id INTEGER REFERENCES Users(id), bio TEXT, skills JSONB, rating DECIMAL(3,2), completed_orders INTEGER)
Clients (user_id INTEGER REFERENCES Users(id), company_name VARCHAR(255), verification_status VARCHAR(50))

-- 服務相關表
Services (id SERIAL PRIMARY KEY, creator_id INTEGER REFERENCES Users(id), title VARCHAR(255), description TEXT, price DECIMAL(10,2), category VARCHAR(100), tags JSONB)
ServicePackages (id SERIAL PRIMARY KEY, service_id INTEGER REFERENCES Services(id), name VARCHAR(255), price DECIMAL(10,2), delivery_days INTEGER, features JSONB)
ServiceImages (id SERIAL PRIMARY KEY, service_id INTEGER REFERENCES Services(id), image_url VARCHAR(500), is_main BOOLEAN, sort_order INTEGER)

-- 訂單相關表 (高頻寫入考慮 DynamoDB)
Orders (id SERIAL PRIMARY KEY, service_id INTEGER, client_id INTEGER, status VARCHAR(50), total_amount DECIMAL(10,2), created_at TIMESTAMP)
```

### ⚡ **高頻資料：Amazon DynamoDB**
```json
// 即時訊息表 (DynamoDB)
{
  "TableName": "OrderMessages",
  "KeySchema": [
    { "AttributeName": "OrderId", "KeyType": "HASH" },
    { "AttributeName": "Timestamp", "KeyType": "RANGE" }
  ],
  "AttributeDefinitions": [
    { "AttributeName": "OrderId", "AttributeType": "S" },
    { "AttributeName": "Timestamp", "AttributeType": "N" },
    { "AttributeName": "SenderId", "AttributeType": "S" }
  ]
}

// 通知系統表 (DynamoDB)
{
  "TableName": "Notifications",
  "KeySchema": [
    { "AttributeName": "UserId", "KeyType": "HASH" },
    { "AttributeName": "CreatedAt", "KeyType": "RANGE" }
  ]
}
```

### 📁 **檔案儲存：Amazon S3**
```
catcher-s3-bucket/
├── avatars/                    # 用戶頭像 (Standard IA)
├── portfolios/                 # 作品集圖片 (Standard)
│   ├── thumbnails/            # 縮圖 (Standard)
│   └── originals/             # 原圖 (Standard IA)
├── service-images/            # 服務展示圖 (Standard)
├── deliverables/              # 交付檔案 (Standard IA)
│   ├── active/               # 進行中項目 (Standard)
│   └── archived/             # 已完成項目 (Glacier)
└── documents/                 # 合約文件 (Standard IA)
```

### 🔐 **身份驗證：Amazon Cognito**
```javascript
// AWS Cognito 設置
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

const cognitoConfig = {
  region: "ap-northeast-1", // 東京區域
  userPoolId: "ap-northeast-1_XXXXXXXXX",
  clientId: "your-app-client-id",
  identityPoolId: "ap-northeast-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
};
```

### 🚀 **API Gateway + Lambda**
```javascript
// 無伺服器 API 架構
exports.handler = async (event) => {
    const { httpMethod, pathParameters, body } = event;
    
    switch (httpMethod) {
        case 'GET':
            return await getServices(pathParameters);
        case 'POST':
            return await createService(JSON.parse(body));
        default:
            return { statusCode: 405, body: 'Method Not Allowed' };
    }
};
```

## 💰 **AWS 成本預估 (月費，美東維吉尼亞價格)**

### 小型階段 (1000用戶，100GB資料，10萬API請求/月)
- **RDS PostgreSQL (db.t3.micro)**: $13
- **DynamoDB (按需計費)**: $8
- **S3 Storage (100GB標準層)**: $2.3
- **CloudFront CDN (100GB傳輸)**: $8.5
- **Lambda (100萬次執行)**: $0.2
- **API Gateway (10萬次請求)**: $0.35
- **Cognito (1000 MAU)**: $0
- **總計**: ~$32/月

### 成長階段 (10000用戶，1TB資料，100萬API請求/月)
- **RDS PostgreSQL (db.t3.large)**: $67
- **DynamoDB (預估讀寫)**: $25
- **S3 Storage (1TB混合儲存)**: $20
- **CloudFront CDN (2TB傳輸)**: $170
- **Lambda (1000萬次執行)**: $2
- **API Gateway (100萬次請求)**: $3.5
- **Cognito (10000 MAU)**: $275
- **總計**: ~$563/月

### 企業階段 (100000用戶，10TB資料，1000萬API請求/月)
- **RDS PostgreSQL (db.r5.2xlarge + Multi-AZ)**: $580
- **DynamoDB (高頻讀寫)**: $150
- **S3 Storage (10TB智慧分層)**: $180
- **CloudFront CDN (20TB傳輸)**: $1700
- **Lambda (1億次執行)**: $20
- **API Gateway (1000萬次請求)**: $35
- **Cognito (100000 MAU)**: $2750
- **WAF + Shield**: $100
- **總計**: ~$5515/月

## 🌏 **AWS 亞太區域 (東京) 價格調整**

### 小型階段調整 (+15%)
- **總計**: ~$37/月

### 成長階段調整 (+15%)
- **總計**: ~$647/月

### 企業階段調整 (+15%)
- **總計**: ~$6342/月

## 🔄 **AWS vs Azure 成本比較**

| 階段 | AWS (美東) | AWS (東京) | Azure | 差異 |
|------|------------|------------|--------|------|
| 小型 (1K用戶) | $32 | $37 | $20 | AWS較貴85% |
| 成長 (10K用戶) | $563 | $647 | $180 | AWS較貴259% |
| 企業 (100K用戶) | $5515 | $6342 | $1270 | AWS較貴399% |

## 🛠️ **AWS 實作範例**

### .NET Core 與 AWS 整合
```csharp
// AWS SDK 設置
services.AddAWSService<IAmazonDynamoDB>();
services.AddAWSService<IAmazonS3>();
services.AddAWSService<IAmazonCognitoIdentityProvider>();

// RDS 連接
services.AddDbContext<CatcherDbContext>(options =>
    options.UseNpgsql(Configuration.GetConnectionString("AwsRdsConnection")));
```

### DynamoDB 訊息儲存
```csharp
public class MessageService
{
    private readonly IAmazonDynamoDB _dynamoDb;
    
    public async Task SaveMessageAsync(OrderMessage message)
    {
        var item = new Dictionary<string, AttributeValue>
        {
            ["OrderId"] = new AttributeValue { S = message.OrderId },
            ["Timestamp"] = new AttributeValue { N = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString() },
            ["SenderId"] = new AttributeValue { S = message.SenderId },
            ["Content"] = new AttributeValue { S = message.Content }
        };
        
        await _dynamoDb.PutItemAsync("OrderMessages", item);
    }
}
```

### S3 檔案上傳
```csharp
public class FileUploadService
{
    private readonly IAmazonS3 _s3Client;
    
    public async Task<string> UploadFileAsync(IFormFile file, string folder)
    {
        var key = $"{folder}/{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        
        using var stream = file.OpenReadStream();
        await _s3Client.PutObjectAsync(new PutObjectRequest
        {
            BucketName = "catcher-storage",
            Key = key,
            InputStream = stream,
            ContentType = file.ContentType
        });
        
        return $"https://catcher-storage.s3.amazonaws.com/{key}";
    }
}
```

## 📊 **AWS 優勢分析**

### ✅ **優點**
1. **全球領導地位**: 最成熟的雲端平台
2. **服務豐富**: 200+ 服務選擇
3. **彈性計價**: 按需付費，精確控制成本
4. **無伺服器**: Lambda + API Gateway 真正的 Serverless
5. **AI/ML 整合**: 未來可整合 Bedrock、Rekognition

### ❌ **缺點**
1. **成本較高**: 尤其是 Cognito 在大量用戶時
2. **複雜度**: 服務多樣但學習曲線陡峭
3. **.NET 整合**: 不如 Azure 原生整合度高
4. **亞太價格**: 比美東貴 15-20%

## 🎯 **AWS 建議使用時機**

### 適合選擇 AWS 當：
1. 預計快速國際化擴展
2. 需要最先進的 AI/ML 功能
3. 團隊有 AWS 經驗
4. 希望採用 Microservices + Serverless 架構
5. 預算充足且追求技術前瞻性

### 不適合選擇 AWS 當：
1. 成本是主要考量
2. 團隊以 .NET 為主
3. 希望快速開發上線
4. 主要服務台灣市場

## 🔄 **混合架構建議**

如果預算考量，建議：
1. **開發階段**: PostgreSQL (Heroku/Railway) + Cloudinary
2. **測試階段**: Azure SQL (基本層) + Blob Storage
3. **生產階段**: 完整 Azure 生態系統 或 AWS (視國際化需求而定)

## 📈 **監控與維護**

- **Azure Application Insights**: 效能監控
- **Azure Monitor**: 系統健康度
- **Log Analytics**: 詳細日誌分析
- **備份策略**: 自動備份 + 異地備份

## 🎯 **最終建議：完整比較分析**

| 評估項目 | Azure | AWS | Firebase | 推薦指數 |
|----------|-------|-----|----------|----------|
| **技術整合** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | Azure 勝 |
| **開發速度** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Firebase 勝 |
| **成本效益** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | Azure 勝 |
| **擴展性** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | AWS 勝 |
| **穩定性** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 平手 |
| **學習曲線** | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | Firebase 勝 |
| **台灣支援** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | Azure 勝 |

### 🏆 **階段性建議**

#### 🚀 **MVP/Demo 階段 (推薦：Firebase)**
- **成本**: 幾乎免費
- **開發時間**: 最快 2-3 週
- **優勢**: 即時資料庫、快速原型
- **適用**: 驗證市場需求

#### 📈 **成長階段 (推薦：Azure)**
- **成本**: $20-$180/月
- **開發時間**: 4-6 週
- **優勢**: .NET 整合、成本控制
- **適用**: 台灣市場擴展

#### 🌍 **企業階段 (考慮：AWS)**
- **成本**: $1270-$6342/月  
- **優勢**: 全球基礎設施、AI/ML
- **適用**: 國際化擴展

**Azure 是您的最佳選擇**，因為：
1. 與現有 .NET 技術棧完美整合
2. 您已有 Azure 部署經驗
3. 成本可控，階梯式擴展
4. 台灣本地支援完善
5. 企業級穩定性和安全性
