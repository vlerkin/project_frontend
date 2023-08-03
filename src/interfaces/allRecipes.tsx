export interface AllRecipes {
  name: string;
  prepTime: number;
  imgUrl: string;
  serves: number;
  categories: RecipeCategory[];
  recipeRating: number;
}

export type RecipeCategory = "breakfast" | "lunch" | "dinner" | "dessert";
