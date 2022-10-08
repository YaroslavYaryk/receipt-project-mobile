import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
// import ProductNavigator from "../navigation/ProductNavigator";
import { BaseFullNavigator, AuthNavigator } from "./AppNavigator";

const BaseAuthNavigator = (props) => {
   const isAuth = useSelector((state) => !!state.auth.token);

   return (
      <NavigationContainer>
         {isAuth && <BaseFullNavigator />}
         {!isAuth && <AuthNavigator />}
      </NavigationContainer>
   );
};

export default BaseAuthNavigator;
