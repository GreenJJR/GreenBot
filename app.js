const Discord = require('discord.js');
const fs = require('fs');
const { config } = require('process');
const client = new Discord.Client();

client.on('ready', () => {
  client.user.setActivity('코드', { type: 'WATCHING' })
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
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const id = msg.author.id;
  const name = msg.author.username;

  const filePath = `./data/${id}.json`;

  !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null;

  const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const today = new Date();
  today.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  const date = "" + today.getFullYear() + today.getMonth() + today.getDate();

  const howMuch = 1 + Math.floor(Math.random() * 99);

  if (command === "!안녕") { // Discord.Message 객체의 content 프로퍼티가 'ping' 일 때
    const embed = new Discord.MessageEmbed()
    .setAuthor("초록봇", "https://i.ibb.co/Dr8zZ3W/discord.png")
    .setTitle("안녕?")
    .setColor(0x58FAF4)
    
    msg.channel.send(embed);
  }

  if(command === "!췕" || command === "!출첵" || command === "!출석체크") {
    let saveUser = {};
    if(user.id) {
      if(user.date === date) {
        const embed = new Discord.MessageEmbed()
        .setAuthor("초록봇", "https://i.ibb.co/Dr8zZ3W/discord.png")
        .setTitle("출석체크 실패")
        .setColor(0xFF8000)
        .setDescription(`이미 출석체크를 완료 했습니다!`)
        .setThumbnail("https://i.ibb.co/ckCQQcs/001.png")
        .setTimestamp(new Date())
        .setFooter(`${name}`)
        
        msg.channel.send(embed);
        saveUser = user; // 유저 정보를 바꾸지 않고 저장할거임.
      }
      else {
        const embed = new Discord.MessageEmbed()
        .setAuthor("초록봇", "https://i.ibb.co/Dr8zZ3W/discord.png")
        .setTitle("출석체크 성공")
        .setColor(0x00FF00)
        .setDescription(`${user.money} 💵 -> ${user.money + howMuch} 💵`)
        .setThumbnail("https://i.ibb.co/ckCQQcs/001.png")
        .setTimestamp(new Date())
        .setFooter(`${name}`)
        
        msg.channel.send(embed);
        saveUser = {
          id,
          name,
          date,
          money : user.money + howMuch,
        };
      }
    }
    else {
      const embed = new Discord.MessageEmbed()
      .setAuthor("초록봇", "https://i.ibb.co/Dr8zZ3W/discord.png")
      .setTitle("FIRST 출석체크 성공")
      .setColor(0x00FF00)
      .setDescription(`0 💵 -> ${howMuch} 💵`)
      .setThumbnail("https://i.ibb.co/ckCQQcs/001.png")
      .setTimestamp(new Date())
      .setFooter(`${name}`)
      
      msg.channel.send(embed);
      saveUser = {id, name, date, money : howMuch};
    }
    fs.writeFileSync(filePath, JSON.stringify(saveUser));
  }

  if(command === "!지갑"){
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

  if (command === "!가위" || command === "!바위" || command === "!보") {
    const human = command.substring(1, 3);
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
