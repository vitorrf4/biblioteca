using Biblioteca.Models;
using Biblioteca.Services;
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
        try
        {
            var livros = await _service.GetAllLivros();

            return Ok(livros);
        }
        catch (Exception e)
        {
            _logger.LogError("Erro: " + e);
            return StatusCode(500, "Erro na aplicação");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Livro>> GetById([FromRoute] int id)
    {
        try
        {
            var livro = await _service.GetLivroById(id);

            if (livro == null)
                return NotFound();

            return Ok(livro);

        }
        catch (Exception e)
        {
            _logger.LogError("Erro: " + e);
            return StatusCode(500, "Erro na aplicação");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Livro livro)
    {
        try
        {
            if (!_service.IsLivroValid(livro))
                return BadRequest();

            await _service.CreateLivro(livro);

            return Created($"livros/{livro.Id}", livro);

        }
        catch (Exception e)
        {
            _logger.LogError("Erro: " + e);
            return StatusCode(500, "Erro na aplicação");
        }
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] Livro livro)
    {
        try
        {
            var existsOnDb = await _service.DoesLivroExists(livro.Id);
            if (!existsOnDb)
                return NotFound();

            if (!_service.IsLivroValid(livro))
                return BadRequest();

            await _service.UpdateLivro(livro);

            return NoContent();
        }
        catch (Exception e)
        {
            _logger.LogError("Erro: " + e);
            return StatusCode(500, "Erro na aplicação");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var existsOnDb = await _service.DoesLivroExists(id);
            if (!existsOnDb)
                return NotFound();

            await _service.DeleteLivro(id);

            return NoContent();
        }
        catch (Exception e)
        {
            _logger.LogError("Erro: " + e);
            return StatusCode(500, "Erro na aplicação");
        }
    }
}
