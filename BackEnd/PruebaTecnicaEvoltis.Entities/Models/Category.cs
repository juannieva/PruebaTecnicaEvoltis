
namespace PruebaTecnicaEvoltis.Entities.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        // Subcategorías (estructura jerárquica)
        public int? ParentCategoryId { get; set; }
        public Category? ParentCategory { get; set; }
        public ICollection<Category> Subcategories { get; set; } = [];

        // Productos asociados (muchos a muchos)
        public ICollection<Product> Products { get; set; } = []; // ⇦ Nueva colección
    }
}
