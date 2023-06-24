const { ActivityType } = require('discord.js')

module.exports = async (client) => {
    console.log(`Ativo no cliente ${client.user.username}\n-> Pronto em ${client.guilds.cache.size} servidores para ${client.users.cache.size} usuários`)

    client.user.setActivity(client.config.app.listening, { type: ActivityType.Listening })
}