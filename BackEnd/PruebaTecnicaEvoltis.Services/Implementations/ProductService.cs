using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PruebaTecnicaEvoltis.Data;
using PruebaTecnicaEvoltis.Entities.Dtos;
using PruebaTecnicaEvoltis.Entities.Models;
using PruebaTecnicaEvoltis.Entities.Requests;
using System.Linq.Expressions;

namespace PruebaTecnicaEvoltis.Services.Implementations
{
    public class ProductService(IUnitOfWork uow, IMapper mapper) : IProductService
    {
        private readonly IUnitOfWork _uow = uow;
        private readonly IMapper _mapper=mapper;

        public async Task<IEnumerable<ProductDto>> GetAllAsync(ProductFilter? filter)
        {
            Expression<Func<Product, bool>> expr = p =>
                (filter == null || filter.BrandId == null || p.BrandId == filter.BrandId) &&
                (filter == null || filter.MinPrice == null || p.Price >= filter.MinPrice) &&
                (filter == null || filter.MaxPrice == null || p.Price <= filter.MaxPrice) &&
                (filter == null || filter.Search == null || p.Name.Contains(filter.Search)) &&
                (filter == null || filter.CategoryId == null || p.CategoryId == filter.CategoryId);

            var entities = await _uow.Products.GetAllAsync(
                    expr,
                    q => q.Include(p => p.Brand)
                          .Include(p => p.Category));
            return _mapper.Map<IEnumerable<ProductDto>>(entities);
        }

        public async Task<ProductDto?> GetByIdAsync(int id)
        {
            var entity = await _uow.Products.GetByIdAsync(id,
                q => q.Include(p => p.Brand)
                        .Include(p => p.Category));
            return entity is null
                ? null
                : _mapper.Map<ProductDto>(entity);
        }

        public async Task<ProductDto> CreateAsync(ProductDto dto)
        {
            var entity = _mapper.Map<Product>(dto);
            entity.Brand = null!;
            entity.Category = null!;
            var created = await _uow.Products.AddAsync(entity);
            return _mapper.Map<ProductDto>(created);
        }
        public Task UpdateAsync(ProductDto dto) 
        {
            var entity = _mapper.Map<Product>(dto);
            return _uow.Products.UpdateAsync(entity);
        } 
        public Task DeleteAsync(int id) => _uow.Products.DeleteAsync(id);
    }
}
