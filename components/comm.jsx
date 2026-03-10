import { router } from "expo-router";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

import FA from '@expo/vector-icons/FontAwesome';
import MI from '@expo/vector-icons/MaterialIcons';

import { styles as globalstyles } from "../styles/global";

export function CommunityMiniCard({name, sdesc, logo, members, color, borderColor, online, protect = false, dark = true, onClick, ...props}) {

    return (
    <TouchableOpacity onPress={onClick} style={[globalstyles.row, {width: "48%"}]}>
        <View style={[globalstyles.column, {paddingHorizontal: 14, paddingVertical: 10, paddingBottom: 10, borderRadius: 10, backgroundColor: color || "white", width: "100%", height: 'auto', borderWidth: borderColor? .5 : 0, borderColor: borderColor}]}>
            <View style={[globalstyles.column, {height: "auto", justifyContent: "space-between", width: "100%", gap: 20}]}>
                
                <View style={[globalstyles.column, {paddingTop: 10, gap: 10}]}>
                    <View style={[globalstyles.row, globalstyles.center, {justifyContent: "flex-end", display: logo? "flex" : "none", alignSelf: "center"}]}>
                        <Image source={logo} style={{aspectRatio: 1, width: "50%", borderRadius: 200}}/>
                    </View>
                    <View style={[globalstyles.column, {width: "100%"}]}>
                        <Text style={{fontSize: 18, fontWeight: "600", color: !dark? "black" : "white", alignSelf: "center", textAlign: "center"}}>{name}</Text>
                        <Text style={{fontSize: 13, marginTop: 3, fontWeight: "300", color: !dark? "black" : "white", fontFamily: "GSF", textAlign: "center", alignSelf: "center"}}>{sdesc}</Text>
                    </View>
                </View>

                <View style={[globalstyles.row, {justifyContent: "space-between", alignItems: "flex-end", width: "100%", display: "flex"}]}>
                    <View style={[globalstyles.column, {gap: 4}]}>
                        <View style={[globalstyles.row, globalstyles.center, {gap: 5}]}>
                            <FA name='user' size={10} style={[{color: dark? "white" : "black"}]}/>
                            <Text style={{color: dark? "white" : "black", fontSize: 11, fontWeight: 400, fontFamily: "Figtree"}}>{members}</Text>
                        </View>
                        <View style={[globalstyles.row, globalstyles.center, {gap: 5}]}>
                            <View style={[{aspectRatio: 1, backgroundColor: "green", borderRadius: 30, height: 7}]}></View>
                            <Text style={{color: dark? "white" : "black", fontSize: 11, fontWeight: 400, fontFamily: "Figtree"}}>{online}</Text>
                        </View>
                        <View style={[globalstyles.row, globalstyles.center, {gap: 5, display: protect? "flex" : "none"}]}>
                            <FA name='shield' size={10} style={[{color: "white"}]}/>
                            <Text style={{color: dark? "white" : "black", fontSize: 11, fontWeight: 400, fontFamily: "Figtree"}}>Protected</Text>
                        </View>
                    </View>

                    {/* <View style={[globalstyles.row, globalstyles.center, {justifyContent: "flex-end", flex: 1, display: logo? "flex" : "none"}]}>
                        <Image source={logo} style={{aspectRatio: 1, width: "60%", borderRadius: 200}}/>
                    </View> */}
                </View>

            </View>
        </View>
    </TouchableOpacity>
    )
}