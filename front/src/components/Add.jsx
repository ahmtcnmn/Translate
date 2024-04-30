import axios from "axios";
import React from "react";
import { useState } from "react";
function Add({ word }) {
  const [tr, settr] = useState(word.tr);
  const [en, seten] = useState(word.en);
  const editWord = async () => {
    const response = await axios.put(`http://localhost:3001/words/${word.id}`, {
      tr: tr,
      en: en,
    });
  };
  return (
    <div className=" w-full h-[400px] relative z-10 bg-slate-600">
      <form className=" flex flex-col items-center">
        <p className=" text-center mt-10 mb-2">Türkçesi</p>
        <input
          type="text"
          className=" w-9/12 border h-[50px]"
          value={tr}
          onChange={(e) => {
            settr(e.target.value);
            console.log(e.target.value);
          }}
        />
        <p className=" text-center mt-10 mb-2">İngilizce</p>
        <input
          type="text"
          className=" w-9/12 border h-[50px]"
          value={en}
          onChange={(e) => {
            seten(e.target.value);
          }}
        />
        <button
          type="submit"
          className=" w-1/2 mt-5 h-[40px] rounded-lg bg-slate-500"
          onClick={(event) => {
            editWord();
          }}
        >
          Kaydet
        </button>
      </form>
    </div>
  );
}

export default Add;
