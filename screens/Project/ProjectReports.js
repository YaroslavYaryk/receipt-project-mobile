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
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import ProjectReportItem from "../../components/inner/ProjectReportItem";
import * as OpenAnithing from "react-native-openanything";

const ProjectReports = (props) => {
   var projectId = props.route.params;
   const projectReports = useSelector((state) => state.projects.projectReports);

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
});

export default ProjectReports;
