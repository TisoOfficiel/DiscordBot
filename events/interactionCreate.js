const  categorie  = require('../categorie.json');
const  role = require('../role.json');
const Discord = require("discord.js");
const { Permissions,MessageActionRow, MessageButton ,MessageReaction } = require('discord.js');


module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
        switch (interaction.customId) {
            case "DeleteChannel":
                interaction.channel.delete()
                break;
            case "Cancel":
                var message = interaction.message
                message.channel.bulkDelete(2);
                break;
            case"CreateTicket":
            let username = String(interaction.user.username).toLocaleLowerCase()
           
           


                interaction.guild.channels.create("Ticket- " + username,{
                    type: 'GUILD_TEXT',
                    parent:categorie.help,
                    permissionOverwrites: [
                        {
                            id: interaction.message.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL],
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL],
                        },
                        {
                            id: role.modo,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL],
                        },
                    ],
                }).then(channel =>{
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('CloseTicket')
                                .setLabel('Fermer')
                                .setStyle('DANGER'),
                        )
                    channel.send({content:'Salut <@'+interaction.user.id + ">\n\nTout d'abords cette conversation est confidentiel, seul le staff et toi pouvez avoir accès a ce channel ainsi qu'au message. \nCes derniers ont été mis au courant de la création du ticket. Ils reviendront vers toi au plus vite ici même.\nÀ tout moment tu peux supprimer ce channel en cliquant sur le bouton **Fermer**. Sinon le staff s'en occupera une fois que ton problème sera résolue.\n\n Voila je te laisse entre de bonne main en espèrant ne pas te revoir dans ce channel 😄", components: [row]})
                    
                    let logchannel = interaction.client.channels.cache.find(channel => channel.name === "log-ticket")
    
                    var embed2 = new Discord.MessageEmbed()
                           .setColor('#0099ff')
                           .setAuthor({name:'Ticket ouvert par ' +interaction.user.username})
                           .setDescription('Un ticket vient d\'être ouvert dans le channel <#'+channel +'>')
                           // .addFields(
                           //     { name: 'Nom : ', value: member ,inline:true},
                           //     { name: 'Surnom :',value: member.nickname,inline:true},
                           //     { name: 'ID : ', value: user.id,inline:true },
                           //     )
                   logchannel.send({ embeds: [embed2] })
                })
            

                break;
            case "CloseTicket":

                const row = new MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('Cancel')
                        .setLabel('Annuler')
                        .setStyle('SECONDARY'),
                ).addComponents(
                    new Discord.MessageButton()
                        .setCustomId(' ')
                        .setLabel('Supprimer')
                        .setStyle('DANGER'),
                        
                )
            interaction.channel.send({content:"Êtes-vous sûr de supprimer ce channel ?", components: [row] });
                break;
            case"JouerCasino":
                let channel = interaction.guild.channels.create("Salon- " + interaction.user.username,{
                type: 'GUILD_TEXT',
                parent:categorie.casino,
                permissionOverwrites: [
                    {
                        id: interaction.message.guild.id,
                        deny: [Permissions.FLAGS.VIEW_CHANNEL],
                    },
                    {
                        id: interaction.user.id,
                        allow: [Permissions.FLAGS.VIEW_CHANNEL],
                    },
                ]
            })

                
            break;
                
                // channel.updateOverwrite(message.guild.roles.everyone, {'VIEW_CHANNEL': false});
                // channel.updateOverwrite(role.PetitPote, {
                //     VIEW_CHANNE: false,
                // });
                
            default:
                return
                break;
        }
		
	},
};