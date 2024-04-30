import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Translate from "../components/Translate";
function Home() {
  const [words, setwords] = useState([]);
  const [mod, setmod] = useState(0);
  const [number1, setnumber1] = useState({});
  const [number2, setnumber2] = useState({});
  const [number3, setnumber3] = useState({});
  const [number4, setnumber4] = useState({});
  const [inputWords, setinputWords] = useState("");
  const [skor, setskor] = useState(0);
  const [correct, setcorrect] = useState(0);
  const [incorrect, setincorrect] = useState(0);

  const [question, setquestion] = useState({});
  const wordFetch = async () => {
    try {
      const response = await axios.get("http://localhost:3001/words");
      setwords(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const randomQuestion = () => {
    const random = Math.floor(Math.random() * (words.length - 1 + 1));
    setmod((random % 4) + 1);
    setquestion(words[Math.floor(Math.random() * (words.length - 1 + 1))]);
    setnumber1(words[Math.floor(Math.random() * (words.length - 1 + 1))]);
    setnumber2(words[Math.floor(Math.random() * (words.length - 1 + 1))]);
    setnumber3(words[Math.floor(Math.random() * (words.length - 1 + 1))]);
    setnumber4(words[Math.floor(Math.random() * (words.length - 1 + 1))]);
  };
  const checkIn = () => {
    if (inputWords === question.tr) {
      setskor(skor + 1);
      setcorrect(correct + 1);
      randomQuestion();
      setinputWords("");
    } else {
      setskor(skor - 1);
      setincorrect(correct + 1);
    }
  };

  useEffect(() => {
    wordFetch();
  }, []);

  return (
    <div className=" flex flex-col items-center w-[80vw]">
      <div className=" w-full   pl-32 mt-11 h-auto">
        <div>
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
        <div className=" w-full h-auto mt-14 ml-10 flex">
          <div className=" gap-8 flex flex-col">
            <p className=" text-4xl">{question.en}</p>
            <p className=" text-2xl">Türkçesi nedir ?</p>

            <div className=" flex gap-6">
              <div className="  w-[100px] text-center">
                {mod === 1 ? <p>{question.tr}</p> : <p>{number1.tr}</p>}
              </div>
              <div className=" w-[100px] text-center">
                {mod === 2 ? <p>{question.tr}</p> : <p>{number2.tr}</p>}
              </div>
              <div className=" w-[100px] text-center">
                {mod === 3 ? <p>{question.tr}</p> : <p>{number3.tr}</p>}
              </div>
              <div className=" w-[100px] text-center">
                {mod === 4 ? <p>{question.tr}</p> : <p>{number4.tr}</p>}
              </div>
            </div>
            <form>
              <input
                className=" border w-full h-10"
                type="text"
                onChange={(e) => {
                  setinputWords(e.target.value);
                }}
                value={inputWords}
              />
              <button
                className=" w-full bg-teal-400 rounded-lg mt-3"
                onClick={(event) => {
                  event.preventDefault();
                  checkIn();
                }}
              >
                Kontrol Et
              </button>
            </form>
          </div>
          <div className=" mt-10 flex justify-between ml-20 text-lg">
            <div className=" ml-10 flex gap-4">
              <div className=" flex flex-col gap-2">
                <button
                  onClick={() => {
                    randomQuestion();
                  }}
                  className=" bg-slate-500 w-[10vw] h-[3vw] flex items-center justify-center"
                >
                  Başlat-Değiştir
                </button>
                <button
                  className=" bg-purple-600 w-[10vw] h-[3vw] flex items-center justify-center"
                  onClick={() => {
                    setcorrect(0);
                    setincorrect(0);
                    setskor(0);
                  }}
                >
                  Sıfırla
                </button>
                <div className=" bg-purple-400 w-[10vw] h-[3vw] flex items-center justify-center">
                  {skor}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className=" bg-green-600 w-[7vw] h-[3vw] flex items-center justify-center">
                  Doğru {correct}
                </div>
                <div className=" bg-red-800 w-[7vw] h-[3vw] flex items-center justify-center">
                  Yanlış {incorrect}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full">
        <Translate />
      </div>
    </div>
  );
}

export default Home;
