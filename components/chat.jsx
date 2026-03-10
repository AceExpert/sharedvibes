import { Text, View, Image, TouchableOpacity } from "react-native";

import II from '@expo/vector-icons/Ionicons';

import { styles as globalstyles } from "../styles/global";

export default function ChatSelect({avatar, acolor, name, message, self = false, tickStyle, ...props}) {

    return (
        <TouchableOpacity style={[globalstyles.row, {width: "100%"}]}>
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