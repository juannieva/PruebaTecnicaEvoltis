using FluentValidation;
using PruebaTecnicaEvoltis.Entities.Dtos;

namespace PruebaTecnicaEvoltis.Entities.Validators
{
    public class ProductDtoValidator : AbstractValidator<ProductDto>
    {
        public ProductDtoValidator()
        {
            RuleFor(p => p.Name)
                .NotEmpty().WithMessage("El nombre es obligatorio.")
                .MaximumLength(40).WithMessage("El nombre no puede superar los 40 caracteres.");

            RuleFor(p => p.Price)
                .GreaterThan(0).WithMessage("El precio debe ser mayor a cero.");

            RuleFor(p => p.Stock)
                .GreaterThanOrEqualTo(0).WithMessage("El stock no puede ser negativo.");

            RuleFor(p=>p.Description)
                .MaximumLength(200).WithMessage("La descripción no puede superar los 500 caracteres.");
            RuleFor(p => p.ImageUrl)
                .MaximumLength(200).WithMessage("La URL de la imagen no puede superar los 200 caracteres.");
            
        }
    }
}
