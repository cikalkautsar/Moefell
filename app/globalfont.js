import { Text, TextInput } from 'react-native';

// Set default font untuk semua Text component
if (Text.defaultProps == null) {
  Text.defaultProps = {};
}
Text.defaultProps.style = { fontFamily: 'PoppinsBold' };

// Set default font untuk semua TextInput component
if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
}
TextInput.defaultProps.style = { fontFamily: 'PoppinsBold' };
