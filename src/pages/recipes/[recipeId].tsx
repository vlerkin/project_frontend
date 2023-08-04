import NavigationBar from "@/components/navigationBar";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ServeIcon from "@/components/servesIcon";

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
  const recipeIdFromUrl = router.query.recipeId;

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (recipeIdFromUrl === undefined) {
      // The first time this runs this value will be `undefined` because the router has not been created yet
      // In that can we just exit the useEffect with an early return.
      return;
    }
    const getRecipeFromApi = async () => {
      const recipe = await axios.get(
        `http://127.0.0.1:3001/recipes/${recipeIdFromUrl}`
      );
      setRecipe(recipe.data);
    };

    getRecipeFromApi();
  }, [recipeIdFromUrl]);

  if (!recipe) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <div
        className="recipe-header"
        title={recipe.name}
        style={{ backgroundImage: `url(${recipe.imgUrl})` }}
      >
        <h1>{recipe.name}</h1>
      </div>
      <div className="recipe-instructions-card">
        <div className="recipe-card-header">
          <h2> {recipe.name}</h2>
          <div className="servesInfo">
            <p>Serves</p>
            <ServeIcon height={19} width={15} serves={recipe.serves} />
            <span> PrepTime</span>
            <span>{recipe.prepTime + "m"}</span>
          </div>
        </div>
        <div className="recipe-content">
          <div className="ingredients">
            <h2>Ingredients</h2>
            <p>{recipe.ingredients}</p>
          </div>
          <div className="instructions">
            <h2>Instructions</h2>
            <p>{recipe.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SeparateRecipePage = () => (
  <div>
    <NavigationBar background={true} />
    <RecipeInfo />
  </div>
);

export default SeparateRecipePage;
