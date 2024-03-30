const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'resume',
    description: 'tocar a música',
    voiceChannel: true,

    execute({ inter }) {
        const player = useMainPlayer()

        const queue = useQueue(inter.guild);

        if (!queue) return inter.editReply({ content: `Não há música tocando no momento ${inter.member}... tentar novamente? ❌`, ephemeral: true });
        

        if(queue.node.isPlaying()) return inter.editReply({content: `A música já está tocando, ${inter.member}... tentar novamente? ❌`, ephemeral: true})

        const success = queue.node.resume();
        
        const ResumeEmbed = new EmbedBuilder()
        .setAuthor({name: success ? `Música atual ${queue.currentTrack.title} retomada ✅` : `Algo deu errado ${inter.member}... tentar novamente? ❌` })
        .setColor('#2f3136')
        
        return inter.editReply({ embeds: [ResumeEmbed] });

    },
};