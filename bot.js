require('dotenv').config();
const tmi = require('tmi.js');
const fetch = require('node-fetch');
const Currency = require('./Currency')
const Weather = require('./Weather')
const Actions = require('./UsersAction')
const botActions = require('./BotActions')
const lolData = require('./Lol')



const username = process.env.TWITCH_USERNAME
const password = process.env.TWITCH_PASSWORD
const streamer = process.env.TWITCH_STREAMER.split(',').map(e => e.trim().toLowerCase())
const botAdmin = process.env.TWITCH_BOTADMIN


const options = {
   options: {
      debug: true
   },
   connection: {
      reconnect: true
  },
   identity: {
      username: username,
      password: password
   },
   channels: streamer,
}

const client = new tmi.client(options)
client.connect()


client.on('message', (channel, tags, message, self) => {
   if (self) return;
   
   const userMsg = message.toLowerCase()
   const check = /^[a-zA-Z\s\!\_\ś\ó\ż\ł\ć\ą\ę\ń\/]*$/i.test(userMsg)

   const isMod = tags.mod || tags['user-type'] === 'mod'
   const isAdmin = botAdmin === tags.username
   const isBroadcaster = channel.slice(1) === tags.username || isAdmin
   const isModUp = isMod || isBroadcaster
   
   const words = userMsg.split(' ')

   //
   lolData(client, channel, words, message)

   //
   botActions(client, channel, words, check, userMsg, isAdmin, isBroadcaster)

   //
   Actions(client, channel, words, check, isModUp)
   
   //!cena currency1 currency2
   Currency(client, channel, words, check)


   //!pogoda city
   Weather(client, channel, words, check, userMsg)
   
   

})
