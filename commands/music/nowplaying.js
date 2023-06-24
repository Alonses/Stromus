const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')

module.exports = {
    name: 'nowplaying',
    description: 'view what is playing!',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId)

        if (!queue) return inter.reply({ content: `Não há nenhuma música tocando no momento ❌`, ephemeral: true })

        const track = queue.current
        const methods = ['desativado', 'faixa', 'lista']
        const timestamp = queue.getPlayerTimestamp()

        const trackDuration = timestamp.progress == 'Infinito' ? 'infinito (live)' : track.duration
        const progress = queue.createProgressBar()

        const embed = new EmbedBuilder()
            .setAuthor({ name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
            .setThumbnail(track.thumbnail)
            .setDescription(`**Volume: ** \`${queue.volume}%\`\n**Duração: **\`${trackDuration}\`\n**Progresso:** ${progress}\n**Repeteco: ** \`${methods[queue.repeatMode]}\`\nSolicitado por ${track.requestedBy}`)
            .setFooter({ text: inter.member.user.username, iconURL: inter.member.avatarURL({ dynamic: true }) })
            .setColor('ff0000')
            .setTimestamp()

        const saveButton = new ButtonBuilder()
            .setLabel('Salvar faixa')
            .setCustomId(JSON.stringify({ ffb: 'savetrack' }))
            .setStyle('Danger')

        const volumeup = new ButtonBuilder()
            .setLabel('+ Volume')
            .setCustomId(JSON.stringify({ ffb: 'volumeup' }))
            .setStyle('Primary')

        const volumedown = new ButtonBuilder()
            .setLabel('- Volume')
            .setCustomId(JSON.stringify({ ffb: 'volumedown' }))
            .setStyle('Primary')

        const loop = new ButtonBuilder()
            .setLabel('Repetir')
            .setCustomId(JSON.stringify({ ffb: 'loop' }))
            .setStyle('Danger')

        const resumepause = new ButtonBuilder()
            .setLabel('Tocar e Pausar')
            .setCustomId(JSON.stringify({ ffb: 'resume&pause' }))
            .setStyle('Success')

        const row = new ActionRowBuilder().addComponents(volumedown, saveButton, resumepause, loop, volumeup)

        inter.reply({ embeds: [embed], components: [row] })
    }
}