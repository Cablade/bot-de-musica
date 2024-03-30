module.exports = async (client) => {
    console.log(`Logado com sucesso em ${client.user.username}\nVamos tocar uma música!`);
    client.user.setActivity(client.config.app.playing);   
};