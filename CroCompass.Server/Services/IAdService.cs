public interface IAdService
{
    Task<List<Advertisement>> GetAllAdvertisementsAsync();
    Task<Advertisement> GetAdvertisementByIdAsync(int adId);
    Task CreateAdvertisementAsync(Advertisement advertisement);
    Task UpdateAdvertisementAsync(Advertisement advertisement);
    Task DeleteAdvertisementAsync(int adId);
}
