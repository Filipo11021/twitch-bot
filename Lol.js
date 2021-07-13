const fetch = require('node-fetch')

module.exports = (client, channel, words, message) => {
   const riotApi = process.env.TWITCH_RIOTAPIKEY
   let region
   let userName

   const getUserId = async () => {

      try {
         const resp = await fetch(`https://${region}1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userName}?api_key=${riotApi}`)
         const data = await resp.json()
         return data.id
      } catch (err){
         client.say(channel, 'error !ranga region nazwa gracza')
         console.log('Fetch Error', err);
      }
   }

   const fetchUser = async () => {

      const userId = await getUserId().then(e => e)
      
      if (userId !== undefined) {
        
      const resp = await fetch(`https://${region}1.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId}?api_key=${riotApi}`)
      const data = await resp.json()
      return data
      } else {
         client.say(channel, 'error !ranga region nazwa gracza')
      }
   }

   async function displayRang (){
      const data = await fetchUser().then(e => e)
    
      const dataIndex = data.length - 1
      client.say(channel, `${data[dataIndex].summonerName}: ${data[dataIndex].tier} ${data[dataIndex].rank}`)
   }

   
   if (words[0] === '!ranga') {
      region = words[1]
      
      userName = message.substring(words[0].length + words[1].length + 2)

      if (/^[a-zA-Z\s\!\_\ś\ó\ż\ł\ć\ą\ę\ń]*$/i.test(userName)) {
         displayRang()
      }
   }


}