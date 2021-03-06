import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import ImageCarousel from "../components/ImageCarousel";
import Switch from "@mui/material/Switch";
import Header from "../components/Header";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import makeid from "../utilities/makeid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Auth } from "aws-amplify";
import Map from "../components/Map";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
export default function Booking({ carData, alertData }) {
  const [DepartureAddress, setDepartureAddress] = useState("");
  const [DestinationAddress, setDestinationAddress] = useState("");
  const [Phone, setPhone] = useState("");
  const [Name, setName] = useState("");
  const [PassengerCount, setPassengerCount] = useState("");
  const [autoSelect, setAutoSelect] = useState(true);

  //car selection from the dropdown list
  const [carSelectionID, setCarSelectionID] = useState("");
  const [carList, setCarList] = useState(carData);

  const [DepartureTime, setDepartureTime] = useState(new Date());

  const [showMap, setShowMap] = useState(false);
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
      <div className="flex justify-center space-y-2 ">
        <Box
          className="flex flex-col space-y-2 px-10 py-10 bookingForm"
          component="form"
          noValidate
          autoComplete="off"
        >
          <h2 className="text-lg font-bold">Book a Car</h2>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticTimePicker
              displayStaticWrapperAs="mobile"
              value={DepartureTime}
              onChange={(newValue) => {
                setDepartureTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <TextField
            id="outlined-basic"
            label="Departure Address"
            variant="outlined"
            value={DepartureAddress}
            onChange={(e) => setDepartureAddress(e.target.value)}
            onClick={() => console.log("Cjkasndf")}
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
        <div></div>
      </div>
    );
  }
  function displayMap(addressType) {
    return <Map />;
  }
  function handleCarChange(e) {
    setCarSelectionID(e.target.value);
  }
  function selectCar() {
    //ensures that you get a unique car in the selection. Phase out when switch to MySql is done
    const filteredCars = [];
    carList.map((car) => {
      if (!filteredCars.includes(car.model)) {
        filteredCars.push(car.model);
      }
    });

    if (!autoSelect) {
      return (
        <>
          <p>Select Car</p>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={carSelectionID}
            label="Car"
            onChange={handleCarChange}
          >
            {filteredCars.map((car, index) => (
              <MenuItem key={index} value={car}>
                {car}
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
      carModel: carSelectionID,
      urgent: false,
    };
    PutBooking(data);
    // console.log("Booking data");
    // console.log(data);
  }

  async function PutBooking(bookingData) {
    const data = fetch(
      "https://unce5d4pv3.execute-api.us-west-2.amazonaws.com/dev/bookings",
      { method: "PUT", body: JSON.stringify(bookingData) }
    )
      .then((res) => res.json())
      .then((result) => cleanForm());
  }

  return (
    <div className="space-y-2">
      <Header pageName={"Booking"} />
      <div className="flex">
        {" "}
        {bookingForm()}
        {displayMap()}
      </div>

      <SubmitButton buttonName={"Book Car"} method={bookCar} />
      <ImageCarousel alerts={alertData} />
    </div>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export async function getServerSideProps(context) {
  const alerts = await fetch(
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
    props: { carData: data, alertData: alerts },
  };
}
