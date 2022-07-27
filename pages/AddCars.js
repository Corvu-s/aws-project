import Header from "../components/Header";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import makeid from "../utilities/makeid";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import ImageCarousel from "../components/ImageCarousel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
export default function AddCars({ alertData }) {
  const [depot, setDepot] = useState("");
  const [available, setAvailable] = useState(false);
  const [status, setStatus] = useState("");
  const [carSelection, setCarSelection] = useState("");
  const [carSelectionID, setCarSelectionID] = useState("");

  const cars = [
    { id: 1, make: "Tesla", model: "Model Y" },
    { id: 2, make: "Nissan", model: "Leaf" },
    { id: 3, make: "Rivian", model: "R1T" },
    { id: 4, make: "Lucid", model: "Air" },
  ];
  function cleanForm() {
    setAvailable(false);
    setMake("");
    setDepot("");
    setModel("");
    setStatus("");
  }
  function handleCarChange(e) {
    setCarSelection(e.target.value);
  }
  function addCar() {
    const data = {
      id: makeid(10),
      createdAt: Date.now(),
      make: cars[carSelectionID].make,
      model: cars[carSelectionID].model,
      depot: depot,
      currentLocation: depot,
      available: available,
      status: status,
    };
    putCar(data);
    // console.log("Booking data");
    // console.log(data);
  }
  async function putCar(carData) {
    const data = fetch(
      "https://unce5d4pv3.execute-api.us-west-2.amazonaws.com/dev/cars",
      { method: "PUT", body: JSON.stringify(carData) }
    )
      .then((res) => res.json())
      .then((result) => cleanForm());
  }
  function carForm() {
    return (
      <div className="flex justify-center space-y-2 ">
        <Box
          className="flex flex-col space-y-2 px-10 py-10 bookingForm"
          component="form"
          noValidate
          autoComplete="off"
        >
          <h2 className="text-lg font-bold">Add a Car</h2>
          <TextField
            id="outlined-basic"
            label="Depot"
            variant="outlined"
            value={depot}
            onChange={(e) => setDepot(e.target.value)}
          />
          <p>Select Car Type</p>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={carSelection}
            label="Car"
            onChange={handleCarChange}
          >
            {cars.map((car, index) => (
              <MenuItem
                key={index}
                value={car.make + " " + car.model}
                onClick={() => setCarSelectionID(index)}
              >
                {car.make + " " + car.model}
              </MenuItem>
            ))}
          </Select>
          {/* <TextField
            id="outlined-basic"
            label="Status"
            variant="outlined"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          /> */}
          <TextareaAutosize
            value={status}
            minRows={3}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Status"
          />

          <FormControlLabel
            control={
              <Switch
                checked={available}
                onChange={(event) => setAvailable(event.target.checked)}
              />
            }
            label="Available"
          />
        </Box>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <Header pageName={"Add_Cars"} />
      {carForm()}
      <SubmitButton buttonName={"Add Car"} method={addCar} />
      <ImageCarousel alerts={alertData} />
    </div>
  );
}
export async function getServerSideProps(context) {
  //get the most up do date alert data from the db
  const data = await fetch(
    "https://unce5d4pv3.execute-api.us-west-2.amazonaws.com/dev/alerts",
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log("Alerts");
      // console.log(data);

      return data.Items;
    });
  return {
    props: { alertData: data },
  };
}
