const { QueueRepeatMode } = require('discord-player')

module.exports = async ({ inter, queue }) => {

    const methods = ['desativado', 'faixa', 'lista']
    const modes = [QueueRepeatMode.TRACK, QueueRepeatMode.QUEUE, QueueRepeatMode.OFF]

    if (!queue || !queue.playing) return inter.reply({ content: `❌ | Não há nenhuma música tocando no momento`, ephemeral: true })

    const repeatMode = queue.repeatMode
    queue.setRepeatMode(modes[repeatMode])

    return inter.reply({ content: `loop made has been set to **${methods[queue.repeatMode]}**.✅` })
}