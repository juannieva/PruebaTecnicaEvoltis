using Microsoft.EntityFrameworkCore;
using PruebaTecnicaEvoltis.Data.Base;
using PruebaTecnicaEvoltis.Entities.Models;

namespace PruebaTecnicaEvoltis.Data.Implementations
{
    public class BrandRepository(ApplicationDbContext context) : GenericRepository<Brand>(context), IBrandRepository
    {
        public async Task<IEnumerable<Brand>> GetByCategoryAsync(int categoryId)
        {
            throw new Exception();
            //return await _context.Products
            //    .Where(p => p.b.Any(pc => pc.CategoryId == categoryId))
            //    .Select(p => p.Brand)
            //    .Distinct()
            //    .ToListAsync();
        }
    }
}
