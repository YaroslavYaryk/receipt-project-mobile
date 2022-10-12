import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";
import { HOST, PORT } from "../../constants/server";

LogBox.ignoreLogs(["Setting a timer"]);

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (token, email, expiryTime) => {
   return (dispatch) => {
      dispatch(setLogoutTimer(expiryTime));
      dispatch({ type: AUTHENTICATE, token: token, userId: email });
   };
};

export const signUp = (email, name, password) => {
   return async (dispatch) => {
      const response = await fetch(`${HOST}:${PORT}/users/api/auth/register/`, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
         },
         body: JSON.stringify({
            email: email,
            name: name,
            password: password,
         }),
      });
      if (!response.ok) {
         const errorResData = await response.json();
         let message = "Something went wrong!";
         if (
            errorResData.message == "UNIQUE constraint failed: users_user.email"
         ) {
            message = "This email already exists";
         }

         throw new Error(message);
      }
      const resData = await response.json();
      dispatch(authenticate(resData.token, resData.user_id, 1800 * 100000));
      const expirationDate = new Date(new Date().getTime() + 1800 * 100000);
      saveDataToStorage(resData.token, resData.user_id, expirationDate);
   };
};

export const login = (email, password) => {
   return async (dispatch) => {
      const response = await fetch(`${HOST}:${PORT}/users/api/auth/login/`, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
         },
         body: JSON.stringify({
            email: email,
            password: password,
         }),
      });
      if (!response.ok) {
         var message;
         try {
            const errorResData = await response.text();
            message = JSON.parse(errorResData).message;
         } catch (error) {
            message = "Something went wrong!";
         }
         throw new Error(message);
      }
      const resData = await response.json();
      dispatch(authenticate(resData.token, resData.user_id, 1800 * 100000));
      const expirationDate = new Date(new Date().getTime() + 1800 * 100000);
      saveDataToStorage(resData.token, resData.user_id, expirationDate);
   };
};

export const resetPasswordEmail = (email) => {
   return async (dispatch) => {
      const response = await fetch(
         `${HOST}:${PORT}/users/api/password_reset/`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
               email: email,
            }),
         }
      );
      if (!response.ok) {
         const errorResData = await response.json();
         throw new Error(errorResData.message);
         // work here
      }
   };
};

export const resetPasswordConfirm = (token, password) => {
   return async (dispatch) => {
      console.log(token, password, "here");
      const response = await fetch(
         `${HOST}:${PORT}/users/api/password_reset/confirm/`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
               token: token,
               password: password,
            }),
         }
      );
      if (!response.ok) {
         const errorResData = await response.json();
         console.log(errorResData);
         var message = "";
         for (var key in errorResData) {
            //key will be -> 'id'
            //dictionary[key] -> 'value'
            message += errorResData[key] + "\n";
         }
         throw new Error(message);
         // work here
      }
   };
};

export const logout = () => {
   clearLogoutTimer();
   AsyncStorage.removeItem("userData");
   return { type: LOGOUT };
};

const clearLogoutTimer = () => {
   if (timer) {
      clearTimeout(timer);
   }
};

const setLogoutTimer = (expirationTime) => {
   return (dispatch) => {
      timer = setTimeout(() => {
         dispatch(logout());
      }, expirationTime);
   };
};

const saveDataToStorage = (token, email, expirationDate) => {
   AsyncStorage.setItem(
      "userData",
      JSON.stringify({
         token: token,
         userEmail: email,
         expiryDate: expirationDate.toISOString(),
      })
   );
};
