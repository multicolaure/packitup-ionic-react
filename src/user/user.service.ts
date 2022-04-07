import { User as FirebaseUser } from 'firebase/auth';
import { User } from './user';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export type unsubscribe = () => void;

export function onUserAuthenticationChange(callback: (user: User | undefined) => void): unsubscribe {
    const auth = getAuth();
    return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        callback(mapUser(firebaseUser));
    });
}


export function mapUser(user: FirebaseUser | null | undefined): User | undefined {
    if(!user) {
        return undefined;
    }
    return {
        uid: user.uid,
        username: user.displayName ?? user.email ?? user.uid,
        photoUrl: user.photoURL ?? undefined,
    };
}