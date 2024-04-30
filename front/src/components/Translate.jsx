import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
function Translate() {
  const [words, setwords] = useState();
  const [source, setsource] = useState("");

  const [translatorTR, settranslatorTR] = useState("");
  const [data, setData] = useState(null);

  const wordFetch = async () => {
    try {
      const response = await axios.get("http://localhost:3001/words");
      setwords(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const translateTo = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/translator?translatorTR=" +
          translatorTR +
          "&source=" +
          source,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const addWords = async () => {
    if (source === "tr-en") {
      console.log(source + "sorute en");
      const update = [
        ...words,
        {
          id: Math.round(Math.random() * 999999),
          tr: translatorTR,
          en: data,
        },
      ];
      try {
        await axios.post("http://localhost:3001/words", {
          id: Math.round(Math.random() * 999999),
          tr: translatorTR,
          en: data,
        });
        setwords(update);
        console.log(update + "sorute tr");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(source + "sorute en");
      const update = [
        ...words,
        {
          id: Math.round(Math.random() * 999999),
          tr: data,
          en: translatorTR,
        },
      ];
      try {
        await axios.post("http://localhost:3001/words", {
          id: Math.round(Math.random() * 999999),
          tr: data,
          en: translatorTR,
        });
        setwords(update);
        console.log(update + "sorute tr");
      } catch (error) {
        console.log(error);
      }
    }

    window.location.reload();
  };
  useEffect(() => {
    wordFetch();
  }, []);
  return (
    <div>
      <div className=" w-full h-auto border bg-slate-400 p-3 mt-10 text-center">
        <select
          name=""
          id=""
          className=" p-1"
          onChange={(e) => {
            setsource(e.target.value);
          }}
        >
          <option value="">Çeviri dilini seçiniz</option>
          <option value="tr-en">TR - EN</option>
          <option value="en-tr">EN - TR</option>
        </select>
        <div className=" flex gap-10 p-3">
          <textarea
            type="text"
            className=" w-1/2 h-[50px] border p-2"
            value={translatorTR}
            onChange={(e) => {
              settranslatorTR(e.target.value);
            }}
          />
          <textarea
            type="text"
            className=" w-1/2 h-[50px] border"
            value={data}
          />
        </div>
        <button
          className=" w-1/4 rounded-full h-[50px] bg-slate-200"
          onClick={(e) => {
            e.preventDefault();
            translateTo();
          }}
        >
          Çevir
        </button>
        <button
          className=" w-1/4 rounded-full h-[50px] ml-10 bg-slate-200"
          onClick={(event) => {
            event.preventDefault();

            addWords();
          }}
        >
          Çeviriyi kaydet
        </button>
      </div>
    </div>
  );
}

export default Translate;
