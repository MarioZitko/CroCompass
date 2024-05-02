using Microsoft.AspNetCore.Identity;

public class User : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string ProfilePictureUrl { get; set; }
    public string Bio { get; set; }
    public string ContactNumber { get; set; }
    public bool VerifiedGuide { get; set; } // Existing from previous definitions
    public virtual ICollection<Advertisement> Advertisements { get; set; }
    public virtual ICollection<Review> Reviews { get; set; }
}
