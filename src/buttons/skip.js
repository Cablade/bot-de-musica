module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma música sendo reproduzida no momento... tente novamente? ❌`, ephemeral: true });
    
    const success = queue.node.skip();

    return inter.editReply({ content: success ? `Música atual  ${queue.currentTrack.title} skippada ✅` : `Algo deu errado ${inter.member}... tente novamente? ❌`, ephemeral: true});
}