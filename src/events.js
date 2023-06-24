const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')

player.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`)
})

player.on('connectionError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`)
})

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return

    const embed = new EmbedBuilder()
        .setAuthor({ name: `Começando a tocar ${track.title} em ${queue.connection.channel.name} 🎧`, iconURL: track.requestedBy.avatarURL() })
        .setColor('#13f857')

    const back = new ButtonBuilder()
        .setLabel('Anterior')
        .setCustomId(JSON.stringify({ ffb: 'back' }))
        .setStyle('Primary')

    const skip = new ButtonBuilder()
        .setLabel('Próxima')
        .setCustomId(JSON.stringify({ ffb: 'skip' }))
        .setStyle('Primary')

    const resumepause = new ButtonBuilder()
        .setLabel('Pausar')
        .setCustomId(JSON.stringify({ ffb: 'resume&pause' }))
        .setStyle('Danger')

    const loop = new ButtonBuilder()
        .setLabel('Repeteco')
        .setCustomId(JSON.stringify({ ffb: 'loop' }))
        .setStyle('Secondary')

    const queuebutton = new ButtonBuilder()
        .setLabel('Fila')
        .setCustomId(JSON.stringify({ ffb: 'queue' }))
        .setStyle('Secondary')

    const row1 = new ActionRowBuilder().addComponents(back, loop, resumepause, queuebutton, skip)
    queue.metadata.send({ embeds: [embed], components: [row1] })
})

player.on('trackAdd', (queue, track) => {
    queue.metadata.send(`Faixa ${track.title} adicionado a fila ✅`)
})

player.on('botDisconnect', (queue) => {
    queue.metadata.send('Eu fui retirado do canal de voz manualmente, limpando a fila... ❌')
})

player.on('channelEmpty', (queue) => {
    queue.metadata.send('Ninguém está no canal de voz, saindo de fininho... ❌')
})

player.on('queueEnd', (queue) => {
    queue.metadata.send('A fila foi encerrada ✅')
})

player.on('tracksAdd', (queue, tracks) => {
    queue.metadata.send(`Todas as músicas da playlist foram adicionadas a fila ✅`)
})

// v6
player.on('connection', (queue) => {
    queue.dispatcher.voiceConnection.on('stateChange', (oldState, newState) => {
        const oldNetworking = Reflect.get(oldState, 'networking')
        const newNetworking = Reflect.get(newState, 'networking')

        const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
            const newUdp = Reflect.get(newNetworkState, 'udp')
            clearInterval(newUdp?.keepAliveInterval)
        }

        oldNetworking?.off('stateChange', networkStateChangeHandler)
        newNetworking?.on('stateChange', networkStateChangeHandler)
    })
})

// v5
player.on('connectionCreate', (queue) => {
    queue.connection.voiceConnection.on('stateChange', (oldState, newState) => {
        const oldNetworking = Reflect.get(oldState, 'networking')
        const newNetworking = Reflect.get(newState, 'networking')

        const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
            const newUdp = Reflect.get(newNetworkState, 'udp')
            clearInterval(newUdp?.keepAliveInterval)
        }

        oldNetworking?.off('stateChange', networkStateChangeHandler)
        newNetworking?.on('stateChange', networkStateChangeHandler)
    })
})