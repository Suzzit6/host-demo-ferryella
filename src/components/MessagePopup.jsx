import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

function MsgPopup(props) {

  const [show, setShow] = useState(false);

  
  useEffect(() => {

    if (props.msg) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 7000);

      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [props.msg]);

  if (show && props.msg) {
    return (
      <Alert className="Screen-error"  variant="success"  onClose={() => setShow(false)} dismissible>
        <h6  >{props.msg}</h6>
      </Alert>
    );
  }
  return null;
}

export default MsgPopup;
