import React from "react";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { useState } from "react";
import axios from "axios";
import Add from "./Add";
function WordsList({ word }) {
  const [open, setopen] = useState(false);
  const deleteWords = async () => {
    const response = await axios.delete(
      `http://localhost:3001/words/${word.id}`
    );
    window.location.reload();
  };
  return (
    <div className=" flex h-auto w-full justify-evenly p-2 border-b-2">
      <div className=" flex ">
        <p>TR:</p>
        <p className=" ml-1">{word.tr}</p>
        <p className=" ml-10">EN:</p>
        <p className=" ml-1">{word.en}</p>
      </div>
      <div className=" flex ">
        <div className=" w-auto h-[25px] bg-green-600">
          <CiEdit
            className=" w-full h-full"
            onClick={() => {
              setopen(!open);
            }}
          />
          <div className=" w-full h-[300px}">{open && <Add word={word} />}</div>
        </div>
        <div className=" w-[25px] h-[25px] bg-red-600">
          <CiTrash
            className="w-full h-full"
            onClick={() => {
              deleteWords();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default WordsList;
