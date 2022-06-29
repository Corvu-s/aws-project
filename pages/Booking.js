import Button from "@mui/material/Button";
export default function Booking() {
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
    id: "kadsbfasdfkajdf",
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
    <div>
      <p>Booking Page</p>
      {test()}
    </div>
  );
}
