import React, { useEffect, useState, useCallback, useRef } from "react";
import {
   View,
   Text,
   FlatList,
   Button,
   StyleSheet,
   ActivityIndicator,
   TouchableOpacity,
   Dimensions,
   ScrollView,
   Alert,
} from "react-native";
import { Transition, Transitioning } from "react-native-reanimated";
import Slider from "../../../components/inner/Slider";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../../components/UI/HeaderButton";
import { MaterialIcons } from "@expo/vector-icons";
import * as OpenAnithing from "react-native-openanything";
import * as receiptActions from "../../../store/actions/receiptActions";

const { width } = Dimensions.get("window");
const height = width * 0.6 + 455;

const ReceiptDetails = (props) => {
   const { id, name } = props.route.params;

   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();

   const dispatch = useDispatch();

   const receipt = useSelector((state) =>
      state.receipts.receipts.find((el) => el.id === id)
   );
   var a = useSelector((state) => state.receipts.receipts);
   console.log(a.map((el) => el.id));

   const handleDeleteReceipt = useCallback(
      async (id) => {
         setError(null);
         setIsLoading(true);
         try {
            dispatch(receiptActions.deleteReceipt(id));
         } catch (error) {
            console.log(error.message);
            setError(error.message);
         }
         setIsLoading(false);
         props.navigation.navigate("ReceiptList");
      },
      [dispatch]
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
      <View style={styles.container}>
         <ScrollView>
            <View
               style={{
                  height: height + 150,
                  backgroundColor: "white",
                  marginTop: 10,
               }}
            >
               <View style={{ height: "40%" }}>
                  <Slider
                     images={receipt ? receipt.photos.map((el) => el.url) : []}
                  />
               </View>
               <View style={[{ marginHorizontal: 20, marginTop: 20 }]}>
                  <View>
                     <View style={[styles.labelBlock, { marginBottom: 15 }]}>
                        <Text
                           style={{
                              color: "grey",
                              fontSize: 12,
                           }}
                        >
                           Project
                        </Text>
                     </View>
                     <Text style={styles.price}>{receipt.projectName}</Text>
                  </View>
               </View>
               <View style={[{ marginHorizontal: 20, marginTop: 20 }]}>
                  <View>
                     <View style={[styles.labelBlock, { marginBottom: 15 }]}>
                        <Text
                           style={{
                              color: "grey",
                              fontSize: 12,
                           }}
                        >
                           Category
                        </Text>
                     </View>
                     <Text style={styles.price}>{receipt.categoryName}</Text>
                  </View>
               </View>
               <View style={[{ marginHorizontal: 20, marginTop: 20 }]}>
                  <View>
                     <View style={[styles.labelBlock, { marginBottom: 15 }]}>
                        <Text
                           style={{
                              color: "grey",
                              fontSize: 12,
                           }}
                        >
                           Company
                        </Text>
                     </View>
                     <Text style={styles.price}>{receipt.company}</Text>
                  </View>
               </View>
               <View
                  style={[
                     styles.titleBlock,
                     { marginHorizontal: 20, marginTop: 20 },
                  ]}
               >
                  <View style={{ width: "42%" }}>
                     <View style={styles.labelBlock}>
                        <Text style={{ color: "grey", fontSize: 12 }}>
                           Price
                        </Text>
                     </View>
                     <Text style={styles.price}>
                        {receipt.price}{" "}
                        <Text style={{ fontSize: 14 }}>NOK</Text>
                     </Text>
                  </View>
                  <View style={{ width: "42%" }}>
                     <View style={styles.labelBlock}>
                        <Text style={{ color: "grey", fontSize: 12 }}>
                           Date
                        </Text>
                     </View>
                     <Text style={styles.price}>{receipt.date}</Text>
                  </View>
               </View>
               <View style={[{ marginHorizontal: 20, marginTop: 20 }]}>
                  <View>
                     <View style={[styles.labelBlock, { marginBottom: 15 }]}>
                        <Text
                           style={{
                              color: "grey",
                              fontSize: 12,
                           }}
                        >
                           Description
                        </Text>
                     </View>
                     <Text style={styles.price}>
                        {receipt.description ? receipt.description : "---"}
                     </Text>
                  </View>
               </View>
               <View style={[{ marginHorizontal: 20, marginTop: 20 }]}>
                  <View>
                     <View style={[styles.labelBlock, { marginBottom: 15 }]}>
                        <Text
                           style={{
                              color: "grey",
                              fontSize: 12,
                           }}
                        >
                           Business
                        </Text>
                     </View>
                     <Text style={styles.price}>
                        {receipt.business ? receipt.business : "---"}
                     </Text>
                  </View>
               </View>
               <View style={[{ marginHorizontal: 20, marginTop: 20 }]}>
                  <View>
                     <View style={[styles.labelBlock, { marginBottom: 15 }]}>
                        <Text
                           style={{
                              color: "grey",
                              fontSize: 12,
                           }}
                        >
                           Persons
                        </Text>
                     </View>
                     <Text style={styles.price}>
                        {receipt.persons ? receipt.persons : "---"}
                     </Text>
                  </View>
               </View>
               <View style={[{ marginHorizontal: 20, marginTop: 20 }]}>
                  <View>
                     <View style={[styles.labelBlock, { marginBottom: 15 }]}>
                        <Text
                           style={{
                              color: "grey",
                              fontSize: 12,
                           }}
                        >
                           Comment
                        </Text>
                     </View>
                     <Text style={styles.commentText}>
                        {receipt.comment ? receipt.comment : "---"}
                     </Text>
                  </View>
               </View>
               <View style={{ alignItems: "center" }}>
                  <View style={styles.buttonsBlockWrapper}>
                     <View style={styles.buttonsBlockInner}>
                        <View
                           style={[
                              styles.buttonBlock,
                              { backgroundColor: Colors.header },
                           ]}
                        >
                           <TouchableOpacity
                              onPress={() => {
                                 OpenAnithing.Pdf(receipt.file_document);
                              }}
                           >
                              <Text style={styles.buttonText}>Document</Text>
                           </TouchableOpacity>
                        </View>
                        <View
                           style={[
                              styles.buttonBlock,
                              { backgroundColor: "#F05454" },
                           ]}
                        >
                           <TouchableOpacity
                              onPress={() => {
                                 handleDeleteReceipt(receipt.id);
                              }}
                           >
                              <Text style={styles.buttonText}>Delete</Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  </View>
               </View>
            </View>
         </ScrollView>
      </View>
   );
};

