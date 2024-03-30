const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'skipto',
    description: "pula para uma faixa específica na fila",
    voiceChannel: true,
    options: [
        {
            name: 'musica',
            description: 'o nome/url da faixa para a qual você quer pular',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'numero',
            description: 'o lugar na fila onde a música está',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const player = useMainPlayer()

        const musica = inter.options.getString('musica');
        const numero =  inter.options.getNumber('numero')

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Não há música tocando no momento ${inter.member}... tentar novamente? ❌`, ephemeral: true });
        if (!musica && !numero) inter.editReply({ content: `Você precisa usar uma das opções para pular para uma música ${inter.member}... tentar novamente? ❌`, ephemeral: true });

            if (musica) {
                const musica_pular = queue.tracks.toArray().find((t) => t.title.toLowerCase() === musica.toLowerCase() || t.url === musica)
                if (!musica_pular) return inter.editReply({ content: `Não foi possível encontrar ${musica} ${inter.member}... tente usar a url ou o nome completo da música? ❌`, ephemeral: true });
                queue.node.skipTo(musica_pular);
                return inter.editReply({ content: `Pulou para ${musica_pular.title}  ✅` });
    }
    if (numero) {
        const index = numero - 1
        const nomeMusica = queue.tracks.toArray()[index].title
        if (!nomeMusica) return inter.editReply({ content: `Esta faixa não parece existir ${inter.member}...  tentar novamente?❌`, ephemeral: true });   
        queue.node.skipTo(index);

        const skipToEmbed = new EmbedBuilder()
        .setAuthor({name: `Pulou para ${nomeMusica} ✅`})
        .setColor('#2f3136')
        
        inter.editReply({ embeds: [skipToEmbed] });
    }
         
    }
}
