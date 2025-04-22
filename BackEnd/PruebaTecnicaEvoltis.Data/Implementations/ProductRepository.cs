using PruebaTecnicaEvoltis.Data.Base;
using PruebaTecnicaEvoltis.Entities.Models;

namespace PruebaTecnicaEvoltis.Data.Implementations
{
    public class ProductRepository(ApplicationDbContext context) : GenericRepository<Product>(context), IProductRepository
    {
    }
}
