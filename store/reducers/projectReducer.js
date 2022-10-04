import PROJECTS from "../../data/projects";
import PROJECT_REPORTS from "../../data/projectReports";
import {
   ADD_PROJECT,
   DELETE_PROJECT,
   EDIT_PROJECT,
} from "../actions/projectActions";

const initialState = {
   projects: PROJECTS,
   projectReports: PROJECT_REPORTS,
};

const projectReducer = (state = initialState, action) => {
   switch (action.type) {
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
         oldProject[projIndex] = oldProject;
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
   }
   return state;
};

export default projectReducer;
