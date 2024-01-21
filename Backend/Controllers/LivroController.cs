using Bibilioteca.Models;
using Bibilioteca.Services;
using Microsoft.AspNetCore.Mvc;

namespace Biblioteca.Controllers;

[ApiController]
[Route("livros/")]
public class LivroController : ControllerBase
{
    private readonly ILogger<LivroController> _logger;
    private readonly LivroService _service; 

    public LivroController(ILogger<LivroController> logger, LivroService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Livro>>> GetAll()
    {
        var livros = await _service.GetAllLivros();

        return Ok(livros);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Livro>> GetById([FromRoute] int id)
    {
        var livro = await _service.GetLivroById(id);

        if (livro == null)
            return NotFound();

        return Ok(livro);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Livro livro)
    {
        await _service.CreateLivro(livro);

        return Created($"livros/{livro.Id}", livro);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] Livro livro)
    {    
        var existsOnDb = await _service.DoesLivroExists(livro.Id);
        if (!existsOnDb)
            return NotFound();

        await _service.UpdateLivro(livro);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existsOnDb = await _service.DoesLivroExists(id);
        if (!existsOnDb)
            return NotFound();

        await _service.DeleteLivro(id);

        return NoContent();
    }
}
