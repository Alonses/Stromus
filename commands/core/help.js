const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'help',
    description: "Todos os comandos do bot",
    showHelp: false,

    execute({ client, inter, user }) {
        const commands = client.commands.filter(x => x.showHelp !== false)

        const embed = new EmbedBuilder()
            .setColor(client.embed_color(user.misc.color))
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
            .setDescription('This code comes from a GitHub project [ZerioDev/Music-bot](https://github.com/ZerioDev/Music-bot).\nThe use of this one is possible while keeping the credits for free.\nIf you want to remove the credits join the Discord support server.')
            .addFields([{ name: `Enabled - ${commands.size}`, value: commands.map(x => `\`${x.name}\``).join(' | ') }])
            .setFooter({ text: inter.member.user.username, iconURL: inter.member.avatarURL({ dynamic: true }) })

        inter.reply({ embeds: [embed], ephemeral: true })
    }
}