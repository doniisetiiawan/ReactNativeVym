import React, { Component } from 'react';
import {
  Text,
  View,
  Vibration,
  Linking,
  Button,
} from 'react-native';
import SelectPicker from 'react-native-form-select-picker';
import Slider from '@react-native-community/slider';
import styles from './styles';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      selectedValue: undefined,
      sliderValue: undefined,
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

  _onSliderValueChange = (value) => {
    this.setState({
      sliderValue: value,
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

        <Text style={styles.sliderSelectionText}>
          Your Slider Value is: {this.state.sliderValue}
        </Text>
        <Slider
          maximumValue={100}
          minimumValue={0}
          onSlidingComplete={(value) => this._onSliderValueChange(value)}
          onValueChange={(value) => this._onSliderValueChange(value)}
          step={3}
        />
      </View>
    );
  }
}

export default App;
