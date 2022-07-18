import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Alerts from "./Alerts";
import { useRouter } from "next/dist/client/router";
export default function ImageCarousel({ alerts }) {
  //service outage image
  //welcome image
  //learn about EVs

  const router = useRouter();

  return (
    <div className="flex space-x-2 space-y-3 flex-wrap justify-center">
      <div className="altBackground w-full ">
        <p className="text-lg font-bold">Outages and Statuses</p>
        <Alerts alerts={alerts} />
      </div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showArrows={true}
        interval={5000}
        className=" bookingForm "
      >
        <div>
          <img src="/placeholder.png" />

          <div className="legend">
            <button className="carouselButton">Learn</button>
          </div>
        </div>
        <div>
          <img src="/ev.jpg" />

          <div className="legend">
            <button className="carouselButton">Learn about our EVs!</button>
          </div>
        </div>
        <div>
          <img src="/transit.jpg" />
          <div className="legend flex justify-center space-x-3">
            <button className="carouselButton">
              Learn about our transit solution!
            </button>
            <button
              onClick={() => router.push("/Booking")}
              className="carouselButton"
            >
              Book a car!
            </button>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
