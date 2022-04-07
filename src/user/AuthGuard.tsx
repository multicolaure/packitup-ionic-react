import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginScreen from "./login/LoginScreen";
import { User } from "./user";
import { onUserAuthenticationChange } from "./user.service";
import { selectIsAuthenticated, sessionExpire } from "./user.slice";

export type AuthGuardProps = {
    children: JSX.Element | null
}

const AuthGuard = (props: AuthGuardProps) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onUserAuthenticationChange((user?: User) => {
            if(!user) {
                dispatch(sessionExpire());
            }
        })

        return () => {
            unsubscribe();
        };
    }, [isAuthenticated]);

    if(isAuthenticated) {
        return props.children;
    }
    else {
        return (<LoginScreen></LoginScreen>);
    }
}

export default AuthGuard;