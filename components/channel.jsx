import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

import { styles as globalstyles } from "../styles/global"

export default function Channel({name, icon, IconClass, onClick, ...props}) {
    return (
        <TouchableOpacity style={[{width: "100%"}]} onPress={onClick}>
            <View style={[globalstyles.row, globalstyles.center, {gap: 8, paddingHorizontal: 40, paddingVertical: 8, width: "100%"}]}>
                <View style={[globalstyles.row, {position: "relative", top: 2}]}>
                    <IconClass name={icon} size={13} color={"black"}/>
                </View>
                <Text style={[{fontWeight: "600", fontSize: 16, fontFamily: "GSF", color: "grey"}]}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}