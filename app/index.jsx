import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Linking,
  Text,
  Vibration,
  View,
  Share,
} from 'react-native';
import SelectPicker from 'react-native-form-select-picker';
import Slider from '@react-native-community/slider';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import styles from './styles';

class App extends Component {
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

    navigator.geolocation.getCurrentPosition(
      (positionSuccess) => {
        this.setState({
          location: positionSuccess,
        });
      },
    );
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

  _renderActionAndShareSheets = () => (
    <View>
      <Button
        color="#365899"
        onPress={() => this._openActionSheet()}
        title="Open Action Sheet"
      />
      <Button
        color="#365899"
        onPress={() => this._openShareSheet()}
        title="Open Share Sheet"
      />
    </View>
  );

  _openActionSheet = () => {
    const options = [
      'One',
      'Two',
      'Three',
      'Cancel',
      'Destroy',
    ];

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 3,
        destructiveButtonIndex: 4,
        title: 'Action Sheet Options',
        message: 'Please select from the following options',
      },
      (index) => {
        this._onActionSheetOptionSelected(index);
      },
    );
  };

  _onActionSheetOptionSelected = (index) => {
    alert(`The index you selected is: ${index}`);
  };

  _openShareSheet = () => {
    Share.share({
      // url: 'https://facebook.github.io/react-native',
      message:
        "Check out the React Native documentation here, it's really helpful!",
      // dialogTitle: 'Link to React Native docs',
    });
  };

  _onBeginWatchPositionButtonPress = () => {
    const watchID = navigator.geolocation.watchPosition(
      (watchSuccess) => {
        this.setState({
          location: watchSuccess,
        });
      },
    );

    this.setState({
      watchID,
    });
  };

  _onCancelWatchPositionButtonPress = () => {
    navigator.geolocation.clearWatch(this.state.watchID);

    this.setState({
      watchID: undefined,
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

        {this._renderActionAndShareSheets()}

        <Text style={styles.latLongText}>
          Your Latitude is:{' '}
          {this.state.location
            ? this.state.location.coords.latitude
            : 'undefined'}
        </Text>
        <Text style={styles.latLongText}>
          Your Longitude is:{' '}
          {this.state.location
            ? this.state.location.coords.longitude
            : 'undefined'}
        </Text>
        <Button
          color="#80B546"
          onPress={() => this._onBeginWatchPositionButtonPress()}
          title="Start Watching Position"
        />
        <Button
          color="#80B546"
          disabled={!this.state.watchID}
          onPress={() => this._onCancelWatchPositionButtonPress()}
          title="Cancel Watching Position"
        />
      </View>
    );
  }
}

const ConnectedApp = connectActionSheet(App);

export default ConnectedApp;

App.propTypes = {
  showActionSheetWithOptions: PropTypes.func.isRequired,
};
