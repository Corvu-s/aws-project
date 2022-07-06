import { useEffect, useState } from "react";
import Header from "../components/Header";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

export default function ManageCars() {
  const [cars, setCars] = useState([]);
  const [numOfCars, setNumOfCars] = useState(0);
  async function getAllCars() {
    const data = fetch(
      "https://unce5d4pv3.execute-api.us-west-2.amazonaws.com/dev/cars",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCars(data.Items);
      });
  }
  useEffect(() => {
    console.log(cars);
  }, [cars]);

  function car(car, index) {
    return (
      <div key={index} className="car flex justify-between ">
        <div>
          {" "}
          <DirectionsCarIcon />
        </div>
        <div className="flex flex-col">
          <p>
            {car.make} {car.model}
          </p>
          <p>Depot:{car.depot}</p>
          <p>Current Location:{car.currentLocation}</p>
        </div>
        <div>
          <button className={availablityIndicator(car)}></button>
        </div>
      </div>
    );
  }
  function displayCars() {
    if (cars.length != 0) {
      console.log("display Cars");
      return cars.map((carItem, index) => car(carItem, index));
    } else {
      return <p>No Cars</p>;
    }
  }
  function availablityIndicator(car) {
    if (car.available) {
      return "availableIndicatorTrue";
    } else {
      return "availableIndicatorFalse";
    }
  }
  return (
    <div className="space-y-2">
      <Header pageName={"Manage_Cars"} />
      <div className="flex justify-center space-y-2 searchBar">
        <button onClick={() => getAllCars()} className="searchBarButton">
          Get All Cars
        </button>
      </div>
      <div className="flex justify-center flex-col space-y-2">
        {displayCars()}
      </div>
    </div>
  );
}
