using AutoMapper;
using PruebaTecnicaEvoltis.Data;
using PruebaTecnicaEvoltis.Entities.Dtos;
using PruebaTecnicaEvoltis.Entities.Models;
using PruebaTecnicaEvoltis.Entities.Requests;
using System.Linq.Expressions;

namespace PruebaTecnicaEvoltis.Services.Implementations
{
    public class CategoryService(IUnitOfWork uow, IMapper mapper) : ICategoryService
    {
        private readonly IUnitOfWork _uow = uow;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<CategoryDto>> GetAllAsync(CategoryFilter? filter = null)
        {
            Expression<Func<Category, bool>>? predicate = null;

            if (filter is not null)
            {
                predicate = c =>
                    (!filter.ParentCategoryId.HasValue || c.ParentCategoryId == filter.ParentCategoryId) &&
                    (string.IsNullOrEmpty(filter.Search) || c.Name.Contains(filter.Search));
            }

            var categories = await _uow.Categories.GetAllAsync(predicate);

            return _mapper.Map<IEnumerable<CategoryDto>>(categories);
        }

        public async Task<CategoryDto?> GetByIdAsync(int id)
        {
            var cat = await _uow.Categories.GetByIdAsync(id);
            return cat == null ? null : _mapper.Map<CategoryDto>(cat);
        }

        public async Task<CategoryDto> CreateAsync(CategoryDto dto)
        {
            if (dto.ParentCategoryId.HasValue)
            {
                _ = await _uow.Categories.GetByIdAsync(dto.ParentCategoryId.Value) ?? throw new KeyNotFoundException("Parent category not found");
            }

            var entity = _mapper.Map<Category>(dto);
            var created = await _uow.Categories.AddAsync(entity);
            await _uow.SaveChangesAsync();
            return _mapper.Map<CategoryDto>(created);
        }

        public async Task UpdateAsync(CategoryDto dto)
        {
            if (!dto.Id.HasValue)
                throw new ArgumentException("Category ID is required", nameof(dto));

            var entity = await _uow.Categories.GetByIdAsync(dto.Id.Value)
                         ?? throw new KeyNotFoundException("Category not found");

            if (dto.ParentCategoryId.HasValue)
            {
                if (dto.ParentCategoryId.Value == dto.Id.Value)
                    throw new InvalidOperationException("Category cannot be its own parent");
                _ = await _uow.Categories.GetByIdAsync(dto.ParentCategoryId.Value) ?? throw new KeyNotFoundException("Parent category not found");
            }

            _mapper.Map(dto, entity);
            await _uow.Categories.UpdateAsync(entity);
            await _uow.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var children = await _uow.Categories
                                     .GetAllAsync(c => c.ParentCategoryId == id);
            foreach (var child in children)
                await DeleteAsync(child.Id);

            await _uow.Categories.DeleteAsync(id);
            await _uow.SaveChangesAsync();
        }

        public async Task<IEnumerable<CategoryDto>> GetAllWithChildrenAsync()
        {
            var categories = await _uow.Categories.GetAllWithChildrenAsync();
            return _mapper.Map<IEnumerable<CategoryDto>>(categories);
        }

        public async Task<IEnumerable<CategoryDto>> GetRootCategoriesAsync()
        {
            var categories = await _uow.Categories.GetRootCategoriesAsync();
            return _mapper.Map<IEnumerable<CategoryDto>>(categories);
        }
    }
}
