const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'jump',
    description: "Salta para uma faixa específica na fila",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'o nome/url da faixa para a qual você deseja pular',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'o lugar na fila em que a música está',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) {
        const player = useMainPlayer()
 
        const track = inter.options.getString('song');
        const number =  inter.options.getNumber('number')

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma música sendo reproduzida no momento ${inter.member}... tente novamente ? ❌`, ephemeral: true });
        if (!track && !number) inter.editReply({ content: `Você tem que usar uma das opções para pular para uma música ${inter.member}... tente novamente ? ❌`, ephemeral: true });

            if (track) {
                const track_to_jump = queue.tracks.toArray().find((t) => t.title.toLowerCase() === track.toLowerCase() || t.url === track)
                if (!track_to_jump) return inter.editReply({ content: `não consegui encontrar ${track} ${inter.member}... tente colocar a url ou o nome completo da música ? ❌`, ephemeral: true });
                queue.node.jump(track_to_jump);
                return inter.editReply({ content: `Pulou para ${track_to_jump.title}  ✅` });
    }
    if (number) {
        const index = number - 1
        const trackname = queue.tracks.toArray()[index].title
        if (!trackname) return inter.editReply({ content: `Esta faixa parece não existir ${inter.member}...  tente novamente?❌`, ephemeral: true });   
        queue.node.jump(index);

        const JumpEmbed = new EmbedBuilder()
        .setAuthor({name: `Pulou para ${trackname} ✅`})
        .setColor('#2f3136')
        
        inter.editReply({ embeds: [JumpEmbed] });
    }
         
    }
}
