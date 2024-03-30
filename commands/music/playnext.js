const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType, useMainPlayer, useQueue   } = require('discord-player');

module.exports = {
    name: 'playnext',
    description: "música que você deseja tocar a seguir",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'a música que você deseja tocar a seguir',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Não há música tocando no momento ${inter.member}... tentar novamente ? ❌`, ephemeral: true });

        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.editReply({ content: `Nenhum resultado encontrado ${inter.member}... tentar novamente ? ❌`, ephemeral: true });

       if (res.playlist) return inter.editReply({ content: `Este comando não suporta playlists ${inter.member}... tentar novamente? ❌`, ephemeral: true });

        queue.insertTrack(res.tracks[0], 0)

        const PlayNextEmbed = new EmbedBuilder()
        .setAuthor({name: `A música foi inserida na fila... ela tocará a seguir 🎧` })
        .setColor('#2f3136')
        
        await inter.editReply({ embeds: [PlayNextEmbed] });


    }
}
