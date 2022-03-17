const nodemailer = require("nodemailer");
const axios = require("axios");
const templates = require("./templates.js");

let options = {
  method: "GET",
  url: "https://cocktails3.p.rapidapi.com/random",
  headers: {
    "x-rapidapi-host": "cocktails3.p.rapidapi.com",
    "x-rapidapi-key": "d7452d3567msh91928834eec1060p16c082jsn17811e0f9cd5",
  },
};

const getCocktail = async () => {
  return axios
    .request(options)
    .then((response) => {
      return response.data.body[0];
    })
    .catch((error) => console.error(error));
};

// Nodemailer set up

const nodemailerSetup = async () => {
  let transporter = await nodemailer.createTransport({
    service: "Gmail", // can switch for 'hotmail'
    auth: {
      user: "chrisjcastle93@gmail.com",
      pass: "ebnvdoxmgmwebdau",
    },
  });
  return transporter;
};

const sendEmail = (testTaker, diseaseName, dateTaken) => {
  let cocktailName;
  let cocktailIngredients = "";
  getCocktail()
    .then((cocktail) => {
      // console.log(cocktail)
      cocktailName = cocktail.name;
      cocktail.ingredients.forEach((ingredient) => {
        cocktailIngredients += `<p>${ingredient}</p>`;
      });
      return;
    })
    .then(() => {
      return nodemailerSetup();
    })
    .then((transporter) => {
      return transporter.sendMail({
        from: "Chris Castle <chrisjcastle93@gmail.com>",
        to: "chrisjcastle93@gmail.com",
        subject: "UH OH, SOMEONE IN GROUP 7 HAS CORONA...",
        text: "CORONA",
        html: templates.templateExample(testTaker, diseaseName, dateTaken, cocktailName, cocktailIngredients),
        attachments: [
          {
            filename: "Top.png",
            path: `public/images/Top.png`,
            cid: "Top.png",
          },
        ],
      });
    })
    .catch((err) => console.log(err));
};

module.exports = sendEmail;
