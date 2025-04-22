using PruebaTecnicaEvoltis.Data;
using PruebaTecnicaEvoltis.Data.Implementations;
using PruebaTecnicaEvoltis.Services.Implementations;
using Microsoft.Extensions.DependencyInjection;
using FluentValidation;
using PruebaTecnicaEvoltis.Entities.Validators;
using FluentValidation.AspNetCore;

namespace PruebaTecnicaEvoltis.Services.Extensions
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddMySevices(this IServiceCollection services)
        {
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IBrandService, BrandService>();
            return services;
        }
        public static IServiceCollection AddMyDataAccess(this IServiceCollection services)
        {
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IBrandRepository, BrandRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            return services;
        }

        public static IServiceCollection AddMyValidator(this IServiceCollection services)
        {
            services.AddValidatorsFromAssemblyContaining<ProductDtoValidator>();
            services.AddValidatorsFromAssemblyContaining<CategoryDtoValidator>();
            services.AddValidatorsFromAssemblyContaining<BrandDtoValidator>();
            services.AddFluentValidationAutoValidation();
            return services;
        }
    }
}
