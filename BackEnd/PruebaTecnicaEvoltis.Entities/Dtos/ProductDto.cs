
namespace PruebaTecnicaEvoltis.Entities.Dtos
{
    public class ProductDto
    {
        public int? Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public string? BrandName { get; set; } // ⇦ Nombre de la marca
        public string? CategoryName { get; set; } // ⇦ Nombre de la categoría
    }
}
