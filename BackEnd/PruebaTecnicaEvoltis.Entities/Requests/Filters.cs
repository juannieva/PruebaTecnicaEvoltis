using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PruebaTecnicaEvoltis.Entities.Requests
{
    public class ProductFilter
    {
        public int? BrandId { get; set; }
        public int? CategoryId { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public string? Search { get; set; }   // buscar por nombre/desc
    }

    public class BrandFilter
    {
        public string? Search { get; set; }
    }

    public class CategoryFilter
    {
        public int? ParentCategoryId { get; set; }
        public string? Search { get; set; }
    }
}
