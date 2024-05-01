using System.ComponentModel.DataAnnotations;

public class UserRegistrationDto
{
    [Required]
    public string UserName { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 5)]
    public string Password { get; set; }
}

public class UserLoginDto
{
    public string UserName { get; set; }
    public string Password { get; set; }
}

public class UserUpdateDto
{
    public string Email { get; set; }
    public string NewPassword { get; set; }
}
