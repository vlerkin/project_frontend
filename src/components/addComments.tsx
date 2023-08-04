import axios from "axios";
import { useState } from "react";

interface AddCommentsProps {
  recipeId: number;
}

const AddComments = (props: AddCommentsProps) => {
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userNameFromForm = event.currentTarget.userName.value;
    const ratingFromForm = event.currentTarget.rating.value || 0;
    const reviewFromForm = event.currentTarget.reviewField.value;

    const response = await axios.post(
      `http://localhost:3001/recipes/comments`,
      {
        name: userNameFromForm,
        review: reviewFromForm,
        rating: Number(ratingFromForm),
        recipeId: props.recipeId,
      }
    );
  };

  return (
    <div className="mainBigContainerForComment">
      <div className="headerForCommentForm">
        <h1>Add a Comment</h1>
      </div>

      <form onSubmit={handleFormSubmit} className="comment-container">
        <div className="whiteFormForComment">
          <div className="name-container">
            <label htmlFor="userName" className="userName-label">
              Name
            </label>
            <input
              name="userName"
              type="text"
              className="userName-input"
            ></input>
          </div>

          <div className="rating-container">
            <span className="nameForRating">Rating</span>
            <div className="rating">
              <input type="radio" name="rating" value="5" id="r1" />
              <label htmlFor="r1"></label>
              <input type="radio" name="rating" id="r2" value="4" />
              <label htmlFor="r2"></label>
              <input type="radio" name="rating" id="r3" value="3" />
              <label htmlFor="r3"></label>
              <input type="radio" name="rating" id="r4" value="2" />
              <label htmlFor="r4"></label>
              <input type="radio" name="rating" id="r5" value="1" />
              <label htmlFor="r5"></label>
            </div>
          </div>

          <div className="review-container">
            <label htmlFor="reviewField" className="reviewField-label">
              Review
            </label>
            <input
              name="reviewField"
              type="text"
              className="reviewField-input"
            ></input>
          </div>
          <button type="submit" className="saveButton">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComments;
