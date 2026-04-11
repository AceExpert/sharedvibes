import { router } from "expo-router";
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from "react-native";

import Chip from "./chip";

import Feather from '@expo/vector-icons/Feather';
import FA from '@expo/vector-icons/FontAwesome';
import FA6 from '@expo/vector-icons/FontAwesome6';
import MI from '@expo/vector-icons/MaterialIcons';
import MCI from '@expo/vector-icons/MaterialCommunityIcons';
import AD from '@expo/vector-icons/AntDesign';
import II from '@expo/vector-icons/Ionicons';
import ET from '@expo/vector-icons/Entypo';

import { styles as globalstyles } from "../styles/global";

import PFPS from "../assets/images/pfp.png";

export default function ForumCard({title, content, author, avatar, date, tags = [], upvotes = 0, downvotes = 0, comments = 0, status = 2, onPress, ...props}) {
    return (
        <TouchableOpacity style={[globalstyles.column, {width: "100%"}]} onPress={onPress || (() => router.navigate({pathname: "/chat/Forums/General", params: { id: 9423, title: "Which elective would be the best for sem 4?", chanType: 3 }}))}>

        <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 15}]}>
            <View style={[globalstyles.column, {width: "100%", height: "auto", backgroundColor: "white", borderWidth: .5, borderColor: "rgba(122, 122, 122, 0.4)", borderRadius: 15, paddingVertical: 12, paddingTop: 5, paddingBottom: 12 && 21, paddingHorizontal: 5}]}>
                <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 13, paddingVertical: 10, backgroundColor: "whitesmoke", borderRadius: 10}]}>
                    <Text style={[{fontFamily: "GSF", fontSize: 18, fontWeight: "600"}]}>{title}</Text>
                    <View style={[globalstyles.row, {flexWrap: "wrap", gap: 5, alignItems: "flex-start", marginTop: 5, display: tags.length? "flex" : "none"}]}>
                        {tags.map(v => {
                            return (
                            <Chip name={v} fontSize={12} styles={{paddingHorizontal: 7, paddingVertical: 3}} selected={true}/>
                            )
                        })}
                    </View>
                    <Text style={[{fontFamily: "GSF", fontSize: 13, fontWeight: "600", color: "grey", marginTop: 10}]}>{content}</Text>
                </View>
                <View style={[globalstyles.column, {width: "100%", marginTop: 10, paddingHorizontal: 11}]}>
                    <View style={[globalstyles.row, {justifyContent: "space-between"}]}>
                        <View style={[globalstyles.row, globalstyles.center, {gap: 5}]}>
                            <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", borderRadius: 50, aspectRatio: 1, width: 15, backgroundColor: "maroon"}]}>
                                {/* <Image source={avatar} style={[{width: "100%", aspectRatio: 1, borderRadius: 50}]}/> */}
                                <Text style={{color: "white", fontFamily: "GSF", fontSize: 11}}>{avatar}</Text>
                            </View>
                            <Text style={[{fontFamily: "GSF", color: "grey", fontSize: 13}]}>Posted by <Text style={[{color: "maroon"}]}>{author}</Text></Text>
                        </View>
                        <View style={[globalstyles.row, globalstyles.center]}>
                            <Text style={[{fontFamily: "GSF", color: "black", fontSize: 12, opacity: .8}]}>{date}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[globalstyles.row, {justifyContent: "space-between", marginTop: -13, paddingHorizontal: 7}]}>
                <View style={[globalstyles.row, globalstyles.center, {gap: 7}]}>
                    <View style={[globalstyles.row, globalstyles.center, {gap: 0, paddingHorizontal: 0, backgroundColor: "whitesmoke", borderRadius: 50}]}>
                        <View style={[globalstyles.row, globalstyles.center, {paddingVertical: 5, gap: 5, paddingHorizontal: 8, borderRadius: 50, backgroundColor: "rgba(236, 212, 255, 1)"}]}>
                            <ET name='arrow-bold-up' size={13} color={"rebeccapurple"}/>
                            <Text style={[{fontFamily: "GSF", color: "black", fontSize: 13}]}>{upvotes}</Text>
                        </View>
                        <View style={[globalstyles.row, {height: 15, width: .5, opacity: .5, backgroundColor: "black", marginHorizontal: 3, display: "none"}]}>

                        </View>
                        <View style={[globalstyles.row, globalstyles.center, {paddingVertical: 5, gap: 5, paddingHorizontal: 8, borderRadius: 50}]}>
                            <ET name='arrow-bold-down' size={13} color={"black"}/>
                            <Text style={[{fontFamily: "GSF", color: "black", fontSize: 13}]}>{downvotes}</Text>
                        </View>
                    </View>
                    <View style={[globalstyles.row, globalstyles.center, {gap: 7, paddingVertical: 5, paddingHorizontal: 8, backgroundColor: "rgba(255, 216, 194, 1)", borderWidth: .5, borderColor: "rgba(122, 122, 122, 0.4)", backgroundColor: "white", borderRadius: 50}]}>
                        <MCI name='comment-text-multiple' size={13} color={"black"}/>
                        <Text style={[{fontFamily: "GSF", color: "black", fontSize: 13}]}>{comments}</Text>
                    </View>
                    <View style={[globalstyles.row, globalstyles.center, {gap: 7, paddingVertical: 5, paddingHorizontal: 8, backgroundColor: "white", borderWidth: .5, borderColor: "rgba(122, 122, 122, 0.4)", borderRadius: 50}]}>
                        <FA name='share' size={14} color={"black"}/>
                    </View>
                </View>
                <View style={[globalstyles.row, globalstyles.center, {gap: 7, alignSelf: "flex-start"}]}>
                    <View style={[globalstyles.row, globalstyles.center, {gap: 7, paddingVertical: 5, paddingHorizontal: 8, backgroundColor: "whitesmoke", borderRadius: 30}]}>
                        {status === 0? 
                            <ET name="lock" size={11} color={"black"}/> :
                            <FA6 name='fire' size={11} color={"darkorange"}/>
                        }
                        <Text style={[{fontFamily: "GSF", color: "black", fontSize: 11}]}>{status === 0? "Closed" : "Active"}</Text>
                    </View>
                </View>
            </View>
        </View>

        </TouchableOpacity>
    )
}