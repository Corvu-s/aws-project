export default function Header({ pageName }) {
  return (
    <div className="flex space-x-2 justify-center">
      <div className="bookingButton flex justify-center">
        <button className="headerModeText">{pageName}</button>
      </div>
      <div className="headerBackButton flex justify-center">
        <button className="headerBackText">Back</button>
      </div>
    </div>
  );
}
