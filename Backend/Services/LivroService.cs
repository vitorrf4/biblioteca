using Bibilioteca.Data;
using Bibilioteca.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibilioteca.Services;

public class LivroService
{
    private readonly BibilotecaContext _context;

    public LivroService(BibilotecaContext context)
    {
        _context = context;
    }

    public async Task<ICollection<Livro>> GetAllLivros()
    {
        return await _context.Livro
            .Include(l => l.Generos)
            .ToListAsync();
    }

    public async Task<Livro?> GetLivroById(int id)
    {
        return await _context.Livro
            .Include(l => l.Generos)
            .FirstOrDefaultAsync(l => l.Id == id);
    }

    public async Task<bool> DoesLivroExists(int id)
    {
        return await _context.Livro.AnyAsync(livro => livro.Id == id);
    }

    public async Task<bool> CreateLivro(Livro livro)
    {
        await _context.Livro.AddAsync(livro);
        return await Save();
    }

    public async Task<bool> UpdateLivro(Livro livro)
    {
        var livroDb = await _context.Livro
            .Include(l => l.Generos)
            .FirstOrDefaultAsync(l => l.Id == livro.Id);

        if (livroDb == null)
            return false;

        for (var i = 0; i < livroDb.Generos.Count; i++)
        {
            var genero = livroDb.Generos[i];

            if (livro.Generos.Find(g => g.Id == genero.Id) == null)
                livroDb.Generos.Remove(genero);
        }

        foreach (var g in livro.Generos)
        {
            if (g.Id == 0)
                livroDb.Generos.Add(g);
        }

        _context.Entry(livroDb).CurrentValues.SetValues(livro);

        _context.Attach(livroDb);
        _context.Update(livroDb);

        return await Save();
    }

    public async Task<bool> DeleteLivro(int id)
    {
        var livro = await GetLivroById(id);
        if (livro == null)
            return false;

        _context.Remove(livro);
        return await Save();
    }

    private async Task<bool> Save()
    {
        return await _context.SaveChangesAsync() >= 0;
    }

}

