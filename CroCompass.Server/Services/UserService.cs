﻿using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;

    public UserService(IUserRepository userRepository, UserManager<User> userManager, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _userManager = userManager;
        _configuration = configuration;
    }

    public async Task<IdentityResult> RegisterUserAsync(UserRegistrationDto userRegistration)
    {
        var user = new User { UserName = userRegistration.UserName, Email = userRegistration.UserName};
        return await _userRepository.AddUserAsync(user, userRegistration.Password);
    }

    public async Task<IdentityResult> UpdateUserAsync(UserUpdateDto updateDto, string userId)
    {
        var user = await _userRepository.FindByIdAsync(userId);
        if (user != null)
        {
            user.Email = updateDto.Email;
            // Assume password change is handled separately if needed
            return await _userRepository.UpdateUserAsync(user);
        }
        return IdentityResult.Failed(new IdentityError { Description = "User not found." });
    }

    public async Task<IdentityResult> ChangePasswordAsync(string userId, string oldPassword, string newPassword)
    {
        var user = await _userRepository.FindByIdAsync(userId);
        if (user != null)
        {
            return await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);
        }
        return IdentityResult.Failed(new IdentityError { Description = "User not found." });
    }


    public async Task<IdentityResult> DeleteUserAsync(string userId)
    {
        return await _userRepository.DeleteUserAsync(userId);
    }

    public async Task<string> AuthenticateAsync(string userName, string password)
    {
        var user = await _userRepository.FindByNameAsync(userName);
        if (user != null)
        {
            bool isPasswordCorrect = await _userManager.CheckPasswordAsync(user, password);
            if (isPasswordCorrect)
            {
                return GenerateJwtToken(user);

            }
        }
        return null;
    }

    private string GenerateJwtToken(User user)
    {
        try
        {
            var tokenHandler = new JsonWebTokenHandler();
            var keyString = _configuration["Jwt:Key"];
            if (string.IsNullOrEmpty(keyString))
            {
                throw new InvalidOperationException("JWT Key is not set in the configuration.");
            }
            var key = Encoding.ASCII.GetBytes(keyString);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName)
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            return tokenHandler.CreateToken(tokenDescriptor);
        }
        catch (Exception ex)
        {
            // Log the exception or handle it accordingly
            throw new Exception("Error generating JWT token", ex);
        }
    }


}