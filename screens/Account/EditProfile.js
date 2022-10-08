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
import DateTimePicker from "@react-native-community/datetimepicker";
import Input from "../../components/UI/Input";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
const { width } = Dimensions.get("window");
import * as userActions from "../../store/actions/userActions";
import Moment from "moment";

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

const EditProfile = (props) => {
   const user = useSelector((state) => state.user.user);
   const [date, setDate] = useState(new Date(user.birthDate));
   const [open, setOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();

   const dispatch = useDispatch();

   var formValid = false;
   if (
      user.email &&
      user.name &&
      user.phone &&
      user.city &&
      user.address &&
      user.postalCode &&
      user.birthDate &&
      user.accountNumber
   ) {
      formValid = true;
   }

   const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
         email: user.email ? user.email : "",
         name: user.name ? user.name : "",
         phone: user.phone ? user.phone : "",
         city: user.city ? user.city : "",
         address: user.address ? user.address : "",
         postalCode: user.postalCode ? user.postalCode : "",
         birthDate: user.birthDate ? user.birthDate : "",
         accountNumber: user.accountNumber ? user.accountNumber : "",
      },
      inputValidities: {
         email: user.email ? true : false,
         name: user.name ? true : false,
         phone: user.phone ? true : false,
         city: user.city ? true : false,
         address: user.address ? true : false,
         postalCode: user.postalCode ? true : false,
         birthDate: user.birthDate ? true : false,
         accountNumber: user.accountNumber ? true : false,
      },
      formIsValid: formValid,
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

   const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      if (currentDate >= new Date()) {
         setOpen(false);
         Alert.alert("An error occurred!", "Invalid date", [{ text: "Okay" }]);
      } else {
         setOpen(false);
         setDate(currentDate);
      }
   };

   const handleEditUser = useCallback(async () => {
      try {
         setError(null);
         setIsLoading(true);
         await dispatch(
            userActions.editUser(
               formState.inputValues.email,
               formState.inputValues.name,
               formState.inputValues.phone,
               formState.inputValues.city,
               formState.inputValues.address,
               formState.inputValues.postalCode,
               Moment(date).format("YYYY-MM-DD"),
               formState.inputValues.accountNumber
            )
         );
      } catch (error) {
         console.log(error.message);
         setError(error.message);
      }
      setIsLoading(false);
      props.navigation.navigate("Profile");
   }, [dispatch, formState]);

   useEffect(() => {
      if (error) {
         Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
      }
   }, [error]);

   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.headerBold} />
         </View>
      );
   }

   return (
      <View style={styles.container}>
         <ScrollView>
            <View style={[{ margin: 10, marginTop: 10, marginBottom: 5 }]}>
               <Input
                  email
                  id="email"
                  label="Email"
                  errorText="Please enter a valid Email!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={user.email ? user.email : ""}
                  initiallyValid={user.email ? true : false}
                  required
               />
            </View>

            <View style={[{ margin: 10, marginBottom: 5 }]}>
               <Input
                  id="name"
                  label="Name"
                  errorText="Please enter a valid name!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={user.name ? user.name : ""}
                  initiallyValid={user.name ? true : false}
                  required
               />
            </View>

            <View style={[{ margin: 10, marginBottom: 5 }]}>
               <Input
                  id="phone"
                  label="Phone"
                  errorText="Please enter a valid phone!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={user.phone ? user.phone : ""}
                  initiallyValid={user.phone ? true : false}
                  required
                  phone
               />
            </View>
            <View style={[{ margin: 10, marginBottom: 5 }]}>
               <Input
                  id="city"
                  label="City"
                  errorText="Please enter a valid city!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={user.city ? user.city : ""}
                  initiallyValid={user.city ? true : false}
                  required
               />
            </View>
            <View style={[{ margin: 10, marginBottom: 5 }]}>
               <Input
                  id="address"
                  label="Address"
                  errorText="Please enter a valid address!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={user.address ? user.address : ""}
                  initiallyValid={user.address ? true : false}
                  required
               />
            </View>
            <View style={[{ margin: 10, marginBottom: 18 }]}>
               <Input
                  id="postalCode"
                  label="Postal code"
                  errorText="Please enter a valid phone!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={user.postalCode ? user.postalCode : ""}
                  initiallyValid={user.postalCode ? true : false}
                  required
                  integer
               />
            </View>
            <View style={styles.dateBlock}>
               <View style={styles.dateBlockInner}>
                  <View>
                     <TouchableOpacity onPress={() => setOpen(true)}>
                        <Text style={styles.panelButtonTitle}>Choose Date</Text>
                     </TouchableOpacity>
                  </View>
                  <View>
                     <Text
                        style={[
                           styles.panelButtonTitle,
                           { fontWeight: "400", fontSize: 14 },
                        ]}
                     >
                        {date.toLocaleDateString()}
                     </Text>
                  </View>
               </View>
               {open && (
                  <DateTimePicker
                     testID="dateTimePicker"
                     value={date}
                     mode={"date"}
                     is24Hour={true}
                     onChange={onChange}
                  />
               )}
            </View>
            <View style={[{ margin: 10, marginBottom: 18 }]}>
               <Input
                  id="accountNumber"
                  label="Account number"
                  errorText="Please enter a valid accont number!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={
                     user.accountNumber ? user.accountNumber.toString() : ""
                  }
                  initiallyValid={user.accountNumber ? true : false}
                  required
                  integer
               />
            </View>

            <View style={styles.saveButtonBlock}>
               <View
                  style={[
                     styles.saveButtonBlockInner,
                     {
                        backgroundColor: formState.formIsValid
                           ? Colors.header
                           : "grey",
                     },
                  ]}
               >
                  <TouchableOpacity
                     disabled={formState.formIsValid ? false : true}
                     onPress={handleEditUser}
                     activeOpacity={0}
                  >
                     <View
                        style={{
                           width: width * 0.9,
                           alignItems: "center",
                           //    height: "100%",
                        }}
                     >
                        <Text style={styles.saveButtonBlockText}>Save</Text>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
         </ScrollView>
      </View>
   );
};

