using Bibilioteca.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibilioteca.Data;

public class BibilotecaContext : DbContext 
{
    public DbSet<Livro> Livro { get; set; }
    public DbSet<Genero> Genero { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite(connectionString: "DataSource=biblioteca.db;Cache=shared");
        optionsBuilder.EnableSensitiveDataLogging();
    }
}

