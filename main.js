require('dotenv').config()

const { Player } = require('discord-player')
const { Client, GatewayIntentBits } = require('discord.js')

const { alea_hex } = require('./src/functions/hex_color')
const { getUser } = require('./src/database/schemas/User')

const database = require('./src/database/database')

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
    disableMentions: 'everyone',
})

client.config = require('./config')
client.getUser = (id_user) => {
    return getUser(id_user)
}

client.embed_color = (entrada) => {
    if (entrada === "RANDOM")
        return alea_hex()

    return entrada.slice(-6)
}

global.player = new Player(client, client.config.opt.discordPlayer)

require('./src/loader')
require('./src/events')

database.setup(process.env.url_dburi)
client.login(process.env.token)