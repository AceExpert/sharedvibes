import * as SQLite from 'expo-sqlite';

class Messages {

    constructor() {
        this.db = SQLite.openDatabaseSync("messages");
        this.db.runSync("CREATE TABLE if not exists messages(mid, cid, uid, content, reply_id, date, type, self);")
    }

    getMessages(cid) {
        return this.db.getAllSync("SELECT * from messages where cid=?;", cid);
    }

    addMessage({cid, uid, mid, content = null, reply_id = null, date, type = 0, self = null}) {
        this.db.runSync("INSERT INTO messages VALUES(?, ?, ?, ?, ?, ?, ?, ?);", mid, cid, uid, content, reply_id, date, type, self);
    }

}

let msgDB = new Messages();

export { msgDB };
