using PruebaTecnicaEvoltis.Entities.Dtos;
using PruebaTecnicaEvoltis.Entities.Requests;

namespace PruebaTecnicaEvoltis.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllAsync(CategoryFilter? filter = null);
        Task<IEnumerable<CategoryDto>> GetAllWithChildrenAsync();
        Task<IEnumerable<CategoryDto>> GetRootCategoriesAsync();
        Task<CategoryDto?> GetByIdAsync(int id);
        Task<CategoryDto> CreateAsync(CategoryDto request);
        Task UpdateAsync(CategoryDto product);
        Task DeleteAsync(int id);
    }
}
