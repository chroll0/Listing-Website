const axios = require("axios");
const fs = require("fs");
require("dotenv").config({ path: ".env.local" });

const API_TOKEN = process.env.API_TOKEN;
const API_URL = process.env.API_URL_REGIONS;
axios
  .get(API_URL, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  })
  .then((response: any) => {
    // Save response data to data.json
    const data = response.data;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err: any) => {
      if (err) {
        console.error("Error saving the file", err);
      } else {
        console.log(data);
        console.log("Data saved to data.json");
      }
    });
  })
  .catch((error: any) => {
    console.error("Error fetching data:", error);
  });
