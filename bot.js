const http = require("http");
const express = require("express");
const app = express();
var server = require("http").createServer(app);
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
setInterval(() => {
  http.get(`https://glitch.com/~mayflowers-lolz`);
}, 280000);

const Discord = require("discord.js");
const commando = require("discord.js-commando");
const request = require("request-promise");
const path = require("path");
const config = require(path.join(__dirname, "config", "config.json"));
const client = new commando.CommandoClient({
  owner: "519198489062670336",
  commandPrefix: ";",
  unknownCommandResponse: true,
  selfbot: false,
  commandEditableDuration: 60
});

client.once("ready", () => {
  client.user.setPresence({
    game: { name: "Monitoring Members" },
    status: "online"
  });
});

client.registry
  .registerGroups([
    ["mod", "Moderation commands"],
    ["miscellaneous", "Miscellaneous commands"],
    ["administrator", "Administrator commands"],
    ["es", "ES commands"],
    ["icf", "ICF commands"]
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, "commands"));
let timeout = new Set();
let cdseconds = 15; // 1 Minute
client.on("message", msgObject => {
  if (msgObject.channel.id == 770484321147813942) {
    let Arguments = msgObject.content.split(" ");
    let channel = msgObject.client.guilds
      .get("777676131621011497")
      .channels.find("id", Arguments[0]);
    if (channel) {
      channel
        .fetchMessages({ around: Arguments[1], limit: 1 })
        .then(messages => {
          const fetchedMsg = messages.first();
          fetchedMsg.edit(
            "Wowzers, your command has been executed in-game on server `" +
              Arguments[2] +
              "`!"
          );
        });
    } else {
    }
  } else if (msgObject.channel.id == 770484321147813942) {
    let Arguments = msgObject.content.split(" ");
    let channel = msgObject.client.guilds
      .get("777676131621011497")
      .channels.find("id", Arguments[0]);
    let idMessage = Arguments[1];
    let JobId = Arguments[2];
    let pppeh = Arguments[3];
    let Players = Arguments[4];

    if (channel) {
      channel.fetchMessages({ around: idMessage, limit: 1 }).then(messages => {
        const fetchedMsg = messages.first();
        let embed = new Discord.RichEmbed()
          .setAuthor("")
          .setTitle(`Server ${pppeh}`)
          .setTimestamp()
          .setURL(
            `hhttps://www.roblox.com/games/4553950954/New-Haven-County?jobId=${JobId}`
          );
        Players = Players.split("|");
        Players.forEach(m => {
          let sehbjfwjhkgetrghjjhg = m.split(":");
          embed.addField(
            sehbjfwjhkgetrghjjhg[0],
            `[Roblox Profile](https://www.roblox.com/users/${
              sehbjfwjhkgetrghjjhg[1]
            }/profile)`,
            true
          );
        });
        fetchedMsg.reply(embed);
      });
    } else {
    }
  }
  /*
  if (msgObject.content.toLowerCase().includes("black")) {
    msgObject.channel.send("Did I just hear my favorite object?")  
  }*/
});

client.login(config.token);
