import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
   createDrawerNavigator,
   DrawerItemList,
} from "@react-navigation/drawer";
import ReceiptList from "../screens/Project/Receipt/ReceiptList";
import ProjectList from "../screens/Project/ProjectList";
import { screenOptions as projectScreenOptions } from "../screens/Project/ProjectList";
import ProjectReports from "../screens/Project/ProjectReports";
import CreateProject from "../screens/Project/CreateProject";
import { screenOptions as createProjectScreenOptions } from "../screens/Project/CreateProject";
import EditProject from "../screens/Project/EditProject";
import { screenOptions as editProjectScreenOptions } from "../screens/Project/EditProject";
import ReceiptDetails from "../screens/Project/Receipt/ReceiptDetails";
import { screenOptions as receiptDetailsScreenOptions } from "../screens/Project/Receipt/ReceiptDetails";
import CreateReceipt from "../screens/Project/Receipt/CreateReceipt";
import EditReceipt from "../screens/Project/Receipt/EditReceipt";
import Login from "../screens/Auth/Login";
import { screenOptions as loginScreenOptions } from "../screens/Auth/Login";
import Registration from "../screens/Auth/Registration";
import { screenOptions as refistrationScreenOptions } from "../screens/Auth/Registration";
import Profile from "../screens/Account/Profile";
import { screenOptions as profileScreenActions } from "../screens/Account/Profile";
import EditProfile from "../screens/Account/EditProfile";
import { screenOptions as editProfileScreenOptions } from "../screens/Account/EditProfile";
import Colors from "../constants/Colors";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon, { Icons } from "../components/inner/Icon";
import { screenOptions as receiptsScreenOptions } from "../screens/Project/Receipt/ReceiptList";

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
            options={receiptsScreenOptions}
         />
         <ReceiptStackNavigator.Screen
            name="ReceiptDetails"
            component={ReceiptDetails}
            options={receiptDetailsScreenOptions}
         />
         <ReceiptStackNavigator.Screen
            name="CreateReceipt"
            component={CreateReceipt}
            // options={receiptDetailsScreenOptions}
         />
         <ReceiptStackNavigator.Screen
            name="EditReceipt"
            component={EditReceipt}
            // options={receiptDetailsScreenOptions}
         />
      </ReceiptStackNavigator.Navigator>
   );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
   return (
      <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
         <AuthStackNavigator.Screen
            name="Login"
            component={Login}
            options={loginScreenOptions}
         />
         <AuthStackNavigator.Screen
            name="Registration"
            component={Registration}
            options={refistrationScreenOptions}
         />
      </AuthStackNavigator.Navigator>
   );
};

const AccountStackNavigator = createStackNavigator();

export const AccountNavigator = () => {
   return (
      <AccountStackNavigator.Navigator screenOptions={defaultNavOptions}>
         <AccountStackNavigator.Screen
            name="Profile"
            component={Profile}
            options={profileScreenActions}
         />
         <AccountStackNavigator.Screen
            name="EditProfile"
            component={EditProfile}
            options={editProfileScreenOptions}
         />
      </AccountStackNavigator.Navigator>
   );
};

const ProjectStackNavigator = createStackNavigator();

export const ProjectNavigator = () => {
   return (
      <ProjectStackNavigator.Navigator screenOptions={defaultNavOptions}>
         <ProjectStackNavigator.Screen
            name="ProjectList"
            component={ProjectList}
            options={projectScreenOptions}
         />
         <ProjectStackNavigator.Screen
            name="ProjectReports"
            component={ProjectReports}
            // options={productsOverviewScreenOptions}
         />
         <ProjectStackNavigator.Screen
            name="CreateProject"
            component={CreateProject}
            options={createProjectScreenOptions}
         />
         <ProjectStackNavigator.Screen
            name="EditProject"
            component={EditProject}
            options={editProjectScreenOptions}
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
            name="AccountNavigator"
            component={AccountNavigator}
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
