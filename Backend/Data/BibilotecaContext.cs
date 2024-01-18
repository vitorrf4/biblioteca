using Bibilioteca.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibilioteca.Data;

public class BibilotecaContext : DbContext 
{
    public DbSet<Livro> Livro { get; set; }
    public DbSet<Genero> Genero { get; set; }

    public BibilotecaContext()
    {
        Database.EnsureCreated();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite(connectionString: "DataSource=biblioteca.db;Cache=shared");
        optionsBuilder.EnableSensitiveDataLogging();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //Livro
        modelBuilder.Entity<Livro>().HasKey(b => b.Id);
        modelBuilder.Entity<Livro>().Property(b => b.Id)
            .ValueGeneratedOnAdd()
            .IsRequired();
        modelBuilder.Entity<Livro>()
            .HasMany(b => b.Generos)
            .WithMany();

        // Genero
        modelBuilder.Entity<Genero>().HasKey(b => b.Id);
        modelBuilder.Entity<Genero>().Property(b => b.Id)
            .ValueGeneratedOnAdd()
            .IsRequired();
    }
}

