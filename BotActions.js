module.exports = (client, channel, words, check, userMsg, isAdmin, isBroadcaster) => {
   const botDisconnect = '!bot out'
   if (userMsg === botDisconnect && isBroadcaster && check) {
      client.say(channel, 'bot opuścił kanał')
      client.part(channel)
   }
   
   const addStreamer = '!add streamer'
   if (isAdmin && `${words[0]} ${words[1]}` === addStreamer) {
      client.say(channel, `dodano ${words[2]}`)
      client.join(words[2])
   }

   const botStop = '!bot stop'
   if (isAdmin && userMsg === botStop) {
      client.say(channel, `bot stop`)
      client.disconnect() 
   }

   const botStart = '!bot restart'
   if (isAdmin && userMsg === botStart) {
      client.say(channel, `bot restart`)
      client.disconnect()
         setTimeout(() => {
            client.connect()
         }, 1000)
   }

}