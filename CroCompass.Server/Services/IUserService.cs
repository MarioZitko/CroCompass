using Microsoft.AspNetCore.Identity;

public interface IUserService
{
    Task<IdentityResult> RegisterUserAsync(UserRegistrationDto userRegistration);
    Task<string> AuthenticateAsync(string email, string password);
    Task<IdentityResult> DeleteUserAsync(string userId);
    Task<IdentityResult> UpdateUserAsync(UserUpdateDto updateDto, string userId);
    Task<IdentityResult> ChangePasswordAsync(string userId, string oldPassword, string newPassword);
}
