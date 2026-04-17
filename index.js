const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Server listening on port", port);
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// add school endpoint
app.post("/addSchool", (req, res) => {
    let { name, address, latitude, longitude } = req.body;

    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
        return res.send("Invalid input");
    }

    if (typeof latitude !== "number" || typeof longitude !== "number") {
        return res.send("Latitude and Longitude must be numbers");
    }

    let q = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    let values = [name, address, latitude, longitude];

    connection.query(q, values, (error, result) => {
        if (error) {
        console.log(error);
        res.send("Some error in database");
        } else {
        console.log(result);
        res.send("School added successfully");
        }
    });
});

// get schools list endpoint
app.get("/listSchools", (req, res) => {
  let { latitude, longitude } = req.query;

  if (latitude === undefined || longitude === undefined) {
    return res.send("Latitude and Longitude are required");
  }

  latitude = parseFloat(latitude);
  longitude = parseFloat(longitude);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.send("Invalid latitude or longitude");
  }

  let q = "SELECT * FROM schools";

  connection.query(q, (error, result) => {
    if (error) {
      console.log(error);
      res.send("Some error in database");
    } else {
      console.log(result);

      // distance function
      function getDistance(lat1, lon1, lat2, lon2) {
        let R = 6371;
        let dLat = (lat2 - lat1) * Math.PI / 180;
        let dLon = (lon2 - lon1) * Math.PI / 180;

        let a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * Math.PI / 180) *
          Math.cos(lat2 * Math.PI / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      }

      // add distance to each school
      let schoolsWithDistance = result.map((school) => {
        let distance = getDistance(
          latitude,
          longitude,
          school.latitude,
          school.longitude
        );

        return { ...school, distance };
      });

      // sort by distance
      schoolsWithDistance.sort((a, b) => a.distance - b.distance);

      res.send(schoolsWithDistance);
    }
  });
});