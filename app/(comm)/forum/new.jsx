import { Link, useLocalSearchParams, Stack } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, ImageBackground } from 'react-native';

import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Chip from '../../../components/chip';
import ChatSelect from '../../../components/chat';
import AnnouncementCard, { ChatCard } from '../../../components/chatcard';
import ForumCard from '../../../components/forumcard';
import Channel from '../../../components/channel';
import ChatInput from '../../../components/input';

import Feather from '@expo/vector-icons/Feather';
import FA from '@expo/vector-icons/FontAwesome';
import FA6 from '@expo/vector-icons/FontAwesome6';
import MI from '@expo/vector-icons/MaterialIcons';
import MCI from '@expo/vector-icons/MaterialCommunityIcons';
import AD from '@expo/vector-icons/AntDesign';
import II from '@expo/vector-icons/Ionicons';
import ET from '@expo/vector-icons/Entypo';

import { messages } from '../../../globalstates';

import { styles as globalstyles } from "../../../styles/global";

import AmbarLogo from "../../../assets/images/ambar.jpg"
import LitLogo from "../../../assets/images/lit.jpg"
import LawLogo from "../../../assets/images/balance.png"
import CCLogo from "../../../assets/images/cc.png"

import PFPS from "../../../assets/images/pfp.png"

export default function CommunityPage() {

    let [channelType, setChannelType] = useState(null);
    let [channelId, setChannelId] = useState(null);

    let [params, setParams] = useState(useLocalSearchParams());

    let [addressBar, setAddressBar] = useState(['Forums', 'General', 'title'])

    useEffect(() => {

    }, []);

    return (
    <SafeAreaProvider>
      <SafeAreaView style={[globalstyles.column, globalstyles.center, {width: "100%"}]}>
        <Stack.Screen options={{headerShown: false, contentStyle: {backgroundColor: "white"}}}/>
        <StatusBar style='auto' animated={true} hideTransitionAnimation='slide'/>
        
        <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 10}]}>
          <View style={[globalstyles.row, globalstyles.center, {width: "100%", justifyContent: "space-between"}]}>
            <View style={[globalstyles.row, globalstyles.center, {gap: 10}]}>
              <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", position: "relative", top: 1, marginTop: -0}]}>
                <Image source={AmbarLogo} style={[{aspectRatio: 1, width: 45, borderRadius: 7}]}/>
              </View>
              <View style={[globalstyles.column, {justifyContent: "center", marginTop: -0}]}>
                <Text style={{fontSize: 20, fontFamily: "GSF", fontWeight: ""}}>Ambar</Text>
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

        <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 8}]}>
            <View style={[globalstyles.row, globalstyles.center]}>
                <Text style={[{fontFamily: "GSF", fontSize: 16, color: "maroon"}]}>New Post</Text>
            </View>
            <View style={[globalstyles.row, globalstyles.center, {gap: 2, marginTop: 5}]}>
                {(() => {
                    let comps = [];
                    for(let i = 0; i < addressBar.length; i++) {
                        let isLast = i === (addressBar.length - 1);
                        comps.push(<Text style={[{fontFamily: "GSF", color: isLast? "black" : "grey"}]}>{addressBar[i]}</Text>);
                        if(!isLast) {
                            comps.push(<View style={[{position: "relative", top: 1}]}>
                                            <ET name={'chevron-small-right' || 'triangle-right'} size={15} color={"black"}/>
                                        </View>);
                        };
                    };
                    return comps;
                })()}
            </View>

        </View>

        <View style={[globalstyles.column, {width: "100%", height: "100%", borderTopColor: "rgba(204, 204, 204, 1)", borderTopWidth: .5, marginTop: 10}]}>

            <ScrollView style={[globalstyles.column, {width: "100%", marginTop: 0, flex: 1}]} contentContainerStyle={[globalstyles.column, {paddingBottom: 200 && 620}]}>
            
            <View style={[globalstyles.column, globalstyles.center, {width: "100%", marginTop: 15}]}>
            
                <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 15, gap: 10}]}>

                    {/* <Text style={[{fontFamily: "GSF"}]}>Enter title for your forum</Text> */}
                    <View style={[globalstyles.row, globalstyles.center, {borderRadius: 10, backgroundColor: "transparent", borderWidth: .0, borderColor: "rgba(0, 0, 0, 0.24)", width: "100%"}]}>
                        <TextInput placeholder='Enter title here...' style={[{paddingHorizontal: 20, fontSize: 20, paddingVertical: 15, fontWeight: 700, width: "100%"}]} multiline={true}/>
                    </View>

                    <View style={[globalstyles.row, globalstyles.center, {borderRadius: 10, backgroundColor: "transparent", borderWidth: .0, borderColor: "rgba(0, 0, 0, 0.24)", width: "100%"}]}>
                        <TextInput placeholder='Tags' style={[{paddingHorizontal: 20, paddingVertical: 15, fontFamily: "GSF", width: "100%"}]}/>
                    </View>

                    <View style={[globalstyles.row, {borderRadius: 10, backgroundColor: "transparent", width: "100%"}]}>
                        <TextInput placeholder='Enter details here...' style={[{paddingHorizontal: 20, paddingVertical: 15, fontSize: 16, fontFamily: "GSF", width: "100%"}]} multiline={true}/>
                    </View>

                </View>

            </View>

            </ScrollView>

            <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 10, minHeight: 430, backgroundColor: "transparent", borderTopColor: "rgba(0, 0, 0, 0.15)", borderTopWidth: 0, position: "absolute", bottom: 0, display: channelType === 2? "flex" : "none"}]}>
                <View style={[globalstyles.row, globalstyles.center, {gap: 5, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 100, backgroundColor: "maroon", alignSelf: "flex-end"}]}>
                    <View style={[globalstyles.row, globalstyles.center, {gap: 5}]}>
                        <MI name="add" size={15} color={"white"} />
                        <Text style={[{color: "white", fontFamily: "GSF", fontSize: 15}]}>Create Post</Text>
                    </View>
                </View>
            </View>

            <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 10, minHeight: 230, backgroundColor: "transparent", borderTopColor: "rgba(0, 0, 0, 0.15)", borderTopWidth: 0, position: "absolute", bottom: 0, display: channelType !== 2? "flex" : "none"}]}>
                <View style={[globalstyles.row, {width: "100%"}]}>
                    <ChatInput />
                    <View style={[globalstyles.row, globalstyles.center, {marginLeft: 5, marginTop: 0, alignSelf: "flex-start", justifyContent: "center", padding: 11, aspectRatio: 1, borderRadius: 100, borderWidth: 0, borderColor: "black", backgroundColor: "maroon"}]}>
                        <View style={[{position: "relative", left: -1}]}>
                            <Feather name='send' size={13} color={"white"} style={[]}/>
                        </View>
                    </View>
                </View>
            </View>

        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  
});
