import { AllRecipes, RecipeCategory } from "@/interfaces/allRecipes";
import { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "@/components/navigationBar";
import StarRating from "@/components/starRating";
import ServeIcon from "@/components/servesIcon";
import Image from "next/image";

const Homepage = () => {
  const [recipeState, setRecipeState] = useState<AllRecipes[] | null>(null);
  const [filterState, setFilterState] = useState<RecipeCategory | "all">("all");
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
  const emojiCategory = {
    breakfast: "🍳",
    lunch: "🥯",
    dinner: "🥘",
    dessert: "🧁",
  };
  const recipeCategory: RecipeCategory[] = [
    "breakfast",
    "dinner",
    "lunch",
    "dessert",
  ];

  return (
    <>
      <NavigationBar background={true} />
      <div className="heroHome">
        <div className="hero-header">
          <h1>Home Chef Recipes</h1>
        </div>
      </div>
      <div className="container-main">
        <div className="homepage-content">
          <h2 className="recipe-body-heading">Recipes</h2>
          <div className="search-bar-home">
            <span className="looking-glass-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            <input
              className="search-input"
              type="text"
              placeholder="Search For Recipes..."
            />
          </div>
          <div className="category-buttons-section">
            <button
              id="all"
              className={`category-button ${
                "all" === filterState ? "clicked" : ""
              }`}
              onClick={() => setFilterState("all")}
            >
              <span className="category-button-emoji">🍴</span>
              all
            </button>
            {recipeCategory.map((aCategory) => {
              return (
                <button
                  id={aCategory}
                  className={`category-button ${
                    aCategory == filterState ? "clicked" : ""
                  } `}
                  onClick={() => setFilterState(aCategory)}
                >
                  <span className="category-button-emoji">
                    {emojiCategory[aCategory]}
                  </span>
                  {aCategory}
                </button>
              );
            })}
          </div>
          <div className="recipe-cards-home">
            {recipeState
              .filter(
                (aRecipe) =>
                  filterState === "all" ||
                  aRecipe["categories"].includes(filterState)
              )
              .map((aRecipeInfo) => {
                return (
                  <div className="recipe-card">
                    <Image
                      className="recipe-image"
                      width={338}
                      height={320}
                      src={aRecipeInfo.imgUrl}
                      alt="photo of a dish"
                    />
                    <div className="recipe-main-info">
                      <div className="recipe-name-rating">
                        <h1 className="recipe-name-home">{aRecipeInfo.name}</h1>
                        <StarRating
                          height={15}
                          width={15}
                          rating={aRecipeInfo.recipeRating}
                        />
                      </div>
                      <div className="preptime-serves-section">
                        <div>
                          <span className="display-block">Prep Time</span>
                          <span className="display-block">
                            {aRecipeInfo.prepTime + "m"}
                          </span>
                        </div>
                        <div>
                          <span className="display-block">Serves</span>
                          <ServeIcon
                            height={19}
                            width={15}
                            serves={aRecipeInfo.serves}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <button className="add-recipe-button">
            Add
            <br />
            New
            <br />
            Recipe
          </button>
        </div>
      </div>
    </>
  );
};

export default Homepage;
