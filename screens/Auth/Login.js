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

const Login = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();
   const [diabledButton, setDisabledButton] = useState(true);
   const [redirect, setRedirect] = useState();

   const dispatch = useDispatch();

   const retrieveData = useCallback(async () => {
      try {
         const value = await AsyncStorage.getItem("redirect");
         setRedirect(JSON.parse(value));
      } catch (error) {
         // Error retrieving data
      }
      AsyncStorage.removeItem("redirect");
   });

   useEffect(() => {
      retrieveData();
   }, []);
   var user = useSelector((state) => state.auth);
   const getUser = () => {
      if (user.token) {
         if (redirect) {
            props.navigation.navigate(redirect.redirectUrl, {
               productId: redirect.productId,
               commentId: redirect.commentId ? redirect.commentId : null,
            });
         } else {
            props.navigation.navigate("Account");
         }
      }
   };

   useEffect(() => {
      getUser();
   }, [redirect, user]);

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

   const authHandler = async () => {
      setError(null);
      let action;

      action = authActions.login(
         formState.inputValues.email,
         formState.inputValues.password
      );
      setIsLoading(true);
      try {
         await dispatch(action);
         // props.navigation.navigate("Shop");
      } catch (err) {
         setError(err.message);
      }
      setIsLoading(false);
   };

   const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
         email: "",
         password: "",
      },
      inputValidities: {
         email: false,
         password: false,
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

   const redirectToRegistration = () => {
      props.navigation.navigate("Registration");
   };

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
                        <View style={{ marginBottom: 15 }}>
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
                              placeholder="Електронна пошта"
                           />
                        </View>
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
                           placeholder="Пароль"
                        />
                        <View style={{ marginTop: 15 }}>
                           {/* {isLoading ? (
                            <ActivityIndicator
                                size="small"
                                color={Colors.primaryColor}
                            />
                        ) : ( */}
                           <Button
                              title="Увійти"
                              color={Colors.primaryColor}
                              onPress={authHandler}
                              disabled={diabledButton}
                           />
                           <View style={styles.forgotPassword}>
                              <TouchableOpacity
                                 onPress={() => {
                                    console.log("forgot password");
                                 }}
                              >
                                 <Text style={styles.forgotPasswordText}>
                                    Забули праоль?
                                 </Text>
                              </TouchableOpacity>
                           </View>
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
      headerTitle: "Login",
      headerRight: () => (
         <View style={{ height: 30, width: 30, marginRight: 10 }}>
            <TouchableOpacity
               onPress={() => {
                  navData.navigation.navigate("Registration");
               }}
            >
               <View>
                  <Image
                     source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/7538/7538677.png",
                     }}
                     style={{ width: "100%", height: "100%" }}
                  />
               </View>
            </TouchableOpacity>
         </View>
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
});

export default Login;
