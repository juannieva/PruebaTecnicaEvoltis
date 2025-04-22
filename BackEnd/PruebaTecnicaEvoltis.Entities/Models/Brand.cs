﻿
namespace PruebaTecnicaEvoltis.Entities.Models
{
    public class Brand
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public ICollection<Product> Products { get; set; } = [];
    }
}
