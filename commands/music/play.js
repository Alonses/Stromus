const { QueryType } = require('discord-player')
const { ApplicationCommandOptionType } = require('discord.js')

module.exports = {
    name: 'play',
    description: "play a song!",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'o som que você deseja tocar',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    async execute({ inter }) {

        await inter.deferReply({ ephemeral: true })

        const song = inter.options.getString('song')
        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        })

        if (!res || !res.tracks.length) return inter.editReply({ content: `Não encontrei resultados para essa pesquisa`, ephemeral: true })

        const queue = await player.createQueue(inter.guild, {
            metadata: inter.channel,
            spotifyBridge: client.config.opt.spotifyBridge,
            initialVolume: client.config.opt.defaultvolume,
            leaveOnEnd: client.config.opt.leaveOnEnd
        })

        try {
            if (!queue.connection) await queue.connect(inter.member.voice.channel)
        } catch {
            await player.deleteQueue(inter.guildId)
            return inter.editReply({ content: `Eu não consigo entrar nesse canal... ❌`, ephemeral: true })
        }

        await inter.editReply({ content: `Carregando sua ${res.playlist ? 'playlist' : 'faixa'}... 🎧` })

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0])

        if (!queue.playing) {
            await queue.play()
            queue.playing = true
        }
    }
}