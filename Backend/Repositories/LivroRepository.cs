using Bibilioteca.Data;
using Bibilioteca.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibilioteca.Repositories;

public class LivroRepository
{
    private readonly BibilotecaContext _context;

    public LivroRepository(BibilotecaContext context)
    {
        _context = context;
    }

    public async Task<ICollection<Livro>> GetAllLivros()
    {
        return await _context.Livro.Include(l => l.Generos)
            .ToListAsync();
    }

    public async Task<Livro> GetLivroById(int id) 
    {
        return await _context.Livro
            .Include(l => l.Generos)
            .FirstAsync(l => l.Id == id);
    }

    public async Task<bool> DoesLivroExist(int id)
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
        _context.Livro.Update(livro);
        return await Save();
    }

    public async Task<bool> DeleteLivro(Livro livro)
    {
        _context.Remove(livro);
        return await Save();
    }

    private async Task<bool> Save()
    {
        return await _context.SaveChangesAsync() >= 0;
    }
}

