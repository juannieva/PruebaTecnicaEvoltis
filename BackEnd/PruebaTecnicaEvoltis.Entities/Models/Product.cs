
namespace PruebaTecnicaEvoltis.Entities.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string Description { get; set; }= string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public int BrandId { get; set; }
        public Brand Brand { get; set; } = null!;
        public int CategoryId { get; set; } // Clave foránea
        public Category Category { get; set; } = null!;
    }
}
