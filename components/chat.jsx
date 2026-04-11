import { useState } from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";

import Feather from '@expo/vector-icons/Feather';
import FA from '@expo/vector-icons/FontAwesome';
import FA5 from '@expo/vector-icons/FontAwesome5';
import MI from '@expo/vector-icons/MaterialIcons';
import II from '@expo/vector-icons/Ionicons';
import ET from '@expo/vector-icons/Entypo';

import { styles as globalstyles } from "../styles/global";

export default function ChatSelect({avatar, acolor, name, message, self = false, tickStyle, onPress, ...props}) {

    return (
        <TouchableOpacity style={[globalstyles.row, {width: "100%"}]} onPress={onPress}>
            <View style={[globalstyles.row, {width: "100%", height: 55, backgroundColor: "", paddingHorizontal: 20, justifyContent: "space-between"}]}>
                <View style={[globalstyles.row, globalstyles.center, {height: "100%"}]}>
                    <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", borderRadius: 50, aspectRatio: 1, height: 40, backgroundColor: acolor || "maroon"}]}>
                        {(avatar?.length > 3 || (typeof avatar !== 'string'))?
                            <Image source={avatar} style={[{width: "100%", height: "100%", borderRadius: 50}]}/> :
                            <Text style={{color: "white", fontFamily: "GSF", fontSize: 18}}>{avatar}</Text>
                        }
                    </View>
                    <View style={[globalstyles.column, {paddingLeft: 10}]}>
                        <Text style={{fontSize: 16, fontFamily: "GSF", fontWeight: ""}}>{name}</Text>
                        <Text style={{fontSize: 12, fontFamily: "GSF", fontWeight: "", color: "rgba(156, 156, 156, 1)"}}>{self? <II name='checkmark-done-sharp' color={"grey"} size={15}/> : null}{self? "  " : ""}{message}</Text>
                    </View>
                </View>
                <View style={[globalstyles.column, {paddingVertical: 7.5}]}>
                    <Text style={[{fontFamily: "GSF", fontSize: 11, color: "grey"}]}>11:43 PM</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}

export function UserSelect({username, avatar, onAddFriend, onView, onMessage}) {
    
    let [isAction, setIsAction] = useState(false);

    return (
    <TouchableOpacity style={[globalstyles.column, {width: "100%"}]} onPress={() => {
        setIsAction(!isAction);
    }}>
        <View style={[globalstyles.column, {width: "100%"}]}>
            <View style={[globalstyles.row, globalstyles.center, {width: "100%", paddingVertical: 5, gap: 10, justifyContent: "space-between"}]}>
                <View style={[globalstyles.row, globalstyles.center, {gap: 10}]}>
                    <View style={[globalstyles.column, globalstyles.center, {aspectRatio: 1, height: 30, borderRadius: 100, backgroundColor: "maroon", justifyContent: "center"}]}>
                        {(avatar?.length > 3 || (typeof avatar !== 'string'))?
                            <Image source={avatar} style={[{width: "100%", height: "100%", borderRadius: 50}]}/> :
                            <Text style={{color: "white", fontFamily: "GSF", fontSize: 16}}>{avatar}</Text>
                        }
                    </View>
                    <Text style={[{fontFamily: "GSF", fontSize: 16}]}>{username}</Text>
                </View>
                <View style={[globalstyles.row, globalstyles.center, {gap: 20, paddingRight: 10, display: "none"}]}>
                    <FA5 name="user-plus" size={13} color="maroon"/>
                    <II name="send" size={13}/>
                </View>
            </View>
            <View style={[globalstyles.row, globalstyles.center, {width: "100%", justifyContent: "space-between", backgroundColor: "transparent", marginTop: 5, display: isAction? "flex" : "none", paddingBottom: 5}]}>
                <TouchableOpacity style={[globalstyles.row, {width: "27%"}]} onPress={onView}>
                    <View style={[globalstyles.row, globalstyles.center, {width: "100%", justifyContent: "center", backgroundColor: "whitesmoke", borderRadius: 10, gap: 5, paddingVertical: 10}]}>
                        <ET name="info-with-circle" size={13} color={"grey"}/>
                        <Text style={[{fontFamily: "GSF"}]}>View</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[globalstyles.row, {width: "35%"}]} onPress={onAddFriend}>
                    <View style={[globalstyles.row, globalstyles.center, {width: "100%", justifyContent: "center", backgroundColor: "whitesmoke", borderRadius: 10, gap: 5, paddingVertical: 10}]}>
                        <FA5 name="user-plus" size={13} color="maroon"/>
                        <Text style={[{fontFamily: "GSF", color: "black"}]}>Add Friend</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[globalstyles.row, {width: "35%"}]} onPress={onMessage}>
                    <View style={[globalstyles.row, globalstyles.center, {width: "100%", justifyContent: "center", backgroundColor: "whitesmoke", borderRadius: 10, gap: 5, paddingVertical: 10}]}>
                        <II name="send" size={13} color={"maroon"}/>
                        <Text style={[{fontFamily: "GSF"}]}>Message</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </TouchableOpacity>
    )
}