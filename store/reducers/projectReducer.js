import PROJECTS from "../../data/projects";
import PROJECT_REPORTS from "../../data/projectReports";

const initialState = {
   projects: PROJECTS,
   projectReports: PROJECT_REPORTS,
};

const projectReducer = (state = initialState, action) => {
   return state;
};

export default projectReducer;
