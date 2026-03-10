import { Text, View, TouchableOpacity } from "react-native";

export default function Chip({name, selected = false, fontSize = 12, styles = {}, onClick, ...props}) {

    return (
    <TouchableOpacity style={[]} onPress={onClick}>
        <View style={[{backgroundColor: selected? "rgba(255, 216, 194, 1)" : "rgba(255, 216, 194, 0)", borderRadius: 30, paddingHorizontal: 10, paddingVertical: 5, borderColor: "rgba(145, 145, 145, 0.67)", borderWidth: selected? 0 : .7}, styles]}>
            <Text style={{fontSize, fontWeight: 500, color: selected? "maroon" : "grey", fontFamily: "GSF"}}>{name}</Text>
        </View>
    </TouchableOpacity>
    )
}