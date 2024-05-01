using Microsoft.AspNetCore.Mvc.ViewEngines;

public class Advertisement
{
    public int AdvertisementId { get; set; }
    public string UserId { get; set; }
    public virtual User User { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public decimal Price { get; set; }
    public string Location { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public bool IsActive { get; set; }
    public virtual ICollection<Image> Images { get; set; }
    public virtual ICollection<Review> Reviews { get; set; }
}
