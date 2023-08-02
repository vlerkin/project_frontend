interface Category {
  categoryName: RecipeCategory;
}

export interface AllRecipes {
  name: string;
  prepTime: number;
  imgUrl: string;
  serves: number;
  categories: Category[];
  recipeRating: number;
}

export type RecipeCategory = "breakfast" | "lunch" | "dinner" | "dessert";
