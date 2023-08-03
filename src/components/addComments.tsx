import { useState } from "react";
import StarRating from "@/components/starRating";

const addComments = () => {
  return (
    <div className="mainBigContainerForComment">
      <div className="headerForCommentForm">
        <h1>Add a Comment</h1>
      </div>

      <div className="whiteFormForComment">
        <label htmlFor="userName">Name</label>
        <input name="userName" type="text" className="userName"></input>
        <label htmlFor="reviewField">Review</label>
        <input name="reviewField" type="text" className="reviewField"></input>

        <div className="rating">
          <label htmlFor="rating">Rating</label>
          <input type="radio" name="rating" id="r1" />
          <label htmlFor="r1"></label>
          <input type="radio" name="rating" id="r2" />
          <label htmlFor="r2"></label>
          <input type="radio" name="rating" id="r3" />
          <label htmlFor="r3"></label>
          <input type="radio" name="rating" id="r4" />
          <label htmlFor="r4"></label>
          <input type="radio" name="rating" id="r5" />
          <label htmlFor="r5"></label>
        </div>
      </div>

      <button className="saveButton">Save</button>
    </div>
  );
};

export default addComments;
