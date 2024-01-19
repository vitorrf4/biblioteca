using Bibilioteca.Data;
using Bibilioteca.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Controllers;

[ApiController]
[Route("livro/")]
public class LivroController : ControllerBase
{
    private BibilotecaContext _context;
    private readonly ILogger<LivroController> _logger;

    public LivroController(BibilotecaContext context, ILogger<LivroController> logger)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Livro>>> GetAll()
    {
        var livros = await _context.Livro
            .Include(l => l.Generos)
            .ToListAsync();

        return Ok(livros);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Livro>> GetById([FromRoute] int id)
    {
        // include categorias
        var livro = await _context.Livro
            .Include(l => l.Generos)
            .Where(l => l.Id == id)
            .FirstAsync();

        if (livro == null)
            return NotFound();

        return Ok(livro);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Livro livro)
    {
        await _context.AddAsync(livro);
        await _context.SaveChangesAsync();

        return Created($"livros/{livro.Id}", livro);
    }

    [HttpPut]
    public async Task<IActionResult> Update(Livro livro)
    {
        var livroDb = await _context.Livro.FindAsync(livro.Id);
        if (livroDb == null)
            return NotFound();

        _context.Entry(livroDb).State = EntityState.Detached;

        _context.Livro.Update(livro);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var livro = await _context.Livro.FindAsync(id);
        if (livro == null)
            return NotFound();

        _context.Livro.Remove(livro);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
