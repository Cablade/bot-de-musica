const maxVol = client.config.opt.maxVol;
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'volume',
    description: 'ajustar',
    voiceChannel: true,
    options: [
        {
            name: 'volume',
            description: 'Nivel de volume',
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol
        }
    ],

    execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue) return inter.editReply({ content: `Não há música tocando no momento ${inter.member}... tentar novamente? ❌`, ephemeral: true });
        const vol = inter.options.getNumber('volume')

        if (queue.node.volume === vol) return inter.editReply({ content: `O volume que você deseja alterar já é o atual ${inter.member}... tentar novamente? ❌`, ephemeral: true });

        const success = queue.node.setVolume(vol);

       return inter.editReply({ content: success ? `O volume foi modificado para ${vol}/${maxVol}% 🔊` : `Algo deu errado ${inter.member}... tentar novamente? ❌` });
    },
};