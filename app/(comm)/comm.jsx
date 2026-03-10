import { Link, router } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, ImageBackground } from 'react-native';

import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Chip from '../../components/chip';
import ChatSelect from '../../components/chat';
import Channel from '../../components/channel';

import Feather from '@expo/vector-icons/Feather';
import FA from '@expo/vector-icons/FontAwesome';
import FA6 from '@expo/vector-icons/FontAwesome6';
import MI from '@expo/vector-icons/MaterialIcons';
import MCI from '@expo/vector-icons/MaterialCommunityIcons';
import AD from '@expo/vector-icons/AntDesign';
import II from '@expo/vector-icons/Ionicons';
import ET from '@expo/vector-icons/Entypo';

import { communityData } from '../../globalstates';

import { styles as globalstyles } from "../../styles/global";

import AmbarLogo from "../../assets/images/ambar.jpg"
import LitLogo from "../../assets/images/lit.jpg"
import LawLogo from "../../assets/images/balance.png"
import CCLogo from "../..//assets/images/cc.png"

import PFPS from "../../assets/images/pfp.png"

export default function CommunityPage() {

    let [commId, setCommId] = useState(100);
    let [commChannels, setCommChannels] = useState({});
    let [commData, setCommData] = useState({});

    let [showUpdates, setSU] = useState(true);
    let [showChat, setSC] = useState(true);
    let [showForums, setSF] = useState(true);

    useEffect(() => {
        let comm = communityData.find(v => v.id === commId);
        setCommData(comm);
        setCommChannels(comm.channels);
    }, [])

    return (
    <SafeAreaProvider>
      <SafeAreaView style={[globalstyles.column, globalstyles.center, {width: "100%"}]}>
        <StatusBar style='auto' animated={true} hideTransitionAnimation='slide'/>
        
        <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 10}]}>
          <View style={[globalstyles.row, globalstyles.center, {width: "100%", justifyContent: "space-between"}]}>
            <View style={[globalstyles.row, globalstyles.center, {gap: 10}]}>
              <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", position: "relative", top: 1, marginTop: -0}]}>
                <Image source={commData?.logo} style={[{aspectRatio: 1, width: 45, borderRadius: 7}]}/>
              </View>
              <View style={[globalstyles.column, {justifyContent: "center", marginTop: -0}]}>
                <Text style={{fontSize: 20, fontFamily: "GSF", fontWeight: ""}}>{commData?.name}</Text>
                <Text style={{fontSize: 12, fontFamily: "GSF", fontWeight: "", color: "grey", marginTop: -1}}>10 Online</Text>
              </View>
            </View>
            <View style={[globalstyles.row, globalstyles.center, {gap: 15}]}>
              <MI name='share' size={15}/>
              <FA6 name='user-group' size={14}/>
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
            <TextInput style={[{width: "100%", fontSize: 15, paddingLeft: 10, fontFamily: "GSF"}]} placeholder='Search Ambar'/>
          </View>
        </View>

        <View style={[globalstyles.row, {width: "100%"}]}>

          <ScrollView style={[{width: "auto"}, globalstyles.row]} contentContainerStyle={[globalstyles.row, globalstyles.center, {paddingHorizontal: 20, paddingVertical: 0, backgroundColor: "rgba(255, 216, 194, 0)", justifyContent: "space-between"}]}>
              <View style={[globalstyles.row, globalstyles.center, {gap: 10, width: "auto"}]}>
                  <Chip name={"All"} selected={true}/>
                  <Chip name={"Unread"} selected={false}/>
                  <Chip name={"Announcements"} selected={false}/>
                  <Chip name={"Chat"} selected={false}/>
                  <Chip name={"Voice Chat"} selected={false}/>
                  <Chip name={"Forums"} selected={false}/>
              </View>
              <View style={[globalstyles.row, globalstyles.center, {paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "rgba(255, 216, 194, 1)", alignSelf: "flex-start", borderRadius: 20, display: "none"}]}>
                  <Text style={{fontSize: 11, fontWeight: 500, color: "rgba(255, 216, 194, 1)" && "maroon"}}>Show All</Text>
              </View>
          </ScrollView>

        </View>

        <ScrollView style={[globalstyles.column, {width: "100%"}]} contentContainerStyle={[globalstyles.column, {paddingBottom: 200}]}>
        
          <View style={[globalstyles.column, {width: "100%", marginTop: 15}]}>
          
            <View style={[globalstyles.column, {width: "100%", gap: 15}]}>
                <View style={[globalstyles.column, {gap: 5, display: commChannels.updates?.length ? "flex" : "none"}]}>
                    
                    <View style={[globalstyles.row, globalstyles.center, {gap: 10, paddingHorizontal: 20, width: "100%"}]}>
                        <ET name='chevron-thin-down' size={16} color={"grey"}/>
                        <Text style={[{fontWeight: "600", fontSize: 18, fontFamily: "GSF"}]}>Announcements</Text>
                    </View>
                    <View style={[globalstyles.column, {gap: 0}]}>
                        {commChannels.updates?.map(v => {
                            return (
                                <Channel IconClass={MCI} icon={"bullhorn-variant"} name={v.name}/>
                            )
                        })}
                    </View>
                </View>

                <View style={[globalstyles.column, {gap: 5}]}>
                    <View style={[globalstyles.row, globalstyles.center, {gap: 10, paddingHorizontal: 20, width: "100%"}]}>
                        <ET name='chevron-thin-down' size={16} color={"grey"}/>
                        <Text style={[{fontWeight: "600", fontSize: 18, fontFamily: "GSF"}]}>Chat</Text>
                    </View>
                    <View style={[globalstyles.column, {gap: 0}]}>
                        {commChannels.chats?.map(v => {
                            return (
                                <Channel IconClass={II} icon={"send"} name={v.name} onClick={() => router.navigate({pathname: "/chat/Chat/" + v.name, params: {commId, commChannels: JSON.stringify(commChannels)}})}/>
                            )
                        })}
                    </View>
                </View>

                <View style={[globalstyles.column, {gap: 10}]}>
                    <View style={[globalstyles.row, globalstyles.center, {gap: 10, paddingHorizontal: 20, width: "100%"}]}>
                        <ET name='chevron-thin-down' size={16} color={"grey"}/>
                        <Text style={[{fontWeight: "600", fontSize: 18, fontFamily: "GSF"}]}>Forums</Text>
                    </View>
                    <View style={[globalstyles.column, {gap: 0}]}>
                        {commChannels.forums?.map(v => {
                            return (
                                <Channel IconClass={MCI} icon={"forum"} name={v.name} onClick={() => router.navigate({pathname: "/chat/Forums/" + v.name, params: {commId, commChannels: JSON.stringify(commChannels)}})}/>
                            )
                        })}
                    </View>
                </View>

            </View>

          </View>

        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  
});
