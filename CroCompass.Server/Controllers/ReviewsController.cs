using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ReviewsController : ControllerBase
{
    private readonly IReviewService _reviewService;

    public ReviewsController(IReviewService reviewService)
    {
        _reviewService = reviewService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Review>>> GetAllReviews()
    {
        return Ok(await _reviewService.GetAllReviewsAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Review>> GetReview(int id)
    {
        var review = await _reviewService.GetReviewByIdAsync(id);
        if (review == null)
            return NotFound();
        return review;
    }

    [HttpPost]
    public async Task<ActionResult> CreateReview([FromBody] Review review)
    {
        await _reviewService.CreateReviewAsync(review);
        return CreatedAtAction(nameof(GetReview), new { id = review.ReviewId }, review);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateReview(int id, [FromBody] Review review)
    {
        if (id != review.ReviewId)
            return BadRequest();

        await _reviewService.UpdateReviewAsync(review);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteReview(int id)
    {
        await _reviewService.DeleteReviewAsync(id);
        return NoContent();
    }
}
