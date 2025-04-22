using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaEvoltis.Entities.Dtos;
using PruebaTecnicaEvoltis.Entities.Requests;
using PruebaTecnicaEvoltis.Services;

namespace PruebaTecnicaEvoltis.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController(IProductService service) : ControllerBase
    {
        private readonly IProductService _service = service;

        [HttpGet("GetAllProducts")]
        public async Task<IActionResult> GetAll([FromQuery]ProductFilter? filter) => Ok(await _service.GetAllAsync(filter));

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _service.GetByIdAsync(id);
            return product is null ? NotFound() : Ok(product);
        }

        [HttpPost("AddProduct")]
        public async Task<IActionResult> Create([FromBody] ProductDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("UpdateProduct")]
        public async Task<IActionResult> Update( [FromBody] ProductDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            await _service.UpdateAsync(dto);
            return NoContent();
        }

        [HttpDelete("DeleteProduct/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
