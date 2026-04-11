import { generateKeys, encrypt, decrypt } from "../crypt";

import { session, user, msgDB, forumData} from "../globalstates";

import { createID } from "../utils"

import * as SecureStore from "expo-secure-store";
import KVStore from "expo-sqlite/kv-store";

class WebSocketClient {
    constructor(url) {
        this.url = url;
        this.ws = null;
        this.auth = false;
        this.session = {
            key: null,
            public_key: null,
        };
        this.regCallbacks = {
            message: [],
            thread: [],
            forumMessage: [],
        };
        this.responseCallbacks = [];
        this.authRes = null;
    }

    start() {
        if(this.ws?.readyState === 1) return;
        this.session.key = null;
        this.session.public_key = null;
        if(!session.svtoken) return;
        this.ws = new WebSocket(this.url);
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onclose = this.onEnd.bind(this);
    }

    onOpen() {
        let [priv, p_key] = generateKeys();
        this.ws.send(p_key);
        this.session.key = priv;
    }

    onMessage(msg) {
        if(!this.session.public_key) {
            this.session.public_key = msg.data;
            this.sendCmd({type: 0, token: session.svtoken}, false).then(d => {
                if(!d.error) {
                    this.auth = true;
                    if(this.authRes) {
                        this.authRes();
                    }
                    KVStore.setItemSync("user", JSON.stringify(d.data));
                    console.log("auth good");
                    this.getChannels();
                }
            });
        } else {
            let data = JSON.parse(decrypt(msg.data, this.session.key));
            if(data.id) {
                let nrespCbs = [];
                for(let i = 0; i < this.responseCallbacks.length; i++) {
                    if(this.responseCallbacks[i].id === data.id) {
                        this.responseCallbacks[i].res(data);
                    } else {
                        nrespCbs.push(this.responseCallbacks[i]);
                    }
                }
                this.responseCallbacks = nrespCbs;
            }
            switch(data.type) {
                case 3: {
                    console.log(data);
                    msgDB.addMessage(data.data);
                    this.regCallbacks.message.forEach(cb => {
                        cb(data.data);
                    })
                    break;
                }

                 case 15: {
                    this.regCallbacks.forumMessage.forEach(cb => {
                        cb(data.data, data.user);
                    })
                    break;
                }
            }
        }
    }

    onEnd() {
        this.session.key = null;
        this.session.public_key = null;
        this.ws = null;
        this.auth = false;
        this.start();
    }

    sendCmd(data = {}, auth = true) {
        let res;
        let prom = new Promise(resolve => res = resolve);
        let id = createID();
        this.responseCallbacks.push({id, res});
        this.ws.send(encrypt(JSON.stringify({id, ...data}), this.session.public_key))
        return prom;
    }

    isAuth() {
        if(this.auth) {
            return new Promise(res => res())
        } else {
            let prom = new Promise(res => this.authRes = res);
            return prom;
        }
    }

    getUsers(user_ids) {
        return this.sendCmd({type: 6, user_ids: user_ids}).then(d => {
            if(!d.error) {
               return d.users;
            }
        })
    }

    getUser(user_id) {
        return this.getUsers([user_id]).then(users => {
            if(users[0]) return users[0];
        })
    }

    getChannels() {
        if(user.channels?.length) {
            return new Promise(res => res(user.channels));
        }
        return this.sendCmd({type: 7}).then(d => {
            if(!d.error) {
               user.channels = d.channels;
               return d.channels;
            }
        })
    }

    getAllForums() {

    }

    getForums() {
        if(forumData.length) {
            return new Promise(res => res(forumData));
        }
        return this.sendCmd({type: 12}).then(d => {
            if(!d.error) {
               forumData.push(...(d.forums));
               return d.forums;
            }
        })
    }

    getForumThreads(fid) {

        return this.sendCmd({type: 13, fid: fid}).then(d => {
            if(!d.error) {
                for(let f of forumData) {
                    if(f.fid === fid) {
                        f.threads = d.threads
                        break;
                    }
                }
                return d.threads;
            }
        })
        
    }

}

session.wsclient = new WebSocketClient("ws://209.74.79.245:4200");