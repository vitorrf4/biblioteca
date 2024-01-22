using Biblioteca.Data;
using Biblioteca.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Biblioteca.Controllers;

[ApiController]
[Route("generos/")]
public class GeneroController : Controller
{

    private readonly ILogger<GeneroController> _logger;
    private readonly BibliotecaContext _context;

    public GeneroController(ILogger<GeneroController> logger, BibliotecaContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Genero>>> GetAll()
    {
        try
        {
            var livros = await _context.Genero.ToListAsync();

            return Ok(livros);
        }
        catch (Exception e)
        {
            _logger.LogError("Erro: " + e);
            return StatusCode(500, "Erro na aplicação");
        }
    }
}

