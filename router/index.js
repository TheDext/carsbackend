// const Router = require("express").Router;
// const router = new Router();
// const cheerio = require("cheerio");
// const axios = require("axios");

// // router.get("/cars", async (req, res) => {
// //   const getHtml = async (url) => {
// //     try {
// //       const { data } = await axios.get(url);
// //       return cheerio.load(data);
// //     } catch (error) {
// //       res.send(error);
// //     }
// //   };

// //   const cars = await getHtml("https://www.mashina.kg/");

// //   console.log("cars", cars.html());
// //     res.send(cars.html());
// // });

// module.exports = router;

const Router = require("express").Router;
const router = new Router();
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const modelsCars = require("../initalData/carsModels.js");

async () => {};
const carsList = [
  "audi",
  "bmw",
  "honda",
  "hyundai",
  "kia",
  "land-rover",
  "lexus",
  "mercedes-benz",
  "ssangyong",
  "subaru",
  "toyota",
  "volkswagen",
  "changan",
  "chery",
  "geely",
  "exeed",
];

router.get("/cars", async (req, resp, next) => {
  const carsEndpoint = "https://www.mashina.kg/search/";
  const allCars = [];
  try {
    const getHtml = async (url) => {
      console.log("URL", url);
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      await page.waitForSelector("optgroup#popular");

      const htmlContent = await page.content();
      return cheerio.load(htmlContent);
    };

    for (let i = 0; i < carsList.length; i++) {
      console.log(`Send request ${i + 1} / ${carsList.length}...`);

      const getModels = async () => {
        const models = [];
        const $ = await getHtml(carsEndpoint + carsList[i]);
        // const currentCarData = modelsCars.find(({slug}) => slug === carsList[i])

        const optionst = $(".model-block select #popular option").length
          ? $(".model-block select #popular option")
          : $(".model-block select #all option");

        optionst.each((i, elem) => {
          const text = $(elem).text();
          const value = $(elem).attr("value");
          models.push({ text: text, value: value });
        });
        return models;
      };

      allCars.push({
        [carsList[i]]: await getModels(),
      });
    }
    console.log("allCars", allCars);
    resp.send(allCars);
    // const result = await getHtml();

    // resp.send(result(".model-block select #popular").html());
  } catch (error) {
    resp.send(error);
  }

  next();
});

module.exports = router;
