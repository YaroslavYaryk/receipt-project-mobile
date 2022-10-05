export const READ_PROJECT = "READ_PROJECT";
export const ADD_PROJECT = "ADD_PROJECT";
export const EDIT_PROJECT = "EDIT_PROJECT";
export const DELETE_RECEIPT = "DELETE_RECEIPT";

// // export const fetchOrders = () => {
// //     try {
// //         return async (dispatch, getState) => {
// //             const userId = getState().auth.userId;
// //             const response = await fetch(
// //                 `https://web-store-app-d2355-default-rtdb.firebaseio.com/orders/${userId}.json`
// //             );

// //             if (!response.ok) {
// //                 throw new Error("Something went wrong!");
// //             }

// //             const resData = await response.json();
// //             const loadedOrders = [];
// //             for (const key in resData) {
// //                 loadedOrders.push(
// //                     new Order(
// //                         key,
// //                         resData[key].cartItems,
// //                         resData[key].totalAmount,
// //                         new Date(resData[key].date)
// //                     )
// //                 );
// //             }

// //             dispatch({
// //                 type: READ_ORDER,
// //                 orders: loadedOrders,
// //             });
// //         };
// //     } catch (err) {
// //         throw err;
// //     }
// // };

// export const add_project = (name) => {
//    return async (dispatch, getState) => {
//       // const response = await fetch(
//       //     `https://web-store-app-d2355-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
//       //     {
//       //         method: "POST",
//       //         headers: {
//       //             "Content-Type": "application/json",
//       //         },
//       //         body: JSON.stringify({
//       //             cartItems,
//       //             totalAmount,
//       //             date: date.toISOString(),
//       //         }),
//       //     }
//       // );

//       // if (!response.ok) {
//       //     throw new Error("Something went wrong");
//       // }
//       dispatch({
//          type: ADD_PROJECT,
//          id: Math.random(),
//          name: name,
//       });
//    };
// };

// export const editProject = (id, name) => {
//    return async (dispatch, getState) => {
//       // const response = await fetch(
//       //     `https://web-store-app-d2355-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
//       //     {
//       //         method: "POST",
//       //         headers: {
//       //             "Content-Type": "application/json",
//       //         },
//       //         body: JSON.stringify({
//       //             cartItems,
//       //             totalAmount,
//       //             date: date.toISOString(),
//       //         }),
//       //     }
//       // );

//       // if (!response.ok) {
//       //     throw new Error("Something went wrong");
//       // }
//       dispatch({
//          type: EDIT_PROJECT,
//          id: id,
//          name: name,
//       });
//    };
// };

export const deleteReceipt = (id) => {
   return async (dispatch, getState) => {
      //   const token = getState().auth.token;
      //   const userId = getState().auth.userId;

      //   const response = await fetch(
      //       `https://web-store-app-d2355-default-rtdb.firebaseio.com/orders/${userId}/${orderId}.json?auth=${token}`,
      //       {
      //           method: "DELETE",
      //       }
      //   );

      //   if (!response.ok) {
      //       throw new Error("Something went wrong");
      //   }
      dispatch({
         type: DELETE_RECEIPT,
         id: id,
      });
   };
};
