import { encrypt, decrypt, generateKeys } from "../crypt";

import { responseGetCookies } from "../utils";

import { session, user } from "../globalstates";

const URL = endpoint => 'https://sso.sayutel.com/' + endpoint;

function headers(data = {}) {
    let cookies = [];
    if(session.sesstoken?.length) {
        cookies.push(['sesstoken', session.sesstoken])
    }
    if(session.svtoken?.length) {
        cookies.push(['svtoken', session.svtoken])
    }
    let head = new Headers({
        'Origin': "https://accounts.sayutel.com",
        ...data
    })

    let cookie_val = "";

    for(let i = 0; i < cookies.length; i++) {
        cookie_val += (cookies[i][0] + "=" + cookies[i][1] + '; ');
    }

    if(cookie_val.length) {
        head.append("Cookie", cookie_val);
    }

    return head;
}

function createSession(resolver, retry = 0) {

    if(session.public_key) {
        return new Promise(resolve => resolve())
    }

    let [priv_key, pub_key] = generateKeys();

    let res, prom;
    
    if(resolver) {
        res = resolver
    } else {
        prom = new Promise(resolve => res = resolve);
    }

    fetch(URL('session'), {
        method: "POST",
        headers: headers(),
        body: pub_key
    }).then(resp => {
        
        if(resp.status === 200) {
            resp.text().then(p_key => {
                session.key = priv_key;
                session.public_key = p_key;
                let cookies = responseGetCookies(resp.headers);
                let sesstoken = cookies.find(t => t.name === 'sesstoken');
                session.sesstoken = sesstoken.value;
                console.log(session);
                res()
            })
        } else {
            createSession(res, retry + 1);
        }
    })

    return prom;
}

function dEncrypt(data) {
    return encrypt(data, session.public_key);
}

function dDecrypt(data) {
    return decrypt(data, session.key);
}

function requestOTP(email) {
    let res;
    let prom = new Promise(resolve => res = resolve);
    createSession().then(() => {
        fetch(URL('sv/otp'), {
            method: "POST",
            headers: headers(),
            body: dEncrypt(email)
        }).then(resp => {
                if(resp.status === 200) {
                    resp.text().then(val => {
                        let data = JSON.parse(dDecrypt(val));
                        if(!data.error) {
                            res(1);
                        } else {
                            res(0);
                        }
                    })
                } else {

                }
            }
        )
    })

    return prom;
}

function loginOTP(otp) {
    let res;
    let prom = new Promise(resolve => res = resolve);
    createSession().then(() => {
        fetch(URL('sv/login'), {
            method: "POST",
            headers: headers(),
            body: dEncrypt(otp)
        }).then(resp => {
                if(resp.status === 200) {
                    resp.text().then(val => {
                        let data = JSON.parse(dDecrypt(val));
                        if(!data.error) {
                            Object.keys(data.data).forEach(k => {
                                user[k] = data.data[k];
                            })
                            res(data.data);
                        } else {
                            res(0);
                        }
                    })
                } else {

                }
            }
        )
    })

    return prom;
}

export {createSession, dEncrypt, dDecrypt, requestOTP, loginOTP}