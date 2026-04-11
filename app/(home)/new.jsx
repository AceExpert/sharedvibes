import { Link, useLocalSearchParams, Stack } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, ImageBackground, Touchable, TouchableOpacity,
        Keyboard
 } from 'react-native';

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

import {  } from '@/globalstates';

import { styles as globalstyles } from "@/styles/global";
import { session, user } from '../../globalstates';
import { createID } from "../../utils";


export default function CommunityPage() {

    let [msgText, setMsg] = useState("");

    let [localMsg, setLocalMsg] = useState([]);

    let [messageUI, setMessageUI] = useState([]);

    let { fid: sFid, tid: sTid = 0, thread: sThread = '{}' } = useLocalSearchParams();
    let [fid, setFid] = useState(Number.parseInt(sFid));
    let [tid, setTid] = useState(Number.parseInt(sTid));
    let [tdata, setTData] = useState(JSON.parse(sThread));

    let [channelType, setChannelType] = useState(null);
    let [channelId, setChannelId] = useState(null);

    let [addressBar, setAddressBar] = useState([<Text style={[{color: "grey", fontFamily: "GSF"}]}>No title</Text>])

    let [postTitle, setTitle] = useState("");
    let [postDescription, setDescription] = useState("");

    let keyboardListeners = useRef([]);
    let [keybOffset, setKeybOffset] = useState(0);

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

            session.wsclient.regCallbacks.forumMessage = session.wsclient.regCallbacks.forumMessage.filter(m => m != onMessage);
        }
    }, []);

    useEffect(() => {
        if(postTitle?.length)
            setAddressBar([postTitle])
        else 
            setAddressBar([<Text style={[{color: "grey", fontFamily: "GSF"}]}>No title</Text>])
    }, [postTitle]);

    useEffect(() => {
        if(tid) {
            session.wsclient.sendCmd({type: 14, tid: tid}).then(m => {
                if(!m.error) {
                    setLocalMsg(m.messages);
                }
            })

            session.wsclient.regCallbacks.forumMessage.push(onMessage);
        }
    }, [tid]);

    let onMessage = (data, us) => {
        if(data.tid === tid) {
            data.user = us;
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
        setTitle(tdata.name);
        setDescription(tdata.description);
    }, [tdata]);

    let postThread = () => {
        session.wsclient.sendCmd({type: 11, data: {
            name: postTitle,
            description: postDescription,
            fid: fid,
            uid: user.uid,
        }}).then(r => {
            console.log(r);
            if(!r.error) {
                setTid(r.tid);
                setTData({uid: user.uid, tid: r.tid, fid: fid, name: postTitle, description: postDescription, user: user});
            }
        })
    }

    useEffect(() => {
        createMessageUI(localMsg);
    }, [localMsg]);

    let createMessageUI = (msgs) => {
        let comps = [];

        for(let i = 0; i < msgs.length; i++) {
            let msg = msgs[i];

            let uiCard;

            uiCard = 
                <ChatCard
                    author={msg.user.display_name}
                    content={msg.content}
                    nameColor={"purple"}
                    avatar={msg.user.display_name[0].toUpperCase()}
                    self={msg.uid === user.uid}
                    key={msg.mid}
                />;
            
            if(msg.uid === user.uid) {
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
            fid: fid,
            tid: tid,
            uid: user.uid,
            mid: createID(),
            content: msgText,
            date: new Date(),
        }

        session.wsclient.sendCmd({type: 15, data: msgData}).then(r => {
            if(!r.error) {
                setLocalMsg(lcms => {
                    let nlcms = [...lcms];
                    msgData.user = user;
                    nlcms.push(msgData);
                    return nlcms;
                })
            }
        })

        setMsg("");
    }

    return (
    <SafeAreaProvider>
      <SafeAreaView style={[globalstyles.column, globalstyles.center, {width: "100%", height: "100%", flex: 1}]}>
        <Stack.Screen options={{headerShown: false, contentStyle: {backgroundColor: "white"}}}/>
        <StatusBar style='auto' animated={true} hideTransitionAnimation='slide'/>
        
        <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 10}]}>
          <View style={[globalstyles.row, globalstyles.center, {width: "100%", justifyContent: "space-between"}]}>
            <View style={[globalstyles.row, globalstyles.center, {gap: 10}]}>
              <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", position: "relative", top: 1, marginTop: -0}]}>
                <Image source={""} style={[{aspectRatio: 1, width: 45, borderRadius: 7, display: "none"}]}/>
                <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", aspectRatio: 1, width: 40, borderRadius: 7, backgroundColor: "maroon"}]}>
                    <Text style={[{fontFamily: "GSF", fontSize: 25, color: "white"}]}>T</Text>
                </View>
              </View>
              <View style={[globalstyles.column, {justifyContent: "center", marginTop: -0}]}>
                <Text style={{fontSize: 20, fontFamily: "GSF", fontWeight: ""}}>Test Forum</Text>
                {/* <Text style={{fontSize: 12, fontFamily: "GSF", fontWeight: "", color: "grey", marginTop: -1}}>10 Online</Text> */}
              </View>
            </View>
            <View style={[globalstyles.row, globalstyles.center, {gap: 15, display: "none"}]}>
              <MI name='share' size={15}/>
              <FA6 name='user-group' size={14}/>
              <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", borderRadius: 50, aspectRatio: 1, height: 22, backgroundColor: "maroon"}]}>
                {/* <Text style={{color: "white"}}>A</Text> */}
                <Image source={""} style={[{width: "100%", height: "100%", borderRadius: 50}]}/>
              </View>
              <ET name='dots-three-vertical' size={12} color={"black"}/>
            </View>
          </View>
        </View>

        <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 8}]}>
            <View style={[globalstyles.row, globalstyles.center, {display: tid? "none" : "flex"}]}>
                <Text style={[{fontFamily: "GSF", fontSize: 16, color: "maroon"}]}>New Post</Text>
            </View>
            <View style={[globalstyles.row, globalstyles.center, {gap: 2, marginTop: tid? 0 : 5}]}>
                <View style={[globalstyles.row, globalstyles.center]}>
                    <View style={[globalstyles.row, globalstyles.center, {aspectRatio: 1, width: 20, borderRadius: 100, backgroundColor: "maroon", justifyContent: "center"}]}>
                        <Text style={[{fontFamily: "GSF", color: "white", fontSize: 12}]}>{user.display_name[0].toUpperCase()}</Text>
                    </View>
                    <Text style={[{fontFamily: "GSF", color: "maroon", fontSize: 14, paddingLeft: 5}]}>{!tid? user.user_id : tdata.user.user_id}</Text>
                </View>
                <View style={[{position: "relative", top: 1}]} key={Math.random()}>
                    <ET name={'chevron-small-right' || 'triangle-right'} size={15} color={"black"}/>
                </View>
                {(() => {
                    let comps = [];
                    for(let i = 0; i < addressBar.length; i++) {
                        let isLast = i === (addressBar.length - 1);
                        comps.push(<Text style={[{fontFamily: "GSF", color: isLast? "black" : "grey"}]} key={Math.random()}>{addressBar[i]}</Text>);
                        if(!isLast) {
                            comps.push(<View style={[{position: "relative", top: 1}]} key={Math.random()}>
                                            <ET name={'chevron-small-right' || 'triangle-right'} size={15} color={"black"}/>
                                        </View>);
                        };
                    };
                    return comps;
                })()}
            </View>

        </View>

        <View style={[globalstyles.column, {width: "100%", height: "100%", borderTopColor: "rgba(204, 204, 204, 1)", borderTopWidth: .5, marginTop: 10, flex: 1}]}>

            <ScrollView style={[globalstyles.column, {width: "100%", marginTop: 0, flex: 1}]} contentContainerStyle={[globalstyles.column, {paddingBottom: 200 && 620}]}>
            
            <View style={[globalstyles.column, globalstyles.center, {width: "100%", marginTop: 15, flex: 1}]}>
            
                <ScrollView style={[globalstyles.column, {width: "100%", paddingHorizontal: 15, gap: 0}]}>

                    {/* <Text style={[{fontFamily: "GSF"}]}>Enter title for your forum</Text> */}
                    
                    <View style={[globalstyles.row, globalstyles.center, {borderRadius: 10, backgroundColor: "transparent", borderWidth: .0, borderColor: "rgba(0, 0, 0, 0.24)", width: "100%"}]}>
                        <TextInput placeholder='Enter title here...' style={[{paddingHorizontal: 20, fontSize: 22, paddingVertical: 10, width: "100%", fontFamily: "GSF"}]} multiline={true}
                            value={postTitle} onChangeText={t => setTitle(t)} editable={!tid}
                        />
                    </View>

                    <View style={[globalstyles.row, globalstyles.center, {borderRadius: 10, backgroundColor: "transparent", borderWidth: .0, borderColor: "rgba(0, 0, 0, 0.24)", width: "100%", display: "none"}]}>
                        <TextInput placeholder='Tags' style={[{paddingHorizontal: 20, paddingVertical: 15, fontFamily: "GSF", width: "100%"}]}/>
                    </View>

                    <View style={[globalstyles.row, {borderRadius: 10, backgroundColor: "white", borderWidth: .0, borderColor: "rgba(0, 0, 0, 0.29)", width: "100%"}]}>
                        <TextInput placeholder='Enter details here...' style={[{paddingHorizontal: 20, paddingVertical: 10, fontSize: 16, fontFamily: "GSF", width: "100%", opacity: .9, color: "black", textAlignVertical: "top", verticalAlign: "top"}]} multiline={true}
                            value={postDescription} onChangeText={t => setDescription(t)} editable={!tid} autoCorrect={!tid}
                        />
                    </View>

                </ScrollView>

                <View style={[globalstyles.column, {gap: 10}, {width: "100%", height: 100, backgroundColor: "white", paddingHorizontal: 5, marginTop: 20, borderTopColor: "rgba(0, 0, 0, 0.2)", borderTopWidth: .5, paddingVertical: 20}]}>
                    {messageUI}
                    {/* <ChatCard author="Anora" content="I think I saw it with a boy on an orange cycle today" avatar="A"/>
                    <ChatCard author="Bofi" content="Maybe its in the other place." avatar="B"/>
                    <View style={[{alignSelf: "flex-end"}]}>
                        <ChatCard author="Bofi" content="Its with me, collect it from my room in my hall." avatar="B" self={true}/>
                    </View> */}
                </View>

            </View>

            </ScrollView>

            <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 10, paddingBottom: keybOffset + 10, minHeight: 100, backgroundColor: "transparent", borderTopColor: "rgba(0, 0, 0, 0.15)", borderTopWidth: 0, position: "relative", bottom: 0, display: tid? "none" : "flex"}]}>
                <View style={[globalstyles.row, globalstyles.center, {gap: 10, width: "100%", justifyContent: "flex-end", paddingHorizontal: 20}]}>
                    
                    <View style={[globalstyles.row, globalstyles.center, {gap: 5, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 100, backgroundColor: "rgb(233, 233, 233)", alignSelf: "flex-end", width: "30%", justifyContent: "center"}]}>
                        <View style={[globalstyles.row, globalstyles.center, {gap: 5}]}>
                            <MI name="bookmark-add" size={15} color={"black"} />
                            <Text style={[{color: "black", fontFamily: "GSF", fontSize: 15}]}>Save</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={[globalstyles.row, {width: "30%"}]}
                        onPress={postThread}
                    >
                        <View style={[globalstyles.row, globalstyles.center, {gap: 5, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 100, backgroundColor: "maroon", alignSelf: "flex-end", width: "100%", justifyContent: "center"}]}>
                            <View style={[globalstyles.row, globalstyles.center, {gap: 5}]}>
                                <MI name="send" size={15} color={"white"} />
                                <Text style={[{color: "white", fontFamily: "GSF", fontSize: 15}]}>Post</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                </View>
            </View>

            <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 10, paddingBottom: keybOffset + 10, minHeight: 100, backgroundColor: "transparent", borderTopColor: "rgba(0, 0, 0, 0.15)", borderTopWidth: 0, position: "relative", bottom: 0, display: tid? "flex" : "none"}]}>
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
