import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, Text, TouchableOpacity, Button, ImageBackground } from 'react-native';


function Buttons(props) {
  return (
    <Pressable style={[styles.buttonStyle, { backgroundColor: props.color }]} onPress={props.press}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: 150,
    outerWidth: 50,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Buttons;