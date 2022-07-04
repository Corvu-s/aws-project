export default function SubmitButton(props) {
  //component that
  return (
    <div className="flex flex-row-reverse">
      <button onClick={() => props.method()} className="submitButton ">
        {props.buttonName}
      </button>
    </div>
  );
}
