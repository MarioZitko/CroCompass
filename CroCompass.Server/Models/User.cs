using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using static System.Runtime.InteropServices.JavaScript.JSType;

public class User : IdentityUser
{
    public string Role { get; set; }  // Admin, Advertiser, or User
    public bool VerifiedGuide { get; set; }
    public virtual Profile Profile { get; set; }
    public virtual ICollection<Advertisement> Advertisements { get; set; }
    public virtual ICollection<Review> Reviews { get; set; }
}
