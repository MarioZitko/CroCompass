using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
public class ApplicationDbContext : IdentityDbContext<IdentityUser, IdentityRole, string>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Advertisement> Advertisements { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Image> Images { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // One-to-Many relationship between Advertisement and Images
        modelBuilder.Entity<Advertisement>()
            .HasMany(a => a.Images)
            .WithOne(i => i.Advertisement)
            .HasForeignKey(i => i.AdvertisementId);

        // One-to-Many relationship between Advertisement and Reviews
        modelBuilder.Entity<Advertisement>()
            .HasMany(a => a.Reviews)
            .WithOne(r => r.Advertisement)
            .HasForeignKey(r => r.AdvertisementId);

        // Many-to-One relationship between Review and User
        modelBuilder.Entity<Review>()
            .HasOne(r => r.User)
            .WithMany(u => u.Reviews)
            .HasForeignKey(r => r.UserId);
    }
}
