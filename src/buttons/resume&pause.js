module.exports = async ({ inter, queue }) => {
    if (!queue || !queue.playing) return inter.reply({ content: `❌ | Não há nenhuma música tocando no momento`, ephemeral: true })

    const success = queue.setPaused(false)

    if (!success) queue.setPaused(true)

    return inter.reply({ content: success ? `Current music ${queue.current.title} paused ✅` : `Current music ${queue.current.title} resumed ✅`, ephemeral: true })
}