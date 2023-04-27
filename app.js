const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/price", async(req, res) => {
   try {
     const url = `https://www.metal.com/Lithium-ion-Battery/202303240001`;
     const response = await axios.get(url);
     
     const $ = cheerio.load(response.data);
    
     const priceDownText = $(
       "#__next > div > div.main___1ft3R.detail___2oeiJ > div.left___wCEQV > div:nth-child(3) > div.metalsContent___3T_m3 > div.priceContent___3lf_D > div > div:nth-child(1) > span.strong___1JlBD.priceDown___2TbRQ"
     ).text();
      
      res.status(200).send({ price: priceDownText });
   } catch (error) {
    console.error("Error fetching price", error.message);
    res.status(404).send({ message: "Not found"});
  }
});


const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);