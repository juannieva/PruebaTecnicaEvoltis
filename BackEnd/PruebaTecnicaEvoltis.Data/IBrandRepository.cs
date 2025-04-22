using PruebaTecnicaEvoltis.Data.Base;
using PruebaTecnicaEvoltis.Entities.Models;

namespace PruebaTecnicaEvoltis.Data
{
    public interface IBrandRepository : IGenericRepository<Brand>
    {
        Task<IEnumerable<Brand>> GetByCategoryAsync(int categoryId);
    }
}
