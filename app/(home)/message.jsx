import { Link, useLocalSearchParams, Stack, router } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, ImageBackground, TouchableOpacity, Keyboard } from 'react-native';

import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Chip from '@/components/chip';
import ChatSelect from '@/components/chat';
import AnnouncementCard, { ChatCard } from '@/components/chatcard';
import ForumCard from '@/components/forumcard';
import Channel from '@/components/channel';
import ChatInput from '@/components/input';

import Feather from '@expo/vector-icons/Feather';
import FA from '@expo/vector-icons/FontAwesome';
import FA6 from '@expo/vector-icons/FontAwesome6';
import MI from '@expo/vector-icons/MaterialIcons';
import MCI from '@expo/vector-icons/MaterialCommunityIcons';
import AD from '@expo/vector-icons/AntDesign';
import II from '@expo/vector-icons/Ionicons';
import ET from '@expo/vector-icons/Entypo';

import { messages } from '@/globalstates';

import { styles as globalstyles } from "@/styles/global";

import AmbarLogo from "@/assets/images/ambar.jpg"
import LitLogo from "@/assets/images/lit.jpg"
import LawLogo from "@/assets/images/balance.png"
import CCLogo from "@/assets/images/cc.png"

import PFPS from "@/assets/images/pfp.png"
import { msgDB, session, user } from '../../globalstates';
import { createID } from '../../utils';

