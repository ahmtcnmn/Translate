const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const cors = require("cors");

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3001", // İstek yapan kaynağın adresi
  credentials: true, // Kimlik doğrulama bilgileri gönderilsin mi?
};
app.use(cors(corsOptions));
app.get("/translator", async (req, res) => {
  const { translatorTR, source } = req.query;

  const encodedParams = new URLSearchParams();
  if (source == "tr-en") {
    encodedParams.set("source_language", "tr");
    encodedParams.set("target_language", "en");
  } else {
    encodedParams.set("source_language", "en");
    encodedParams.set("target_language", "tr");
  }
  encodedParams.set("text", translatorTR);

  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "80ecef24famshba3087da1524961p1c87f4jsn5ed908782370",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    res.json(response.data.data.translatedText);
    console.log(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during translation");
  }
});

app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
