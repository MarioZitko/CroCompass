using Microsoft.EntityFrameworkCore;

public class ReviewRepository : IReviewRepository
{
    private readonly ApplicationDbContext _context;

    public ReviewRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Review>> GetAllReviewsAsync()
    {
        return await _context.Reviews.Include(r => r.User).Include(r => r.Advertisement).ToListAsync();
    }

    public async Task<Review> GetReviewByIdAsync(int reviewId)
    {
        return await _context.Reviews.Include(r => r.User).Include(r => r.Advertisement)
                                     .FirstOrDefaultAsync(r => r.ReviewId == reviewId);
    }

    public async Task CreateReviewAsync(Review review)
    {
        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateReviewAsync(Review review)
    {
        _context.Entry(review).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteReviewAsync(int reviewId)
    {
        var review = await _context.Reviews.FindAsync(reviewId);
        if (review != null)
        {
            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
        }
    }
}
