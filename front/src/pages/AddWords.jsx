import React, { useEffect } from "react";
import { useState } from "react";

import { NavLink } from "react-router-dom";
import WordsList from "../components/WordsList";
import axios from "axios";

import Translate from "../components/Translate";

function AddWords() {
  const [words, setwords] = useState([]);
  const [addTr, setaddTr] = useState("");
  const [addEn, setaddEn] = useState("");

  const wordFetch = async () => {
    try {
      const response = await axios.get("http://localhost:3001/words");
      setwords(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const wordAdd = async () => {
    const update = [
      ...words,
      {
        id: words[words.length - 1].id + 1,
        tr: addTr,
        en: addEn,
      },
    ];

    try {
      const response = await axios.post("http://localhost:3001/words", {
        id: Math.round(Math.random() * 999999),
        tr: addTr,
        en: addEn,
      });
      setwords(update);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    wordFetch();
  }, []);

  return (
    <div className=" flex flex-col items-center w-full">
      <div className=" w-full  w-[80vw] pl-32 mt-11 h-auto">
        <div className="navlink">
          <NavLink to={"/"} className=" bg-green-700  p-4  rounded-md">
            Anasayfa
          </NavLink>
          <NavLink
            to={"/addwords"}
            className=" bg-green-700 p-4 ml-3  rounded-md"
          >
            Kelime Ekle
          </NavLink>
        </div>
        <div className=" w-full border h-[700px] mt-10 flex gap-2">
          <div className=" w-1/2 h-full border">
            <form className=" flex flex-col items-center">
              <p className=" text-center mt-10 mb-2">Türkçesi</p>
              <input
                type="text"
                className=" w-9/12 border h-[50px]"
                onChange={(e) => {
                  setaddTr(e.target.value);
                }}
              />
              <p className=" text-center mt-10 mb-2">İngilizce</p>
              <input
                type="text"
                className=" w-9/12 border h-[50px]"
                onChange={(e) => {
                  setaddEn(e.target.value);
                }}
              />
              <button
                type="submit"
                className=" w-1/2 mt-5 h-[40px] rounded-lg bg-slate-500"
                onClick={(event) => {
                  event.preventDefault();
                  wordAdd();
                }}
              >
                Kaydet
              </button>
            </form>
            <Translate />
          </div>
          <div className=" w-1/2 h-full border-x-2 overflow-auto">
            {words.map((word) => {
              return <WordsList word={word} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddWords;
