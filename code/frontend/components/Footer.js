import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import footerBaraglaaim from "../assets/footerBaraglaaim.png";

const Footer = () => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  return (
    <View style={styles.footer}>
      <View style={styles.footerTextContainer}>
        <Text style={styles.footerText}>@כל הזכויות שמורות לברגליים</Text>
      </View>
      <Image
        source={footerBaraglaaim}
        style={[styles.footerImage, { height: windowHeight * 0.1 }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  footerTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  footerText: {
    fontSize: 15,
    color: "black",
  },
  footerImage: {
    width: "100%",
    resizeMode: "contain",
  },
});

export default Footer;
