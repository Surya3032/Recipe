-- Recipe Management System Database Setup Script

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'RecipeManagement')
BEGIN
    CREATE DATABASE RecipeManagement;
END
GO

USE RecipeManagement;
GO

-- Create Users table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
BEGIN
    CREATE TABLE Users (
        UserId INT PRIMARY KEY IDENTITY(1,1),
        Username NVARCHAR(50) NOT NULL UNIQUE,
        Email NVARCHAR(100) NOT NULL UNIQUE,
        PasswordHash NVARCHAR(128) NOT NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
        UpdatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
    );
END
GO

-- Create Categories table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Categories')
BEGIN
    CREATE TABLE Categories (
        CategoryId INT PRIMARY KEY IDENTITY(1,1),
        Name NVARCHAR(50) NOT NULL UNIQUE,
        Description NVARCHAR(200) NULL
    );
END
GO

-- Create Recipes table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Recipes')
BEGIN
    CREATE TABLE Recipes (
        RecipeId INT PRIMARY KEY IDENTITY(1,1),
        Title NVARCHAR(100) NOT NULL,
        Description NVARCHAR(500) NULL,
        PrepTime INT NULL, -- In minutes
        CookTime INT NULL, -- In minutes
        TotalTime INT NULL, -- In minutes
        Servings INT NULL,
        ImageUrl NVARCHAR(255) NULL,
        UserId INT NOT NULL,
        CategoryId INT NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
        UpdatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
        FOREIGN KEY (UserId) REFERENCES Users(UserId),
        FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
    );
END
GO

-- Create Ingredients table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Ingredients')
BEGIN
    CREATE TABLE Ingredients (
        IngredientId INT PRIMARY KEY IDENTITY(1,1),
        RecipeId INT NOT NULL,
        Name NVARCHAR(100) NOT NULL,
        Quantity NVARCHAR(50) NULL,
        Unit NVARCHAR(30) NULL,
        SortOrder INT NOT NULL DEFAULT 0,
        FOREIGN KEY (RecipeId) REFERENCES Recipes(RecipeId) ON DELETE CASCADE
    );
END
GO

-- Create Instructions table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Instructions')
BEGIN
    CREATE TABLE Instructions (
        InstructionId INT PRIMARY KEY IDENTITY(1,1),
        RecipeId INT NOT NULL,
        StepNumber INT NOT NULL,
        Description NVARCHAR(500) NOT NULL,
        FOREIGN KEY (RecipeId) REFERENCES Recipes(RecipeId) ON DELETE CASCADE
    );
END
GO

-- Insert seed data

-- Add seed categories
IF NOT EXISTS (SELECT TOP 1 * FROM Categories)
BEGIN
    INSERT INTO Categories (Name, Description)
    VALUES 
        ('Breakfast', 'Morning meals to start your day'),
        ('Lunch', 'Midday meals for energy'),
        ('Dinner', 'Evening meals to end your day'),
        ('Appetizers', 'Small dishes served before a meal'),
        ('Desserts', 'Sweet treats to enjoy'),
        ('Vegetarian', 'Dishes without meat'),
        ('Vegan', 'Dishes without animal products'),
        ('Gluten-Free', 'Dishes without gluten'),
        ('Quick Meals', 'Meals ready in 30 minutes or less'),
        ('Soups', 'Warm and comforting liquid dishes');
END
GO

-- Add seed user
IF NOT EXISTS (SELECT TOP 1 * FROM Users)
BEGIN
    -- Note: In a real application, password would be properly hashed
    INSERT INTO Users (Username, Email, PasswordHash)
    VALUES ('admin', 'admin@example.com', 'AQAAAAEAACcQAAAAEHxA9VnT24YrMxs9fTGb4BTe+Hlw0Wk9JcUKrBIFVx5MeaFZ5QWGI8SVrvJmP3hQzQ==');
END
GO

