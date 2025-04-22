using Microsoft.EntityFrameworkCore;
using PruebaTecnicaEvoltis.Entities.Models;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;

namespace PruebaTecnicaEvoltis.Data.Base
{
    public class GenericRepository<T>(ApplicationDbContext context) : IGenericRepository<T> where T : class
    {
        protected readonly ApplicationDbContext _context = context;
        private readonly DbSet<T> _dbSet = context.Set<T>();
        public async Task<IEnumerable<T>> GetAllAsync(
            Expression<Func<T, bool>>? filter = null,
            Func<IQueryable<T>, IQueryable<T>>? includeFunc = null)
        {
            try
            {
                IQueryable<T> query = _dbSet.AsNoTracking();

                if (filter != null)
                    query = query.Where(filter);

                if (includeFunc != null)
                    query = includeFunc(query); 

                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<T?> GetByIdAsync(int id,Func<IQueryable<T>,IQueryable<T>>? includeFunc = null)
        {
            try
            {
                IQueryable<T> query = _dbSet.AsNoTracking();

                if (includeFunc != null)
                    query = includeFunc(query);

                return await query.FirstOrDefaultAsync(e => EF.Property<int>(e, "Id") == id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<T> AddAsync(T entity)
        {
            try
            {
                _dbSet.Add(entity);
                await _context.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task UpdateAsync(T entity)
        {
            try
            {
                _context.Entry(entity).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                var entity = await GetByIdAsync(id);
                if (entity is null)
                {
                    return; // Moved to its own line to fix IDE2001
                }
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
