import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Text, View, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Logo from '../components/Logo'

import { createFragmentContainer, graphql } from 'react-relay'
import LoginMutation from '../mutations/LoginMutation'
import environment from '../Environment'

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      email: '',
      password: '',
      message: ''
    };
  }

  onSignIn() {
    LoginMutation.commit({
      environment,
      input: { 
        email: this.state.email, 
        password: this.state.password 
      }
    }).then(response => {
      this.props.navigation.navigate('SignedIn')
    }).catch(error => {
      this.setState({ message: error.message });
    });
  }
  
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <SafeAreaView style={styles.safeContainer}>
          <Logo />
          <View style={styles.formContainer}>
            <Text style={styles.error}>{ this.state.message }</Text>
            <TextInput style={styles.input} 
              placeholder='e-mail address' 
              placeholderTextColor='rgba(0, 0, 0, 0.2)' 
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType='email-address'
              onChangeText={(text) => this.setState({ email: text })}
            />
            <TextInput style={styles.input} 
              placeholder='password' 
              placeholderTextColor='rgba(0, 0, 0, 0.2)' 
              returnKeyType='go'
              secureTextEntry
              onChangeText={(text) => this.setState({ password: text })}
              ref={(input) => this.passwordInput = input}
            />
            <TouchableOpacity style={styles.button} 
              onPress={() => this.onSignIn()}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <Text 
              style={styles.link}
              onPress={() => this.props.navigation.navigate('SignUp')}>
              Don't have an account?
            </Text>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  safeContainer: {
    flexGrow: 1,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  formContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  error: {
    padding: 10,
    fontWeight: '500',
    color: 'red'
  },
  input: {
    alignSelf: 'stretch',
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    marginBottom: 10,
    padding: 5
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: 'black',
    alignItems: 'center',
    height: 40
  },
  buttonText: {
    paddingVertical: 10,
    color: 'white',
    fontWeight: '700'    
  },
  link: {
    padding: 10,
    fontWeight: '500',
    textDecorationLine: 'underline'
  }
});
