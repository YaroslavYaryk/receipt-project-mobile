import React, {
   useEffect,
   useState,
   useCallback,
   useRef,
   useReducer,
} from "react";
import {
   View,
   Text,
   FlatList,
   Button,
   StyleSheet,
   ActivityIndicator,
   TouchableOpacity,
   Dimensions,
   TextInput,
   ScrollView,
   Alert,
} from "react-native";
// import { ImagePicker } from "expo-image-multiple-picker";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";
import Colors from "../../../constants/Colors";
import BottomSheet from "reanimated-bottom-sheet";
import ModalSelector from "react-native-modal-selector";
import { useSelector, useDispatch } from "react-redux";
import ReceiptSelect from "../../../components/inner/ReceiptSelect";
import DateTimePicker from "@react-native-community/datetimepicker";
import Input from "../../../components/UI/Input";

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

const CreateReceipt = () => {
   const [libraryImages, setLibraryImages] = useState([]);
   const [cameraImage, setCameraImage] = useState(null);
   const [inputProject, setInputProject] = useState(null);
   const [inputCategory, setInputCategory] = useState(null);
   const projects = useSelector((state) => state.projects.projects);
   const categories = useSelector((state) => state.receipts.categories);

   const [date, setDate] = useState(new Date());
   const [open, setOpen] = useState(false);

   const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         aspect: [4, 3],
         quality: 1,
         allowsMultipleSelection: true,
      });

      if (!result.cancelled) {
         setLibraryImages(result.selected.map((el) => el.uri));
      }
   };

   const openCamera = async () => {
      let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (!permissionResult.granted) {
         Alert("Permission to access camera roll is required");
         return;
      }

      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchCameraAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         aspect: [4, 3],
         quality: 1,
         allowsMultipleSelection: true,
      });
      if (!result.cancelled) {
         console.log(result.uri);
         setCameraImage(result.uri);
      }
   };

   const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
         company: "",
         price: "",
         description: "",
         business: "",
         persons: "",
      },
      inputValidities: {
         company: false,
         price: false,
         description: false,
         business: false,
         persons: false,
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

   const renderInner = () => (
      <View style={styles.panel}>
         <View style={{ alignItems: "center" }}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>Choose Your Pictures</Text>
         </View>
         <TouchableOpacity style={styles.panelButton} onPress={openCamera}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
         </TouchableOpacity>
         <TouchableOpacity
            style={styles.panelButton}
            onPress={() => bs.current.snapTo(1)}
         >
            <Text style={styles.panelButtonTitle}>Cancel</Text>
         </TouchableOpacity>
      </View>
   );

   const renderHeader = () => (
      <View style={styles.header}>
         <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
         </View>
      </View>
   );

   var bs = React.createRef();
   var fall = new Animated.Value(1);

   const projectsData = projects.map((el) => ({ key: el.id, label: el.name }));
   projectsData.push({
      key: -1,
      label: "other project",
   });

   const categoriesData = categories.map((el) => ({
      key: el.id,
      label: el.name,
   }));
   categoriesData.push({
      key: -1,
      label: "other project",
   });

   const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setOpen(false);
      setDate(currentDate);
   };

   return (
      <View style={styles.container}>
         <ScrollView>
            <View>
               <ReceiptSelect
                  label={"Project"}
                  initialValue={"Choose a project"}
                  data={projectsData}
                  value={inputProject}
                  setValue={setInputProject}
                  initValue={"New project"}
               />
            </View>
            <View style={{ marginTop: -10, marginBottom: 5 }}>
               <ReceiptSelect
                  label={"Category"}
                  initialValue={"Choose a category"}
                  data={categoriesData}
                  value={inputCategory}
                  setValue={setInputCategory}
                  initValue={"New category"}
               />
            </View>
            <View style={[{ margin: 10, marginTop: -10, marginBottom: 18 }]}>
               <Input
                  id="category"
                  label="Company"
                  errorText="Please enter a valid category!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={""}
                  initiallyValid={false}
                  required
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
                  id="price"
                  label="Price"
                  errorText="Please enter a valid price!"
                  keyboardType="numeric"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={""}
                  initiallyValid={false}
                  required
               />
            </View>
            <View style={styles.ImagePicherWrapper}>
               <View style={styles.ImagePicherInner}>
                  <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                     <Text style={styles.panelButtonTitle}>
                        Chose images for receipt
                     </Text>
                  </TouchableOpacity>
               </View>
            </View>
            <View style={[{ margin: 10, marginBottom: 18 }]}>
               <Input
                  id="description"
                  label="Description"
                  errorText="Please enter a valid description!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={""}
                  initiallyValid={false}
                  required
                  height={40}
                  multiline={true}
                  textAlignVertical={"top"}
               />
            </View>
            <View style={[{ margin: 10, marginBottom: 18 }]}>
               <Input
                  id="business"
                  label="Business"
                  errorText="Please enter a valid business!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={""}
                  initiallyValid={false}
                  required
                  height={40}
                  multiline={true}
                  textAlignVertical={"top"}
               />
            </View>
            <View style={[{ margin: 10, marginBottom: 18 }]}>
               <Input
                  id="persons"
                  label="People"
                  errorText="Please enter a valid people!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={""}
                  initiallyValid={false}
                  required
                  height={40}
                  multiline={true}
                  textAlignVertical={"top"}
               />
            </View>
            <View style={[{ margin: 10, marginBottom: 18 }]}>
               <Input
                  id="comment"
                  label="Comment"
                  errorText="Please enter a valid people!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={""}
                  initiallyValid={false}
                  height={40}
                  multiline={true}
                  textAlignVertical={"top"}
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
                        handleCreateProject(formState.inputValues.name);
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
         <BottomSheet
            ref={bs}
            snapPoints={[330, 0]}
            renderContent={renderInner}
            renderHeader={renderHeader}
            initialSnap={1}
            callbackNode={fall}
            enabledGestureInteraction={true}
         />
      </View>
   );
};

const styles = StyleSheet.create({
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
});

export default CreateReceipt;
