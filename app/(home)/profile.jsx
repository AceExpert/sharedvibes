import { Link, router } from 'expo-router';
import { useState, useRef, useEffect } from 'react';

import { StyleSheet, View, Text, TextInput, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';

import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import Store from "expo-sqlite/kv-store";

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { CommunityMiniCard } from '../../components/comm';

import Feather from '@expo/vector-icons/Feather';
import FA from '@expo/vector-icons/FontAwesome';
import MI from '@expo/vector-icons/MaterialIcons';
import II from '@expo/vector-icons/Ionicons';
import ET from '@expo/vector-icons/Entypo';

import { session, user } from '../../globalstates';
import { commData } from "../../constants/globaldata";
import {} from "../../client";

import { styles as globalstyles } from "../../styles/global";

import AmbarLogo from "../../assets/images/ambar.jpg"
import LitLogo from "../../assets/images/lit.jpg"
import LawLogo from "../../assets/images/balance.png"
import CCLogo from "../../assets/images/cc.png"

import PFPS from "../../assets/images/pfp.png"
import Chip from '../../components/chip';

export default function ProfileScreen() {

    let [username, setUsername] = useState("");
    let [name, setName] = useState("");
    let [about, setAbout] = useState("");

    let saveProfile = () => {
        session.wsclient.sendCmd({type: 4, data: {user_id: username, name: name, about: about}}).then(t => {
            if(!t.error) {
                router.navigate("/my");
                user.user_id = username;
                user.display_name = name;
                user.about = about;
                Store.setItemSync("user", JSON.stringify(user));
            }
        })
    }
    
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
                        <Text style={{fontSize: 20, fontFamily: "GSF", fontWeight: ""}}>Profile</Text>
                    </View>
                    <View style={[globalstyles.row, globalstyles.center, {gap: 15, display: "none"}]}>
                        <MI name='settings' size={18}/>
                        <MI name='notifications' size={18}/>
                        <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", borderRadius: 50, aspectRatio: 1, height: 22, backgroundColor: "maroon", display: "none"}]}>
                            {/* <Text style={{color: "white"}}>A</Text> */}
                            <Image source={PFPS} style={[{width: "100%", height: "100%", borderRadius: 50}]}/>
                        </View>
                    </View>
                </View>
            </View>

            <ScrollView style={[globalstyles.column, {width: "100%"}]} contentContainerStyle={[globalstyles.column, {paddingBottom: 200}]}>
                <View style={[globalstyles.column, globalstyles.center, {width: "100%", paddingHorizontal: 20, paddingTop: 50}]}>
                    <View style={[globalstyles.column, globalstyles.center, {justifyContent: "center", borderRadius: 100, height: 150, aspectRatio: 1, backgroundColor: "maroon"}]}>
                        <Text style={[{fontFamily: "GSF", fontSize: 50, color: "white"}]}>{name.length? name[0].toUpperCase() : username.length? username[0].toUpperCase() : "A"}</Text>
                    </View>
                </View>
                <View style={[globalstyles.column, globalstyles.center, {width: "100%", gap: 10, marginTop: 40, paddingHorizontal: 20 }]}>
                    <View style={[globalstyles.column, {gap: 5, width: "100%"}]}>
                        <View style={[globalstyles.row, globalstyles.center, {width: "100%", backgroundColor: "white", paddingVertical: 2, paddingHorizontal: 15, borderRadius: 10, borderWidth: .1, borderColor: "black"}]}>
                            <TextInput style={[{width: "100%", fontSize: 15, paddingLeft: 0, fontFamily: "GSF", color: "black"}]} placeholder='Enter username' onChangeText={t => {
                                setUsername(t);
                            }}/>
                        </View>
                        <Text style={[{fontFamily: "GSF", fontSize: 12, color: "grey"}]}>Unique username for SharedVibes using which people can discover each other and identify uniquely</Text>
                    </View>
                    <View style={[globalstyles.column, {gap: 5, width: "100%", marginTop: 20}]}>
                        <View style={[globalstyles.row, globalstyles.center, {width: "100%", backgroundColor: "white", paddingVertical: 2, paddingHorizontal: 15, borderRadius: 10, borderWidth: .1, borderColor: "black"}]}>
                            <TextInput style={[{width: "100%", fontSize: 15, paddingLeft: 0, fontFamily: "GSF", color: "black"}]} placeholder='Enter nickname' onChangeText={t => {
                                setName(t);
                            }}/>
                        </View>
                        <Text style={[{fontFamily: "GSF", fontSize: 12, color: "grey"}]}>This name would show up as a nickname instead of your username</Text>
                    </View>
                    <View style={[globalstyles.column, {gap: 5, width: "100%", marginTop: 20}]}>
                        <Text style={[{fontFamily: "GSF", fontSize: 16, color: "black"}]}>About</Text>
                        <View style={[globalstyles.row, globalstyles.center, {width: "100%", backgroundColor: "whitesmoke", paddingVertical: 2, paddingHorizontal: 15, borderRadius: 10, borderWidth: .0, borderColor: "black"}]}>
                            <TextInput style={[{width: "100%", fontSize: 15, paddingLeft: 0, fontFamily: "GSF", minHeight: 100, textAlignVertical: "top", color: "black"}]}
                                       multiline={true}
                                       editable={true}
                                       numberOfLines={5}
                                       placeholder={'Somethin\' like I like SharedVibes...'}
                                       onChangeText={
                                        t => {
                                            setAbout(t);
                                        }
                                    }
                            />
                        </View>
                    </View>

                    <View style={[globalstyles.column, {gap: 5, width: "100%", marginTop: 20}]}>
                        <TouchableOpacity style={[{width: "100%"}, globalstyles.row]} onPress={() => saveProfile()}>
                            <View style={[{paddingHorizontal: 20, width: '100%', alignSelf: "flex-end", justifyContent: "center", gap: 7, backgroundColor: "maroon", paddingVertical: 10, borderRadius: 30}, globalstyles.row, globalstyles.center]}>
                                <Text style={[{fontFamily: "GSF", color: "white", fontSize: 15}]}>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    </SafeAreaProvider>

    )
}