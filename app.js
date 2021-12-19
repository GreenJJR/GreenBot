const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => { // message 이벤트시 msg (Discord.Message) 매개변수를 받고 실행할 함수
  if (msg.content === "야") { // Discord.Message 객체의 content 프로퍼티가 'ping' 일 때
    msg.reply("호!"); // reply 는 멘션 + , msg 로 출력됩니다.
  }
  
  if (msg.content === "가위" || msg.content === "가위" || msg.content === "가위") {
    const human = msg.content;
    const list = ["가위", "바위", "보"];
    const random = Math.floor(Math.random() * 3);

    const bot = list[random];

    msg.reply(bot);
  }
});

client.login(process.env.TOKEN);// 토큰 수정
