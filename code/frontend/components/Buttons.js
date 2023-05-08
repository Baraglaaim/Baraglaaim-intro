import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, Text, TouchableOpacity, Button, ImageBackground } from 'react-native';


function Buttons(props) {
  return (
    <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: props.color, width: props.width }]} onPress={props.press}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 2,
    padding: 5,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Buttons;