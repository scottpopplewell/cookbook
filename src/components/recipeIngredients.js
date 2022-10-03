import * as React from "react"

const RecipeIngredients = ({ ingredients }) => {

  if (ingredients === null) {
    return null
  } else {
    return (
      <div>
        <section
          className="recipe-body recipe-ingredients"
          dangerouslySetInnerHTML={{ __html: ingredients.childMarkdownRemark.html }}
        />
      </div>
    )
  }

}

export default RecipeIngredients
