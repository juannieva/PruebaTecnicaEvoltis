using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaEvoltis.Entities.Dtos;
using PruebaTecnicaEvoltis.Entities.Requests;
using PruebaTecnicaEvoltis.Services;

namespace PruebaTecnicaEvoltis.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BrandsController(IBrandService brandService) : ControllerBase
    {
        private readonly IBrandService _brandService = brandService;

        [HttpGet("GetAllBrands")]
        public async Task<ActionResult<IEnumerable<BrandDto>>> GetAll([FromQuery] BrandFilter? filter)
        {
            var brands = await _brandService.GetAllAsync(filter);
            return Ok(brands);
        }

        [HttpGet("GetBrand/{id}")]
        public async Task<ActionResult<BrandDto>> GetById(int id)
        {
            var brand = await _brandService.GetByIdAsync(id);
            if (brand is null)
                return NotFound();

            return Ok(brand);
        }

        [HttpPost("CreateBrand")]
        public async Task<ActionResult<BrandDto>> Create([FromBody] BrandDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var brand = await _brandService.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = brand.Id }, brand);
        }

        [HttpPut("UpdateBrand")]
        public async Task<IActionResult> Update([FromBody] BrandDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            await _brandService.UpdateAsync( request);

            return Ok();
        }

        [HttpDelete("DeleteBrand/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _brandService.DeleteAsync(id);

            return Ok();
        }

        [HttpGet("GetBrandByCategory/{categoryId}")]
        public async Task<ActionResult<IEnumerable<BrandDto>>> GetByCategoryAsync(int categoryId)
        {
            var brands = await _brandService.GetByCategoryAsync(categoryId);
            return Ok(brands);
        }
    }
}
