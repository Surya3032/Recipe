using Microsoft.EntityFrameworkCore;
using ReceipeManagement.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReceipeManagement.Services
{
    public class RecipeService
    {
        private readonly MyContext _context;

        public RecipeService(MyContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Recipe>> GetAllRecipes()
        {
            return await _context.recipes.Include(r => r.category).ToListAsync(); // Include category
        }

        public async Task<Recipe> GetRecipeById(string id)
        {
            return await _context.recipes.Include(r => r.category).FirstOrDefaultAsync(r => r.Id == id); // Include category
        }

        public async Task<Recipe> CreateRecipe(Recipe recipe)
        {
            _context.recipes.Add(recipe);
            await _context.SaveChangesAsync();
            return recipe;
        }

        public async Task UpdateRecipe(Recipe recipe)
        {
            _context.Entry(recipe).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteRecipe(string id)
        {
            var recipe = await _context.recipes.FindAsync(id);
            if (recipe != null)
            {
                _context.recipes.Remove(recipe);
                await _context.SaveChangesAsync();
            }
        }

        public bool RecipeExists(string id)
        {
            return _context.recipes.Any(e => e.Id == id);
        }
    }
}