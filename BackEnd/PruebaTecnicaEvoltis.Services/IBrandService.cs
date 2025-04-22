using PruebaTecnicaEvoltis.Entities.Dtos;
using PruebaTecnicaEvoltis.Entities.Requests;

namespace PruebaTecnicaEvoltis.Services
{
    public interface IBrandService
    {
        Task<IEnumerable<BrandDto>> GetAllAsync(BrandFilter? filter);
        Task<BrandDto?> GetByIdAsync(int id);
        Task<BrandDto> CreateAsync(BrandDto request);
        Task UpdateAsync(BrandDto request);
        Task DeleteAsync(int id);
        Task<IEnumerable<BrandDto>> GetByCategoryAsync(int categoryId);
    }
}
