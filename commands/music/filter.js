const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'filter',
    description: 'adicionar um filtro à sua faixa',
    voiceChannel: true,
    options: [
        {
            name: 'filtro',
            description: 'filtro que você deseja adicionar',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [...Object.keys(require("discord-player").AudioFilters.filters).map(m => Object({ name: m, value: m })).splice(0, 25)],
        }
    ],

    async execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Não há música tocando no momento ${inter.member}... tentar novamente? ❌`, ephemeral: true });

        const filtroAtual = queue.filters.ffmpeg.getFiltersEnabled()[0];

        const infiltro = inter.options.getString('filter');

        const filtros = [];

        queue.filters.ffmpeg.getFiltersEnabled().map(x => filtros.push(x));
        queue.filters.ffmpeg.getFiltersDisabled().map(x => filtros.push(x));

        const filtro = filtros.find((x) => x.toLowerCase() === infiltro.toLowerCase().toString());

        if (!filtro) return inter.editReply({ content: `Este filtro não existe ${inter.member}... tentar novamente? ❌\n${filtroAtual ? `Filtro atualmente ativo ${filtroAtual}.\n` : ''}Lista de filtros disponíveis ${filtros.map(x => `${x}`).join(', ')}.`, ephemeral: true });

        await queue.filters.ffmpeg.toggle(filtro)

        const FilterEmbed = new EmbedBuilder()
        .setAuthor({name: `O filtro ${filtro} agora está ${queue.filters.ffmpeg.isEnabled(filtro) ? 'habilitado' : 'desabilitado'} ✅\n*Lembre-se, quanto mais longa a música, mais tempo isso levará.*`})
        .setColor('#2f3136')

       return inter.editReply({ embeds: [FilterEmbed] });
    },
};