public class Review
{
    public int ReviewId { get; set; }
    public string UserId { get; set; }
    public virtual User User { get; set; }
    public int AdvertisementId { get; set; }
    public virtual Advertisement Advertisement { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
