import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
   createDrawerNavigator,
   DrawerItemList,
} from "@react-navigation/drawer";
import ReceiptList from "../screens/Project/Receipt/ReceiptList";
import AuthScreen from "../screens/Auth/AuthScreen";
import ProjectList from "../screens/Project/ProjectList";
import ProjectReports from "../screens/Project/ProjectReports";
import Colors from "../constants/Colors";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon, { Icons } from "../components/inner/Icon";

const defaultNavOptions = {
   headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.header : "",
   },
   headerTitleStyle: {
      fontFamily: "open-sans-bold",
   },
   headerBackTitleStyle: {
      fontFamily: "open-sans",
   },
   headerTintColor: Platform.OS === "android" ? "black" : Colors.primary,
};

const ReceiptStackNavigator = createStackNavigator();

export const ReceiptNavigator = () => {
   return (
      <ReceiptStackNavigator.Navigator screenOptions={defaultNavOptions}>
         <ReceiptStackNavigator.Screen
            name="ReceiptList"
            component={ReceiptList}
            // options={productsOverviewScreenOptions}
         />
      </ReceiptStackNavigator.Navigator>
   );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
   return (
      <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
         <AuthStackNavigator.Screen
            name="AuthScreen"
            component={AuthScreen}
            // options={productsOverviewScreenOptions}
         />
      </AuthStackNavigator.Navigator>
   );
};

const ProjectStackNavigator = createStackNavigator();

export const ProjectNavigator = () => {
   return (
      <ProjectStackNavigator.Navigator screenOptions={defaultNavOptions}>
         <ProjectStackNavigator.Screen
            name="ProjectList"
            component={ProjectList}
            // options={productsOverviewScreenOptions}
         />
         <ProjectStackNavigator.Screen
            name="ProjectReports"
            component={ProjectReports}
            // options={productsOverviewScreenOptions}
         />
      </ProjectStackNavigator.Navigator>
   );
};

const Tab = createMaterialBottomTabNavigator();

export const BaseFullNavigator = () => {
   const [iconsColor, setIconsColors] = useState([
      Colors.headerBold,
      "grey",
      "grey",
      "grey",
   ]);

   const handleActiveIconColor = (number) => {
      var allColors = ["grey", "grey", "grey", "grey"];
      allColors[number - 1] = Colors.headerBold;
      setIconsColors(allColors);
   };

   return (
      <Tab.Navigator
         activeColor={Colors.headerBold}
         barStyle={{
            backgroundColor: "white",
            color: "black",
         }}
      >
         <Tab.Screen
            name="ReceiptNavigator"
            component={ReceiptNavigator}
            listeners={{
               tabPress: (e) => {
                  // Prevent default action
                  // e.preventDefault();

                  //Any custom code here
                  handleActiveIconColor(1);
               },
            }}
            options={{
               tabBarLabelPosition: "beside-icon",

               tabBarLabel: "Receipts",
               tabBarIcon: () => (
                  <Icon
                     name="receipt"
                     type={Icons.Ionicons}
                     size={20}
                     color={iconsColor[0]}
                  />
               ),
            }}
         />
         <Tab.Screen
            name="ProjectNavigator"
            component={ProjectNavigator}
            listeners={{
               tabPress: (e) => {
                  // e.preventDefault();
                  handleActiveIconColor(2);
               },
            }}
            options={{
               tabBarLabel: "Projects",
               tabBarStyle: { display: "none" },
               tabBarIcon: () => (
                  <Icon
                     name="projector-screen"
                     type={Icons.MaterialCommunityIcons}
                     size={20}
                     color={iconsColor[1]}
                  />
               ),
            }}
         />
         <Tab.Screen
            name="AuthNavigator"
            component={AuthNavigator}
            listeners={{
               tabPress: (e) => {
                  // e.preventDefault();
                  handleActiveIconColor(3);
               },
            }}
            options={{
               headerShown: true,
               tabBarLabel: "Account",
               tabBarIcon: () => (
                  <Icon
                     name="user"
                     type={Icons.FontAwesome}
                     size={20}
                     color={iconsColor[2]}
                  />
               ),
            }}
         />
      </Tab.Navigator>
   );
};
