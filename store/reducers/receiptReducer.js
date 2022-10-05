import RECEIPTS from "../../data/receipts";
import { DELETE_RECEIPT } from "../actions/receiptActions";
import CATEGORIES from "../../data/categories";

const initialState = {
   receipts: RECEIPTS,
   categories: CATEGORIES,
};

const receiptReducer = (state = initialState, action) => {
   switch (action.type) {
      // case ADD_PROJECT:
      //    var new_project = {
      //       id: action.id,
      //       name: action.name,
      //    };
      //    return {
      //       ...state,
      //       projects: state.projects.concat(new_project),
      //    };

      // case EDIT_PROJECT:
      //    var { id, name } = action;
      //    var oldProjects = [...state.projects];
      //    var projIndex = oldProjects.findIndex((elem) => (elem.id = id));
      //    var oldProject = oldProjects[projIndex];
      //    oldProject.name = name;
      //    oldProject[projIndex] = oldProject;
      //    // oldProjects.map((el) => (el.height = 0));
      //    return {
      //       ...state,
      //       projects: oldProjects,
      //    };
      case DELETE_RECEIPT:
         return {
            ...state,
            receipts: state.receipts.filter((obj) => obj.id != action.id),
         };
   }
   return state;
};

export default receiptReducer;
