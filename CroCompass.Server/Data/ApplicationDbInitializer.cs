using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;

public static class ApplicationDbInitializer
{
    public static void SeedUsers(UserManager<IdentityUser> userManager)
    {
        if (userManager.FindByNameAsync("admin").Result == null)
        {
            IdentityUser user = new IdentityUser
            {
                UserName = "admin",
                EmailConfirmed = true
            };

            IdentityResult result = userManager.CreateAsync(user, "admin").Result;

            if (result.Succeeded)
            {
                userManager.AddToRoleAsync(user, "Admin").Wait();
            }
        }
    }

    public static void SeedRoles(RoleManager<IdentityRole> roleManager)
    {
        if (!roleManager.RoleExistsAsync("Admin").Result)
        {
            IdentityRole role = new IdentityRole { Name = "Admin" };
            roleManager.CreateAsync(role).Wait();
        }
    }

}
