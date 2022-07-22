import { getDoc } from "firebase/firestore";
import { errorInstance } from "../../utils/handleError";
import { promiseWrapper } from "../../utils/promiseWrapper";
import { getDocData, userDocRef } from "./setup";

export const fetchUserData = promiseWrapper(async (userId: string) => {
    const response = await getDoc(userDocRef(userId));
    if (response.exists()) {
        return getDocData(response);
    }
    throw errorInstance("No user found!");
});
