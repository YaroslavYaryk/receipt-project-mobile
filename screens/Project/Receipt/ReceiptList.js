import React, { useEffect, useState, useCallback } from "react";
import {
   View,
   Text,
   FlatList,
   Button,
   StyleSheet,
   ActivityIndicator,
   TouchableOpacity,
} from "react-native";
// import { useSelector, useDispatch } from "react-redux";
import Colors from "../../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import ReceiptItem from "../../../components/inner/ReceiptItem";

const ReceiptList = () => {
   const receipts = useSelector((state) => state.receipts.receipts);

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
                  // onSelect={() => {
                  //    getProductDetails(
                  //       itemData.item.id,
                  //       itemData.item.onlyName
                  //    );
                  // }}
               ></ReceiptItem>
            )}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.primary,
      paddingTop: 15,
   },
});

export default ReceiptList;
