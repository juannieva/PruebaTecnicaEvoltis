
using Microsoft.EntityFrameworkCore;
using PruebaTecnicaEvoltis.Data.Base;
using PruebaTecnicaEvoltis.Entities.Models;

namespace PruebaTecnicaEvoltis.Data.Implementations
{
    public class CategoryRepository(ApplicationDbContext context) : GenericRepository<Category>(context), ICategoryRepository
    {
        public async Task<IEnumerable<Category>> GetAllWithChildrenAsync()
        {
            return await _context.Categories
                .Include(c => c.Subcategories)
                .AsNoTracking()
            .ToListAsync();
        }

        public async Task<Category?> GetByNameAsync(string name)
        {
            return await _context.Categories
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Name == name);
        }

        public async Task<IEnumerable<Category>> GetRootCategoriesAsync()
        {
            return await _context.Categories
                .Where(c => c.ParentCategoryId == null)
                .AsNoTracking()
            .ToListAsync();
        }

        public async Task DeleteWithChildrenAsync(int id)
        {
            var category = await _context.Categories
                .Include(c => c.Subcategories)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category != null)
            {
                // Eliminamos primero las hijas
                _context.Categories.RemoveRange(category.Subcategories);

                // Luego la categoría padre
                _context.Categories.Remove(category);

                await _context.SaveChangesAsync();
            }
        }
    }
}
