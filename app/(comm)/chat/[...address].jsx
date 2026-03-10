import { Link, useLocalSearchParams, Stack, router } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';

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
    let [addressBar, setAddressBar] = useState(params.address);

    let [messageUI, setMessageUI] = useState([]);

    useEffect(() => {
        if(params.address[0] === 'Forums') {
            setChannelType(2);
            if(params.title) {
                setChannelType(3);
            }
        } else if(params.address[0] === 'Chat') {
            setChannelType(1);
        } else if(params.address[0] === 'Announcements') {
            setChannelType(0);
        }
        setAddressBar(v => {
            let nbar = [...params.address];
            if(params.title) {
                nbar.push(params.title);
            }
            return nbar;
        })
    }, [])

    useEffect(() => {
        if(channelType != null) {
            let channels = JSON.parse(params.commChannels);

            let schanType = 'chats';
            if(channelType === 2) {
                schanType = 'forums';
            } else if (channelType === 1) {
                schanType = 'chats';
            } else if (channelType === 0) {
                schanType = 'updates'
            }

            console.log(params, schanType);

            let chanID = channels[schanType].find(v => v.name === params.address[1])?.id;
            setChannelId(chanID);
        }

    }, [channelType]);

    useEffect(() => {
        if(channelId != null) {
            if(messages[channelId]) {
                let msgs = messages[channelId];
                createMessageUI(msgs);
            }
        }
    }, [channelId]);

    let createMessageUI = (msgs) => {
        let comps = [];

        for(let i = 0; i < msgs.length; i++) {
            let msg = msgs[i];

            let uiCard;

            if(msg.type === 1) {
                uiCard = 
                    <ChatCard 
                        author={msg.author}
                        content={msg.content}
                        nameColor={msg.color}
                        avatar={msg.author?.[0]?.toUpperCase()}
                        self={msg.self}
                        key={msg.id}
                    />;
            } else if (msg.type === 2) {
                uiCard = 
                    <ForumCard 
                        title={msg.title}
                        avatar={PFPS}
                        author={msg.author}
                        content={msg.content}
                        tags={msg.tags}
                        upvotes={msg.upvotes}
                        downvotes={msg.downvotes}
                        comments={msg.comments}
                    />;
            };

            if(msg.self && msg.type === 1) {
                comps.push(
                    <View style={[globalstyles.row, {alignSelf: "flex-end"}]}>
                        {uiCard}
                    </View>
                )
            } else {
                comps.push(uiCard)
            }
        }

        setMessageUI(comps);
    }

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

        <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 10}]}>
            <View style={[globalstyles.row, globalstyles.center, {gap: 2}]}>
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

            <View style={[globalstyles.column, {width: "100%", display: channelType === 2? "flex" : "none", marginTop: 15}]}>

                <View style={[globalstyles.row, globalstyles.center, {width: "100%", marginTop: 0}]}>
                    <ScrollView style={[]} contentContainerStyle={[globalstyles.row, globalstyles.center, {paddingHorizontal: 0}]}>
                        <View style={[globalstyles.row, globalstyles.center, {gap: 10, width: "auto"}]}>
                            <Chip name={"All"} selected={true}/>
                            <Chip name={"Highly Active"} />
                            <Chip name={"Open"} />
                            <Chip name={"Closed"} />
                        </View>
                    </ScrollView>
                </View>

                <View style={[globalstyles.row, globalstyles.center, {width: "100%", paddingHorizontal: 0, marginTop: 15, marginBottom: 0}]}>
                    <MI name='sort' size={17} />
                    <Text style={[{fontFamily: "GSF", paddingLeft: 5}]}>Sort by</Text>
                    <View style={[globalstyles.row, globalstyles.center, {paddingVertical: 5, paddingHorizontal: 10, paddingLeft: 6, backgroundColor: "whitesmoke", borderRadius: 5, marginLeft: 6, gap: 5}]}>
                        <ET name="chevron-small-down" size={14}/>
                        <Text style={[{fontFamily: "GSF", fontSize: 13}]}>Latest</Text>
                    </View>
                </View>

            </View>
        </View>

        <View style={[globalstyles.column, {width: "100%", height: "100%", borderTopColor: "rgba(204, 204, 204, 1)", borderTopWidth: .5, marginTop: 10}]}>

            <ScrollView style={[globalstyles.column, {width: "100%", marginTop: 0, flex: 1}]} contentContainerStyle={[globalstyles.column, {paddingBottom: 200 && 620}]}>
            
            <View style={[globalstyles.column, globalstyles.center, {width: "100%", marginTop: 15}]}>
            
                <View style={[globalstyles.column, globalstyles.center, {width: "100%", paddingHorizontal: 0, gap: 10}]}>
                    <Text style={[{fontFamily: "GSF", fontSize: 13, color: "grey"}]}>05/03/2026</Text>

                    <Text style={[{fontFamily: "GSF", fontSize: 13, color: "black", marginTop: 0}]}>Today</Text>
                  
                    {messageUI}
                    {/* <ForumCard 
                        title={"Which elective would be the best for sem 4?"}
                        content={"So I had this question from a long time? You know should I take a humanities breadth or a tech related breadh. We are drowning in tech stuff already so what do you guys think of English Literature or something?"}
                        tags={["electives", "semester", "breadth", "literature"]}
                        upvotes={50}
                        downvotes={5}
                        comments={70}
                        avatar={PFPS}
                        author={"very.anshul"}
                        date={"6th January 2026"}
                    />

                    <ForumCard 
                        title={"Opinion on prof and grading for General Psychology"}
                        content={"What you guys think about the faculty for psychology and the grading, how was it last sem, and the previous years? Most importantly how are the papers? are they tough or difficult and how many people generally enroll in this course?"}
                        tags={["psychology", "grading", "professor", "exam"]}
                        upvotes={40}
                        downvotes={30}
                        comments={20}
                        avatar={PFPS}
                        author={"someone.special"}
                        date={"2nd January 2026"}
                    />

                    <ForumCard 
                        title={"Missed endsems of elective what now?"}
                        content={"Can I give it again? will something bad happen? please help"}
                        tags={["endsem", "exam-miss", "elective"]}
                        upvotes={40}
                        downvotes={300}
                        comments={10}
                        avatar={PFPS}
                        author={"some.fool"}
                        status={0}
                        date={"2nd December 2025"}
                    /> */}

                </View>

            </View>

            </ScrollView>

            <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 10, minHeight: 400, backgroundColor: "transparent", borderTopColor: "rgba(0, 0, 0, 0.15)", borderTopWidth: 0, position: "absolute", bottom: 0, display: channelType === 2? "flex" : "none"}]}>
                <TouchableOpacity style={[globalstyles.row, globalstyles.center, {alignSelf: "flex-end"}]} onPress={() => router.navigate({pathname: "/forum/new"})}>
                    <View style={[globalstyles.row, globalstyles.center, {gap: 5, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 100, backgroundColor: "maroon"}]}>
                        <View style={[globalstyles.row, globalstyles.center, {gap: 5}]}>
                            <MI name="add" size={15} color={"white"} />
                            <Text style={[{color: "white", fontFamily: "GSF", fontSize: 15}]}>Create Post</Text>
                        </View>
                    </View>
                </TouchableOpacity>
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
