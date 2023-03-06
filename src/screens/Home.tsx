import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      await onAuthStateChanged(auth, (user) => {
        if (!user) {
          navigation.navigate('Login');
        }
        console.log(`process.env.APIKEY ✅🥲 👉`, process.env.APIKEY);
        setUser(user);
      });
    })();
  }, []);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (err) {
      console.log(`err ✅🥲 👉`, err);
    }
  };
  return (
    <View className="flex-1 justify-center items-center p-8">
      <Text className=" ">User ID: {user?.uid}</Text>
      <Text className=" ">Email: {user?.email}</Text>
      <TouchableOpacity
        className="bg-red-400 w-full rounded flex justify-center items-center m-1"
        onPress={logoutHandler}
      >
        <Text className="text-white text-base p-2">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
