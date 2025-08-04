using Microsoft.EntityFrameworkCore;

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

            // 設定表格關聯
            modelBuilder.Entity<Creator>()
                .HasOne<User>()
                .WithOne()
                .HasForeignKey<Creator>(c => c.UserId);

            modelBuilder.Entity<Service>()
                .HasOne<Creator>()
                .WithMany()
                .HasForeignKey(s => s.CreatorId);
        }
    }

    // 基本資料模型
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Avatar { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Creator
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Bio { get; set; } = string.Empty;
        public decimal Rating { get; set; }
        public int CompletedOrders { get; set; }
    }

    public class Service
    {
        public int Id { get; set; }
        public int CreatorId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Category { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Order
    {
        public int Id { get; set; }
        public int ServiceId { get; set; }
        public int ClientId { get; set; }
        public string Status { get; set; } = "pending";
        public decimal TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Review
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public DateTime ReviewDate { get; set; } = DateTime.UtcNow;
    }
}
