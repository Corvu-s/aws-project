import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Header from "../components/Header";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import makeid from "../utilities/makeid";
export default function Booking() {
  const [DepartureTime, setDepartureTime] = useState("");
  const [DepartureAddress, setDepartureAddress] = useState("");
  const [DestinationAddress, setDestinationAddress] = useState("");
  const [Phone, setPhone] = useState("");
  const [Name, setName] = useState("");
  const [PassengerCount, setPassengerCount] = useState("");
  const [autoSelect, setAutoSelect] = useState(true);

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
  function test() {
    return (
      <div>
        <Button onClick={() => testGetBooking()} variant="text">
          Test GET
        </Button>
      </div>
    );
  }
  const dummyCars = {
    id: "adfasdfads",
    make: "test",
    model: "test",
    depot: "test",
    currentLocation: "test",
    available: "test",
    status: "test",
  };
  const dummy = {
    id: "FirstProdTest",
    createdAt: "12",
    departureTime: "12PM",
    departureLocation: "123 sant anna road",
    destinationLocation: "456 adfhab",
    customerName: "Jim",
    passengerCount: "1",
    customerPhoneNumber: 903453425,
    autoSelectCar: true,
    carModel: "Nissan Leaf",
    urgent: false,
  };
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,PUT,DELETE,GET",
  };

  async function testGetBooking() {
    const data = fetch(
      "https://unce5d4pv3.execute-api.us-west-2.amazonaws.com/dev/bookings",
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
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
      {test()}
      {bookingForm()}
      <SubmitButton buttonName={"Book Car"} method={bookCar} />
    </div>
  );
}
