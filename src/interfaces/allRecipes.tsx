export interface AllRecipes {
  id: number;
  name: string;
  prepTime: number;
  imgUrl: string;
  serves: number;
  categories: RecipeCategory[];
  recipeRating: number;
}

export type RecipeCategory = "breakfast" | "lunch" | "dinner" | "dessert";

export interface CategoryItem {
  categoryName: string;
}
