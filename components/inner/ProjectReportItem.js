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
import Colors from "../../constants/Colors";

const ProjectReportItem = (props) => {
   const { item } = props;

   return (
      <View style={styles.product}>
         <View style={styles.wrapperInner}>
            <View style={styles.textBlock}>
               <Text>{item.date}</Text>
            </View>
            <View style={styles.buttonBlockInner}>
               <TouchableOpacity onPress={props.onSelect}>
                  <Text>Preview Report</Text>
               </TouchableOpacity>
            </View>
         </View>
         <View></View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.primary,
      paddingTop: 15,
   },
   wrapperInner: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   product: {
      shadowColor: "black",
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      borderRadius: 10,
      backgroundColor: "white",
      width: "100%",
      marginBottom: 20,
      padding: 20,
   },

   buttonBlockInner: {
      borderWidth: 1,
      borderColor: Colors.headerBold,
      padding: 5,
      backgroundColor: Colors.header,
      borderRadius: 5,
   },
});

export default ProjectReportItem;
