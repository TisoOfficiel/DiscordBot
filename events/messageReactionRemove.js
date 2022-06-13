const  role = require('../role.json');
module.exports = {

    name:"messageReactionRemove",
    once:false,

    execute(client,messageReaction,user){
        const message = client.message;
        const member = message.guild.members.cache.get(messageReaction.id);

        // Suppresion role Mes petits potes
        if(message.id ==='773712184307089429'){
            member.roles.remove(role.petitpote);
        }
    }          

}