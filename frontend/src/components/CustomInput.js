import React, { useState } from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  const [isInputVisible, setInputVisible] = useState(false);

  const handleInputChange = (e) => {
    setCustomInput(e.target.value);
  };

  return (
    <>
      <button
        onClick={() => setInputVisible(!isInputVisible)}
        className={classnames("bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold py-2 px-4 rounded shadow")}
      >
        {isInputVisible ? "Hide Input" : "Add custom Input"}
      </button>

      {isInputVisible && (
        <textarea
          rows="5"
          value={customInput}
          onChange={handleInputChange}
          placeholder={`Custom input`}
          className={classnames(
            "focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2"
          )}
        ></textarea>
      )}
    </>
  );
};

export default CustomInput;
