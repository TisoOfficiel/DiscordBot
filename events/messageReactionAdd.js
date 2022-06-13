const  role = require('../role.json');
module.exports =  {

    name:"messageReactionAdd",
    once:false,

    execute(client, messageReaction,user){
        const message = client.message;
        const member = message.guild.members.cache.get(messageReaction.id);
        if(message.id ==='773712184307089429'){
            member.roles.add(role.petitpote);
        }
        
    }
}

    
