const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'remove',
    description: "remove uma música da fila",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'o nome da música ou o url da música que você deseja remover',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'o lugar da música na fila que você deseja remover',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const player = useMainPlayer()

        const number =  inter.options.getNumber('number')
        const track = inter.options.getString('song');

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Não há música tocando no momento  ${inter.member}... tente novamente ? ❌`, ephemeral: true });
        if (!track && !number) inter.editReply({ content: `Você tem que usar uma das opções para remover uma música ${inter.member}... tente novamente ? ❌`, ephemeral: true });

        const BaseEmbed = new EmbedBuilder()
        .setColor('#2f3136')


        if (track) {
            const track_to_remove = queue.tracks.toArray().find((t) => t.title === track || t.url === track);
            if (!track_to_remove) return inter.editReply({ content: `não consegui encontrar ${track} ${inter.member}... tente usar a url ou o nome completo da música ? ❌`, ephemeral: true });
            queue.removeTrack(track_to_remove);
            BaseEmbed.setAuthor({name: `removido ${track_to_remove.title} da fila ✅` })

            return inter.editReply({ embeds: [BaseEmbed] });
        }

        if (number) {

            const index = number - 1
            const trackname = queue.tracks.toArray()[index].title

            if (!trackname) return inter.editReply({ content: `Esta faixa parece não existir ${inter.member}...  tente novamente ?❌`, ephemeral: true });   

            queue.removeTrack(index);

            BaseEmbed.setAuthor({name: `removido ${trackname} da fila ✅` })

            return inter.editReply({ embeds: [BaseEmbed] });
        }


         
    }
}
