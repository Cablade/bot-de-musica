const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'skip',
    description: 'pular a faixa',
    voiceChannel: true,

    execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content:`Não há música tocando no momento ${inter.member}... tentar novamente? ❌`, ephemeral: true });

        const success = queue.node.skip();

        const SkipEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: success ? `Música atual ${queue.currentTrack.title} pulada ✅` : `Algo deu errado ${inter.member}... tentar novamente? ❌` })


       return inter.editReply({ embeds: [SkipEmbed] });

    },
};