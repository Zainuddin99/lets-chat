import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { serverTimestamp, setDoc } from "firebase/firestore";
import { promiseWrapper } from "../utils/promiseWrapper";
import { userDocRef } from "./Database/setup";
import { firebaseApp } from "./setup";

export const firebaseAuth = getAuth(firebaseApp);

export const createUser = promiseWrapper(
    async (
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) => {
        //Add to auth
        const createdUser = await createUserWithEmailAndPassword(
            firebaseAuth,
            email,
            password
        );
        //Add to separate collection main details to fetch user data
        //Add same id from auth to it using set doc else it will create new doc with own id in addDoc
        await setDoc(userDocRef(createdUser.user.uid), {
            email,
            firstName,
            lastName,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return createdUser;
    }
);

export const signInUser = promiseWrapper(
    async (email: string, password: string) => {
        const user = await signInWithEmailAndPassword(
            firebaseAuth,
            email,
            password
        );
        return user;
    }
);

export const signoutUser = () => {
    signOut(firebaseAuth);
};
