import { useEffect, useState } from "react";
import Header from "../components/Header";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ClearIcon from "@mui/icons-material/Clear";
export default function ManageCars({ carData }) {
  const [cars, setCars] = useState(carData);
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
  function displayCars() {
    if (cars.length != 0) {
      return cars.map((carItem, index) => car(carItem, index));
    } else {
      return <p>No Cars</p>;
    }
  }
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
        <div>{availablityIndicator(car, index)}</div>
      </div>
    );
  }

  function availablityIndicator(car, index) {
    if (car.available) {
      return (
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => handleAvailabilityChange(car, index)}
            className="availableIndicatorTrue"
          ></button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => handleAvailabilityChange(car, index)}
            className="availableIndicatorFalse"
          ></button>
          <ClearIcon onClick={() => handleCarDelete(car)} />
        </div>
      );
    }
  }
  async function handleAvailabilityChange(car, listIndex) {
    //change the status of a car
    let updatedData = car;
    updatedData.available = !car.available;
    const data = await fetch(
      `https://unce5d4pv3.execute-api.us-west-2.amazonaws.com/dev/cars/available/${car.id}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedData),
      }
    )
      .then((res) => res.json())
      .then(() => {
        let temp = [...cars];
        //at listIndex, delete 1 and replace with updatedData
        temp.splice(listIndex, 1, updatedData);
        setCars(temp);
      });
  }
  async function handleCarDelete(car) {
    const data = await fetch(
      `https://unce5d4pv3.execute-api.us-west-2.amazonaws.com/dev/cars/${car.id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        //filter out the removed car after a sucsessful delete
        setCars(cars.filter((item) => item.id != car.id));
      });
  }
  useEffect(() => {
    setCars(cars);
  }, [cars]);

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

export async function getServerSideProps(context) {
  const data = await fetch(
    "https://unce5d4pv3.execute-api.us-west-2.amazonaws.com/dev/cars",
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data.Items;
    });
  return {
    props: { carData: data },
  };
}
