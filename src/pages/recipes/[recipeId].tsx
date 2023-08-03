import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Recipe {
  id: number;
  name: string;
  instructions: string;
  ingredients: string;
  prepTime: number;
  serves: number;
  imgUrl: string;
  rating: number;
}

const RecipeInfo = () => {
  const router = useRouter();
  const recipeId = router.query.recipeId;
  console.log(recipeId);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (recipeId === undefined) {
      // The first time this runs this value will be `undefined` because the router has not been created yet
      // In that can we just exit the useEffect with an early return.
      return;
    }
    const getRecipeFromApi = async () => {
      const recipe = await axios.get(
        `http://127.0.0.1:3001/recipes/${recipeId}`
      );
      setRecipe(recipe.data);
    };

    getRecipeFromApi();
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading ...</div>;
  }

  return <h1> This is the recipe {recipe.name}</h1>;
};

const SeparateRecipePage = () => (
  <div>
    <RecipeInfo />
  </div>
);

export default SeparateRecipePage;
