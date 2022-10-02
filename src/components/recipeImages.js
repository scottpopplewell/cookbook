import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const RecipeImages = ({ images }) => {

  if(images == null || images.length == 0) {
    return null
  }

  return (
    <div className="my-3">
      {images.map(image => {
        return (
          <a target="_blank" href={image.file.url}>
            <GatsbyImage className="recipe-image" image={image.gatsbyImageData} alt="Recipe Photo"/>
          </a>
        )
      })}
    </div>
  )
}

export default RecipeImages
