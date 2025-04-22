using FluentValidation;
using PruebaTecnicaEvoltis.Entities.Dtos;

namespace PruebaTecnicaEvoltis.Entities.Validators
{
    public class CategoryDtoValidator : AbstractValidator<CategoryDto>
    {
        public CategoryDtoValidator()
        {
            RuleFor(p =>p.Name)
                .NotEmpty().WithMessage("El nombre es obligatorio.")
                .MaximumLength(20).WithMessage("El nombre no puede superar los 20 caracteres.");
        }
    }
}
