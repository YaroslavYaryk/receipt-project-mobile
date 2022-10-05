import React, { useEffect, useState, useCallback } from "react";
import {
   View,
   Text,
   FlatList,
   Button,
   StyleSheet,
   ActivityIndicator,
   TouchableOpacity,
   Alert,
} from "react-native";
// import { useSelector, useDispatch } from "react-redux";
import Colors from "../../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import ReceiptItem from "../../../components/inner/ReceiptItem";
import { MaterialIcons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../../components/UI/HeaderButton";

const ReceiptList = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();

   const receipts = useSelector((state) => state.receipts.receipts);

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

   if (!receipts.length) {
      return (
         <View style={styles.centered}>
            <Text>There is no any project</Text>
         </View>
      );
   }

   return (
      <View style={styles.container}>
         <FlatList
            // onScroll={scrollHandler}
            // ref={ref}
            data={receipts}
            keyExtractor={(item) => item.id}
            // spacing={20}
            renderItem={(itemData) => (
               <ReceiptItem
                  item={itemData.item}
                  onSelect={() => {
                     props.navigation.navigate("ReceiptDetails", {
                        id: itemData.item.id,
                        name: itemData.item.projectName,
                     });
                  }}
               ></ReceiptItem>
            )}
         />
      </View>
   );
};

export const screenOptions = (navData) => {
   return {
      headerTitle: "My Receipts",
      headerRight: () => (
         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
               title="Add"
               color="black"
               icon={MaterialIcons}
               iconName={Platform.OS === "android" ? "create" : "ios-create"}
               onPress={() => {
                  navData.navigation.navigate("CreateReceipt");
               }}
            />
         </HeaderButtons>
      ),
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
      paddingTop: 15,
   },
});

export default ReceiptList;
