import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AddComments from "@/components/addComments";

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
  const recipeId = Number(router.query.recipeId);

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (recipeId === undefined || isNaN(recipeId)) {
      // The first time this runs this value will be `undefined` because the router has not been created yet
      // In that can we just exit the useEffect with an early return.
      return;
    }
    console.log(recipeId);
    const getRecipeFromApi = async () => {
      const recipe = await axios.get(
        `http://127.0.0.1:3001/recipes/${recipeId}`
      );
      setRecipe(recipe.data);
    };

    getRecipeFromApi();
  }, [recipeId]);

  if (!recipe || isNaN(recipeId)) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h1> This is the recipe {recipe.name}</h1>
      <AddComments recipeId={recipeId} />
    </div>
  );
};

export default RecipeInfo;
