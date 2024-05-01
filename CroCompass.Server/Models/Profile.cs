public class Profile
{
    public string UserId { get; set; }
    public virtual User User { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string ProfilePictureUrl { get; set; }
    public string Bio { get; set; }
    public string ContactNumber { get; set; }
}
