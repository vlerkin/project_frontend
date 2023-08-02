import { AllRecipes } from "@/interfaces/allRecipes";
import { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "@/components/navigationBar";
import StarRating from "@/components/starRating";
import ServeIcon from "@/components/servesIcon";
import Image from "next/image";

const Homepage = () => {
  const [recipeState, setRecipeState] = useState<AllRecipes[] | null>(null);
  useEffect(() => {
    const getRecipesFromApi = async () => {
      const response = await axios.get("http://127.0.0.1:3001/");
      setRecipeState(response.data);
    };
    getRecipesFromApi();
  }, []);
  if (!recipeState) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavigationBar />
      <div className="heroHome">
        <h1>Home Chef Recipes</h1>
      </div>
      <body className="homepage-content">
        <h2 className="recipe-body-heading">Recipes</h2>
        <div className="search-bar-home">
          <Image
            src="/SearchIcon.png"
            alt="search icon"
            width={27}
            height={27}
            className="search-icon"
          />
          <input
            className="search-input"
            type="text"
            placeholder="Search For Recipes..."
          />
        </div>
        <div className="recipe-cards-home">
          {recipeState.map((aRecipeInfo) => {
            return (
              <div className="recipe-card">
                <Image
                  width={338}
                  height={329}
                  src={aRecipeInfo.imgUrl}
                  alt="photo of a dish"
                />
                <h1>{aRecipeInfo.name}</h1>
                <StarRating
                  height={23}
                  width={23}
                  rating={aRecipeInfo.recipeRating}
                />
                <div>
                  <p>Prep Time</p>
                  <p>{aRecipeInfo.prepTime}</p>
                </div>
                <div>
                  <p>Serves</p>
                  <ServeIcon
                    height={19}
                    width={15}
                    serves={aRecipeInfo.serves}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <button className="add-recipe">Add New Recipe</button>
      </body>
    </>
  );
};

export default Homepage;
