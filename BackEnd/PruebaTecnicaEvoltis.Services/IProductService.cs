using PruebaTecnicaEvoltis.Entities.Dtos;
using PruebaTecnicaEvoltis.Entities.Requests;

namespace PruebaTecnicaEvoltis.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetAllAsync(ProductFilter? filter);
        Task<ProductDto?> GetByIdAsync(int id);
        Task<ProductDto> CreateAsync(ProductDto product);
        Task UpdateAsync(ProductDto product);
        Task DeleteAsync(int id);
    }
}
