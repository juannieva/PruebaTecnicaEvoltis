﻿
namespace PruebaTecnicaEvoltis.Data
{
    public interface IUnitOfWork : IDisposable
    {
        IProductRepository Products { get; }
        IBrandRepository Brands { get; }
        ICategoryRepository Categories { get; }
        Task<int> SaveChangesAsync();
    }
}
