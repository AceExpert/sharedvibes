import { router } from "expo-router"
import { useState, useRef } from "react"

import { View, ScrollView, TextInput, Image } from "react-native"

import Feather from '@expo/vector-icons/Feather';
import FA from '@expo/vector-icons/FontAwesome';
import FA6 from '@expo/vector-icons/FontAwesome6';
import MI from '@expo/vector-icons/MaterialIcons';
import MCI from '@expo/vector-icons/MaterialCommunityIcons';
import AD from '@expo/vector-icons/AntDesign';
import II from '@expo/vector-icons/Ionicons';
import ET from '@expo/vector-icons/Entypo';

import { styles as globalstyles } from "../styles/global"

export default function ChatInput({value, onChangeText, ...props}) {
    
    return (
    <View style={[globalstyles.row, {flex: 1}]}>
        <View style={[globalstyles.row, globalstyles.center, {alignSelf: "flex-start", marginRight: 5, gap: 5}]}>
            <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", padding: 10, aspectRatio: 1, borderRadius: 100, borderWidth: 0, borderColor: "black", backgroundColor: "whitesmoke"}]}>
                <View style={[{position: "relative", left: -0}]}>
                    <MI name="add" size={18} color={"black"} style={[]}/>
                </View>
            </View>
        </View>
        <View style={[globalstyles.row, {flex: 1, borderWidth: .5 && 0, borderColor: "rgba(0, 0, 0, 0.2)" && "maroon", backgroundColor: "whitesmoke", borderRadius: 20, alignSelf: "flex-start"}]}>
            <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", alignSelf: "flex-start", marginBottom: 0, padding: 5, aspectRatio: 1, borderRadius: 100, borderWidth: 0, borderColor: "black", backgroundColor: "white" && "transparent", marginTop: 4, marginLeft: 4}]}>
                <View style={[{position: "relative", left: -0, }]}>
                    <II name='attach' size={18} color={"grey"} style={[]}/>
                </View>
            </View>
            <TextInput placeholder='Type a message...' style={[{fontFamily: "GSF", fontSize: 14, alignSelf: "flex-start", paddingHorizontal: 5, height: "auto", flex: 1, textAlignVertical: "top", verticalAlign: "top", color: "black"}]} value={value} onChangeText={onChangeText}
                multiline={true}
            />
            <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", alignSelf: "flex-end", marginBottom: 4, padding: 6, aspectRatio: 1, borderRadius: 100, borderWidth: 0, borderColor: "black", backgroundColor: "white", marginTop: 3.5, marginRight: 4}]}>
                <View style={[{position: "relative", left: -0}]}>
                    <II name='mic' size={18} color={"maroon"} style={[]}/>
                </View>
            </View>
        </View>
    </View>
    )
}