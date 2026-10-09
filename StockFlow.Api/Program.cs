using Microsoft.EntityFrameworkCore;
using StockFlow.Api.Data;
using StockFlow.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddCors(options => options.AddPolicy("frontend", policy =>
    policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("frontend");
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
    if (!db.Productos.Any())
    {
        db.Productos.AddRange(
            new Producto { Nombre = "Laptop HP", Descripcion = "Laptop para oficina y estudio", Precio = 5499, Stock = 8 },
            new Producto { Nombre = "Mouse Logitech", Descripcion = "Mouse inalámbrico", Precio = 249, Stock = 25 },
            new Producto { Nombre = "Monitor Samsung", Descripcion = "Monitor IPS de 24 pulgadas", Precio = 1499, Stock = 10 },
            new Producto { Nombre = "Teclado Mecánico", Descripcion = "Teclado USB para escritorio", Precio = 399, Stock = 14 }
        );
        db.SaveChanges();
    }
}

app.Run();
