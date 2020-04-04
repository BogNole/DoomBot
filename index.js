const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");

bot.on("warn", console.warn);

bot.on("error", console.error);

bot.on("ready", () => {
  console.log(`${bot.user.tag} has been successfully turned on!`)
  bot.user.setActivity("DEMONS",{type: "SLAYING!"});
}
     );  


bot.on("disconnect", () => console.log("An error occurred, trying to reconnect!"));

bot.on("reconnecting", () => console.log("I am reconnecting now..."));

bot.on('message', message => {

  if (!message.guild) return;

 
  if (message.content.startsWith('d!clear')) {
    
    const args = message.content.split(' ').slice(1); // All arguments behind the command name with the prefix
    const amount = args.join(' '); // Amount of messages which should be deleted
    
    if (!amount) return message.reply('You haven\'t given an amount of messages which should be deleted!'); // Checks if the `amount` parameter is given
    if (isNaN(amount)) return message.reply('The amount parameter isn`t a number!'); // Checks if the `amount` parameter is a number. If not, the command throws an error
    
    if (amount > 100) return message.reply('You can`t delete more than 100 messages at once!'); // Checks if the `amount` integer is bigger than 100
    if (amount < 1) return message.reply('You have to delete at least 1 message!'); // Checks if the `amount` integer is smaller than 1
    
     message.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
        message.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
    )});
    }

    if(message.content.startsWith(`d!info`)){

      const infoEmbed = new Discord.MessageEmbed()
      .setColor('##fc0303')
      .setTitle('Information on current Guild')
      .setAuthor(message.guild.name)
      .setDescription('A guild for people to relax and enjoy some games')
      .addFields(
        { name: '**Guild Owner:**', value: message.guild.owner },
        { name: '\u200B', value: '\u200B' },
      )
      .setThumbnail('https://i.imgur.com/ujWMPb6.jpg')
      .setTimestamp()
      .setFooter('End of message.');
    
    message.channel.send(infoEmbed);


    }

    
  })
  bot.login(config.token)