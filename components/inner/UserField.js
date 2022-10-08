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

const UserField = (props) => {
   const { label, value } = props;

   return (
      <View
         style={styles.itemWrapper}
         key={Math.random() + Math.random() + Math.random() + Math.random()}
      >
         <View style={styles.itemWrapperInner}>
            <View style={styles.labelBlock}>
               <Text style={styles.labelText}>{label}</Text>
            </View>
            <View style={styles.ValueBlock}>
               <Text style={styles.valueText}>{value}</Text>
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   itemWrapper: {
      marginBottom: 20,
      alignItems: "center",
   },
   itemWrapperInner: {
      width: "92%",
      borderBottomWidth: 1,
      borderColor: Colors.headerBold,
   },
   labelText: {
      fontSize: 13,
      color: "grey",
   },
   valueText: {
      fontSize: 16,
      fontWeight: "500",
   },
});

export default UserField;
