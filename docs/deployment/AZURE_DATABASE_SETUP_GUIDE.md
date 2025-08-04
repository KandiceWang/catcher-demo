# Azure Database 連接完整教學

## 🚀 **從零開始連接 Azure SQL Database**

### 📋 **Step 1: 建立 Azure SQL Database**

#### 1.1 登入 Azure Portal
1. 前往 [Azure Portal](https://portal.azure.com)
2. 使用您的 Microsoft 帳號登入
3. 如果沒有訂閱，可以申請免費試用 (12個月免費額度)

#### 1.2 建立 SQL Database
```bash
# 在 Azure Portal 搜尋欄輸入 "SQL Database"
# 或者使用 Azure CLI 指令：
az sql db create \
  --resource-group catcher-rg \
  --server catcher-sql-server \
  --name CatcherDB \
  --service-objective Basic
```

#### 1.3 重要設定
- **資源群組**: `catcher-rg` (新建)
- **伺服器名稱**: `catcher-sql-server` (必須全球唯一)
- **資料庫名稱**: `CatcherDB`
- **定價層**: Basic (5 DTU, $5/月)
- **地區**: Southeast Asia (新加坡)

### 🔐 **Step 2: 設定防火牆規則**

#### 2.1 允許 Azure 服務存取
```sql
-- 在 Azure Portal → SQL Database → 防火牆和虛擬網路
-- 勾選 "允許 Azure 服務和資源存取此伺服器"
```

#### 2.2 新增您的 IP 位址
```bash
# 取得您的公開 IP
curl ipinfo.io/ip

# 在 Azure Portal 新增防火牆規則
# 規則名稱: MyComputer
# 起始 IP: 您的 IP
# 結束 IP: 您的 IP
```

#### 2.3 新增 Azure App Service IP (如果部署到 Azure)
```bash
# 如果您的應用程式部署在 Azure App Service
# 需要新增 App Service 的輸出 IP 地址
```

---

## 🔗 **Step 3: 取得連接字串**

### 3.1 從 Azure Portal 複製
```
Azure Portal → SQL Database → CatcherDB → 連接字串 → ADO.NET
```

### 3.2 連接字串格式
```csharp
// 完整連接字串範例
"Server=tcp:catcher-sql-server.database.windows.net,1433;Initial Catalog=CatcherDB;Persist Security Info=False;User ID=your-admin-username;Password=your-admin-password;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
```

### 3.3 安全的連接字串管理
```json
// appsettings.json (開發環境)
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=tcp:catcher-sql-server.database.windows.net,1433;Initial Catalog=CatcherDB;Persist Security Info=False;User ID=admin;Password=YourPassword123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  }
}
```

```bash
# 生產環境使用環境變數或 Azure Key Vault
export AZURE_SQL_CONNECTION="Server=tcp:..."
```

---

## ⚙️ **Step 4: 配置 .NET Core 專案**

### 4.1 安裝必要的 NuGet 套件
```bash
# 在 Catcher-demo 目錄執行
cd Catcher-demo
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.EntityFrameworkCore.Design
```

### 4.2 建立 DbContext
```csharp
// Data/CatcherDbContext.cs
using Microsoft.EntityFrameworkCore;
using Catcher.Models;

namespace Catcher.Data
{
    public class CatcherDbContext : DbContext
    {
        public CatcherDbContext(DbContextOptions<CatcherDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Creator> Creators { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Review> Reviews { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 配置關聯
            modelBuilder.Entity<Creator>()
                .HasOne(c => c.User)
                .WithOne()
                .HasForeignKey<Creator>(c => c.UserId);

            modelBuilder.Entity<Service>()
                .HasOne(s => s.Creator)
                .WithMany(c => c.Services)
                .HasForeignKey(s => s.CreatorId);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Service)
                .WithMany()
                .HasForeignKey(o => o.ServiceId);

            modelBuilder.Entity<Review>()
                .HasOne(r => r.Order)
                .WithOne(o => o.Review)
                .HasForeignKey<Review>(r => r.OrderId);
        }
    }
}
```

### 4.3 建立資料模型
```csharp
// Models/DatabaseModels.cs
using System.ComponentModel.DataAnnotations;

namespace Catcher.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required, MaxLength(255)]
        public string Email { get; set; } = string.Empty;
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        public string? Avatar { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Creator
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public string Bio { get; set; } = string.Empty;
        public string Skills { get; set; } = string.Empty; // JSON string
        public decimal Rating { get; set; }
        public int CompletedOrders { get; set; }
        public List<Service> Services { get; set; } = new();
    }

    public class Service
    {
        public int Id { get; set; }
        public int CreatorId { get; set; }
        public Creator Creator { get; set; } = null!;
        [Required, MaxLength(255)]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;
        public string Tags { get; set; } = string.Empty; // JSON string
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Order
    {
        public int Id { get; set; }
        public int ServiceId { get; set; }
        public Service Service { get; set; } = null!;
        public int ClientId { get; set; }
        public User Client { get; set; } = null!;
        [MaxLength(50)]
        public string Status { get; set; } = "pending";
        public decimal TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Review? Review { get; set; }
    }

    public class Review
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; } = null!;
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public DateTime ReviewDate { get; set; } = DateTime.UtcNow;
    }
}
```

### 4.4 配置 Program.cs
```csharp
// Program.cs
using Microsoft.EntityFrameworkCore;
using Catcher.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// 新增 Entity Framework
builder.Services.AddDbContext<CatcherDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// 確保資料庫已建立 (開發環境)
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<CatcherDbContext>();
    context.Database.EnsureCreated(); // 或使用 Migrate() for production
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

---

## 🛠️ **Step 5: 建立資料庫結構 (Migrations)**

### 5.1 建立初始 Migration
```bash
# 在專案根目錄執行
dotnet ef migrations add InitialCreate

# 套用到資料庫
dotnet ef database update
```

### 5.2 如果需要修改結構
```bash
# 修改 Model 後建立新的 Migration
dotnet ef migrations add AddNewFeature

# 套用變更
dotnet ef database update
```

---

## 📝 **Step 6: 使用資料庫**

### 6.1 建立資料服務
```csharp
// Services/DatabaseService.cs
using Catcher.Data;
using Catcher.Models;
using Microsoft.EntityFrameworkCore;

namespace Catcher.Services
{
    public class DatabaseService
    {
        private readonly CatcherDbContext _context;

        public DatabaseService(CatcherDbContext context)
        {
            _context = context;
        }

        // 取得所有服務
        public async Task<List<Service>> GetServicesAsync()
        {
            return await _context.Services
                .Include(s => s.Creator)
                .ThenInclude(c => c.User)
                .ToListAsync();
        }

        // 建立新用戶
        public async Task<User> CreateUserAsync(string email, string name)
        {
            var user = new User
            {
                Email = email,
                Name = name,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        // 取得創作者服務
        public async Task<List<Service>> GetCreatorServicesAsync(int creatorId)
        {
            return await _context.Services
                .Where(s => s.CreatorId == creatorId)
                .Include(s => s.Creator)
                .ToListAsync();
        }
    }
}
```

### 6.2 註冊服務
```csharp
// Program.cs 中新增
builder.Services.AddScoped<DatabaseService>();
```

### 6.3 在 Controller 中使用
```csharp
// Controllers/HomeController.cs
using Catcher.Services;

public class HomeController : Controller
{
    private readonly DatabaseService _dbService;

    public HomeController(DatabaseService dbService)
    {
        _dbService = dbService;
    }

    public async Task<IActionResult> Index()
    {
        var services = await _dbService.GetServicesAsync();
        return View(services);
    }
}
```

---

## 🧪 **Step 7: 測試連接**

### 7.1 建立測試頁面
```csharp
// Controllers/TestController.cs
[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    private readonly CatcherDbContext _context;

    public TestController(CatcherDbContext context)
    {
        _context = context;
    }

    [HttpGet("connection")]
    public async Task<IActionResult> TestConnection()
    {
        try
        {
            await _context.Database.CanConnectAsync();
            var userCount = await _context.Users.CountAsync();
            
            return Ok(new { 
                Status = "Connected", 
                Message = "資料庫連接成功",
                UserCount = userCount 
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { 
                Status = "Error", 
                Message = ex.Message 
            });
        }
    }

    [HttpPost("seed")]
    public async Task<IActionResult> SeedData()
    {
        // 建立測試資料
        var testUser = new User
        {
            Email = "test@example.com",
            Name = "測試用戶"
        };

        _context.Users.Add(testUser);
        await _context.SaveChangesAsync();

        return Ok(new { Message = "測試資料已建立" });
    }
}
```

### 7.2 測試 API
```bash
# 測試連接
curl https://localhost:5001/api/test/connection

# 建立測試資料
curl -X POST https://localhost:5001/api/test/seed
```

---

## 🔧 **常見問題解決**

### ❗ 連接失敗問題

#### 1. 防火牆設定
```bash
# 檢查您的 IP 是否在防火牆白名單中
# Azure Portal → SQL Server → 防火牆和虛擬網路
```

#### 2. 連接字串錯誤
```csharp
// 確認以下資訊正確：
// - 伺服器名稱 (包含 .database.windows.net)
// - 資料庫名稱
// - 使用者名稱和密碼
// - 連接埠 1433
```

#### 3. SSL 憑證問題
```csharp
// 在連接字串中新增：
"TrustServerCertificate=True" // 僅限開發環境
```

### ⚠️ 效能優化

#### 1. 連接池設定
```csharp
// appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": "...;Pooling=true;Max Pool Size=100;Min Pool Size=10;"
  }
}
```

#### 2. 非同步查詢
```csharp
// 總是使用 async/await
var users = await _context.Users.ToListAsync();
// 不要使用 .Result 或 .Wait()
```

---

## 🚀 **Step 8: 部署到生產環境**

### 8.1 使用 Azure Key Vault (推薦)
```csharp
// Program.cs
if (app.Environment.IsProduction())
{
    builder.Configuration.AddAzureKeyVault(
        $"https://{keyVaultName}.vault.azure.net/",
        new DefaultAzureCredential());
}
```

### 8.2 環境變數設定
```bash
# Azure App Service 應用程式設定
AZURE_SQL_CONNECTION="Server=tcp:..."
```

### 8.3 自動化部署時套用 Migration
```csharp
// Program.cs
if (app.Environment.IsProduction())
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<CatcherDbContext>();
    await context.Database.MigrateAsync();
}
```

---

## 📋 **快速檢查清單**

### ✅ **建立前檢查**
- [ ] Azure 訂閱已啟用
- [ ] 選擇合適的定價層 (Basic $5/月)
- [ ] 設定正確的地區 (Southeast Asia)
- [ ] 記錄管理員帳號密碼

### ✅ **連接前檢查**
- [ ] 防火牆規則已設定
- [ ] 連接字串已複製
- [ ] NuGet 套件已安裝
- [ ] DbContext 已建立

### ✅ **測試前檢查**
- [ ] Migration 已套用
- [ ] 測試 API 可正常存取
- [ ] 錯誤處理已實作
- [ ] 日誌記錄已設定

---

## 🎯 **下一步建議**

1. **立即行動**: 建立 Azure SQL Database Basic
2. **安全設定**: 配置防火牆和 SSL
3. **開發整合**: 建立 Entity Framework 連接
4. **功能開發**: 實作用戶註冊和服務管理
5. **效能監控**: 設定 Application Insights

這樣您就可以開始使用 Azure Database 了！需要我協助您進行任何特定的步驟嗎？
