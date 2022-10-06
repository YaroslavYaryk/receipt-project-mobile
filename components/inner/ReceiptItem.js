import React, { useEffect, useState, useCallback } from "react";
import {
   View,
   Text,
   FlatList,
   Button,
   StyleSheet,
   ActivityIndicator,
   TouchableOpacity,
   TouchableNativeFeedback,
   Platform,
   Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Slider from "./Slider";
import Colors from "../../constants/Colors";

const ReceiptItem = (props) => {
   const { item } = props;

   let TouchableCmp = TouchableNativeFeedback;

   const [likeImage, setLikeImage] = useState("hearto");

   if (Platform.OS === "android" && Platform.Version >= 21) {
      TouchableCmp = TouchableOpacity;
   }

   const previewProjectName = (item) => {
      if (item.length < 10) {
         return item;
      } else {
         return `${item.slice(0, 10)}...`;
      }
   };

   return (
      <View
         key={props.item.id}
         style={[
            styles.product,
            {
               marginVertical:
                  props.showMethod == "vertical" ? props.margVert : 0,
               paddingVertical: props.showMethod == "vertical" ? 20 : 0,
            },
         ]}
      >
         <View style={styles.touchable}>
            <View style={{ alignItems: "center" }}>
               <View
                  style={[
                     styles.imageContainer,
                     { paddingBottom: 10, marginBottom: 3 },
                  ]}
               >
                  <Slider
                     images={
                        item.photos
                           ? item.photos.map((el) => el.url)
                           : [props.defaultImage]
                     }
                  />
               </View>
               <View
                  style={[
                     styles.details,
                     {
                        marginBottom: 8,
                     },
                  ]}
               >
                  <View style={styles.titleBlock}>
                     <View>
                        <View style={styles.labelBlock}>
                           <Text style={{ color: "grey", fontSize: 12 }}>
                              Category
                           </Text>
                        </View>
                        <Text style={styles.price}>
                           {item.projectName.length < 13
                              ? item.categoryName
                              : `${item.categoryName.slice(0, 13)}...`}
                        </Text>
                     </View>
                     <View style={{ width: "42%" }}>
                        <View style={styles.labelBlock}>
                           <Text style={{ color: "grey", fontSize: 12 }}>
                              Price
                           </Text>
                        </View>
                        <Text style={styles.price}>
                           {item.price}{" "}
                           <Text style={{ fontSize: 14 }}>NOK</Text>
                        </Text>
                     </View>
                  </View>
               </View>
               <View style={styles.details}>
                  <View style={styles.titleBlock}>
                     <View style={{}}>
                        <View style={styles.labelBlock}>
                           <Text style={{ color: "grey", fontSize: 12 }}>
                              Project
                           </Text>
                        </View>
                        <Text style={styles.price}>
                           {item.projectName.length < 13
                              ? item.projectName
                              : `${item.projectName.slice(0, 13)}...`}
                        </Text>
                     </View>

                     <View
                        style={{
                           padding: 6,
                           backgroundColor: Colors.header,
                           borderRadius: 10,
                        }}
                     >
                        <TouchableCmp onPress={props.onSelect} useForeground>
                           <Text style={{ fontSize: 18 }}>Preview Receipt</Text>
                        </TouchableCmp>
                     </View>
                  </View>
               </View>

               {/* <View style={styles.actions}>{props.children}</View> */}
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
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
      top: -10,
      left: -5,
   },
});

export default ReceiptItem;
