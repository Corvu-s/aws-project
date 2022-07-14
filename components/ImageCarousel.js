import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function ImageCarousel() {
  //service outage image
  //welcome image
  //news?
  return (
    <div>
      <Carousel autoPlay={true}>
        <div>
          <img src="/placeholder.png" />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src="/placeholder.png" />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src="/placeholder.png" />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </div>
  );
}
