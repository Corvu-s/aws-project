import Chart from "chart.js/auto"; //need this import for regsitering the chart components

import { Doughnut } from "react-chartjs-2";
export default function Analytics({ carData }) {
  //console.log(carData);

  function generateAvailabilityGraphData() {
    /*function that generates the data for a donut chart. This chart shows the breakdown between available and
    unavailable cars.
    */
    const DATA_COUNT = carData.length;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

    let availableCount = 0;
    let unnavailableCount = 0;
    carData.map((car) => {
      if (car.available == true) {
        availableCount++;
      } else {
        unnavailableCount++;
      }
    });
    const data = {
      labels: ["Available", "Unnavailable"],
      datasets: [
        {
          label: "Dataset 1",
          data: [availableCount, unnavailableCount],
          backgroundColor: ["rgb(0, 255, 0)", "rgb(255, 0, 0)"],
        },
      ],
    };

    return data;
  }

  return (
    <div className="flex  flex-col">
      <button>get Stats</button>

      <div className=" w-1/2">
        <Doughnut
          data={generateAvailabilityGraphData()}
          height={20}
          width={20}
        />
      </div>
      <div className="w-1/2">
        <Doughnut
          data={generateAvailabilityGraphData()}
          height={20}
          width={20}
        />
      </div>
    </div>
  );
}
