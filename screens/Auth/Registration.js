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
   Image,
   Dimensions,
} from "react-native";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/actions/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { MaterialIcons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
import { HOST, PORT } from "../../constants/server";

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

const Registration = (props) => {
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
      if (
         formState.formIsValid &&
         formState.inputValues.password ===
            formState.inputValues.confirmPassword
      ) {
         setDisabledButton(false);
         setDontMatchError(null);
      } else {
         setDisabledButton(true);
         setDontMatchError("passwords don't match.");
      }
   });

   const authHandler = async () => {
      setError(null);
      let action;

      action = authActions.signUp(
         formState.inputValues.email,
         formState.inputValues.name,
         formState.inputValues.password
      );
      setIsLoading(true);
      try {
         await dispatch(action);
         // props.navigation.navigate("Shop");
      } catch (err) {
         setError(err.message);
         setIsLoading(false);
      }
   };

   const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
         email: "",
         name: "",
         password: "",
         confirmPassword: "",
      },
      inputValidities: {
         email: false,
         name: false,
         password: false,
         confirmPassword: false,
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

   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
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
                        <View style={{ marginBottom: 5 }}>
                           <Input
                              id="email"
                              label="E-Mail"
                              keyboardType="email-address"
                              required
                              secureTextEntry={false}
                              email
                              autoCapitalize="none"
                              errorText="Please enter a valid email address."
                              onInputChange={inputChangeHandler}
                              initialValue=""
                              login={true}
                              placeholder="Email"
                           />
                        </View>

                        <View style={{ marginBottom: 5 }}>
                           <Input
                              id="name"
                              label="Name"
                              keyboardType="default"
                              secureTextEntry={false}
                              required
                              password
                              minLength={8}
                              autoCapitalize="none"
                              errorText="Please enter a valid name."
                              onInputChange={inputChangeHandler}
                              initialValue=""
                              login={true}
                              placeholder="Name"
                           />
                        </View>
                        <View style={{ marginBottom: 5 }}>
                           <Input
                              id="password"
                              label="Password"
                              keyboardType="default"
                              secureTextEntry={true}
                              required
                              password
                              minLength={8}
                              autoCapitalize="none"
                              errorText="Please enter a valid password."
                              onInputChange={inputChangeHandler}
                              initialValue=""
                              login={true}
                              placeholder="Password"
                           />
                        </View>
                        <Input
                           id="confirmPassword"
                           label="ConfirmPassword"
                           keyboardType="default"
                           secureTextEntry={true}
                           required
                           confirmPassword
                           minLength={8}
                           autoCapitalize="none"
                           dontMatchError={dontMatchError}
                           onInputChange={inputChangeHandler}
                           initialValue=""
                           login={true}
                           placeholder="Confirm password"
                        />
                        <View style={styles.passwordRequirementsBlock}>
                           <Text style={styles.passwordRequirementsText}>
                              The password must contain at least 6 characters,
                              contain numbers and capital letters
                           </Text>
                        </View>
                        <View style={{}}>
                           {/* {isLoading ? (
                            <ActivityIndicator
                                size="small"
                                color={Colors.primaryColor}
                            />
                        ) : ( */}
                           <Button
                              title="??????????????????????????????"
                              color={Colors.primaryColor}
                              onPress={authHandler}
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
      headerTitle: "Registration",
      headerRight: () => (
         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
               title="login"
               color="black"
               icon={MaterialIcons}
               iconName={Platform.OS === "android" ? "login" : "login"}
               onPress={() => {
                  navData.navigation.navigate("Login");
               }}
            />
         </HeaderButtons>
      ),
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
   passwordRequirementsBlock: {
      // marginTop: -5,
      marginBottom: 20,
   },
   passwordRequirementsText: {
      color: "grey",
      fontWeight: "600",
      fontSize: 13,
   },
});

export default Registration;
