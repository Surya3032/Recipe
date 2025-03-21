using Microsoft.EntityFrameworkCore;

namespace ReceipeManagement.Models
{
    public class MyContext : DbContext
    {
       public MyContext(DbContextOptions<MyContext> options) : base(options) { }

       public DbSet<Recipe> recipes { get; set; }

       public DbSet<Category> categories { get; set; }
    }
}
