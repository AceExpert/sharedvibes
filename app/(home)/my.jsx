import { Link, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';

import { StyleSheet, View, Text, TextInput, ScrollView, 
         Image, ImageBackground, ActivityIndicator, 
         Touchable, TouchableOpacity } from 'react-native';

import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Chip from '../../components/chip';
import { CommunityMiniCard } from '../../components/comm';
import { UserSelect } from '../../components/chat';

import Feather from '@expo/vector-icons/Feather';
import FA from '@expo/vector-icons/FontAwesome';
import MI from '@expo/vector-icons/MaterialIcons';
import II from '@expo/vector-icons/Ionicons';
import AD from '@expo/vector-icons/AntDesign';

import { session, user, forumData } from '../../globalstates';

import { styles as globalstyles } from "../../styles/global";

import AmbarLogo from "../../assets/images/ambar.jpg"
import LitLogo from "../../assets/images/lit.jpg"
import LawLogo from "../../assets/images/balance.png"
import CCLogo from "../..//assets/images/cc.png"

import PFPS from "../../assets/images/pfp.png"

export default function HomeScreen() {

  let [forums, setForums] = useState([]);

  let [searchShow, setSS] = useState(false)
  let [makeForumShow, setMFS] = useState(false)

  let [userSearch, setUserSearch] = useState("");
  let [privateUsers, setPrivateUsers] = useState([]);

  let [fname, setFName] = useState("");
  let [fdescription, setFDescription] = useState("");
  let [finvite, setFInvite] = useState("");

  let [searching, setSearching] = useState(false);

  let pendingReq = useRef(0);

  let searchTimeout = useRef(null);

  useEffect(() => {
    session.wsclient.getForums().then(fs => {
      console.log(fs);
      setForums(fs);
    });
  }, []);

  let findPrivate = (username) => {
    if(searchTimeout.current) {
      clearTimeout(searchTimeout.current);
      searchTimeout.current = null;
    }
    pendingReq.current++;
    console.log(username, pendingReq.current);
    if(!username.length) {
      pendingReq.current = 0;
      setSearching(false);
      setPrivateUsers([]);
      return;
    }
    setSearching(true);
    
    searchTimeout.current = setTimeout(() => {
      session.wsclient.getUser(username).then(userInfo => {
        console.log(userInfo, pendingReq.current)
        if(pendingReq.current) {
          pendingReq.current--;        
        }
        if(userInfo) {
          setPrivateUsers([userInfo]);
        } else {
          setPrivateUsers([]);
        }
        // if(!pendingReq.current)
          setSearching(false);
      });
    }, 1000);
  }

  let createForum = () => {
    session.wsclient.sendCmd({type: 10, data: {
      name: fname,
      description: fdescription,
      invite: finvite.length? finvite : undefined,
      open: 1,
    }}).then(t => {
      console.log(t);
      if(!t.error) {
        let fid = t.fid;
        forumData.push({
          name: fname,
          description: fdescription,
          invite: finvite.length? finvite : undefined,
          open: 1,
          uid: user.uid,
          fid: fid,
        })
        router.navigate("/forum?fid="+fid);
      }
    })
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[globalstyles.column, globalstyles.center, {width: "100%", height: "100%"}]}>
        <StatusBar style='auto' animated={true} hideTransitionAnimation='slide'/>
        
        <View style={[globalstyles.column, {position: "absolute", height: "100%", width: "100%", zIndex: 5, backgroundColor: "white", display: searchShow? "flex" : "none"}]}>
          <SafeAreaView style={[globalstyles.column, globalstyles.center, {width: "100%", height: "100%"}]}>

            <View style={[globalstyles.column, {width: "100%", marginTop: 10, paddingHorizontal: 20}]}>
              <View style={[globalstyles.row, globalstyles.center]}>
                {/* <FA name='search' style={{paddingLeft: 5, color: "black"}} size={15}/> */}
                <TouchableOpacity style={[{}]} onPress={() => setSS(false)}>
                  <View style={[{position: "relative", bottom: -1}]}>
                    <AD name="close" size={14}/>
                  </View>
                </TouchableOpacity>
                <Text style={[{fontFamily: "GSF", fontSize: 20, paddingLeft: 10}]}>Find someone</Text>
              </View>
            </View>

            <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 10, paddingBottom: 10}]}>
              <View style={[globalstyles.row, globalstyles.center, {width: "100%", backgroundColor: "whitesmoke", paddingVertical: 2, paddingHorizontal: 10, borderRadius: 10}]}>
                <FA name='search' style={{paddingLeft: 5, color: "grey"}}/>
                <TextInput style={[{fontSize: 15, flex: 1, paddingHorizontal: 10, fontFamily: "GSF"}]} placeholder='Enter username or name here' value={userSearch} onChangeText={(t) => {
                  setUserSearch(t);
                  findPrivate(t);
                }}/>
                <View style={[globalstyles.row, globalstyles.center, {width: "auto", paddingRight: 5, display: searching? "flex" : "none"}]}>
                  <ActivityIndicator size={"small"} color={"grey"}/>
                </View>
              </View>
            </View>

            <View style={[globalstyles.column, {width: "100%", marginTop: 5, paddingBottom: 10}]}>
              <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20}]}>
                <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 14, paddingVertical: 10, backgroundColor: "whitesmoke", borderRadius: 10}]}>
                  <Text style={[{fontFamily: "GSF", fontSize: 16}]}>Private figures</Text>
                  <Text style={[{fontFamily: "GSF", fontSize: 12, color: "grey", marginTop: 1}]}>You can search these users by their username only</Text>
                </View>
                <View style={[globalstyles.column, {width: "100%", marginTop: 5}]}>

                  {privateUsers.length && !searching? privateUsers.map(info => {
                    return (
                      <UserSelect username={info.user_id} avatar={info?.display_name?.[0]?.toUpperCase()} key={info.user_id} onMessage={() => {
                        let chan = user.channels.find(ch => {
                          return ch.channel_type === 0 && ch.members.find(m => m.uid === info.uid);
                        })
                        if(chan) {
                          router.navigate("/message?cid=" + chan.cid);
                        } else {
                          session.wsclient.sendCmd({type: 9, channel_type: 0, uids: [user.uid, info.uid]}).then(ch => {
                            user.channels.push({channel_type: 0, members: [user, info], cid: ch.cid});
                            router.navigate("/message?cid=" + ch.cid);
                          });
                        };
                      }}/>
                    )
                  }) : searching?
                  <View style={[globalstyles.row, globalstyles.center, {gap: 0}]}>
                    <View style={[globalstyles.row, globalstyles.center, {width: "auto", paddingRight: 5, display: searching? "flex" : "none"}]}>
                      <ActivityIndicator size={"small"} color={"grey"}/>
                    </View>
                    <Text style={[{fontFamily: "GSF", paddingLeft: 5, fontSize: 15}]}>Finding</Text>
                  </View> :
                  <View style={[globalstyles.row, globalstyles.center, {gap: 0}]}>
                    <View style={[{position: "relative", bottom: -1}]}><II name="close" size={15}/></View>
                    <Text style={[{fontFamily: "GSF", paddingLeft: 5, fontSize: 15}]}>No user found</Text>
                  </View>
                  }
                </View>
              </View>
              <View style={[{height: 1, width: "100%", backgroundColor: "rgba(0, 0, 0, 0.23)", marginTop: 15, display: "none"}]}></View>
              <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 10}]}>
                <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 14, paddingVertical: 10, backgroundColor: "whitesmoke", borderRadius: 10}]}>
                  <Text style={[{fontFamily: "GSF", fontSize: 16}]}>Public figures</Text>
                  <Text style={[{fontFamily: "GSF", fontSize: 12, color: "grey", marginTop: 1}]}>You can search these users by their username, name, about or other publicly available info</Text>
                </View>

                <View style={[globalstyles.column, {width: "100%", marginTop: 5}]}>

                  <View style={[globalstyles.column, {width: "100%", display: "none"}]}>
                    <View style={[globalstyles.row, globalstyles.center, {width: "100%", paddingVertical: 5, gap: 10}]}>
                      <View style={[globalstyles.column, globalstyles.center, {aspectRatio: 1, height: 40, borderRadius: 100, backgroundColor: "purple", justifyContent: "center"}]}>
                        <Text style={[{fontFamily: "GSF", fontSize: 20, color: "white"}]}>A</Text>
                      </View>
                      <View style={[globalstyles.column]}>
                        <Text style={[{fontFamily: "GSF", fontSize: 16}]}>Anshul Singh</Text>
                        <Text style={[{fontFamily: "GSF", fontSize: 12, color: "grey"}]}>very.anshul</Text>
                      </View>
                    </View>
                  </View>

                  <View style={[globalstyles.row, globalstyles.center, {gap: 0}]}>
                    <View style={[{position: "relative", bottom: -1}]}><II name="close" size={15}/></View>
                    <Text style={[{fontFamily: "GSF", paddingLeft: 5, fontSize: 15}]}>No public figures yet</Text>
                  </View>
                </View>
              </View>
            </View>

          </SafeAreaView>
        </View>

        <View style={[globalstyles.column, {position: "absolute", height: "100%", width: "100%", zIndex: 5, backgroundColor: "white", display: makeForumShow? "flex" : "none"}]}>
          <SafeAreaView style={[globalstyles.column, globalstyles.center, {width: "100%", height: "100%"}]}>

            <View style={[globalstyles.column, {width: "100%", marginTop: 10, paddingHorizontal: 20}]}>
              <View style={[globalstyles.row, globalstyles.center]}>
                {/* <FA name='search' style={{paddingLeft: 5, color: "black"}} size={15}/> */}
                <TouchableOpacity style={[{}]} onPress={() => setMFS(false)}>
                  <View style={[{position: "relative", bottom: -1}]}>
                    <AD name="close" size={14}/>
                  </View>
                </TouchableOpacity>
                <Text style={[{fontFamily: "GSF", fontSize: 20, paddingLeft: 10}]}>Create Forum</Text>
              </View>
            </View>

            <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 10, paddingBottom: 10}]}>
              <View style={[globalstyles.row, globalstyles.center, {width: "100%", paddingVertical: 40, paddingBottom: 10, justifyContent: "center"}]}>
                  <View style={[globalstyles.column, globalstyles.center, {height: 150, justifyContent: "center", aspectRatio: 1, borderRadius: 100, backgroundColor: "maroon"}]}>
                    <Text style={[{fontFamily: "GSF", fontSize: 70, color: "white"}]}>{fname.length? fname[0].toUpperCase() : "F"}</Text>
                  </View>
              </View>
              <View style={[globalstyles.row, globalstyles.center, {width: "100%", backgroundColor: "white", paddingVertical: 2, paddingHorizontal: 10, borderRadius: 10}]}>
                <TextInput style={[{fontSize: 25, flex: 1, paddingHorizontal: 5, fontFamily: "GSF", textAlign: "center"}]} placeholder='Enter Forum Name' value={fname} onChangeText={(t) => {
                  setFName(t);
                }}/>
              </View>

              <View style={[globalstyles.row, globalstyles.center, {width: "100%", backgroundColor: "whitesmoke", paddingVertical: 2, paddingHorizontal: 10, borderRadius: 10, marginTop: 10}]}>
                <TextInput style={[{fontSize: 15, flex: 1, paddingHorizontal: 5, fontFamily: "GSF", minHeight: 200, verticalAlign: 'top', textAlignVertical: "top"}]} placeholder='Describe your forum here...' value={fdescription} multiline={true}
                onChangeText={(t) => {
                  setFDescription(t);
                }}/>
              </View>

              <TouchableOpacity style={[{width: "100%", marginTop: 30}]} onPress={() => createForum()}>
                <View style={[globalstyles.row, globalstyles.center, {width: "100%", backgroundColor: "maroon", gap: 7, justifyContent: "center", paddingVertical: 10, borderRadius: 100}]}>
                  {/* <MI name='forum' color={"white"} size={12}/> */}
                  <Text style={[{color: "white", fontFamily: "GSF", fontSize: 13}]}>Create Forum</Text>
                </View>
              </TouchableOpacity>
            </View>

          </SafeAreaView>
        </View>

        <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 10}]}>
          <View style={[globalstyles.row, globalstyles.center, {width: "100%", justifyContent: "space-between"}]}>
            <View style={[globalstyles.row, globalstyles.center, {gap: 10}]}>
              <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", position: "relative", top: 1, marginTop: -0}]}>
                <MI name='dark-mode' size={15} color={'rgba(255, 200, 49, 1)'}/>
              </View>
              <Text style={{fontSize: 20, fontFamily: "GSF", fontWeight: ""}}>My Space</Text>
            </View>
            <View style={[globalstyles.row, globalstyles.center, {gap: 15, display: "none"}]}>
              <MI name='add' size={20}/>
              <MI name='settings' size={18}/>
              <MI name='notifications' size={18}/>
              <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", borderRadius: 50, aspectRatio: 1, height: 22, backgroundColor: "maroon"}]}>
                {/* <Text style={{color: "white"}}>A</Text> */}
                <Image source={PFPS} style={[{width: "100%", height: "100%", borderRadius: 50}]}/>
              </View>
            </View>
          </View>
        </View>

        <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 10, paddingBottom: 10}]}>
          <View style={[globalstyles.row, globalstyles.center, {width: "100%", backgroundColor: "whitesmoke", paddingVertical: 2, paddingHorizontal: 10, borderRadius: 10}]}>
            <FA name='search' style={{paddingLeft: 5, color: "grey"}}/>
            <TextInput style={[{width: "100%", fontSize: 15, paddingLeft: 10, fontFamily: "GSF"}]} placeholder='Search your space'/>
          </View>
        </View>

        <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 0}]}>
          <View style={[globalstyles.row, {width: "100%", gap: 10, flexWrap: "wrap"}]}>
            <TouchableOpacity style={[{width: "100%"}]} onPress={() => setMFS(true)}>
              <View style={[globalstyles.row, globalstyles.center, {width: "100%", backgroundColor: "maroon", gap: 7, justifyContent: "center", paddingVertical: 10, borderRadius: 100}]}>
                <MI name='forum' color={"white"} size={12}/>
                <Text style={[{color: "white", fontFamily: "GSF", fontSize: 13}]}>Create Forum</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[{width: "48%"}]} onPress={() => setSS(true)}>
              <View style={[globalstyles.row, globalstyles.center, {width: "100%", backgroundColor: "rgba(255, 216, 194, 1)", borderWidth: 0, borderColor: "maroon", gap: 5, justifyContent: "center", paddingVertical: 10, borderRadius: 100, borderTopLeftRadius: 100, borderBottomLeftRadius: 100}]}>
                <MI name='add' color={"maroon"} size={13}/>
                <Text style={[{color: "maroon", fontFamily: "GSF", fontSize: 13}]}>Add Friend</Text>
              </View>
            </TouchableOpacity>
            <View style={[globalstyles.row, globalstyles.center, {width: "48%", backgroundColor: "rgba(255, 216, 194, 0)", borderWidth: .5, borderColor: "maroon", gap: 5, justifyContent: "center", paddingVertical: 10, borderRadius: 100, borderTopRightRadius: 100, borderBottomRightRadius: 100}]}>
              <MI name='group' color={"maroon"} size={13}/>
              <Text style={[{color: "maroon", fontFamily: "GSF", fontSize: 13}]}>Create Group</Text>
            </View>
          </View>
        </View>

        <ScrollView style={[globalstyles.column, {width: "100%"}]} contentContainerStyle={[globalstyles.column, {paddingBottom: 200}]}>
        
          <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 10}]}>

            <Text style={[{fontWeight: "600", fontSize: 20}]}>Your</Text>

            {/* <View style={[globalstyles.row, globalstyles.center, {paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "rgba(255, 216, 194, 1)", alignSelf: "flex-start", borderRadius: 20}]}> */}
            <View style={[globalstyles.row, globalstyles.center, {paddingHorizontal: 0, paddingVertical: 0, backgroundColor: "rgba(255, 216, 194, 0)", justifyContent: "space-between", marginTop: 5}]}>
              <View style={[globalstyles.row, globalstyles.center, {gap: 10}]}>
                {/* <Chip name={"Communities"} selected={true}/> */}
                <Chip name={"Forums"} selected={true}/>
                <View style={[{aspectRatio: 1, height: 3.5, borderColor: "grey", borderWidth: 1, backgroundColor: "grey", borderRadius: 100}]}></View>
                <Chip name={"Friends"} selected={false}/>
                <Chip name={"Requests"} selected={false}/>
              </View>
              <View style={[globalstyles.row, globalstyles.center, {paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "rgba(255, 216, 194, 1)" && "whitesmoke", alignSelf: "flex-start", borderRadius: 20, display: "none"}]}>
                <Text style={{fontSize: 11, fontWeight: 500, color: "rgba(255, 216, 194, 1)" && "black"}}>Show All</Text>
              </View>
            </View>
            {/* </View> */}
            <View style={[globalstyles.row, {width: "100%", marginTop: 15, flexWrap: "wrap", justifyContent: "space-between", rowGap: 20}]}>
              
              {forums.length? 
              forums.map(fs => {
                return (
                  <CommunityMiniCard name={fs.name} sdesc={fs.description} color={"white"} dark={false} borderColor={"rgba(0, 0, 0, 0.25)"} members={1} online={1}
                    onClick={() => router.navigate("/forum?fid="+fs.fid)}
                  />
                )
              })
              : 
              <Text style={[{paddingTop: 30, paddingLeft: 30, fontSize: 20, fontFamily: "GSF"}]}>No forums joined</Text>
              }

            </View>
          </View>

        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  
});
