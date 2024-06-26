﻿using Microsoft.AspNetCore.Identity;
public interface IUserRepository
{
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<IdentityResult> AddUserAsync(User user, string password, string role = null);
    Task<User> FindByNameAsync(string username);
    Task<User> FindByEmailAsync(string email);
    Task<User> FindByIdAsync(string userId);
    Task<IdentityResult> UpdateUserAsync(User user);
    Task<IdentityResult> DeleteUserAsync(string userId);
    Task<IdentityResult> ChangePasswordAsync(User user, string oldPassword, string newPassword);
}
