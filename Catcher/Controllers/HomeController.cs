using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Catcher.Models;

namespace Catcher.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        // Demo數據 - 熱門服務
        var featuredServices = new List<ServiceViewModel>
        {
            new ServiceViewModel
            {
                Id = 1,
                Title = "專業Logo設計",
                CreatorName = "設計師小明",
                Price = 1500,
                Rating = 4.8m,
                ReviewCount = 127,
                Category = "平面設計",
                ImageUrl = "/images/demo/logo-design.jpg",
                Tags = new[] { "Logo", "品牌設計", "視覺識別" }
            },
            new ServiceViewModel
            {
                Id = 2,
                Title = "插畫繪製服務",
                CreatorName = "插畫家小美",
                Price = 2000,
                Rating = 4.9m,
                ReviewCount = 89,
                Category = "插畫設計",
                ImageUrl = "/images/demo/illustration.jpg",
                Tags = new[] { "插畫", "角色設計", "概念圖" }
            },
            new ServiceViewModel
            {
                Id = 3,
                Title = "網站UI/UX設計",
                CreatorName = "UX設計師小王",
                Price = 8000,
                Rating = 4.7m,
                ReviewCount = 45,
                Category = "UI/UX設計",
                ImageUrl = "/images/demo/ui-design.jpg",
                Tags = new[] { "UI設計", "UX設計", "原型設計" }
            }
        };

        ViewBag.FeaturedServices = featuredServices;
        return View();
    }

    public IActionResult Services(string category = "", string search = "", int page = 1)
    {
        // Demo數據 - 所有服務
        var allServices = GetAllDemoServices();
        
        // 篩選
        if (!string.IsNullOrEmpty(category))
        {
            allServices = allServices.Where(s => s.Category == category).ToList();
        }
        
        if (!string.IsNullOrEmpty(search))
        {
            allServices = allServices.Where(s => 
                s.Title.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                s.Tags.Any(t => t.Contains(search, StringComparison.OrdinalIgnoreCase))
            ).ToList();
        }

        // 分頁
        var pageSize = 12;
        var totalItems = allServices.Count;
        var totalPages = (int)Math.Ceiling((double)totalItems / pageSize);
        var services = allServices.Skip((page - 1) * pageSize).Take(pageSize).ToList();

        ViewBag.Services = services;
        ViewBag.Categories = GetCategories();
        ViewBag.CurrentCategory = category;
        ViewBag.CurrentSearch = search;
        ViewBag.CurrentPage = page;
        ViewBag.TotalPages = totalPages;

        return View();
    }

    public IActionResult ServiceDetail(int id)
    {
        var service = GetAllDemoServices().FirstOrDefault(s => s.Id == id);
        if (service == null)
        {
            return NotFound();
        }

        // 模擬創作者資訊
        ViewBag.CreatorInfo = new CreatorViewModel
        {
            Name = service.CreatorName,
            Avatar = "/images/demo/avatar.jpg",
            Rating = service.Rating,
            CompletedOrders = new Random().Next(50, 500),
            MemberSince = DateTime.Now.AddYears(-2),
            Description = "專業創作者，致力於提供高品質的設計服務。"
        };

        // 模擬評價
        ViewBag.Reviews = GetDemoReviews();

        return View(service);
    }

    public IActionResult Dashboard()
    {
        // 模擬用戶儀表板
        ViewBag.UserStats = new UserStatsViewModel
        {
            TotalOrders = 15,
            CompletedOrders = 12,
            PendingOrders = 3,
            TotalEarnings = 45000,
            ThisMonthEarnings = 12000
        };

        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    private List<ServiceViewModel> GetAllDemoServices()
    {
        return new List<ServiceViewModel>
        {
            new ServiceViewModel { Id = 1, Title = "專業Logo設計", CreatorName = "設計師小明", Price = 1500, Rating = 4.8m, ReviewCount = 127, Category = "平面設計", Tags = new[] { "Logo", "品牌設計" } },
            new ServiceViewModel { Id = 2, Title = "插畫繪製服務", CreatorName = "插畫家小美", Price = 2000, Rating = 4.9m, ReviewCount = 89, Category = "插畫設計", Tags = new[] { "插畫", "角色設計" } },
            new ServiceViewModel { Id = 3, Title = "網站UI/UX設計", CreatorName = "UX設計師小王", Price = 8000, Rating = 4.7m, ReviewCount = 45, Category = "UI/UX設計", Tags = new[] { "UI設計", "UX設計" } },
            new ServiceViewModel { Id = 4, Title = "商品攝影服務", CreatorName = "攝影師小李", Price = 3000, Rating = 4.6m, ReviewCount = 76, Category = "攝影", Tags = new[] { "商品攝影", "產品拍攝" } },
            new ServiceViewModel { Id = 5, Title = "影片剪輯製作", CreatorName = "剪輯師小陳", Price = 5000, Rating = 4.8m, ReviewCount = 134, Category = "影片製作", Tags = new[] { "影片剪輯", "後製" } },
            new ServiceViewModel { Id = 6, Title = "文案撰寫服務", CreatorName = "文案師小張", Price = 1200, Rating = 4.7m, ReviewCount = 98, Category = "文案寫作", Tags = new[] { "文案", "內容撰寫" } }
        };
    }

    private List<string> GetCategories()
    {
        return new List<string> { "平面設計", "插畫設計", "UI/UX設計", "攝影", "影片製作", "文案寫作" };
    }

    private List<ReviewViewModel> GetDemoReviews()
    {
        return new List<ReviewViewModel>
        {
            new ReviewViewModel { UserName = "客戶A", Rating = 5, Comment = "設計非常滿意，溝通順暢！", Date = DateTime.Now.AddDays(-5) },
            new ReviewViewModel { UserName = "客戶B", Rating = 4, Comment = "品質不錯，交期準時。", Date = DateTime.Now.AddDays(-12) },
            new ReviewViewModel { UserName = "客戶C", Rating = 5, Comment = "超出預期的作品，推薦！", Date = DateTime.Now.AddDays(-20) }
        };
    }
}
