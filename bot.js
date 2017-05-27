let Discord = require("discord.io");

const token = process.env.discordToken;

if (!token) {
	console.log("NO TOKEN FOUND!");
	return;
}

let bot = new Discord.Client({
	token: token,
	autorun: true
});

bot.on("ready", function () {
	console.log(bot.username + " - (" + bot.id + ")", "ready");
	bot.editUserInfo({
		// avatar: avatar, //Optional
		// email: "supdawg@gmail.com" //Optional
		//new_password: "supersecretpass123", //Optional
		//password: "supersecretpass", //Required
		//username: "Yuna" //Optional
	});
});
bot.on("message", function (user, userID, channelID, message, event) {
	try {
		if (event.d.author.bot) {
			return;
		}
		if (message[0] != "!") {
			return;
		}
		let moduleName = message.split(" ")[0];
		let payload = {
			user: user,
			userID: userID,
			channelID: channelID,
			message: message,
			event: event,
			moduleName: moduleName.replace("!", "").toLowerCase(),
			command: message.replace(moduleName, "").substring(1)
		};
		HandleBotCommand(payload);
	}
	catch (ex) {
		console.error("errorwithbotonmessage", ex);
	}
});
bot.on("disconnected", function () {
	console.log("Bot disconnected reconnecting");
	bot.connect();
});
bot.on("disconnect", function (erMsg, code) {
	console.log("Bot disconnected reconnecting");
	console.log("erMsg", erMsg);
	console.log("code", code);
	bot.connect();
});

function HandleBotCommand(payload) {
	if (payload.moduleName == "fswiki") {
		bot.sendMessage({
			to: payload.channelID,
			message: "http://wiki.fed-space.com/index.php?search=" + payload.command
		});
	}
}
