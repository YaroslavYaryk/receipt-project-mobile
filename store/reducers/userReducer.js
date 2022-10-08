import { READ_USER } from "../actions/userActions";
const initialState = {
   user: {},
};

export default (state = initialState, action) => {
   switch (action.type) {
      case READ_USER:
         return {
            ...state,
            user: action.user,
         };
      //       case LOGOUT:
      //          return initialState;

      default:
         return state;
   }
};
