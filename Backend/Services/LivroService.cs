using Biblioteca.Data;
using Biblioteca.Models;
using Microsoft.EntityFrameworkCore;

namespace Biblioteca.Services;

public class LivroService
{
    private readonly BibliotecaContext _context;

    public LivroService(BibliotecaContext context)
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

    public bool IsLivroValid(Livro livro)
    {
        return !string.IsNullOrWhiteSpace(livro.Titulo) &&
            !string.IsNullOrWhiteSpace(livro.Autor) &&
            livro.Copias >= 0 && !livro.DataPublicacao.Equals(null) &&
            AreGenerosValid(livro.Generos);
    }

    public bool AreGenerosValid(HashSet<Genero> generos)
    {
        foreach (var genero in generos)
        {
            if (string.IsNullOrWhiteSpace(genero.Nome))
                return false;
        }

        return true;
    }

    public async Task<bool> CreateLivro(Livro livro)
    {
        TrackExistingGeneros(livro.Generos);

        await _context.Livro.AddAsync(livro);
        return await Save();
    }


    private async void TrackExistingGeneros(HashSet<Genero> generos)
    {
        foreach (var genero in generos)
        {
            var generoDb = await _context.Genero
                .Where(g => g.Nome == genero.Nome)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            if (generoDb != null)
            {
                genero.Id = generoDb.Id;
                _context.Attach(genero);
            }
        }
    }

    public async Task<bool> UpdateLivro(Livro livro)
    {
        var livroDb = await _context.Livro
            .Include(l => l.Generos)
            .FirstOrDefaultAsync(l => l.Id == livro.Id);

        if (livroDb == null)
            return false;

        livroDb.Generos.Clear();

        foreach (var gen in livro.Generos)
        {
            var genDb = await _context.Genero
                .Where(g => g.Nome == gen.Nome)
                .FirstOrDefaultAsync();

            if (genDb != null)
                livroDb.Generos.Add(genDb);
            else 
                livroDb.Generos.Add(gen);
        }

        _context.Entry(livroDb).CurrentValues.SetValues(livro);

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

