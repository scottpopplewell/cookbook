import * as React from "react"

const Tag = ({ name, parentFunction }) => {

  const [isActive, setActive] = React.useState(false);

  const buttonClasses = "btn btn-outline-secondary btn-sm me-2 mt-2"
  const buttonClassesActive = buttonClasses + " active"
  const buttonClassesInactive = buttonClasses
  const handleTagClick = () => {
    parentFunction(!isActive, name);
    setActive(!isActive);
  }

  return (
    <button 
        onClick={handleTagClick}
        type="button"
        className={isActive ? buttonClassesActive : buttonClassesInactive}>{name}</button>
  )
}

export default Tag
