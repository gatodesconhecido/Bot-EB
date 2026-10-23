const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    // 1. Dados do comando para o Discord
    data: new SlashCommandBuilder()
        .setName('ajuda')
        .setDescription('Exibe a lista de comandos'),

    // 2. O que o comando faz quando é executado
    async execute(interaction) {
        await interaction.reply('Aqui está a lista de comandos!');
    }
};
