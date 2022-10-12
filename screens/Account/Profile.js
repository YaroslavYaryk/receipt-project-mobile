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
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as authActions from "../../store/actions/authActions";
import * as userActions from "../../store/actions/userActions";
import UserField from "../../components/inner/UserField";
import SeccessPopup from "../../components/UI/SuccessPopup";
const { width } = Dimensions.get("window");

const Profile = (props) => {
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [visible, setVisible] = useState(false);
   const [message, setMessage] = useState(null);
   const user = useSelector((state) => state.user.user);
   const dispatch = useDispatch();

   useEffect(() => {
      if (props.route.params) {
         setMessage(props.route.params.message);
         setVisible(true);
      }
   }, [props.route.params]);

   const loadUser = useCallback(async () => {
      setError(null);
      setIsLoading(true);
      try {
         await dispatch(userActions.fetchUser());
      } catch (err) {
         setError(err.message);
      }
      setIsLoading(false);
   }, [dispatch, setError, setIsLoading]);

   useEffect(() => {
      loadUser();
   }, [dispatch, loadUser]);

   const logoutHandle = async () => {
      setError(null);
      setIsLoading(true);
      try {
         await dispatch(authActions.logout());
      } catch (err) {
         console.log(err.message);
         setError(err.message);
      }
      setIsLoading(false);
   };

   const userFields = [
      { label: "Email", value: user.email },
      { label: "Name", value: user.name },
      { label: "Phone", value: user.phone },
      { label: "City", value: user.city },
      { label: "Address", value: user.address },
      { label: "Postal code", value: user.postalCode },
      { label: "Birthdate", value: user.birthDate },
      { label: "Account number", value: user.accountNumber },
   ];

   if (error) {
      return (
         <View style={styles.centered}>
            <Text>An error occured</Text>
            <Button
               title="Try Again"
               onPress={loadUser}
               color={Colors.primaryColor}
            />
         </View>
      );
   }

   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
         </View>
      );
   }

   return (
      <View style={styles.container}>
         <ScrollView>
            <View style={{ alignItems: "center", marginTop: 10 }}>
               <View style={{ marginBottom: 10 }}>
                  <View style={{ height: 120, width: width - 100 }}>
                     <Image
                        source={{
                           uri: `https://cdn-icons-png.flaticon.com/128/3135/3135715.png`,
                        }}
                        style={{
                           width: "100%",
                           height: "100%",
                           resizeMode: "contain",
                        }}
                     />
                  </View>
               </View>
            </View>
            <View>
               {userFields.map((el) => (
                  <UserField
                     label={el.label}
                     value={el.value}
                     key={
                        Math.random() +
                        Math.random() +
                        Math.random() +
                        Math.random()
                     }
                  />
               ))}
            </View>
            <View
               style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
               <View
                  style={{
                     width: "45%",
                     borderWidth: 3,
                     padding: 10,
                     borderColor: Colors.headerBold,
                     borderRadius: 10,
                     backgroundColor: Colors.headerBoldLight,
                     alignItems: "center",
                     justifyContent: "center",
                  }}
               >
                  <TouchableOpacity
                     onPress={() => {
                        props.navigation.navigate("ChangePassword");
                     }}
                  >
                     <View
                        style={{
                           alignItems: "center",
                           justifyContent: "center",
                        }}
                     >
                        <Text
                           style={{
                              fontSize: 18,
                              fontWeight: "700",
                              color: "#fff",
                           }}
                        >
                           Change password
                        </Text>
                     </View>
                  </TouchableOpacity>
               </View>
               <View
                  style={{
                     width: "45%",
                     borderWidth: 3,
                     padding: 10,
                     borderColor: "#CCCCCC",
                     borderRadius: 10,
                     backgroundColor: Colors.header,
                     alignItems: "center",
                     justifyContent: "center",
                  }}
               >
                  <TouchableOpacity
                     onPress={() => {
                        logoutHandle();
                     }}
                  >
                     <View
                        style={{
                           alignItems: "center",
                           justifyContent: "center",
                        }}
                     >
                        <Text
                           style={{
                              fontSize: 18,
                              fontWeight: "700",
                              color: "#fff",
                           }}
                        >
                           Logout
                        </Text>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
         </ScrollView>
         <SeccessPopup
            visible={visible}
            setVisible={setVisible}
            message={message}
         />
      </View>
   );
};

export const screenOptions = (navData) => {
   return {
      headerTitle: "My profile",
      headerRight: () => (
         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
               title="create"
               color="black"
               icon={MaterialIcons}
               iconName={Platform.OS === "android" ? "create" : "ios-create"}
               onPress={() => {
                  navData.navigation.navigate("EditProfile");
               }}
            />
         </HeaderButtons>
      ),
   };
};

const styles = StyleSheet.create({
   centered: {
      flex: 1,
      // justifyContent: "center",
      // alignItems: "center",
      backgroundColor: Colors.primary,
   },
   container: {
      flex: 1,
      backgroundColor: Colors.primary,
   },
   buttonRightContainer: {
      marginRight: 20,
      flexDirection: "row",
   },
   buttonRightItem: {
      marginHorizontal: 5,
      color: "white",
      fontWeight: "700",
   },
   buttonRightItemActive: {
      color: "yellow",
   },
   logRegBlock: {
      alignItems: "center",
      width: "100%",
      marginVertical: 20,
      borderBottomWidth: 0.5,
      borderBottomColor: Colors.primaryColor,
      paddingBottom: 20,
   },
   logRegBlockInner: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "45%",
   },
   logRegBlockText: {
      fontSize: 18,
      fontWeight: "700",
      color: Colors.primaryColor,
   },
   userBlockWrapper: {
      // borderWidth: 0.5,
   },
   userBlock: {
      alignItems: "center",
      padding: 10,
   },
   userBlockText: {
      fontSize: 18,
   },
   userTextLabel: {
      color: "grey",
   },
   userTextInfoBLockWrapper: {
      borderBottomWidth: 0.5,
   },
   userTextInfoBLock: {
      marginHorizontal: 10,
      marginTop: 10,
      marginBottom: 5,
   },
});

export default Profile;
