import React, { useEffect, useState, useCallback } from "react";
import {
   View,
   Text,
   FlatList,
   Button,
   StyleSheet,
   ActivityIndicator,
   Dimensions,
   TouchableOpacity,
   Animated,
} from "react-native";
import Colors from "../../constants/Colors";
import Swipeable from "react-native-gesture-handler/Swipeable";

const SCREEN_WIDTH = Dimensions.get("window").width;

const ProjectItem = (props) => {
   const { item, isFocused } = props;

   const leftSwipe = (progress, dragX) => {
      const scale = dragX.interpolate({
         inputRange: [0, 100],
         outputRange: [0, 1],
         extrapolate: "clamp",
      });
      return (
         <TouchableOpacity onPress={props.handleEdit} activeOpacity={0.6}>
            <View style={styles.editBox}>
               <Animated.Text
                  style={{ transform: [{ scale: scale }], fontSize: 18 }}
               >
                  Edit
               </Animated.Text>
            </View>
         </TouchableOpacity>
      );
   };

   const rightSwipe = (progress, dragX) => {
      const scale = dragX.interpolate({
         inputRange: [-100, 100],
         outputRange: [1, -1],
         extrapolate: "clamp",
      });
      return (
         <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.6}>
            <View style={styles.deleteBox}>
               <Animated.Text
                  style={{ transform: [{ scale: scale }], fontSize: 18 }}
               >
                  Delete
               </Animated.Text>
            </View>
         </TouchableOpacity>
      );
   };

   return (
      <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
         <View style={styles.container}>
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
      </Swipeable>
   );
};

const styles = StyleSheet.create({
   wrapperInner: { marginBottom: 30 },
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
      bottom: 10,
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
   container: {
      // height: 80,
      width: SCREEN_WIDTH,
      backgroundColor: "white",
      justifyContent: "center",
      padding: 16,
      borderRadius: 10,
   },
   editBox: {
      backgroundColor: "#7895B2",
      justifyContent: "center",
      alignItems: "center",
      width: 100,
      height: "100%",
      marginBottom: 20,
      borderRadius: 10,
   },
   deleteBox: {
      backgroundColor: "#F05454",
      justifyContent: "center",
      alignItems: "center",
      width: 100,
      height: "100%",
      marginBottom: 20,
      borderRadius: 10,
   },
});

export default ProjectItem;
