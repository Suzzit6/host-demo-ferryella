import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export function GoogleOAuth() {
  const handleGoogleSignup = async (credentialResponse) => {
    try {
      console.log(credentialResponse.credential);
      const res = await axios.post("http://localhost:5500/google-auth", {
        credential: credentialResponse.credential,
      });
      console.log(res);
      reloadAndNavigate("/");
      setMessage("User registered successfully");
    } catch (error) {
      console.log("error in react " + error);
    //   return seterror("Error");
      return
    }
  };
  const reloadAndNavigate = (path) => {
    window.location.href = path;
  };

  const handleGoogleFailure = (error) => {
    console.log(error);
    // return seterror("Something went wrong please try again");
    return
  };

//   const login = useGoogleLogin({
//     onSuccess: handleGoogleSignup,
//     onError: handleGoogleFailure,
//     uxMode: "popup",
//   });

  return (
    <GoogleLogin
      onSuccess={handleGoogleSignup}
      onError={handleGoogleFailure}
      uxMode="popup"
      useOneTap
    />
  );
}