export const screenOptions = (navData) => {
   const { id, name } = navData.route.params;

   return {
      headerTitle: name.length < 15 ? name : `${name.slice(0, 15)}...`,
      headerRight: () => (
         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
               title="Add"
               color="black"
               icon={MaterialIcons}
               iconName={Platform.OS === "android" ? "create" : "ios-create"}
               onPress={() => {
                  navData.navigation.navigate("EditReceipt", { id: id });
               }}
            />
         </HeaderButtons>
      ),
   };
};

const styles = StyleSheet.create({
   centered: { flex: 1, justifyContent: "center", alignItems: "center" },
   container: {
      flex: 1,
      backgroundColor: Colors.primary,
   },
   nameBlockWrapper: {
      paddingTop: 1,
   },
   nameTextBlock: {
      marginHorizontal: 15,
   },
   nameText: {
      fontSize: 20,
   },
   underNameBlock: {
      marginTop: 10,
      width: "90%",
      flexDirection: "row",
      justifyContent: "space-between",
   },
   kodLabel: {
      color: "gray",
   },
   inStockBlock: {
      paddingTop: 5,
      paddingLeft: 15,
   },
   priceBlock: {
      paddingBottom: 8,
      borderBottomWidth: 0.2,
      // borderWidth: 2,
      borderBottomColor: "grey",
      marginBottom: 6,
   },
   priceInnerBlock: {
      marginLeft: 15,
   },
   price: {
      fontSize: 25,
   },
   currencySymbol: {
      fontSize: 20,
   },
   partPayBlock: {
      width: "100%",
      marginTop: 3,
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 0.2,
      borderBottomColor: "grey",
      alignItems: "center",
      paddingBottom: 10,
   },
   partPayBlockInner: {
      margin: 15,
      flexDirection: "row",
      width: "35%",
      justifyContent: "space-between",
      alignItems: "center",
   },
   partPayPrice: {
      fontSize: 18,
   },
   partPayPriceBefore: { fontSize: 14 },
   partPayPriceAfter: { fontSize: 14 },
   loanBlock: {
      borderWidth: 2,
      paddingHorizontal: 13,
      paddingVertical: 8,
      borderColor: "grey",
      borderRadius: 10,
      marginRight: 20,
   },
   loanBlockText: {
      color: "green",
      fontWeight: "500",
   },
   warrantyBlock: {
      // margin: 10,
      borderBottomWidth: 0.5,
      borderColor: "grey",
   },
   warranryHeading: {
      fontSize: 20,
   },
   varrantyCard: {
      flexDirection: "row",
      justifyContent: "space-between",
   },
   fullDescriptionBlock: {
      marginVertical: 15,
   },
   fullDescriptionInnerBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "95%",
   },
   subCategoriesList: {
      flexDirection: "row",
      marginVertical: 15,
   },
   subCategoriesListText: {
      marginLeft: 10,
   },
   fullDescriptionText: {
      fontSize: 20,
   },
   line: {
      width: "100%",
      backgroundColor: "grey",
      height: 0.2,
   },
   subCategoriesListPrice: {
      marginVertical: 5,
   },
   subCategoriesListPriceText: {
      marginLeft: 10,
   },
   product: {
      shadowColor: "black",
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      borderRadius: 10,
      backgroundColor: "white",
      height: 280,
      width: "100%",
      marginBottom: 20,
   },
   titleBlock: {
      // flex: 1,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      // gap: "20px",
      height: 35,
      marginBottom: 10,
   },

   imageContainer: {
      // borderWidth: 3,
      width: "80%",
      height: "63.5%",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: "center",
      padding: 10,
      // overflow: "hidden",
   },

   productName: {
      marginTop: -20,
   },
   rating: {
      marginTop: 10,
   },
   details: {
      alignItems: "center",
      width: "90%",
      height: "15%",
      padding: 10,
      paddingTop: -5,
   },
   title: {
      fontSize: 18,
   },
   price: {
      fontSize: 20,
      // color: "#888",
   },
   bottomTitle: {
      justifyContent: "space-around",
      flexDirection: "row",
      width: "100%",
   },
   labelBlock: {
      position: "absolute",
      top: -15,
      left: -5,
   },
   commentText: {
      color: "grey",
   },
   buttonsBlockWrapper: {
      marginTop: 20,
      width: "100%",
      alignItems: "center",
   },
   buttonsBlockInner: {
      flexDirection: "row",
      justifyContent: "space-between",
      //   alignItems: "center",
      width: "90%",

      //   width: "100%",
   },
   buttonBlock: {
      borderWidth: 1,
      borderColor: Colors.headerBold,
      padding: 20,
      width: "48%",
      alignItems: "center",
      borderRadius: 10,
   },
   buttonText: {
      fontSize: 16,
      fontWeight: "600",
   },
});

export default ReceiptDetails;
