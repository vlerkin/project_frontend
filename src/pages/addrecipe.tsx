import NavigationBar from "@/components/navigationBar";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { CategoryItem } from "@/interfaces/allRecipes";
import axios from "axios";

const AddRecipe = () => {
  const [nameState, setNameState] = useState("");
  const [instructionState, setInstructionState] = useState("");
  const [ingredientState, setIngredientState] = useState("");
  const [preptimeState, setPreptimeState] = useState(0);
  const [serveState, setServeState] = useState(0);
  const [imageState, setImageState] = useState("");
  const [checkboxState, setCheckboxState] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
    dessert: false,
  });
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      router.push("/login");
      return;
    }
  });
  const handleAddCancelClick = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push("/");
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckboxState((oldCheckState) => {
      return {
        ...oldCheckState,
        [name]: checked,
      };
    });
  };

  const categoryNamesForApi = Object.entries(checkboxState)
    .filter((keyValuePair) => keyValuePair[1])
    .map((catArray) => {
      return { categoryName: catArray[0] };
    });
  //console.log(categoryNamesForApi);
  const handleAddFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const postRecipe = async (
      token: string,
      nameState: string,
      instructionState: string,
      ingredientState: string,
      preptimeState: number,
      serveState: number,
      imageState: string,
      categoryNamesForApi: CategoryItem[]
    ) => {
      const response = await axios.post(
        "http://localhost:3001/recipes/",
        {
          name: nameState,
          instructions: instructionState,
          prepTime: preptimeState,
          ingredients: ingredientState,
          serves: serveState,
          imgUrl: imageState,
          categories: categoryNamesForApi,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    };
    const token = localStorage.getItem("token");
    if (token === null) {
      return;
    }
    postRecipe(
      token,
      nameState,
      instructionState,
      ingredientState,
      preptimeState,
      serveState,
      imageState,
      categoryNamesForApi
    );
    event.preventDefault();
    if (
      !nameState ||
      !instructionState ||
      !ingredientState ||
      !preptimeState ||
      !serveState ||
      !imageState ||
      !categoryNamesForApi
    ) {
      return false;
    }
  };
  const handleAddSaveClick = () => {};
  return (
    <>
      <div className="hero-addrecipe">
        <NavigationBar background={false} />
        <h1 className="addrecipe-header">Add New Recipe</h1>
      </div>
      <div className="form-container">
        <form className="addrecipe-form" onSubmit={handleAddFormSubmit}>
          <>
            <label className="add-small-margin-bottom" htmlFor="name">
              Recipe Name
            </label>
            <input
              className="addrecipe-wide-input"
              type="text"
              id="name"
              name="name"
              value={nameState}
              onChange={(event) => setNameState(event.target.value)}
              required
            ></input>
          </>
          <>
            <label
              className="add-margin-top add-small-margin-bottom"
              htmlFor="instructions"
            >
              Instructions
            </label>
            <textarea
              className="addrecipe-wide-input"
              id="instructions"
              name="instructions"
              rows={4}
              cols={16}
              value={instructionState}
              onChange={(event) => setInstructionState(event.target.value)}
              required
            ></textarea>
          </>
          <>
            <label
              className="add-margin-top add-small-margin-bottom"
              htmlFor="ingredients"
            >
              Ingredients
            </label>
            <textarea
              className="addrecipe-wide-input"
              id="ingredients"
              name="ingredients"
              rows={4}
              cols={16}
              value={ingredientState}
              onChange={(event) => setIngredientState(event.target.value)}
              required
            ></textarea>
          </>
          <div className="prep-serves-container add-margin-top">
            <div className="prep-time-container">
              <label className="add-small-margin-bottom" htmlFor="preptime">
                Prep Time
              </label>
              <input
                className="addrecipe-wide-input"
                type="number"
                id="preptime"
                name="preptime"
                value={preptimeState}
                onChange={(event) =>
                  setPreptimeState(Number(event.target.value))
                }
                required
              ></input>
            </div>
            <div className="serves-container">
              <label className="add-small-margin-bottom" htmlFor="serves">
                Serves
              </label>
              <input
                className="addrecipe-wide-input"
                type="number"
                id="serves"
                name="serves"
                value={serveState}
                onChange={(event) => setServeState(Number(event.target.value))}
                required
              ></input>
            </div>
          </div>
          <>
            <label
              className="add-margin-top add-small-margin-bottom"
              htmlFor="imgurl"
            >
              Image Url
            </label>
            <input
              className="addrecipe-wide-input"
              type="text"
              id="imgurl"
              name="imgurl"
              value={imageState}
              onChange={(event) => setImageState(event.target.value)}
              required
            ></input>
          </>
          <label className="add-margin-top">Category</label>
          <div className="category-checkbox-container">
            <div className="input-lable-container">
              <input
                className="display-inline"
                name="breakfast"
                id="breakfast"
                type="checkbox"
                checked={checkboxState.breakfast}
                onChange={handleCheckboxChange}
              ></input>
              <label className="display-inline" htmlFor="breakfast">
                Breakfast
              </label>
            </div>
            <div className="input-lable-container">
              <input
                className="display-inline"
                name="lunch"
                id="lunch"
                type="checkbox"
                checked={checkboxState.lunch}
                onChange={handleCheckboxChange}
              ></input>
              <label className="display-inline" htmlFor="lunch">
                Lunch
              </label>
            </div>
            <div className="input-lable-container">
              <input
                className="display-inline"
                name="dinner"
                id="dinner"
                type="checkbox"
                checked={checkboxState.dinner}
                onChange={handleCheckboxChange}
              ></input>
              <label className="display-inline" htmlFor="dinner">
                Dinner
              </label>
            </div>
            <div className="input-lable-container">
              <input
                className="display-inline"
                name="dessert"
                id="dessert"
                type="checkbox"
                checked={checkboxState.dessert}
                onChange={handleCheckboxChange}
              ></input>
              <label className="display-inline" htmlFor="dessert">
                Dessert
              </label>
            </div>
          </div>
          <div className="addrecipe-button-container">
            <button className="addrecipe-save-button" type="submit">
              Save
            </button>
            <button
              className="addrecipe-cancel-button"
              onClick={handleAddCancelClick}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRecipe;
