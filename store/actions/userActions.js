import { HOST, PORT } from "../../constants/server";

import User from "../../models/User";
export const READ_USER = "READ_USER";
export const EDIT_USER = "EDIT_USER";

export const fetchUser = () => {
   try {
      return async (dispatch, getState) => {
         var token = getState().auth.token;

         const response = await fetch(
            `${HOST}:${PORT}/users/api/user_profile/`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "multipart/form-data",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Token ${token}`,
               },
            }
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();

         const user = new User(
            resData.id,
            resData.email,
            resData.name,
            resData.phone,
            resData.city,
            resData.address,
            resData.postal_code,
            resData.birthdate,
            resData.account_number
         );

         dispatch({
            type: READ_USER,
            user: user,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const editUser = (
   email,
   name,
   phone,
   city,
   address,
   postalCode,
   date,
   accountNumber
) => {
   return async (dispatch, getState) => {
      var token = getState().auth.token;
      const response = await fetch(`${HOST}:${PORT}/users/api/user_profile/`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Token ${token}`,
         },
         body: JSON.stringify({
            email: email,
            name: name,
            phone: phone,
            city: city,
            address: address,
            postal_code: postalCode,
            date: date,
            account_number: accountNumber,
         }),
      });

      if (!response.ok) {
         const errorResData = await response.json();
         throw new Error(errorResData.message);
         // work here
      }

      const resData = await response.json();

      const user = new User(
         resData.id,
         resData.email,
         resData.name,
         resData.phone,
         resData.city,
         resData.address,
         resData.postal_code,
         resData.birthdate,
         resData.account_number
      );

      dispatch({
         type: READ_USER,
         user: user,
      });
   };
};