export const screenOptions = (navData) => {
   return {
      headerTitle: "Edit profile",
   };
};

const styles = StyleSheet.create({
   centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.primary,
   },
   container: {
      flex: 1,
      backgroundColor: Colors.primary,
   },
   commandButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: "#FF6347",
      alignItems: "center",
      marginTop: 10,
   },
   panel: {
      padding: 20,
      backgroundColor: "#FFFFFF",
      paddingTop: 20,
   },
   header: {
      backgroundColor: "#FFFFFF",
      shadowColor: "#333333",
      shadowOffset: { width: -1, height: -3 },
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
   },
   panelHeader: {
      alignItems: "center",
   },
   panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#00000040",
      marginBottom: 10,
   },
   panelTitle: {
      fontSize: 27,
      height: 35,
   },
   panelSubtitle: {
      fontSize: 14,
      color: "gray",
      height: 30,
      marginBottom: 10,
   },
   panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: Colors.headerBold,
      alignItems: "center",
      marginVertical: 7,
   },
   panelButtonTitle: {
      fontSize: 17,
      fontWeight: "bold",
      color: "white",
   },
   action: {
      flexDirection: "row",
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#f2f2f2",
      paddingBottom: 5,
   },
   actionError: {
      flexDirection: "row",
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#FF0000",
      paddingBottom: 5,
   },
   textInput: {
      flex: 1,
      marginTop: Platform.OS === "ios" ? 0 : -12,
      paddingLeft: 10,
      color: "#05375a",
   },
   ImagePicherWrapper: {
      marginTop: 20,
      alignItems: "center",
      // marginLeft: 20,
   },
   ImagePicherInner: {
      alignItems: "center",

      width: "95%",
      borderWidth: 1,
      padding: 20,
      backgroundColor: Colors.headerBoldLight,
      borderRadius: 10,
   },
   dateBlock: { alignItems: "center" },
   dateBlockInner: {
      padding: 10,
      borderWidth: 1,
      width: "95%",
      backgroundColor: Colors.headerBoldLight,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   PlaceBlock: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
      justifyContent: "space-between",
      marginHorizontal: 10,
      marginBottom: 20,
      // backgroundColor: "",
      borderColor: "#B3B3B1",
      borderWidth: 2,
      paddingHorizontal: 10,
      width: "94%",
      borderRadius: 10,
   },

   saveButtonBlock: {
      alignItems: "center",
      marginBottom: 20,
   },
   saveButtonBlockInner: {
      alignItems: "center",

      width: "90%",
      borderWidth: 1,
      borderColor: Colors.primary,
      padding: 10,
      borderRadius: 10,
   },
   saveButtonBlockText: {
      fontSize: 18,
      color: Colors.headerBold,
      fontWeight: "600",
   },
   imageScroll: {
      width,
      height: "100%",
      resizeMode: "contain",
      position: "relative",
   },
});

export default EditProfile;
