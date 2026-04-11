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
import { forumData, msgDB, session, user } from '../../globalstates';
import { createID } from '../../utils';

export default function CommunityPage() {

    let [msgText, setMsg] = useState("");

    let [localMsg, setLocalMsg] = useState([]);

    let [messageUI, setMessageUI] = useState([]);

    let keyboardListeners = useRef([]);
    let [keybOffset, setKeybOffset] = useState(0);

    let { fid: fidS } = useLocalSearchParams();
    let [fid, setFid] = useState(Number.parseInt(fidS));
    let [channelType, setChannelType] = useState(null);
    let [channelName, setChannelName] = useState(null);
    let [forumDescription, setFDesc] = useState(null);
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

            session.wsclient.regCallbacks.message = session.wsclient.regCallbacks.message.filter(m => m != onThread);
        }
    }, [])

    useEffect(() => {
        if(typeof fid === 'number') {
            // setLocalMsg(msgDB.getMessages(cid));

            session.wsclient.getForumThreads(fid).then(t => setLocalMsg(t));

            if(fid === 0) {
                setChannelName(user.display_name + ' (You)');
                setChannelIcon(user.display_name);
                setChannelType(0);
                setChannelMembers([user])
            } else {
                
                let chan = forumData.find(ch => ch.fid === fid);
                let chan_name = chan.name;
                let chan_icon = null;
                chan_icon = chan_name;
                setChannelName(chan_name);
                setChannelIcon(chan_icon);
                setFDesc(chan.description);
            }
        }

        session.wsclient.regCallbacks.thread.push(onThread);
    }, [fid]);

    let onThread = data => {
        if(data.fid === fid) {
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

            let uiCard = 
                    <ForumCard 
                        title={msg.name}
                        content={msg.description}
                        tags={[]}
                        upvotes={0}
                        downvotes={0}
                        comments={0}
                        avatar={msg.user.display_name[0].toUpperCase()}
                        author={msg.user.user_id}
                        date={null}
                        key={msg.tid}
                        onPress={() => router.navigate("/new?fid="+fid+"&tid="+msg.tid+"&thread="+JSON.stringify(msg))}
                    />;
            
            comps.push(uiCard);
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
                msgDB.addMessage(cid, msgData);
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
        
        <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10, backgroundColor: "white"}]}>
          <View style={[globalstyles.row, globalstyles.center, {width: "100%", justifyContent: "space-between"}]}>
            <View style={[globalstyles.row, globalstyles.center, {gap: 10}]}>
              
              <View style={[globalstyles.column, {justifyContent: "center", marginTop: -0}]}>
                <Text style={{fontSize: 17, fontFamily: "GSF", fontWeight: ""}}>{channelName}</Text>
              </View>
            </View>
            <View style={[globalstyles.row, globalstyles.center, {gap: 15}]}>
                <TouchableOpacity style={[globalstyles.row, {marginRight: -3}]} onPress={() => router.navigate("/new?fid="+fid)}>
                    <View style={[globalstyles.row, globalstyles.center, {backgroundColor: "maroon", borderRadius: 100, paddingHorizontal: 11, paddingVertical: 6}]}>
                        <MI name='edit' size={13} color={"white"}/>
                        <Text style={[{fontFamily: "GSF", paddingLeft: 5, color: "white", fontSize: 14}]}>New Post</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    session.wsclient.sendCmd({type: 18, fid: fid}).then(r => {
                        if(!r.error) {
                            forumData = forumData.filter(fts => fts.fid !== fid);
                            router.navigate("/my")
                        }
                    })
                }}>
                    <II name='exit' size={17}/>
                </TouchableOpacity>
                <MI name='settings' size={15}/>
                <MI name='share' size={15}/>
                <ET name='dots-three-vertical' size={12} color={"black"}/>
            </View>
          </View>
        </View>


        <ScrollView style={[globalstyles.column, {width: "100%"}]} contentContainerStyle={[globalstyles.column, {width: "100%", height: "auto", borderTopColor: "rgba(204, 204, 204, 0)", borderTopWidth: .5, marginTop: 10}]}>

            <View style={[globalstyles.column, globalstyles.center, {width: "100%", paddingTop: 20}]}>
                <View style={[globalstyles.column, globalstyles.center, {height: 100, backgroundColor: "maroon", aspectRatio: 1, borderRadius: 120, justifyContent: "center"}]}>
                    <Text style={[{fontFamily: "GSF", color: "white", fontSize: 50}]}>{channelName?.[0]?.toUpperCase()}</Text>
                </View>

                <View style={[globalstyles.column, globalstyles.center, {width: '100%', marginTop: 20}]}>
                    <Text style={[{fontFamily: "GSF", fontSize: 25}]}>{channelName}</Text>
                </View>

                <View style={[globalstyles.column, {width: '100%', marginTop: 20, paddingHorizontal: 20}]}>
                    <View style={[globalstyles.column, {width: "100%", borderRadius: 10, backgroundColor: "white", borderWidth: .5, borderColor: 'rgba(0, 0, 0, 0.2)', paddingHorizontal: 13, paddingVertical: 10}]}>
                        <Text style={[{fontFamily: "GSF", fontSize: 16, color: "black"}]}>Info</Text>
                        <Text style={[{fontFamily: "GSF", fontSize: 14, color: "grey", marginTop: 3}]}>{forumDescription}</Text>
                    </View>
                </View>
            </View>

            

            <View style={[globalstyles.column, globalstyles.center, {width: "100%", paddingTop: 0}]}>
                <View style={[globalstyles.column, {width: '100%', marginTop: 20, paddingHorizontal: 20}]}>
                    <Text style={[{fontFamily: "", fontWeight: 700, fontSize: 20}]}>Posts</Text>
                </View>
            </View>

            <ScrollView style={[globalstyles.column, {width: "100%", marginTop: 0, flex: 1}]} contentContainerStyle={[globalstyles.column, {paddingBottom: 200 && 620}]}>
            
            <View style={[globalstyles.column, globalstyles.center, {width: "100%", marginTop: 15}]}>
            
                <View style={[globalstyles.column, globalstyles.center, {width: "100%", paddingHorizontal: 0, gap: 10}]}>

                    <Text style={[{fontFamily: "GSF", fontSize: 13, color: "black", marginTop: 0}]}>Today</Text>
                  
                    {messageUI}

                </View>

            </View>

            </ScrollView>

        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  
});
