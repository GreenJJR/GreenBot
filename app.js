const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const convertImoticon = (who) => {
    if (who === "가위") {
        return "✌️"
    }
    else if (who === "바위") {
        return "✊"
    }
    else if (who === "보") {
        return "🤚"
    }
}

client.on('message', msg => { // message 이벤트시 msg (Discord.Message) 매개변수를 받고 실행할 함수
  if(msg.author.bot) return;
  if(msg.author.id === client.user.id) return;

  const id = msg.author.id;
  const name = msg.author.username;

  const filePath = `./data/${id}.json`;

  !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null;

  const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const today = new Date();
  today.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

  const howMuch = 1 + Math.floor(Math.random() * 99);

  if (msg.content === "!안녕") { // Discord.Message 객체의 content 프로퍼티가 'ping' 일 때
    msg.reply("안녕!"); // reply 는 멘션 + , msg 로 출력됩니다.
  }

  if(msg.content === "!췕" || msg.content === "!출첵" || msg.content === "!출석체크") {
    let saveUser = {};
    if(user.id) {
      if(user.today === today) {
        msg.reply(`오늘은 이미 받았네? 내일 다시 받아!`);
        saveUser = user; // 유저 정보를 바꾸지 않고 저장할거임.
      }
      else {
        msg.reply(`${howMuch} 💵 이 지급됐어!\n${name}의 현재 잔액은 ${user.money} -> ${user.money + howMuch}이야!`);
        saveUser = {
          id,
          name,
          today,
          money : user.money + howMuch,
        };
      }
    }
    else {
      msg.reply(`시작하는걸 환영해! ${howMuch}원을 줄게!`);
      saveUser = {id, name, today, money : howMuch};
    }
    fs.writeFileSync(filePath, JSON.stringify(saveUser));
  }

  if(msg.content === "!지갑"){
    if (user.id){
      const embed = new Discord.MessageEmbed()
      .setAuthor("초록봇", "https://i.ibb.co/Dr8zZ3W/discord.png")
      .setTitle("당신의 지갑")
      .setColor(0x00FF00)
      .setDescription(`${user.money} 💵`)
      .setThumbnail("https://picsum.photos/512/512")
      .setTimestamp(new Date())
      .setFooter(`${name}`)
      
      msg.channel.send(embed);
    }else {
      const embed = new Discord.MessageEmbed()
      .setAuthor("초록봇", "https://i.ibb.co/Dr8zZ3W/discord.png")
      .setTitle("당신의 지갑")
      .setColor(0xFE2E2E)
      .setDescription(`0 💵`)
      .setThumbnail("https://picsum.photos/512/512")
      .setTimestamp(new Date())
      .setFooter(`${name}`)
      
      msg.channel.send(embed);
    }
  }

  if (msg.content === "!가위" || msg.content === "!바위" || msg.content === "!보") {
    const human = msg.content.substring(1, 3);
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
사람: ${convertImoticon(human)}  VS  봇: ${convertImoticon(bot)}

${winner === "비김" ? "무승부 입니다." : "승자: " + winner}
`
    msg.reply(result);
  }
});

client.login(process.env.TOKEN);// 토큰 수정
