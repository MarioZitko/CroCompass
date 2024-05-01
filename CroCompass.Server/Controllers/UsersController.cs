using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(UserRegistrationDto registrationDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var result = await _userService.RegisterUserAsync(registrationDto);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return Ok("User registered successfully");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
            return StatusCode(500, "An internal server error occurred.");
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserTokenDto>> Login(UserLoginDto loginDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var token = await _userService.AuthenticateAsync(loginDto.UserName, loginDto.Password);
            if (token == null)
            {
                return Unauthorized("Invalid credentials");
            }
            return Ok(new { Token = token });
        }
        catch (Exception ex)
        {
            await Console.Out.WriteLineAsync(ex.Message);
            return StatusCode(500, "An internal server error has occurred.");
        }
    }

    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] PasswordChangeDto changeDto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var result = await _userService.ChangePasswordAsync(userId, changeDto.OldPassword, changeDto.NewPassword);

        if (result.Succeeded)
        {
            return Ok("Password changed successfully.");
        }

        return BadRequest(result.Errors);
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var result = await _userService.DeleteUserAsync(id);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        return Ok(new { Message = "User deleted successfully" });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] UserUpdateDto updateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _userService.UpdateUserAsync(updateDto, id);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        return Ok(new { Message = "User updated successfully" });
    }
}
