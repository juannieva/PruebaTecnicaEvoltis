using PruebaTecnicaEvoltis.Data.Base;

namespace PruebaTecnicaEvoltis.Data.Implementations
{
    public class UnitOfWork(ApplicationDbContext context, 
                            IProductRepository products,
                            IBrandRepository brandRepo,
                            ICategoryRepository catRepo) : IUnitOfWork, IDisposable
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IProductRepository _products = products;
        public readonly IBrandRepository _brands = brandRepo;
        public readonly ICategoryRepository _categories = catRepo;

        public IProductRepository Products => _products;
        public IBrandRepository Brands => _brands;
        public ICategoryRepository Categories => _categories;
        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
