const express = require("express")
const app = express()
const port = 4000;
const cars = require("./cars")

app.get("/", (req, res) => {
  res.send("Hello! Car API")
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

// list all job
app.get("/cars", (req, res) => {
  res.send(cars)
})

// get a specific car
app.get("/cars/:id", (req, res) => {
  const carId = parseInt(req.params.id, 10)
  const car = cars.find((car) => cars.id === carId);
  res.send(car);
})

// create a new car
app.post("/cars", (req, res) => {

})

// update a specific car
app.patch("/cars/:id", (req, res) => {

})

// delete a specific car
app.delete("/cars/:id", (req, res) => {

})