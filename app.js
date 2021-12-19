const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => { // message 이벤트시 msg (Discord.Message) 매개변수를 받고 실행할 함수
  if (msg.content === "야") { // Discord.Message 객체의 content 프로퍼티가 'ping' 일 때
    msg.reply("호!"); // reply 는 멘션 + , msg 로 출력됩니다.
  }
  
  if (msg.content === "가위" || msg.content === "바위" || msg.content === "보") {
    const human = msg.content;
    const list = ["가위", "바위", "보"];
    const random = Math.floor(Math.random() * 3);

    const bot = list[random];

    let winner = "";

    if (human == bot) {
        winner = "비김";
    }
    else{
        human === "가위"? (winner = bot === "바위" ? "봇" : "인간") : "";
        human === "바위"? (winner = bot === "보" ? "봇" : "인간") : "";
        human === "보"? (winner = bot === "가위" ? "봇" : "인간") : "";
        // 승자를 winner 변수에 넣어주는 로직임.
    }

    const result =
`
사람: ${human} VS 봇: ${bot}
${winner === "비김" ? "우리는 비겼다 인간." : winner + "의 승리다"}
`


    msg.reply(result);
  }
});

client.login(process.env.TOKEN);// 토큰 수정
