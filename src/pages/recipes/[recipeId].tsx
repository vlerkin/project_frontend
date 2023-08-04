import AddComments from "@/components/addComments";
import NavigationBar from "@/components/navigationBar";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ServeIcon from "@/components/servesIcon";
import StarRating from "@/components/starRating";

interface Recipe {
  id: number;
  name: string;
  instructions: string;
  ingredients: string;
  prepTime: number;
  serves: number;
  imgUrl: string;
  rating: number;
  categories: string;
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
  
  const ingredientsList = recipe.ingredients.split(",");
  const instructionsList = recipe.instructions.split(".");
  instructionsList.pop();
  console.log(instructionsList);

  return (
    <div>
      <div
        className="recipe-header"
        title={recipe.name}
        style={{
          backgroundImage: `url(${recipe.imgUrl})`,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {" "}
        <div className="black-opacity"></div>
        <div className="recipe-general-info">
          <h1 className="recipe-h1">{recipe.name}</h1>
          <p>{recipe.categories}</p>
          <div>
            <StarRating rating={recipe.rating} height={50} width={50} />
          </div>
        </div>
      </div>
      <div className="recipe-instructions-card">
        <div className="recipe-card-header">
          <h2 className="recipe-card-h2"> {recipe.name}</h2>
          <div className="servesInfo">
            <p>Serves </p>
            <ServeIcon height={19} width={15} serves={recipe.serves} />
            <span> PrepTime </span>
            <span className="prep-time-text">{recipe.prepTime + "  m"}</span>
          </div>
        </div>
        <div className="recipe-content">
          <div className="ingredients">
            <h2>Ingredients</h2>
            <ul>
              {ingredientsList.map((item: string) => {
                return <li> {item}</li>;
              })}
            </ul>
          </div>
          <div className="instructions">
            <h2>Instructions</h2>
            <ol>
              {instructionsList.map((item: string) => {
                return <li> {item + "."}</li>;
              })}
            </ol>
          </div>
        </div>
      </div>
       <AddComments recipeId={recipeId} />
    </div>
  );
};


export default RecipeInfo;