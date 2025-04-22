using AutoMapper;
using PruebaTecnicaEvoltis.Data;
using PruebaTecnicaEvoltis.Entities.Dtos;
using PruebaTecnicaEvoltis.Entities.Models;
using PruebaTecnicaEvoltis.Entities.Requests;
using System.Linq.Expressions;

namespace PruebaTecnicaEvoltis.Services.Implementations
{
    public class BrandService(IUnitOfWork uow, IMapper mapper) : IBrandService
    {
        private readonly IUnitOfWork _uow = uow;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<BrandDto>> GetAllAsync(BrandFilter? filter)
        {
            Expression<Func<Brand, bool>> expr = b =>
                filter == null || string.IsNullOrWhiteSpace(filter.Search)
                    ? true
                    : b.Name.Contains(filter.Search!);

            var brands = await _uow.Brands.GetAllAsync(expr);

            return _mapper.Map<IEnumerable<BrandDto>>(brands);
        }

        public async Task<BrandDto?> GetByIdAsync(int id)
        {
            var brand = await _uow.Brands.GetByIdAsync(id);
            return brand == null ? null : _mapper.Map<BrandDto>(brand);
        }

        public async Task<BrandDto> CreateAsync(BrandDto request)
        {
            var brand = _mapper.Map<Brand>(request);
            await _uow.Brands.AddAsync(brand);
            await _uow.SaveChangesAsync();
            return _mapper.Map<BrandDto>(brand);
        }

        public async Task UpdateAsync(BrandDto request)
        {
            if (!request.Id.HasValue)
                throw new ArgumentException("El ID de la marca no puede ser nulo.", nameof(request));

            var brand = await _uow.Brands.GetByIdAsync(request.Id.Value) ?? throw new KeyNotFoundException("Brand not found");
            _mapper.Map(request, brand);
            await _uow.Brands.UpdateAsync(brand);
            await _uow.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            await _uow.Brands.DeleteAsync(id);
            await _uow.SaveChangesAsync();
        }

        public async Task<IEnumerable<BrandDto>> GetByCategoryAsync(int categoryId)
        {
            var brands = await _uow.Brands.GetByCategoryAsync(categoryId);
            return _mapper.Map<IEnumerable<BrandDto>>(brands);
        }
    }
}
