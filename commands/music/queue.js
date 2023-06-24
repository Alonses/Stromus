const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'queue',
    description: 'Get the songs in the queue',
    voiceChannel: true,

    execute({ client, inter, user }) {
        const queue = player.getQueue(inter.guildId)

        if (!queue) return inter.reply({ content: `Não há nenhuma música tocando no momento ❌`, ephemeral: true })

        if (!queue.tracks[0]) return inter.reply({ content: `No music in the queue after the current one ${inter.member}... try again ? ❌`, ephemeral: true })

        const methods = ['', '🔁', '🔂']

        const songs = queue.tracks.length

        const nextSongs = songs > 5 ? `e **${songs - 5}** outras músicas...` : `Na playlist **${songs}** músicas...`

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (adicionado por : ${track.requestedBy.username})`)

        const embed = new EmbedBuilder()
            .setColor(client.embed_color(user.misc.color))
            .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
            .setAuthor({ name: `Lista do servidor - ${inter.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
            .setDescription(`Agora: ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
            .setFooter({ text: inter.member.user.username, iconURL: inter.member.avatarURL({ dynamic: true }) })

        inter.reply({ embeds: [embed] })
    }
}