import React, { useEffect, useState, useCallback } from "react";
import {
   View,
   Text,
   FlatList,
   Button,
   StyleSheet,
   ActivityIndicator,
   TouchableOpacity,
   Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import ProjectReportItem from "../../components/inner/ProjectReportItem";
import * as OpenAnithing from "react-native-openanything";
import * as projectActions from "../../store/actions/projectActions";
import { useIsFocused } from "@react-navigation/native";

const ProjectReports = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();

   var projectId = props.route.params.projectId;
   console.log(projectId);
   const projectReports = useSelector((state) => state.projects.projectReports);

   const isFocused = useIsFocused();

   const dispatch = useDispatch();

   const loadReports = useCallback(async () => {
      setError(null);
      setIsLoading(true);
      try {
         await dispatch(projectActions.fetchProjectReports(projectId));
      } catch (err) {
         setError(err.message);
      }
      setIsLoading(false);
   }, [dispatch, setError, setIsLoading]);

   useEffect(() => {
      loadReports();
   }, [dispatch, loadReports, isFocused]);

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

   if (!projectReports.length) {
      return (
         <View style={styles.centered}>
            <Text>There is no any report</Text>
         </View>
      );
   }

   return (
      <View style={styles.container}>
         <FlatList
            // onScroll={scrollHandler}
            // ref={ref}
            data={projectReports}
            keyExtractor={(item) => item.id}
            // spacing={20}
            renderItem={(itemData) => (
               <ProjectReportItem
                  item={itemData.item}
                  onSelect={() => {
                     OpenAnithing.Pdf(itemData.item.file);
                  }}
               ></ProjectReportItem>
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
   centered: {
      flex: 1,
      backgroundColor: Colors.primary,
      justifyContent: "center",
      alignItems: "center",
   },
});

export default ProjectReports;
