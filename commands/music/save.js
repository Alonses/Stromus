const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: 'save',
    description: 'save the current track!',
    voiceChannel: true,

    async execute({ inter, user }) {
        const queue = player.getQueue(inter.guildId)

        if (!queue) return inter.reply({ content: `Não há nenhuma música tocando no momento ❌`, ephemeral: true })

        inter.member.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`:arrow_forward: ${queue.current.title}`)
                    .setColor(client.embed_color(user.misc.color))
                    .setURL(queue.current.url)
                    .addFields(
                        {
                            name: ':hourglass: **Duração:**',
                            value: `\`${queue.current.duration}\``,
                            inline: true
                        },
                        {
                            name: ':bust_in_silhouette: **Autor**',
                            value: `\`${queue.current.author}\``,
                            inline: true
                        },
                        {
                            name: ':eyes: **Visualizações**',
                            value: `\`${Number(queue.current.views).toLocaleString()}\``,
                            inline: true
                        },
                        {
                            name: ':label: **Link**',
                            value: `\`${queue.current.url}\``
                        }
                    )
                    .setThumbnail(queue.current.thumbnail)
                    .setFooter({ text: `Servidor ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false }) })
            ]
        }).then(() => {
            return inter.reply({ content: `:mailbox_with_mail: | Te enviei os detalhes dessa faixa no privado.`, ephemeral: true })
        }).catch(() => {
            return inter.reply({ content: `:o: | Não é possível enviar mensagens privadas para você`, ephemeral: true })
        })
    }
}