using AutoMapper;
using PruebaTecnicaEvoltis.Entities.Dtos;
using PruebaTecnicaEvoltis.Entities.Models;
using PruebaTecnicaEvoltis.Entities.Requests;

namespace PruebaTecnicaEvoltis.Api.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            {
                // Brand ↔ BrandDto
                CreateMap<Brand, BrandDto>().ReverseMap();

                // Category ↔ CategoryDto
                CreateMap<Category, CategoryDto>().ReverseMap();

                // CategoryDto → Category
                CreateMap<CategoryDto, Category>();

                CreateMap<Product, ProductDto>()
                    .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.Category.Id))
                    .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.Brand.Name))
                    .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                    .ReverseMap()
                    .ForMember(dest => dest.BrandId, opt => opt.MapFrom(src => src.BrandId)) // 👈 Asegura que se mapea correctamente
                    .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.CategoryId)) // 👈 Igual acá
                    .ForPath(dest => dest.Brand, opt => opt.Ignore())
                    .ForPath(dest => dest.Category, opt => opt.Ignore());
            }
        }
    }
}
