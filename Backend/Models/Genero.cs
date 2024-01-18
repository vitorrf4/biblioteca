namespace Bibilioteca.Models;

public class Genero
{
    public int Id { get; private set; }
    public string Nome { get; set; }

    public Genero(string nome)
    {
        Nome = nome;
    }
}
