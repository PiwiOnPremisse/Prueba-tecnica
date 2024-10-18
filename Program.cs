//1. Usings para trabajar con el entity
using Microsoft.EntityFrameworkCore;
using SegurosDeVida.DataAccess;

//2.Conexion para sql
var builder = WebApplication.CreateBuilder(args);

const string CONNECTIONNAME = "SegurosDeVidaDB";
var connectionString = builder.Configuration.GetConnectionString(CONNECTIONNAME);

//3. Add Context
builder.Services.AddDbContext<SegurosDeVidaDBContext>(options => options.UseSqlServer(connectionString));



// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Agregar Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("NuevaPolitica", app => {
        app.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("NuevaPolitica");

app.UseAuthorization();

app.MapControllers();

app.Run();
