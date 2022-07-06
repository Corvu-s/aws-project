import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";

import Switch from "@mui/material/Switch";
import Header from "../components/Header";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import makeid from "../utilities/makeid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
export default function Booking({ carData }) {
  const [DepartureTime, setDepartureTime] = useState("");
  const [DepartureAddress, setDepartureAddress] = useState("");
  const [DestinationAddress, setDestinationAddress] = useState("");
  const [Phone, setPhone] = useState("");
  const [Name, setName] = useState("");
  const [PassengerCount, setPassengerCount] = useState("");
  const [autoSelect, setAutoSelect] = useState(true);

  //car selection from the dropdown list
  const [carSelection, setCarSelection] = useState("");
  const [carList, setCarList] = useState(carData);
  function cleanForm() {
    setDepartureAddress("");
    setDepartureTime("");
    setDestinationAddress("");
    setPhone("");
    setName("");
    setPassengerCount(1);
    setAutoSelect(true);
  }
  function bookingForm() {
    return (
      <div className="flex justify-center space-y-2 bookingForm">
        <Box
          className="flex flex-col space-y-2"
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Departure Time"
            variant="outlined"
            value={DepartureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Departure Address"
            variant="outlined"
            value={DepartureAddress}
            onChange={(e) => setDepartureAddress(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Destination Address"
            variant="outlined"
            value={DestinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Phone#"
            variant="outlined"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Passenger Count"
            variant="outlined"
            type="number"
            value={PassengerCount}
            onChange={(e) => setPassengerCount(e.target.valueAsNumber)}
          />
          {selectCar()}
          <FormControlLabel
            control={
              <Switch
                checked={autoSelect}
                onChange={(event) => setAutoSelect(event.target.checked)}
              />
            }
            label="Autoselect Car"
          />
        </Box>
      </div>
    );
  }
  function handleCarChange(e) {
    setCarSelection(e.target.value);
  }
  function selectCar() {
    if (!autoSelect) {
      return (
        <>
          <p>Select Car</p>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={carSelection}
            label="Age"
            onChange={handleCarChange}
          >
            {carList.map((car, index) => (
              <MenuItem key={index} value={car.model}>
                {car.make}
                {car.model}
              </MenuItem>
            ))}
          </Select>
        </>
      );
    }
  }
  function bookCar() {
    const data = {
      id: makeid(10),
      createdAt: Date.now(),
      departureTime: DepartureTime,
      departureLocation: DepartureAddress,
      destinationLocation: DestinationAddress,
      customerName: Name,
      passengerCount: PassengerCount,
      customerPhoneNumber: Phone,
      autoSelectCar: true,
      carModel: "Nissan Leaf",
      urgent: false,
    };
    PutBooking(data);
    console.log("Booking data");
    console.log(data);
  }

  async function PutBooking(bookingData) {
    const data = fetch(
      "https://unce5d4pv3.execute-api.us-west-2.amazonaws.com/dev/bookings",
      { method: "PUT", body: JSON.stringify(bookingData) }
    )
      .then((res) => res.json())
      .then((result) => console.log(result))
      .then(cleanForm());
  }

  return (
    <div className="space-y-2">
      <Header pageName={"Booking"} />
      {bookingForm()}
      <SubmitButton buttonName={"Book Car"} method={bookCar} />
    </div>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export async function getServerSideProps(context) {
  const data = await fetch(
    "https://unce5d4pv3.execute-api.us-west-2.amazonaws.com/dev/cars",
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);

      return data.Items;
    });
  return {
    props: { carData: data },
  };
}
