
const { MessageEmbed } = require('discord.js');

const  role  = require('../role.json');
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports.run = (client, message, args) => {

    if(!message.member.roles.cache.has(role.admin))return;
    
    const OpenTicket = new MessageEmbed()
	.setColor('#0099ff')	
	.setAuthor({name:'❓ Contacter le STAFF ❓'})
	.setDescription('*Un problème concernant le serveur ?\n Crée un ticket pour nous le dire.*\n Section qui demande une ***intervention de Modérateur***.\n\n ⚠️ Attention tout abus sera **sanctionner**')

    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('CreateTicket')
					.setLabel('Ouvrir un Ticket')
					.setStyle('SECONDARY')
                    .setEmoji('📩')
	        )
    
    
    
	message.channel.send({ embeds: [OpenTicket] ,components: [row]});

}