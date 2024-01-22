namespace Biblioteca.Models;

public class Livro
{
    public int Id { get; set; }
    public string Titulo { get; set; }
    public string Autor { get; set; }
    public DateOnly DataPublicacao { get; set; }
    public HashSet<Genero> Generos { get; set; }
    public int Copias { get; set; }

    public Livro() {
        Id = 0;
        Titulo = "";
        Autor = "";
        DataPublicacao = new DateOnly();
        Generos = new HashSet<Genero>();
        Copias = 0;
    }

    public Livro(string titulo, string autor, DateOnly dataPublicacao, HashSet<Genero> generos, int copias = 0)
    {
        Titulo = titulo;
        Autor = autor;
        DataPublicacao = dataPublicacao;
        Generos = generos;
        Copias = copias;
    }
}
