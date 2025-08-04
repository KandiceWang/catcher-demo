using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Catcher.Data;

namespace Catcher.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly CatcherDbContext _context;

        public TestController(CatcherDbContext context)
        {
            _context = context;
        }

        [HttpGet("database")]
        public async Task<IActionResult> TestDatabase()
        {
            try
        {
                // 測試資料庫連接
                await _context.Database.CanConnectAsync();
                
                // 取得資料庫中的表格資訊
                var tableCount = await _context.Database
                    .SqlQueryRaw<int>("SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'")
                    .FirstAsync();

                return Ok(new
                {
                    Message = "資料庫連接成功！",
                    DatabaseName = _context.Database.GetDbConnection().Database,
                    TableCount = tableCount,
                    Timestamp = DateTime.UtcNow
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Message = "資料庫連接失敗",
                    Error = ex.Message,
                    Timestamp = DateTime.UtcNow
                });
            }
        }

        [HttpGet("migrate")]
        public async Task<IActionResult> MigrateDatabase()
        {
            try
            {
                // 執行資料庫遷移
                await _context.Database.MigrateAsync();
                
                return Ok(new
                {
                    Message = "資料庫遷移成功完成！",
                    Timestamp = DateTime.UtcNow
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Message = "資料庫遷移失敗",
                    Error = ex.Message,
                    Timestamp = DateTime.UtcNow
                });
            }
        }

        [HttpPost("seed")]
        public async Task<IActionResult> SeedData()
        {
            try
            {
                // 檢查是否已有資料
                if (await _context.Users.AnyAsync())
                {
                    return Ok(new { Message = "資料庫已有資料，跳過種子資料建立" });
                }

                // 建立測試資料
                var user = new User
                {
                    Email = "demo@catcher.com",
                    Name = "Demo User",
                    Avatar = "https://via.placeholder.com/150"
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                var creator = new Creator
                {
                    UserId = user.Id,
                    Bio = "專業的設計師，擅長 UI/UX 設計",
                    Rating = 4.8m,
                    CompletedOrders = 25
                };

                _context.Creators.Add(creator);
                await _context.SaveChangesAsync();

                var service = new Service
                {
                    CreatorId = creator.Id,
                    Title = "專業網站設計服務",
                    Description = "提供完整的網站 UI/UX 設計服務，包含響應式設計和現代化介面",
                    Price = 5000m,
                    Category = "設計"
                };

                _context.Services.Add(service);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    Message = "測試資料建立成功！",
                    Data = new
                    {
                        UserId = user.Id,
                        CreatorId = creator.Id,
                        ServiceId = service.Id
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Message = "測試資料建立失敗",
                    Error = ex.Message
                });
            }
        }
    }
}
