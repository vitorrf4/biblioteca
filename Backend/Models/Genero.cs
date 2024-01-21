namespace Biblioteca.Models;

public class Genero
{
    public int Id { get; set; }
    public string Nome { get; set; }

    public Genero(string nome)
    {
        Id = 0;
        Nome = nome;
    }
}
