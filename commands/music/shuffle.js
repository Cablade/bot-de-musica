const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'shuffle',
    description: 'embaralhar as músicas',
    voiceChannel: true,

    async execute({ inter }) {
        const player = useMainPlayer()

        const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Não há música tocando no momento ${inter.member}... tentar novamente? ❌`, ephemeral: true });

        if (!queue.tracks.toArray()[0]) return inter.editReply({ content: `Não há músicas na fila após a atual ${inter.member}... tentar novamente? ❌`, ephemeral: true });

        await queue.tracks.shuffle();

        const ShuffleEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `Fila embaralhada ${queue.tracks.size} música(s)! ✅` })

       return inter.editReply({ embeds: [ShuffleEmbed] });
    },
};