import { router } from "expo-router";
import { View, StyleSheet, Image, Text } from "react-native";

import MI from '@expo/vector-icons/MaterialIcons';

import { styles as globalstyles } from "../styles/global";

export default function AnnouncementCard({title, description, likes, tags, reactions = [], time, images, ...props}) {
    return (
        <View style={[globalstyles.column, globalstyles.center, {width: "100%"}]}>
            <Image src={images}
                width={"100%"}
                height={470}
                style={{borderRadius: 20, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
            />
            <View style={[globalstyles.column, {padding: 18, paddingVertical: 13, backgroundColor: "whitesmoke", borderRadius: 20, height: "auto", width: "100%", borderTopLeftRadius: 0, borderTopRightRadius: 0, position: "relative", top: -0}]}>
                <Text style={[{fontFamily: "GSF", fontSize: 17, fontWeight: 600, color: "black"}]}>{title}</Text>
                <Text style={[{fontFamily: "GSF", fontSize: 13, fontWeight: 600, marginTop: 10, opacity: .8}]}>
                    <Text>{description}</Text><Text style={[{color: "maroon"}]}>{tags}</Text>
                </Text>
            </View>
            <View style={[globalstyles.row, {justifyContent: "space-between", width: "100%", gap: 10, marginTop: 4}]}>
                <View style={[globalstyles.row, {gap: 5}]}>
                    <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", gap: 5, padding: 7, paddingHorizontal: 11, backgroundColor: "whitesmoke", borderRadius: 100}]}>
                        <MI name='favorite-outline' size={14} color={"black"}/>
                        <Text style={[{fontFamily: "GSF", fontSize: 13}]}>{likes}</Text>
                    </View>
                    <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", gap: 8, padding: 7, paddingHorizontal: 11, backgroundColor: "whitesmoke", borderRadius: 100}]}>
                        {reactions?.map(v => {
                            return (
                                <View style={[globalstyles.row, globalstyles.center, {gap: 5}]}>
                                    <Text style={[{fontFamily: "GSF", fontSize: 12}]}>{v[0]}</Text>
                                    <Text style={[{fontFamily: "GSF", fontSize: 12}]}>{v[1]}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
                <View style={[globalstyles.column, {paddingVertical: 4, alignSelf: "flex-start", paddingHorizontal: 8, backgroundColor: "rgba(255, 216, 194, 1)", borderRadius: 30, borderTopRightRadius: 30, borderBottomRightRadius: 30, position: "relative", top: 0}]}>
                    <Text style={[{fontFamily: "GSF", color: "maroon", fontSize: 11, opacity: 1}]}>{time}</Text>
                </View>
            </View>
        </View>
    )
}

export function ChatCard({avatar, author, content, date, reactions, images, nameColor, self = false, files, reply, ...props}) {

    return (
    <View style={[globalstyles.row, {alignSelf: "flex-start", flexDirection: self? "row-reverse" : "row"}]}>
        <View style={[globalstyles.column, globalstyles.center, {width: self? 15 : 38}]}>
            <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", borderRadius: 50, aspectRatio: 1, width: 26, backgroundColor: nameColor || "maroon", display: self? "none" : "flex"}]}>
                {(avatar?.length > 3 || (typeof avatar !== 'string'))?
                <Image source={avatar} style={[{width: "100%", aspectRatio: 1, borderRadius: 50}]}/> :
                <Text style={{color: "white", fontFamily: "GSF", fontSize: 15}}>{avatar}</Text>
                }
            </View>
        </View>
        <View style={[globalstyles.column, {maxWidth: 300, height: "auto", backgroundColor: self? "rgba(255, 216, 194, 0.8)" : "whitesmoke", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10, paddingBottom: 8, paddingTop: self? 8 : 10}]}>
            <Text style={[{fontFamily: "GSF", fontSize: 11, marginTop: -5, opacity: .7 && 1, color: nameColor || "maroon", display: self? "none" : "flex"}]}>{author}</Text>
            <Text style={[{fontFamily: "GSF", fontSize: 13, marginTop: 1}]}>{content}</Text>
        </View>
    </View>
    )
}