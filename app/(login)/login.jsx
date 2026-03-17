import { Link, useLocalSearchParams, Stack, router } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, 
         ImageBackground, Touchable, TouchableOpacity,
         ActivityIndicator
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

import { messages } from '@/globalstates';

import { requestOTP } from '../../client';

import { styles as globalstyles } from "@/styles/global";

import SVLogo from "@/assets/images/discf.png"
import AmbarLogo from "@/assets/images/ambar.jpg"
import LitLogo from "@/assets/images/lit.jpg"
import LawLogo from "@/assets/images/balance.png"
import CCLogo from "@/assets/images/cc.png"

import PFPS from "@/assets/images/pfp.png"

export default function LoginPage() {

    let [email, setEmail] = useState("");
    let [otpSent, setOSent] = useState(false);
    let [loginSucc, setLSucc] = useState(null);
    let [otp, setOTP] = useState([...Array(6)]);
    let [otpSelec, setOTPSelec] = useState([]);
    
    let otpCompRef = useRef([]);

    let otpToken = useRef(null);

    let getOTPComps = () => {
        if(!otpCompRef.current) {
            otpCompRef.current = [];
        }

        return otpCompRef.current
    }

    let loginPress = () => {
        
    }

    useEffect(() => {
        // requestOTP("anshul.24@kgpian.iitkgp.ac.in");
    }, [])

    return (
        <View style={[globalstyles.column, globalstyles.center, {width: "100%", paddingHorizontal: 0, justifyContent: "center", height: "100%", gap: 0}]}>
            <View style={[globalstyles.column, globalstyles.center, {width: "100%"}]}>
                <View style={[globalstyles.row, globalstyles.center, {gap: 5}]}>
                    <Image source={SVLogo} style={[{width: 50, aspectRatio: 1.7}]}/>
                    <Text style={[{fontSize: 30, fontFamily: "GSF"}]}>Shared<Text style={[{color: "purple"}]}>Vibes</Text></Text>
                </View>
                <Text style={[{fontSize: 15, fontFamily: "GSF", marginTop: 5, color: "grey", letterSpacing: 0}]}>Login</Text>
            </View>

            <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, gap: 10, marginTop: 40}]}>
                <View style={[globalstyles.column, {width: "100%"}]}>
                    {/* <Text style={[{fontFamily: "GSF", color: "grey"}]}>Institute email address</Text> */}
                    <View style={[globalstyles.row, globalstyles.center, {width: "100%", gap: 10, marginTop: 5}]}>
                        <View style={[globalstyles.column, {flex: 1, borderRadius: 10, borderColor: "black", borderWidth: .0, backgroundColor: "whitesmoke"}]}>
                            <Text style={[{fontFamily: "GSF", color: "grey", paddingHorizontal: 13, paddingTop: 10, fontSize: 12, marginBottom: -10}]}>Institute email address</Text>
                            <View style={[globalstyles.row, globalstyles.center, {width: "100%", paddingHorizontal: 10}]}>
                                <TextInput style={[{fontSize: 16, flex: 1, paddingVertical: 15, fontFamily: "GSF", fontSize: 15}]} placeholder='someone' value={email} onChangeText={v => setEmail(v)}/>
                                <Text style={[{fontFamily: "GSF", color: "grey", fontSize: 15}]}><Text style={[{color: "maroon"}]}>@kgpian</Text>.iitkgp.ac.in</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[globalstyles.column, {width: "100%", marginTop: 10}]}>
                    <View style={[globalstyles.row, globalstyles.center, {gap: 10, alignSelf: "center"}]}>
                        <View style={[{flex: 1, height: .5, backgroundColor: "grey", display: "none"}]}></View>
                        <Text style={[{fontFamily: "GSF", color: "black", alignSelf: "center", letterSpacing: 0}]}>OTP</Text>
                        <View style={[{flex: 1, height: .5, backgroundColor: "grey", display: "none"}]}></View>
                    </View>
                    <View style={[globalstyles.row, globalstyles.center, {width: "100%", gap: 10, marginTop: 20, justifyContent: "space-between"}]}>
                        
                        {otp.map((v, i) => {

                            let selection = {};

                            if(typeof otpSelec[i] === 'number') {
                                selection.start = otpSelec[i];
                                selection.end = otpSelec[i];
                            }

                            return (
                                <View style={[globalstyles.column, {borderRadius: 10, borderColor: "black", borderWidth: .0, backgroundColor: "whitesmoke", justifyContent: "center"}]} key={i}>
                                    <View style={[globalstyles.row, globalstyles.center, {width: "auto", paddingHorizontal: 10, justifyContent: "center"}]}>
                                        <TextInput style={[{fontSize: 16, width: "auto", paddingVertical: 15, fontWeight: 700, fontSize: 20}]} placeholder='0' selection={selection} value={v} onChangeText={t => {
                                    
                                            if(!t.length) {
                                                if (i) {
                                                    getOTPComps()[i-1].focus();
                                                }
                                            } else if (t.length === 1) {
                                                if(i <= 4) {
                                                    getOTPComps()[i+1].focus();
                                                }
                                            } else if (t.length === 2) {
                                                if(i <= 4) {
                                                    setOTPSelec(selec => {
                                                        let nselec = [...selec];
                                                        nselec[i+1] = 0;
                                                        return nselec;
                                                    })
                                                    getOTPComps()[i+1].focus();
                                                    
                                                }
                                                
                                            }

                                            setOTP(oldOTP => {
                                                let nOTP = [...oldOTP];
                                                nOTP[i] = t[0];
                                                return nOTP;
                                            });
                                        }}
                                            ref={(comp) => {
                                                getOTPComps()[i] = comp;
                                                return () => {
                                                    delete getOTPComps()[i];
                                                }
                                            }}

                                            onBlur={() => {
                                                
                                            }}

                                            onSelectionChange={() => {
                                                setOTPSelec([]);
                                            }}
                                        />
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
                <View style={[globalstyles.row, globalstyles.center, {width: "100%", borderRadius: 30, borderColor: "black", borderWidth: .5, paddingHorizontal: 10, display: "none"}]}>
                    <TextInput style={[{fontSize: 16, width: "100%", paddingVertical: 15, fontFamily: "GSF"}]} placeholder='password'/>
                </View>
            </View>

            <View style={[globalstyles.column, globalstyles.center, {width: "100%", paddingHorizontal: 20, gap: 15, marginTop: 20}]}>
                <TouchableOpacity style={[{width: "100%"}, globalstyles.row]} onPress={loginPress}>
                    <View style={[{paddingHorizontal: 20, width: '100%', alignSelf: "flex-end", justifyContent: "center", gap: 5, backgroundColor: "maroon", paddingVertical: 10, borderRadius: 30}, globalstyles.row, globalstyles.center]}>
                        <Text style={[{fontFamily: "GSF", color: "white", fontSize: 15}]}>{otpSent? "Login" : "OTP"}</Text>
                        <AD name='arrow-right' color={"white"}/>
                    </View>
                </TouchableOpacity>

                <Text>{loginSucc? "Login successfull" : loginSucc === false? "Incorrect OTP" : null}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})