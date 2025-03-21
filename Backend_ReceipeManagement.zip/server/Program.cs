using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ReceipeManagement.Data;
using ReceipeManagement.Models;
using ReceipeManagement.Services;
using ReceipeManagement.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// Assuming you have a separate connection string for MyContext
var myContextConnectionString = builder.Configuration.GetConnectionString("MyContext") ?? throw new InvalidOperationException("Connection string 'MyContext' not found.");
builder.Services.AddDbContext<MyContext>(options =>
    options.UseSqlServer(myContextConnectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddRazorPages();

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000", "http://localhost:3001", "http://localhost:3005", "http://localhost:3006", "http://localhost:3007") // Allow requests from your React app
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// Register Services
builder.Services.AddScoped<RecipeService>();
builder.Services.AddScoped<CategoryService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles(); // Add this line to serve static files (wwwroot)

app.UseRouting();

// Use CORS middleware here
app.UseCors();

// Use Middleware
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseMiddleware<RequestLoggingMiddleware>();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapRazorPages();
app.MapFallbackToFile("index.html");

app.Run();