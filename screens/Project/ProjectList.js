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
import { useRoute } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";
import ProjectItem from "../../components/inner/ProjectItem";
import Colors from "../../constants/Colors";

const ProjectList = (props) => {
   var projects = useSelector((state) => state.projects.projects);

   const route = useRoute();
   console.log(route.name);

   const getProjectReports = (projectId) => {
      console.log(projectId);
      props.navigation.navigate("ProjectReports", {
         projectId: projectId,
      });
   };

   return (
      <View style={styles.container}>
         <FlatList
            // onScroll={scrollHandler}
            // ref={ref}
            data={projects}
            keyExtractor={(item) => item.id}
            // spacing={20}
            renderItem={(itemData) => (
               <ProjectItem
                  item={itemData.item}
                  onSelect={() => {
                     getProjectReports(itemData.item.id);
                  }}
               ></ProjectItem>
            )}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.primary,
      paddingTop: 15,
   },
});

export default ProjectList;
