using Biblioteca.Data;
using Biblioteca.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddDbContext<BibliotecaContext>();
builder.Services.AddTransient<LivroService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseCors(options => options.WithOrigins("http://localhost:4200")
            .AllowAnyMethod().AllowAnyHeader());

app.Run();
