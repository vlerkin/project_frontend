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
      {recipeState.map((aRecipeInfo) => {
        return (
          <div>
            <Image
              width={338}
              height={329}
              src={aRecipeInfo.imgUrl}
              alt="photo of a dish"
            />
            <h1>{aRecipeInfo.name}</h1>
            <StarRating rating={aRecipeInfo.recipeRating} />
            <div>
              <p>Prep Time</p>
              <p>{aRecipeInfo.prepTime}</p>
            </div>
            <div>
              <p>Serves</p>
              <ServeIcon serves={aRecipeInfo.serves} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Homepage;
