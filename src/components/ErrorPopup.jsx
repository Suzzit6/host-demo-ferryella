import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

function ErrorPopup(props) {
  const [show, setShow] = useState(false);


  useEffect(() => {

    if (props.error) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 7000);

      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [props.error]);

  if (show && props.error) {
    return (
      <Alert className="Screen-error"  variant="danger" onClose={() => setShow(false)} dismissible>
        <h6  >{props.error}</h6>
      </Alert>
    );
  }
  return null;
}

export default ErrorPopup;
