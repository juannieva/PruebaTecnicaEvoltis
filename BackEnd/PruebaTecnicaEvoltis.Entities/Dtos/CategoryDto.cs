
namespace PruebaTecnicaEvoltis.Entities.Dtos
{
    public class CategoryDto
    {
        public int? Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int? ParentCategoryId { get; set; }
    }

}
