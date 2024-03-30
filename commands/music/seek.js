const ms = require('ms');
const {  ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'seek',
    description: 'avançar ou retroceder em uma música',
    voiceChannel: true,
    options: [
    {
        name: 'tempo',
        description: 'tempo que você deseja avançar ou retroceder',
        type: ApplicationCommandOptionType.String,
        required: true,
    }
    ],
    async execute({ inter }) {
        const player = useMainPlayer()

        const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Não há música tocando no momento ${inter.member}... tentar novamente? ❌`, ephemeral: true });

        const timeToMS = ms(inter.options.getString('tempo'));

        if (timeToMS >= queue.currentTrack.durationMS) return inter.editReply({ content:`O tempo indicado é maior que o tempo total da música atual ${inter.member}... tentar novamente? ❌\n*Tente por exemplo um tempo válido como **5s, 10s, 20 segundos, 1m**...*`, ephemeral: true });

        await queue.node.seek(timeToMS);

        const SeekEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `Tempo definido na música atual **${ms(timeToMS, { long: true })}** ✅`})

        inter.editReply({ embeds: [SeekEmbed] });
    },
};