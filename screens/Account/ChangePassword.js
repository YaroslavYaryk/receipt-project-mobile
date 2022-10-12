import React, { useEffect, useState, useCallback, useReducer } from "react";
import {
   View,
   ActivityIndicator,
   StyleSheet,
   Text,
   TouchableOpacity,
   ScrollView,
   Alert,
   Button,
   Dimensions,
   Image,
} from "react-native";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { HeaderBackButton } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as userActions from "../../store/actions/userActions";
import { HOST, PORT } from "../../constants/server";

const { width } = Dimensions.get("window");

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
   if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
         ...state.inputValues,
         [action.input]: action.value,
      };
      const updatedValidities = {
         ...state.inputValidities,
         [action.input]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
         updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
         formIsValid: updatedFormIsValid,
         inputValidities: updatedValidities,
         inputValues: updatedValues,
      };
   }
   return state;
};

const ChangePassword = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();
   const [diabledButton, setDisabledButton] = useState(true);
   const [dontMatchError, setDontMatchError] = useState(null);

   const dispatch = useDispatch();

   useEffect(() => {
      if (error) {
         Alert.alert("An Error Occured", error, [
            { text: "Okay", onPress: setError(null) },
         ]);
      }
   }, [error]);

   useEffect(() => {
      if (formState.formIsValid) {
         setDisabledButton(false);
      } else {
         setDisabledButton(true);
      }
   });

   const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
         oldPassword: "",
         newPassword: "",
         newPasswordConfirm: "",
      },
      inputValidities: {
         oldPassword: false,
         newPassword: false,
         newPasswordConfirm: false,
      },
      formIsValid: false,
   });

   const inputChangeHandler = useCallback(
      (inputIdentifier, inputValue, inputValidity) => {
         dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier,
         });
      },
      [dispatchFormState]
   );

   useEffect(() => {
      if (
         formState.formIsValid &&
         formState.inputValues.newPassword ===
            formState.inputValues.newPasswordConfirm
      ) {
         setDisabledButton(false);
         setDontMatchError(null);
      } else {
         setDisabledButton(true);
         setDontMatchError("passwords don't match.");
      }
   }, [formState]);

   const changePasswordHandler = async () => {
      setError(null);
      let action;

      action = userActions.changePassword(
         formState.inputValues.oldPassword,
         formState.inputValues.newPassword
      );
      setIsLoading(true);
      try {
         await dispatch(action);
         // props.navigation.navigate("Shop");
      } catch (err) {
         console.log(err.message);
         setError(err.message);
         setIsLoading(false);

         return;
      }
      setIsLoading(false);
      props.navigation.navigate("Profile", {
         message: "Password was successfully changed",
      });
   };

   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.headerBold} />
         </View>
      );
   }

   return (
      <View
         style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.primary,
         }}
      >
         <View style={styles.container}>
            <ScrollView style={{}}>
               <View style={{}}>
                  <View style={styles.inputWrapper}>
                     <View style={{ marginBottom: 10 }}>
                        <View style={{ height: 150, width: width - 100 }}>
                           <Image
                              source={{
                                 uri: `${HOST}:${PORT}/static/images/restaurant.jpg`,
                              }}
                              style={{ width: "100%", height: "100%" }}
                           />
                        </View>
                     </View>
                     <View style={styles.inputBlock}>
                        <View style={{ marginBottom: 15 }}>
                           <Input
                              id="oldPassword"
                              label="Old password"
                              keyboardType="default"
                              required
                              secureTextEntry={true}
                              password
                              autoCapitalize="none"
                              errorText="Please enter a valid password."
                              onInputChange={inputChangeHandler}
                              initialValue=""
                              login={true}
                              //   placeholder="Old password"
                           />
                        </View>
                        <View style={{ marginBottom: 15 }}>
                           <Input
                              id="newPassword"
                              label="New password"
                              keyboardType="default"
                              required
                              secureTextEntry={true}
                              password
                              autoCapitalize="none"
                              errorText="Please enter a valid password."
                              onInputChange={inputChangeHandler}
                              initialValue=""
                              login={true}
                              //   placeholder="New password"
                           />
                        </View>
                        <View style={{ marginBottom: 5 }}>
                           <Input
                              id="newPasswordConfirm"
                              label="Confirm password"
                              keyboardType="default"
                              required
                              secureTextEntry={true}
                              password
                              autoCapitalize="none"
                              errorText="Please enter a valid password."
                              onInputChange={inputChangeHandler}
                              initialValue=""
                              login={true}
                              dontMatchError={dontMatchError}
                              marginNon={true}
                              //   placeholder="Confirm password"
                           />
                        </View>
                        <View style={{ marginTop: 15 }}>
                           {/* {isLoading ? (
                            <ActivityIndicator
                                size="small"
                                color={Colors.primaryColor}
                            />
                        ) : ( */}
                           <Button
                              title="Save"
                              color={Colors.primaryColor}
                              onPress={changePasswordHandler}
                              disabled={diabledButton}
                           />
                        </View>
                     </View>
                  </View>
               </View>
            </ScrollView>
         </View>
      </View>
   );
};

export const screenOptions = (navData) => {
   return {
      headerTitle: "Change Password",
   };
};

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   container: {
      // height: "width - 50",
      width: width - 50,

      backgroundColor: "white",
      borderRadius: 30,
      shadowColor: "black",
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 50,
   },
   titleBlockOuter: {
      alignItems: "center",
   },
   titleBlock: {
      paddingVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "85%",
   },
   titleText: {
      fontSize: 20,
      fontFamily: "sans-serif",
      fontWeight: "600",
   },
   titleBlockRegLink: {
      flexDirection: "row",
   },
   titleBlockRegLinkText: {
      marginRight: 5,
   },
   titleBlockRegLinkLinkText: {
      color: "#7988FF",
   },
   inputWrapper: {
      alignItems: "center",
      marginVertical: 30,
   },
   inputBlock: {
      width: "85%",
   },
   centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   forgotPassword: {
      marginVertical: 20,
      alignItems: "center",
   },
   forgotPasswordText: {
      fontSize: 18,
      fontWeight: "700",
      color: Colors.primaryColor,
   },
});

export default ChangePassword;
