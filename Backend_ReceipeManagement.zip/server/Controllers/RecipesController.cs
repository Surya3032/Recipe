using Microsoft.AspNetCore.Mvc;
using ReceipeManagement.Models;
using ReceipeManagement.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReceipeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly RecipeService _recipeService;

        public RecipesController(RecipeService recipeService)
        {
            _recipeService = recipeService;
        }

        // GET: api/Recipes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
        {
            var recipes = await _recipeService.GetAllRecipes();
            return Ok(recipes);
        }

        // GET: api/Recipes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recipe>> GetRecipe(string id)
        {
            var recipe = await _recipeService.GetRecipeById(id);
            if (recipe == null)
            {
                return NotFound();
            }
            return Ok(recipe);
        }

        // PUT: api/Recipes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipe(string id, Recipe recipe)
        {
            if (id != recipe.Id)
            {
                return BadRequest();
            }

            await _recipeService.UpdateRecipe(recipe);
            return NoContent();
        }

        // POST: api/Recipes
        [HttpPost]
        public async Task<ActionResult<Recipe>> PostRecipe(Recipe recipe)
        {
            if (_recipeService.RecipeExists(recipe.Id))
            {
                return Conflict();
            }

            await _recipeService.CreateRecipe(recipe);
            return CreatedAtAction("GetRecipe", new { id = recipe.Id }, recipe);
        }

        // DELETE: api/Recipes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(string id)
        {
            var recipe = await _recipeService.GetRecipeById(id);
            if (recipe == null)
            {
                return NotFound();
            }

            await _recipeService.DeleteRecipe(id);
            return NoContent();
        }
    }
}