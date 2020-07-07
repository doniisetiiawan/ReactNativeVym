import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import styles from './styles';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount = async () => {
    const endpoint = 'https://jsonplaceholder.typicode.com/users';
    const response = await fetch(endpoint);
    const data = await response.json();
    this.setState({
      data,
    });
    console.log(this.state.data);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Hello from React Native!
        </Text>
      </View>
    );
  }
}

export default App;
