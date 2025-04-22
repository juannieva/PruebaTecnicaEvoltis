using System.Linq.Expressions;

namespace PruebaTecnicaEvoltis.Data.Base
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null,Func<IQueryable<T>, IQueryable<T>>? includeFunc = null);
        Task<T?> GetByIdAsync(int id,Func<IQueryable<T>, IQueryable<T>>? includeFunc = null);
        Task<T> AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
    }
}
