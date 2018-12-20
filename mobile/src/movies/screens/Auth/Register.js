import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet, StatusBar, ImageBackground
} from 'react-native';
import {Icon} from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation'
import { register } from '../../../publics/redux/actions/auth';
import { connect } from 'react-redux';

const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};
// create a component
class RegisterForm extends Component {
  state = {
    toHome: false
  }

  handleRegister = value => {
    this.props.dispatch(register(value))
      .then(() => {
        this.setState({ toHome: true });
      })
      .catch(err => {
        alert(err.response.data.messages);
        console.log(err.response);
      });
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Icon style={{ color: "white", margin: 8 }}
          name='chevron-thin-left'
          type='Entypo' size={10}
          onPress={() => navigation.goBack()}
        />
      )
    }
  }
  render() {
    if (this.state.toHome === true) {
      this.props.dispatch({
        type: 'Navigation/NAVIGATE',
        routeName: 'First'
      })
    }
    return (

      <View style={styles.containers}>
        <ImageBackground
          source={{ uri: 'https://images.rapgenius.com/92abc49a4468f440d86e3c66541f0a2b.1000x991x1.jpg' }}
          style={{ width: '100%', height: '100%' }}>
          <ScrollView>
            <View style={styles.loginContainer}>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <TextInput style={styles.input}
                  autoCapitalize="none"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  autoCorrect={false}
                  keyboardType='email-address'
                  returnKeyType="next"
                  placeholder='Username'
                  placeholderTextColor='rgba(225,225,225,0.7)' />

                <TextInput style={styles.input}
                  autoCapitalize="none"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  autoCorrect={false}
                  keyboardType='email-address'
                  returnKeyType="next"
                  placeholder='Email'
                  placeholderTextColor='rgba(225,225,225,0.7)' />

                <TextInput style={styles.input}
                  autoCapitalize="none"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  autoCorrect={false}
                  keyboardType='email-address'
                  returnKeyType="next"
                  placeholder='Name'
                  placeholderTextColor='rgba(225,225,225,0.7)' />
                <TextInput style={styles.input}
                  returnKeyType="go" ref={(input) => this.passwordInput = input}
                  placeholder='Password'
                  placeholderTextColor='rgba(225,225,225,0.7)'
                  secureTextEntry />
                {/*   <Button onPress={onButtonPress} title = 'Login' style={styles.loginButton} /> */}
                <TouchableOpacity style={styles.buttonContainer} onPress={this.handleRegister}>
                  <Text style={styles.buttonText}>Daftar</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 15, color: "white" }}>Sudah punya akun ?</Text>
                <Text onPress={() => this.props.navigation.goBack()}
                  style={{ fontSize: 15, color: "white" }}> Masuk Disini</Text>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>


    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60
  },
  input: {
    width: 300,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 5
  },
  buttonContainer: {
    width: 300,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderColor: "#FFF",
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
  loginButton: {
    backgroundColor: '#2980b6',
    color: '#fff'
  },
  containers: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  loginContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  logo: {
    position: 'relative',
    width: 700,
    height: 120,
  },
  title: {
    color: "#FFF",
    marginTop: 120,
    width: 180,
    textAlign: 'center',
    opacity: 0.9
  }


});
export default connect()(RegisterForm);