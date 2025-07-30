namespace Catcher.Models
{
    public class ServiceViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string CreatorName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Rating { get; set; }
        public int ReviewCount { get; set; }
        public string Category { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string[] Tags { get; set; } = Array.Empty<string>();
        public string Description { get; set; } = string.Empty;
        public int DeliveryDays { get; set; } = 7;
    }

    public class CreatorViewModel
    {
        public string Name { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;
        public decimal Rating { get; set; }
        public int CompletedOrders { get; set; }
        public DateTime MemberSince { get; set; }
        public string Description { get; set; } = string.Empty;
    }

    public class ReviewViewModel
    {
        public string UserName { get; set; } = string.Empty;
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public DateTime Date { get; set; }
    }

    public class UserStatsViewModel
    {
        public int TotalOrders { get; set; }
        public int CompletedOrders { get; set; }
        public int PendingOrders { get; set; }
        public decimal TotalEarnings { get; set; }
        public decimal ThisMonthEarnings { get; set; }
    }
}
