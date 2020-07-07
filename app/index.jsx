import React, { Component } from 'react';
import {
  Text,
  View,
  Vibration,
  Linking,
  Button,
} from 'react-native';
import SelectPicker from 'react-native-form-select-picker';
import styles from './styles';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      selectedValue: undefined,
    };
  }

  componentDidMount() {
    const endpoint = 'https://jsonplaceholder.typicode.com/users';
    fetch(endpoint)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          data: result,
        });
      });

    // this._onDataAvailable();
  }

  _onValueChange = (value) => {
    this.setState({
      selectedValue: value,
    });
  };

  _onDataAvailable = () => {
    Vibration.vibrate([1111, 555, 1111, 555], false);
  };

  _onButtonPress = () => {
    const facebookURL = 'fb://notifications';

    Linking.canOpenURL(facebookURL).then((isAvailable) => {
      if (isAvailable) {
        Linking.openURL(facebookURL);
      }

      if (!isAvailable) {
        Linking.openURL(
          'https://facebook.github.io/react-native',
        );
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Hello from React Native!
        </Text>

        <Text style={styles.pickerSelectionText}>
          Your selected value is: {this.state.selectedValue}
        </Text>

        <SelectPicker
          placeholder="Select..."
          onValueChange={(value) => this._onValueChange(value)}
          style={styles.picker}
        >
          {this.state.data.map((element) => (
            <SelectPicker.Item
              key={element.id}
              label={element.name}
              value={element.name}
            />
          ))}
        </SelectPicker>

        <Button
          color="#365899"
          onPress={() => this._onButtonPress()}
          title="Open in Chrome "
        />
      </View>
    );
  }
}

export default App;
