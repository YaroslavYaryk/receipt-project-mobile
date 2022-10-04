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
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import ProjectItem from "../../components/inner/ProjectItem";
import Colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import * as projectActions from "../../store/actions/projectActions";
import { useIsFocused } from "@react-navigation/native";

const ProjectList = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();
   const [itemHeight, setItemHeight] = useState();

   var projects = useSelector((state) => state.projects.projects);
   const dispatch = useDispatch();
   const getProjectReports = (projectId) => {
      props.navigation.navigate("ProjectReports", {
         projectId: projectId,
      });
   };

   const handleProjectDelete = useCallback(
      async (id) => {
         setError(null);
         setIsLoading(true);
         try {
            dispatch(projectActions.deleteProject(id));
         } catch (error) {
            console.log(error.message);
            setError(error.message);
         }
         setIsLoading(false);
         props.navigation.navigate("ProjectList");
      },
      [useDispatch]
   );

   const isFocused = useIsFocused();

   useEffect(() => {
      if (error) {
         Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
      }
   }, [error]);

   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.headerBold} />
         </View>
      );
   }

   if (!projects.length) {
      return (
         <View style={styles.centered}>
            <Text>There is no any project</Text>
         </View>
      );
   }

   return (
      <View style={styles.container}>
         <FlatList
            // onScroll={scrollHandler}
            // ref={ref}
            data={projects}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
               <View
                  key={Math.random() + Math.random()}
                  style={{ marginBottom: 20 }}
               >
                  <ProjectItem
                     item={itemData.item}
                     onSelect={() => {
                        getProjectReports(itemData.item.id);
                     }}
                     handleEdit={() => {
                        props.navigation.navigate("EditProject", {
                           projectId: itemData.item.id,
                        });
                     }}
                     handleDelete={() => {
                        handleProjectDelete(itemData.item.id);
                     }}
                  ></ProjectItem>
               </View>
            )}
            // renderHiddenItem={(itemData, rowMap) => (
            //    <View
            //       style={{
            //          flexDirection: "row",
            //          justifyContent: "space-between",
            //          alignItems: "flex-end",
            //          // overflow: "hidden",
            //          // height: itemData.item.height,
            //          height: "50%",
            //       }}
            //    >
            //       <View
            //          key={Math.random() + Math.random() + Math.random()}
            //          onLayout={(event) => {
            //             rowMap[itemData.item.id].closeRow();
            //          }}
            //          style={{
            //             backgroundColor: "#7895B2",
            //             borderRadius: 10,
            //             width: 75,
            //          }}
            //       >
            //          <TouchableOpacity
            //             onPress={() => {
            //                props.navigation.navigate("EditProject", {
            //                   projectId: itemData.item.id,
            //                });
            //             }}
            //          >
            //             <View
            //                style={{
            //                   height: "100%",
            //                   width: "100%",
            //                   alignItems: "center",
            //                   justifyContent: "center",
            //                }}
            //             >
            //                <Text style={styles.buttonSwipe}>Edit</Text>
            //             </View>
            //          </TouchableOpacity>
            //       </View>
            //       <View
            //          style={{
            //             backgroundColor: "#F05454",
            //             borderRadius: 10,

            //             width: 75,
            //          }}
            //       >
            //          <TouchableOpacity
            //             onPress={() => {
            //                handleProjectDelete(itemData.item.id);
            //             }}
            //          >
            //             <View
            //                style={{
            //                   height: "100%",
            //                   width: "100%",
            //                   alignItems: "center",
            //                   justifyContent: "center",
            //                }}
            //             >
            //                <Text style={styles.buttonSwipe}>Delete</Text>
            //             </View>
            //          </TouchableOpacity>
            //       </View>
            //    </View>
            // )}
            // leftOpenValue={75}
            // rightOpenValue={-75}
         />
      </View>
   );
};

export const screenOptions = (navData) => {
   return {
      headerTitle: "My Projects",
      headerRight: () => (
         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
               title="Add"
               color="black"
               icon={MaterialIcons}
               iconName={Platform.OS === "android" ? "create" : "ios-create"}
               onPress={() => {
                  navData.navigation.navigate("CreateProject");
               }}
            />
         </HeaderButtons>
      ),
   };
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.primary,
      paddingTop: 15,
      zIndex: 10,
   },
   centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.primary,
   },
   buttonSwipe: {
      fontSize: 18,
      fontWeight: "500",
   },
});

export default ProjectList;
