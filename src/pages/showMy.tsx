import NavigationBar from "@/components/navigationBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import StarRating from "@/components/starRating";
import ServeIcon from "@/components/servesIcon";

interface MyRecipes {
  id: number;
  name: string;
  prepTime: number;
  imgUrl: string;
  serves: number;
  recipeRating: number;
}

const showMy = () => {
  const router = useRouter();
  const [recipeState, setRecipeState] = useState<MyRecipes[] | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      router.push("/login");
      return;
    }

    const getRecipesFromApi = async (token: string) => {
      const response = await axios.get(
        "http://127.0.0.1:3001/recipes/show/my",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecipeState(response.data);
    };
    getRecipesFromApi(token);
  }, []);
  if (!recipeState) {
    return <p>Loading...</p>;
  }
  console.log(recipeState);
  return (
    <>
      <div className="dashboard-hero-section-template">
        <div className="dashboard-hero-section">
          <NavigationBar background={false} />
          <h1 className="dashboard-header">Dashboard</h1>
        </div>
      </div>
      <div className="dashboard-main-section">
        <div className="dashboard-recipe-cards-container">
          {recipeState.map((aRecipe) => {
            return (
              <div className="dashboard-recipe-card">
                <div className="dashboard-recipe-image"></div>
                <Image
                  className="dashboard-recipe-image"
                  width={300}
                  height={300}
                  src={aRecipe.imgUrl}
                  alt="photo of a dish"
                />
                <div className="dashboard-card-recipe-info">
                  <h1>{aRecipe.name}</h1>
                  <div className="dashboard-rating-preptime-serves">
                    <div className="dashboard-card-recipe-rating">
                      <StarRating
                        height={15}
                        width={15}
                        rating={aRecipe.recipeRating}
                      />
                    </div>
                    <div className="dashboard-card-recipe-serves">
                      <p className="dashboard-serves-word display-inline">
                        Serves
                      </p>
                      <div className="dashboeard-serves-icons">
                        <ServeIcon
                          height={19}
                          width={15}
                          serves={aRecipe.serves}
                        />
                      </div>
                    </div>
                    <div className="dashboard-card-recipe-preptime">
                      <span>Prep Time</span>
                      <span>{aRecipe.prepTime + "m"}</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard-button-container">
                  <button className="dashboard-edit-button">Edit</button>
                  <button className="dashboard-delete-button">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default showMy;
