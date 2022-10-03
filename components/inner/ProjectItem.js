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

const ProjectItem = (props) => {
   const { item } = props;

   return (
      <View style={styles.product}>
         <View style={styles.wrapperInner}>
            <Text>{item.name}</Text>
         </View>
         <View style={styles.buttonBlock}>
            <View style={styles.buttonBlockInner}>
               <TouchableOpacity onPress={props.onSelect}>
                  <Text>Projects Reports</Text>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.primary,
      paddingTop: 15,
   },
   wrapperInner: { marginBottom: 20 },
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
   buttonBlock: {
      position: "absolute",
      bottom: 5,
      right: 15,
      backgroundColor: Colors.header,
      borderRadius: 5,
   },
   buttonBlockInner: {
      borderWidth: 1,
      borderColor: Colors.headerBold,
      padding: 5,
      borderRadius: 5,
   },
});

export default ProjectItem;