-- Add sample recipes if none exist
IF NOT EXISTS (SELECT TOP 1 * FROM Recipes)
BEGIN
    DECLARE @UserId INT;
    SELECT @UserId = UserId FROM Users WHERE Username = 'admin';
    
    DECLARE @BreakfastId INT, @DessertId INT;
    SELECT @BreakfastId = CategoryId FROM Categories WHERE Name = 'Breakfast';
    SELECT @DessertId = CategoryId FROM Categories WHERE Name = 'Desserts';
    
    -- Insert sample recipe 1
    INSERT INTO Recipes (Title, Description, PrepTime, CookTime, TotalTime, Servings, UserId, CategoryId)
    VALUES ('Classic Pancakes', 'Fluffy and delicious pancakes for a perfect breakfast', 10, 15, 25, 4, @UserId, @BreakfastId);
    
    DECLARE @PancakeRecipeId INT = SCOPE_IDENTITY();
    
    -- Insert ingredients for pancakes
    INSERT INTO Ingredients (RecipeId, Name, Quantity, Unit, SortOrder)
    VALUES 
        (@PancakeRecipeId, 'All-purpose flour', '1 1/2', 'cups', 1),
        (@PancakeRecipeId, 'Baking powder', '3 1/2', 'teaspoons', 2),
        (@PancakeRecipeId, 'Salt', '1', 'teaspoon', 3),
        (@PancakeRecipeId, 'White sugar', '1', 'tablespoon', 4),
        (@PancakeRecipeId, 'Milk', '1 1/4', 'cups', 5),
        (@PancakeRecipeId, 'Egg', '1', '', 6),
        (@PancakeRecipeId, 'Butter', '3', 'tablespoons', 7);
    
    -- Insert instructions for pancakes
    INSERT INTO Instructions (RecipeId, StepNumber, Description)
    VALUES 
        (@PancakeRecipeId, 1, 'In a large bowl, sift together the flour, baking powder, salt and sugar.'),
        (@PancakeRecipeId, 2, 'Make a well in the center and pour in the milk, egg and melted butter; mix until smooth.'),
        (@PancakeRecipeId, 3, 'Heat a lightly oiled griddle or frying pan over medium-high heat.'),
        (@PancakeRecipeId, 4, 'Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake.'),
        (@PancakeRecipeId, 5, 'Brown on both sides and serve hot with maple syrup and butter.');
    
    -- Insert sample recipe 2
    INSERT INTO Recipes (Title, Description, PrepTime, CookTime, TotalTime, Servings, UserId, CategoryId)
    VALUES ('Chocolate Chip Cookies', 'Classic homemade chocolate chip cookies that are soft and chewy', 15, 10, 25, 24, @UserId, @DessertId);
    
    DECLARE @CookieRecipeId INT = SCOPE_IDENTITY();
    
    -- Insert ingredients for cookies
    INSERT INTO Ingredients (RecipeId, Name, Quantity, Unit, SortOrder)
    VALUES 
        (@CookieRecipeId, 'Butter', '1', 'cup', 1),
        (@CookieRecipeId, 'White sugar', '1', 'cup', 2),
        (@CookieRecipeId, 'Brown sugar', '1', 'cup', 3),
        (@CookieRecipeId, 'Eggs', '2', '', 4),
        (@CookieRecipeId, 'Vanilla extract', '2', 'teaspoons', 5),
        (@CookieRecipeId, 'Baking soda', '1', 'teaspoon', 6),
        (@CookieRecipeId, 'Hot water', '2', 'teaspoons', 7),
        (@CookieRecipeId, 'Salt', '1/2', 'teaspoon', 8),
        (@CookieRecipeId, 'All-purpose flour', '3', 'cups', 9),
        (@CookieRecipeId, 'Chocolate chips', '2', 'cups', 10);
    
    -- Insert instructions for cookies
    INSERT INTO Instructions (RecipeId, StepNumber, Description)
    VALUES 
        (@CookieRecipeId, 1, 'Preheat oven to 350 degrees F (175 degrees C).'),
        (@CookieRecipeId, 2, 'Cream together butter and sugars until smooth.'),
        (@CookieRecipeId, 3, 'Beat in eggs one at a time, then stir in vanilla.'),
        (@CookieRecipeId, 4, 'Dissolve baking soda in hot water and add to batter along with salt.'),
        (@CookieRecipeId, 5, 'Stir in flour and chocolate chips.'),
        (@CookieRecipeId, 6, 'Drop by large spoonfuls onto ungreased pans.'),
        (@CookieRecipeId, 7, 'Bake for about 10 minutes or until edges are nicely browned.');
END
GO

PRINT 'Database setup completed successfully.';
GO 