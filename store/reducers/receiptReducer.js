import RECEIPTS from "../../data/receipts";
import {
   DELETE_RECEIPT,
   ADD_RECEIPT,
   EDIT_RECEIPT,
   READ_RECEIPTS,
   READ_CATEGORIES,
} from "../actions/receiptActions";
import CATEGORIES from "../../data/categories";

const initialState = {
   receipts: [],
   categories: [],
};

const receiptReducer = (state = initialState, action) => {
   switch (action.type) {
      case READ_RECEIPTS:
         return {
            ...state,
            receipts: action.receipts,
         };

      case ADD_RECEIPT:
         return {
            ...state,
            receipts: state.receipts.concat(action.newReceipt),
         };

      case EDIT_RECEIPT:
         var { id, newReceipt } = action;
         var oldReceipts = [...state.receipts];
         var recIndex = oldReceipts.findIndex((elem) => (elem.id = id));
         oldReceipts[recIndex] = newReceipt;
         return {
            ...state,
            receipts: oldReceipts,
         };
      case DELETE_RECEIPT:
         return {
            ...state,
            receipts: state.receipts.filter((obj) => obj.id != action.id),
         };
      case READ_CATEGORIES:
         return {
            ...state,
            categories: action.categories,
         };
   }
   return state;
};

export default receiptReducer;
