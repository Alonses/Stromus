const { readdirSync } = require('fs')
const { Collection } = require('discord.js')

client.commands = new Collection()
CommandsArray = []

const events = readdirSync('src/events/').filter(file => file.endsWith('.js'))

console.log(`Carregando eventos...`)

for (const file of events) {
    const event = require(`./events/${file}`)

    client.on(file.split('.')[0], event.bind(null, client))
    delete require.cache[require.resolve(`./events/${file}`)]
}

console.log(`Carregando comandos...`)

readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'))

    for (const file of commands) {
        const command = require(`../commands/${dirs}/${file}`)
        if (command.name && command.description) {
            CommandsArray.push(command)

            client.commands.set(command.name.toLowerCase(), command)
            delete require.cache[require.resolve(`../commands/${dirs}/${file}`)]
        } else console.log(`[failed Command]  ${command.name.toLowerCase()}`)
    }
})

client.on('ready', (client) => {
    if (client.config.app.global) client.application.commands.set(CommandsArray)
    else client.guilds.cache.get(client.config.app.guild).commands.set(CommandsArray)
})