using LogViewer.LogViewer.Models;
using LogViewer.Services;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Serilog.Events;

try
{
    Log.Information("Starting web host");
    var builder = WebApplication.CreateBuilder(args);

    builder.Logging.AddSerilog();

    Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .WriteTo.Seq(builder.Configuration.GetValue<string>("SeriLogUrl"))
                .CreateLogger();


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
    builder.Services.AddSpaStaticFiles(configuration => configuration.RootPath = builder.Environment.IsDevelopment()
                    ? "ClientApp/build"
                    : $"ClientApp/{builder.Environment.EnvironmentName}");

    var app = builder.Build();

    Log.Information("Configuration");
    Log.Information(builder.Configuration.GetDebugView());

    using (var scope = app.Services.CreateScope())
    {
        var dataContext = scope.ServiceProvider.GetRequiredService<ErrorContext>();
        dataContext.Database.Migrate();
    }

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

}
catch (Exception ex)
{
    Log.Fatal(ex, "Host terminated unexpectedly");
    return;
}
finally
{
    Log.CloseAndFlush();
}

