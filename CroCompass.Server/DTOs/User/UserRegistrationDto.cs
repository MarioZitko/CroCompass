using System.ComponentModel.DataAnnotations;

public class UserRegistrationDto
{
    [Required]
    public string UserName { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 5)]
    public string Password { get; set; }

    public bool VerifiedGuide { get; set; }  // Optional field to indicate if user is applying as a verified guide

    public string Role { get; set; }  // Could be "Admin", "Advertiser", or "PersonalUser"
}
