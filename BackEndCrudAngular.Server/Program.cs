using BackEndCrudAngular.Server.Models.Data;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddSingleton<EmpleadoData>();
builder.Services.AddCors(options => 
{
    options.AddPolicy("NuevaPolitica", app => 
    {
        app.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
builder.Services.AddControllers();
var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors("NuevaPolitica");
app.UseAuthorization();

app.MapControllers();

app.Run();
