const { EmbedBuilder, InteractionType } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = async (client, inter) => {
    await inter.deferReply()
    if (inter.type === InteractionType.ApplicationCommand) {
        const DJ = client.config.opt.DJ;
        const command = client.commands.get(inter.commandName);
        

    if (!command) return inter.editReply({ embeds: [ new EmbedBuilder().setColor('#ff0000').setDescription('❌ | Error! Por favor falar com o desenvolvedor')], ephemeral: true, }), client.slash.delete(inter.commandName)
    if (command.permissions && !inter.member.permissions.has(command.permissions)) return inter.editReply({ embeds: [ new EmbedBuilder().setColor('#ff0000').setDescription(`❌ | Você não tem a permissão necessária para ativar este comando!`)], ephemeral: true, })
    if (DJ.enabled && DJ.commands.includes(command) && !inter.member._roles.includes(inter.guild.roles.cache.find(x => x.name === DJ.roleName).id)) return inter.editReply({ embeds: [ new EmbedBuilder().setColor('#ff0000').setDescription(`❌ | Este comando so pode ser utilizado por membros com \`${DJ.roleName}\` `)], ephemeral: true, })
    if (command.voiceChannel) {
            if (!inter.member.voice.channel) return inter.editReply({ embeds: [ new EmbedBuilder().setColor('#ff0000').setDescription(`❌ | Você não está em um canal de voz!`)], ephemeral: true, })
            if (inter.guild.members.me.voice.channel && inter.member.voice.channel.id !== inter.guild.members.me.voice.channel.id) return inter.editReply({ embeds: [ new EmbedBuilder().setColor('#ff0000').setDescription(`❌ | Você não está no mesmo canal de voz!`)], ephemeral: true, })
       }
        command.execute({ inter, client });
    }
    if (inter.type === InteractionType.MessageComponent) {
        const customId = JSON.parse(inter.customId)
        const file_of_button = customId.ffb
const queue = useQueue(inter.guild);
        if (file_of_button) {
            delete require.cache[require.resolve(`../../src/buttons/${file_of_button}.js`)];
            const button = require(`../../src/buttons/${file_of_button}.js`)
            if (button) return button({ client, inter, customId, queue });
        }
    }
};