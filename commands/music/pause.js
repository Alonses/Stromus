module.exports = {
    name: 'pause',
    description: 'pause the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId)

        if (!queue) return inter.reply({ content: `❌ | Não há nenhuma música tocando no momento`, ephemeral: true })

        if (queue.connection.paused) return inter.reply({ content: ':pause_button: | A música atual está pausada!', ephemeral: true })

        const success = queue.setPaused(true)

        return inter.reply({ content: success ? `:pause_button: | ${queue.current.title} pausada` : `:o: | Algo deu errado com este comando.` })
    }
}