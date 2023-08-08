import {GoogleLogout} from 'react-google-login';
const clientId = "738605017541-9av8lp92r44kuhv55dkq89qfo4497hmh.apps.googleusercontent.com";

function LogoutButton(props){
    const onSuccess= () => {
        localStorage.setItem('user', null);
        if(window.location.href.split("/").length !== 4){
            window.location.reload();
        }
       props.func({});
    }

    return (
        <div id="signOutButton">
            <GoogleLogout
                cllientId={clientId}
                buttontext={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )

}
export default LogoutButton;