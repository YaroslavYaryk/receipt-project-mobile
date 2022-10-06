import PROJECTS from "../../data/projects";
import PROJECT_REPORTS from "../../data/projectReports";
import {
   ADD_PROJECT,
   DELETE_PROJECT,
   EDIT_PROJECT,
   READ_PRODUCTS,
   READ_PRODUCT_REPORTS,
} from "../actions/projectActions";

const initialState = {
   projects: [],
   projectReports: [],
};

const projectReducer = (state = initialState, action) => {
   switch (action.type) {
      case READ_PRODUCTS:
         return {
            ...state,
            projects: action.projects,
         };

      case ADD_PROJECT:
         var new_project = {
            id: action.id,
            name: action.name,
         };
         return {
            ...state,
            projects: state.projects.concat(new_project),
         };

      case EDIT_PROJECT:
         var { id, name } = action;
         var oldProjects = [...state.projects];
         var projIndex = oldProjects.findIndex((elem) => (elem.id = id));
         var oldProject = oldProjects[projIndex];
         oldProject.name = name;
         oldProjects[projIndex] = oldProject;
         // oldProjects.map((el) => (el.height = 0));
         return {
            ...state,
            projects: oldProjects,
         };
      case DELETE_PROJECT:
         return {
            ...state,
            projects: state.projects.filter((obj) => obj.id != action.id),
         };

      case READ_PRODUCT_REPORTS:
         return {
            ...state,
            projectReports: action.reports,
         };
   }
   return state;
};

export default projectReducer;
