const axios = require("axios");

exports.placeSearch = async (req, res, next) => {
  try {
    const keyword = req.query.keyword || "restaurant";
    const location = req.query.location || "latitude,longitude";
    const API_KEY = process.env.API_KEY || 8081;

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}&location=${location}&key=${API_KEY}`;

    axios.get(url).then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(500).json({ error: "Something went wrong." });
      });

    res.json({ result });
  } catch (err) {
    next(err);
  }
};
