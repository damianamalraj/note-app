import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpHandler = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (err) {
      console.log(`err ✅🥲 👉`, err);
    }
  };

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View className="border bg-red-400 flex-1 justify-center items-center p-8">
      <TextInput
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="username"
        className="border p-2 pb-3 text-base bg-white rounded w-full"
        onChange={(e) => {
          setEmail(e.nativeEvent.text);
        }}
      />
      <TextInput
        autoCapitalize={'none'}
        autoCorrect={false}
        secureTextEntry={true}
        textContentType={'password'}
        placeholder="Password"
        className="border p-2 pb-3 text-base bg-white rounded w-full"
        onChange={(e) => {
          setPassword(e.nativeEvent.text);
        }}
      />
      <TouchableOpacity
        className="bg-blue-400 w-full rounded flex justify-center items-center m-1"
        onPress={signUpHandler}
      >
        <Text className="text-white text-base p-2 ">SignUp</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-white border-2 border-blue-400 w-full rounded flex justify-center items-center m-1"
        onPress={() => {
          console.log('pressed');
          navigation.navigate('Login');
        }}
      >
        <Text className="text-black text-base p-2 ">Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
