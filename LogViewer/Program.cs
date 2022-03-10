using LogViewer.LogViewer.Models;
using LogViewer.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddTransient(typeof(IErrorManagementService), typeof(ErrorManagementService));

var allowedOrigins = builder.Configuration.GetValue<string>("allowedOrigins")?.Split(",") ?? new string[0];
builder.Services.AddCors(options =>
{
    options.AddPolicy("ErrorManagement", builder =>
        builder
            .WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .SetPreflightMaxAge(TimeSpan.Zero)
            .SetIsOriginAllowedToAllowWildcardSubdomains()
    );
});

builder.Services.AddControllersWithViews(x => x.AllowEmptyInputInBodyModelBinding = true).AddJsonOptions(options =>
{
    // Turn off camel casing of json responses.
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
});

builder.Services.AddDbContext<ErrorContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("ErrorManagement");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
