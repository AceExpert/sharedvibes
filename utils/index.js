class Cookie {

    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

function getCookies(cookie) {
    if(!cookie) return [];
    let cookies = [];

    let current = {name: '', value: '', extraVal: ''};
    let state = 1;
    let state_start = 1;

    for(let i = 0; i < cookie.length; i++) {
        let chr = cookie[i];
        if(state === 1) {
            if(state_start) {
                state_start = 0;

                if(i) {
                    if(chr !== ' ') {
                        current.value += ';' + chr;
                        state = 2;
                    } else {
                        cookies.push(new Cookie(current.name, current.value));
                        current.name = '';
                        current.value = '';
                    }
                } else {
                    current.name += chr;
                }
            } else {
                
                if(chr === '=') {
                    state = 2;
                } else {
                    current.name += chr;
                };
            }
            
        } else if (state === 2) {
            if(chr === ';') {
                state = 1;
                state_start = 1;
            } else {
                current.value += chr;
            };
        }
    }

    if(current.name) {
        cookies.push(new Cookie(current.name, current.value));
    }

    return cookies
}

function responseGetCookies(headers) {
    let cookies = [];
    headers.forEach((v, key) => {
        if(key.toLowerCase() === 'set-cookie') {
            cookies.push(getCookies(v)[0]);
        }
    })
    return cookies;
}

function createID() {
    return Math.round(Math.random() * 1000000000 + 10000)
}

export {getCookies, responseGetCookies, createID};