const express = require("express")
const app = express()
const port = 4000;
const cars = require("./cars")

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`)
  next();
})

app.use(express.json()) 

function getNextIdFromCollection(collection) {
  if (collection.length === 0) return 1;
  const lastRecord = collection[collection.length - 1];
  return lastRecord.id + 1;
}

app.post("/cars", (req, res) => {
  const newCar = {
    ...req.body,
    id: getNextIdFromCollection(cars)
  };
  console.log(newCar, "newCar")
  cars.push(newCar)
  res.send(newCar)
})

app.get("/", (req, res) => {
  res.send("Hello! Car API")
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

// list all car
app.get("/cars", (req, res) => {
  res.send(cars)
})

// get a specific car
app.get("/cars/:id", (req, res) => {
  const carId = parseInt(req.params.id, 10)
  const car = cars.find((car) => car.id === carId);
  res.send(car);
})

// create a new car
app.post("/cars", (req, res) => {
  const newCar = req.body;
  console.log("newCar", newCar)
  cars.push(newCar);
  res.send(newCar);
})

// update a specific car
app.patch("/cars/:id", (req, res) => {
  const carId = parseInt(req.params.id, 10);
  const carUpdates = req.body;
  const carIndex = cars.findIndex(car => car.id === carId);
  const updatedCar = { ...cars[carIndex], ...carUpdates };
  cars[carIndex] = updatedCar;
  console.log("updatedCar", updatedCar)
  res.send(updatedCar);

})

// delete a specific car
app.delete("/cars/:id", (req, res) => {

})