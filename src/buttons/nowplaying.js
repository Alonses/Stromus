const { EmbedBuilder } = require('discord.js')

module.exports = async ({ client, inter, queue, user }) => {
    if (!queue || !queue.playing) return inter.reply({ content: `No music currently playing... try again ? ❌`, ephemeral: true })

    const track = queue.current

    const methods = ['desativado', 'faixa', 'lista']
    const timestamp = queue.getPlayerTimestamp()

    const trackDuration = timestamp.progress == 'Infinito' ? 'Infinito (live)' : track.duration

    const progress = queue.createProgressBar()


    const embed = new EmbedBuilder()
        .setAuthor({ name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setColor(client.embed_color(user.misc.color))
        .setThumbnail(track.thumbnail)
        .setDescription(`Volume **${queue.volume}**%\nDuração **${trackDuration}**\nProgresso ${progress}\nRepeteco **${methods[queue.repeatMode]}**\nSolicitado por ${track.requestedBy}`)
        .setFooter({ text: inter.member.user.username, iconURL: inter.member.avatarURL({ dynamic: true }) })

    inter.reply({ embeds: [embed], ephemeral: true })
}