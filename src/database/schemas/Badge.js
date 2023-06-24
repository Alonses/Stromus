const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    uid: { type: String, default: null },
    badge: { type: Number, default: null },
    timestamp: { type: Number, default: null }
})

const model = mongoose.model("Badge", schema)

async function getUserBadges(uid) {
    return model.find({ uid: uid })
}

async function createBadge(uid, badge_id, timestamp) {
    await model.create({ uid: uid, badge: badge_id, timestamp: timestamp })
}

module.exports.Badge = model
module.exports = {
    createBadge,
    getUserBadges,
    migrateBadges
}