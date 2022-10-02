import * as React from "react"

const RecipeBody = ({ body }) => {

  return (
    <div>
      <section
        className="recipe-body"
        dangerouslySetInnerHTML={{ __html: body }}
        itemProp="articleBody"
      />
    </div>
  )

}

export default RecipeBody
