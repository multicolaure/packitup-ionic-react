import firebaseApp from '../../firebase.service';
import { mapUser } from "../user.service";
import { AuthCredential, getAuth, signInWithCredential, signInWithEmailAndPassword, signOut, UserCredential } from "firebase/auth";
import { User } from '../user';

type FirebaseLoginError = {
    code: 'auth/invalid-email' | 'auth/user-disabled' | 'auth/user-not-found' | 'auth/wrong-password',
    message?: string,
}

export enum LoginError {
    BAD_USERNAME = 'BAD_USERNAME',
    WRONG_PASSWORD = 'WRONG_PASSWORD',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    OTHER = 'OTHER'
}

export type AuthResponse = {
    type: 'error',
    error: string,
} | {
    type: 'success',
    token?: string,
}

export type CredentialCreator = (token: string | null, ...rest: any) => AuthCredential;

export enum LoginProvider {
    Manual= 'Manual',
    Google= 'Google'
}

export function login(username: string, password: string): Promise<User> {
    const auth = getAuth(firebaseApp);
    return signInWithEmailAndPassword(auth, username, password)
        .then(userCredentials => credentialsToUser(userCredentials, username))
        .catch((error: FirebaseLoginError) => {
            console.error(error)
            const loginError = getLoginErrorFromCode(error);
            return Promise.reject(loginError.toString());
        });
}

export function loginWithAuthResponse(authResponse: AuthResponse, credentialCreator: CredentialCreator) {
    if (authResponse.type === 'error') {
        console.error(authResponse.error);
        return Promise.reject(LoginError.OTHER);
    }
    return loginWithToken(authResponse.token, credentialCreator);
}

export function loginWithToken(token: string | undefined, credentialCreator: CredentialCreator) {
    if (!token) {
        return Promise.reject(LoginError.OTHER);
    }
    const credentials = credentialCreator(token);
    return loginWithCredentials(credentials);
}

export function loginWithCredentials(credential: AuthCredential): Promise<User> {
    const auth = getAuth(firebaseApp);
    return signInWithCredential(auth, credential)
        .then(userCredentials => credentialsToUser(userCredentials))
        .catch((error: FirebaseLoginError) => {
            const loginError = getLoginErrorFromCode(error);
            return Promise.reject(loginError.toString());
        });
}

export function logout() {
    const auth = getAuth(firebaseApp);
    return signOut(auth);
}


function credentialsToUser(userCredential: UserCredential, username = 'unknown'): User {
    if (userCredential.user) {
        return mapUser(userCredential.user) as User;
    }
    return {
        uid: username,
        username: username,
    };
}

function getLoginErrorFromCode(error: FirebaseLoginError): LoginError {
    switch (error.code) {
        case 'auth/invalid-email':
            return LoginError.BAD_USERNAME;
        case 'auth/user-disabled':
        case 'auth/user-not-found':
            return LoginError.USER_NOT_FOUND;
        case 'auth/wrong-password':
            return LoginError.WRONG_PASSWORD;
        default:
            return LoginError.OTHER;
    }
}

