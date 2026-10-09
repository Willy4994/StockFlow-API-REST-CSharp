using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockFlow.Api.Data;
using StockFlow.Api.Models;

namespace StockFlow.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductosController(AppDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Producto>>> GetProductos() =>
        await context.Productos.AsNoTracking().OrderBy(p => p.Id).ToListAsync();

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Producto>> GetProducto(int id)
    {
        var producto = await context.Productos.FindAsync(id);
        return producto is null ? NotFound() : producto;
    }

    [HttpPost]
    public async Task<ActionResult<Producto>> PostProducto(Producto producto)
    {
        producto.Id = 0;
        context.Productos.Add(producto);
        await context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProducto), new { id = producto.Id }, producto);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> PutProducto(int id, Producto producto)
    {
        if (id != producto.Id) return BadRequest("El ID de la URL debe coincidir con el producto.");
        if (!await context.Productos.AnyAsync(p => p.Id == id)) return NotFound();

        context.Entry(producto).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteProducto(int id)
    {
        var producto = await context.Productos.FindAsync(id);
        if (producto is null) return NotFound();
        context.Productos.Remove(producto);
        await context.SaveChangesAsync();
        return NoContent();
    }
}
