﻿using Microsoft.EntityFrameworkCore;
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Profile> Profiles { get; set; }
    public DbSet<Advertisement> Advertisements { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Image> Images { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // One-to-One relationship between User and Profile
        modelBuilder.Entity<User>()
            .HasOne(u => u.Profile)
            .WithOne(p => p.User)
            .HasForeignKey<Profile>(p => p.UserId);

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
