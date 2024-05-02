public interface IReviewService
{
    Task<List<Review>> GetAllReviewsAsync();
    Task<Review> GetReviewByIdAsync(int reviewId);
    Task CreateReviewAsync(Review review);
    Task UpdateReviewAsync(Review review);
    Task DeleteReviewAsync(int reviewId);
}