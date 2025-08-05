# 🚀 立即開始：下一步開發指南

基於團隊樹狀圖規劃，接下來 2 週的具體開發任務

## 🎯 **當前狀態評估**

✅ **已完成**:
- 專案架構重組
- GitHub Pages 部署
- 基礎 React + TypeScript 設定
- 基礎 ASP.NET Core 後端

🔄 **進行中**:
- 基礎 UI 框架 (Upwork 風格已建立)

❌ **待開發**:
- 會員系統
- 資料庫設計
- API 架構

---

## 📋 **Sprint 1: 資料庫架構建立 (本週)**

### 🎯 **第1天: 資料模型設計**

#### 建立核心 Entity 模型
```bash
cd src/backend
```

建立以下檔案：

**Models/Entities/User.cs**
```csharp
public class User
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public UserType UserType { get; set; } // Creator, Client, Hybrid
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public bool IsEmailVerified { get; set; }
    public bool IsActive { get; set; }
}

public enum UserType
{
    Creator,    // 人材會員
    Client,     // 委任者會員  
    Hybrid      // 綜合型會員
}
```

**Models/Entities/Creator.cs**
```csharp
public class Creator
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
    public string DisplayName { get; set; }
    public string Bio { get; set; }
    public string ProfileImageUrl { get; set; }
    public string Location { get; set; }
    public decimal HourlyRate { get; set; }
    public string Skills { get; set; } // JSON array
    public int TotalJobs { get; set; }
    public decimal Rating { get; set; }
    public int ReviewCount { get; set; }
    
    public ICollection<Portfolio> Portfolios { get; set; }
    public ICollection<Service> Services { get; set; }
}
```

#### 任務清單:
- [ ] 建立 User 實體模型
- [ ] 建立 Creator 實體模型  
- [ ] 建立 Client 實體模型
- [ ] 建立 Service 實體模型
- [ ] 建立 Portfolio 實體模型
- [ ] 建立 Order 實體模型

### 🎯 **第2天: 資料庫遷移設定**

#### 更新 DbContext
```csharp
public class CatcherDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Creator> Creators { get; set; }
    public DbSet<Client> Clients { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Portfolio> Portfolios { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Category> Categories { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // 配置實體關係
        modelBuilder.Entity<Creator>()
            .HasOne(c => c.User)
            .WithOne()
            .HasForeignKey<Creator>(c => c.UserId);
            
        // 更多關係配置...
    }
}
```

#### 任務清單:
- [ ] 更新 CatcherDbContext
- [ ] 設定實體關係映射
- [ ] 創建新的資料庫遷移
- [ ] 測試本地資料庫連接

### 🎯 **第3-4天: 身份驗證系統**

#### 安裝必要套件
```bash
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package System.IdentityModel.Tokens.Jwt
```

#### 建立 Auth Controller
**Controllers/AuthController.cs**
```csharp
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        // 會員註冊邏輯
        // 支援創作者/客戶/綜合型選擇
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        // 登入邏輯，返回 JWT token
    }
    
    [HttpPost("verify-email")]
    public async Task<IActionResult> VerifyEmail(string token)
    {
        // Email 驗證邏輯
    }
}
```

#### 任務清單:
- [ ] 設定 JWT 認證
- [ ] 建立註冊 API
- [ ] 建立登入 API  
- [ ] 建立 Email 驗證功能
- [ ] 測試 API 端點

### 🎯 **第5天: 測試與整合**

#### API 測試
- [ ] 使用 Postman 測試註冊流程
- [ ] 測試登入和 Token 驗證
- [ ] 測試不同使用者類型註冊
- [ ] 檢查資料庫資料正確性

---

## 📋 **Sprint 2: 前端會員系統 (下週)**

### 🎯 **第1天: 路由設定**

#### 安裝 React Router
```bash
cd src/frontend
npm install react-router-dom @types/react-router-dom
npm install react-hook-form react-query zustand
npm install @heroicons/react
```

#### 建立路由結構
**src/App.tsx**
```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/creators" element={<CreatorsPage />} />
        <Route path="/creator/:id" element={<CreatorDetailPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}
```

### 🎯 **第2-3天: 註冊登入頁面**

#### 註冊頁面組件
**src/pages/RegisterPage.tsx**
```tsx
export const RegisterPage = () => {
  const [userType, setUserType] = useState<'creator' | 'client' | 'hybrid'>('creator');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 使用者類型選擇 */}
      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => setUserType('creator')}
          className={`px-6 py-3 rounded-lg ${userType === 'creator' ? 'bg-green-600 text-white' : 'bg-white'}`}
        >
          我是創作者 (人材會員)
        </button>
        <button 
          onClick={() => setUserType('client')}
          className={`px-6 py-3 rounded-lg ${userType === 'client' ? 'bg-green-600 text-white' : 'bg-white'}`}
        >
          我要找人才 (委任者會員)
        </button>
        <button 
          onClick={() => setUserType('hybrid')}
          className={`px-6 py-3 rounded-lg ${userType === 'hybrid' ? 'bg-green-600 text-white' : 'bg-white'}`}
        >
          綜合型會員
        </button>
      </div>
      
      {/* 註冊表單 */}
      <RegisterForm userType={userType} />
    </div>
  );
};
```

### 🎯 **第4-5天: 狀態管理與 API 整合**

#### 建立 Auth Store (Zustand)
**src/stores/authStore.ts**
```tsx
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    set({ user: response.data.user, token: response.data.token, isAuthenticated: true });
  },
  
  register: async (data) => {
    const response = await api.post('/auth/register', data);
    // 處理註冊回應
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  }
}));
```

---

## 🛠️ **開發工具與設定**

### 後端開發工具
```bash
# Entity Framework 工具
dotnet tool install --global dotnet-ef

# 資料庫遷移命令
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### 前端開發工具
```bash
# 程式碼品質工具
npm install --save-dev eslint prettier
npm install --save-dev @typescript-eslint/eslint-plugin

# 開發輔助工具  
npm install react-devtools
```

### VS Code 推薦擴充功能
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens
- Thunder Client (API 測試)

---

## 📊 **開發檢查點**

### 第一週結束檢查
- [ ] 資料庫遷移成功執行
- [ ] Auth API 可正常回應
- [ ] Postman 測試通過
- [ ] 本地開發環境穩定

### 第二週結束檢查  
- [ ] 註冊頁面功能完整
- [ ] 登入頁面正常運作
- [ ] 前後端 API 整合成功
- [ ] 使用者狀態管理正常

---

## 🔗 **參考資源**

### 設計參考
- [Upwork](https://www.upwork.com/) - 主要 UI/UX 參考
- [Fiverr](https://www.fiverr.com/) - 服務展示參考
- [Freelancer](https://www.freelancer.com/) - 搜尋功能參考

### 技術文檔
- [React Router v6](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [ASP.NET Core Identity](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity)

---

## 📅 **時程安排**

**本週 (第1週)**:
- 週一: 資料模型設計
- 週二: 資料庫遷移設定  
- 週三-週四: 身份驗證系統
- 週五: 測試與整合

**下週 (第2週)**:
- 週一: React Router 設定
- 週二-週三: 註冊登入頁面
- 週四-週五: 狀態管理與 API 整合

**預期成果**: 
2 週後具備基礎的會員註冊、登入、身份驗證功能，為後續開發作品集和搜尋功能打下基礎。

---

**🚀 立即開始**: 選擇一個任務開始實作，建議從「建立 User 實體模型」開始！
