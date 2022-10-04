import React, { useEffect, useState, useCallback, useReducer } from "react";
import {
   View,
   Text,
   FlatList,
   Button,
   StyleSheet,
   ActivityIndicator,
   KeyboardAvoidingView,
   ScrollView,
   TouchableOpacity,
   Dimensions,
   Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
const { width } = Dimensions.get("window");
import * as projectActions from "../../store/actions/projectActions";

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

const EditProject = (props) => {
   const { projectId } = props.route.params;
   const project = useSelector((state) =>
      state.projects.projects.find((el) => el.id == projectId)
   );
   const dispatch = useDispatch();

   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();

   const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
         name: project.name ? project.name : "",
      },
      inputValidities: {
         name: project.name ? true : false,
      },
      formIsValid: project.name ? true : false,
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

   const handleEditProject = useCallback(
      async (id, name) => {
         setError(null);
         setIsLoading(true);
         try {
            dispatch(projectActions.editProject(id, name));
         } catch (error) {
            console.log(error);
            setError(error.message);
         }
         setIsLoading(false);
         props.navigation.navigate("ProjectList");
      },
      [useDispatch, formState]
   );

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
      <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior="padding"
         keyboardVerticalOffset={10}
      >
         <ScrollView>
            <View style={styles.form}>
               <Input
                  id="name"
                  label="Name"
                  errorText="Please enter a valid name!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={project.name ? project.name : ""}
                  initiallyValid={project.name ? true : false}
                  required
               />
            </View>
            <View style={styles.saveButtonBlock}>
               <View
                  style={[
                     styles.saveButtonBlockInner,
                     {
                        backgroundColor: Colors.header,
                     },
                  ]}
               >
                  <TouchableOpacity
                     disabled={formState.formIsValid ? false : true}
                     onPress={() => {
                        // handleCreateProject(formState.inputValues.name);
                        handleEditProject(
                           projectId,
                           formState.inputValues.name
                        );
                     }}
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
      </KeyboardAvoidingView>
   );
};

export const screenOptions = (navData) => {
   return {
      headerTitle: "Edit Project",
   };
};

const styles = StyleSheet.create({
   form: {
      margin: 20,
   },
   centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   saveButtonBlock: {
      alignItems: "center",
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
});

export default EditProject;
