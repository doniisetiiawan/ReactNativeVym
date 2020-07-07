import React, { Component } from 'react';
import { Text, View } from 'react-native';
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
  }

  _onValueChange = (value) => {
    this.setState({
      selectedValue: value,
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
        >
          {this.state.data.map((element) => {
            console.log(element.id);
            return (
              <SelectPicker.Item
                key={element.id}
                label={element.name}
                value={element.name}
              />
            );
          })}
        </SelectPicker>
      </View>
    );
  }
}

export default App;
