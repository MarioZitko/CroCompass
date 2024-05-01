public class Image
{
    public int ImageId { get; set; }
    public int AdvertisementId { get; set; }
    public virtual Advertisement Advertisement { get; set; }
    public string ImageUrl { get; set; }
    public DateTime UploadedAt { get; set; }
}
