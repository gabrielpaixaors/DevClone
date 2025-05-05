using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;        // ← Import do Swagger
using SpotifyBackend.Data;            // seu DbContext e entidades

var builder = WebApplication.CreateBuilder(args);

// 1) CORS
builder.Services.AddCors(opts =>
{
    opts.AddPolicy("AllowLocalAngular", policy =>
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
    );
});

// 2) DbContext (ajuste a connection string em appsettings.json)
builder.Services.AddDbContext<AppDbContext>(opts =>
{
    // o GetConnectionString pode retornar null, então usamos ! para satisfazer o nullable checker
    var conn = builder.Configuration.GetConnectionString("DefaultConnection")!;
    opts.UseSqlServer(conn);
});

// 3) Controllers
builder.Services.AddControllers();

// 4) Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "SpotifyClone API", Version = "v1" });
});

var app = builder.Build();

// 5) Use CORS
app.UseCors("AllowLocalAngular");

// 6) Swagger middleware (só em Dev)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SpotifyClone API v1");
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
