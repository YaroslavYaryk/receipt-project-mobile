import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { BaseFullNavigator } from "./navigation/AppNavigator";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useState } from "react";
import ReduxThunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { combineReducers, applyMiddleware } from "redux";
import receiptReducer from "./store/reducers/receiptReducer";
import projectReducer from "./store/reducers/projectReducer";
import { LogBox } from "react-native";

const rootReducer = combineReducers({
   receipts: receiptReducer,
   projects: projectReducer,
});

const store = configureStore(
   {
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
         }),
   },
   applyMiddleware(ReduxThunk)
);

const fontsFetch = () => {
   return Font.loadAsync({
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
      "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
   });
};

export default function App() {
   const [dataLoaded, setDataLoaded] = useState(false);

   if (!dataLoaded) {
      return (
         <AppLoading
            startAsync={fontsFetch}
            onFinish={() => {
               setDataLoaded(true);
            }}
            onError={console.warn}
         />
      );
   }

   LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
   LogBox.ignoreAllLogs(); //Ignore all log notifications

   return (
      <Provider store={store}>
         <NavigationContainer>
            <BaseFullNavigator />
         </NavigationContainer>
      </Provider>
   );
}
