import { Link } from 'expo-router';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, ImageBackground } from 'react-native';

import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Chip from '../../components/chip';
import { CommunityMiniCard } from '../../components/comm';

import Feather from '@expo/vector-icons/Feather';
import FA from '@expo/vector-icons/FontAwesome';
import MI from '@expo/vector-icons/MaterialIcons';
import II from '@expo/vector-icons/Ionicons';

import { styles as globalstyles } from "../../styles/global";

import AmbarLogo from "../../assets/images/ambar.jpg"
import LitLogo from "../../assets/images/lit.jpg"
import LawLogo from "../../assets/images/balance.png"
import CCLogo from "../..//assets/images/cc.png"

import PFPS from "../../assets/images/pfp.png"

export default function HomeScreen() {
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
              <Text style={{fontSize: 20, fontFamily: "GSF", fontWeight: ""}}>My Space</Text>
            </View>
            <View style={[globalstyles.row, globalstyles.center, {gap: 15}]}>
              <MI name='add' size={20}/>
              <MI name='settings' size={18}/>
              <MI name='notifications' size={18}/>
              <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", borderRadius: 50, aspectRatio: 1, height: 22, backgroundColor: "maroon"}]}>
                {/* <Text style={{color: "white"}}>A</Text> */}
                <Image source={PFPS} style={[{width: "100%", height: "100%", borderRadius: 50}]}/>
              </View>
            </View>
          </View>
        </View>

        <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 10, paddingBottom: 10}]}>
          <View style={[globalstyles.row, globalstyles.center, {width: "100%", backgroundColor: "whitesmoke", paddingVertical: 2, paddingHorizontal: 10, borderRadius: 10}]}>
            <FA name='search' style={{paddingLeft: 5, color: "grey"}}/>
            <TextInput style={[{width: "100%", fontSize: 15, paddingLeft: 10, fontFamily: "GSF"}]} placeholder='Search your space'/>
          </View>
        </View>

        <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 0}]}>
          <View style={[globalstyles.row, {width: "100%", gap: 10, flexWrap: "wrap"}]}>
            <View style={[globalstyles.row, globalstyles.center, {width: "100%", backgroundColor: "maroon", gap: 7, justifyContent: "center", paddingVertical: 10, borderRadius: 100}]}>
              <II name='home' color={"white"} size={12}/>
              <Text style={[{color: "white", fontFamily: "GSF", fontSize: 13}]}>Create Community</Text>
            </View>
            <View style={[globalstyles.row, globalstyles.center, {width: "48%", backgroundColor: "rgba(255, 216, 194, 1)", borderWidth: 0, borderColor: "maroon", gap: 5, justifyContent: "center", paddingVertical: 10, borderRadius: 100, borderTopLeftRadius: 100, borderBottomLeftRadius: 100}]}>
              <MI name='add' color={"maroon"} size={13}/>
              <Text style={[{color: "maroon", fontFamily: "GSF", fontSize: 13}]}>Add Friend</Text>
            </View>
            <View style={[globalstyles.row, globalstyles.center, {width: "48%", backgroundColor: "rgba(255, 216, 194, 0)", borderWidth: .5, borderColor: "maroon", gap: 5, justifyContent: "center", paddingVertical: 10, borderRadius: 100, borderTopRightRadius: 100, borderBottomRightRadius: 100}]}>
              <MI name='group' color={"maroon"} size={13}/>
              <Text style={[{color: "maroon", fontFamily: "GSF", fontSize: 13}]}>Create Group</Text>
            </View>
          </View>
        </View>

        <ScrollView style={[globalstyles.column, {width: "100%"}]} contentContainerStyle={[globalstyles.column, {paddingBottom: 200}]}>
        
          <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 10}]}>

            <Text style={[{fontWeight: "600", fontSize: 20}]}>Your</Text>

            {/* <View style={[globalstyles.row, globalstyles.center, {paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "rgba(255, 216, 194, 1)", alignSelf: "flex-start", borderRadius: 20}]}> */}
            <View style={[globalstyles.row, globalstyles.center, {paddingHorizontal: 0, paddingVertical: 0, backgroundColor: "rgba(255, 216, 194, 0)", justifyContent: "space-between", marginTop: 5}]}>
              <View style={[globalstyles.row, globalstyles.center, {gap: 10}]}>
                <Chip name={"Communities"} selected={true}/>
                <Chip name={"Forums"} selected={false}/>
                <Chip name={"Friends"} selected={false}/>
              </View>
              <View style={[globalstyles.row, globalstyles.center, {paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "rgba(255, 216, 194, 1)" && "whitesmoke", alignSelf: "flex-start", borderRadius: 20, display: "none"}]}>
                <Text style={{fontSize: 11, fontWeight: 500, color: "rgba(255, 216, 194, 1)" && "black"}}>Show All</Text>
              </View>
            </View>
            {/* </View> */}
            <View style={[globalstyles.row, {width: "100%", marginTop: 15, flexWrap: "wrap", justifyContent: "space-between", rowGap: 20}]}>
              
              <CommunityMiniCard 
                name={"Ambar"} 
                sdesc={<Text>The <Text style={[{color: "gold", fontWeight: 500}]}>LGBTQIA+</Text> Resource & Ally group of IIT Kharagpur</Text>}
                logo={AmbarLogo}
                dark = {true}
                color={"black"} protect={true} members={131} online={31}/>

              <CommunityMiniCard 
                name={"Coding Cosmos"} 
                sdesc={"Community for all developers at IIT Kharagpur"}
                logo={CCLogo}
                dark = {true}
                color={"rebeccapurple"} members={1310} online={423}/>

              <CommunityMiniCard 
                name={"Gymkhana"} 
                sdesc={"Discuss any and everything about all different activites and events happening at IIT Kharagpur"}
                logo={null}
                dark = {false}
                color={"rgba(255, 196, 0, 1)"} members={3310} online={411}/>

              <CommunityMiniCard 
                name={"School of Lawyers"} 
                sdesc={"Space for all the future lawyers coming from IIT Kharagpur's Rajiv Gandhi School of Intellectual Property Law and everyone interested!"}
                logo={LawLogo}
                dark = {true}
                color={"maroon"} members={310} online={111}/>

            </View>
          </View>

        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  
});
