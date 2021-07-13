const fetch = require('node-fetch');

module.exports = (client, channel, words, check, isModUp) => {

   const displayCommand = '!display'
   let userCommand = words[0]
   let userAction = null
   let filterAction = null
   let userData = null
   let timeoutTime = null
   if (words[1] === '/timeout') {
      userAction = words[1]
      timeoutTime = words[2]
      filterAction = words[3]
      userData = words[4]
   } else {
      userAction = words[1]
      filterAction = words[2]
      userData = words[3]
   }

   if (isModUp && userCommand === displayCommand && check) {
      const url = `https://tmi.twitch.tv/group/user/${channel.slice(1)}/chatters`


      const fetchChatters = async () => {
         const resp = await fetch(url)
         const data = await resp.json()

         if (data.chatters.viewers.length !== 0) {
            filterChatters(data.chatters.viewers)
         }

      }

      fetchChatters()

      function filterChatters(data) {
         if(filterAction === 'prefix' || filterAction === 'start'){
            const prefix = data.filter(user => user.startsWith(userData))
            banChatters(prefix)
         }else if(filterAction === 'suffix' || filterAction === 'end'){
            const suffix = data.filter(user => user.endsWith(userData))
            banChatters(suffix)
         }else if(filterAction === 'string' || filterAction === 'in'){
            const includes = data.filter(user => user.includes(userData))
            banChatters(includes)
         }

      }
      
      function banChatters(data) {
         let random = 1000
         data.forEach(e => {
            
            setTimeout(() => {
               if (userAction === '/timeout') {
                  client.say(channel, `${userAction} ${e} ${timeoutTime}`)
               } else {
                  client.say(channel, `${userAction} ${e}`)
               }
            }, random)
            
            const delayNum = Math.round(Math.random() * 10)
            if (delayNum === 5) {
               random += 5000
            } else {
               //random += Math.floor(Math.random() * 1500)
            }
            
         })
      }

   }
}