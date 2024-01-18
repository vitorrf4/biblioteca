namespace WebApplication1
{
    public class Livro
    {
        public string Titulo { get; set; }
        public string Autor { get; set; }
        public DateOnly DataPublicacao { get; set; }
        public List<Genero> Generos { get; set; }
        public int Copias { get; set; }
        

        public Livro(string titulo)
        {
            Titulo = titulo;
        }
    }
}