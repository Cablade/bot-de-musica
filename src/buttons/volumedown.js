const maxVol = client.config.opt.maxVol;

module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma música sendo reproduzida no momento... tente novamente? ❌`, ephemeral: true });

        const vol = Math.floor(queue.node.volume - 5)

        if (vol < 0 ) return inter.editReply({ content: `Não consigo mais diminuir o volume ${inter.member}... tente novamente? ❌`, ephemeral: true })
        
        if (queue.node.volume === vol) return inter.editReply({ content: `O volume que você deseja alterar já é o atual ${inter.member}... tente novamente?❌`, ephemeral: true });

        const success = queue.node.setVolume(vol);

        return inter.editReply({ content:success ? `O volume foi modificado para ${vol}/${maxVol}% 🔊` : `Algo deu errado ${inter.member}... tente novamente ? ❌`, ephemeral: true});
}