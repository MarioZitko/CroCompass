
public class AdService : IAdService
{
    private readonly IAdRepository _adRepository;

    public AdService(IAdRepository adRepository)
    {
        _adRepository = adRepository;
    }

    //public async Task<Advertisement> CreateAdAsync(AdvertisementDTO adDto, string userId)
    //{
    //    var ad = new Advertisement
    //    {
    //        AdvertisementId = adDto.AdvertisementId,
    //        Title = adDto.Title,
    //        Description = adDto.Description,
    //        Category = adDto.Category,
    //        Price = adDto.Price,
    //        Location = adDto.Location,
    //        UserId = userId,
    //        CreatedAt = DateTime.UtcNow,
    //        UpdatedAt = DateTime.UtcNow,
    //        IsActive = true
    //    };
    //    return await _adRepository.CreateAdAsync(ad);
    //}

    public async Task<List<Advertisement>> GetAllAdvertisementsAsync()
    {
        return await _adRepository.GetAllAdvertisementsAsync();
    }

    public async Task<Advertisement> GetAdvertisementByIdAsync(int adId)
    {
        return await _adRepository.GetAdvertisementByIdAsync(adId);
    }

    public async Task CreateAdvertisementAsync(Advertisement advertisement)
    {
        await _adRepository.CreateAdvertisementAsync(advertisement);
    }

    public async Task UpdateAdvertisementAsync(Advertisement advertisement)
    {
        await _adRepository.UpdateAdvertisementAsync(advertisement);
    }

    public async Task DeleteAdvertisementAsync(int adId)
    {
        await _adRepository.DeleteAdvertisementAsync(adId);
    }
}
