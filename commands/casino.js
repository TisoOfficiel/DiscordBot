const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require("discord.js")

module.exports.run = (client, message, args) => {
    // if(message.member.roles.cache.has(role.admin)){
		const row = new MessageActionRow()
			.addComponents(
				new Discord.MessageButton()
					.setCustomId('JouerCasino')
					.setLabel('Jouer')
					.setStyle('PRIMARY'),
			)
		message.channel.send({content:"Lancer le jeu", components: [row] });
	// }else{
	// 	message.reply('Désolé mon petit pote mais tu n\a pas les droits pour faire cela')
	// }
}