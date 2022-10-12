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
import * as authActions from "../../store/actions/authActions";
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

const ResetPasswordToken = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();
   const [diabledButton, setDisabledButton] = useState(true);

   const { email } = props.route.params;

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

   const handleNextStep = () => {
      props.navigation.navigate("ResetPasswordNewPassword", {
         token: formState.inputValues.token,
      });
   };

   const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
         token: "",
      },
      inputValidities: {
         token: false,
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
                     <View>
                        <View style={{ alignItems: "center" }}>
                           <Text>
                              Please a token you have receaved on your email
                           </Text>
                           <Text style={{ fontWeight: "500" }}>{email}</Text>
                        </View>
                     </View>
                     <View style={styles.inputBlock}>
                        <View style={{ marginBottom: 15 }}>
                           <Input
                              id="token"
                              label="Token"
                              keyboardType="default"
                              required
                              secureTextEntry={false}
                              autoCapitalize="none"
                              errorText="Please enter a valid email token."
                              onInputChange={inputChangeHandler}
                              initialValue=""
                              login={true}
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
                              title="Next step"
                              color={Colors.primaryColor}
                              onPress={handleNextStep}
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
      headerTitle: "Password Recovering",
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

export default ResetPasswordToken;
