const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  if (message.content.startsWith('!reply')) {
    message.reply('Hey'); //Line (Inline) Reply with mention
  }
});

client.login(process.env.TOKEN);// 토큰 수정
