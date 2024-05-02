using System.ComponentModel.DataAnnotations;

public class UserUpdateDto
{
    [EmailAddress]
    public string Email { get; set; }

    [StringLength(100, MinimumLength = 5)]
    public string NewPassword { get; set; }

    // Depending on your requirements, you might want to allow users to update other fields:
    public string PhoneNumber { get; set; }
}