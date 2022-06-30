import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Header from "../components/Header";
export default function Booking() {
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
          />
          <TextField
            id="outlined-basic"
            label="Departure Address"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Destination Address"
            variant="outlined"
          />
          <TextField id="outlined-basic" label="Phone#" variant="outlined" />
          <TextField id="outlined-basic" label="Name" variant="outlined" />
          <TextField
            id="outlined-basic"
            label="Passenger Count"
            variant="outlined"
          />
          <p>test</p>
        </Box>
      </div>
    );
  }
  function test() {
    return (
      <div>
        <Button onClick={() => testGetBooking()} variant="text">
          Test GET
        </Button>
        <Button onClick={() => testPutBooking()} variant="text">
          Test POST
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

  async function testGetBooking() {
    const data = fetch(
      "https://unce5d4pv3.execute-api.us-west-2.amazonaws.com/dev/bookings",
      { method: "GET" }
    ).then((res) => {
      return res.json();
    });
    console.log(data);
  }

  async function testPutBooking() {
    const data = fetch(
      "https://unce5d4pv3.execute-api.us-west-2.amazonaws.com/dev/bookings",
      { method: "PUT", body: JSON.stringify(dummy) }
    ).then((res) => {
      return res.json();
    });
    console.log(data);
  }

  return (
    <div className="space-y-2">
      <Header pageName={"Bookings"} />
      {test()}
      {bookingForm()}
      <div className="flex flex-row-reverse">
        <button className="bookCarButton ">Book Car</button>
      </div>
    </div>
  );
}