export default function CommunityPage() {

    let [msgText, setMsg] = useState("");

    let [localMsg, setLocalMsg] = useState([]);

    let [messageUI, setMessageUI] = useState([]);

    let keyboardListeners = useRef([]);
    let [keybOffset, setKeybOffset] = useState(0);

    let { cid: cidS } = useLocalSearchParams();
    let [cid, setCid] = useState(Number.parseInt(cidS));
    let [channelType, setChannelType] = useState(null);
    let [channelName, setChannelName] = useState(null);
    let [channelMembers, setChannelMembers] = useState([]);
    let [channelIcon, setChannelIcon] = useState(null);


    useEffect(() => {

        keyboardListeners.current.push(
            Keyboard.addListener("keyboardDidShow", (evt) => {
                setKeybOffset(evt.endCoordinates.height);
            }),
            Keyboard.addListener("keyboardDidHide", (evt) => {
                setKeybOffset(0);  
            })
        )

        return () => {
            keyboardListeners.current[0].remove();
            keyboardListeners.current[1].remove();

            session.wsclient.regCallbacks.message = session.wsclient.regCallbacks.message.filter(m => m != onMessage);
        }
    }, [])

    useEffect(() => {
        if(typeof cid === 'number') {
            setLocalMsg(msgDB.getMessages(cid));

            if(cid === 0) {
                setChannelName(user.display_name + ' (You)');
                setChannelIcon(user.display_name);
                setChannelType(0);
                setChannelMembers([user])
            } else {
                
                let chan = user.channels.find(ch => ch.cid === cid);
                let chan_name = chan.channel_name;
                let chan_icon = null;
                if(chan.channel_type === 0) {
                    chan_name = chan.members.find(u => u.uid !== user.uid).display_name;
                    chan_icon = chan_name;
                };
                setChannelName(chan_name);
                setChannelIcon(chan_icon);
                setChannelType(chan.channel_type);
                setChannelMembers(chan.members);
            }
        }

        session.wsclient.regCallbacks.message.push(onMessage);
    }, [cid]);

    let onMessage = data => {
        if(data.cid === cid) {
            setLocalMsg(lms => {
                let nlms = [...lms];
                nlms.push(
                    data
                );
                return nlms
            })
        }
    }

    useEffect(() => {
        createMessageUI(localMsg);
    }, [localMsg]);

    let createMessageUI = (msgs) => {
        let comps = [];

        for(let i = 0; i < msgs.length; i++) {
            let msg = msgs[i];

            let uiCard;

            if(msg.type === 0) {
                let memb = channelMembers.find(mem => mem.uid === msg.uid);
                uiCard = 
                    <ChatCard
                        author={memb.display_name}
                        content={msg.content}
                        nameColor={"maroon"}
                        avatar={memb.display_name[0].toUpperCase()}
                        self={msg.uid === user.uid}
                        key={msg.mid}
                    />;
            }

            if(msg.uid === user.uid && msg.type === 0) {
                comps.push(
                    <View style={[globalstyles.row, {alignSelf: "flex-end"}]} key={msg.mid}>
                        {uiCard}
                    </View>
                )
            } else {
                comps.push(uiCard)
            }
        }

        setMessageUI(comps);
    }

    let sendMessage = () => {
        let msgData = {
            mid: createID(),
            cid: cid,
            uid: user.uid,
            content: msgText,
            reply_id: null,
            date: new Date(),
            type: 0,
            self: false
        };

        session.wsclient.sendCmd({type: 3, data: msgData}).then(res => {
            if(!res.error) {
                console.log("msg sent", res);
                msgData.self = true;
                msgDB.addMessage(msgData);
            }
        });


        setMsg("");

        setLocalMsg(lms => {
            let nlms = [...lms];
            msgData.self = true;
            nlms.push(
                msgData
            );
            return nlms
        })
    }

    return (
    <SafeAreaProvider>
      <SafeAreaView style={[globalstyles.column, globalstyles.center, {width: "100%"}]}>
        <Stack.Screen options={{headerShown: false, contentStyle: {backgroundColor: "white"}}}/>
        <StatusBar style='auto' animated={true} hideTransitionAnimation='slide'/>
        
        <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 10}]}>
          <View style={[globalstyles.row, globalstyles.center, {width: "100%", justifyContent: "space-between"}]}>
            <View style={[globalstyles.row, globalstyles.center, {gap: 10}]}>
              <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", backgroundColor: "rebeccapurple", borderRadius: 100, width: 35, aspectRatio: 1, position: "relative", top: 0, marginTop: -0}]}>
                <Text style={[{fontFamily: "GSF", color: "white", fontSize: 20}]}>{channelIcon? channelIcon[0].toUpperCase() : "A"}</Text>
              </View>
              <View style={[globalstyles.column, {justifyContent: "center", marginTop: -0}]}>
                <Text style={{fontSize: 17, fontFamily: "GSF", fontWeight: ""}}>{channelName}</Text>
                <Text style={{fontSize: 12, fontFamily: "GSF", fontWeight: "", color: "grey", marginTop: -1, display: "none"}}>Online</Text>
              </View>
            </View>
            <View style={[globalstyles.row, globalstyles.center, {gap: 15}]}>
              {/* <MI name='share' size={15}/> */}
              <FA6 name='user-group' size={14}/>
              <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", borderRadius: 50, aspectRatio: 1, height: 22, backgroundColor: "maroon"}]}>
                <Text style={{color: "white"}}>A</Text>
                {/* <Image source={PFPS} style={[{width: "100%", height: "100%", borderRadius: 50}]}/> */}
              </View>
              <ET name='dots-three-vertical' size={12} color={"black"}/>
            </View>
          </View>
        </View>


        <View style={[globalstyles.column, {width: "100%", height: "100%", borderTopColor: "rgba(204, 204, 204, 1)", borderTopWidth: .5, marginTop: 10}]}>

            <ScrollView style={[globalstyles.column, {width: "100%", marginTop: 0, flex: 1}]} contentContainerStyle={[globalstyles.column, {paddingBottom: 200 && 620}]}>
            
            <View style={[globalstyles.column, globalstyles.center, {width: "100%", marginTop: 15}]}>
            
                <View style={[globalstyles.column, globalstyles.center, {width: "100%", paddingHorizontal: 0, gap: 10}]}>

                    <Text style={[{fontFamily: "GSF", fontSize: 13, color: "black", marginTop: 0}]}>Today</Text>
                  
                    {messageUI}

                </View>

            </View>

            </ScrollView>

            <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 10, paddingBottom: keybOffset + 120, minHeight: 210, backgroundColor: "transparent", borderTopColor: "rgba(0, 0, 0, 0.15)", borderTopWidth: 0, position: "absolute", bottom: 0, display: channelType !== 2? "flex" : "none"}]}>
                <View style={[globalstyles.row, {width: "100%"}]}>
                    <ChatInput value={msgText} onChangeText={t => setMsg(t)}/>
                    <TouchableOpacity onPress={() => sendMessage()}>
                        <View style={[globalstyles.row, globalstyles.center, {marginLeft: 5, marginTop: 0, alignSelf: "flex-start", justifyContent: "center", padding: 11, aspectRatio: 1, borderRadius: 100, borderWidth: 0, borderColor: "black", backgroundColor: "maroon"}]}>
                            <View style={[{position: "relative", left: -1}]}>
                                <Feather name='send' size={13} color={"white"} style={[]}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  
});
