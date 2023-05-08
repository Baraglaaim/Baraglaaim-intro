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
    borderRadius: 130,
    padding: 2,
    marginBottom: 30,
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Buttons;