import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Feather from '@expo/vector-icons/Feather';
import FA from '@expo/vector-icons/FontAwesome';
import MI from '@expo/vector-icons/MaterialIcons';
import II from '@expo/vector-icons/Ionicons';

import { styles as globalstyles } from '../../styles/global';

import PFPS from "../../assets/images/pfp.png"

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={[globalstyles.column, {width: "100%", height: "100%", position: "relative"}]}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false, contentStyle: {backgroundColor: "white"} }} />
          <Stack.Screen name="my" options={{ headerShown: false, contentStyle: {backgroundColor: "white"} }} />
          <Stack.Screen name="chat" options={{ headerShown: false, contentStyle: {backgroundColor: "white"} }} />
        </Stack>

        <View style={[globalstyles.row, globalstyles.center, {width: "100%", height: 100, backgroundColor: "transparent", alignSelf: "center", paddingHorizontal: 0, position: "absolute", bottom: 0, paddingBottom: 0}]}>
          <View style={[globalstyles.row, {width: "100%", justifyContent: "space-around", height: "100%", backgroundColor: "white", alignSelf: "center", borderRadius: 0, borderTopColor: "rgba(107, 107, 107, 1)", borderTopWidth: .3, paddingHorizontal: 20, paddingTop: 15}]}>
            <TouchableOpacity onPress={() => router.navigate("/")} style={{flex: 1, height: "100%", alignItems: "center"}}>
              <II name='search' size={20}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate("/chat")} style={{flex: 1, height: "100%", alignItems: "center"}}>
              <Feather name='send' size={20}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate("/chat")} style={{flex: 1, height: "100%", alignItems: "center"}}>
              <Feather name='calendar' size={20}/>
            </TouchableOpacity>
            {/* <FA name='taxi' size={20}/> */}
            <TouchableOpacity onPress={() => router.navigate("/my")} style={{flex: 1, height: "100%", alignItems: "center"}}>
              <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", borderRadius: 50, aspectRatio: 1, height: 22, backgroundColor: "maroon"}]}>
                <Image source={PFPS} style={[{width: "100%", height: "100%", borderRadius: 50}]}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate("/chat")} style={{flex: 1, height: "100%", alignItems: "center"}}>
              <Feather name='menu' size={20}/>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    </ThemeProvider>
  );
}
