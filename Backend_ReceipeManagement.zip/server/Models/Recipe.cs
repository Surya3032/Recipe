namespace ReceipeManagement.Models
{
    public class Recipe
    {
        public string? Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public int Type { get; set; }

        public Category? category { get; set; }
    }
}
