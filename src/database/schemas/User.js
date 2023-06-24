const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    uid: { type: String, default: null },
    lang: { type: String, default: "pt-br" },
    social: {
        steam: { type: String, default: null },
        lastfm: { type: String, default: null },
        pula_predios: { type: String, default: null }
    },
    profile: {
        about: { type: String, default: null },
        join: { type: Boolean, default: true },
        creation: { type: Boolean, default: true },
        bank: { type: Boolean, default: true },
        lastfm: { type: Boolean, default: false },
        steam: { type: Boolean, default: false },
        thumbnail: { type: String, default: null }
    },
    misc: {
        color: { type: String, default: "#29BB8E" },
        daily: { type: String, default: null },
        money: { type: Number, default: 0 },
        embed: { type: String, default: "#29BB8E" },
        locale: { type: String, default: null },
        weather: { type: Boolean, default: true },
        fixed_badge: { type: Number, default: null }
    },
    conf: {
        banned: { type: Boolean, default: false },
        ghost_mode: { type: Boolean, default: false },
        notify: { type: Boolean, default: true },
        ranking: { type: Boolean, default: true },
        global_tasks: { type: Boolean, default: true }
    }
})

const model = mongoose.model("User", schema)

async function getUser(uid) {
    if (!await model.exists({ uid: uid })) await model.create({ uid: uid })

    return model.findOne({ uid: uid })
}

module.exports.User = model
module.exports = {
    getUser,
    migrateUsers
}