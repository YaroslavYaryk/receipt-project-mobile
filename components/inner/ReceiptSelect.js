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
   TextInput,
   ScrollView,
   Alert,
} from "react-native";
import ModalSelector from "react-native-modal-selector";
import Colors from "../../constants/Colors";

const ReceiptSelect = (props) => {
   const [showInput, setShowInput] = useState(false);

   var initValue = props.initialValue;
   if (props.value) {
      if (showInput) {
         initValue = "other project";
      } else {
         initValue = props.value.value;
      }
   }

   const handleChange = (element) => {
      if (element.key == -1) {
         setShowInput(true);
      } else {
         props.setValue({ value: element.label, id: element.key, new: false });
         setShowInput(false);
      }
   };

   return (
      <View style={{ margin: 10 }}>
         <View style={{ marginBottom: 2 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
               {props.label}:
            </Text>
         </View>
         <ModalSelector
            data={props.data}
            initValue={initValue}
            selectStyle={{ alignItems: "flex-start" }}
            selectTextStyle={{
               color: Colors.headerBold,
               fontWeight: "bold",
            }}
            initValueTextStyle={{
               color: Colors.headerBold,
               fontWeight: "bold",
            }}
            onChange={(option) => {
               handleChange(option);
            }}
         />
         {showInput && (
            <TextInput
               style={styles.input}
               value={props.value}
               placeholder={props.initValue}
               onChangeText={(el) => {
                  props.setValue({ value: el, new: true, id: -1 });
               }}
            />
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   formControl: {
      width: "100%",
   },
   label: {
      fontFamily: "open-sans-bold",
      marginVertical: 8,
   },
   input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderColor: "#ccc",
      borderColor: Colors.headerBold,
      //   backgroundColor: "white",
      borderBottomWidth: 1,
   },
   errorContainer: {
      marginVertical: 5,
   },
   errorText: {
      fontFamily: "open-sans",
      color: "red",
      fontSize: 13,
   },
});

export default ReceiptSelect;
