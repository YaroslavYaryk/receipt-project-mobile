import { HOST, PORT } from "../../constants/server";
import ProjectReport from "../../models/ProjectReport";
export const READ_PRODUCTS = "READ_PRODUCTS";
export const ADD_PROJECT = "ADD_PROJECT";
export const EDIT_PROJECT = "EDIT_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const READ_PRODUCT_REPORTS = "READ_PRODUCT_REPORTS";

export const fetchProjects = () => {
   try {
      return async (dispatch, getState) => {
         var token = "7a2b1f9d3ebb40559740156d6d6ae6aca6b0c4c9";

         const response = await fetch(`${HOST}:${PORT}/api/projects/`, {
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

         dispatch({
            type: READ_PRODUCTS,
            projects: resData,
         });
      };
   } catch (err) {
      throw err;
   }
};

export const add_project = (name) => {
   return async (dispatch, getState) => {
      var token = "7a2b1f9d3ebb40559740156d6d6ae6aca6b0c4c9";
      const response = await fetch(`${HOST}:${PORT}/api/project/create/`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Token ${token}`,
         },
         body: JSON.stringify({
            name: name,
         }),
      });

      if (!response.ok) {
         throw new Error("Something went wrong");
      }

      const resData = await response.json();

      dispatch({
         type: ADD_PROJECT,
         id: resData.id,
         name: name,
      });
   };
};

export const editProject = (id, name) => {
   return async (dispatch, getState) => {
      var token = "7a2b1f9d3ebb40559740156d6d6ae6aca6b0c4c9";
      const response = await fetch(
         `${HOST}:${PORT}/api/project/${id}/update/`,
         {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
               Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
               name: name,
            }),
         }
      );

      if (!response.ok) {
         throw new Error("Something went wrong");
      }
      dispatch({
         type: EDIT_PROJECT,
         id: id,
         name: name,
      });
   };
};

export const deleteProject = (id) => {
   return async (dispatch, getState) => {
      var token = "7a2b1f9d3ebb40559740156d6d6ae6aca6b0c4c9";
      const response = await fetch(
         `${HOST}:${PORT}/api/project/${id}/delete/`,
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
         throw new Error("Something went wrong");
      }
      dispatch({
         type: DELETE_PROJECT,
         id: id,
      });
   };
};

export const fetchProjectReports = (project) => {
   try {
      return async (dispatch, getState) => {
         var token = "7a2b1f9d3ebb40559740156d6d6ae6aca6b0c4c9";

         const response = await fetch(
            `${HOST}:${PORT}/api/project_reports/${project}/all/`,
            {
               method: "GET",
               headers: {
                  Authorization: `Token ${token}`,
               },
            }
         );

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const resData = await response.json();
         const loadedReports = [];
         for (const key in resData) {
            loadedReports.push(
               new ProjectReport(
                  resData[key].id,
                  resData[key].project,
                  resData[key].file_document,
                  resData[key].date
               )
            );
         }

         dispatch({
            type: READ_PRODUCT_REPORTS,
            reports: loadedReports,
         });
      };
   } catch (err) {
      throw err;
   }
};
