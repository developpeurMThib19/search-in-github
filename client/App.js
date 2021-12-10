import { useState } from 'react';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const fetchUser = async (username) => {
    const { API_URL = "http://localhost:8000" } = process.env;
    console.log(API_URL)
    const response = await fetch(`${API_URL}/api/users/${username}`);
    const data = await response.json();
    console.log(data);
    return data;
  }
  const [image, set_image] = useState("");
  const [nom, set_nom] = useState("");
  const [login, set_login] = useState("");
  const [repositirie, set_repositirie] = useState("");
  const [following, set_following] = useState("");

  let input_user;

  return (
    <View style={styles.globalContainer}>
      <TextInput style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="User"
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
        onChangeText={(text) => {
          input_user = text;
        }} />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={async () => {
          const jsondata = await fetchUser(input_user);
          try {
            set_image(jsondata.data.user.avatar_url);
            set_nom(`nom: ${jsondata.data.user.nom}`);
            set_repositirie(`Repositories: ${jsondata.data.user.public_repositirie}`);
            set_following(`following: ${jsondata.data.user.following}`);
            set_login(`${jsondata.data.user.login}`);
          } catch (e) {
            console.log("error");
          }
        }
        }
      >
        <Text style={styles.submitButtonText}> Fetch User! </Text>
      </TouchableOpacity>
      <View style={styles.userContainer}>
        <Text style={styles.loginText}> {login} </Text>
        <Image key={Date.now()} source={{ uri: image }}
          style={{ width: 200, height: 200, borderRadius: "50%" }}
        />
        <Text style={styles.userText}> {nom} </Text>
        <Text style={styles.userText}> {repositirie} </Text>
        <Text style={styles.userText}> {following} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'aligned',
  },
  globalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#da2f1b',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#da2f1b',
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: 'white'
  },
  userText: {
    color: 'black'
  },
  loginText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black'
  }
});