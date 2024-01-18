namespace Bibilioteca.Models;

public class Livro
{
    public string Titulo { get; set; }
    public string Autor { get; set; }
    public DateOnly DataPublicacao { get; set; }
    public List<Genero> Generos { get; set; }
    public int Copias { get; set; }


    public Livro(string titulo, string autor, DateOnly dataPublicacao, List<Genero> generos, int copias = 0)
    {
        Titulo = titulo;
        Autor = autor;
        DataPublicacao = dataPublicacao;
        Generos = generos;
        Copias = copias;
    }
}
