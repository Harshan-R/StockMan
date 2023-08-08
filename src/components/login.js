import { GoogleLogin } from "react-google-login";
const clientId =
  "738605017541-9av8lp92r44kuhv55dkq89qfo4497hmh.apps.googleusercontent.com";

function LoginButton(props) {
  const onSuccess = (res) => {
    console.log(JSON.stringify(res.profileObj));
    props.func(res.profileObj);
    localStorage.setItem("user", JSON.stringify(res.profileObj));
    fetch("http://localhost:8001/user/new_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name: res.profileObj.googleId }),
    })
      .then((x) => console.log(x))
      .catch((x) => console.log(x));
  };
  const onFailure = (res) => {
    console.log("Login Failed! res: ", res);
    console.log(res);
  };
  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttontext="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiepolicy={"single_host_orgin"}
        isSignedIn={true}
      />
    </div>
  );
}
export default LoginButton;
