const Discord = require('discord.js');
const client = new Discord.Client();

client.guessingIn = [];

client.once('ready', () => {
	console.log('Ready!');
    
});

const isNumeric = str => {
    return !isNaN(str) && !isNaN(parseFloat(str)) 
  }
client.on('message',msg=>{
    if (!msg.member.roles.cache.some(role => role.name === 'psychos' || role.name ==='god')) return;
    if (!msg.content.startsWith('p-')) return
    let args = msg.content.split(' ')
    if (args.length != 2) {
        msg.reply('Invalid amount of arguments provided try \'p-guess (range)\', range e.g: 1-100')
        return
    }
    if (args[0] == 'p-guess'){
        if (client.guessingIn.includes(msg.channel.id)) {
            msg.reply('A game is already in progress')
            return;
        }
        let range = args[1].split('-')
        if (!(isNumeric(range[0])&&isNumeric(range[1]))){
            msg.reply('Invalid range')
            return;
        }
        client.guessingIn.push(msg.channel.id)
        let number = Math.floor(Math.random()*((parseInt(range[1])+1)-parseInt(range[0])))+parseInt(range[0])
        console.log(number)
        msg.channel.send(`Guess the number between ${range[0]} - ${range[1]}`)
        const filter = m => isNumeric(m.content);
        const collector = msg.channel.createMessageCollector(filter);

        collector.on('collect', m => {
            if (parseInt(m.content)==number){
                m.reply('you guessed the number!')
                client.guessingIn.splice(client.guessingIn.indexOf(msg.channel.id),1)
                collector.stop()
            }
        });
    } 
})

client.login('ODQ3OTQwNDg1MDUzOTM5NzU0.YLFYHQ.a3IyiMlmGYdof55tuG6XpFobwvg');
