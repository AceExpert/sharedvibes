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

import { forumData, session, user } from '../../globalstates';
import { commData } from "../../constants/globaldata";
import {} from "../../client";

import { styles as globalstyles } from "../../styles/global";

import AmbarLogo from "../../assets/images/ambar.jpg"
import LitLogo from "../../assets/images/lit.jpg"
import LawLogo from "../../assets/images/balance.png"
import CCLogo from "../../assets/images/cc.png"

import PFPS from "../../assets/images/pfp.png"
import Chip from '../../components/chip';

export default function HomeScreen() {

  // let [discCateg, setDiscCateg] = useState([['All', 0], ['Communities', 0], ['Forums', 1], ['People', 0], ['Alumni', 0], ['More', 0]]);
  let [discCateg, setDiscCateg] = useState([['Forums', 1]]);

  let [showModal, setShowModal] = useState(false);

  let [cData, setCommData] = useState({});
  let [fData, setForumData] = useState([]);

  let setCommModal = (fid) => {
    let comm = fData.find(v => v.fid === fid);
    if(comm) {
      setCommData(comm);
      setShowModal(true);
    } else {

    }
  }

  useEffect(() => {
    loadData();
  }, [])

  let loadData = () => {
    let svtoken = SecureStore.getItem("svtoken");
    if(!svtoken) {
      setTimeout(() =>
        router.navigate("/login"), 0);
    } else {
      session.svtoken = svtoken;
      session.wsclient.start();
      let userdata = JSON.parse(Store.getItemSync("user"));
      Object.keys(userdata).forEach(k => {
        user[k] = userdata[k]
      })
      if(!user.user_id) {
        setTimeout(() => router.navigate("/profile"), 0);
      }
      console.log("svtoken", session.svtoken);
      console.log("user", user);
      session.wsclient.isAuth().then(() => {
        session.wsclient.sendCmd({type: 16}).then(f => {
          setForumData(f.forums);
        })
      })
    }
  }

  let joinForum = (fid) => {
    session.wsclient.getForums().then(fs => {
      session.wsclient.sendCmd({type: 17, fid: fid}).then(r => {
        if(!r.error) {
          forumData.push(cData);
          router.navigate("/forum?fid=" + fid);
        }
      })
    });
    
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[globalstyles.column, globalstyles.center, {width: "100%"}]}>
        <StatusBar style='auto' animated={true} hideTransitionAnimation='slide'/>

        <View style={[globalstyles.column, {width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", position: "absolute", top: 0, zIndex: 2, justifyContent: "flex-end", display: showModal? "flex" : "none"}]}>

          <View style={[globalstyles.column, {width: "100%", height: "auto", maxHeight: 700, backgroundColor: "rgba(255, 255, 255, 1)", borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingVertical: 20, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 130}]}>

            <View style={[globalstyles.row, globalstyles.center, {gap: 10, position: "absolute", top: 15, right: 15}]}>
              <ET name='dots-three-vertical' size={12} color={"rgba(150, 150, 150, 1)"} style={{display: "none"}}/>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <View style={[globalstyles.row, globalstyles.center, {padding: 0, borderRadius: 100, borderWidth: 0, borderColor: 'rgb(150, 150, 150)', aspectRatio: 1, justifyContent: "center"}]}>
                  <MI name='close' size={18} color={"rgba(150, 150, 150, 1)"}/>
                </View>
              </TouchableOpacity>
            </View>

            <View style={[globalstyles.column, {alignSelf: "center", backgroundColor: "grey", width: 50, height: 4, opacity: .5, borderRadius: 100, display: "none"}]}>

            </View>

            <View style={[globalstyles.row, {gap: 12, width: "100%", marginTop: 0}]}>
              <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", borderRadius: 20, aspectRatio: 1, height: 70, backgroundColor: "maroon"}]}>
                <Image source={cData.logo} style={[{width: "100%", height: "100%", borderRadius: 20}]}/>
              </View>
              <View style={[globalstyles.column, {alignSelf: "center", gap: 0, width: "100%"}]}>
                <Text style={[{fontSize: 18, fontFamily: "GSF"}]}>{cData.name}</Text>
                {/* <Text style={[{fontSize: 11, fontFamily: "GSF", marginTop: 0}]}>Created by <Text style={[{color: "maroon"}]}>{cData.owner}</Text></Text> */}
              </View>
            </View>

            <View style={[globalstyles.row, {marginTop: 15, justifyContent: "space-between", paddingHorizontal: 20, width: "100%", paddingBottom: 10}]}>
              <View style={[globalstyles.column, globalstyles.center, {gap: 2}]}>
                <FA name='user' size={18} color={"rgba(0, 0, 0, 0.3)"}/>
                <Text style={[{fontFamily: "GSF", color: "rgba(0, 0, 0, 0.7)", fontSize: 12}]}>{cData.user_count}</Text>
              </View>
              <View style={[globalstyles.column, globalstyles.center, {gap: 2, display: "none"}]}>
                <MI name='cake' size={18} color={"rgba(0, 0, 0, 0.3)"}/>
                <Text style={[{fontFamily: "GSF", color: "rgba(0, 0, 0, 0.7)", fontSize: 12}]}>{cData.createdAt}</Text>
              </View>
              <View style={[globalstyles.column, globalstyles.center, {gap: 2}]}>
                <MI name='public' size={18} color={"rgba(0, 0, 0, 0.3)"}/>
                <Text style={[{fontFamily: "GSF", color: "rgba(0, 0, 0, 0.7)", fontSize: 12}]}>Public</Text>
              </View>
              <View style={[globalstyles.column, globalstyles.center, {gap: 2, display: cData.protect? "flex" : "none"}]}>
                <FA name='shield' size={18} color={"rgba(0, 0, 0, 0.3)"}/>
                <Text style={[{fontFamily: "GSF", color: "rgba(0, 0, 0, 0.7)", fontSize: 12}]}>Protected</Text>
              </View>
            </View>

            <ScrollView contentContainerStyle={[{paddingBottom: 0, paddingTop: 0}]}>

              <View style={[globalstyles.column, {display: "none"}]}>
                <Text style={[{fontSize: 16, fontWeight: 600}]}>Tags</Text>
                <View style={[globalstyles.row, globalstyles.center, {gap: 5, flexWrap: "wrap", marginTop: 5, paddingRight: 50 && 0, rowGap: 6, marginTop: 10}]}>
                  {cData.tags?.map?.(tg => 
                    <Chip name={tg} selected={true} fontSize={11} key={Math.random()}/>
                  )}
                </View>
              </View>
          
              <View style={[globalstyles.column, {marginTop: 10, gap: 3}]}>
                <Text style={[{fontSize: 16, fontWeight: 600}]}>About</Text>
                <Text style={[{fontFamily: "GSF", fontSize: 13, opacity: .8}]}>{cData.description}</Text>
              </View>

            </ScrollView>
            <View style={[globalstyles.row, {gap: 10, width: "100%", marginTop: 15}]}>
              <TouchableOpacity style={[globalstyles.row, globalstyles.center, {flex: 3}]} onPress={() => joinForum(cData.fid)}>
                <View style={[globalstyles.row, globalstyles.center, {backgroundColor: "maroon", width: "100%", borderWidth: 0, borderColor: "maroon", gap: 5, justifyContent: "center", paddingVertical: 10, borderRadius: 100, borderTopLeftRadius: 100, borderBottomLeftRadius: 100}]}>
                  <MI name='add' color={"white"} size={14}/>
                  <Text style={[{color: "white", fontFamily: "GSF", fontSize: 14}]}>Join</Text>
                </View>
              </TouchableOpacity>
              <View style={[globalstyles.row, globalstyles.center, {display: "none", flex: 3, backgroundColor: "rgba(255, 216, 194, 1)", borderWidth: 0, borderColor: "maroon", gap: 5, justifyContent: "center", paddingVertical: 10, borderRadius: 100, borderTopLeftRadius: 100, borderBottomLeftRadius: 100}]}>
                <MI name='favorite-outline' color={"maroon"} size={14}/>
                <Text style={[{color: "maroon", fontFamily: "GSF", fontSize: 14}]}>Save</Text>
              </View>
              <View style={[globalstyles.row, globalstyles.center, {display: "none", width: 40, backgroundColor: "white", borderWidth: .5, borderColor: "maroon", gap: 5, justifyContent: "center", paddingVertical: 10, borderRadius: 100, borderTopLeftRadius: 100, borderBottomLeftRadius: 100}]}>
                <MI name='share' color={"maroon"} size={14}/>
              </View>
            </View>
          </View>

        </View>
        
        <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 10}]}>
          <View style={[globalstyles.row, globalstyles.center, {width: "100%", justifyContent: "space-between"}]}>
            <View style={[globalstyles.row, globalstyles.center, {gap: 10}]}>
              <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", position: "relative", top: 1, marginTop: -0}]}>
                <MI name='dark-mode' size={15} color={'rgba(255, 200, 49, 1)'}/>
              </View>
              <Text style={{fontSize: 20, fontFamily: "GSF", fontWeight: ""}}>Nymso</Text>
            </View>
            <View style={[globalstyles.row, globalstyles.center, {gap: 15, display: "none"}]}>
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
            <TextInput style={[{width: "100%", fontSize: 15, paddingLeft: 10, fontFamily: "GSF"}]} placeholder='Search communities'/>
          </View>
        </View>

        <ScrollView style={[globalstyles.column, {width: "100%"}]} contentContainerStyle={[globalstyles.column, {paddingBottom: 200}]}>

          <View style={[globalstyles.row, {width: "100%", paddingHorizontal: 20, marginTop: 15, gap: 5, height: 150, display: "none"}]}>

            <View style={[globalstyles.row, {flex: 1, height: "100%", borderRadius: 15, backgroundColor: "rgba(172, 0, 0, 1)", paddingHorizontal: 20, paddingVertical: 15}]}>
              <View style={[globalstyles.column, {height: "100%", justifyContent: "space-between"}]}>
                <View style={[globalstyles.column, {gap: 0}]}>
                  <Text style={{color: "white", opacity: .6, fontSize: 15, fontWeight: 400, fontFamily: "GSF"}}>2 Days to Go</Text>
                  <Text style={{color: "white", fontSize: 20, fontWeight: 500, fontFamily: "GSF"}}>SpringFest 2026</Text>
                </View>
                <View style={[globalstyles.column, {gap: 0}]}>
                  <Text style={{color: "white", fontSize: 15, fontWeight: 400, fontFamily: "GSF"}}>Experience Javed Ali @ Pronite Day 3</Text>
                  <Text style={{color: "white", opacity: .6, fontSize: 12, fontWeight: 400, fontFamily: "GSF"}}>25th January 2025</Text>
                </View>
              </View>
            </View>

          </View>
        
          <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 15}]}>
            <View style={[globalstyles.row, globalstyles.center, {paddingHorizontal: 0, paddingVertical: 0, backgroundColor: "rgba(255, 216, 194, 0)", justifyContent: "space-between"}]}>
              <Text style={{fontSize: 22, fontWeight: 600, color: "black"}}>Discover</Text>
            </View>
          </View>

          <View style={[globalstyles.row, {width: "100%", marginTop: 10, paddingVertical: 0}]}>
            <View style={[globalstyles.row, {width: "100%", paddingHorizontal: 20}]}>
              <View style={[globalstyles.row, {gap: 10, marginTop: 0, width: "100%", flexWrap: "wrap"}]}>
                {discCateg.map(v => {
                  return (
                    <Chip name={v[0]} selected={v[1]} fontSize={13} key={Math.random()} onClick={() => {
                      let nCateg = [];
                      for(let i = 0; i < discCateg.length; i++) {
                        nCateg.push([discCateg[i][0], v[0] === discCateg[i][0]])
                      };
                      setDiscCateg(nCateg);
                    }}/>
                  )
                })}
              </View>
            </View>
          </View>

            
            {/* <View style={[globalstyles.row, globalstyles.center, {paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "rgba(255, 216, 194, 1)", alignSelf: "flex-start", borderRadius: 20}]}> */}
          <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 30}]}>
          
            <View style={[globalstyles.row, globalstyles.center, {paddingHorizontal: 0, paddingVertical: 0, backgroundColor: "rgba(255, 216, 194, 0)", justifyContent: "space-between", marginTop: 0}]}>
              <Text style={{fontSize: 15, fontWeight: 500, color: "black", fontFamily: "GSF"}}>Popular Forums</Text>
              <View style={[globalstyles.row, globalstyles.center, {paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "rgba(255, 216, 194, 1)" && "whitesmoke", alignSelf: "flex-start", borderRadius: 20}]}>
                <Text style={{fontSize: 11, fontWeight: 500, color: "rgba(255, 216, 194, 1)" && "black", fontFamily: "GSF"}}>Show All</Text>
              </View>
            </View>
            {/* </View> */}
            <View style={[globalstyles.row, {width: "100%", marginTop: 15, flexWrap: "wrap", justifyContent: "space-between", rowGap: 20, alignItems: "flex-start"}]}>
              
              {fData?.map?.(fs => {
                return (
                  <CommunityMiniCard name={fs.name} sdesc={fs.description} color={"white"} dark={false} borderColor={"rgba(0, 0, 0, 0.25)"} members={fs.user_count} 
                    key={fs.fid}
                    online={1}
                    onClick={() => {
                      if(!fs.joined) {
                        setCommModal(fs.fid);
                      } else {
                        router.navigate("/forum?fid="+fs.fid);
                      }
                    }}
                  />
                )
              })}

            </View>
          </View>

          <View style={[globalstyles.column, {width: "100%", paddingHorizontal: 20, marginTop: 25}]}>
            <View style={[globalstyles.row, globalstyles.center, {paddingHorizontal: 0, paddingVertical: 0, backgroundColor: "rgba(255, 216, 194, 0)", justifyContent: "space-between"}]}>
              <Text style={{fontSize: 15, fontWeight: 500, color: "black", fontFamily: "GSF"}}>All Forums</Text>
              <View style={[globalstyles.row, globalstyles.center, {paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "whitesmoke", alignSelf: "flex-start", borderRadius: 20}]}>
                <Text style={{fontSize: 11, fontWeight: 500, color: "rgba(255, 216, 194, 1)" && "black", fontFamily: "GSF"}}>Show All</Text>
              </View>
            </View>

            <View style={[globalstyles.row, {width: "100%", marginTop: 15, flexWrap: "wrap", justifyContent: "space-between", rowGap: 20}]}>
              <View style={[globalstyles.row, {width: "100%", gap: 10, flexWrap: "wrap", width: "100%"}]}>

                {fData.map(fs => {
                  return (
                    <CommunityMiniCard name={fs.name} sdesc={fs.description} color={"white"} dark={false} borderColor={"rgba(0, 0, 0, 0.25)"} members={fs.user_count} 
                    key={fs.fid}
                    online={1}
                      onClick={() => {
                      if(!fs.joined) {
                        setCommModal(fs.fid);
                      } else {
                        router.navigate("/forum?fid="+fs.fid);
                      }
                    }}
                    />
                  )
                })}
                
                {/* <View style={[globalstyles.row, globalstyles.center, {justifyContent: "space-between"}]}>
                  <View style={[globalstyles.row, globalstyles.center, {gap: 10}]}>
                    <Image source={AmbarLogo} style={[{borderRadius: 50, aspectRatio: 1, width: 43}]}/>
                    <View style={[globalstyles.column, {gap: 0}]}>
                      <Text style={[{fontSize: 16, fontWeight: 500, fontFamily: "GSF"}]}>Ambar</Text>
                      <Text style={[{fontSize: 11, fontWeight: 400, opacity: .8, fontFamily: "GSF"}]}>An inclusive community for all the members and allies at IIT Kharagpur</Text>
                    </View>
                  </View>
                </View>

                <View style={[globalstyles.row, globalstyles.center, {justifyContent: "space-between"}]}>
                  <View style={[globalstyles.row, globalstyles.center, {gap: 10}]}>
                    <Image source={CCLogo} style={[{borderRadius: 50, aspectRatio: 1, width: 43}]}/>
                    <View style={[globalstyles.column, {gap: 0}]}>
                      <Text style={[{fontSize: 16, fontWeight: 500, fontFamily: "GSF"}]}>Coding Cosmos</Text>
                      <Text style={[{fontSize: 11, fontWeight: 400, opacity: .8, fontFamily: "GSF"}]}>Community for all coders at IIT KGP</Text>
                    </View>
                  </View>
                </View>

                <View style={[globalstyles.row, globalstyles.center, {justifyContent: "space-between"}]}>
                  <View style={[globalstyles.row, globalstyles.center, {gap: 10}]}>
                    <View style={[globalstyles.row, globalstyles.center, {justifyContent: "center", borderRadius: 50, aspectRatio: 1, width: 43, backgroundColor: "maroon"}]}>
                      <Text style={{color: "white"}}>Indu</Text>
                    </View>
                    <View style={[globalstyles.column, {gap: 0}]}>
                      <Text style={[{fontSize: 16, fontWeight: 500, fontFamily: "GSF"}]}>Indu</Text>
                      <Text style={[{fontSize: 11, fontWeight: 400, opacity: .8, fontFamily: "GSF"}]}>Community for all the indumatis</Text>
                    </View>
                  </View>
                </View> */}

              </View>
            </View>
          </View>

        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  
});
