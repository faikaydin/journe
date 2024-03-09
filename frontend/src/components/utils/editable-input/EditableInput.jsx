import React, { useEffect, useState } from "react";
import c from "./editable-input.module.scss";
const EditableInput = ({ input, onInputUpdate, type }) => {
  // State to manage the current title
  const [currentInput, setCurrentInput] = useState(input);

  useEffect(() => {
    setCurrentInput(input);
  }, [input]);

  // State to track whether the input field is in edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [inputWidth, setInputWidth] = useState("auto");

  // Function to handle changes in the input field
  const handleChange = (e) => {
    setCurrentInput(e.target.value);
    setInputWidth(`${e.target.value.length}ch`);
  };

  // Function to handle clicking on the title to enable editing
  const handleClick = () => {
    setIsEditing(true);
    setInputWidth(`${currentInput.toString().length}ch`);
  };

  // Function to handle blurring the input field
  const handleBlur = (e) => {
    setIsEditing(false); // Exit edit mode
    onInputUpdate(currentInput);
    if (currentInput.toString().length === 0) {
      setInputWidth("2ch");
    } else setInputWidth("auto");
  };

  // Function to handle pressing the Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false); // Exit edit mode
      onInputUpdate(currentInput); // Pass the updated title to the parent component
      if (currentInput.toString().length === 0) {
        setInputWidth("2ch");
      } else setInputWidth("auto");
    }
  };

  return (
    <div data-type={type === "text" || "number" ? "text" : "title"}>
      {/* If not in edit mode, display the title */}
      {!isEditing ? (
        <span tabIndex="0" onClick={handleClick} onFocus={handleClick}>
          {currentInput}
        </span>
      ) : (
        // If in edit mode, display an input field
        <input
          type={type}
          value={currentInput}
          onChange={handleChange}
          autoFocus // Automatically focuses the input field when it appears
          onBlur={handleBlur} // Handles blur event
          onKeyDown={handleKeyDown}
          style={{ width: inputWidth }}
        />
      )}
    </div>
  );
};

export default EditableInput;
