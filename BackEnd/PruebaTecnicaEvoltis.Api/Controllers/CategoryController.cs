using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaEvoltis.Entities.Dtos;
using PruebaTecnicaEvoltis.Entities.Requests;
using PruebaTecnicaEvoltis.Services;

namespace PruebaTecnicaEvoltis.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController(ICategoryService categoryService) : ControllerBase
    {
        private readonly ICategoryService _categoryService = categoryService;

        [HttpGet("GetAllCategories")]
        public async Task<IActionResult> GetAll([FromQuery] CategoryFilter? filter)
        {
            var categories = await _categoryService.GetAllAsync(filter);
            return Ok(categories);
        }

        [HttpGet("GetAllCategoriesWithChildren")]
        public async Task<IActionResult> GetAllWithChildren()
        {
            var categories = await _categoryService.GetAllWithChildrenAsync();
            return Ok(categories);
        }

        [HttpGet("GetAllCategoriesRoots")]
        public async Task<IActionResult> GetRootCategories()
        {
            var categories = await _categoryService.GetRootCategoriesAsync();
            return Ok(categories);
        }

        [HttpGet("GetCategory/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var category = await _categoryService.GetByIdAsync(id);
            return category is null ? NotFound() : Ok(category);
        }

        [HttpPost("CreateCategory")]
        public async Task<IActionResult> Create(CategoryDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var created = await _categoryService.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("UpdateCategory")]
        public async Task<IActionResult> Update(CategoryDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            await _categoryService.UpdateAsync( request);
            return NoContent();
        }

        [HttpDelete("DeleteCategory/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _categoryService.DeleteAsync(id);
            return NoContent();
        }
    }
}
