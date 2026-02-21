export interface Recipe {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  description: string;
  size: string;
  images: { id: string; url: string }[];
  ingredients: string;
  body: string;
  comments: { id: string; date: string; body: string }[];
}

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Grandma's Chocolate Chip Cookies",
    author: "Grandma Hillas",
    createdAt: "January 15, 2024",
    description: "The classic family recipe passed down through generations",
    size: "24 cookies",
    images: [
      {
        id: "img1",
        url: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
      },
    ],
    ingredients: `## Ingredients

- 2 1/4 cups all-purpose flour
- 1 tsp baking soda
- 1 tsp salt
- 1 cup (2 sticks) butter, softened
- 3/4 cup granulated sugar
- 3/4 cup packed brown sugar
- 2 large eggs
- 1 tsp vanilla extract
- 2 cups chocolate chips`,
    body: `## Instructions

1. **Preheat oven** to 375°F (190°C).

2. **Mix dry ingredients**: Combine flour, baking soda and salt in a small bowl.

3. **Cream butter and sugars**: Beat butter, granulated sugar, and brown sugar in a large mixer bowl until creamy.

4. **Add eggs and vanilla**: Beat in eggs and vanilla extract.

5. **Combine**: Gradually beat in flour mixture. Stir in chocolate chips.

6. **Bake**: Drop rounded tablespoon of dough onto ungreased baking sheets. Bake for 9 to 11 minutes or until golden brown.

7. **Cool**: Cool on baking sheets for 2 minutes; remove to wire racks to cool completely.

## Tips

- Don't overbake! The cookies will continue to cook on the hot baking sheet.
- For softer cookies, use more brown sugar than white sugar.
- Chill the dough for 30 minutes for thicker cookies.`,
    comments: [
      {
        id: "c1",
        date: "March, 2024",
        body: "Made these for the family reunion - huge hit!",
      },
      {
        id: "c2",
        date: "June, 2024",
        body: "Added walnuts this time, delicious variation.",
      },
    ],
  },
  {
    id: "2",
    title: "Mom's Tomato Soup",
    author: "Mom",
    createdAt: "February 20, 2024",
    description: "Warm and comforting homemade tomato soup",
    size: "6 servings",
    images: [],
    ingredients: `## Ingredients

- 2 cans (28 oz each) whole peeled tomatoes
- 2 cups chicken broth
- 1 medium onion, diced
- 3 cloves garlic, minced
- 2 tbsp butter
- 1 cup heavy cream
- Salt and pepper to taste
- Fresh basil for garnish`,
    body: `## Instructions

1. **Sauté aromatics**: Melt butter in a large pot over medium heat. Add onion and cook until softened, about 5 minutes. Add garlic and cook 1 minute more.

2. **Add tomatoes**: Pour in tomatoes and chicken broth. Bring to a simmer and cook for 20 minutes.

3. **Blend**: Use an immersion blender to puree until smooth (or blend in batches).

4. **Finish**: Stir in heavy cream, season with salt and pepper.

5. **Serve**: Ladle into bowls and garnish with fresh basil.`,
    comments: [
      {
        id: "c3",
        date: "February, 2024",
        body: "Perfect with grilled cheese sandwiches!",
      },
    ],
  },
];

export function getRecipeById(id: string): Recipe | undefined {
  return mockRecipes.find((recipe) => recipe.id === id);
}

export function getAllRecipes(): Recipe[] {
  return mockRecipes;
}
