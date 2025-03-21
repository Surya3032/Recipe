
using Microsoft.EntityFrameworkCore;
using ReceipeManagement.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReceipeManagement.Services
{
    public class CategoryService
    {
        private readonly MyContext _context;

        public CategoryService(MyContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            return await _context.categories.ToListAsync();
        }

        public async Task<Category> GetCategoryById(int id)
        {
            return await _context.categories.FindAsync(id);
        }

        public async Task<Category> CreateCategory(Category category)
        {
            _context.categories.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task UpdateCategory(Category category)
        {
            _context.Entry(category).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCategory(int id)
        {
            var category = await _context.categories.FindAsync(id);
            if (category != null)
            {
                _context.categories.Remove(category);
                await _context.SaveChangesAsync();
            }
        }

        public bool CategoryExists(int id)
        {
            return _context.categories.Any(e => e.Id == id);
        }
    }
}