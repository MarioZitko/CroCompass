using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class AdvertisementsController : ControllerBase
{
    private readonly IAdService _advertisementService;

    public AdvertisementsController(IAdService advertisementService)
    {
        _advertisementService = advertisementService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Advertisement>>> GetAllAdvertisements()
    {
        return Ok(await _advertisementService.GetAllAdvertisementsAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Advertisement>> GetAdvertisement(int id)
    {
        var ad = await _advertisementService.GetAdvertisementByIdAsync(id);
        if (ad == null)
            return NotFound();
        return ad;
    }

    [HttpPost]
    public async Task<ActionResult> CreateAdvertisement([FromBody] Advertisement advertisement)
    {
        await _advertisementService.CreateAdvertisementAsync(advertisement);
        return CreatedAtAction(nameof(GetAdvertisement), new { id = advertisement.AdvertisementId }, advertisement);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAdvertisement(int id, [FromBody] Advertisement advertisement)
    {
        if (id != advertisement.AdvertisementId)
            return BadRequest();

        await _advertisementService.UpdateAdvertisementAsync(advertisement);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAdvertisement(int id)
    {
        await _advertisementService.DeleteAdvertisementAsync(id);
        return NoContent();
    }
}
