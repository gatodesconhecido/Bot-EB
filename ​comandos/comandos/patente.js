const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Cria uma coleção para guardar os comandos em memória
client.commands = new Collection();

// Caminho para a pasta 'comandos'
const pastaComandos = path.join(__dirname, 'comandos');
const arquivosComandos = fs.readdirSync(pastaComandos).filter(file => file.endsWith('.js'));

// Lê arquivo por arquivo dentro da pasta
for (const arquivo of arquivosComandos) {
    const caminhoArquivo = path.join(pastaComandos, arquivo);
    const comando = require(caminhoArquivo);
    
    if ('data' in comando && 'execute' in comando) {
        client.commands.set(comando.data.name, comando);
    }
}

// Quando alguém usa um comando:
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const comando = interaction.client.commands.get(interaction.commandName);
    if (!comando) return;

    try {
        await comando.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Ocorreu um erro ao executar este comando!', ephemeral: true });
    }
});
