
using Microsoft.EntityFrameworkCore;

public class AdRepository : IAdRepository
{
    private readonly ApplicationDbContext _context;

    public AdRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Advertisement>> GetAllAdvertisementsAsync()
    {
        return await _context.Advertisements.ToListAsync();
    }

    public async Task<Advertisement> GetAdvertisementByIdAsync(int adId)
    {
        return await _context.Advertisements.FindAsync(adId);
    }

    public async Task CreateAdvertisementAsync(Advertisement advertisement)
    {
        _context.Advertisements.Add(advertisement);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAdvertisementAsync(Advertisement advertisement)
    {
        _context.Entry(advertisement).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAdvertisementAsync(int adId)
    {
        var ad = await _context.Advertisements.FindAsync(adId);
        if (ad != null)
        {
            _context.Advertisements.Remove(ad);
            await _context.SaveChangesAsync();
        }
    }
}
