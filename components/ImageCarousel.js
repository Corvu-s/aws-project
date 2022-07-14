import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Alerts from "./Alerts";
export default function ImageCarousel() {
  //service outage image
  //welcome image
  //learn about EVs
  return (
    <div className="flex space-x-2 flex-wrap">
      <Carousel autoPlay={true} className="w-1/2 bookingForm ">
        <div>
          <img src="/placeholder.png" />

          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src="/ev.jpg" />

          <p className="legend">Learn more about of EV fleet</p>
        </div>
        <div>
          <img src="/transit.jpg" />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
      <div className="altBackground w-1/3 ">
        <p className="text-lg font-bold">Outages and Statuses</p>
        <Alerts />
      </div>
    </div>
  );
}
