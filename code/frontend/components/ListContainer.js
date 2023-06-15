import React from "react";
import { Text, View, StyleSheet, FlatList, Dimensions } from "react-native";

function ListContainer(props) {
  let arg = props.data;
  let objArray = [];

  for (let i = 0; i < arg.length; i++) {
    objArray.push({ id: i, title: arg[i] });
  }

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const containerHeight = windowHeight * props.height;
  const containerWidth = windowWidth * props.width;

  const renderSeparator = () => {
    return <View style={[styles.separator , {backgroundColor: props.separatorColor}]} />;
  };

  return (
    <View style={[styles.container, props.style, { height: containerHeight ,width: containerWidth}]}>
      <View style={[styles.list, { backgroundColor: props.backgroundColor}]}>
        <FlatList
          data={objArray}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text style={{ padding: 10 }}>{item.title}</Text>
              {renderSeparator()}
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  separator: {
    height: 1,
    marginHorizontal: 10,
  },
});

export default ListContainer;
