import { HOST, PORT } from "../../constants/server";
import Receipt from "../../models/Receipt";
export const READ_RECEIPTS = "READ_RECEIPTS";
export const ADD_RECEIPT = "ADD_RECEIPT";
export const EDIT_RECEIPT = "EDIT_RECEIPT";
export const DELETE_RECEIPT = "DELETE_RECEIPT";
export const READ_CATEGORIES = "READ_CATEGORIES";
export const READ_RECEIPT_FILE = "READ_RECEIPT_FILE";

export const fetchReceipts = () => {
   try {
      return async (dispatch, getState) => {
         var token = getState().auth.token;
         const response = await fetch(`${HOST}:${PORT}/api/receipts/`, {
            method: "GET",
            headers: {
               "Content-Type": "multipart/form-data",
               "Access-Control-Allow-Origin": "*",
               Authorization: `Token ${token}`,
            },
         });

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedReceipts = [];
         for (const key in resData) {
            loadedReceipts.push(
               new Receipt(
                  resData[key].id,
                  resData[key].user,
                  resData[key].project,
                  resData[key].project_name,
                  resData[key].category,
                  resData[key].category_name,
                  resData[key].photos,
                  resData[key].company,
                  resData[key].date,
                  resData[key].price,
                  resData[key].description,
                  resData[key].business,
                  resData[key].persons,
                  resData[key].comment,
                  resData[key].file_document
               )
            );
         }

         dispatch({
            type: READ_RECEIPTS,
            receipts: loadedReceipts,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const createReceipt = (
   project,
   category,
   company,
   date,
   price,
   images,
   description,
   business,
   people,
   comment
) => {
   return async (dispatch, getState) => {
      let formdata = new FormData();

      formdata.append("project", project.value);
      formdata.append("project_id", project.id);
      formdata.append("category", category.value);
      formdata.append("category_id", category.id);
      formdata.append("company", company);
      formdata.append("date", date);
      formdata.append("price", price);
      formdata.append("description", description);
      formdata.append("business", business);
      formdata.append("persons", people);
      formdata.append("comment", comment);
      for (let index = 0; index < images.length; index++) {
         formdata.append("photos", {
            uri: images[index],
            name: `image_${Math.random()}.jpg`,
            type: "image/jpeg",
         });
      }
      var token = getState().auth.token;

      const response = await fetch(`${HOST}:${PORT}/api/receipt/create/`, {
         method: "POST",
         headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Token ${token}`,
         },
         body: formdata,
      });

      if (!response.ok) {
         const errorResData = await response.json();
         throw new Error(errorResData.message);
         // work here
      }

      const resData = await response.json();

      const newReceipt = new Receipt(
         resData.id,
         resData.user,
         resData.project,
         resData.project_name,
         resData.category,
         resData.category_name,
         resData.photos,
         resData.company,
         resData.date,
         resData.price,
         resData.description,
         resData.business,
         resData.persons,
         resData.comment,
         resData.file_document
      );

      dispatch({
         type: ADD_RECEIPT,
         newReceipt: newReceipt,
      });
   };
};

export const editReceipt = (
   receiptId,
   project,
   category,
   company,
   date,
   price,
   images,
   description,
   business,
   people,
   comment
) => {
   return async (dispatch, getState) => {
      let formdata = new FormData();

      formdata.append("project", project.value);
      formdata.append("project_id", project.id);
      formdata.append("category", category.value);
      formdata.append("category_id", category.id);
      formdata.append("company", company);
      formdata.append("date", date);
      formdata.append("price", price);
      formdata.append("description", description);
      formdata.append("business", business);
      formdata.append("persons", people);
      formdata.append("comment", comment);
      for (let index = 0; index < images.length; index++) {
         formdata.append("photos", {
            uri: images[index],
            name: `image_${Math.random()}.jpg`,
            type: "image/jpeg",
         });
      }
      var token = getState().auth.token;

      const response = await fetch(
         `${HOST}:${PORT}/api/receipt/update/${receiptId}/`,
         {
            method: "PUT",
            headers: {
               "Content-Type": "multipart/form-data",
               "Access-Control-Allow-Origin": "*",
               Authorization: `Token ${token}`,
            },
            body: formdata,
         }
      );

      if (!response.ok) {
         const errorResData = await response.json();
         throw new Error(errorResData.message);
         // work here
      }

      const resData = await response.json();

      const newReceipt = new Receipt(
         receiptId,
         resData.user,
         resData.project,
         resData.project_name,
         resData.category,
         resData.category_name,
         resData.photos,
         resData.company,
         resData.date,
         resData.price,
         resData.description,
         resData.business,
         resData.persons,
         resData.comment,
         resData.file_document
      );

      dispatch({
         type: EDIT_RECEIPT,
         id: receiptId,
         newReceipt: newReceipt,
      });
   };
};

export const deleteReceipt = (id) => {
   return async (dispatch, getState) => {
      var token = getState().auth.token;
      const response = await fetch(
         `${HOST}:${PORT}/api/receipt/delete/${id}/`,
         {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
               Authorization: `Token ${token}`,
            },
         }
      );

      if (!response.ok) {
         const errorResData = await response.json();
         throw new Error(errorResData.message);
         // work here
      }

      dispatch({
         type: DELETE_RECEIPT,
         id: id,
      });
   };
};

export const fetchCategories = () => {
   try {
      return async (dispatch, getState) => {
         var token = getState().auth.token;

         const response = await fetch(`${HOST}:${PORT}/api/categories/`, {
            method: "GET",
            headers: {
               Authorization: `Token ${token}`,
            },
         });

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();

         dispatch({
            type: READ_CATEGORIES,
            categories: resData,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const fetchReceiptFile = (id) => {
   return async (dispatch, getState) => {
      var token = getState().auth.token;
      const response = await fetch(
         `${HOST}:${PORT}/api/receipt/${id}/report_file/`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
               Authorization: `Token ${token}`,
            },
         }
      );

      if (!response.ok) {
         throw new Error("Something went wrong");
      }

      const resData = await response.json();

      dispatch({
         type: READ_RECEIPT_FILE,
         id: id,
         file: resData.file_document,
      });
   };
};
