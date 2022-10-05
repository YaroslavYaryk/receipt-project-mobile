import React, { useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
   switch (action.type) {
      case INPUT_CHANGE:
         return {
            ...state,
            value: action.value,
            isValid: action.isValid,
         };
      case INPUT_BLUR:
         return {
            ...state,
            touched: true,
         };
      default:
         return state;
   }
};

const Input = (props) => {
   const [inputState, dispatch] = useReducer(inputReducer, {
      value: props.initialValue ? props.initialValue : "",
      isValid: props.initiallyValid,
      touched: false,
   });

   const { onInputChange, id } = props;

   useEffect(() => {
      if (inputState.touched) {
         onInputChange(id, inputState.value, inputState.isValid);
      }
   }, [inputState, onInputChange, id]);

   const textChangeHandler = (text) => {
      const emailRegex =
         /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let isValid = true;
      if (props.required && text.trim().length === 0) {
         isValid = false;
         console.log("1");
      }
      if (props.email && !emailRegex.test(text.toLowerCase())) {
         isValid = false;
         console.log("2");
      }
      if (props.min != null && +text < props.min) {
         isValid = false;
         console.log("3");
      }
      if (props.max != null && +text > props.max) {
         isValid = false;
         console.log("4");
      }
      if (props.minLength != null && text.length < props.minLength) {
         isValid = false;
         console.log("5");
      }

      if (props.id == "price" && !text.match(/^-?\d*(\.\d+)?$/)) {
         isValid = false;
      }

      dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
   };

   const lostFocusHandler = () => {
      dispatch({ type: INPUT_BLUR });
   };

   return (
      <View style={styles.formControl}>
         <Text style={styles.label}>{props.label}</Text>
         <TextInput
            {...props}
            style={[
               styles.input,
               { height: props.height ? props.height : null },
            ]}
            value={inputState.value}
            onChangeText={textChangeHandler}
            onBlur={lostFocusHandler}
         />
         {!inputState.isValid && inputState.touched && (
            <View style={styles.errorContainer}>
               <Text style={styles.errorText}>{props.errorText}</Text>
            </View>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   formControl: {
      width: "100%",
   },
   label: {
      // fontFamily: "open-sans",
      marginVertical: 8,
      fontWeight: "500",
      fontSize: 16,
   },
   input: {
      paddingHorizontal: 2,
      paddingVertical: 0,
      borderBottomColor: Colors.headerBold,
      borderBottomWidth: 1,
   },
   errorContainer: {
      marginVertical: 5,
   },
   errorText: {
      fontFamily: "open-sans",
      color: "red",
      fontSize: 13,
   },
});

export default Input;
