# GitHub 部署指南

## 1. 建立 GitHub Repository

### 方法一：使用 GitHub CLI (推薦)
```bash
# 安裝 GitHub CLI
winget install GitHub.cli

# 登入 GitHub
gh auth login

# 建立並推送到 GitHub
gh repo create catcher-demo --public --push --source=. --description="台灣創作者接發案平台Demo"
```

### 方法二：使用 Git 命令
```bash
# 建立 GitHub Repository 後，推送程式碼
git remote add origin https://github.com/你的用戶名/catcher-demo.git
git branch -M main
git push -u origin main
```

## 2. Azure 靜態網站部署

### 設置 Azure Static Web Apps
1. 登入 Azure Portal
2. 建立新的 Static Web App
3. 連接 GitHub Repository
4. 設定建置設定：
   - App location: `Catcher`
   - Api location: `(空白)`
   - Output location: `wwwroot`

### GitHub Actions 自動部署
Azure 會自動建立 GitHub Actions 工作流程。

## 3. Vercel 部署 (替代方案)

### 安裝 Vercel CLI
```bash
npm i -g vercel
```

### 部署步驟
```bash
# 登入 Vercel
vercel login

# 部署專案
vercel --prod
```

## 4. GitHub Pages 部署

### 建立 GitHub Actions 工作流程
建立 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: 8.0.x
        
    - name: Restore dependencies
      run: dotnet restore
      
    - name: Build
      run: dotnet build --no-restore
      
    - name: Publish
      run: dotnet publish Catcher/Catcher.csproj -c Release -o ./publish
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./publish/wwwroot
```

## 5. 本地開發環境

### 需求
- .NET 8.0 SDK
- Visual Studio 2022 或 VS Code
- Git

### 執行專案
```bash
# 複製專案
git clone https://github.com/你的用戶名/catcher-demo.git
cd catcher-demo

# 執行專案
cd Catcher
dotnet run
```

### 開發模式
```bash
# 監看模式，檔案變更時自動重新載入
dotnet watch run
```

## 6. 團隊協作

### 分支策略
- `main`: 生產環境
- `develop`: 開發環境
- `feature/*`: 功能分支

### Pull Request 流程
1. 建立功能分支
2. 完成開發並測試
3. 建立 Pull Request
4. Code Review
5. 合併到 develop
6. 測試通過後合併到 main

### 問題回報
使用 GitHub Issues 進行：
- 功能需求
- 錯誤回報
- 改進建議

## 7. 效能優化

### CDN 整合
- 靜態資源使用 CDN
- 圖片優化和壓縮
- 啟用 GZIP 壓縮

### 快取策略
- Browser 快取
- CDN 快取
- 應用程式快取

## 8. 監控與分析

### Google Analytics
加入追蹤程式碼到 `_Layout.cshtml`

### Application Insights (Azure)
監控應用程式效能和錯誤

### 使用者回饋
- Hotjar 或類似工具
- 內建回饋表單

## 9. 安全考量

### HTTPS
確保所有環境都使用 HTTPS

### 安全標頭
設定適當的 HTTP 安全標頭

### 依賴項更新
定期更新 NuGet 套件

## 10. 持續整合/持續部署 (CI/CD)

### GitHub Actions 範例
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: 8.0.x
    - name: Test
      run: dotnet test

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    steps:
    - name: Deploy to Staging
      run: echo "Deploy to staging environment"

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - name: Deploy to Production
      run: echo "Deploy to production environment"
```

## Demo 網址
- **開發版本**: https://catcher-demo-dev.azurewebsites.net
- **正式版本**: https://catcher-demo.azurewebsites.net

## 聯絡資訊
- GitHub: [@你的用戶名](https://github.com/你的用戶名)
- Email: your-email@example.com
