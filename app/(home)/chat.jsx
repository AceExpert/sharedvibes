import { Link } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, ImageBackground } from 'react-native';

import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Chip from '../../components/chip';
import ChatSelect from '../../components/chat';

import Feather from '@expo/vector-icons/Feather';
import FA from '@expo/vector-icons/FontAwesome';
import MI from '@expo/vector-icons/MaterialIcons';
import AD from '@expo/vector-icons/AntDesign';
import II from '@expo/vector-icons/Ionicons';
import ET from '@expo/vector-icons/Entypo';

import { styles as globalstyles } from "../../styles/global";

import AmbarLogo from "../../assets/images/ambar.jpg"
import LitLogo from "../../assets/images/lit.jpg"
import LawLogo from "../../assets/images/balance.png"
import CCLogo from "../..//assets/images/cc.png"

import PFPS from "../../assets/images/pfp.png"

export default function HomeScreen() {

  let [chatCateg, setChatCateg] = useState([['All', 1], ['Unread', 0], ['Friends', 0], ['Groups', 0], ['Favorites', 0]]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[globalstyles.column, globalstyles.center, {width: "100%"}]}>
        <StatusBar style='auto' animated={true} hideTransitionAnimation='slide'/>
        
        <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 10}]}>
          <View style={[globalstyles.row, globalstyles.center, {width: "100%", justifyContent: "space-between"}]}>
            <View style={[globalstyles.row, globalstyles.center, {gap: 10}]}>
              <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", position: "relative", top: 1, marginTop: -0}]}>
                <MI name='dark-mode' size={15} color={'rgba(255, 200, 49, 1)'}/>
              </View>
              <Text style={{fontSize: 20, fontFamily: "GSF", fontWeight: ""}}>Chat</Text>
            </View>
            <View style={[globalstyles.row, globalstyles.center, {gap: 15}]}>
              <MI name='settings' size={18}/>
              <MI name='notifications' size={18}/>
              <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", borderRadius: 50, aspectRatio: 1, height: 22, backgroundColor: "maroon"}]}>
                {/* <Text style={{color: "white"}}>A</Text> */}
                <Image source={PFPS} style={[{width: "100%", height: "100%", borderRadius: 50}]}/>
              </View>
              <ET name='dots-three-vertical' size={12} color={"black"}/>
            </View>
          </View>
        </View>

        <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 10, paddingBottom: 10}]}>
          <View style={[globalstyles.row, globalstyles.center, {width: "100%", backgroundColor: "whitesmoke", paddingVertical: 2, paddingHorizontal: 10, borderRadius: 10}]}>
            <FA name='search' style={{paddingLeft: 5, color: "grey"}}/>
            <TextInput style={[{width: "100%", fontSize: 15, paddingLeft: 10, fontFamily: "GSF"}]} placeholder='Search chats'/>
          </View>
        </View>

        <View style={[globalstyles.row, {width: "100%"}]}>

          <ScrollView style={[{width: "auto"}, globalstyles.row]} contentContainerStyle={[globalstyles.row, globalstyles.center, {paddingHorizontal: 20, paddingVertical: 0, backgroundColor: "rgba(255, 216, 194, 0)", justifyContent: "space-between"}]}>
              <View style={[globalstyles.row, globalstyles.center, {gap: 10, width: "auto"}]}>
                {chatCateg.map(v => {
                  return (
                    <Chip name={v[0]} selected={v[1]} onClick={() => {
                      let nCateg = [];
                      for(let i = 0; i < chatCateg.length; i++) {
                        nCateg.push([chatCateg[i][0], v[0] === chatCateg[i][0]])
                      };
                      setChatCateg(nCateg);
                    }}/>
                  )
                })}
              </View>
              <View style={[globalstyles.row, globalstyles.center, {paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "rgba(255, 216, 194, 1)", alignSelf: "flex-start", borderRadius: 20, display: "none"}]}>
                  <Text style={{fontSize: 11, fontWeight: 500, color: "rgba(255, 216, 194, 1)" && "maroon"}}>Show All</Text>
              </View>
          </ScrollView>

        </View>

        <ScrollView style={[globalstyles.column, {width: "100%"}]} contentContainerStyle={[globalstyles.column, {paddingBottom: 200}]}>
        
          <View style={[globalstyles.column, {width: "100%", marginTop: 10}]}>
          
            <ChatSelect name={"You"} avatar={PFPS} message={"Some message I sent to myself"} self={false}/>
            <ChatSelect name={"Someone"} avatar={"S"} message={"There is Blood donation on 7 Feb"} self={true}/>
            <ChatSelect name={"Anora"} avatar={"A"} acolor={"rebeccapurple"} message={"We need to give presentation tomorrow"} self = {true} />
            <ChatSelect name={"Sputh"} avatar={"SP"} acolor={"green"} message={"We are meeting tomorrow"} self = {false} />


          </View>

        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  
});
