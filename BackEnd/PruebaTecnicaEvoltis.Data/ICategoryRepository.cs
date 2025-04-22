using PruebaTecnicaEvoltis.Data.Base;
using PruebaTecnicaEvoltis.Entities.Models;

namespace PruebaTecnicaEvoltis.Data
{
    public interface ICategoryRepository : IGenericRepository<Category>
    {
        Task<IEnumerable<Category>> GetAllWithChildrenAsync();
        Task<Category?> GetByNameAsync(string name);
        Task<IEnumerable<Category>> GetRootCategoriesAsync();
        Task DeleteWithChildrenAsync(int id);
    }
}
