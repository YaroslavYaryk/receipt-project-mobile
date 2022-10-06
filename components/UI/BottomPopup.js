import React, { Component } from "react";
import {
   View,
   Text,
   Modal,
   Dimensions,
   Pressable,
   FlatList,
   TouchableOpacity,
   Alert,
   StyleSheet,
} from "react-native";
import Colors from "../../constants/Colors";

export default class BottomPopup extends Component {
   static defaultProps = {
      title: "",
      //slide fade  none
      animationType: "slide",
      haveOutsideTouch: false,
      data: [],
   };

   render() {
      const {
         show,
         title,
         animationType,
         closePopup,
         haveOutsideTouch,
         openCamera,
         pickImage,
      } = this.props;

      return (
         <Modal
            animationType={animationType}
            transparent={true}
            visible={show}
            onRequestClose={() => {}}
         >
            <View style={{ flex: 1, backgroundColor: "#000000AA" }}>
               <Pressable
                  onPress={() => {
                     if (!haveOutsideTouch) return;
                     closePopup();
                  }}
                  style={{ flex: 1 }}
               ></Pressable>

               <View
                  style={{
                     bottom: 0,
                     position: "absolute",
                     width: "100%",
                     backgroundColor: "white",
                     borderTopLeftRadius: 15,
                     borderTopRightRadius: 15,
                     // height: Dimensions.get('window').height * 0.4,
                     maxHeight: Dimensions.get("window").height * 0.4,
                  }}
               >
                  <View style={styles.panel}>
                     <View style={{ alignItems: "center" }}>
                        <Text style={styles.panelTitle}>Upload Photo</Text>
                        <Text style={styles.panelSubtitle}>
                           Choose Your Pictures
                        </Text>
                     </View>
                     <TouchableOpacity
                        style={styles.panelButton}
                        onPress={openCamera}
                     >
                        <Text style={styles.panelButtonTitle}>Take Photo</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={styles.panelButton}
                        onPress={pickImage}
                     >
                        <Text style={styles.panelButtonTitle}>
                           Choose From Library
                        </Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={styles.panelButton}
                        onPress={() => bs.current.snapTo(1)}
                     >
                        <Text style={styles.panelButtonTitle}>Cancel</Text>
                     </TouchableOpacity>
                     <View style={{ height: 50 }}></View>
                  </View>
               </View>
            </View>
         </Modal>
      );
   }
}

const styles = StyleSheet.create({
   panel: {
      paddingHorizontal: 20,
      backgroundColor: "#FFFFFF",
      marginTop: 15,
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
});
