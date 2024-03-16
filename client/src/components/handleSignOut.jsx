import {
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure,
  } from "../redux/user/userSlice";
  import { useDispatch } from "react-redux";


// The Component is created to handle the sign out of the user, which can be called a multiple places in the application
const SignOut = () => {
    const dispatch = useDispatch();
  
    const handleSignOut = async () => {
        try {
        dispatch(signOutUserStart());
        const res = await fetch('/api/auth/signout');
        const data = await res.json();
        if (data.success === false) {
            dispatch(signOutUserFailure(data.message));
            return;
        }
        dispatch(signOutUserSuccess(data));
        } catch (err) {
        dispatch(signOutUserFailure(err.message));
        }
    }

    return (
        <div onClick={handleSignOut}>
        <span className="cursor-pointer hover:underline">
            Sign Out
        </span>
        </div>
    );
    };


export default SignOut;