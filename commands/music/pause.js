const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'pause',
    description: 'pause a música atual',
    voiceChannel: true,

    execute({ inter }) {
const queue = useQueue(inter.guild);
        const player = useMainPlayer()

        if (!queue) return inter.editReply({ content: `Não há música tocando no momento ${inter.member}... tentar novamente? ❌`, ephemeral: true });
        
        if(queue.node.isPaused()) return inter.editReply({content: `A música já está pausada, ${inter.member}... tentar novamente? ❌`, ephemeral: true})

        const success = queue.node.setPaused(true);
        
        const PauseEmbed = new EmbedBuilder()
        .setAuthor({name: success ? `Current music ${queue.currentTrack.title} pausada ✅` : `Algo deu errado ${inter.member}... tentar novamente? ❌` })
        .setColor('#2f3136')
        
        return inter.editReply({ embeds: [PauseEmbed] });
    },
};
// embed update stoped here