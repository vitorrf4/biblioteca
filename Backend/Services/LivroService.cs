using Bibilioteca.Models;
using Bibilioteca.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bibilioteca.Services;

public class LivroService
{
    private LivroRepository _repository;

    public LivroService(LivroRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Livro>> GetAllLivros()
    {
        return await _repository.GetAllLivros();
    }

    public async Task<Livro> GetLivroById(int id)
    {
        return await _repository.GetLivroById(id);
    }

    public async Task<bool> CreateLivro(Livro livro)
    {
        return await _repository.CreateLivro(livro);
    }

    public async Task<bool> UpdateLivro(Livro livro)
    {
        return await _repository.UpdateLivro(livro);
    }

    public async Task<bool> DeleteLivro(int id)
    {
        var livro = await _repository.GetLivroById(id);

        return await _repository.DeleteLivro(livro);
    }

    //[HttpPut]
    //public async Task<IActionResult> Update(Livro livro)
    //{
    //    var livroDb = await _context.Livro
    //        .Include(l => l.Generos)
    //        .FirstAsync(l => l.Id == livro.Id);

    //    if (livroDb == null)
    //        return NotFound();

    //    _context.Entry(livroDb).CurrentValues.SetValues(livro);

    //    //UpdateGenerosOnLivro(livro, livroDb);

    //    await _context.SaveChangesAsync();

    //    return NoContent();
    //}

    //[NonAction]
    //private void UpdateGenerosOnLivro(Livro livro, Livro livroDb)
    //{
    //    foreach (var genero in livroDb.Generos)
    //    {
    //        var updatedGenero = livro.Generos.FirstOrDefault(g => g.Id == genero.Id);

    //        if (updatedGenero != null)
    //            _context.Entry(genero).CurrentValues.SetValues(updatedGenero);
    //        else
    //            _context.Entry(genero).State = EntityState.Deleted;
    //    }

    //    foreach (var newGenero in livro.Generos.Where(g => g.Id == 0))
    //    {
    //        livroDb.Generos.Add(newGenero);
    //    }

    //}
}

