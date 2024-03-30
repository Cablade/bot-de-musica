const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');
module.exports = {
    name: 'back',
    description: "Volte a música anterior.",
    voiceChannel: true,

    async execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue || !queue.node.isPlaying()) return inter.editReply({ content: `Nenhuma música sendo reproduzida no momento ${inter.member}... tentar novamente ! ❌`, ephemeral: true });

        if (!queue.history.previousTrack) return inter.editReply({ content: `Não havia música tocando antes ${inter.member}... tente novamente! ❌`, ephemeral: true });

        await queue.history.back();

        const BackEmbed = new EmbedBuilder()
        .setAuthor({name: `Reproduzindo a faixa anterior ✅`})
        .setColor('#2f3136')

        inter.editReply({ embeds: [BackEmbed] });
    },
};