const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

var version = "1.0.7"


//client.on("ready", () => {
  // client.channels.cache.get("111").send(`I'm online! @ Version:${version}`) //
//}) //Send an update to a channel to ensure everything is working on startup


client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  //Validation for only picking up messages with correct formatting, and preventing loops
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if(command === 'ping') {
    message.channel.send('Ping?')
    .then(msg => {
      msg.edit(`Pong! (took: ${msg.createdTimestamp - message.createdTimestamp}ms)`);
   });
  } else
  if (command === 'blah') {
    message.channel.send('Meh.');
  }

  if(command === 'version') {
    client.channels.cache.get("111").send(`I'm online! @ Version:${version}`) //Version check
    message.channel.send('version?')
    .then(msg => {
      msg.edit(`I'm online! @ Version:${version}`);
   });
  }

  if(command === 'test') {

  let attachment = 'n/a'; //Attachment handling
  if(message.attachments.size > 0) {
   attachment = new Discord.MessageAttachment((message.attachments.first().url));
  }
  let botMsg = args.join(" ");
  message.channel.send(botMsg, attachment); //Send a message and the attachment in one
  }

  if(command === "say"){
  let text = args.join(" "); //Allows the bot to say specific messages
  message.delete();
  message.channel.send(text);
  }

  if (command === 'gw') {
	  if(message.author.id !== config.ownerID) return; //Checking that only the correct person can send these messages to all connected servers

	  let attachment = 'attachError';

	  if(message.attachments.size > 0) //Attachment handling
	  {
		  attachment = new Discord.MessageAttachment((message.attachments.first().url));
		  //message.channel.send(message.attachments.first().url);
		  //https://stackoverflow.com/questions/55403855/getting-an-image-url-from-a-message
	  }
	  let botMsg = args.join(" ");

	  client.channels.cache.get("111").send(botMsg, attachment);         //Replace the number with the discord server/channel ID you want to send messages too
	  client.channels.cache.get("222").send(botMsg, attachment); //Additional example to add another server/channel, this could be looped.


  }

  if (command === 'ble') { //Staging server/testing

	let botMsg = 'error';
	  if(message.attachments.size > 0)
	  {
		  botMsg = message.attachments.first().url;
		  //message.channel.send(message.attachments.first().url);

	  } else {
		  botMsg = args.join(" ");
	  }

	client.channels.cache.get("000").send(botMsg);

  }


});

 client.on("ready", () => {
  client.user.setActivity(`Hunting for giveaways`); //Have a custom status
 });

client.login(config.token);
