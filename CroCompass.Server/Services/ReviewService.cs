public class ReviewService : IReviewService
{
    private readonly IReviewRepository _reviewRepository;

    public ReviewService(IReviewRepository reviewRepository)
    {
        _reviewRepository = reviewRepository;
    }

    public async Task<List<Review>> GetAllReviewsAsync() => await _reviewRepository.GetAllReviewsAsync();

    public async Task<Review> GetReviewByIdAsync(int reviewId) => await _reviewRepository.GetReviewByIdAsync(reviewId);

    public async Task CreateReviewAsync(Review review) => await _reviewRepository.CreateReviewAsync(review);

    public async Task UpdateReviewAsync(Review review) => await _reviewRepository.UpdateReviewAsync(review);

    public async Task DeleteReviewAsync(int reviewId) => await _reviewRepository.DeleteReviewAsync(reviewId);
}
